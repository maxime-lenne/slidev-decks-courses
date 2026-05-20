# Brief Simplonline — Déploiement GCP d'un chatbot RAG

| Item | Détail |
|------|--------|
| Métier | Dev IA — Référentiel RNCP 2023 |
| Durée | 1,5 jour (J4 PM + J5) — suite possible en semaine N+1 |
| Modalité | Binôme (mêmes binômes que la semaine observabilité) |
| Prérequis | Avoir suivi les cours 01 à 09 de la semaine (cloud, GCP, CI/CD, Docker) + brief observabilité validé |

---

## 📁 Brief projet

### 🏷️ Titre

> Déployer un chatbot RAG sur Google Cloud Platform : Cloud Run, Cloud SQL,
> Cloud Storage et CI/CD GitHub Actions

*(99 / 100 caractères)*

### 📝 Description rapide

Vous reprenez votre projet RAG **observable** (livré la semaine précédente) et
vous le faites passer du `docker-compose up` local à un déploiement sur **Google
Cloud Platform**. L'API FastAPI tourne sur **Cloud Run**, la base pgvector
migre sur **Cloud SQL Postgres**, le corpus PDF est stocké sur **Cloud Storage**,
les secrets sont gérés dans **Secret Manager**, et **GitHub Actions** prend en
charge la pipeline complète (lint → test → build → push Artifact Registry →
deploy Cloud Run) en s'authentifiant via **Workload Identity Federation** (OIDC,
sans clé JSON).

À la fin du brief, **un `git push` sur `main` redéploie automatiquement la
version la plus à jour de votre API en production** sur GCP, accessible
publiquement, avec connexion sécurisée à Cloud SQL et lecture du corpus depuis GCS.

*(≈ 820 / 900 caractères)*

### 🎯 Compétences et niveaux

| Compétence | Intitulé | Niveau |
|-----------|----------|--------|
| C17 | Déployer un service d'IA | Niveau 2 — Adapter |
| C18 | Industrialiser un projet via CI/CD | Niveau 3 — Transposer |
| C19 | Mettre en œuvre une infrastructure cloud | Niveau 2 — Adapter |
| C21 | Résoudre les incidents techniques | Niveau 2 — Adapter (continuité) |

### 📖 Contexte

**Contexte professionnel** : vous êtes toujours développeur·euse backend chez
**Simplon**. La semaine précédente, le CTO a validé votre travail
d'**observabilité** (logs JSON, Prometheus, Grafana, Alertmanager, Langfuse).
La stack tourne aujourd'hui sur **un seul `docker compose up`** sur la machine
du formateur — ça ne tient pas pour de la production réelle.

La direction prend une décision : **on passe en cloud public**, sur **Google Cloud
Platform**, parce que :

- L'équipe est petite, on ne veut pas gérer d'infra physique ;
- On veut payer à l'usage (scale-to-zero entre 19 h et 8 h, week-end) ;
- On veut un déploiement reproductible et un rollback en 30 s en cas de problème ;
- Le centre est en train de centraliser ses outils sur Google Workspace, donc
  GCP s'intègre naturellement en SSO.

**Votre mission** : faire passer le projet du « ça marche en local » au
« ça tourne 24/7 en production sur GCP ». Vous gardez **toute l'observabilité
de la semaine précédente** (elle reste utile, on la portera sur Cloud Logging
- Cloud Monitoring **la semaine suivante**, hors scope ici).

**Ce qui change pour les utilisateur·rice·s** :

- L'URL passe de `http://localhost:8000` à `https://rag-api-xxx-ew.a.run.app`
- Le corpus est ré-uploadable sans rebuild d'image (`gcloud storage cp`...)
- Les incidents peuvent être réglés par un `git revert` + push, plutôt qu'un SSH

#### Architecture cible

