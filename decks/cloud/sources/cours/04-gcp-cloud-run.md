# Cours 04 — Cloud Run + Artifact Registry

> **Durée indicative** : 1h30 cours + 1h45 atelier — Mercredi matin
> **Pré-requis** : Docker, cours 03 (GCP overview)

## 🎯 Objectifs

1. Comprendre le modèle d'exécution de Cloud Run (request-based, autoscaling, scale-to-zero).
2. Pousser une image sur **Artifact Registry**.
3. Déployer un service Cloud Run avec variables d'environnement et secrets.
4. Gérer les **révisions**, le **traffic splitting**, les rollbacks.
5. Identifier les **pièges classiques** (cold start, port, healthcheck, file system éphémère).

---

## 1. Qu'est-ce que Cloud Run ?

> Cloud Run = **service managé qui exécute des conteneurs HTTP, scalés
> automatiquement de 0 à N instances en fonction du trafic.**

Le « scale to zero » est la grande caractéristique : si personne n'appelle ton
service pendant 15 min, **0 instance** tourne, **0 € facturé**. À la première
requête, une instance démarre (300 ms à 5 s selon ton image).

### Modèle d'exécution

```text
   Requête HTTP
        │
        ▼
   ┌─────────────────────────────────────────┐
   │ Load balancer Google (gratuit, inclus)  │
   └─────────────────────────────────────────┘
        │
        ▼
   ┌─────────────────────────────────────────┐
   │ Pool d'instances (de 0 à max)           │
   │ Chaque instance reçoit 1 à 1000         │
   │ requêtes en concurrence simultanée      │
   │ (configurable)                          │
   └─────────────────────────────────────────┘
        │
        ▼
   Ton container (port 8080 par défaut)
```

### Cloud Run service vs Cloud Run job

