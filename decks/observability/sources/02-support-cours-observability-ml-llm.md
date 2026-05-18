# Support de cours — Observability d'une application IA

Document destiné au formateur. Sert de trame de cours et de notes d'animation. Format : sections autonomes, chaque section \= un module pouvant être projeté ou converti en slides.

---

## Module 1 — Pourquoi l'observability ? (45 min, J1)

### Accroche

"Votre modèle est en prod depuis 3 mois. Le service répond 200 OK à toutes les requêtes. Les utilisateurs se plaignent que les recommandations sont devenues nulles. Que fait-on ?"

Ce scénario illustre la limite du monitoring HTTP classique : tout va bien côté infra, mais le système IA est dégradé.

### Définitions à poser au tableau

**Monitoring** : collecter et visualiser des métriques connues à l'avance pour répondre à des questions connues.

**Observability** : capacité à comprendre l'état interne d'un système à partir de ses sorties externes, **y compris pour des questions qu'on n'avait pas anticipées**.

**APM (Application Performance Monitoring)** : sous-catégorie centrée sur la performance applicative (latence, erreurs, dépendances). Souvent associé au tracing distribué.

### Les 3 piliers

1. **Logs** : événements horodatés, riches en contexte, volumineux  
2. **Metrics** : valeurs numériques agrégées dans le temps, peu volumineuses  
3. **Traces** : chemins d'exécution traversant plusieurs services

### Méthodes pour choisir quoi mesurer

- **RED** (services) : Rate, Errors, Duration  
- **USE** (ressources) : Utilization, Saturation, Errors  
- **Four Golden Signals** (Google SRE) : latency, traffic, errors, saturation

### Spécificité IA

Pour une app ML, le monitoring infra ne suffit pas. Il faut aussi :

