# Cours 08 — CI/CD avec GitHub Actions et déploiement Cloud Run

> **Durée indicative** : 1h15 — Jeudi matin
> **Pré-requis** : Git, Docker, cours 04 (Cloud Run), cours 07 (IAM)
> **Référence** : <https://blog.stephane-robert.info/docs/cicd/>

## 🎯 Objectifs

1. Comprendre la différence **CI / CD / Continuous Deployment**.
2. Maîtriser la structure d'un workflow GitHub Actions (job, step, runner).
3. Stocker des **secrets** dans GitHub et les utiliser.
4. **S'authentifier à GCP sans clé JSON** via Workload Identity Federation (OIDC).
5. Construire un pipeline : `lint → test → build → push → deploy`.

---

## 1. CI, CD, Continuous Deployment — c'est quoi la différence ?

| | Définition courte | Trigger |
|---|---|---|
| **CI** (Continuous Integration) | Intégrer le code en continu : à chaque push, on lance lint + tests | Push, PR |
| **CD** (Continuous Delivery) | Préparer un artefact déployable à chaque commit, mais déclenché à la main pour le déploiement | Tag, manual |
| **Continuous Deployment** | Déploiement automatique en prod à chaque commit qui passe les tests | Push sur `main` |

Pour notre brief : **CI + Continuous Deployment** sur `main`.

> 💡 Beaucoup d'équipes maintiennent un environnement `staging` en Continuous
> Deployment et un environnement `prod` en Continuous Delivery (déploiement
> sur tag ou bouton manuel). Bon compromis vitesse / sécurité.

---

## 2. Anatomie d'un workflow GitHub Actions

Un workflow vit dans `.github/workflows/<nom>.yml`.

```yaml
name: CI / CD

on:                             # Quand le workflow se déclenche
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:             # Bouton manuel dans l'UI

env:                             # Variables disponibles partout
  PROJECT_ID: simplon-rag-prod
  REGION: europe-west1

jobs:
  lint-and-test:                 # Un job s'exécute sur un runner (VM jetable)
    runs-on: ubuntu-latest
    steps:                       # Étapes séquentielles dans un même VM
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install deps
        run: pip install -r requirements.txt

      - name: Lint
        run: ruff check .

      - name: Tests
        run: pytest -q

  build-and-deploy:
    needs: lint-and-test          # Dépend du job précédent
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:                  # Important pour OIDC (voir plus loin)
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      # ... build + push + deploy ici
```

Concepts clés :

| Élément | Sens |
|---------|------|
| **Workflow** | Le fichier YAML entier |
| **Job** | Une VM (« runner ») éphémère qui exécute des steps |
| **Step** | Une commande ou une « action » (réutilisable) |
| **Action** | Un step packagé (`actions/checkout@v4`, `docker/build-push-action@v5`) |
| **Runner** | La VM où s'exécute le job — par défaut GitHub-hosted Ubuntu |
| **Trigger** | Événement qui déclenche le workflow (`push`, `pull_request`, etc.) |
| **Concurrency** | Permet d'annuler les runs précédents quand un nouveau commit arrive |

---

## 3. Secrets GitHub

Ne **jamais** committer un secret dans le YAML. À la place :

`Repo Settings → Secrets and variables → Actions → New repository secret`

Disponible dans le workflow :

```yaml
env:
  MY_TOKEN: ${{ secrets.MY_TOKEN }}
```

Bonnes pratiques :

- **Préfixer par environnement** : `STAGING_DB_PWD`, `PROD_DB_PWD`.
- **Utiliser les "Environments"** (Repo Settings → Environments) pour ajouter une
  étape d'approbation manuelle avant la prod.
- **Rotater régulièrement** (≥ 1× / trimestre en prod).

---

## 4. Workload Identity Federation (le bon pattern GCP)

> Au lieu de donner à GitHub Actions un **fichier de clé JSON** d'une SA GCP,
> on configure une **confiance OIDC** : GitHub Actions présente un JWT signé,
> GCP le vérifie et émet un token de SA temporaire.

Bénéfices :

- **Plus de clé JSON** à stocker / rotater / perdre.
- **Granularité fine** : on peut autoriser uniquement un repo + une branche précise.
- **Auditable** dans Cloud Audit Logs.

### Mise en place (une fois par projet GCP)

```bash
PROJECT_ID="simplon-rag-prod"
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
POOL_ID="github-pool"
PROVIDER_ID="github-provider"
REPO="maxime-lenne/simplon-rag-sample"
SA="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# 1. Créer la SA dédiée à GitHub Actions
gcloud iam service-accounts create github-actions \
  --display-name="SA pour GitHub Actions"

# 2. Donner les rôles nécessaires
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA}" \
  --role="roles/run.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA}" \
  --role="roles/artifactregistry.writer"
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA}" \
  --role="roles/iam.serviceAccountUser"

# 3. Créer le Workload Identity Pool
gcloud iam workload-identity-pools create $POOL_ID \
  --location="global" \
  --display-name="GitHub Actions Pool"

# 4. Créer le provider OIDC
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_ID \
  --location="global" \
  --workload-identity-pool=$POOL_ID \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository == '${REPO}'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# 5. Autoriser le repo à usurper la SA
gcloud iam service-accounts add-iam-policy-binding $SA \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${REPO}"
```

