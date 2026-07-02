---
layout: section-liquid
---

# Module 9
## Observability LLM & tracing d'agents

<div class="text-sm opacity-60 mt-4">1h15 · J1 après-midi · Langfuse, traces, coûts, scores</div>

---
layout: default
---

## Pourquoi un LLM est encore plus difficile

<div class="text-sm opacity-85 mt-6 space-y-2">

- 🎲 **Non-déterminisme** : même prompt → réponses différentes
- 🌀 **Hallucinations** : la réponse peut être **confiante et fausse**
- 💸 **Coût variable par requête** : un long prompt = + cher
- ⏱️ **Latence très variable** : selon la longueur générée
- 📝 **Prompts versionnés** : un changement de prompt = un changement de produit
- 🔗 **Multi-turn** : un agent enchaîne LLM calls + tool calls

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">Le monitoring infra ne capte rien de tout ça.</div>

---
layout: default
---

## 3 axes du monitoring LLM

<div class="grid grid-cols-2 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="font-bold mb-2 text-[#457b9d]">TRACE</div>
<p class="opacity-85">Qu'a fait l'agent ?<br/>Spans, parcours, tool calls.</p>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="font-bold mb-2 text-[#10b981]">QUALITY</div>
<p class="opacity-85">La réponse était-elle pertinente, factuelle ?<br/>Scores, feedback, eval.</p>
</div>

</div>

<div class="border-l-4 border-[#e63946] pl-4 mt-4 text-sm">
<div class="font-bold mb-2 text-[#e63946]">COST & LATENCY</div>
<p class="opacity-85">Tokens consommés, € dépensés, ms par étape.</p>
</div>

---
layout: default
---

## Vocabulaire à poser

<div class="text-sm leading-tight">

| Terme | Définition |
|-------|------------|
| **Trace** | Une session utilisateur ou une requête de bout en bout |
| **Span** | Une étape dans la trace (retrieval, rerank, llm_call...) |
| **Generation** | Un span spécifiquement de type "appel LLM" (prompt, completion, tokens, model) |
| **Score** | Une évaluation rattachée à une trace (`user_thumbs_up=true`, `factuality=0.8`) |
| **Session** | Groupement de traces du même utilisateur (multi-turn) |

</div>

---
layout: default
---

## Coût LLM — ce qu'il faut tracker

<div class="text-sm opacity-85 mt-4">

OpenAI/Anthropic facturent **au token**. Pour un modèle donné :

</div>

<div class="text-sm leading-tight mt-4">

| Champ | Pourquoi |
|-------|----------|
| `prompt_tokens` | Coût d'entrée |
| `completion_tokens` | Coût de sortie (souvent plus cher) |
| `total_tokens` | Reporting global |
| `model` | gpt-4o-mini ≠ gpt-4o ≠ o3-mini en prix |
| Conversion **€** | Reporting business |

</div>

<div class="text-xs opacity-60 mt-4">Bonnes pratiques : alerter sur <strong>budget jour dépassé</strong> + <strong>coût/utilisateur anormal</strong> (boucle d'agent ou abus).</div>

---
layout: default
---

## Tarifs indicatifs ($/M tokens)

<div class="text-sm leading-tight mt-4">

| Modèle | Input | Output | Cas d'usage |
|--------|-------|--------|-------------|
| gpt-4o-mini | bas | bas | Tâches simples, volume élevé |
| gpt-4o | moyen | moyen | Cas généraux |
| Claude Haiku | bas | bas | Alternative économique |
| Claude Sonnet | moyen | moyen | Raisonnement, code |
| Claude Opus | élevé | très élevé | Tâches complexes |

</div>

<div class="text-xs opacity-60 mt-4">À confirmer avec les prix officiels au moment du cours. Un agent multi-tool peut consommer <strong>50× plus</strong> que prévu si la boucle s'emballe.</div>

---
layout: default
---

## Décomposition latence RAG

<div class="text-sm leading-tight mt-4">

| Étape | Latence typique |
|-------|----------------|
| 1. Embedding de la question | 50-200 ms |
| 2. Recherche vectorielle | 10-100 ms |
| 3. Rerank optionnel | 50-500 ms |
| 4. Construction du prompt | qq ms |
| 5. **Appel LLM** (TTFT + stream) | **300 ms à plusieurs secondes** |
| 6. Parsing / post-process | qq ms |

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#e63946] font-bold">

Sans tracing par span, vous ne saurez <strong>pas</strong> dire où sont les 2 secondes de latence.

</div>

---
layout: default
---

## Évaluation continue

<div class="text-sm opacity-85 mt-6">

- 👍 **User feedback** : thumbs up/down sur la réponse → score associé à la trace
- 🤖 **LLM-as-a-judge** : un LLM (souvent + puissant) note la réponse selon critères (factuality, helpfulness, format)
- 🔄 **Datasets de régression** : jeu de questions de référence rejouées à chaque déploiement
- 🆎 **A/B testing** entre prompts / modèles

</div>

<div class="text-xs opacity-60 mt-6">L'évaluation continue n'est <strong>pas</strong> un nice-to-have — c'est la seule façon de détecter une régression silencieuse après changement de prompt.</div>

---
layout: default
---

## Tour des outils

<div class="text-sm leading-tight">

| Outil | OSS ? | Self-host ? | Cible |
|-------|-------|-------------|-------|
| **Langfuse** ⭐ | ✅ | ✅ Docker/k8s | LLM general purpose, agents |
| **LangSmith** | ❌ | ❌ SaaS | Écosystème LangChain/LangGraph |
| **Phoenix (Arize)** | ✅ | ✅ | RAG, embeddings drift, OTel-natif |
| **W&B Weave** | ❌ | ❌ SaaS | Équipes déjà sur W&B |
| **MLflow Tracking** | ✅ | ✅ | Unifier ML classique + LLM |

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">Choix de la formation : <strong>Langfuse</strong> (OSS + self-host + SDK simple)</div>

---
layout: default
---

## Critères de décision rapide

<div class="text-sm opacity-85 mt-4 space-y-2">

- 🆓 OSS obligatoire → **Langfuse** ou **Phoenix**
- ⛓️ Déjà sur LangChain + budget OK → **LangSmith**
- 📈 Déjà sur W&B → **W&B Weave**
- 🧪 Veut tout dans MLflow → **MLflow Tracking** (acceptable, moins riche)
- 🔍 Focus RAG + embeddings → **Phoenix**

</div>

---
layout: default
---

## Démo · docker-compose Langfuse (1/4)

```yaml {all|1-9|10-14|all}
langfuse-server:
  image: langfuse/langfuse:latest
  depends_on: [langfuse-db]
  environment:
    DATABASE_URL: postgresql://postgres:postgres@langfuse-db:5432/postgres
    NEXTAUTH_SECRET: changeme
    SALT: changemetoo
    NEXTAUTH_URL: http://localhost:3001
  ports: ["3001:3000"]
langfuse-db:
  image: postgres:15
  environment:
    POSTGRES_DB: postgres
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
```

<div class="text-xs opacity-60 mt-2">Créer un projet → récupérer <code>LANGFUSE_PUBLIC_KEY</code> et <code>LANGFUSE_SECRET_KEY</code>.</div>

---
layout: default
---

## Démo · instrumenter endpoint RAG (2/4)

```python {all|1-2|5-9|all}
from langfuse import Langfuse
from langfuse.openai import openai   # remplace openai standard

@app.post("/explain")
def explain(req: ExplainRequest):
    trace = langfuse.trace(
        name="explain-spam",
        user_id=req.user_id_hash,       # pseudonymisé
        metadata={"model_version": MODEL_VERSION},
    )
    # ... spans + génération
```

<div class="text-xs opacity-60 mt-2">Une trace = une requête utilisateur. Le wrapper <code>langfuse.openai</code> capture automatiquement les tokens.</div>

---
layout: default
---

## Démo · spans retrieval + generation (3/4)

```python {all|1-4|6-12|all}
retrieval = trace.span(name="retrieval")
docs = vector_store.similarity_search(req.email_summary, k=5)
retrieval.end(output={"n_docs": len(docs)})

response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=build_prompt(req.email_summary, docs),
    trace_id=trace.id,
    name="explain-generation",
)
trace.update(output=response.choices[0].message.content)
return {"explanation": response.choices[0].message.content}
```

---
layout: default
---

## Démo · scoring & export coût (4/4)

```python
# Feedback utilisateur
trace.score(name="user_feedback", value=1)  # 👍

# LLM-as-judge (async)
score = judge_llm(question, response)
trace.score(name="factuality", value=score)

# Export coût quotidien → Prometheus
total_cost = langfuse_api.get_daily_cost(date.today())
llm_daily_cost_gauge.set(total_cost)
```

```yaml
# Règle Prometheus
- alert: LLMDailyBudgetExceeded
  expr: llm_daily_cost_euros > 50
  for: 5m
  labels: { severity: warning }
```

---
layout: default
---

## Langfuse UI — ce qu'on voit

<div class="text-sm opacity-85 mt-4 space-y-2">

- 📋 **Liste des traces** : durée totale, coût total, modèle, scores
- 🔍 **Drill-down** : chaque span avec durée, inputs/outputs
- 🎛️ **Filtres** : par modèle, par utilisateur, par score, par fenêtre temporelle
- 📊 **Vue Sessions** : multi-turn d'un même utilisateur
- 📝 **Prompt versioning** : changement de prompt = artefact tracké
- 🧪 **Datasets** : rejouer des questions à chaque déploiement

</div>

<div class="text-xs opacity-60 mt-6">Pas d'Alertmanager natif côté OSS → on exporte les agrégats vers Prometheus.</div>

---
layout: default
---

## Recap · checklist LLM observability

<div class="text-sm opacity-85 mt-6 space-y-2">

✅ Une **trace** par requête utilisateur (avec `user_id_hash`)<br/>
✅ Des **spans** pour chaque étape (retrieval, rerank, generation)<br/>
✅ Tokens **prompt + completion** trackés par span<br/>
✅ Au moins **1 score** : feedback utilisateur ou LLM-as-judge<br/>
✅ Export du **coût quotidien** vers Prometheus<br/>
✅ Alerte **budget dépassé** + **coût/utilisateur anormal**<br/>
✅ Prompts versionnés (en code ou dans Langfuse)

</div>

---
layout: center
---

## 🛠️ Atelier fin J1 · 30 min

<div class="text-xl mt-6 max-w-3xl mx-auto">
Par groupe de 4 :
</div>

<div class="text-sm mt-6 max-w-2xl mx-auto opacity-85">

Vous êtes responsable observability d'une équipe qui édite un **copilote interne basé sur GPT-4o**, 200 utilisateurs internes, budget **1500 €/mois**.

</div>

<div class="text-lg mt-6 text-[#457b9d] font-bold">Choisissez votre stack d'observability LLM et justifiez.</div>

<div class="text-xs mt-8 opacity-60">

À traiter : outil(s) + justification (OSS/SaaS, écosystème, coût) · métriques à piloter · alertes à définir · intégration avec stack Prom/Grafana existante.

</div>
