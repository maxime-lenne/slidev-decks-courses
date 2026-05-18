# Observability d'une application IA — Plan de présentation

**Durée :** 3 jours (~9h de lectures + exercices + brief continu + Game Day)
**Audience :** Nouveaux apprenants en formation IA / nouveaux membres d'équipe (onboarding éducatif)
**Format :** Workshop — J1 lecture + exercices courts, J2-J3 brief en continu + lectures complémentaires + Game Day
**Langue :** Français
**Thème :** `maxime-lenne`

---

## Core Message

> « Comprendre l'observabilité avec un focus pour une application IA : **le monitoring de l'infra ne suffit pas — il faut aussi observer les données, le modèle et les coûts LLM**. »

## Call to Action

À l'issue de la formation, chaque binôme doit :

1. **Instrumenter un projet fourni** (API, agent RAG, front, CLI — dockerisé via docker-compose) avec :
   - logs structurés JSON
   - métriques Prometheus (≥ 1 counter, 1 gauge, 1 histogram)
   - 1 dashboard Grafana RED + 1 dashboard USE
   - ≥ 2 alertes Alertmanager (1 latence, 1 erreur)
2. **Mettre en place Langfuse** sur la partie LLM du brief — tracer coûts, latence et tokens par span, ajouter ≥ 1 score (feedback ou LLM-as-judge)
3. **Rédiger un post-mortem blameless** à la suite du Game Day J3 (3 incidents provoqués par le formateur), structuré selon le template runbook 4 sections + timeline + action items

---

## Sources utilisées

| Source | Description | Couverture |
|--------|-------------|------------|
| `sources/02-support-cours-observability-ml-llm.md` | Support de cours principal — 9 modules détaillés, démos guidées, annexes (docker-compose, ressources) | M1 → M9 |
| Stéphane Robert — `/docs/observabilite/fondamentaux/` (×7 pages) | Vue & monitoring, modèles mentaux, SLI/SLO/SLA, signaux, corrélation, OTel, gouvernance | M1, M5, transverse |
| Stéphane Robert — `/docs/observabilite/fondamentaux/signaux/*` + `/opentelemetry/*` (×8 pages) | Logs structurés, métriques, traces, OpenTelemetry API/SDK/Collector | M2, M3, M6, M-OTel |
| Stéphane Robert — `/docs/observabilite/pratiques/*` (×4 pages) | Dashboards, alerting symptom-first, runbooks 4 sections | M4, M5, M7 |
| Stéphane Robert — `/docs/outils/observabilite/alerting-incidents/*` (×2 pages) | Alertmanager (routing, inhibition, silences) | M5 |
| Stéphane Robert — `/docs/outils/observabilite/synthetics-rum/*` (×2 pages) | Synthetic monitoring, RUM, Uptime Kuma | M-Synthetics |
| Image de couverture | Unsplash — Server rack with blinking green lights (Domaintechnik Ledl.net) | Cover |

> Note : la branche outils détaillés (Prometheus install/exporters/PromQL, Grafana practical) a été demandée mais n'a pas pu être fetchée (WebFetch refusé partiellement). Le support principal couvre déjà ces sujets de manière suffisante pour la formation.

---

## Time Allocation — vue d'ensemble

### Jour 1 — Fondamentaux + spécificités IA (lecture + exercices)

| Bloc | Module | Temps | Slides |
|------|--------|-------|--------|
| Intro | Accueil, présentation, agenda, objectifs, prérequis | 15 min | 6 |
| M1 | Pourquoi l'observability ? | 45 min | 14 |
| M2 | Logging structuré | 1h30 | 20 |
| Pause déjeuner | | | |
| M8 | Observability ML & monitoring modèle | 1h | 14 |
| M9 | Observability LLM & tracing d'agents | 1h15 | 18 |
| Atelier | Restitution fin J1 — stack obs LLM pour cas fictif | 30 min | 4 |
| **Total J1** | | **~5h10** | **76 slides** |

### Jour 2 — Stack technique applicative (brief continu + lectures)

| Bloc | Module | Temps | Slides |
|------|--------|-------|--------|
| Brief | Présentation du projet à instrumenter | 30 min | 6 |
| M3 | Métriques & Prometheus | 1h | 16 |
| M4 | Grafana & dashboards | 45 min | 12 |
| Pause déjeuner | | | |
| M-OTel | OpenTelemetry & Collector (bonus enrichi) | 1h | 14 |
| Brief continu | Apprenants instrumentent leur projet | 2h+ | — |
| **Total J2** | | **~5h15** | **48 slides** |

### Jour 3 — Production-ready + Game Day (brief + lectures + crisis)

| Bloc | Module | Temps | Slides |
|------|--------|-------|--------|
| M5 | Alerting (Alertmanager + SLO + burn rate) | 1h | 16 |
| M6 | APM & tracing distribué | 30 min | 10 |
| M-Synthetics | Synthetics / RUM / Uptime Kuma (bonus) | 30 min | 8 |
| Pause déjeuner | | | |
| Brief continu | Finalisation instrumentation + Langfuse | 1h30 | — |
| M7 | Incident management & post-mortem | 45 min | 12 |
| Game Day | 3 incidents provoqués, 30 min/incident | 1h30 | 8 |
| Wrap-up | Récap, ressources, retour brief, fin | 30 min | 6 |
| **Total J3** | | **~6h15** | **60 slides** |

**Total deck estimé : ~184 slides** → splittés en sections par module (un fichier par module dans `sections/`).

---

## Bloc Intro — Ouverture (15 min, ~6 slides)

### Key Points
- Accroche : « Votre modèle est en prod depuis 3 mois. Tout est vert. Les utilisateurs se plaignent. »
- Présentation du formateur (slide template `presentation`)
- Agenda J1/J2/J3
- Objectifs de la formation (les 5 du `meta.json`)
- Prérequis (déjà fixés dans `meta.json`)
- Règle de l'atelier : brief continu = on apprend en faisant

### Visuels
- [ ] Cover Unsplash (server rack vert)
- [ ] Photo formateur (template existant)
- [ ] Diagram : structure 3 jours

### Talking Points
- Insister : « tout sera testé sur votre projet dès J1 après-midi »
- Annoncer le Game Day J3 (sans révéler les incidents)

### Source
- Source principale : accroche M1
- Stéphane Robert : « le piège du tout est vert »

---

## Module 1 — Pourquoi l'observability ? (45 min, ~14 slides)

### Key Points
- Origine historique du terme : **Kalman, 1960, théorie du contrôle** (peu connu)
- **Observabilité vs Monitoring** : known unknowns vs unknown unknowns (Charity Majors)
- Définitions claires : Monitoring / Observabilité / APM
- Les **3 piliers** : Logs / Métriques / Traces
- Les **modèles mentaux** : RED (services), USE (ressources), Golden Signals (Google SRE)
- Spécificité IA : ajouter métriques **modèle**, **données**, **métier** au-delà de l'infra
- Activité (15 min) : « pour une API de classification de spams, quelles métriques RED + ML ? »

