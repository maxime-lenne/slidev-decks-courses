---
layout: section-liquid
---

## Module 5

<div class="text-lg opacity-70 mt-4">30 min · takeaways · ressources · quiz d'orientation · les 3 formations · prochaine étape</div>

## Orientations & Formations

*30 min — 16h45 → 17h15*

---
layout: default
---

<h3 class="text-3xl mb-4">Les 3 choses à retenir</h3>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

<div class="text-3xl mb-2">🔮</div>

#### Le LLM prédit, il ne pense pas

Chaque réponse est une suite de **prédictions probabilistes**, token par token. Comprendre ça explique pourquoi la température, la fenêtre de contexte et le prompt changent tout.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

<div class="text-3xl mb-2">🧱</div>

#### Un prompt structuré change tout

**Rôle, contexte, tâche, format** : les 4 composantes d'un bon prompt. Combinées aux 4 stratégies Anthropic (Write / Select / Compress / Isolate), elles transforment une réponse générique en résultat actionnable.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

<div class="text-3xl mb-2">🔌</div>

#### RAG, Agents, MCP ouvrent le LLM au monde

Seul, un LLM est limité à sa connaissance figée. **RAG** lui donne de la mémoire, les **agents** lui donnent des actions, **MCP** lui donne des intégrations universelles.

</div>

</div>

<div class="mt-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center text-sm">

**C'est le socle commun à toutes les formations.** La suite dépend de votre profil et de vos objectifs.

</div>

<!--
- 3 cartes = 3 messages clés à mémoriser, un par grand bloc de la journée (tokens/inférence, prompting, RAG-agents-MCP)
- Si on retient une seule chose : un LLM prédit, il ne raisonne pas comme un humain
- Ce socle commun leur donne un avantage sur 90% des gens qui utilisent l'IA sans comprendre comment ça marche
-->

---
layout: default
---

### Ressources pour aller plus loin

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Comprendre les fondamentaux

