# Cours 02 — Vue d'ensemble de Google Cloud Platform

> **Durée indicative** : 1h15 — Mardi après-midi
> **Pré-requis** : cours 01 (concepts cloud)
> **Référence** : <https://blog.stephane-robert.info/docs/cloud/gcp/>

maquant :
- schéma !!!
- réseau vpc, loadbalancer, dns, ip fixe...
-

## 🎯 Objectifs

1. Comprendre l'**organisation hiérarchique** de GCP : organisation → dossier → projet → ressource.
2. Distinguer **projet** et **billing account** (et pourquoi c'est mal foutu).
3. Naviguer dans la **console** et savoir où trouver quoi.
4. Utiliser **gcloud CLI** et **Cloud Shell**.
5. Mettre en place une **alerte de budget** dès la création du projet.

---

## 1. GCP en 30 secondes

Google Cloud Platform = l'offre cloud public de Google. Présent depuis 2008.
Part de marché mondiale ~12 % en 2026, derrière AWS (~30 %) et Azure (~22 %),
devant Alibaba.

**Forces différenciantes** :

- **Réseau** mondial privé (Google possède son backbone fibre). Le moins cher
  en egress inter-région.
- **Data** — BigQuery, Spanner, Vertex AI (tooling ML / GenAI), Looker.
- **Kubernetes** — GKE est le K8s managé le plus mature (Google a inventé K8s).
- **Tarification** : facturation à la seconde, sustained use discounts
  automatiques (-30 % sans rien faire si tu laisses une VM tourner ≥ 25 % du mois).

**Faiblesses** :

- Moins large catalogue de services qu'AWS (l'écart se resserre).
- Documentation parfois en chantier (régulièrement obsolète sur les beta).
- Moins de partenaires en France qu'AWS / Azure.

---

## 2. Hiérarchie des ressources

```text
Organisation                 ← Optionnel (entreprise, Google Workspace lié)
  └── Folder                 ← Optionnel (regroupement par BU / env)
       └── Project           ← OBLIGATOIRE. Unité de facturation + IAM
            └── Resources    ← Cloud Run, Cloud SQL, GCS bucket, etc.
```

| Niveau | À quoi ça sert |
|--------|----------------|
| Organisation | Une entreprise. Permet de gérer les politiques (Org Policies) qui s'appliquent en cascade. |
| Folder | Découpage logique : `prod/`, `staging/`, `formation/`. Utile en grand groupe. |
| **Project** | **L'unité de tout.** Chaque projet a un ID unique mondial (`simplon-rag-prod-12345`), un nom, et est rattaché à un **billing account**. |
| Resource | L'élément concret (un service Cloud Run, un bucket GCS). |

> 🪤 **Piège classique** : l'**ID de projet** est unique mondialement et
> **immutable**. Choisis-le bien (`<orga>-<projet>-<env>` : `simplon-rag-prod`).

---

## 3. Projet ≠ billing account

C'est la subtilité qui surprend toujours :

- Un **projet** contient les ressources.
- Un **billing account** contient le moyen de paiement.
- Un projet est **rattaché** à un billing account. Plusieurs projets peuvent
  partager le même billing.

Conséquence : pour un atelier formation, on crée **un projet par apprenant·e** (ou par binôme)
rattaché au **billing du centre**. Si on veut isoler les coûts, c'est facile.

> 📌 **Pour la formation** : si tu (formateur) crées les projets, n'oublie pas
> d'ajouter chaque apprenant·e comme `roles/owner` ou `roles/editor` sur SON projet,
> et **personne** sur le billing account.

---

## 4. Régions et zones

GCP en 2026 : **40+ régions**, **120+ zones**, présence sur 5 continents.

Régions principales utiles pour des formations Simplon (France) :

| Région | Nom | Localisation |
|--------|-----|--------------|
| `europe-west1` | Belgique | Le plus utilisé en Europe, large catalogue |
| `europe-west9` | Paris | Hébergement français, RGPD-friendly |
| `europe-west3` | Francfort | Allemagne, gros catalogue |
| `europe-west4` | Pays-Bas | Bons GPU disponibles |

> 💡 **Conseil** : pour cette formation, on utilisera `europe-west1` (le plus
> universel). En vrai projet client en France, préférer `europe-west9`.

Chaque région contient typiquement **3 zones** (`-a`, `-b`, `-c`). Un service
**régional** (Cloud Run, Cloud SQL HA) est répliqué sur plusieurs zones automatiquement.
Un service **zonal** (Compute Engine simple) ne l'est pas.

---

## 5. Catalogue des services qu'on va utiliser cette semaine

| Catégorie | Service GCP | Équivalent AWS | Équivalent Azure |
|-----------|-------------|----------------|------------------|
| **Compute (CaaS)** | **Cloud Run** | App Runner / Fargate | Container Apps |
| **Image registry** | **Artifact Registry** | ECR | Azure Container Registry |
| **BDD relationnelle** | **Cloud SQL** | RDS | Azure Database for PostgreSQL |
| **Stockage objet** | **Cloud Storage (GCS)** | S3 | Blob Storage |
| **Secrets** | **Secret Manager** | Secrets Manager | Key Vault |
| **IAM** | **Cloud IAM** | IAM | Entra ID + RBAC |
| **Logs** | **Cloud Logging** | CloudWatch Logs | Azure Monitor Logs |