| | Service | Job |
|---|---------|-----|
| Déclencheur | Requête HTTP | `gcloud run jobs execute` ou Cloud Scheduler |
| Long-running | Non (timeout 60 min max) | Oui (jusqu'à 24h) |
| URL publique | Oui | Non |
| Usage | API, frontend, webhook | Batch, migration, traitement périodique |

Pour notre brief : **Service** pour l'API et le frontend. On ne touchera pas aux jobs cette semaine.

---

## 2. Contraintes à connaître

Cloud Run impose un cadre. **Si ton container respecte ces règles, ça marche.**

1. **Écoute sur le port `PORT`** (variable d'env injectée, défaut `8080`).
2. **Démarre en < 5 minutes** (cold start max).
3. **Pas de stockage persistant local** — le file system est en mémoire,
   éphémère, écrasé à chaque scale-up.
4. **Stateless** — pas de session collante, pas de fichier partagé entre instances.
5. **HTTP/1.1, HTTP/2, gRPC, WebSocket** supportés. Pas de TCP brut.
6. **Limite de 32 Gi de RAM, 8 vCPU** par instance.
7. **Timeout requête : 60 min max** (par défaut 5 min).

> 🪤 **Piège typique** : du code FastAPI qui écrit un fichier dans `/tmp/cache/`
> et le relit plus tard. Sur une seule instance ça marche. Sur 2 instances,
> 50 % des requêtes échouent. ⇒ stocker dans **Cloud Storage** ou **Memorystore (Redis)**.

---

## 3. Artifact Registry

> Artifact Registry = le registre Docker managé de GCP. **Remplace Container Registry (`gcr.io`)**, deprecated.

Création d'un repository :

```bash
gcloud artifacts repositories create rag-images \
  --repository-format=docker \
  --location=europe-west1 \
  --description="Images Docker du projet RAG"
```

URL du repo : `europe-west1-docker.pkg.dev/<PROJECT_ID>/rag-images`

### Authentifier Docker

```bash
gcloud auth configure-docker europe-west1-docker.pkg.dev
```

### Build + push

```bash
# Tag local
docker build -t europe-west1-docker.pkg.dev/simplon-rag-prod/rag-images/api:v1.0.0 ./api

# Push
docker push europe-west1-docker.pkg.dev/simplon-rag-prod/rag-images/api:v1.0.0
```

> 💡 **Bonne pratique** : tagger avec **le SHA du commit Git** (`api:abc1234`)
> plutôt que `latest`. Évite les surprises au déploiement.

### Build distant (optionnel)

Cloud Build peut construire l'image pour toi (utile si ton portable est lent
ou en CI) :

```bash
gcloud builds submit ./api \
  --tag=europe-west1-docker.pkg.dev/simplon-rag-prod/rag-images/api:v1.0.0
```

---

## 4. Déployer un service Cloud Run

### Déploiement de base

```bash
gcloud run deploy rag-api \
  --image=europe-west1-docker.pkg.dev/simplon-rag-prod/rag-images/api:v1.0.0 \
  --region=europe-west1 \
  --allow-unauthenticated \
  --port=8080 \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5 \
  --concurrency=80 \
  --timeout=300
```

GCP renvoie une URL : `https://rag-api-xxxxxxxxxx-ew.a.run.app`

### Variables d'environnement

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --update-env-vars=LOG_LEVEL=INFO,APP_ENV=production
```

### Secrets (depuis Secret Manager)

```bash
# Une fois le secret créé dans Secret Manager
gcloud run services update rag-api \
  --region=europe-west1 \
  --update-secrets=MISTRAL_API_KEY=mistral-api-key:latest
```

> Détail dans le cours 07. Retenir pour l'instant : **on ne met PAS la clé Mistral
> en `--update-env-vars`**, on la passe via Secret Manager.

---

## 5. Concurrence et autoscaling

Trois leviers à manipuler :

| Paramètre | Effet | Valeur conseillée pour FastAPI |
|-----------|-------|---|
| `--concurrency` | Combien de requêtes simultanées par instance | `40` à `80` (FastAPI gère bien l'async) |
| `--min-instances` | Combien d'instances toujours allumées (warm) | `0` en dev, `1` en prod pour éviter cold starts |
| `--max-instances` | Plafond pour ne pas exploser la facture | `5` à `10` en formation |

Formule simple : `RPS_max ≈ concurrency × max_instances / latence_moy`.

Pour une API qui répond en 200 ms, `concurrency=80`, `max=5` → on tient ~ 2000 req/s.

### Cold start — comment limiter

- `--min-instances=1` (mais coût constant)
- **Image légère** (multi-stage, distroless, cf. cours 09)
- **Pas d'init lourde dans `main.py`** (charger les modèles à la première requête, pas au startup)
- **CPU boost at startup** (`--cpu-boost`) — alloue jusqu'à 2 vCPU pendant le démarrage

---

## 6. Révisions et traffic splitting

Chaque `gcloud run deploy` crée une **nouvelle révision** immuable.

```text
rag-api
├── rag-api-00001-abc  ← v1.0.0   (0 % de trafic)
├── rag-api-00002-def  ← v1.0.1   (100 % de trafic)
└── rag-api-00003-ghi  ← v1.1.0   (0 % de trafic, en attente)
```

### Canary deployment

Envoyer 10 % du trafic sur la nouvelle révision :

```bash
gcloud run services update-traffic rag-api \
  --region=europe-west1 \
  --to-revisions=rag-api-00003-ghi=10
```

### Rollback

```bash
gcloud run services update-traffic rag-api \
  --region=europe-west1 \
  --to-revisions=rag-api-00002-def=100
```

> 🎯 **Pratique recommandée pour le brief** : pas de canary obligatoire, mais
> savoir lister les révisions et faire un rollback en démo est attendu.

---

## 7. Authentification du service

```bash
# Service public (pour le frontend, ou pour des tests)
gcloud run deploy ... --allow-unauthenticated

# Service privé (la prod sérieuse)
gcloud run deploy ... --no-allow-unauthenticated
```

Pour un service privé, on appelle avec un JWT :

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  https://rag-api-xxx-ew.a.run.app/health
```

> 💡 Dans le brief, on rendra **publics** les endpoints frontend et API (pour
> simplifier). En vrai projet, on isolerait l'API derrière un Load Balancer +
> IAP ou un API Gateway.

---

## 8. Connexion à Cloud SQL

Cloud Run sait se connecter à Cloud SQL via le **Cloud SQL Auth Proxy** intégré
(pas besoin de l'exécuter dans ton container).

```bash
gcloud run deploy rag-api \
  --add-cloudsql-instances=simplon-rag-prod:europe-west1:rag-db \
  --update-env-vars=DB_HOST=/cloudsql/simplon-rag-prod:europe-west1:rag-db
```

Côté code (SQLAlchemy / asyncpg), le DSN devient :

```
postgresql+asyncpg://<user>:<pwd>@/<dbname>?host=/cloudsql/<instance-connection-name>
```

Détails dans le **cours 05**.

---

## 9. Pièges classiques

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| `Container failed to start` | App n'écoute pas sur `PORT` ou plante | `gcloud run services logs read rag-api` |
| `403 Forbidden` | Service privé, pas de token | `--allow-unauthenticated` ou ajouter `roles/run.invoker` |
| Latence p99 énorme | Cold start non maîtrisé | `--min-instances=1`, alléger l'image |
| OOMKilled | RAM trop faible | `--memory=2Gi` |
| Variables d'env perdues | Oubli de `--update-env-vars` qui écrase | Toujours mettre **toutes** les vars dans la même commande |
| Build qui prend 15 min | `pip install` dans une image énorme | Multi-stage, requirements en cache layer |

---

## 10. Atelier (1h45)

> Objectif : déployer une mini API FastAPI sur Cloud Run depuis 0.

### Étapes

1. Cloner un repo de référence (un FastAPI minimal — fourni).
2. Écrire un `Dockerfile` (multi-stage encouragé).
3. Build local et test : `docker run -p 8080:8080 ...`.
4. Créer un repo Artifact Registry : `rag-formation`.
5. Tagger et pousser l'image.
6. `gcloud run deploy` avec `--memory=512Mi`, `--max-instances=3`.
7. Tester l'URL publique avec `curl`.
8. Modifier l'app, redéployer → vérifier les **révisions**.
9. Faire un rollback sur la version précédente.
10. Lire les logs avec `gcloud run services logs tail`.

### Livrable

- URL publique du service
- Capture d'écran de la page des révisions (≥ 2)
- Capture d'écran des logs avec un message custom

---

## 🔗 Ressources

- [Cloud Run — docs officielles](https://cloud.google.com/run/docs)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
- [Stéphane Robert — Cloud Run](https://blog.stephane-robert.info/docs/cloud/gcp/cloud-run/)
- [Cloud Run + Cloud SQL guide officiel](https://cloud.google.com/sql/docs/postgres/connect-run)
- [Cold start in Cloud Run (blog Google)](https://cloud.google.com/blog/topics/developers-practitioners/cold-start-cloud-run)
