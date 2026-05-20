# Cours 07 — IAM, service accounts et secrets

> **Durée indicative** : 1h30 — Jeudi matin
> **Pré-requis** : cours 03 à 06

## 🎯 Objectifs

1. Comprendre le triangle **Principal × Role × Resource** de Cloud IAM.
2. Appliquer le **principle of least privilege**.
3. Créer une **service account** dédiée et lui attacher uniquement les rôles
   nécessaires pour le brief.
4. Stocker des secrets dans **Secret Manager** et les injecter dans Cloud Run.
5. Anticiper les pièges courants (rôles trop larges, clés JSON qui traînent).

---

## 1. Le modèle IAM de GCP

Trois éléments toujours présents dans une décision IAM :

```text
   Qui ?              Peut faire quoi ?       Sur quoi ?
  (Principal)            (Role)              (Resource)
```

### Principal (« qui »)

| Type | Exemple |
|------|---------|
| User Google | `alice@simplon.co` |
| Group Google | `formateurs-ia@simplon.co` |
| Service account (SA) | `rag-api@simplon-rag-prod.iam.gserviceaccount.com` |
| Workload Identity Federation | `principalSet://.../subject/github-actions/...` |
| `allUsers` | Internet entier (à éviter, sauf besoin public assumé) |
| `allAuthenticatedUsers` | Tout détenteur d'un compte Google |

### Role (« quelles permissions »)

Un rôle est un **sac de permissions** (`storage.objects.get`, `run.services.update`...).

Trois familles :