### Utilisation dans le workflow

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write          # OBLIGATOIRE pour OIDC

    steps:
      - uses: actions/checkout@v4

      - name: Authenticate to GCP
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: projects/${{ env.PROJECT_NUMBER }}/locations/global/workloadIdentityPools/github-pool/providers/github-provider
          service_account: github-actions@simplon-rag-prod.iam.gserviceaccount.com

      - name: Set up gcloud
        uses: google-github-actions/setup-gcloud@v2

      - name: Configure Docker auth
        run: gcloud auth configure-docker europe-west1-docker.pkg.dev
```

---

## 5. Pipeline complet (template prêt à adapter)

```yaml
name: CI / CD Cloud Run

on:
  push:
    branches: [main]
  pull_request:

env:
  PROJECT_ID: simplon-rag-prod
  PROJECT_NUMBER: '<PROJECT_NUMBER>'
  REGION: europe-west1
  REPO: rag-images
  IMAGE_NAME: api

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:

  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12', cache: 'pip' }
      - run: pip install -r api/requirements.txt -r api/requirements-dev.txt
      - run: ruff check api/
      - run: pytest api/tests -q

  build-push:
    needs: lint-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    outputs:
      image: ${{ steps.tag.outputs.image }}
    steps:
      - uses: actions/checkout@v4

      - id: tag
        run: |
          SHA_SHORT=$(git rev-parse --short HEAD)
          echo "image=${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPO }}/${{ env.IMAGE_NAME }}:$SHA_SHORT" >> $GITHUB_OUTPUT

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: projects/${{ env.PROJECT_NUMBER }}/locations/global/workloadIdentityPools/github-pool/providers/github-provider
          service_account: github-actions@${{ env.PROJECT_ID }}.iam.gserviceaccount.com

      - uses: google-github-actions/setup-gcloud@v2

      - run: gcloud auth configure-docker ${{ env.REGION }}-docker.pkg.dev

      - uses: docker/setup-buildx-action@v3

      - uses: docker/build-push-action@v5
        with:
          context: ./api
          push: true
          tags: ${{ steps.tag.outputs.image }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-push
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: projects/${{ env.PROJECT_NUMBER }}/locations/global/workloadIdentityPools/github-pool/providers/github-provider
          service_account: github-actions@${{ env.PROJECT_ID }}.iam.gserviceaccount.com

      - uses: google-github-actions/setup-gcloud@v2

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy rag-api \
            --image=${{ needs.build-push.outputs.image }} \
            --region=${{ env.REGION }} \
            --service-account=rag-api@${{ env.PROJECT_ID }}.iam.gserviceaccount.com \
            --add-cloudsql-instances=${{ env.PROJECT_ID }}:${{ env.REGION }}:rag-db \
            --update-secrets=MISTRAL_API_KEY=mistral-api-key:latest,DB_PASSWORD=db-password:latest \
            --update-env-vars=DB_HOST=/cloudsql/${{ env.PROJECT_ID }}:${{ env.REGION }}:rag-db,DB_NAME=rag,DB_USER=rag_app \
            --memory=1Gi --cpu=1 --max-instances=5 \
            --allow-unauthenticated
```

---

## 6. Stratégies de déploiement

| Stratégie | Mise en œuvre Cloud Run | Quand |
|-----------|--------------------------|-------|
| **Recreate** | `gcloud run deploy` simple (défaut) | Petits services, tolérance downtime |
| **Blue/Green** | Déployer une révision à 0 % puis basculer 100 % | Cutover précis |
| **Canary** | Déployer à 10 %, observer, monter à 100 % | Production critique |
| **Feature flag** | Toujours 100 % de trafic, feature derrière un flag (LaunchDarkly...) | Indépendance déploiement / activation |

Pour le brief : **Recreate suffit**. Le **canary** est un bonus si vous avez le temps.

---

## 7. Pièges classiques

| Symptôme | Cause | Solution |
|---|---|---|
| `Error: google-github-actions/auth failed` | Permissions `id-token: write` manquantes | Ajouter au job |
| `Permission denied` au déploiement | SA `github-actions` sans `roles/iam.serviceAccountUser` sur la SA Cloud Run | Ajouter |
| Tests qui n'utilisent pas la même version de Python qu'en prod | Versions différentes dans workflow et Dockerfile | Centraliser dans `pyproject.toml` |
| Build qui prend 12 min | Pas de cache | Ajouter `cache-from: type=gha` |
| Image `latest` qui déploie une mauvaise version | Tag mutable, pas reproductible | Tagger par SHA |

---

## 8. Exercice

> En binôme, 30 min.

1. Sur un repo de test, écrire un workflow `.github/workflows/ci.yml` qui :
   - À chaque PR : lint + tests
   - À chaque push sur `main` : build et push d'une image vers Artifact Registry
2. Tester en créant une PR « bidon ».
3. Mesurer le temps total du pipeline.
4. Ajouter le cache `actions/setup-python@v5` (`cache: 'pip'`) et le cache
   `docker/build-push-action` (`cache-from: type=gha`).
5. Mesurer le gain.

---

## 🔗 Ressources

- [GitHub Actions docs](https://docs.github.com/en/actions)
- [`google-github-actions/auth`](https://github.com/google-github-actions/auth)
- [Workload Identity Federation — guide officiel](https://cloud.google.com/iam/docs/workload-identity-federation)
- [Stéphane Robert — CI/CD](https://blog.stephane-robert.info/docs/cicd/)
- [docker/build-push-action](https://github.com/docker/build-push-action)
- [Awesome GitHub Actions](https://github.com/sdras/awesome-actions)
