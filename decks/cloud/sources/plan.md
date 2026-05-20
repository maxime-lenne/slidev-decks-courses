# Cloud — Plan de présentation

**Durée :** ~5 h de cours réparties en 8 modules de 30 à 45 min (formation modulaire jouable mardi → vendredi)
**Public :** Apprenant·e·s Simplon Dev IA — onboarding cloud, expérience Docker et Postgres acquise, RNCP 2023 (compétences C17, C18, C19, C21)
**Format :** Cours magistral + atelier guidé via le brief `sources/brief/BRIEF.md` (déploiement RAG sur GCP)
**Langue :** Français
**Thème Slidev :** `maxime-lenne`

---

## Core Message

> « Du local à la prod GCP : **conteneur + managed services + pipeline = autonomie**. À la fin de la semaine, un `git push` redéploie ton API en production sur Cloud Run, connectée à Cloud SQL et au corpus GCS, sécurisée par IAM et Secret Manager — sans clé JSON qui traîne. »

## Call to Action

**Livrer le brief** : URL Cloud Run live + pipeline GitHub Actions verte + soutenance 7 min en démo (push → deploy → rollback). Compétences C17 N2, C18 N3, C19 N2, C21 N2 validées en fin de semaine.

---

## Sources Used

| Source | Description |
|--------|-------------|
| `sources/README.md` | Vue d'ensemble de la semaine + objectifs pédagogiques + compétences RNCP visées |
| `sources/planning/planning-semaine.md` | Planning heure par heure (lundi → vendredi) — référence pour le découpage horaire |
| `sources/cours/01-concepts-cloud.md` | Définition NIST, XaaS, modèles de déploiement, shared responsibility, FinOps, vocabulaire |
| `sources/cours/02-gcp-overview.md` | Hiérarchie GCP, projet vs billing, régions/zones, console, gcloud, Cloud Shell, sécurité jour 1 |
| `sources/cours/04-gcp-cloud-run.md` | Cloud Run, Artifact Registry, révisions, traffic, concurrence, Cloud SQL connector |
| `sources/cours/05-gcp-cloud-sql.md` | DBaaS, pgvector, Cloud SQL Auth Proxy, IAM, backups, IAM DB auth |
| `sources/cours/06-gcp-storage.md` | Stockage objet, buckets, classes, signed URLs, IAM uniform |
| `sources/cours/07-gcp-iam-secrets.md` | Principal/Role/Resource, Service Accounts, least privilege, Secret Manager |
| `sources/cours/09-iac-introduction.md` | Source pour la slide IaC condensée (Terraform / Pulumi / GitOps) |
| `sources/brief/BRIEF.md` | Brief atelier RAG-on-GCP — architecture cible utilisée comme fil rouge |
| Recherche web — cloud souverain France 2026 | SecNumCloud 3.2, NumSpot, S3NS (PREMI3NS), Bleu, Outscale, parts de marché et adoption État |
| Recherche web — comparatif hyperscalers 2026 | AWS ~31 %, Azure ~25 %, GCP ~11 % ; Scaleway / OVH 30-60 % moins chers ; catalogue services |
| Recherche web — GCP Networking | VPC, Cloud Load Balancing, Cloud DNS, Cloud NAT, IP statiques |
| Recherche web — GCP Data services 2026 | BigQuery, Dataflow (Apache Beam), Pub/Sub, Dataproc (Spark/Hadoop), Cloud Composer (Airflow), Looker |
| Recherche web — GCP AI/ML 2026 | **Vertex AI renommé "Gemini Enterprise Agent Platform"** en 2026, Gemini 3 Flash, Document AI, Vision AI, AutoML, pricing |

---

## Time Allocation

| Module | Section | Durée | Slides | Focus |
|---|---|---|---|---|
| 0 | Ouverture (cover + présentation + agenda) | 5 min | 4 | Cadre |
| 1 | Concepts cloud + souveraineté + comparatif + IaC + archi | 45 min | 16 | Vocabulaire commun |
| 2 | GCP overview + VPC / réseau | 45 min | 14 | Naviguer GCP |
| 3 | Cloud Run + Artifact Registry | 45 min | 12 | Déployer un conteneur |
| 4 | Cloud SQL + pgvector | 35 min | 10 | DBaaS pour l'IA |
| 5 | Cloud Storage (GCS) | 25 min | 8 | Stockage objet |
| 6 | IAM + Service Accounts + Secret Manager | 35 min | 10 | Sécurité jour 1 |
| 7 | Services Data GCP | 30 min | 9 | Panorama Data |
| 8 | Services AI/ML GCP | 30 min | 9 | Panorama IA managée |
| 9 | Atelier : brief RAG-on-GCP (cadrage + Q&A) | 15 min | 5 | Lancement atelier |
| 10 | Clôture (Let's build together) | 3 min | 2 | CTA |
| **Total** | | **~5 h 13** | **~99** | |

> ⚠️ Slidev rend à 1280×720 — chaque slide est plafonnée à ~10-12 lignes de corps. Tout dépassement = découpage en 2 slides. À surveiller pendant `/slidev:create`.

---

## Section 1 — Concepts cloud (45 min, ~16 slides)

### Key points

- Définition NIST (5 caractéristiques) et démythification (« cloud ≠ ordinateur de quelqu'un d'autre »)
- Pile XaaS : IaaS / CaaS / KaaS / PaaS / DBaaS / FaaS / SaaS — qui gère quoi
- Modèles de déploiement : public / privé / hybride / multi-cloud / **souverain**
- **Slide dédiée cloud souverain France 2026** : SecNumCloud 3.2 (OVHcloud, Outscale, NumSpot), cloud de confiance (Bleu, S3NS PREMI3NS), Cloud Act / RGPD
- **Tableau comparatif AWS / Azure / GCP / Scaleway / OVHcloud** (parts de marché 2026, catalogue, prix, souveraineté)
- **Tableau des équivalents services sur les 3 hyperscalers majeurs** (Compute, CaaS, BDD, Object Storage, Secrets, IAM, Logs, Functions, K8s, Container Registry)
- Shared responsibility model — schéma générique
- FinOps light : pay-as-you-go vs engagement vs spot, egress, alerte budget
- **Slide IaC condensée** : déclaratif vs impératif, Terraform / Pulumi / Ansible / Crossplane, GitOps en 1 schéma
- **Slides conception & diagrammes d'archi** : 3-tiers, event-driven, microservices, RAG (préfiguration de l'atelier)
- Cas du Dev IA : tableau XaaS recommandé par composant (API, BDD vectorielle, LLM tiers, corpus, etc.)