```text
              [ utilisateur·rice ]
                       │
                       ▼ HTTPS
       ┌─────────────────────────────────┐
       │  Cloud Run — service `rag-api`  │
       │  (FastAPI + LangGraph + Mistral)│
       └─────────────────────────────────┘
                       │
       ┌───────────────┼─────────────────┐
       ▼               ▼                 ▼
  Cloud SQL        Cloud Storage      Mistral
  (Postgres        bucket             API
  + pgvector)      `corpus`           (SaaS)
       ▲                                 ▲
       │  Cloud SQL connector (socket)   │
       │                                 │
       └── Secret Manager ───────────────┘
              (mistral-api-key,
               db-password)

   ┌──────────────────────────────────────────┐
   │  GitHub                                  │
   │  ┌────────────────────────────────────┐  │
   │  │ Push on main                       │  │
   │  └──────────────┬─────────────────────┘  │
   │                 ▼                        │
   │     GitHub Actions                       │
   │     ├── lint + test                      │
   │     ├── build + push                     │
   │     │   → Artifact Registry              │
   │     └── deploy → Cloud Run               │
   │                  (auth via OIDC / WIF)   │
   └──────────────────────────────────────────┘
```

#### Stack imposée

**Plateforme**

- Cloud Run (service `rag-api`, public, region `europe-west1`)
- Cloud SQL for Postgres 15+ (instance `rag-db`, tier `db-f1-micro`, single zone)
- Cloud Storage (bucket `simplon-<binome>-corpus`, classe `STANDARD`, uniform access)
- Artifact Registry (repo Docker `rag-images`, region `europe-west1`)
- Secret Manager (au moins `mistral-api-key` et `db-password`)

**CI/CD**

- GitHub Actions, workflows dans `.github/workflows/`
- Authentification GCP via **Workload Identity Federation** (pas de clé JSON)
- Image taggée par **SHA court du commit**
- Pipeline déclenchée sur `push` `main` (et `pull_request` pour CI only)

**Conteneurisation**

- Dockerfile **multi-stage** pour `api/`
- Image runtime **non-root**, basée sur `python:3.12-slim` ou distroless
- `.dockerignore` propre

**Frontend Streamlit** *(optionnel)*

- Déployable sur un deuxième service Cloud Run `rag-frontend`
- Consomme l'API via son URL Cloud Run
- Public (`--allow-unauthenticated`)

> **Frontend = optionnel** dans la version « minimum viable » de ce brief.
> Pour valider C18 N3, on attend le déploiement de l'API + sa pipeline.
> Le frontend Cloud Run = bonus.

#### Point de départ

Le repo de la semaine précédente (`simplon-rag-sample` issu de votre fork)
contient déjà :

- L'API FastAPI **instrumentée** (logs JSON, métriques Prometheus, intégration Langfuse)
- Le `docker-compose.yml` complet
- Les migrations Alembic
- Un script de seed du corpus

Vous travaillez **sur une nouvelle branche** `feat/deploy-gcp` à partir de la
branche `main` validée la semaine précédente. À la fin du brief, la branche
sera fusionnée et la pipeline déploiera automatiquement.

Une **clé Mistral partagée** avec un budget plafonné à **20 €/binôme** vous
est remise. **Un projet GCP par binôme** vous a été créé (`simplon-rag-<binome>`)
avec :

- Un **budget de 30 €** + alertes 50 / 90 / 100 %
- Vous (les 2 du binôme) en `roles/owner`

> ⚠️ **RGPD et confidentialité** : les contraintes restent les mêmes qu'en
> semaine 1. Vos logs Cloud Logging ne doivent pas contenir de PII ni de
> contenu brut. Vos backups Cloud SQL contiennent des données personnelles
> potentielles → vérifier que la **rétention est limitée à 7 jours** pour la formation.

---

## 🧭 Modalités pédagogiques

### Organisation générale