| Famille | Exemple | Quand l'utiliser |
|---------|---------|------------------|
| **Basic** | `roles/owner`, `roles/editor`, `roles/viewer` | À **éviter** (trop large, hérité d'avant 2017) |
| **Predefined** | `roles/run.invoker`, `roles/cloudsql.client` | À **privilégier** |
| **Custom** | Composé sur mesure | Quand les predefined ne suffisent pas |

### Resource (« sur quoi »)

L'IAM s'applique à plusieurs niveaux et est **héritée vers le bas** :

```text
Organisation
  └── Project        ← `roles/run.invoker` ici = sur TOUS les services Cloud Run du projet
       └── Service Cloud Run rag-api  ← `roles/run.invoker` ici = sur ce service uniquement
```

> 💡 **Bonne pratique** : binder le rôle **au plus bas niveau possible**.
> Donner `roles/storage.objectAdmin` sur un bucket précis, pas sur tout le projet.

---

## 2. Voir et modifier l'IAM

```bash
# Lister les bindings du projet
gcloud projects get-iam-policy simplon-rag-prod

# Ajouter un rôle
gcloud projects add-iam-policy-binding simplon-rag-prod \
  --member="user:alice@simplon.co" \
  --role="roles/run.developer"

# Retirer
gcloud projects remove-iam-policy-binding simplon-rag-prod \
  --member="user:alice@simplon.co" \
  --role="roles/run.developer"

# IAM sur une ressource (bucket)
gcloud storage buckets add-iam-policy-binding gs://my-bucket \
  --member="serviceAccount:rag-api@simplon-rag-prod.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

> 🪤 **Piège** : `add-iam-policy-binding` est **additif**, ne supprime pas
> les anciens bindings. Pour des changements complexes, exporter / éditer / appliquer
> avec `set-iam-policy`.

---

## 3. Service Accounts (SA)

Une **service account** est un compte non-humain : pas de mot de passe, juste
des permissions IAM et un email du type :

```
<sa-name>@<project-id>.iam.gserviceaccount.com
```

Use-cases :

- Identité d'un **service Cloud Run** (qui appelle Cloud SQL, GCS, etc.)
- Identité d'une **pipeline CI** (GitHub Actions qui déploie)
- Identité d'une **VM** Compute Engine

### Créer une SA dédiée pour notre API

```bash
gcloud iam service-accounts create rag-api \
  --display-name="SA pour le service Cloud Run rag-api"
```

### Lui donner UNIQUEMENT ce qu'il faut

```bash
SA="rag-api@simplon-rag-prod.iam.gserviceaccount.com"

# Lire les secrets
gcloud projects add-iam-policy-binding simplon-rag-prod \
  --member="serviceAccount:${SA}" \
  --role="roles/secretmanager.secretAccessor"

# Se connecter à Cloud SQL
gcloud projects add-iam-policy-binding simplon-rag-prod \
  --member="serviceAccount:${SA}" \
  --role="roles/cloudsql.client"

# Lire le bucket corpus
gcloud storage buckets add-iam-policy-binding gs://simplon-rag-corpus-prod \
  --member="serviceAccount:${SA}" \
  --role="roles/storage.objectViewer"

# Écrire dans les logs (généralement déjà inclus)
gcloud projects add-iam-policy-binding simplon-rag-prod \
  --member="serviceAccount:${SA}" \
  --role="roles/logging.logWriter"
```

### Attacher la SA au Cloud Run

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --service-account=$SA
```

> ✅ **Une fois cette SA configurée**, ton code n'a **plus jamais besoin de fichier
> de credentials**. Les SDK Google (`google.cloud.storage`, etc.) utilisent
> automatiquement le token de la SA via le metadata server du Cloud Run.

---

## 4. Clés de service account : à éviter

Une SA peut générer une **clé JSON** (`gcloud iam service-accounts keys create`).

> ⚠️ **C'est un mot de passe en clair, exfiltrable. À éviter.**

Cas où c'est encore (légitimement) utilisé :

- Service externe non-Google qui doit appeler GCP
- CI/CD sur un système non-Google **sans support OIDC** (de plus en plus rare)

Pour **GitHub Actions** : pas besoin de clé, on utilise **Workload Identity
Federation** (cf. cours 08).

---

## 5. Secret Manager

> Secret Manager = service GCP pour stocker des secrets (mots de passe, clés API,
> tokens) chiffrés, versionnés, et auditables.

### Créer un secret

```bash
# Activer l'API (une fois)
gcloud services enable secretmanager.googleapis.com

# Créer le secret
gcloud secrets create mistral-api-key \
  --replication-policy="automatic"

# Y mettre une version
echo -n "mistral-sk-..." | gcloud secrets versions add mistral-api-key --data-file=-

# Lister les versions
gcloud secrets versions list mistral-api-key

# Récupérer la dernière
gcloud secrets versions access latest --secret=mistral-api-key
```

> 📌 **Versionner les secrets** : un secret peut avoir plusieurs versions
> (`v1`, `v2`...). On peut faire pointer le Cloud Run sur `latest` ou sur une
> version figée. La rotation devient triviale : on crée une `v2`, on bascule
> Cloud Run dessus, on désactive la `v1`.

### Donner accès à la SA Cloud Run

```bash
gcloud secrets add-iam-policy-binding mistral-api-key \
  --member="serviceAccount:${SA}" \
  --role="roles/secretmanager.secretAccessor"
```

### Injecter dans Cloud Run

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --update-secrets=\
MISTRAL_API_KEY=mistral-api-key:latest,\
DB_PASSWORD=db-password:latest
```

Côté code, c'est juste une variable d'environnement :

```python
import os
key = os.environ["MISTRAL_API_KEY"]
```

> 💡 Alternative : monter le secret en **volume** au lieu d'env var. Pratique
> pour les certificats (fichiers PEM). Pour notre brief, env var suffit.

---

## 6. Principle of least privilege en pratique

> Pour chaque principal, **commencer par 0 droit**, ajouter au fur et à mesure
> de l'apparition d'un « Forbidden » dans les logs.

Anti-pattern fréquent en formation :

```bash
# ❌ NE JAMAIS FAIRE
gcloud projects add-iam-policy-binding <project> \
  --member="serviceAccount:my-sa@..." \
  --role="roles/owner"
```

Pourquoi c'est mauvais :

- L'SA peut **se donner d'autres rôles** (escalade de privilèges)
- L'SA peut **supprimer le projet**
- En cas de compromission, dégâts maximaux

À la place, lister les actions effectivement réalisées par l'app et chercher le
rôle predefined le plus étroit qui les couvre.

### Outil : Policy Analyzer

GCP propose **Policy Analyzer** dans la console (`IAM → Policy Analyzer`).
On lui donne un principal, il liste **toutes** les permissions effectives.
Utile pour auditer : « est-ce que ma SA `rag-api` peut supprimer un bucket ? ».

---

## 7. Pour le brief — récap des rôles à mettre

| Principal | Rôles à donner | Sur quoi |
|-----------|----------------|----------|
| **SA `rag-api`** (Cloud Run) | `roles/cloudsql.client` | Projet |
| | `roles/secretmanager.secretAccessor` | Projet (ou secrets précis) |
| | `roles/storage.objectViewer` | Bucket corpus |
| | `roles/logging.logWriter` | Projet (souvent déjà OK) |
| **SA `github-actions`** (CI) | `roles/run.admin` | Projet (ou service Cloud Run) |
| | `roles/artifactregistry.writer` | Projet (ou repo) |
| | `roles/iam.serviceAccountUser` | SA `rag-api` (pour pouvoir « usurper ») |
| **Toi (user)** | `roles/owner` ou `roles/editor` | Projet |

---

## 8. Quiz rapide

> À résoudre en 5 min en groupe.

1. Tu vois `roles/editor` sur ton projet pour la SA `rag-api`. Quels risques ?
2. La SA Cloud Run charge un PDF depuis GCS, l'API renvoie 500 « Forbidden ».
   Décris la démarche pour diagnostiquer.
3. Tu veux donner accès en lecture **uniquement au dossier `corpus/2026/`**
   d'un bucket GCS à un partenaire externe. Quelles options ?
4. Pourquoi est-il dangereux de committer un fichier `service-account-key.json`
   sur un repo public, **même si tu le supprimes 1 h après** ?

---

## 🔗 Ressources

- [IAM overview](https://cloud.google.com/iam/docs/overview)
- [Service accounts best practices](https://cloud.google.com/iam/docs/service-account-overview)
- [Secret Manager docs](https://cloud.google.com/secret-manager/docs)
- [Policy Analyzer](https://cloud.google.com/policy-intelligence/docs/policy-analyzer-overview)
- [Roles reference](https://cloud.google.com/iam/docs/understanding-roles)