- 🔢 [Tokenizer OpenAI](https://platform.openai.com/tokenizer) — visualiser la tokenisation en direct
- 🧮 [Embedding Projector](https://projector.tensorflow.org) — explorer des embeddings en 3D
- 📖 [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — le paper fondateur du Transformer (2017)
- 🎥 [3Blue1Brown — Neural Networks](https://www.3blue1brown.com/topics/neural-networks) — visualiser le fonctionnement d'un LLM

#### Prompting

- 📘 [Anthropic — Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- 📗 [OpenAI — Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- 🧪 [Anthropic — Prompt Library](https://docs.anthropic.com/claude/prompt-library)

</div>

<div>

#### Documentation officielle

- [docs.anthropic.com](https://docs.anthropic.com) — Claude, API, prompting
- [platform.openai.com/docs](https://platform.openai.com/docs) — GPT, API
- [ai.google.dev](https://ai.google.dev) — Gemini
- [modelcontextprotocol.io](https://modelcontextprotocol.io) — standard MCP

#### Aller vers RAG & Agents

- 🦜 [LangChain — Concepts](https://python.langchain.com/docs/concepts) — introduction RAG/agents
- 🗂️ [LlamaIndex — RAG concepts](https://docs.llamaindex.ai)
- 🔀 [ReAct paper](https://arxiv.org/abs/2210.03629) — Reasoning + Acting (2022), base des agents modernes

</div>

</div>

<!--
- Ces ressources sont volontairement centrées "fondamentaux" (tokens, embeddings, prompting, RAG/agents) — pas les formations elles-mêmes, qui sont traitées sur le slide suivant
- Le tokenizer OpenAI est le même outil que la démo live du module 2 — le partager ici permet aux participants d'y revenir seuls
- Pour ceux qui veulent creuser un seul lien : le guide de prompt engineering Anthropic
-->

---
layout: default
class: text-center
---

### Quiz d'orientation — Votre profil

<div class="grid grid-cols-2 gap-4 mt-6 text-left text-sm max-w-2xl mx-auto">

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

**Mon objectif principal :**

- Utiliser l'IA dans mon métier quotidien
- Créer des chatbots et workflows no-code
- Automatiser des tâches sans coder

→ **Formation Métiers**

</div>

<div class="p-4 rounded-lg border border-orange-500/30 bg-orange-500/5">

**Mon objectif principal :**

- Construire des apps IA avec du code
- Maîtriser Cursor / Claude Code
- Passer du vibe coding à l'agentic coding

→ **Formation AI Builders**

</div>

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50 col-span-2">

**Mon objectif principal :**

- Créer des RAG et agents custom depuis zéro
- Utiliser les APIs LLM directement
- Concevoir des architectures IA de production

→ **Formation AI Engineers**

</div>

</div>

<!--
Si vous avez un quiz interactif (Kahoot, Wooclap...), c'est le bon moment.
Sinon, demander aux participants de lever la main ou d'écrire leur trajectoire dans le chat.
-->

---
layout: default
---

### Les 3 formations

| | Formation Métiers | Formation AI Builders | Formation AI Engineers |
|---|---|---|---|
| **Pour qui** | Non-devs, usage quotidien | Dev, vibe→agentic | Ingénieurs, architecture IA |
| **Prérequis** | Ce module + socle tech | Ce module + bases dev | Ce module + dev confirmé |
| **Contenu clef** | Prompting avancé, RAG no-code, agents no-code, Make/Zapier | Claude Code, Cursor, agentic patterns, CI/CD IA | LangChain, embeddings, fine-tuning, agents from scratch |
| **Outils** | Claude.ai, Notion AI, Make.com, Bolt | Cursor, Claude Code, Git | Python, LangChain, pgvector, API |
| **Débouchés** | Power user IA, Chef de projet IA | AI Builder, Dev fullstack IA | AI Engineer, MLOps |

<div class="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400">

**Ces formations ne sont pas exclusives** — beaucoup d'AI Engineers ont commencé en Métiers. Il n'y a pas de mauvaise trajectoire, il y a celle qui correspond à vos objectifs aujourd'hui.

</div>

<!--
"Il n'y a pas de mauvaise trajectoire — il y a celle qui correspond à vos objectifs aujourd'hui."
Les formations sont conçues pour être complémentaires et progressives.
-->

---
layout: default
---

### Votre prochaine étape

<div class="grid grid-cols-3 gap-4 mt-6 text-sm text-center">

<div class="p-5 rounded-xl border-2 border-slate-700 bg-slate-800/50">

**Métiers**

Commencez par créer un compte Claude.ai et tester les 4 stratégies (Write / Select / Compress / Isolate) sur vos cas métier.

<div class="mt-3 p-2 rounded bg-slate-700 text-xs font-mono">
  claude.ai
</div>

</div>

<div class="p-5 rounded-xl border-2 border-orange-500/40 bg-orange-500/5">

**AI Builders**

Installez Cursor ou Claude Code. Prenez un projet personnel et testez l'agentic coding sur une vraie feature.

<div class="mt-3 p-2 rounded bg-orange-500/20 text-xs font-mono">
  cursor.com · claude.ai/code
</div>

</div>

<div class="p-5 rounded-xl border-2 border-slate-700 bg-slate-800/50">

**AI Engineers**

Clonez un projet LangChain ou LlamaIndex, construisez votre premier RAG sur un document PDF.

<div class="mt-3 p-2 rounded bg-slate-700 text-xs font-mono">
  python-langchain.com
</div>

</div>

</div>

<!--
Donner une action concrète et atteignable d'ici 48h.
Le plus important : passer à la pratique immédiatement.
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="genai-llm-introduction" />

<!--
Q&A final — 45 minutes.
Questions anticipées :
- "ChatGPT et Claude c'est pareil ?" → Même architecture (Transformer), philosophies différentes.
- "L'IA va remplacer mon métier ?" → Augmentation, pas remplacement. Les profils qui savent déléguer à l'IA seront les plus recherchés.
- "Vibe coding ou agentic coding ?" → Pattern hybride : vibe pour valider, agentic pour scaler.
- "Quel modèle utiliser ?" → Modèle minimal viable : Sonnet couvre 90% des cas.
-->