- Travail en binôme (mêmes binômes que la semaine observabilité)
- Durée : 1,5 jour (J4 après-midi + J5 entière)
- Branche dédiée `feat/deploy-gcp` puis Pull Request sur `main`
- Peer programming : 1 personne derrière le clavier par étape et switch sur l'étape suivante
- Au moins **1 commit par phase** terminée

### Phase 1 — Préparation et image Docker *(J4 après-midi, ~3 h)*

- initialiser le projet GCP / ajouter binome
- Activer les API GCP
- Préparation de l'image Docker
- Ajouter les images dans artefact registry de GCP (pensez au tag)

**Questions guidantes**

- Quels fichiers **NE** doivent **PAS** entrer dans l'image?
- Comment tagger l'image Docker ?
- Comment vérifier la taille de l'image et pourquoi est-ce important pour le cold start ?

**Pas à pas**

Sur le repo `simplon-rag-sample` :

- Créer la branche `feat/deploy-gcp` à partir de `main`
- Écrire / nettoyer le `Dockerfile` de `api/` en **multi-stage**, runtime
  non-root, image de base `python:3.12-slim`
- Ajouter ou compléter le `.dockerignore`
- Build local : `docker build -t rag-api:dev ./api`
- Test local : `docker run -p 8080:8080 -e DB_HOST=... rag-api:dev`
- Initialiser le projet GCP (s'il n'est pas déjà actif) et activer les APIs
  nécessaires : `run`, `artifactregistry`, `sqladmin`, `storage`,
  `secretmanager`, `iam`
- Créer le repository **Artifact Registry** `rag-images`
- Pousser l'image v1 avec le **SHA court du commit comme tag**

### Phase 2 — Cloud SQL + corpus GCS *(J5 matin, ~2 h)*

- créer la base de données et le schéma de donnée sur GCP
- modifier le code du cli pour qu'il télécharge le corpus depuis GCS ou si chargé depuis l'api le stocke sur GCS.
- Ajouter un service docker compose minio en local (bucket S3)
- Créer le bucket GCS

**Questions guidantes**

- Pourquoi ne pas embarquer le corpus dans l'image Docker ?
- Comment migrer la base sans interrompre le service quand il sera en prod ?

**Pas à pas**

- Créer une instance **Cloud SQL Postgres 15 ou 16** (`rag-db`, single zone, db-f1-micro)
- Créer la base `rag` et l'user `rag_app` (mot de passe stocké dans Secret Manager)
- Activer l'**extension `pgvector`**
- Lancer le **Cloud SQL Auth Proxy** en local et **exécuter les migrations
  Alembic** contre Cloud SQL
- Créer le bucket GCS `simplon-<binome>-corpus`, uploader le corpus de test
- Modifier le code du cli pour qu'il télécharge le corpus
  depuis GCS ou si chargé depuis l'api le stocke sur GCS

### Phase 3 — Déploiement Cloud Run + secrets *(J5 matin, ~1 h 30)*

- Créer une **service account dédiée** `rag-api@...` avec :
  - `roles/cloudsql.client`
  - `roles/secretmanager.secretAccessor`
  - `roles/storage.objectViewer` (sur le bucket uniquement)
  - `roles/logging.logWriter`
- Créer les secrets `mistral-api-key` et `db-password` dans Secret Manager
- Déployer l'API sur Cloud Run :
  - SA dédiée
  - `--add-cloudsql-instances=...`
  - `--update-secrets=...`
  - `--memory=1Gi --cpu=1 --max-instances=5`
  - `--allow-unauthenticated`
- Vérifier que l'endpoint `/health` répond et qu'une conversation traverse la stack
  (Cloud Run → Cloud SQL → Mistral) sans erreur

**Questions guidantes**

- Quels droits IAM exactement la service account Cloud Run a-t-elle besoin sur le bucket ?
- Pourquoi créer une SA dédiée plutôt qu'utiliser la SA Compute par défaut ?
- Comment vérifier les logs en cas de 500 sur Cloud Run ?
- Si une variable d'env oubliée fait planter le start-up, comment rollback rapidement ?