### Visuels
- [ ] Diagram : 3 piliers (Mermaid)
- [ ] Tableau comparatif : RED / USE / Golden Signals (3 colonnes)
- [ ] Arbre de décision : « quel modèle mental utiliser ? » (Mermaid)
- [ ] Slide-citation : « Le monitoring vous dit qu'il y a un problème. L'observabilité vous permet de comprendre pourquoi — même si vous ne l'aviez pas prévu. » (SR)
- [ ] Analogie médicale : thermomètre vs scanner/IRM
- [ ] Slide « scénario vendredi 18h » : monitoring seul = 1h15 / observabilité = 12 min

### Talking Points
- Insister sur Kalman → ancre culturelle, le terme n'est pas nouveau
- Le piège du « tout est vert » → mêmes métriques, mauvais indicateurs
- Saturation = signal le plus prédictif (« vous alerte AVANT que la latence n'explose »)
- Transition vers M2 : « ok on a parlé de signaux, commençons par le plus courant — les logs »

### Sources
- Source principale, M1 (accroche, définitions, 3 piliers, RED/USE/Golden Signals, spécificité IA)
- SR `/fondamentaux/` (niveaux de maturité), `/observabilite-vs-monitoring/` (Kalman, Charity Majors), `/modeles-mentaux/` (matrice + arbre de décision)

---

## Module 2 — Logging structuré (1h30, ~20 slides)

### Key Points
- Pourquoi structurer : log texte vs log JSON (slide-comparaison)
- **Définition SR** : « un log est un événement discret et horodaté » (vs métrique qui agrège)
- **Analogie carnet de bord** : « le capitaine note les événements, pas les moyennes »
- **5 niveaux** : DEBUG / INFO / WARN / ERROR / FATAL — « choix du niveau = acte d'engagement envers l'astreinte »
- **6 champs essentiels** : `timestamp` ISO 8601 UTC, `level`, `service`, `message`, `trace_id`, `request_id`
- **Champs spécifiques ML** : `model_version`, `latency_ms`, `prediction`, `confidence`
- **RGPD** : pas de PII brutes, pseudonymisation (sha256+salt), rétention différenciée
- **Pipeline 4 étapes** : Émission → Collecte → Stockage → Requêtage
- **Formule coût** : `Volume × Rétention × Requêtage = Coût`
- **Centralisation** : Loki vs ELK/OpenSearch vs Cloud (CloudWatch/GCP)
- **Démo guidée code** : FastAPI + `python-json-logger` + middleware request_id
- Bonus SR : « la qualité du log se décide à l'émission, pas au requêtage »

### Visuels
- [ ] Slide-comparaison : log texte vs log JSON (2 colonnes)
- [ ] Diagram : pipeline 4 étapes (Mermaid LR)
- [ ] Tableau : champs essentiels d'un log ML
- [ ] Tableau : niveaux + question d'engagement (« quelqu'un doit-il agir maintenant ? »)
- [ ] Diagram coût : `Volume × Rétention × Requêtage` (Mermaid)
- [ ] Code FastAPI + middleware (Shiki, highlight progressif)

### Talking Points
- DEBUG en prod = facteur 10-100× sur le volume → coût
- Un log = un événement, jamais une boucle qui en émet 1000/s
- Les logs accessibles aux apprenants/devs ne doivent pas permettre la ré-identification
- Transition : « les logs sont chers et volumineux → contrebalance via les métriques »