- métriques **modèle** (latence inférence, distribution des prédictions, score de confiance)  
- métriques **données** (drift d'entrée, valeurs nulles, valeurs hors distribution)  
- métriques **métier** (taux de conversion, NPS, etc. — feedback loop)

### Activité (15 min)

Faire lister par groupes : "Pour notre API de classification de spams, quelles métriques RED \+ ML proposeriez-vous ?"

---

## Module 2 — Logging structuré (1h30, J1)

### Pourquoi structurer

Comparer deux lignes de log :

```
INFO 2026-05-04 14:23:11 prediction done in 0.12s for user_42
```

vs.

```json
{"timestamp":"2026-05-04T14:23:11Z","level":"INFO","message":"prediction_done","request_id":"7f3","user_id_hash":"a2c","latency_ms":120,"model_version":"v1.4.2","prediction":"spam","confidence":0.91}
```

Le second est requêtable : `latency_ms > 500 AND model_version = "v1.4.2"`.

### Niveaux et bonnes pratiques

- DEBUG : dev uniquement, désactivé en prod  
- INFO : événements métier (prédiction effectuée, requête servie)  
- WARNING : situation anormale gérée (fallback, retry)  
- ERROR : exception qui empêche l'opération  
- CRITICAL : panne du système

Règle d'or : **un log \= un événement, jamais une boucle qui en émet 1000/s**.

### Champs essentiels d'un log ML

| Champ | Usage |
| :---- | :---- |
| `timestamp` (ISO 8601 UTC) | Tri et corrélation |
| `level` | Filtrage |
| `service`, `version` | Identification du déployé |
| `request_id` | Corrélation entre logs d'une même requête |
| `route`, `http_status` | Côté API |
| `model_version` | Corrélation modèle/comportement |
| `latency_ms` | Performance |
| `prediction`, `confidence` | Audit du modèle |
| **PAS** d'inputs PII | Conformité RGPD |

### RGPD dans les logs

- Pas de PII en clair (email, nom, adresse, données de santé, etc.)  
- Pseudonymisation : `user_id_hash = sha256(user_id + salt)`  
- Durée de rétention définie et appliquée (ex : 30 jours pour les logs applicatifs, 1 an pour les logs d'audit)  
- Les logs accessibles aux apprenants/devs ne doivent pas permettre la ré-identification

### Démo guidée (30 min)

Partir d'une API FastAPI minimale, ajouter `python-json-logger` :

```py
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger("api")
handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(
    "%(asctime)s %(levelname)s %(name)s %(message)s"
)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)
```

Puis ajouter un middleware FastAPI qui :

- génère un `request_id` (UUID v4) si absent dans les headers  
- l'attache à un `contextvars.ContextVar`  
- log start / end de requête avec latency

### Centralisation (mention rapide)

- **Loki** (Grafana Labs) : pull-based, indexe les labels, cher si trop de cardinalité — bien intégré avec Grafana  
- **ELK / OpenSearch** : index full-text puissant, plus lourd à opérer  
- **CloudWatch / GCP Logging** : sur cloud, simple à brancher  
- Choix pédagogique de la semaine : on logge en stdout, optionnel d'ajouter Loki au brief

---

## Module 3 — Métriques & Prometheus (1h, J2)

### Modèle pull

Prometheus scrappe (interroge) les cibles à intervalle régulier sur un endpoint HTTP `/metrics`. Avantages :

- découverte de service automatique  
- santé du scrape lui-même est observable (`up{}`)  
- pas besoin que l'app sache où envoyer les métriques

Limites : ne convient pas pour les batchs courts → `Pushgateway`.

### Les 4 types de métriques

| Type | Quand l'utiliser | Exemple |
| :---- | :---- | :---- |
| **Counter** | Quelque chose qui ne fait qu'augmenter | `http_requests_total` |
| **Gauge** | Valeur qui monte et descend | `memory_usage_bytes`, `queue_size` |
| **Histogram** | Distribution d'une mesure (latence) | `request_duration_seconds` |
| **Summary** | Comme Histogram mais quantiles côté app | À éviter pour l'agrégation cross-instances |

### Règles importantes

- **Counter** ne doit jamais redescendre. Pour calculer un débit : `rate(metric[5m])`  
- **Histogram** : choisir les buckets en amont (ex : `[0.005, 0.01, 0.025, ..., 10]` secondes)  
- **Labels** : dimension utile (route, status, model\_version) — JAMAIS d'identifiant unique (user\_id, request\_id) → cardinalité explosive

### Exemple de métriques pour notre API ML

```py
from prometheus_client import Counter, Histogram, Gauge

predictions_total = Counter(
    "ml_predictions_total",
    "Total predictions served",
    ["model_version", "outcome"],
)

prediction_duration = Histogram(
    "ml_prediction_duration_seconds",
    "Prediction latency",
    ["model_version"],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
)

confidence_score = Histogram(
    "ml_prediction_confidence",
    "Distribution of model confidence",
    ["model_version"],
    buckets=[0.1, 0.3, 0.5, 0.7, 0.9, 1.0],
)

active_model_version = Gauge(
    "ml_active_model_version_info",
    "Active model version",
    ["version"],
)
```

### PromQL — les requêtes essentielles à connaître

| Besoin | Requête |
| :---- | :---- |
| Requêtes/seconde | `rate(http_requests_total[5m])` |
| Taux d'erreur | `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))` |
| Latence p95 | `histogram_quantile(0.95, sum by(le)(rate(request_duration_seconds_bucket[5m])))` |
| Cible UP/DOWN | `up{job="api"}` |

### Démo guidée

Lancer un Prometheus en Docker :

```
prometheus:
  image: prom/prometheus:v2.51.0
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports: ["9090:9090"]
```

Avec un `prometheus.yml` qui scrape l'API toutes les 15 s, montrer la cible dans l'UI puis exécuter quelques requêtes PromQL.

---

## Module 4 — Grafana & dashboards (45 min, J2)

### Concepts

- **Datasource** : où les données sont stockées (Prometheus, Loki, …)  
- **Panel** : une visualisation (graph, gauge, table, stat, heatmap)  
- **Dashboard** : ensemble de panels  
- **Variables** : sélecteurs dynamiques (ex : `$model_version`)

### Bonnes pratiques de dashboard

1. Un dashboard \= une question. "Mon API va-t-elle bien ?" est une question. "Tout l'écosystème" n'en est pas une.  
2. Mettre les indicateurs critiques en haut à gauche (œil suit la lecture)  
3. Toujours afficher : RPS, taux d'erreur, latence p50/p95/p99, saturation  
4. Annoter les déploiements (via API Grafana lors du CI/CD)  
5. Pas plus de 12 panels par dashboard

### Provisioning

Versionner les dashboards :

```
grafana/
├── provisioning/
│   ├── datasources/prometheus.yml
│   └── dashboards/dashboards.yml
└── dashboards/
    └── api-overview.json
```

### Pattern à montrer aux apprenants

Le dashboard "API Overview" attendu sur le brief contient au minimum :

- Stat : RPS courant  
- Stat : taux d'erreur 5xx  
- Time series : latence p50 / p95 / p99  
- Time series : RPS par route  
- Time series : distribution des prédictions (par classe ou histogramme de confiance)  
- Stat : nombre de prédictions par version de modèle (24 h)

---

## Module 5 — Alerting (1h, J3)

### Architecture

```
Prometheus (évalue les règles) → Alertmanager (route, silence, notifie) → Webhook (Slack/Discord/email/PagerDuty)
```

### Règles Prometheus

```
groups:
  - name: api-slo
    rules:
      - alert: HighLatencyP95
        expr: histogram_quantile(0.95, sum by(le)(rate(http_request_duration_seconds_bucket[5m]))) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Latence p95 > 1s pendant 5 min"
          runbook: "https://internal/runbooks/high-latency"
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Taux d'erreur 5xx > 1 % sur 5 min"
```

### Alertmanager — routes et notifications

```
route:
  receiver: 'team-discord'
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
receivers:
  - name: 'team-discord'
    webhook_configs:
      - url: 'http://discord-relay:8080/hook'
```

### Bonnes pratiques (anti alert fatigue)

1. **Alerter sur des symptômes, pas sur des causes** : "latence \> 1 s" plutôt que "CPU \> 80 %"  
2. Toujours avoir un `for:` (durée minimale avant déclenchement)  
3. Lier chaque alerte à un **runbook** (procédure de réponse)  
4. Tester silencieusement avant de mettre en `severity: critical`  
5. Approche **SLO-based** : alerter sur la consommation du **error budget** (multi-window burn rate) plutôt que sur des seuils figés

### Exemple SLO

- SLO : 99,5 % des requêtes en moins de 500 ms  
- Error budget mensuel : 0,5 % × 30 jours \= \~3 h 36 min  
- Alerte de **fast burn** : si on consomme 2 % du budget en 1 h → page immédiate  
- Alerte de **slow burn** : si on consomme 10 % en 6 h → ticket

---

## Module 6 — APM (30 min, J3)

### Définition opérationnelle

Un APM ajoute par rapport à un monitoring infra :

- la **vue applicative** (par endpoint, par dépendance, par user)  
- le **tracing distribué** (suivi d'une requête à travers plusieurs services)  
- le **profiling** (où le CPU est consommé)  
- l'**error tracking** (groupement automatique d'exceptions)

### Tracing distribué — vocabulaire

- **Trace** : représentation complète d'une requête  
- **Span** : unité de travail dans une trace (un appel HTTP, une requête DB)  
- **Context propagation** : transmission de l'identifiant de trace via les headers (`traceparent`)

### Outils

- **OpenTelemetry** : standard ouvert, instrumentation, pas de stockage  
- **Tempo** (Grafana Labs) : backend de traces, intégré à Grafana  
- **Jaeger**, **Zipkin** : alternatives open source historiques  
- **Datadog APM**, **New Relic**, **Dynatrace** : SaaS payants, très complets

Pour le brief, on n'implémente pas le tracing. On le présente et on précise comment l'ajouter par la suite (instrumentation OTEL côté FastAPI).

---

## Module 7 — Incident management (45 min, J3)

### Démarche de diagnostic

1. **Confirmer** l'incident (alerte \= vrai problème ou faux positif ?)  
2. **Mesurer l'impact** (combien d'utilisateurs ? lesquels ? depuis quand ?)  
3. **Communiquer** (status page, canal incident)  
4. **Mitiger** d'abord (rollback, dégrader proprement) — corriger ensuite  
5. **Documenter** au fil de l'eau (timeline des actions)

### Lecture conjointe logs \+ métriques

- Voir l'alerte sur Grafana → identifier la fenêtre  
- Filtrer les logs sur la fenêtre, par `level=ERROR`  
- Récupérer le `request_id` d'une erreur → tracer son parcours  
- Comparer avec un dashboard de version de modèle / déploiement

### Trame de post-mortem (à donner aux apprenants)

```
# Post-mortem — [Titre de l'incident]
**Date** : YYYY-MM-DD
**Durée** : XXX minutes
**Sévérité** : SEV-1 / SEV-2 / SEV-3
**Impact** : nombre d'utilisateurs affectés, fonctionnalités touchées

## Résumé en 3 lignes
...

## Timeline (UTC)
- HH:MM — événement
- HH:MM — alerte déclenchée
- HH:MM — début mitigation
- HH:MM — résolution

## Détection
Comment l'incident a été détecté (alerte auto, signalement utilisateur, etc.)

## Root cause
Cause racine technique. **Ne pas blâmer une personne.**

## Ce qui a bien fonctionné
...

## Ce qui n'a pas bien fonctionné
...

## Actions correctives (avec owners et dates)
- [ ] Action 1 — @owner — date
- [ ] ...
```

### Game day — incidents à provoquer (J3 après-midi)

Le formateur exécute, sans prévenir, 3 scripts sur l'API en cours d'exécution chez chaque binôme (ou sur une instance commune partagée) :

| Incident | Script formateur | Symptôme attendu côté apprenant |
| :---- | :---- | :---- |
| **Latence injectée** | `time.sleep(random.uniform(0.5, 2))` injecté dans l'endpoint `/predict` | Alerte `HighLatencyP95` \+ p99 explose |
| **Erreur non gérée** | Forcer `raise RuntimeError("oops")` 1 fois sur 10 | Alerte `HighErrorRate` \+ spike de logs ERROR |
| **Drift simulé** | Modifier le modèle pour qu'il prédise 95 % de "spam" | Distribution des prédictions déséquilibrée — alerte `PredictionDistributionShift` |

Les apprenants ont 30 min par incident pour : diagnostiquer (logs \+ dashboards), proposer une mitigation, restaurer le service.

Le formateur révèle ensuite la cause et anime la discussion : "qu'est-ce qui aurait pu rendre la détection plus rapide ?".

---

## Module 8 — Observability ML & monitoring modèle (1h, J1 après-midi)

### Pourquoi un pipeline ML est différent

Une application web "classique" peut tomber pour des raisons d'infra ou de code. Un pipeline ML peut aussi tomber pour des raisons **silencieuses** :

- les **données** d'entrée ont changé (nouveau format, nouvelle distribution)  
- la **réalité** a changé mais le modèle, lui, n'a pas été ré-entraîné  
- le modèle a été redéployé avec une régression que personne n'a testée  
- les performances sont médiocres pour un sous-groupe seulement

C'est ce qu'on appelle le **drift**, et c'est l'angle mort du monitoring HTTP.

### Trois types de drift

| Type | Définition | Exemple MailGuard |
| :---- | :---- | :---- |
| **Data drift** | La distribution des **inputs** change | Les emails de 2026 contiennent plus d'emojis qu'en 2025 |
| **Concept drift** | La relation **input → output** change | Les spams se déguisent désormais en mails RH — la même feature n'a plus le même sens |
| **Prediction drift** | La distribution des **sorties** change | Le modèle prédit soudainement 90 % de "non-spam" |

Le **prediction drift** est souvent le plus facile à observer en production car il ne nécessite pas les labels réels (qu'on n'a généralement pas en temps réel).

### Méthodes de détection (côté pratique)

**Approche statistique sur une feature continue :**

- **PSI** (Population Stability Index) : `Σ (actual% - expected%) * ln(actual%/expected%)` — seuils empiriques 0.1 (léger), 0.25 (significatif)  
- **KS test** (Kolmogorov-Smirnov) : compare 2 distributions, donne une p-value  
- **Wasserstein distance** : "earth mover distance", interprétable comme un coût de transport

**Approche pour des embeddings (NLP, images) :**

- Distance moyenne entre embeddings d'aujourd'hui et embeddings de référence  
- Clustering : si la répartition entre clusters change → drift

**Fenêtres glissantes :**

- Référence : 30 jours glissants d'il y a 60-90 jours  
- Production : 24h ou 7 jours glissants  
- Évaluer 1× par heure ou 1× par jour selon le trafic

### Outils du marché — ML monitoring & experiment tracking

| Outil | Type | Forces | Faiblesses |
| :---- | :---- | :---- | :---- |
| **MLflow Tracking** | Open source, self-hostable | Tracking expériences, Model Registry, intégré au cycle ML, gratuit | Monitoring prod limité, dashboards basiques |
| **W\&B (Weights & Biases)** | SaaS (free tier limité) | UI excellente, collaboration, W\&B Tables pour drift, Artifacts | Coût à grande échelle, propriétaire |
| **Evidently AI** | Open source \+ SaaS | Spécialisé drift, rapports HTML/JSON, intégration Grafana | Pas un système central, à orchestrer |
| **Arize AI / Phoenix** | SaaS / open source | Très fort sur embeddings drift et RAG | Phoenix est jeune, communauté grandissante |
| **Neptune / Comet** | SaaS | Alternatives à W\&B | Mêmes contraintes propriétaires |

**Choix pédagogique** : pour la partie ML "classique" du brief, on exporte un score de drift comme **Gauge Prometheus** (intégration simple, pas de nouvel outil à apprendre). Pour la partie LLM, on utilise **Langfuse** (cf. Module 9).

### Pattern d'intégration drift → Prometheus

```py
from prometheus_client import Gauge
from scipy.stats import ks_2samp
import numpy as np

drift_gauge = Gauge(
    "ml_prediction_drift_ks_statistic",
    "KS statistic between current and reference prediction confidence",
    ["model_version"],
)

# Job périodique (cron ou tâche async, par exemple toutes les 5 min)
def compute_drift(reference: np.ndarray, current: np.ndarray, model_version: str):
    ks_stat, _ = ks_2samp(reference, current)
    drift_gauge.labels(model_version=model_version).set(ks_stat)
```

Côté alerting :

```
- alert: PredictionDriftHigh
  expr: ml_prediction_drift_ks_statistic > 0.2
  for: 30m
  labels:
    severity: warning
  annotations:
    summary: "Drift de prédiction détecté (KS > 0.2 pendant 30 min)"
```

### Démo guidée (15 min)

1. Charger un jeu de référence (1000 prédictions historiques) au démarrage  
2. Maintenir une fenêtre des 100 dernières prédictions (deque)  
3. Calculer le KS test toutes les minutes  
4. Pousser dans Prometheus  
5. Visualiser dans Grafana → tracer une ligne avec seuil 0.2

---

## Module 9 — Observability LLM & tracing d'agents (1h15, J1 après-midi)

### Pourquoi un LLM est encore plus difficile à monitorer

Un modèle ML classique est déterministe (input → même output). Un LLM ajoute :

- **Non-déterminisme** : même prompt → réponses différentes  
- **Hallucinations** : la réponse peut être confiante et fausse  
- **Coût variable par requête** : un long prompt \= \+ cher  
- **Latence très variable** : selon la longueur générée  
- **Prompts versionnés** : un changement de prompt \= un changement de produit  
- **Multi-turn** : un agent enchaîne plusieurs LLM calls \+ tool calls

Le monitoring infra ne capte rien de tout ça. Il faut de l'**observability LLM dédiée**.

### Les 3 axes du monitoring LLM

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│  TRACE          ┃         QUALITY                     │
│  qu'a fait      ┃         la réponse était-elle       │
│  l'agent ?      ┃         pertinente, factuelle ?     │
│  ━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                       │
│            COST & LATENCY                             │
│            tokens consommés, € dépensés, ms par étape │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Vocabulaire à poser

- **Trace** : une session utilisateur ou une requête de bout en bout  
- **Span** : une étape dans la trace (ex : "retrieval", "rerank", "llm\_call")  
- **Generation** : un span spécifiquement de type "appel à un LLM" (avec prompt, completion, tokens, modèle)  
- **Score** : une évaluation rattachée à une trace (ex : "user\_thumbs\_up=true", "factuality=0.8")  
- **Session** : groupement de traces appartenant au même utilisateur (utile pour le multi-turn)

### Coût et tokens

OpenAI facture au token. Pour un modèle donné, il faut tracker :

- `prompt_tokens` (entrée)  
- `completion_tokens` (sortie)  
- `total_tokens`  
- `model` (gpt-4o-mini ≠ gpt-4o ≠ o3-mini en prix)  
- Conversion en €

Tableau indicatif (à confirmer auprès des prix actuels au moment du cours) :

| Modèle | Input ($/M tokens) | Output ($/M tokens) | Cas d'usage |
| :---- | :---- | :---- | :---- |
| gpt-4o-mini | bas | bas | Tâches simples, volume élevé |
| gpt-4o | moyen | moyen | Cas généraux |
| Claude Haiku | bas | bas | Alternative économique |
| Claude Sonnet | moyen | moyen | Raisonnement, code |

Bonnes pratiques :

- Alerter sur **dépassement de budget jour** (ex : \> 50 €/jour pour MailGuard)  
- Alerter sur **coût/utilisateur anormal** (un utilisateur consomme 100× la médiane → boucle d'agent ou abus)  
- Tracker le **coût par feature produit** (`/explain` vs `/summarize`) pour décisions business

### Latence RAG — décomposition

Un endpoint RAG enchaîne typiquement :

```
1. Embedding de la question      (50-200 ms)
2. Recherche vectorielle         (10-100 ms)
3. Rerank optionnel              (50-500 ms)
4. Construction du prompt        (qq ms)
5. Appel LLM (TTFT puis stream)  (300 ms à plusieurs secondes)
6. Parsing / post-process        (qq ms)
```

Sans tracing par span, vous ne saurez **pas** dire où sont les 2 secondes de latence. Avec Langfuse (ou équivalent), chaque span est mesuré individuellement.

### Évaluation continue

- **User feedback** : thumbs up/down sur la réponse → score associé à la trace  
- **LLM-as-a-judge** : un LLM (souvent plus puissant) note la réponse selon critères (factuality, helpfulness, format)  
- **Datasets de régression** : jeu de questions de référence rejouées à chaque déploiement  
- **Comparaisons A/B** entre prompts / modèles

### Tour des outils

| Outil | Open source ? | Self-host ? | Cible | À retenir |
| :---- | :---- | :---- | :---- | :---- |
| **Langfuse** | ✅ | ✅ Docker / k8s | LLM general purpose, agents | **Choix du brief**. SDK Python/JS très simple, UI claire, prix raisonnable en cloud |
| **LangSmith** | ❌ propriétaire | ❌ SaaS | Écosystème LangChain / LangGraph | Le plus intégré si on est déjà en LangChain ; payant après free tier |
| **Phoenix (Arize)** | ✅ | ✅ | RAG, embeddings drift, OTEL-natif | Excellent pour analyser des embeddings, intégration OpenTelemetry native |
| **W\&B Weave** | ❌ propriétaire | ❌ SaaS | Équipes déjà sur W\&B (modèles classiques \+ LLM) | Cohérent si on unifie ML \+ LLM dans W\&B |
| **MLflow Tracking** | ✅ | ✅ | Unifier ML classique \+ LLM | Permet de garder un seul outil mais moins riche pour LLM |

**Critères de décision** :

- Open source obligatoire → **Langfuse** ou **Phoenix**  
- Déjà sur LangChain et budget OK → **LangSmith**  
- Déjà sur W\&B → **W\&B Weave**  
- Veut tout dans MLflow → **MLflow Tracking** (acceptable mais moins riche)  
- Focus RAG \+ analyse embeddings → **Phoenix**

### Démo guidée Langfuse (30 min)

**1\. Lancer Langfuse en self-host (Docker)**

```
langfuse-server:
  image: langfuse/langfuse:latest
  depends_on: [langfuse-db]
  environment:
    DATABASE_URL: postgresql://...
    NEXTAUTH_SECRET: mysecret
    SALT: mysalt
    NEXTAUTH_URL: http://localhost:3001
  ports: ["3001:3000"]
langfuse-db:
  image: postgres:15
  environment:
    POSTGRES_DB: postgres
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
```

Créer un projet → récupérer `LANGFUSE_PUBLIC_KEY` et `LANGFUSE_SECRET_KEY`.

**2\. Instrumenter un endpoint RAG**

```py
from langfuse import Langfuse
from langfuse.openai import openai   # remplace import openai standard

langfuse = Langfuse()  # lit les env vars

@app.post("/explain")
def explain(req: ExplainRequest):
    # Une trace = une requête utilisateur
    trace = langfuse.trace(
        name="explain-spam",
        user_id=req.user_id_hash,         # pseudonymisé
        metadata={"model_version": MODEL_VERSION},
    )

    # Span 1 — retrieval
    retrieval = trace.span(name="retrieval")
    docs = vector_store.similarity_search(req.email_summary, k=5)
    retrieval.end(output={"n_docs": len(docs)})

    # Span 2 — generation
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=build_prompt(req.email_summary, docs),
        trace_id=trace.id,                # rattache l'appel à la trace
        name="explain-generation",
    )

    trace.update(output=response.choices[0].message.content)
    return {"explanation": response.choices[0].message.content}
```

**3\. Voir le résultat dans Langfuse**

- Chaque trace est listée avec : durée totale, coût total, modèle, scores  
- Drill down : chaque span avec sa durée, ses inputs/outputs  
- Filtres : par modèle, par utilisateur, par score, par fenêtre temporelle

**4\. Ajouter du scoring**

- User feedback : `trace.score(name="user_feedback", value=1)` quand l'utilisateur clique 👍  
- LLM-as-judge : tâche async qui rejoue les traces et donne un score `factuality`

**5\. Alerting sur le coût**

- Pas d'alertmanager natif dans Langfuse côté open source  
- Pattern : exporter le coût quotidien (via l'API Langfuse) vers Prometheus → alerter via Alertmanager

```py
# Job toutes les 5 min
total_cost = langfuse_api.get_daily_cost(date.today())
llm_daily_cost_gauge.set(total_cost)
```

Puis règle Prometheus :

```
- alert: LLMDailyBudgetExceeded
  expr: llm_daily_cost_euros > 50
  for: 5m
  labels: { severity: warning }
```

### Atelier de fin de J1 (30 min)

Par groupe de 4 : "Vous êtes responsable observability d'une équipe qui édite un copilote interne basé sur GPT-4o, avec 200 utilisateurs internes et un budget de 1500 €/mois. Choisissez votre stack d'observability LLM et justifiez."

Critères attendus dans la restitution :

- Choix d'outil(s) et justification (open source vs SaaS, écosystème, coût)  
- Quelles métriques piloter ?  
- Quelles alertes définir ?  
- Comment intégrer avec la stack Prometheus/Grafana existante ?

---

## Annexe A — `docker-compose.yml` de référence (à remettre partiellement)

```
version: "3.9"
services:
  api:
    build: ./api
    ports: ["8000:8000"]
    environment:
      - LOG_LEVEL=INFO
      - LANGFUSE_PUBLIC_KEY=${LANGFUSE_PUBLIC_KEY}
      - LANGFUSE_SECRET_KEY=${LANGFUSE_SECRET_KEY}
      - LANGFUSE_HOST=http://langfuse-server:3000
      - OPENAI_API_KEY=${OPENAI_API_KEY}
  prometheus:
    image: prom/prometheus:v2.51.0
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules.yml:/etc/prometheus/rules.yml
    ports: ["9090:9090"]
  grafana:
    image: grafana/grafana:10.4.2
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
    ports: ["3000:3000"]
  alertmanager:
    image: prom/alertmanager:v0.27.0
    volumes:
      - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml
    ports: ["9093:9093"]
  langfuse-db:
    image: postgres:15
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes: ["langfuse-db:/var/lib/postgresql/data"]
  langfuse-server:
    image: langfuse/langfuse:latest
    depends_on: [langfuse-db]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@langfuse-db:5432/postgres
      NEXTAUTH_SECRET: changeme
      SALT: changemetoo
      NEXTAUTH_URL: http://localhost:3001
    ports: ["3001:3000"]
volumes:
  langfuse-db:
```

## Annexe B — Ressources à donner aux apprenants

**Application observability**

- Documentation Prometheus : [https://prometheus.io/docs/](https://prometheus.io/docs/)  
- Documentation Grafana : [https://grafana.com/docs/grafana/latest/](https://grafana.com/docs/grafana/latest/)  
- `prometheus-client` Python : [https://github.com/prometheus/client\_python](https://github.com/prometheus/client_python)  
- The RED Method (Grafana Labs blog)  
- Google SRE Book — chapitre "Monitoring Distributed Systems" : [https://sre.google/sre-book/monitoring-distributed-systems/](https://sre.google/sre-book/monitoring-distributed-systems/)

**ML monitoring & drift**

- Evidently AI documentation : [https://docs.evidentlyai.com/](https://docs.evidentlyai.com/)  
- MLflow Tracking : [https://mlflow.org/docs/latest/tracking.html](https://mlflow.org/docs/latest/tracking.html)  
- MLflow Model Registry : [https://mlflow.org/docs/latest/model-registry.html](https://mlflow.org/docs/latest/model-registry.html)  
- Weights & Biases : [https://docs.wandb.ai/](https://docs.wandb.ai/)  
- Phoenix (Arize) : [https://docs.arize.com/phoenix](https://docs.arize.com/phoenix)  
- Article PSI / KS / Wasserstein pour drift : [https://docs.evidentlyai.com/reference/data-drift-algorithm](https://docs.evidentlyai.com/reference/data-drift-algorithm)

**LLM observability**

- Langfuse documentation : [https://langfuse.com/docs](https://langfuse.com/docs)  
- Langfuse Python SDK : [https://langfuse.com/docs/sdk/python](https://langfuse.com/docs/sdk/python)  
- Langfuse self-hosting : [https://langfuse.com/docs/deployment/self-host](https://langfuse.com/docs/deployment/self-host)  
- LangSmith : [https://docs.smith.langchain.com/](https://docs.smith.langchain.com/)  
- Phoenix LLM tracing : [https://docs.arize.com/phoenix/tracing/llm-traces](https://docs.arize.com/phoenix/tracing/llm-traces)  
- W\&B Weave : [https://wandb.ai/site/weave](https://wandb.ai/site/weave)  
- OpenAI pricing : [https://openai.com/api/pricing/](https://openai.com/api/pricing/)  
- LLM-as-a-judge (Anthropic article) : [https://www.anthropic.com/research](https://www.anthropic.com/research)

## Annexe C — Tableau récapitulatif pour les apprenants : "que choisir ?"

| Cas d'usage | Outil recommandé | Justification |
| :---- | :---- | :---- |
| Métriques d'infra et d'app | **Prometheus \+ Grafana** | Standard du marché, open source |
| Logs centralisés (option) | Loki \+ Grafana, ELK | Bonne intégration Grafana ou écosystème ELK |
| Tracing distribué applicatif | OpenTelemetry \+ Tempo / Jaeger | Standard ouvert |
| Tracking d'expériences ML | **MLflow Tracking** ou W\&B | MLflow si open source / on-prem, W\&B si SaaS |
| Registry de modèles | MLflow Model Registry | Versioning \+ stages (Staging/Prod) |
| Détection de drift | Evidently AI \+ export Prometheus | Open source, plug & play |
| Drift sur embeddings | **Phoenix** | Vues UMAP, distance entre embeddings |
| Tracing LLM / agents | **Langfuse** ou LangSmith | Langfuse si open source, LangSmith si LangChain |
| Suivi coût tokens | Langfuse / LangSmith | Coût intégré nativement aux traces |
| Unifier ML classique \+ LLM | W\&B (Tables \+ Weave) ou MLflow \+ Langfuse | Selon préférence centralisation vs spécialisation |