### Visuals needed

- [ ] Diagramme stack XaaS — qui gère quoi (Mermaid block ou layout deux colonnes)
- [ ] Schéma shared responsibility model (matrice IaaS / CaaS-PaaS / SaaS × couches)
- [ ] Diagramme déclaratif vs impératif (Mermaid)
- [ ] Schéma type d'architecture 3-tiers + event-driven + RAG (3 patterns côte à côte)
- [ ] Screenshot console GCP > Billing > Alerte budget
- [ ] Tableau hyperscalers (Markdown)
- [ ] Tableau services AWS / Azure / GCP (Markdown)
- [ ] Tableau souverains France (Markdown)

### Talking points

- Insister sur « pas de cloud = pas les 5 critères NIST » pour éviter le piège marketing
- Pour le cloud souverain : Cloud Act, données vs métadonnées, distinction « cloud souverain » vs « cloud de confiance »
- Pour le tableau équivalents : Cloud Run = App Runner / Fargate (AWS), Container Apps (Azure). Cloud SQL = RDS / Azure Database. GCS = S3 / Blob Storage
- IaC : sans rentrer dans Terraform, faire passer « l'idée du code versionné qui crée l'infra » — Terraform sera vu en semaine N+1
- Archi : montrer qu'un schéma RAG est un assemblage de briques managées

### Source

- `sources/cours/01-concepts-cloud.md` (cœur)
- Recherche web cloud souverain + comparatif hyperscalers
- `sources/cours/09-iac-introduction.md` (condensé)

---

## Section 2 — GCP overview + VPC / Réseau (45 min, ~14 slides)

### Key points

- GCP en 30 s : positionnement, forces (backbone, BigQuery, GKE), faiblesses (catalogue, doc)
- Hiérarchie : Organisation → Folder → Project → Resources
- Projet ≠ Billing Account (« mal foutu mais structurant ») — implication formation
- Régions et zones : choix pour Simplon → `europe-west1` (Belgique) en TP, `europe-west9` (Paris) en client
- Catalogue des services qu'on utilisera cette semaine (tableau avec équivalents AWS / Azure)
- Console GCP : navigation, palette de recherche `⌘+/`, épingler, audit log
- `gcloud` CLI : install, login, set project, commandes essentielles, configurations multiples
- Cloud Shell : la VM gratuite dans le navigateur
- **Slides réseau** (manquant identifié) :
  - VPC : réseau privé virtuel, subnets régionaux, firewall rules
  - Cloud Load Balancing : global vs régional, Application LB / Network LB
  - Cloud DNS : DNS managé, zones publiques / privées, DNS peering
  - Cloud NAT : sortie Internet sans IP publique, IP statiques pour allowlisting tiers
  - IP statiques : ephemeral vs reserved, cas d'usage
- Sécuriser dès le jour 1 : MFA + **alerte budget obligatoire** (commande `gcloud billing budgets create`)
- Mini-atelier de découverte (énoncé condensé — vrai atelier en mardi PM)

### Visuals needed