### Phase 4 — Pipeline GitHub Actions *(J5 après-midi, ~2 h)*

- Configurer **Workload Identity Federation** côté GCP (cf. cours 08) et créer
  la SA `github-actions@...` avec :
  - `roles/run.admin`
  - `roles/artifactregistry.writer`
  - `roles/iam.serviceAccountUser` sur la SA `rag-api@...`
- Écrire le workflow `.github/workflows/ci-cd.yml` avec **3 jobs** :
  1. `lint-test` (déclenché sur PR et push)
  2. `build-push` (déclenché uniquement sur push `main`)
  3. `deploy` (déclenché après `build-push`)
- Le job `deploy` doit :
  - Authentifier via WIF (`google-github-actions/auth@v2`)
  - Déployer la nouvelle image sur Cloud Run avec **tous** les paramètres
    (secrets, env, SA, Cloud SQL)
- Faire un **commit factice** sur `main` et vérifier que la pipeline déploie
  une nouvelle révision en < 10 min

**Questions guidantes**

- Pourquoi ne pas committer une clé JSON de SA ?
- Comment éviter qu'un push sur une branche topique ne déclenche un deploy en prod ?
- Comment exposer le SHA court du commit au job `deploy` pour tagger l'image ?

### Phase 5 — Mini chaos test *(J5 fin d'après-midi, ~30 min)*

> **Continuité de C21.**

Trois mini-incidents injectés par le formateur, à diagnostiquer en moins de 10 min chacun :

1. Le formateur **désactive le rôle `cloudsql.client`** sur la SA `rag-api`.
   Que se passe-t-il ? Comment le voir ? Comment réparer ?
2. Le formateur **supprime la version `latest` du secret `mistral-api-key`**.
   Comment le détecter ? Quel pattern aurait évité ça ?
3. Le formateur fait un commit qui casse les tests, vous montre la PR.
   Que doit-il se passer côté pipeline ? Pourquoi est-ce vital ?

### Phase 6 — Bonus (optionnel)

Si vous avez le temps :

- Déployer aussi le **frontend Streamlit** sur un second service Cloud Run
- Ajouter un job `terraform-plan` qui exporte l'état GCP sous forme de fichier
  Terraform (`terraformer`)
- Mettre en place une **alerte Cloud Monitoring** sur le taux d'erreur 5xx du Cloud Run
- Configurer un domaine custom (`rag-formation.simplon.dev`) avec Cloud Run domain mapping

### Soutenance *(J5 fin de journée, 10 min/binôme)*

- **7 min de démo** :
  - Montrer un push sur `main` qui déclenche la pipeline et déploie en prod
  - Faire une conversation live contre l'URL Cloud Run
  - Montrer un rollback de révision (`gcloud run services update-traffic`)
- **3 min de questions** du formateur

Travail attendu en autonomie **Niveau 3** sur C18 (CI/CD), **Niveau 2** sur
C17 (déploiement) et C19 (infra cloud), continuité **Niveau 2** sur C21.

---

## 📊 Modalités d'évaluation

L'évaluation se fait en **2 volets**.

### Volet 1 — Évaluation continue *(40 %)*

Le formateur passe sur chaque binôme à intervalles réguliers. Il observe :

- la progression effective sur les 5 phases
- la **maîtrise IAM** (capacité à expliquer ce que fait chaque rôle attribué)
- la **qualité des commits** (atomiques, Conventional Commits, messages clairs)
- la **propreté de la branche** (rebasable, pas de secrets committés)

### Volet 2 — Soutenance et livrables *(60 %)*

- Démonstration live de 7 min (cf. plus haut)
- Questions techniques (3 min) du jury
- Évaluation de la complétude du repo (cf. checklist livrables)
- Évaluation de la qualité de la pipeline (durée, cache, jobs séparés)

### Conditions de passage

