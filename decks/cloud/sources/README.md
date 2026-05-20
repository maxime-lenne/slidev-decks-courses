# Semaine Dev IA — Cloud & déploiement sur GCP

> Semaine de 5 jours articulée autour de **la finalisation du brief observabilité**
> (lundi, game day + Langfuse + post-mortem) et de **l'introduction au cloud et à GCP**
> (mardi → vendredi), conclue par un brief projet de déploiement sur GCP.

## 🎯 Objectifs de la semaine

À la fin de la semaine, les apprenant·e·s doivent être capables de :

1. Distinguer **IaaS / PaaS / SaaS / FaaS / CaaS / KaaS** et choisir le bon
   modèle pour un cas d'usage.
2. Comprendre les notions de **shared responsibility model**, de **région /
   zone**, et les implications financières (FinOps light).
3. Naviguer dans la **console GCP** et utiliser **gcloud** (CLI) pour
   provisionner les services de base.
4. Déployer un service conteneurisé sur **Cloud Run** depuis une image
   poussée sur **Artifact Registry**.
5. Provisionner une base **Cloud SQL (Postgres + extension pgvector)** et la
   connecter à un Cloud Run via **Cloud SQL Connector**.
6. Utiliser **Cloud Storage (GCS)** pour stocker des documents et y accéder
   depuis un service applicatif.
7. Mettre en place une **pipeline GitHub Actions** (lint, test, build, push,
   deploy) en s'authentifiant à GCP via **Workload Identity Federation (OIDC)**.
8. Lire les **logs Cloud Logging** et corréler un incident applicatif détecté
   dans Grafana (semaine précédente) avec une trace côté GCP.

## 🗓️ Vue d'ensemble

| Jour | Matin | Après-midi |
|------|-------|------------|
| **Lundi** | Game day RAG (3 incidents injectés) | Post-mortem + soutenance flash + clôture du brief observabilité |
| **Mardi** | Cours : concepts cloud (IaaS, PaaS, SaaS, FaaS, CaaS, KaaS, IaC) + Quiz | Cours : vue d'ensemble GCP (architecture, console, gcloud, billing) + atelier découverte |
| **Mercredi** | Cours : Cloud Run + Artifact Registry + atelier "hello-world" | Cours : Cloud SQL (Postgres + pgvector) + Cloud Storage + atelier |
| **Jeudi** | Cours : IAM + secrets + Workload Identity Federation + révisions Docker/CI-CD | Lancement du brief GCP (kickoff, lecture du brief, formation des binômes) |
| **Vendredi** | Travail brief — Phases 1 à 3 (build local, image, push Artifact Registry) | Travail brief — Phases 4 à 6 (Cloud SQL, Cloud Storage, GitHub Actions) + soutenance courte |

> ⚠️ Le brief GCP s'étend en réalité sur ~1,5 jour (jeudi PM + vendredi) pour
> un livrable intermédiaire. La poursuite est prévue la semaine suivante
> (durcissement IAM, monitoring GCP, observabilité de production).

## 📂 Structure de ce dossier

```text
semaine-gcp-deploiement/
├── README.md                        (ce fichier)
├── planning/
│   └── planning-semaine.md          (détail heure par heure)
├── cours/
│   ├── 01-concepts-cloud.md         (IaaS/PaaS/SaaS/FaaS/CaaS/KaaS, modèles)
│   ├── 02-iac-introduction.md       (Infrastructure as Code, Terraform, Pulumi)
│   ├── 03-gcp-overview.md           (architecture GCP, gcloud, projets, billing)
│   ├── 04-gcp-cloud-run.md          (Cloud Run + Artifact Registry)
│   ├── 05-gcp-cloud-sql.md          (Cloud SQL, pgvector, connector)
│   ├── 06-gcp-storage.md            (Cloud Storage, signed URLs, classes)
│   ├── 07-gcp-iam-secrets.md        (IAM, principle of least privilege, Secret Manager)
│   ├── 08-cicd-github-actions.md    (workflows, secrets, OIDC, déploiement Cloud Run)
│   └── 09-docker-revisions.md       (multi-stage, distroless, .dockerignore, optimisation)
├── quiz/
│   ├── quiz-01-concepts-cloud.md
│   └── quiz-02-gcp-services.md
└── brief/
    └── BRIEF.md                     (brief de la semaine : déploiement RAG sur GCP)
```

## 🔗 Ressources de référence

- [Blog Stéphane Robert — Cloud](https://blog.stephane-robert.info/docs/cloud/) — base
  pédagogique reprise dans les cours (concepts, modèles, comparatifs)
- [Documentation GCP officielle](https://cloud.google.com/docs)
- [Awesome GCP (GitHub)](https://github.com/GoogleCloudPlatform/awesome-google-cloud)
- [GitHub Actions — auth to GCP via OIDC](https://github.com/google-github-actions/auth)

## 📋 Compétences RNCP visées

| Code | Compétence | Niveau ciblé |
|------|------------|---|
| C17 | Déployer un service d'IA | Niveau 2 (Adapter) |
| C18 | Industrialiser un projet via CI/CD | Niveau 3 (Transposer) |
| C19 | Mettre en œuvre une infrastructure cloud | Niveau 2 (Adapter) |
| C21 | Résoudre les incidents techniques | Niveau 2 (Adapter, continuité) |