- [ ] Diagramme hiérarchie ressources (Mermaid arborescence)
- [ ] Schéma régions / zones (map ou bloc)
- [ ] Screenshot console GCP (page d'accueil + sélecteur projet)
- [ ] Screenshot Cloud Shell ouvert
- [ ] Diagramme VPC type : VPC → subnets → instances → firewall → Cloud NAT → Internet (Mermaid)
- [ ] Schéma Cloud Load Balancing (LB → backends régionaux multi-zone)
- [ ] Tableau services semaine (rappel)

### Talking points

- L'« ID de projet immutable » est un piège classique : choisir `simplon-rag-<binome>` une fois pour toutes
- Pour la formation : 1 projet par binôme, 0 droit sur le billing
- Réseau : par défaut tu n'auras pas à toucher au VPC pour Cloud Run (réseau auto), mais en projet client tu rencontreras vite VPC + Connector
- Cloud NAT : seul moyen d'avoir une IP statique de sortie pour Cloud Run vers un tiers qui allowliste

### Source

- `sources/cours/02-gcp-overview.md` (cœur)
- Recherche web — GCP networking overview

---

## Section 3 — Cloud Run + Artifact Registry (45 min, ~12 slides)

### Key points

- Définition : CaaS, conteneurs HTTP, scale-to-zero, autoscaling request-based
- Schéma modèle d'exécution (Load balancer Google → pool d'instances → container port 8080)
- Cloud Run service vs job (HTTP vs batch jusqu'à 24 h)
- **Contraintes à connaître** : port `PORT`, démarrage < 5 min, FS éphémère, stateless, HTTP/gRPC/WebSocket, 32 Gi/8 vCPU max, timeout 60 min
- Artifact Registry : `gcr.io` déprécié, création de repo, auth Docker, build/push, build distant via Cloud Build
- Déploiement Cloud Run (snippet `gcloud run deploy` annoté)
- Variables d'environnement vs secrets (`--update-env-vars` vs `--update-secrets`)
- Concurrence et autoscaling : `--concurrency`, `--min-instances`, `--max-instances`, formule RPS_max
- Cold start : leviers (min-instances, image légère, init paresseuse, `--cpu-boost`)
- Révisions et traffic splitting : canary, rollback (`update-traffic`)
- Authentification : public vs `--no-allow-unauthenticated`
- Connexion à Cloud SQL via socket Unix (transition vers section 4)
- Pièges classiques (tableau symptôme / cause / solution)

### Visuals needed

- [ ] Diagramme modèle d'exécution Cloud Run (Mermaid ou ASCII annoté)
- [ ] Schéma révisions + traffic splitting (3 révisions × % trafic)
- [ ] Snippet `gcloud run deploy` complet avec highlight progressif
- [ ] Tableau pièges classiques (Markdown)
- [ ] Screenshot console > Cloud Run > liste des révisions
- [ ] Screenshot logs Cloud Run

### Code examples

1. **`gcloud run deploy` complet** (bash) — déploiement initial, highlight progressif sur `--memory`, `--max-instances`, `--concurrency`, `--allow-unauthenticated`
2. **`docker build` + `docker push`** (bash) — tag par SHA
3. **`gcloud run services update-traffic`** (bash) — canary 10 % puis rollback
4. **DSN Cloud SQL via socket Unix** (Python SQLAlchemy) — préfiguration section 4

### Talking points

- Rappeler la règle de l'image **amd64** (piège Mac M-series) — préfigure le module Docker bonus
- Insister sur le tag SHA vs `latest`
- Le coût d'un Cloud Run mal configuré (200 € en un week-end) — sortir l'anecdote du `min-instances=10`

### Source

- `sources/cours/04-gcp-cloud-run.md`

---

## Section 4 — Cloud SQL + pgvector (35 min, ~10 slides)

### Key points

- Pourquoi un DBaaS — ce que Cloud SQL gère pour toi (HA, backups, patch, monitoring, failover)
- Cloud SQL en 30 s : Postgres / MySQL / SQL Server ; AlloyDB / Spanner / BigQuery comme niveau supérieur
- Création d'instance : champs clés (tier `db-f1-micro` pour formation), commande `gcloud sql instances create`
- Notion d'**Instance Connection Name** (`projet:region:instance`)
- Bases et utilisateurs : créer un user `rag_app` dédié, droits minimaux
- **Extension pgvector** : `CREATE EXTENSION vector`, dimensions Mistral (1024), index HNSW
- Connecter Cloud Run à Cloud SQL via socket Unix : droits SA, `--add-cloudsql-instances`, env vars, DSN SQLAlchemy
- Connexion locale via Cloud SQL Auth Proxy pour migrations Alembic
- Backups automatiques quotidiens + PITR (désactivé en `db-f1-micro` !)
- IAM Database Authentication (vue rapide, hors scope brief)
- Pièges classiques

### Visuals needed

- [ ] Diagramme Cloud Run → Cloud SQL via socket Unix `/cloudsql/...`
- [ ] Snippet SQL `CREATE TABLE chunks(embedding vector(1024))` + index HNSW
- [ ] Snippet `cloud-sql-proxy` en local
- [ ] Tableau tier vs usage (formation / staging / prod)
- [ ] Screenshot console > Cloud SQL > Flags pgvector

### Code examples

1. **`gcloud sql instances create`** (bash) — tier `db-f1-micro`, single zone
2. **`CREATE EXTENSION vector` + table chunks + index HNSW** (SQL)
3. **DSN SQLAlchemy via socket Unix** (Python asyncpg)
4. **Lancer `cloud-sql-proxy` en local** (bash) — pour migrations Alembic

### Talking points

- Le **PITR désactivé en `db-f1-micro`** est un piège prod — toujours l'activer en projet client
- Pourquoi pas l'IP publique : surface d'attaque + latence SSL → socket Unix > tout
- `mistral-embed` = 1024 dims, l'oublier dans `vector(dim)` → erreur d'index

### Source

- `sources/cours/05-gcp-cloud-sql.md`

---

## Section 5 — Cloud Storage (GCS) (25 min, ~8 slides)

### Key points

- Stockage objet vs bloc vs fichier (tableau)
- Caractéristiques : plat, immuable, scalable, pas pour la haute fréquence
- Buckets : namespace global → préfixer `simplon-<binome>-...`
- Classes de stockage : Standard / Nearline / Coldline / Archive (tableau coûts + min retention)
- Lifecycle policies (snippet JSON)
- Uniform vs Fine-grained access (toujours uniform)
- CLI : `gcloud storage cp / ls / rm`
- Lecture / écriture depuis Python (`google-cloud-storage`)
- Auth Cloud Run : pas de clé JSON, juste un rôle sur la SA
- **Signed URLs** : partage temporaire sans IAM, code Python + use-case RAG (PDF source de citation)
- Versioning + soft delete (7 jours par défaut)
- Pièges classiques

### Visuals needed

- [ ] Tableau bloc / fichier / objet
- [ ] Tableau classes de stockage (coûts 2026)
- [ ] Diagramme cycle de vie : Standard → Nearline → Coldline → Delete
- [ ] Schéma signed URL : frontend → API → URL signée → GCS direct
- [ ] Screenshot console > bucket avec hierarchy de dossiers virtuels

### Code examples

1. **`gcloud storage buckets create`** (bash) — uniform access, location régionale
2. **Lecture / écriture Python** (`google.cloud.storage`) — Cloud Run SA implicite
3. **Signed URL** (Python) — `generate_signed_url(method="GET", expiration=15min)`

### Talking points

- Bucket public ouvert au monde = top 1 des incidents de fuite depuis 2018
- Egress (sortie réseau) coûte ~0,12 $/Go — co-localiser bucket et Cloud Run
- Signed URL = pattern « le frontend télécharge direct sans repasser par l'API »

### Source

- `sources/cours/06-gcp-storage.md`

---

## Section 6 — IAM + Service Accounts + Secret Manager (35 min, ~10 slides)

### Key points

- Triangle IAM : **Principal × Role × Resource** (slide schéma)
- Types de principals : User, Group, SA, Workload Identity Federation, `allUsers`
- Familles de rôles : Basic (à éviter) / Predefined (à privilégier) / Custom
- Héritage IAM : Organisation → Project → Resource — binder au plus bas
- Commandes : `gcloud projects get-iam-policy`, `add-iam-policy-binding`, `remove-iam-policy-binding`
- **Service Accounts** : email `<sa>@<project>.iam.gserviceaccount.com`, use-cases (Cloud Run, CI, VM)
- Créer une SA dédiée + bindings minimaux (snippet bash récap brief)
- Clés JSON de SA : **à éviter** — préférer WIF
- **Secret Manager** : créer secret, versions, accès SA, injection Cloud Run via `--update-secrets`
- Principle of least privilege en pratique : commencer à 0, ajouter sur `Forbidden`
- Outil : Policy Analyzer (console)
- **Tableau récap brief** : rôles à donner à la SA `rag-api` et à la SA `github-actions` (préfigure CI/CD)

### Visuals needed

- [ ] Triangle Principal / Role / Resource (Mermaid ou schéma)
- [ ] Diagramme héritage IAM (arborescence)
- [ ] Tableau familles de rôles (Basic / Predefined / Custom)
- [ ] Tableau récap rôles SA `rag-api` (cible brief)
- [ ] Screenshot console > IAM > Policy Analyzer

### Code examples

1. **Création SA + bindings minimaux** (bash) — séquence complète pour le brief
2. **Création secret + versioning + accès SA** (bash) — `gcloud secrets create / versions add / add-iam-policy-binding`
3. **Injection secret dans Cloud Run** (bash) — `--update-secrets=KEY=secret-name:latest`

### Talking points

- Anti-pattern formation : `roles/owner` sur la SA — escalade de privilèges + suppression projet
- Versioning des secrets : rotation triviale, on bascule Cloud Run sur v2, désactive v1
- `add-iam-policy-binding` est additif (piège), pour les changements complexes → `set-iam-policy`

### Source

- `sources/cours/07-gcp-iam-secrets.md`

---

## Section 7 — Services Data GCP (30 min, ~9 slides) — NOUVEAU

### Key points

- **Panorama** : data ingestion → traitement → stockage → analyse → visualisation
- **BigQuery** : data warehouse serverless columnar, ANSI SQL, BigQuery ML, pricing storage + queries
- **Cloud Pub/Sub** : messaging global managé, ingestion temps réel (logs, clickstream, IoT, events)
- **Dataflow** : Apache Beam (batch + streaming unifiés), serverless, pipelines ETL, intégration BigQuery / Pub/Sub
- **Dataproc** : Spark / Hadoop managés — migration lift-and-shift de stacks Hadoop existantes
- **Cloud Composer** : Apache Airflow managé, orchestration DAGs Python, opérateurs BigQuery / Dataflow / Dataproc / GCS
- **Looker / Looker Studio** : viz dashboards (gratuit) vs modèle sémantique gouverné (entreprise)
- **Quand choisir quoi ?** Tableau de décision (batch / streaming / ETL / orchestration / BI)
- Architecture type : Pub/Sub → Dataflow → BigQuery → Looker (slide diagramme)
- **Équivalents AWS / Azure** rapide : BigQuery ↔ Redshift / Synapse, Dataflow ↔ Kinesis Data Analytics / Stream Analytics, Composer ↔ MWAA / Data Factory

### Visuals needed

- [ ] Schéma pipeline Data type : Pub/Sub → Dataflow → BigQuery → Looker (Mermaid)
- [ ] Tableau « Quand choisir quoi » (services × cas d'usage)
- [ ] Tableau équivalents AWS / Azure
- [ ] Screenshot BigQuery console (interface SQL)
- [ ] Screenshot Looker Studio dashboard exemple

### Code examples

1. **Requête BigQuery simple + BigQuery ML** (SQL) — `SELECT ... FROM dataset.table` + `CREATE MODEL ... LOGISTIC_REG`
2. **DAG Airflow minimal** (Python) — opérateur `BigQueryInsertJobOperator`

### Talking points

- Hors scope du brief de la semaine mais à connaître pour le profil **Dev IA**
- BigQuery a une vraie singularité : **stockage + compute découplés**, scalable infini, pricing à la requête
- Dataflow est l'outil de référence streaming sur GCP — équivalent ouvert de Beam

### Source

- Recherche web — GCP Data services 2026

---

## Section 8 — Services AI/ML GCP (30 min, ~9 slides) — NOUVEAU

### Key points

- ⚠️ **News 2026** : **Vertex AI a été renommé "Gemini Enterprise Agent Platform"** — toutes les features (Model Garden, AutoML, Pipelines, Endpoints, Model Registry) sont rebrandées
- **Gemini API** : modèles multimodaux (texte, image, vidéo) — Gemini 3 Flash, Gemini 2.5 Flash-Lite
- **Pricing 2026** : Gemini 2.5 Flash-Lite à 0,10 $/M tokens in, 0,40 $/M tokens out ; Gemini 3 Flash à 0,50 / 3,00 $
- **AutoML** : classification image, détection objet, forecasting tabulaire, NLP — sans écrire de code ML
- **Vision AI** (ex Vertex AI Vision) : ingestion + analyse de vidéo, applications no-code
- **Document AI** : extraction de données structurées depuis documents (factures, formulaires, contrats)
- **Speech-to-Text** / **Text-to-Speech** / **Translation** : APIs prêtes à l'emploi
- **Model Garden** : catalogue de modèles open-source (Llama, Mistral, Claude via partner) déployables en 1 clic
- **Quand utiliser quoi ?** Tableau de décision (généraliste / vertical métier / sur mesure)
- Intégration avec le stack du brief : Cloud Run + Gemini API en SaaS (vs Mistral aujourd'hui)
- **Coûts cachés** : Code Execution, Sessions, Memory Bank facturés depuis février 2026
- **Équivalents AWS / Azure** : Gemini Enterprise ↔ SageMaker / Azure AI Foundry ; Document AI ↔ Textract / Document Intelligence

### Visuals needed

- [ ] Schéma catalogue AI/ML GCP (Mermaid ou layout grid : généraliste / vertical / sur mesure)
- [ ] Tableau pricing Gemini (modèle × in/out)
- [ ] Schéma intégration Cloud Run + Gemini (équivalent du brief avec Gemini au lieu de Mistral)
- [ ] Tableau équivalents AWS / Azure
- [ ] Screenshot Gemini Enterprise Agent Platform console

### Code examples

1. **Appel Gemini API** (Python `google-generativeai`) — generate_content basique
2. **Document AI** (Python) — `process_document` avec processor ID

### Talking points

- Insister sur le **rebrand 2026** : la doc qu'ils trouveront en ligne mentionne encore « Vertex AI » → mapper mentalement
- Pour le brief actuel : Mistral SaaS reste le choix → Gemini est une alternative à connaître
- Coûts cachés Memory Bank → toujours regarder la facture avant de mettre en prod

### Source

- Recherche web — GCP AI/ML 2026, Gemini Enterprise Agent Platform

---

## Section 9 — Atelier : brief RAG-on-GCP (15 min, ~5 slides)

### Key points

- Présentation de l'**architecture cible** du brief (schéma ASCII du `BRIEF.md` adapté en Mermaid)
- Stack imposée : Cloud Run + Cloud SQL (pgvector) + GCS + Secret Manager + Artifact Registry + GitHub Actions + WIF
- **5 phases** + bonus en 1 slide tabular
- Compétences validées : C17 N2, C18 N3, C19 N2, C21 N2
- Modalités d'évaluation rapides (40 % continu + 60 % soutenance)
- Conditions de passage (URL Cloud Run 200 OK, pipeline verte, ≥ 2 secrets en Secret Manager, 0 clé JSON committée)
- Slide « Au boulot ! » avec QR vers le repo de départ `maxime-lenne/simplon-rag-sample`

### Visuals needed

- [ ] Schéma archi cible (Mermaid) — basé sur le diagramme ASCII du BRIEF
- [ ] Tableau 5 phases + durée
- [ ] Tableau compétences C17/C18/C19/C21 + niveaux

### Source

- `sources/brief/BRIEF.md`

---

## Section 10 — Clôture (3 min, ~2 slides)

Réutilise le **template `decks/templates/slides.md`** :

1. Slide « Présentation » Maxime Lenne (about + liens)
2. Slide « Let's build together » (CTA final + QR LinkedIn, background Unsplash)

---

## Diagrams to Create

| # | Diagramme | Type | Module |
|---|---|---|---|
| 1 | Pile XaaS — qui gère quoi | Mermaid flowchart vertical | 1 |
| 2 | Shared responsibility model | Tableau / matrice | 1 |
| 3 | Déclaratif vs impératif (slide IaC) | Mermaid simple | 1 |
| 4 | Patterns d'archi (3-tiers, event-driven, RAG) | Mermaid x3 | 1 |
| 5 | Hiérarchie ressources GCP | Mermaid arborescence | 2 |
| 6 | VPC type GCP (subnets + firewall + NAT + LB) | Mermaid flowchart | 2 |
| 7 | Modèle d'exécution Cloud Run | Mermaid flowchart | 3 |
| 8 | Révisions + traffic splitting | Schéma layout | 3 |
| 9 | Cloud Run ↔ Cloud SQL socket Unix | Mermaid flowchart | 4 |
| 10 | Lifecycle GCS (Standard → Archive) | Mermaid | 5 |
| 11 | Signed URL flow | Mermaid sequence | 5 |
| 12 | Triangle IAM Principal × Role × Resource | Schéma | 6 |
| 13 | Pipeline Data Pub/Sub → Dataflow → BQ → Looker | Mermaid flowchart | 7 |
| 14 | Catalogue AI/ML (généraliste / vertical / sur mesure) | Mermaid grid | 8 |
| 15 | Archi cible brief RAG-on-GCP | Mermaid flowchart | 9 |

---

## Code Examples to Include

| # | Exemple | Langage | Module | Highlight |
|---|---|---|---|---|
| 1 | `gcloud projects list / config set / services enable` | bash | 2 | commandes essentielles |
| 2 | `gcloud billing budgets create` | bash | 2 | alerte budget (sécurité jour 1) |
| 3 | `gcloud artifacts repositories create + docker build/push` | bash | 3 | flux complet image |
| 4 | `gcloud run deploy` complet | bash | 3 | flags par groupe (progressive reveal) |
| 5 | `gcloud run services update-traffic` (canary + rollback) | bash | 3 | rollback en 30 s |
| 6 | DSN SQLAlchemy via socket Unix | Python | 4 | construction DSN |
| 7 | `CREATE EXTENSION vector` + table chunks + HNSW | SQL | 4 | dimension 1024 |
| 8 | `cloud-sql-proxy` en local | bash | 4 | migrations Alembic |
| 9 | `gcloud storage buckets create` + IAM uniform | bash | 5 | bonnes pratiques |
| 10 | Lecture GCS Python + signed URL | Python | 5 | `google.cloud.storage` |
| 11 | Création SA + bindings minimaux brief | bash | 6 | least privilege |
| 12 | `gcloud secrets create / versions add` + injection Cloud Run | bash | 6 | secrets versioned |
| 13 | Requête BigQuery + BigQuery ML | SQL | 7 | analytique serverless |
| 14 | Appel Gemini API generate_content | Python | 8 | SDK `google-generativeai` |

Tous les snippets ≤ 12 lignes pour rester dans le rendu 1280×720.

---

## Demo Plan

Pas de démo live (choix utilisateur). À la place, **ponctuation par screenshots** sur les moments clés :

| # | Screenshot à préparer | Module |
|---|---|---|
| 1 | Console GCP — sélecteur de projet | 2 |
| 2 | Console GCP — Billing > Alerte budget configurée | 2 |
| 3 | Cloud Shell ouvert avec `gcloud auth list` | 2 |
| 4 | Cloud Run — service `rag-api` avec liste révisions | 3 |
| 5 | Cloud Run — page « Logs » avec ligne JSON colorisée | 3 |
| 6 | Cloud SQL — instance `rag-db` + Flags pgvector activé | 4 |
| 7 | `psql` connecté via Cloud SQL Auth Proxy montrant `\dx vector` | 4 |
| 8 | Cloud Storage — bucket `simplon-...-corpus` avec PDFs | 5 |
| 9 | IAM — Policy Analyzer interrogeant la SA `rag-api` | 6 |
| 10 | Secret Manager — secret `mistral-api-key` avec 2 versions | 6 |
| 11 | BigQuery console — éditeur SQL avec résultat | 7 |
| 12 | Gemini Enterprise Agent Platform — Model Garden | 8 |

> 📌 À récolter au moment de `/slidev:create`. Stocker dans `decks/cloud/assets/screenshots/`.

---

## Potential Q&A

1. **« Pourquoi GCP et pas AWS ? »**
   - Choix pédagogique : GCP est plus simple en onboarding (console plus claire, projet = unité, Cloud Run très lisible). Les concepts transfèrent (tableau équivalents). Pas d'enfermement, on revoit la grille de décision en projet client.
2. **« Combien ça coûte réellement la stack du brief ? »**
   - Sous 30 € pour la semaine si on respecte les tiers : Cloud Run scale-to-zero (~0 €), Cloud SQL `db-f1-micro` (~10 €/mois), GCS Standard (négligeable pour 200 PDFs), Secret Manager gratuit jusqu'à 6 versions actives. **Alerte budget à 20 €** = filet de sécurité.
3. **« Pourquoi pas Kubernetes / GKE ? »**
   - Surdimensionné pour ce projet. Cloud Run couvre 80 % des besoins API/web stateless, sans gérer de nodes ni de control plane. GKE devient utile dès qu'on a 10+ microservices, des besoins de placement custom, ou des workloads non-HTTP.
4. **« Workload Identity Federation, c'est pas plus simple avec une clé JSON ? »**
   - À court terme oui (5 min de moins). À long terme non : clé JSON = mot de passe en clair, exfiltrable, à rotater, à révoquer si fuite. WIF = 0 secret au repos, granularité au repo + branche, auditable.
5. **« Vertex AI ou Gemini Enterprise Agent Platform ? »**
   - Même produit, rebrandé en 2026. Toute la doc et les SDK utilisent encore les deux noms en transition. Côté code, rien ne change.
6. **« On peut faire du RAG souverain en France ? »**
   - Oui, mais : Bleu (Azure souverain), S3NS / PREMI3NS (GCP souverain) — encore en montée en charge. Catalogue managé plus limité (~55-80 services vs 200 pour AWS). Pour la formation : on reste sur GCP standard `europe-west1`. Pour un projet client santé / défense : SecNumCloud obligatoire.
7. **« Comment monitorer ce qu'on a déployé ? »**
   - Hors scope cette semaine — semaine N+1 (Cloud Logging + Cloud Monitoring). Pour l'instant : `gcloud run services logs tail` suffit pour le brief.

---

## Template Choices

- **Slides d'ouverture / clôture issues de `decks/templates/slides.md`** :
  - Slide « Présentation » (à insérer juste après la cover ou en clôture)
  - Slide « Let's build together » (CTA final)
- Layouts du thème `maxime-lenne` à exploiter : `cover`, `two-cols-header`, `section`, `end`, `default`
- Theme demo à consulter pour les layouts : `themes/maxime-lenne/example/slides.md` ou `decks/theme-demo/`

---

## Appendix: Slide Outline

> Numérotation provisoire, indicative pour `/slidev:create`. Layouts entre `[crochets]`.

### Module 0 — Ouverture (4 slides)

1. `[cover]` Titre : « Cloud — Du local à la prod sur GCP » + background Unsplash
2. `[two-cols-header]` Présentation Maxime Lenne (depuis le template)
3. `[section]` Agenda — 8 modules sur la semaine
4. `[default]` Objectifs pédagogiques + compétences RNCP visées (C17, C18, C19, C21)

### Module 1 — Concepts cloud (16 slides)

1. `[section]` Section : Concepts cloud
2. `[default]` Qu'est-ce que le cloud ? (NIST 5 caractéristiques)
3. `[default]` Pile classique du logiciel → la stack XaaS (diagramme)
4. `[default]` Tableau XaaS — qui gère quoi
5. `[default]` Comment choisir ? Heuristique S. Robert + grille Dev IA
6. `[default]` Modèles de déploiement (public / privé / hybride / multi / souverain)
7. `[default]` **Cloud souverain France 2026** — SecNumCloud (OVH, Outscale, NumSpot) + cloud de confiance (Bleu, S3NS)
8. `[default]` **Comparatif hyperscalers** AWS / Azure / GCP / Scaleway / OVH (parts de marché + prix)
9. `[default]` **Équivalents services AWS / Azure / GCP** (tableau)
10. `[default]` Shared responsibility model (matrice IaaS / CaaS / SaaS)
11. `[default]` FinOps light — pay-as-you-go, engagement, spot, egress
12. `[default]` Vocabulaire à connaître (région, zone, control/data plane, SLO/SLA)
13. `[default]` **IaC en 1 slide** — déclaratif vs impératif + Terraform / Pulumi / GitOps
14. `[default]` **Conception & diagrammes d'archi** — 3-tiers, event-driven, RAG (3 patterns)
15. `[default]` Cas du Dev IA — tableau XaaS recommandé par composant
16. `[default]` Recap module 1 + questions

### Module 2 — GCP overview + VPC (14 slides)

1. `[section]` Section : GCP overview + Réseau
2. `[default]` GCP en 30 s (positionnement, forces, faiblesses)
3. `[default]` Hiérarchie : Organisation → Folder → Project → Resources (diagramme)
4. `[default]` Projet ≠ Billing Account (slide piège classique)
5. `[default]` Régions et zones — choix pour Simplon
6. `[default]` Catalogue services qu'on utilisera (rappel)
7. `[default]` Console GCP — astuces (palette `⌘+/`, épingler)
8. `[default]` `gcloud` CLI — install + commandes essentielles (snippet bash)
9. `[default]` Cloud Shell — la VM gratuite
10. `[default]` **VPC** — réseau privé virtuel + subnets + firewall (diagramme)
11. `[default]` **Cloud Load Balancing** — global vs régional, types LB
12. `[default]` **Cloud DNS + Cloud NAT** — zones publiques/privées, IP statiques pour allowlisting
13. `[default]` **Sécurité jour 1** — MFA + alerte budget obligatoire (snippet `gcloud billing budgets create`)
14. `[default]` Recap module 2 + questions

### Module 3 — Cloud Run + Artifact Registry (12 slides)

1. `[section]` Section : Cloud Run + Artifact Registry
2. `[default]` Qu'est-ce que Cloud Run ? (CaaS, scale-to-zero, request-based)
3. `[default]` Modèle d'exécution (diagramme LB → pool → container)
4. `[default]` Service vs Job (tableau)
5. `[default]` Contraintes à connaître (port, FS éphémère, stateless...)
6. `[default]` Artifact Registry — création repo + auth Docker + build/push
7. `[default]` `gcloud run deploy` complet (snippet annoté)
8. `[default]` Variables d'environnement vs secrets
9. `[default]` Concurrence + autoscaling — `--concurrency`, `--min`, `--max`, formule RPS
10. `[default]` Cold start — leviers (min-instances, image légère, lazy init, `--cpu-boost`)
11. `[default]` Révisions + traffic splitting + rollback (snippet)
12. `[default]` Pièges classiques + recap module 3

### Module 4 — Cloud SQL + pgvector (10 slides)

1. `[section]` Section : Cloud SQL + pgvector
2. `[default]` Pourquoi un DBaaS — ce que Cloud SQL gère
3. `[default]` Cloud SQL en 30 s — Postgres / MySQL / SQL Server + AlloyDB / Spanner
4. `[default]` Création d'instance (snippet `gcloud sql instances create`)
5. `[default]` Bases + utilisateurs (snippet SQL `GRANT` minimal)
6. `[default]` **pgvector** — `CREATE EXTENSION` + table + HNSW (dimension 1024 Mistral)
7. `[default]` Connecter Cloud Run à Cloud SQL via socket Unix (diagramme + snippet env vars)
8. `[default]` DSN SQLAlchemy via socket Unix (snippet Python)
9. `[default]` Cloud SQL Auth Proxy local — pour migrations Alembic
10. `[default]` Backups + PITR + pièges classiques

### Module 5 — Cloud Storage (8 slides)

1. `[section]` Section : Cloud Storage
2. `[default]` Stockage objet vs bloc vs fichier (tableau)
3. `[default]` Buckets — namespace global + classes de stockage (tableau)
4. `[default]` Lifecycle policies (snippet JSON)
5. `[default]` Uniform vs Fine-grained access — toujours uniform
6. `[default]` CLI + lecture/écriture Python (snippet)
7. `[default]` **Signed URLs** — partage temporaire sans IAM (snippet + diagramme flow)
8. `[default]` Pièges classiques + recap module 5

### Module 6 — IAM + Secret Manager (10 slides)

1. `[section]` Section : IAM + Secret Manager
2. `[default]` Triangle IAM Principal × Role × Resource (schéma)
3. `[default]` Types de principals + familles de rôles (Basic / Predefined / Custom)
4. `[default]` Héritage IAM — binder au plus bas (diagramme)
5. `[default]` Commandes IAM essentielles
6. `[default]` Service Accounts — créer une SA + bindings minimaux (snippet bash brief)
7. `[default]` Clés JSON : à éviter — préférer WIF
8. `[default]` Secret Manager — créer + versionner + accès SA (snippet)
9. `[default]` Injection secrets dans Cloud Run (`--update-secrets`)
10. `[default]` Recap rôles brief + Policy Analyzer + questions

### Module 7 — Services Data GCP (9 slides) — NOUVEAU

1. `[section]` Section : Services Data GCP
2. `[default]` Panorama : ingestion → traitement → stockage → analyse → viz
3. `[default]` **BigQuery** — data warehouse serverless + BigQuery ML
4. `[default]` **Cloud Pub/Sub** — messaging global managé
5. `[default]` **Dataflow** — Apache Beam batch + streaming
6. `[default]` **Dataproc + Cloud Composer** — Spark/Hadoop + Airflow managés
7. `[default]` **Looker / Looker Studio** — viz et modèles sémantiques
8. `[default]` Architecture type Pub/Sub → Dataflow → BQ → Looker (diagramme)
9. `[default]` Équivalents AWS / Azure + recap module 7

### Module 8 — Services AI/ML GCP (9 slides) — NOUVEAU

1. `[section]` Section : Services AI/ML GCP
2. `[default]` ⚠️ Vertex AI → **Gemini Enterprise Agent Platform** (rebrand 2026)
3. `[default]` **Gemini API** — modèles multimodaux + pricing 2026
4. `[default]` **AutoML** — classification image, détection, forecasting, NLP
5. `[default]` **Vision AI + Document AI** — extraction et analyse
6. `[default]` **Speech / Translation / Text-to-Speech** — APIs prêtes
7. `[default]` **Model Garden** — catalogue open-source (Llama, Mistral...)
8. `[default]` Quand utiliser quoi ? (tableau de décision) + intégration Cloud Run
9. `[default]` Équivalents AWS / Azure + coûts cachés + recap module 8

### Module 9 — Atelier brief RAG-on-GCP (5 slides)

1. `[section]` Section : Place à l'atelier
2. `[default]` Architecture cible (Mermaid depuis le BRIEF)
3. `[default]` Stack imposée + 5 phases (tableau)
4. `[default]` Compétences évaluées (C17/C18/C19/C21) + conditions de passage
5. `[default]` Démarrage : `git clone simplon-rag-sample` + QR repo

### Module 10 — Clôture (2 slides)

1. `[two-cols-header]` (depuis le template) Présentation Maxime Lenne — version cloture
2. `[end]` (depuis le template) « Let's build together » + QR LinkedIn

---

_Plan créé : 2026-05-18_
_Prêt pour la génération de slides : [ ]_