- Le repo GitHub a **une PR `feat/deploy-gcp` mergée** sur `main`
- La pipeline GitHub Actions est **verte** au minimum sur le dernier commit de `main`
- L'URL Cloud Run **répond `200 OK`** sur `/health`
- Une **conversation complète** peut être faite live contre l'URL
- **Au minimum 2 secrets** sont gérés via Secret Manager (pas en env var en clair)
- **Aucune clé JSON** de service account n'est committée dans le repo

Une compétence est validée si tous les critères de performance correspondants
sont remplis (cf. section suivante).

---

## 📦 Livrables attendus

### Livrable principal — Repo GitHub PUBLIC

Structure du repo, complétée par rapport à la semaine précédente :

```text
simplon-rag-sample/
├── README.md                         (MAJ : section Déploiement GCP)
├── docker-compose.yml                (toujours fonctionnel pour le local)
├── .github/
│   └── workflows/
│       └── ci-cd.yml                 (NOUVEAU — pipeline complète)
├── .dockerignore                     (NOUVEAU ou MAJ)
├── api/
│   ├── Dockerfile                    (MAJ — multi-stage, non-root)
│   ├── pyproject.toml                (ajout : google-cloud-storage)
│   ├── main.py                       (lecture corpus depuis GCS)
│   └── ...                           (reste de la semaine précédente)
├── frontend/                         (inchangé, bonus si déployé)
├── docs/
│   ├── deploy.md                     (NOUVEAU — pas-à-pas du déploiement)
│   ├── gcp-architecture.md           (NOUVEAU — schéma + justifications)
│   └── runbook-pipeline.md           (NOUVEAU — que faire si la pipeline casse)
├── infra/                            (BONUS, si vous tentez Terraform)
│   └── terraform/
│       └── main.tf
└── (le reste de la semaine 1)
```

### Contenu obligatoire du README (section "Déploiement GCP")

- Architecture GCP cible avec **schéma Mermaid**
- Liste des services GCP utilisés + une phrase de rôle pour chaque
- Liste des rôles IAM attribués à chaque SA (avec justification "pourquoi celui-là et pas un plus large")
- Procédure de **bootstrap** d'un nouveau projet GCP en partant de zéro
  (ordre des commandes `gcloud services enable`, création SA, etc.)
- Procédure de **rollback** d'une révision Cloud Run
- Procédure de **rotation** du secret `mistral-api-key`
- Auteur·rice·s

### Hors repo (à présenter en soutenance)

- URL Cloud Run **publique et fonctionnelle**
- Démo d'un déploiement complet via Pull Request → merge → push → release Cloud Run
- Démo d'un rollback de révision en moins de 30 s
- Réponses aux questions techniques du jury

---

## ✅ Critères de performance

### C17 — Déployer un service d'IA *(Niveau 2)*

- L'image Docker de l'API est **construite en multi-stage**, runtime
  `python:3.12-slim` ou distroless, user non-root
- L'image est poussée sur **Artifact Registry**, taggée par **SHA de commit**
- L'API est déployée sur **Cloud Run** avec une SA dédiée, secrets via Secret
  Manager, connexion Cloud SQL via socket Unix
- L'endpoint `/health` répond `200 OK` depuis Internet
- Le `README.md` documente la **procédure de rollback** sur Cloud Run et
  l'apprenant·e sait l'exécuter live en soutenance (≤ 30 s)
- La **taille de l'image finale** est en dessous de **400 Mo**

### C18 — Industrialiser un projet via CI/CD *(Niveau 3)*

- Workflow GitHub Actions composé d'**au moins 3 jobs séparés** :
  `lint-test`, `build-push`, `deploy`
- Le job `deploy` ne se déclenche **que sur `push` sur `main`** ET après succès
  des jobs précédents
- Authentification GCP via **Workload Identity Federation** — **aucune clé
  JSON** dans les secrets GitHub ni dans le repo
