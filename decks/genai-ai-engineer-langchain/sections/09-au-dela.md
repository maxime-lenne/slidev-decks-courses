---
layout: section-liquid
---

## Au-delà de LangChain

<div class="text-lg opacity-70 mt-4">5 min · LangGraph · LangSmith · Deep Agents · Frameworks alternatifs</div>

---
layout: two-cols-header
---

### LangGraph & LangSmith

::left::

### LangGraph — Runtime graphe

<v-clicks>

- Agents **stateful** avec persistance (`MemorySaver`, checkpoints)
- Exécution **graph-based** — cycles, branches, multi-agents
- **Human-in-the-loop** natif : inspecter et modifier l'état à tout moment
- Patterns multi-agents : hiérarchique, séquentiel, peer-to-peer
- Fait tourner `create_agent()` en arrière-plan

</v-clicks>

::right::

### LangSmith — Observabilité

<v-clicks>

- **Tracing** détaillé : chaque appel LLM, outil et étape intermédiaire
- Évaluation des trajectoires d'agents
- Suivi des coûts et latences
- **Polly** (fin 2025) : IA intégrée pour débugger vos agents
- LangGraph Platform : déploiement en production

</v-clicks>

<!--
LangGraph est devenu le runtime central depuis LangChain v1.0 (octobre 2025)
LangSmith est optionnel en dev mais indispensable en production
-->

---
layout: two-cols-header
---

### Deep Agents — La prochaine étape

::left::

Deep Agents = LangChain + LangGraph + 4 capacités supplémentaires (middleware composable ) :

- **Planification** (write_todos) : décomposer les tâches complexes en étapes
- **Filesystem** (read/write/edit) : décharger le contexte sur le disque
- **Sub-agents** (task) : spawner des agents spécialisés pour l'isolation
- **Mémoire persistante** cross-sessions via LangGraph Memory Store

::right::

```python {3-7|9-14|all}
from deepagents import create_deep_agent

agent = create_deep_agent(
    tools=[my_search_tool],
    system_prompt="Tu es un assistant de recherche.",
    subagents=[critique_agent, research_agent],
)

result = agent.invoke({
    "messages": [{
      "role": "user",
      "content": "Analyse le marché IoT en France"
    }]
})
```

<v-clicks>

- Inspiré de **Claude Code** et des systèmes de Deep Research
- CLI inclus : reprise de session, human-in-the-loop, sandboxes distants

</v-clicks>

<!--
Deep Agents = réponse open-source de LangChain à Claude Code
pip install deepagents — package standalone au-dessus de LangChain + LangGraph
-->

---
layout: end
---

### Exercice

<div class="flex flex-col items-center gap-4 pt-8">
  <a href="https://github.com/maxime-lenne/course-langchain-deep-agents" target="_blank" class="flex items-center gap-3 text-xl no-underline opacity-80 hover:opacity-100 transition-opacity">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
    <code>maxime-lenne/course-langchain-deep-agents</code>
  </a>
</div>

---
layout: two-cols-header
---

### Frameworks Alternatifs — Agents & Orchestration

::left::

**OpenAI Agents SDK** *(OpenAI, mars 2025)*

- Successeur de Swarm — 100+ LLMs via API compatible, tracing intégré

**Claude Agent SDK** *(Anthropic)*

- Primitives minimalistes (`Agent`, `Runner`, `Tool`) — accès direct au tool-calling Anthropic

**Google ADK** *(Google Cloud NEXT 2025)*

- Gemini-native, streaming audio/vidéo, connecteurs BigQuery/AlloyDB

::right::

**Semantic Kernel** + **AutoGen** → **Microsoft Agent Framework** *(Q1 2026)*

- Fusion des deux : C#/Python/Java, Azure-native, multi-agent conversationnel

**CrewAI**

- Agents avec **rôles** + **tasks** explicites, orchestration d'une "équipe"

<!--
OpenAI Agents SDK : 10K GitHub stars en quelques semaines (mars 2025)
Microsoft a fusionné AutoGen + Semantic Kernel → Microsoft Agent Framework (GA Q1 2026)
-->

---
layout: two-cols-header
---

### Frameworks Alternatifs — RAG, Données & Approches spécialisées

::left::

**LlamaIndex**

- Data-first : query engines, RAG avancé (HyDE, re-ranking, sub-question decomposition)

**Haystack** *(deepset)*

- Pipelines YAML déclaratifs, composants versionnés — fort sur search/QA documentaire

**Pydantic AI** *(équipe Pydantic)*

- Type-safe, IDE-friendly, schema validation stricte — production-grade multi-provider

::right::

**smolagents** *(Hugging Face)*

- Code-first : l'agent écrit et exécute du Python — minimal, edge, modèles open-source

**DSPy** *(Stanford)*

- Optimisation **programmatique** des prompts — pas de prompt engineering manuel, eval-driven

<!--
Pydantic AI : fiabilité maximum en production grâce aux types stricts
DSPy : approche radicalement différente — on optimise les prompts comme des hyperparamètres
smolagents : idéal avec des petits modèles open-source (Llama, Mistral, Qwen)
-->

---
layout: center
---

### Next Steps

<div class="grid grid-cols-2 gap-8 mt-6 text-sm">

<div>

#### Cette semaine

- 🛠️ Construire un vrai **projet RAG ou agent** (pas un toy example) : vos propres documents, vos propres outils
- 🔗 Refaire l'exercice `course-langchain-deep-agents` en l'adaptant à un cas d'usage réel
- 📐 Choisir 2-3 composants LCEL du deck (`Runnable*`, `create_agent`) et les réutiliser dans un chantier existant

</div>

<div>

#### Pour aller plus loin

- 🕸️ Passer à **LangGraph** dès que vous avez besoin de mémoire, de cycles ou de multi-agents
- 🔎 Brancher **LangSmith** pour tracer et débugger vos premières chaînes en production
- 📦 Explorer les decks compagnons : *GenAI et LLM - introduction*, *Protocole MCP en profondeur*

</div>

</div>

<!--
Next steps concrets, pas juste "allez lire la doc"
Le vrai apprentissage vient de la construction d'un projet réel, pas d'un nouveau tutoriel
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou
  deck-slug="genai-ai-engineer-langchain"
  :exercises="[
    'course-langchain-introduction',
    'course-langchain-runnable-chain',
    'course-langchain-rag',
    'course-langchain-agents',
    'course-langchain-deep-agents',
  ]"
/>
