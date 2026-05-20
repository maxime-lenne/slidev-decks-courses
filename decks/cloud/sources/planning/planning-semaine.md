# Planning détaillé — Semaine Cloud & GCP

> 5 jours, ~35 h de présence. Horaires types : 9h–12h30 / 13h30–17h.
> Inclut le bouclage du brief observabilité **lundi** puis le pivot
> cloud / GCP **mardi → vendredi**.

## Légende des activités

| Pictogramme | Type d'activité | Posture formateur |
|---|---|---|
| 📚 Cours | Magistral / amphi (slides ou Markdown projeté) | Pilote |
| 🛠️ Atelier | Atelier guidé en autonomie ou en binôme | Coach |
| 🧪 Quiz | Vérification rapide des acquis (10–15 min) | Évaluateur |
| 🎯 Brief | Travail sur le brief projet | Coach |
| 🎬 Démo / soutenance | Présentation devant le groupe | Jury |
| 💬 Stand-up | Tour de table court (15 min max) | Animateur |

---

## 🟦 LUNDI — Finalisation brief observabilité (game day + post-mortem)

> Objectif : clôturer le brief RAG / observabilité. Vérifier C11, C20, C21
> avant de pivoter sur le cloud dès mardi.

| Horaire | Activité | Détail | Livrable |
|---------|----------|--------|----------|
| 09h00–09h15 | 💬 Stand-up | Tour de table : état d'avancement, blockers du week-end | — |
| 09h15–09h30 | 📚 Brief game day | Rappel des règles, format des incidents, attendus | — |
| 09h30–10h30 | 🎯 Game day — Incident 1 | Incident applicatif (latence sur `/messages`) | Détection + mitigation |
| 10h45–11h45 | 🎯 Game day — Incident 2 | Incident LLM (rewrite-loop qui consomme 10× les tokens, visible dans Langfuse uniquement) | Détection + mitigation |
| 11h45–12h30 | 🎯 Game day — Incident 3 | Incident infra (Postgres pgvector qui sature en mémoire) | Détection + mitigation |
| **— Pause déjeuner —** | | | |
| 13h30–15h00 | 🎯 Post-mortem | Rédaction d'1 post-mortem par binôme (1 incident au choix) selon trame PagerDuty | `post-mortem/incident-XXX.md` |
| 15h00–16h30 | 🎬 Soutenance flash | 10 min de démo + 5 min de questions par binôme | Démo live |
| 16h30–17h00 | 💬 Rétrospective | Ce qui a marché, ce qui a coincé, debriefing pédagogique | — |

**Compétences validées en fin de journée** : C11 (Niveau 3), C20 (Niveau 3), C21 (Niveau 2).

---

## 🟩 MARDI — Concepts cloud + vue d'ensemble GCP

- Commencer par créer un compte sur gcp
- quel service sont nécessaire pour le projet RAG
- schéma !!!

> Objectif : poser le vocabulaire commun (IaaS, PaaS, SaaS, FaaS, CaaS, KaaS),
> comprendre le shared responsibility model et démarrer sur la console GCP.

| Horaire | Activité | Détail | Livrable |
|---------|----------|--------|----------|
| 09h00–09h15 | 💬 Ouverture de semaine | Présentation du fil rouge cloud + brief de fin de semaine | — |
| 09h15–10h45 | 📚 Cours `01-concepts-cloud` | IaaS / PaaS / SaaS / FaaS / CaaS / KaaS, shared responsibility, cas d'usage | — |
| 11h00–12h00 | 📚 Cours `02-iac-introduction` | Infra as Code : Terraform, Pulumi, Ansible, GitOps | — |
| 12h00–12h30 | 🧪 Quiz `quiz-01-concepts-cloud` | 15 questions QCM + 2 questions ouvertes | Score individuel |
| **— Pause déjeuner —** | | | |
| 13h30–14h45 | 📚 Cours `03-gcp-overview` | Console GCP, organisation / projets / billing, gcloud CLI, Cloud Shell | — |
| 14h45–16h30 | 🛠️ Atelier découverte GCP | Création projet, activation API, gcloud init, déploiement d'un container "hello-world" sur Cloud Run | Screenshot du service Cloud Run |
| 16h30–17h00 | 💬 Stand-up de fin de journée | Difficultés rencontrées, points à approfondir | — |

**Compétences travaillées** : C19 (Niveau 1, Imiter).

---

## 🟧 MERCREDI — Cloud Run + Cloud SQL + Cloud Storage

> Objectif : pratiquer en profondeur les 3 services qui structurent le brief.