- L'image est taggée par **SHA court du commit** (pas `latest`)
- Le cache Docker layer est activé (`cache-from: type=gha`)
- La pipeline complète prend **moins de 8 min** (mesure dans GitHub Actions)
- Sur un `push` qui casse les tests : la pipeline **échoue** et **rien n'est déployé**
- Un commit sur une branche topique ne déclenche **pas** de déploiement
- Le `README.md` justifie le choix WIF vs clé JSON (1 paragraphe)

### C19 — Mettre en œuvre une infrastructure cloud *(Niveau 2)*

- **3 services GCP** au minimum sont provisionnés : Cloud Run, Cloud SQL, Cloud Storage
- L'instance Cloud SQL a **pgvector activé**, base + user `rag_app` créés
- Le bucket GCS est configuré en **uniform access**, jamais ouvert à `allUsers`
- Une **alerte de budget** est active sur le projet (50 / 90 / 100 %)
- Les **service accounts** suivent le **principle of least privilege** :
  aucun `roles/owner`, `roles/editor`, ni `roles/storage.admin` sur les SA d'application
- La région est **cohérente** sur tous les services (`europe-west1` ou `europe-west9`)
- Le `README.md` contient un schéma d'architecture **Mermaid** ou image

### C21 — Résoudre les incidents *(Niveau 2, continuité)*

- Au moins **2 incidents sur 3** du chaos test sont diagnostiqués via les
  logs Cloud Logging et résolus en moins de 10 min
- L'apprenant·e sait afficher les logs d'une révision Cloud Run :
  `gcloud run services logs read`
- L'apprenant·e sait inspecter les bindings IAM d'un projet ou d'une ressource
- Un mini post-mortem de l'incident le plus représentatif est ajouté à
  `post-mortem/incident-gcp-XXX.md` (3-4 paragraphes, trame allégée par
  rapport à la semaine précédente)

---

## 🔗 Ressources suggérées

### Cours de la semaine

- `cours/01-concepts-cloud.md` — IaaS / PaaS / SaaS / CaaS
- `cours/03-gcp-overview.md` — Console + gcloud + projets
- `cours/04-gcp-cloud-run.md` — déploiement, révisions, secrets, Cloud SQL
- `cours/05-gcp-cloud-sql.md` — instance, pgvector, connector
- `cours/06-gcp-storage.md` — buckets, signed URLs
- `cours/07-gcp-iam-secrets.md` — SA, rôles, Secret Manager
- `cours/08-cicd-github-actions.md` — pipeline complète, OIDC
- `cours/09-docker-revisions.md` — multi-stage, sécurité

### Documentation officielle

- [Cloud Run — Quickstarts](https://cloud.google.com/run/docs/quickstarts)
- [Cloud Run + Cloud SQL guide](https://cloud.google.com/sql/docs/postgres/connect-run)
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [Secret Manager](https://cloud.google.com/secret-manager/docs)
- [pgvector on Cloud SQL](https://cloud.google.com/blog/products/databases/announcing-vector-search-in-cloud-sql)
- [Workload Identity Federation for GitHub](https://github.com/google-github-actions/auth)

### Référence pédagogique

- [Stéphane Robert — Cloud](https://blog.stephane-robert.info/docs/cloud/)
- [Stéphane Robert — GCP](https://blog.stephane-robert.info/docs/cloud/gcp/)
- [Stéphane Robert — CI/CD](https://blog.stephane-robert.info/docs/cicd/)

### Sécurité

- [Best practices for IAM](https://cloud.google.com/iam/docs/using-iam-securely)
- [Cloud Run security](https://cloud.google.com/run/docs/securing/security)

### Starter projects (rappel)

- [maxime-lenne/simplon-rag-sample](https://github.com/maxime-lenne/simplon-rag-sample) — projet de la semaine 1
- [maxime-lenne/simplon-todo-app-starter](https://github.com/maxime-lenne/simplon-todo-app-starter) — alternative légère si le RAG bloque