### Sources
- Source principale, M2 (intégralité)
- SR `/signaux/logs/` (définition, niveaux d'engagement, pipeline 4 étapes, formule coût, RGPD)

---

## Module 8 — Observability ML & monitoring modèle (1h, ~14 slides)

### Key Points
- Pourquoi un pipeline ML est différent : les **pannes silencieuses** (données / réalité / régression / sous-groupes)
- **3 types de drift** : Data drift / Concept drift / Prediction drift (avec exemples MailGuard)
- Prediction drift = le plus facile à observer (pas besoin des labels réels)
- **Méthodes statistiques** : PSI / KS test / Wasserstein distance
- **Embeddings drift** : distance moyenne, clustering, projection UMAP
- **Fenêtres glissantes** : référence (30j d'il y a 60-90j) vs production (24h-7j)
- **Outils** : MLflow / W&B / Evidently AI / Arize-Phoenix / Neptune-Comet (tableau comparatif)
- **Pattern d'intégration** : exporter score de drift comme Gauge Prometheus
- **Démo guidée code** : KS test toutes les minutes → Gauge → alerte PromQL
- Bonus SR : transposition « known/unknown unknowns » au LLM (hallucinations = unknowns inconnus)

### Visuels
- [ ] Tableau : 3 types de drift × exemples MailGuard
- [ ] Diagram : fenêtres glissantes référence vs production (timeline)
- [ ] Tableau comparatif outils ML monitoring (5 colonnes)
- [ ] Code Python : `compute_drift()` + `prometheus_client.Gauge`
- [ ] Snippet YAML : règle Prometheus `PredictionDriftHigh`

### Talking Points
- Le prediction drift est le seul mesurable en temps réel sans ground truth
- Le drift par sous-groupe (fairness) est l'angle mort le plus dangereux
- Choix pédagogique : on exporte vers Prometheus pour rester simple

### Sources
- Source principale, M8 (intégralité)
- SR `/fondamentaux/` (niveaux de maturité, transposable au ML)

---

## Module 9 — Observability LLM & tracing d'agents (1h15, ~18 slides)

### Key Points
- Pourquoi un LLM est encore plus difficile : non-déterminisme, hallucinations, coût variable, latence variable, prompts versionnés, multi-turn
- **3 axes du monitoring LLM** : TRACE (qu'a fait l'agent ?) / QUALITY (réponse pertinente, factuelle ?) / COST & LATENCY
- **Vocabulaire** : Trace / Span / Generation / Score / Session
- **Coût et tokens** : prompt_tokens, completion_tokens, total_tokens, model, conversion €
- **Latence RAG décomposée** : embedding (50-200 ms) + recherche vectorielle (10-100 ms) + rerank (50-500 ms) + prompt (qq ms) + LLM TTFT+stream (300 ms à plusieurs secondes) + post-process (qq ms)
- **Évaluation continue** : user feedback / LLM-as-a-judge / datasets régression / A/B prompts
- **Tour des outils** : Langfuse / LangSmith / Phoenix / W&B Weave / MLflow (tableau comparatif 5 colonnes)
- **Démo guidée Langfuse** (5 étapes) : docker-compose → instrumenter endpoint RAG → voir trace → ajouter scores → export coût vers Prometheus

### Visuels
- [ ] Diagram : 3 axes monitoring LLM (ASCII art du source ou Mermaid)
- [ ] Diagram : décomposition latence RAG (timeline horizontale)
- [ ] Tableau comparatif outils LLM observability (5 colonnes — open source, self-host, cible, à retenir)
- [ ] Code Python : Langfuse trace + span + generation
- [ ] Code YAML : docker-compose Langfuse + Postgres
- [ ] Capture/maquette : UI Langfuse (timeline d'une trace avec spans)

### Talking Points
- Sans tracing par span, vous ne saurez **pas** où sont les 2 secondes de latence d'un RAG
- Alerte coût quotidien + coût/utilisateur anormal (détection d'agent en boucle)
- Pas d'Alertmanager natif dans Langfuse OSS → on export vers Prometheus

### Sources
- Source principale, M9 (intégralité, y compris démo Langfuse et atelier fin J1)
- SR transposable : « tail-based sampling pour garder 100% des erreurs » = appliquer aux refus/hallucinations

---

## Atelier fin J1 (30 min, ~4 slides)

### Énoncé
> « Vous êtes responsable observability d'une équipe qui édite un copilote interne basé sur GPT-4o, 200 utilisateurs internes, budget 1500 €/mois. Choisissez votre stack d'observability LLM et justifiez. »

### Critères de restitution
- Outils choisis + justification (OSS vs SaaS, écosystème, coût)
- Métriques à piloter
- Alertes à définir
- Intégration avec stack Prometheus/Grafana

### Visuels
- [ ] Énoncé en grand
- [ ] Tableau vide à remplir par binôme
- [ ] Restitution croisée (3 binômes / 3 min chacun)

---

## Bloc Brief — J2 ouverture (30 min, ~6 slides)

### Key Points
- Présentation du projet à instrumenter (fourni par formateur) : **API + Agent RAG + Front + CLI dockerisé**
- Architecture du projet (diagramme)
- Ce qui est déjà en place : code applicatif, docker-compose squelette
- Ce qu'il faut ajouter : logs structurés, métriques Prometheus, dashboards Grafana, alertes, instrumentation Langfuse côté LLM
- Critères d'évaluation du brief
- Constitution des binômes / setup environnement

### Visuels
- [ ] Diagram d'architecture du projet (Mermaid)
- [ ] Tableau livrables / critères
- [ ] Slide setup (commandes git clone + docker compose up)

---

## Module 3 — Métriques & Prometheus (1h, ~16 slides)

### Key Points
- **Modèle pull** : scrape `/metrics`, avantages (découverte auto, `up{}`, simplicité)
- Limites du pull → Pushgateway pour les batchs courts
- **Définition métrique SR** : « triplet nom + labels + valeur numérique » + timestamp ; chaque combinaison unique = une **série temporelle**
- **4 types** : Counter / Gauge / Histogram / Summary
- **Règle Counter** : « ne jamais lire un counter brut → utiliser `rate()` »
- **Cardinalité** : formule `valeurs_label_1 × valeurs_label_2 × …` ; **piège mortel** = label `user_id` → OOM TSDB
- **Labels interdits** : user_id, request_id, email, IP, URL complète, timestamp, message d'erreur
- **Bons labels** : method, status, service, environment, region
- **Conventions de nommage** : `_seconds` / `_bytes` / `_total` snake_case
- **PromQL essentiel** : `rate()` / `histogram_quantile()` / `up{}` / taux d'erreur
- **Démo guidée code** : `prometheus_client` Python pour API ML — Counter prédictions, Histogram latence, Histogram confidence, Gauge model version
- **Démo guidée infra** : docker-compose Prometheus + scrape config

### Visuels
- [ ] Diagram : modèle pull (Prometheus scrape) (Mermaid)
- [ ] Tableau : 4 types de métriques + quand l'utiliser + exemples
- [ ] Slide « cardinalité explosive » : formule + exemple chiffré
- [ ] Tableau : labels interdits vs autorisés (2 colonnes)
- [ ] Tableau : requêtes PromQL essentielles
- [ ] Code Python : Counter + Histogram + Gauge pour API ML
- [ ] Code YAML : prometheus.yml minimal

### Talking Points
- Citation : « Les métriques vous alertent qu'il y a un problème. Les logs vous expliquent lequel. » (SR)
- Préférer Histogram à Summary (les summaries ne s'agrègent pas cross-instances)
- Conventions de nommage = clé pour des dashboards réutilisables

### Sources
- Source principale, M3 (intégralité)
- SR `/signaux/metriques/` (définition, types, cardinalité, nommage)
- SR `/gouvernance/` (budget cardinalité par service)

---

## Module 4 — Grafana & dashboards (45 min, ~12 slides)

### Key Points
- **Concepts** : Datasource / Panel / Dashboard / Variables
- **TL;DR SR** : « un dashboard utile répond à une question en moins de 5 secondes »
- **Règle des 3 questions** : Qui consulte ? Quelle question ? Quelle action ?
- **Méthode RED** pour services / **USE** pour infra → combinaison
- **Hiérarchie drill-down** : Overview → RED service → USE infra → Logs/Traces
- **« La moyenne masque les problèmes — affichez toujours p50 et p99 »**
- **Recording rules** : pré-calcul des requêtes lourdes
- **Annotations de déploiement** depuis CI/CD
- **Anti-patterns** : 40 panels « au cas où », refresh 5s (DDoS datasource), couleurs arbitraires, alerter depuis dashboard
- **« Le dashboard fantôme »** : pas ouvert depuis 90 jours → archiver
- **Provisioning Grafana** : versioning des dashboards en YAML/JSON
- **Pattern dashboard API ML** (slide-checklist) : RPS / taux 5xx / latence p50-p95-p99 / RPS par route / distribution prédictions / prédictions par model_version

### Visuels
- [ ] Diagram : drill-down hiérarchique Overview → RED → USE → Logs/Traces
- [ ] Capture/maquette dashboard API Overview
- [ ] Tableau : anti-patterns dashboards
- [ ] Code YAML : recording rules RED
- [ ] Snippet : annotation API Grafana depuis CI/CD

### Talking Points
- Citation : « Dashboards = lecture, alerting = règles. Ne jamais alerter depuis un dashboard. » (SR)
- Pas plus de 12 panels par dashboard
- Annoter les déploiements → corrélation visuelle déploiement ↔ régression

### Sources
- Source principale, M4
- SR `/pratiques/dashboards/` (règle 5s, RED/USE, drill-down, recording rules, annotations, anti-patterns)

---

## Module bonus — OpenTelemetry & Collector (1h, ~14 slides)

> Module créé à partir des sources web SR — non présent dans le support principal, ajouté pour répondre à l'attente d'instrumentation moderne et préparer le tracing du brief J3.

### Key Points
- **Définition SR** : « OpenTelemetry sépare l'instrumentation (comment on collecte) du stockage (où on envoie), et c'est cette séparation qui élimine le vendor lock-in »
- **Origine** : OpenTracing + OpenCensus fusionnés en mai 2019 (CNCF)
- **4 composants** : API / SDK / OTLP (port 4317 gRPC, 4318 HTTP) / Collector
- **Maturité signaux** : Traces GA 2021, Métriques GA 2023, Logs GA 2023, Profiles en développement
- **Auto-instrumentation par langage** : `-javaagent:` (Java), `opentelemetry-instrument` (Python), `--require` (Node), env vars (.NET)
- **« Auto = plomberie, manuel = métier »** — l'auto-instrumentation trace les tuyaux, pas la valeur métier
- **Semantic Conventions** : `service.name`, `service.version`, `http.request.method`, etc.
- **Collector architecture** : Receivers → Processors → Exporters
- **Patterns de déploiement** : sans / gateway central / agent + gateway / sidecar
- **Anti-pattern** : `:latest` en prod (breaking changes), pas de `memory_limiter`
- **Code Python** : `tracer.start_as_current_span()` + attributs + gestion erreur
- **Pipeline Collector** complet 3 signaux (traces → Tempo, metrics → Prometheus remote write, logs → Loki)

### Visuels
- [ ] Diagram : 4 composants OTel (API / SDK / OTLP / Collector)
- [ ] Diagram : pipeline Collector Receivers → Processors → Exporters (Mermaid)
- [ ] Diagram : 4 patterns déploiement (sans / gateway / agent+gateway / sidecar)
- [ ] Code Python : span manuel + attributs + erreur
- [ ] Code YAML : Collector config minimal 3 signaux
- [ ] Tableau : auto-instrumentation par langage

### Talking Points
- OTLP est le standard de fait — toute nouvelle instrumentation devrait l'utiliser
- Le Collector = « routeur de vos données d'observabilité » (SR)
- Préférer le Contrib distribution en prod (exporters vendor)

### Sources
- SR `/fondamentaux/opentelemetry/`
- SR `/outils/observabilite/instrumentation/`
- SR `/outils/observabilite/instrumentation/opentelemetry/`
- SR `/outils/observabilite/collecte-pipeline/`
- SR `/outils/observabilite/collecte-pipeline/opentelemetry-collector/`

---

## Module 5 — Alerting (1h, ~16 slides)

### Key Points
- **Architecture** : Prometheus (évalue règles) → Alertmanager (route/silence/notifie) → Webhook (Slack/Discord/PagerDuty)
- **TL;DR SR** : « alertez sur les symptômes, pas sur les causes »
- **Tableau symptom-first** (verbatim SR) : « MySQL down » → « Error rate > 5 % sur service commandes »
- **« Alerter sur CPU > 90 % est (presque) toujours inutile »**
- **Engrenage de l'alert fatigue** : ignorer → silencer → rater une alerte critique → ajouter encore plus
- **Anatomie d'une règle Prometheus** : `expr`, `for`, `labels`, `annotations` (incl. `runbook_url`)
- **Réflexe `clamp_min`** : éviter NaN sur les ratios
- **Valeurs `for:` par défaut** : critical 5 min / warning 15-30 min / info 1h+
- **Alertmanager — 5 mécanismes** : Routing / Grouping / Silencing / Inhibition / Déduplication
- **SLO-based alerting (MWMBR)** : burn rate 14,4× / 1h+5min = page critical ; 6× / 6h+30min = ticket warning
- **Formule Error Budget** : `100 % − SLO` ; SLO 99,5 % sur 30j = ~3h36 d'indisponibilité tolérée
- **Watchdog** (Deadman's switch) : `expr: vector(1)` — seule alerte sans `for:`
- **3 niveaux severity max** : critical (page 24/7), warning (Slack heures ouvrées), info (ticket)
- **Règle pragmatique SR** : « pas plus de 2-3 pages critical par semaine par équipe »
- **5 critères production-ready** : Owner / Runbook / Severity justifiée / Actionnable / Testée
- **Pour LLM** : alerte coût quotidien dépassé + coût/utilisateur anormal

### Visuels
- [ ] Diagram : architecture alerting (Prometheus → AM → webhooks) (Mermaid)
- [ ] Tableau symptom-first (4 lignes verbatim SR)
- [ ] Slide-citation : « Alerter sur CPU > 90 % est (presque) toujours inutile »
- [ ] Code YAML : règle Prometheus `PaymentErrorRateHigh` complète
- [ ] Diagram burn rate : axes budget × temps
- [ ] Code YAML : Alertmanager routing + inhibition
- [ ] Tableau : 3 niveaux severity × destination × exemple
- [ ] Snippet : Watchdog

### Talking Points
- L'alerting est ce qui réveille → respect maximum de l'astreinte
- Toujours `for:` + toujours `runbook_url` en annotation
- Tester silencieusement avant de mettre en `severity: critical`

### Sources
- Source principale, M5 (intégralité)
- SR `/pratiques/alerting/` (symptom-first, engrenage fatigue, anatomie règle, 5 critères)
- SR `/outils/observabilite/alerting-incidents/alertmanager/` (5 mécanismes, routing avancé, inhibitions, silences API)
- SR `/fondamentaux/sli-slo-sla/` (formule budget, burn rate 14.4×, politique d'error budget)

---

## Module 6 — APM & tracing distribué (30 min, ~10 slides)

### Key Points
- **Définition opérationnelle APM** vs monitoring infra : vue applicative + tracing distribué + profiling + error tracking
- **Vocabulaire** : Trace / Span / Context propagation (`traceparent` W3C)
- **Anatomie d'un span** (SR) : `trace_id` (128 bits), `span_id` (64 bits), `parent_span_id`, `name`, `start_time`, `duration`, `status`, `kind`, `attributes`
- **5 SpanKind** : CLIENT / SERVER / INTERNAL / PRODUCER / CONSUMER
- **W3C Trace Context** : header `traceparent: 00-{trace_id}-{parent_id}-{flags}`
- **Baggage** : transporte du contexte applicatif (tenant, feature flag) — attention PII et volume
- **Sampling** : head-based (simple, manque les erreurs rares) vs tail-based (garde 100% erreurs, coût bufferisation)
- **Conseil SR** : « commencez avec head-based 100% et réduisez progressivement »
- **Volumétrie** : ~200-500 octets/span ; 10k rps → ~500 Go/jour brut
- **Outils** : OpenTelemetry (standard) + Tempo / Jaeger / Zipkin (open source) + Datadog/New Relic/Dynatrace (SaaS)
- **Exemple arbre de spans** : checkout 4200ms ERROR avec span Paiement→callBankAPI 3500ms (goulot)

### Visuels
- [ ] Diagram : anatomie d'un span (Mermaid ou ASCII art)
- [ ] Diagram : arbre de spans d'un checkout (verbatim SR — magnifique pour un slide)
- [ ] Code Python : `tracer.start_as_current_span()` + `span.record_exception(e)`
- [ ] Slide : décision head-based vs tail-based (matrice 2×2)

### Talking Points
- Pour le brief, on ajoute du tracing OTel léger pour préparer J3
- L'arbre de spans = outil n°1 pour repérer un goulot

### Sources
- Source principale, M6
- SR `/signaux/traces/` (anatomie, SpanKind, W3C, sampling, volumétrie, arbre verbatim)

---

## Module bonus — Synthetics / RUM / Uptime Kuma (30 min, ~8 slides)

> Module créé à partir des sources web SR — répond au besoin de « monitoring du point de vue utilisateur » non couvert dans le support principal.

### Key Points
- **Définition SR** : « le monitoring synthétique simule les interactions utilisateur depuis l'extérieur »
- **Synthetics vs RUM** :
  - Synthetics = tests automatisés depuis sondes externes — détecte les pannes **avant** les utilisateurs
  - RUM = JavaScript dans le navigateur, mesure l'expérience **réelle** mais nécessite du trafic
- **« Sans monitoring, vous découvrez la panne en même temps que vos utilisateurs — voire après eux »**
- **Matrice cas d'usage** :
  - Checks disponibilité basiques → **Uptime Kuma**, HertzBeat
  - Tests de charge → **k6**
  - Scénarios navigateur → k6 browser, Playwright
  - RUM → Grafana Faro / SaaS
- **Uptime Kuma** :
  - « Veilleur de nuit numérique » (analogie SR)
  - 10 types de monitors (HTTP/Keyword/JSON Query, TCP, Ping, DNS, Docker, WebSocket, Push heartbeat…)
  - 90+ notifications (Discord, Slack, Telegram, SMTP, ntfy, PagerDuty…)
  - Self-hosted, open source, intervalles min 20s, 2FA, certificats SSL
  - **Pièges** : pas de NFS (SQLite), socket Docker en RO, activer 2FA tout de suite
- **Pour application IA** : sonde HTTP sur `/health` + sonde Keyword sur réponse LLM canonique (« est-ce que `/explain?demo=true` renvoie une réponse non vide ? »)

### Visuels
- [ ] Tableau : Synthetics vs RUM (3-4 lignes)
- [ ] Code YAML : docker-compose Uptime Kuma minimal
- [ ] Tableau : intervalles recommandés (20-30s critique, 60s standard, 300s secondaire)
- [ ] Slide-citation : « Sans monitoring, vous découvrez la panne en même temps que vos utilisateurs »

### Talking Points
- Uptime Kuma = à ajouter dans la stack du brief si temps disponible J3
- Ce n'est PAS un remplacement de Prometheus, c'est un complément depuis l'extérieur

### Sources
- SR `/outils/observabilite/synthetics-rum/`
- SR `/outils/observabilite/synthetics-rum/uptime-kuma/`

---

## Module 7 — Incident management & post-mortem (45 min, ~12 slides)

### Key Points
- **Démarche de diagnostic** : Confirmer → Mesurer impact → Communiquer → Mitiger → Documenter
- **Triage 60 secondes** : (1) confirmer l'impact (2) délimiter le blast radius (3) identifier le dernier changement (4) **mitigation rapide d'abord, RCA ensuite**
- **Citation SR** : « Ne pas chercher la cause racine pendant que les utilisateurs souffrent »
- **Grille SEV** : SEV-1 (>50% users, core down, fuite données) / SEV-2 (<50% users, contournement) / SEV-3 (impact limité)
- **« C'est l'impact qui décide, pas l'alerte »**
- **4 rôles en SEV-1** : Incident Commander (coordonne, ne tape pas) / Ops Lead (exécute) / Scribe (timeline) / Communicateur (status page)
- **Lecture conjointe logs + métriques + traces** (démarche pratique)
- **Runbook en 5 sections** : Prérequis / Symptôme / Diagnostic / Remédiation / Escalade
- **Toolbox pod** : `kubectl run -it --rm debug --image=nicolaka/netshoot`
- **Post-mortem blameless** : citation Google SRE « ingénieurs en sécurité pour rapporter les détails sans craindre de représailles »
- **Nuance SR** : « blameless ≠ sans responsabilité — chaque action item a un owner et une deadline »
- **5 catégories d'action items** : Prévention / Détection / Mitigation / Remédiation / Résilience
- **4 métriques** : MTTD / MTTA / MTTR / MTBF
- **Convention MTTR SR** : « MTTR = retour à une expérience utilisateur acceptable (pas tous les systèmes parfaits) »
- **Template post-mortem** complet à donner aux apprenants (livrable J3)

### Visuels
- [ ] Diagram : démarche de diagnostic (Mermaid LR)
- [ ] Tableau : grille SEV (3 lignes, temps de réponse cibles)
- [ ] Tableau : 4 rôles SEV-1 (rôle / responsabilité / piège)
- [ ] Tableau : 5 sections runbook
- [ ] Snippet : template post-mortem (slide entier)

### Talking Points
- L'IC ne tape pas de commandes — anti-pattern classique
- Le scribe rend possible le post-mortem
- Blameless ≠ pas de responsabilité

### Sources
- Source principale, M7 (intégralité)
- SR `/pratiques/runbooks-incident/` (triage 60s, grille SEV, 4 rôles, blameless+nuance, MTTR, template)

---

## Game Day (1h30, ~8 slides)

### Énoncé
Le formateur exécute, **sans prévenir**, 3 scripts sur l'API en cours d'exécution chez chaque binôme (ou sur instance partagée). 30 min par incident.

### Les 3 incidents

| # | Incident | Script formateur | Symptôme attendu côté apprenant |
|---|----------|------------------|---------------------------------|
| 1 | **Latence injectée** | `time.sleep(random.uniform(0.5, 2))` dans `/predict` | Alerte `HighLatencyP95`, p99 explose |
| 2 | **Erreur non gérée** | `raise RuntimeError("oops")` 1× sur 10 | Alerte `HighErrorRate`, spike de logs ERROR |
| 3 | **Drift simulé** | Modifier le modèle pour prédire 95 % « spam » | Distribution prédictions déséquilibrée, alerte `PredictionDistributionShift` |

### Attendus par binôme et par incident
1. Diagnostiquer (logs + dashboards + traces)
2. Proposer une mitigation
3. Restaurer le service
4. Documenter au fil de l'eau (timeline)

### Visuels
- [ ] Slide énoncé général + règles
- [ ] Slide « incident 1 » (sans révéler la cause)
- [ ] Slide debrief incident 1 (révélation + discussion)
- [ ] Idem incidents 2 et 3

### Talking Points
- Discussion ouverte après chaque incident : « qu'est-ce qui aurait pu rendre la détection plus rapide ? »
- Encourager l'utilisation du chat/canal incident
- Préparer le post-mortem livrable

---

## Wrap-up (30 min, ~6 slides)

### Key Points
- Récap des 9 modules + 2 bonus
- Stack d'observabilité « idéale » (récap visuel : Prometheus / Grafana / Loki / Tempo / OTel Collector / Langfuse / Alertmanager / Uptime Kuma)
- Annexe C source : tableau « que choisir ? » par cas d'usage
- Niveaux de maturité — où chaque apprenant peut viser ensuite
- Ressources Annexe B (liens à donner)
- Livrables attendus : projet instrumenté + post-mortem du Game Day
- Slide closing (template `end`) avec QR code LinkedIn

### Visuels
- [ ] Diagram stack complète (Mermaid)
- [ ] Tableau récap Annexe C
- [ ] Slide ressources clés
- [ ] Slide end (template `end` existant)

---

## Diagrams to Create (synthèse)

1. **3 piliers Observability** (Mermaid graph) — M1
2. **Arbre de décision modèles mentaux** (Mermaid) — M1
3. **Pipeline logs 4 étapes** (Mermaid LR) — M2
4. **Formule coût logs** (Mermaid) — M2
5. **Fenêtres glissantes drift** (timeline) — M8
6. **3 axes monitoring LLM** (Mermaid) — M9
7. **Décomposition latence RAG** (timeline horizontale) — M9
8. **Modèle pull Prometheus** (Mermaid) — M3
9. **Drill-down dashboards** (Mermaid) — M4
10. **4 composants OpenTelemetry** (Mermaid) — M-OTel
11. **Pipeline Collector Receivers→Processors→Exporters** (Mermaid) — M-OTel
12. **4 patterns déploiement Collector** (Mermaid) — M-OTel
13. **Architecture alerting** (Prometheus → AM → webhooks) — M5
14. **Burn rate diagram** (axes budget × temps) — M5
15. **Anatomie d'un span** (Mermaid) — M6
16. **Arbre de spans checkout** (Mermaid tree, verbatim SR) — M6
17. **Démarche diagnostic incident** (Mermaid LR) — M7
18. **Architecture projet brief** (Mermaid C4) — Brief
19. **Stack obs complète** (Mermaid) — Wrap-up

---

## Code Examples to Include (synthèse)

| Module | Exemple | Langage | Highlight |
|--------|---------|---------|-----------|
| M2 | FastAPI + python-json-logger + middleware request_id | Python | progressif (3 étapes) |
| M3 | Counter + Histogram + Gauge prediction_duration | Python | progressif (4 étapes) |
| M3 | `prometheus.yml` scrape config | YAML | static |
| M4 | Recording rules RED | YAML | static |
| M4 | Annotation API Grafana depuis CI/CD | bash | static |
| M5 | Règle Prometheus `PaymentErrorRateHigh` avec `clamp_min` | YAML | static |
| M5 | Alertmanager routing + inhibition | YAML | progressif (2 étapes) |
| M5 | Watchdog deadman switch | YAML | static |
| M6 | `tracer.start_as_current_span()` + `record_exception` | Python | progressif (2 étapes) |
| M7 | Template post-mortem | Markdown | static (1 slide entier) |
| M8 | `ks_2samp` drift + `prometheus_client.Gauge` | Python | progressif (3 étapes) |
| M8 | Règle Prometheus `PredictionDriftHigh` | YAML | static |
| M9 | Langfuse trace + span retrieval + generation | Python | progressif (4 étapes) |
| M9 | docker-compose Langfuse + Postgres | YAML | static |
| M9 | Export coût Langfuse vers Prometheus Gauge | Python | static |
| M-OTel | Span manuel + attributes + erreur | Python | static |
| M-OTel | Collector config 3 signaux complète | YAML | static |
| M-Synth | docker-compose Uptime Kuma | YAML | static |

Tous les exemples sont **moderate** (snippets de 5-15 lignes, highlight progressif quand pédagogiquement utile).

---

## Demo Plan — Brief continu = la démo

Pas de live demo formateur. **Le brief est la démo en continu** :

### Brief : Instrumenter le projet fourni (API + Agent RAG + Front + CLI dockerisé)

**Livrables binôme par jour** :
- **J1 fin** : logs structurés JSON sur l'API + middleware request_id
- **J2 fin** : métriques Prometheus exposées + 2 dashboards Grafana (RED + USE) + scrape config + record rules
- **J3 fin** : 2 alertes Alertmanager (latence + erreur) + Langfuse intégré côté agent RAG + post-mortem du Game Day

**Setup fourni** :
- Repo Git avec code applicatif + `docker-compose.yml` squelette (cf. Annexe A du support)
- Instance partagée pour le Game Day (ou local par binôme)

**Fallback** :
- Si Langfuse self-host ne démarre pas → utiliser cloud Langfuse free tier
- Si Prometheus n'arrive pas à scraper → utiliser `prometheus-client` `start_http_server(8000)` direct
- Game Day : un binôme peut suivre l'incident en mode démonstration s'il est bloqué

---

## Potential Q&A (préparation formateur)

1. **« Faut-il vraiment du tracing distribué pour un monolithe ? »**
   - Pour un monolithe simple, RED + USE suffisent. Le tracing devient utile dès qu'il y a 2+ services ou un agent multi-step (LLM).

2. **« Loki ou Elasticsearch pour les logs ? »**
   - Loki si vous êtes déjà sur Grafana et avez peu de labels (index labels-based). Elasticsearch/OpenSearch si vous voulez de la recherche full-text puissante et acceptez l'opérationnel plus lourd.

3. **« Combien coûte une stack observability comme ça ? »**
   - En self-host : coût infra (CPU/RAM/stockage). Compter ~1 Go RAM par service Prometheus/Grafana/Loki/Tempo en démarrage. Sur Grafana Cloud free tier : suffisant pour démarrer.

4. **« Quelle différence entre PromQL et LogQL ? »**
   - PromQL = requêter des métriques agrégées (séries temporelles). LogQL = requêter des logs avec parsing + agrégation à la volée. Syntaxe inspirée mais sémantique différente.

5. **« Que faire si on est sur AWS / GCP ? »**
   - CloudWatch / Stackdriver remplacent partiellement Prometheus+Grafana, mais OpenTelemetry reste valable (exporters AWS/GCP existent). Pour LLM, Langfuse self-host ou cloud reste indépendant.

6. **« Comment alerter sur le coût LLM sans Alertmanager natif Langfuse ? »**
   - Pattern donné en M9 : job cron qui pull `langfuse_api.get_daily_cost()` → Gauge Prometheus → règle d'alerte. Couvert dans la démo.

7. **« Sampling head-based ou tail-based ? »**
   - Commencer head-based 100% en dev. En prod : si volume > quelques milliers de spans/s, passer à tail-based (Collector tail-sampling processor) pour garder toutes les erreurs.

8. **« Comment gérer le drift en temps réel sans labels ? »**
   - On compare la distribution des **sorties du modèle** (prediction drift) vs une référence. Pas besoin de labels réels. Couvert en M8.

9. **« Game Day : et si on ne diagnostique pas dans les 30 min ? »**
   - Le formateur révèle progressivement des indices. Le but est l'apprentissage, pas la note.

10. **« Combien de SLO faut-il définir ? »**
    - Pour un MVP : 1 SLO disponibilité + 1 SLO latence par CUJ (Critical User Journey). Pas plus de 4-5 SLO par service.

---

## Template Choices

- Slide `presentation` du template `decks/templates/slides.md` (bio formateur 2-cols-header)
- Slide `end` du template (closing « Let's build together » avec QR code LinkedIn)
- Layouts utilisés : `cover`, `default`, `two-cols`, `two-cols-header`, `section`, `image-right`, `fact`, `center`, `end`

---

## Appendix — Slide Outline (numéroté)

> Format : `[layout] Titre — module`. Les slides marqués `★` correspondent à des citations slide-only.

### Intro
1. [cover] Observability d'une application IA — background Unsplash
2. [two-cols-header] Présentation Maxime Lenne — template
3. [default] Agenda 3 jours
4. [default] Objectifs de la formation (5 objectifs du meta.json)
5. [default] Prérequis (5 prérequis du meta.json)
6. [center] « Tout est vert, mais les recos sont nulles » — accroche

### Module 1 — Pourquoi l'observability (45 min)
1. [section] Module 1 — Pourquoi l'observability ?
2. [default] Définitions : Monitoring / Observabilité / APM
3. [fact] ★ « Observabilité — Kalman, 1960 »
4. [default] Observabilité vs Monitoring (known unknowns vs unknown unknowns)
5. [center] ★ « Le monitoring vous dit qu'il y a un problème. L'observabilité vous permet de comprendre pourquoi. »
6. [two-cols] Analogie médicale : thermomètre vs scanner/IRM
7. [default] Scénario vendredi 18h : 1h15 vs 12 min
8. [default] Les 3 piliers (diagram)
9. [default] Modèles mentaux : RED / USE / Golden Signals (tableau)
10. [default] Arbre de décision « quel modèle mental ? »
11. [default] Spécificité IA — métriques modèle / données / métier
12. [default] Niveaux de maturité (4 paliers SR)
13. [center] Activité (15 min) : RED + ML pour API spam
14. [center] Pause

### Module 2 — Logging structuré (1h30)
1. [section] Module 2 — Logging structuré
2. [two-cols] Log texte vs Log JSON
3. [default] Définition log : « événement discret horodaté » (SR)
4. [default] Analogie carnet de bord
5. [default] 5 niveaux : DEBUG/INFO/WARN/ERROR/FATAL
6. [center] ★ « Le choix du niveau est un acte d'engagement envers l'astreinte »
7. [default] 6 champs essentiels (timestamp/level/service/message/trace_id/request_id)
8. [default] Champs spécifiques ML (model_version, latency_ms, prediction, confidence)
9. [default] RGPD : pas de PII, pseudonymisation sha256+salt
10. [default] Pipeline 4 étapes Émission→Collecte→Stockage→Requêtage (diagram)
11. [fact] ★ « Volume × Rétention × Requêtage = Coût »
12. [default] DEBUG en prod = × 10-100 sur le volume
13. [default] Centralisation : Loki vs ELK vs CloudWatch (tableau)
14. [default] Démo code — FastAPI + python-json-logger (étape 1)
15. [default] Démo code — middleware request_id (étape 2)
16. [default] Démo code — log start/end de requête avec latency (étape 3)
17. [center] ★ « La qualité du log se décide à l'émission, pas au requêtage »
18. [default] Exercice : ajouter logs structurés à `mon_api.py` (15 min)
19. [default] Recap M2 — checklist
20. [center] Pause déjeuner

### Module 8 — Observability ML & drift (1h)
1. [section] Module 8 — Observability ML & monitoring modèle
2. [default] Pourquoi un pipeline ML est différent — pannes silencieuses
3. [default] 3 types de drift (tableau)
4. [default] Prediction drift = le plus accessible sans labels
5. [default] PSI / KS / Wasserstein (formules + seuils)
6. [default] Embeddings drift : distance moyenne, clustering
7. [default] Fenêtres glissantes (timeline)
8. [default] Outils ML monitoring (tableau 5 colonnes)
9. [default] Pattern intégration drift → Gauge Prometheus
10. [default] Démo code — `ks_2samp` + Gauge (étape 1)
11. [default] Démo code — job périodique compute_drift (étape 2)
12. [default] Règle PromQL `PredictionDriftHigh`
13. [default] Démo Grafana — tracer drift avec seuil 0.2
14. [center] Exercice : implémenter le drift sur votre brief

### Module 9 — Observability LLM (1h15)
1. [section] Module 9 — Observability LLM & tracing d'agents
2. [default] Pourquoi un LLM est encore plus difficile (6 raisons)
3. [default] Les 3 axes : TRACE / QUALITY / COST&LATENCY
4. [default] Vocabulaire : Trace / Span / Generation / Score / Session
5. [default] Coût et tokens : prompt/completion/total, conversion €
6. [default] Tarifs modèles (gpt-4o-mini / 4o / Claude…) — tableau
7. [default] Décomposition latence RAG (timeline horizontale)
8. [default] Évaluation continue : feedback / LLM-as-judge / régression / A/B
9. [default] Tour des outils LLM observability (tableau 5 colonnes)
10. [default] Critères de décision (OSS / LangChain / W&B / MLflow / RAG)
11. [default] Démo Langfuse — docker-compose (étape 1)
12. [default] Démo code — instrumenter endpoint RAG (étape 2)
13. [default] Démo code — span retrieval + generation (étape 3)
14. [default] Démo Langfuse UI — trace + drill-down spans
15. [default] Ajout de scores : user_feedback + LLM-as-judge
16. [default] Export coût Langfuse → Prometheus + règle alerte
17. [default] Recap M9 — checklist
18. [center] Atelier fin J1 (30 min) : stack obs LLM pour copilote interne

### Bloc Brief — J2 ouverture (30 min)
1. [cover] Jour 2 — Brief commence
2. [default] Architecture du projet à instrumenter (diagram C4)
3. [default] Ce qui est déjà fourni
4. [default] Ce que vous devez ajouter (livrables J2-J3)
5. [default] Critères d'évaluation
6. [default] Setup environnement (commandes)

### Module 3 — Métriques & Prometheus (1h)
1. [section] Module 3 — Métriques & Prometheus
2. [default] Modèle pull — Prometheus scrape (diagram)
3. [default] Limites du pull → Pushgateway
4. [default] Définition métrique : nom + labels + valeur + timestamp
5. [default] 4 types : Counter / Gauge / Histogram / Summary (tableau)
6. [center] ★ « Ne jamais lire un counter brut → utiliser rate() »
7. [default] Cardinalité : formule + piège mortel
8. [default] Labels interdits vs autorisés
9. [default] Conventions de nommage (_seconds,_bytes, _total, snake_case)
10. [default] PromQL essentiel (tableau requêtes)
11. [default] Démo code — prometheus_client (Counter + Histogram + Gauge) étape 1
12. [default] Démo code — labels model_version, outcome étape 2
13. [default] Démo infra — prometheus.yml scrape config
14. [default] Démo Grafana — query basique
15. [center] ★ « Les métriques vous alertent, les logs expliquent »
16. [default] Exercice : exposer 3 métriques sur votre brief

### Module 4 — Grafana & dashboards (45 min)
1. [section] Module 4 — Grafana & dashboards
2. [default] Concepts : Datasource / Panel / Dashboard / Variables
3. [center] ★ « Un dashboard utile répond à une question en < 5 secondes »
4. [default] Règle des 3 questions (Qui / Quelle question / Quelle action)
5. [default] RED pour services / USE pour infra
6. [default] Hiérarchie drill-down Overview → RED → USE → Logs/Traces (diagram)
7. [default] Recording rules (code YAML)
8. [default] Annotations de déploiement (snippet bash)
9. [default] Anti-patterns dashboards (5 items)
10. [center] ★ « Dashboards = lecture, alerting = règles. Ne jamais alerter depuis un dashboard. »
11. [default] Pattern API ML — 6 panels (RPS / 5xx / p50-p95-p99 / RPS par route / distribution prédictions / model_version)
12. [default] Provisioning YAML (versioning)

### Module bonus — OpenTelemetry (1h)
1. [section] Module — OpenTelemetry & Collector
2. [center] ★ « OTel sépare l'instrumentation du stockage »
3. [default] Origine — OpenTracing + OpenCensus, mai 2019 (CNCF)
4. [default] 4 composants — API / SDK / OTLP / Collector (diagram)
5. [default] Ports OTLP : 4317 gRPC / 4318 HTTP
6. [default] Maturité signaux — Traces GA 2021, Métriques GA 2023, Logs GA 2023
7. [default] Auto-instrumentation par langage (tableau)
8. [center] ★ « Auto = plomberie, manuel = métier »
9. [default] Semantic Conventions (service.name, http.request.method...)
10. [default] Collector architecture — Receivers → Processors → Exporters (diagram)
11. [default] 4 patterns déploiement (sans / gateway / agent+gateway / sidecar)
12. [default] Démo code Python — span manuel + attributs + erreur
13. [default] Démo YAML — Collector config 3 signaux complète
14. [default] Anti-patterns : `:latest`, pas de `memory_limiter`, labels Loki trop riches
15. [center] Exercice : ajouter un span OTel à votre endpoint RAG

### Module 5 — Alerting (1h)
1. [section] Module 5 — Alerting
2. [default] Architecture : Prom → Alertmanager → webhooks (diagram)
3. [center] ★ « Alertez sur les symptômes, pas sur les causes »
4. [default] Tableau symptom-first (4 lignes verbatim SR)
5. [center] ★ « Alerter sur CPU > 90 % est (presque) toujours inutile »
6. [default] Engrenage de l'alert fatigue (4 étapes)
7. [default] Anatomie règle Prometheus + clamp_min
8. [default] Code YAML — règle PaymentErrorRateHigh
9. [default] Valeurs `for:` par défaut (critical 5min / warning 15-30min / info 1h+)
10. [default] Alertmanager — 5 mécanismes (Routing/Grouping/Silencing/Inhibition/Dédup)
11. [default] Code YAML — routing + inhibition
12. [default] SLO & Error Budget : `Error budget = 100 % − SLO`
13. [default] Burn rate MWMBR : 14,4× = page critical, 6× = ticket warning
14. [default] Watchdog deadman switch
15. [default] 3 niveaux severity max + règle 2-3 pages/semaine
16. [default] 5 critères production-ready (Owner / Runbook / Severity / Actionnable / Testée)
17. [center] Exercice : ajouter 2 alertes à votre brief

### Module 6 — APM & tracing (30 min)
1. [section] Module 6 — APM & tracing distribué
2. [default] APM vs monitoring infra (vue applicative + tracing + profiling + error tracking)
3. [default] Vocabulaire : Trace / Span / Context propagation W3C
4. [default] Anatomie d'un span (8 champs)
5. [default] 5 SpanKind (CLIENT/SERVER/INTERNAL/PRODUCER/CONSUMER)
6. [default] Arbre de spans checkout 4200ms ERROR (verbatim SR)
7. [default] Sampling head-based vs tail-based
8. [center] ★ « Commencez head-based 100% et réduisez progressivement »
9. [default] Outils : OTel + Tempo / Jaeger / Zipkin / Datadog
10. [default] Code Python — span + record_exception

### Module bonus — Synthetics / Uptime Kuma (30 min)
1. [section] Module — Synthetics / RUM / Uptime Kuma
2. [default] Définition : monitoring synthétique = sondes externes
3. [default] Synthetics vs RUM (tableau)
4. [center] ★ « Sans monitoring, vous découvrez la panne en même temps que vos utilisateurs »
5. [default] Matrice cas d'usage (Uptime Kuma / k6 / Playwright / Faro)
6. [default] Uptime Kuma — « veilleur de nuit numérique »
7. [default] Code YAML — docker-compose Uptime Kuma
8. [default] Intervalles recommandés (20s critique / 60s standard / 300s secondaire)

### Module 7 — Incident management (45 min)
1. [section] Module 7 — Incident management & post-mortem
2. [default] Démarche : Confirmer → Mesurer → Communiquer → Mitiger → Documenter
3. [default] Triage 60 secondes
4. [center] ★ « Ne pas chercher la cause racine pendant que les utilisateurs souffrent »
5. [default] Grille SEV (SEV-1 / SEV-2 / SEV-3)
6. [center] ★ « C'est l'impact qui décide, pas l'alerte »
7. [default] 4 rôles en SEV-1 (IC / Ops Lead / Scribe / Communicateur)
8. [default] Lecture conjointe logs + métriques + traces
9. [default] Runbook 5 sections (Prérequis/Symptôme/Diag/Remédiation/Escalade)
10. [default] Post-mortem blameless (citation Google SRE)
11. [center] ★ « Blameless ≠ sans responsabilité »
12. [default] Template post-mortem (slide entier)
13. [default] 4 métriques : MTTD / MTTA / MTTR / MTBF

### Game Day (1h30)
1. [cover] Game Day — vos systèmes sont attaqués
2. [default] Règles et attendus
3. [default] Incident 1 : ??? (sans révéler la cause)
4. [default] Debrief incident 1 — latence injectée
5. [default] Incident 2 : ???
6. [default] Debrief incident 2 — erreur non gérée
7. [default] Incident 3 : ???
8. [default] Debrief incident 3 — drift simulé

### Wrap-up (30 min)
1. [section] Wrap-up
2. [default] Récap stack obs idéale (diagram complet)
3. [default] Tableau « que choisir ? » (Annexe C source)
4. [default] Niveaux de maturité — votre prochain palier
5. [default] Ressources clés (liens Annexe B)
6. [default] Livrables attendus + délai
7. [end] Let's build together — template `end`

---

_Plan créé le : 2026-05-11_
_Prêt pour génération de slides : [ ]_
_Validation utilisateur attendue avant `/slidev:create`_