| Horaire | Activité | Détail | Livrable |
|---------|----------|--------|----------|
| 09h00–09h15 | 💬 Stand-up | Récap mardi, questions sur l'atelier | — |
| 09h15–10h45 | 📚 Cours `04-gcp-cloud-run` | Conteneurs, scaling, traffic split, revisions, environment variables, secrets | — |
| 10h45–12h30 | 🛠️ Atelier Cloud Run | Push d'une image FastAPI sur Artifact Registry → déploiement Cloud Run avec variables d'environnement | URL publique du service |
| **— Pause déjeuner —** | | | |
| 13h30–14h45 | 📚 Cours `05-gcp-cloud-sql` | Instance Cloud SQL Postgres, IAM, Cloud SQL Auth Proxy, extension pgvector, Cloud SQL Connector | — |
| 14h45–15h45 | 🛠️ Atelier Cloud SQL | Création instance, activation pgvector, connexion depuis Cloud Run | Service connecté à la BDD |
| 15h45–16h30 | 📚 Cours `06-gcp-storage` | Cloud Storage : buckets, classes, signed URLs, lifecycle, IAM | — |
| 16h30–17h00 | 🧪 Quiz `quiz-02-gcp-services` | 12 questions QCM ciblées sur Cloud Run / Cloud SQL / GCS | Score individuel |

**Compétences travaillées** : C17 (Niveau 1 → 2), C19 (Niveau 1 → 2).

---

## 🟪 JEUDI — IAM, secrets, CI/CD + kickoff brief

> Objectif : sécuriser le déploiement (IAM, secrets, OIDC) et démarrer le brief.

| Horaire | Activité | Détail | Livrable |
|---------|----------|--------|----------|
| 09h00–09h15 | 💬 Stand-up | Recap mercredi, ressentis sur les ateliers | — |
| 09h15–10h45 | 📚 Cours `07-gcp-iam-secrets` | Principal / role / binding, principle of least privilege, service accounts, Secret Manager | — |
| 10h45–12h00 | 📚 Cours `08-cicd-github-actions` | Workflows, jobs, steps, secrets, environments, Workload Identity Federation (OIDC) | — |
| 12h00–12h30 | 📚 Cours `09-docker-revisions` | Multi-stage, distroless, `.dockerignore`, hardening | — |
| **— Pause déjeuner —** | | | |
| 13h30–14h00 | 🎯 Kickoff brief | Lecture du brief en groupe, questions, organisation des binômes (mêmes binômes que semaine précédente) | Binômes formés |
| 14h00–17h00 | 🎯 Brief — Phase 1 + 2 | Préparation du projet (fork, branches), build local des images Docker, push sur Artifact Registry | Image présente dans Artifact Registry |

**Compétences travaillées** : C18 (Niveau 2 → 3), C17 (Niveau 2).

---

## 🟥 VENDREDI — Brief : déploiement complet + soutenance courte

> Objectif : finaliser un déploiement Cloud Run + Cloud SQL + GCS avec une
> pipeline GitHub Actions fonctionnelle.

| Horaire | Activité | Détail | Livrable |
|---------|----------|--------|----------|
| 09h00–09h15 | 💬 Stand-up | Où en êtes-vous ? Qui bloque sur quoi ? | — |
| 09h15–12h30 | 🎯 Brief — Phases 3 + 4 | Provisionner Cloud SQL (Postgres + pgvector), provisionner GCS, déployer API Cloud Run avec connexion Cloud SQL et bucket GCS | API déployée et fonctionnelle |
| **— Pause déjeuner —** | | | |
| 13h30–15h30 | 🎯 Brief — Phase 5 | Mettre en place la pipeline GitHub Actions complète (test + build + push + deploy) avec OIDC | Pipeline verte en main → Cloud Run mis à jour |
| 15h30–16h30 | 🎬 Soutenance courte | 7 min de démo (live) + 3 min de questions par binôme. Centrée sur la pipeline et l'archi GCP | Démo |
| 16h30–17h00 | 💬 Rétrospective de semaine | Bilan, points à approfondir la semaine suivante (monitoring GCP, sécurité) | — |

**Compétences validées en fin de semaine** : C17 (Niveau 2), C18 (Niveau 3), C19 (Niveau 2).

---

## 🔮 Suite (semaine N+1, hors périmètre)

- Cloud Logging + Cloud Monitoring (continuité C11 / C20)
- Cloud Armor + Cloud Load Balancer (production-grade)
- IaC Terraform pour reprovisionner l'ensemble
- Optimisation FinOps (alertes budget, sizing, autoscaling)