Services qu'on **n'utilisera pas** mais qu'il faut connaître :

- **GKE** (Kubernetes)
- **Compute Engine** (VM)
- **App Engine** (PaaS historique, en perte de vitesse)
- **BigQuery** (data warehouse SQL serverless, hyper utile en Data Eng)
- **Vertex AI** (plateforme ML, équivalent SageMaker)
- **Pub/Sub** (file de messages managée)
- **Dataflow** (streaming et batch, Apache Beam)

---

## 6. La console GCP

URL : <https://console.cloud.google.com>

Repères visuels :

```
┌─────────────────────────────────────────────────┐
│ ☰  Google Cloud   [Sélecteur projet ▾]   🔔  👤 │
├─────────────────────────────────────────────────┤
│  Menu (☰)                                       │
│  ├── Cloud Run                                  │
│  ├── Cloud SQL                                  │
│  ├── Cloud Storage                              │
│  ├── IAM & Admin                                │
│  ├── Billing                                    │
│  └── ...                                        │
├─────────────────────────────────────────────────┤
│  Tableau de bord du projet                      │
└─────────────────────────────────────────────────┘
```

Astuces console :

- ⌘ + / (Mac) ou Ctrl + / : ouvrir la **palette de recherche** (vital).
- Épingler les services qu'on utilise souvent (icône 📌).
- Onglet « Activité » : voir qui a fait quoi (audit log léger).
- Bouton « Open Cloud Shell » en haut à droite : une VM Linux gratuite avec
  `gcloud` préinstallé.

---

## 7. gcloud — la CLI

Installation locale :

```bash
# macOS
brew install --cask google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
```

Initialisation (à faire une fois) :

```bash
gcloud auth login                    # ouvre un navigateur
gcloud auth application-default login  # pour les SDK clients
gcloud config set project simplon-rag-prod
gcloud config set compute/region europe-west1
gcloud config set compute/zone europe-west1-b
```

Commandes essentielles :

```bash
gcloud projects list
gcloud services enable run.googleapis.com           # activer une API
gcloud run deploy rag-api --image=... --region=...  # déployer
gcloud sql instances list
gcloud storage ls gs://my-bucket
```

> 💡 **Astuce** : `gcloud beta` / `gcloud alpha` exposent des fonctionnalités
> pas encore GA mais souvent nécessaires (ex : Cloud Run + Cloud SQL Connector).

### Configurations multiples

Pour jongler entre projets perso / formation / client :

```bash
gcloud config configurations create simplon
gcloud config configurations activate simplon
```

---

## 8. Cloud Shell

Une VM Debian gratuite (50 h/semaine, 5 Go de home persistant) directement dans
le navigateur. **Très utile** :

- Pas d'install locale à faire pour les apprenant·e·s
- `gcloud`, `git`, `docker`, `kubectl`, Python, Node tout préinstallé
- Bouton « Open Editor » → un VS Code-like dans le navigateur

> ⚠️ Limite : pas de GPU, pas de pouvoir de calcul lourd, et le home est wipé
> au bout de 4 mois d'inactivité.

---

## 9. Sécuriser dès le jour 1

### Alerte de budget

```bash
gcloud billing budgets create \
  --billing-account=01XXXX-XXXXXX-XXXXXX \
  --display-name="Budget formation Simplon" \
  --budget-amount=20EUR \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=90 \
  --threshold-rule=percent=100
```

À faire pour **chaque** projet TP. 20 € de budget = on est tranquille pour une
semaine de manipulations.

### MFA + clés d'accès

- **Active la 2FA** sur ton compte Google (obligatoire pour les comptes payants).
- N'utilise **jamais** une clé de service account en local sans nécessité (cf. cours 07).

---

## 10. Atelier découverte (1h45 mardi PM)

> Énoncé condensé. Le détail sera dans le brief de l'atelier.

1. Activer un projet GCP (ou en créer un : `simplon-<prenom>-formation`).
2. Activer les APIs : `run.googleapis.com`, `artifactregistry.googleapis.com`,
   `sqladmin.googleapis.com`, `storage.googleapis.com`, `secretmanager.googleapis.com`.
3. Créer une alerte de budget à 20 €.
4. Déployer un container `hello-world` sur Cloud Run :

```bash
gcloud run deploy hello \
  --image=us-docker.pkg.dev/cloudrun/container/hello \
  --region=europe-west1 \
  --allow-unauthenticated
```

1. Récupérer l'URL publique, vérifier que ça répond.
2. Capture d'écran + URL collés dans Discord.

---

## 🔗 Ressources

- [Stéphane Robert — GCP](https://blog.stephane-robert.info/docs/cloud/gcp/)
- [Google Cloud Free Program](https://cloud.google.com/free)
- [Google Cloud Docs](https://cloud.google.com/docs)
- [Comparatif AWS / Azure / GCP](https://cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison)
- [Awesome Google Cloud Platform](https://github.com/GoogleCloudPlatform/awesome-google-cloud)
