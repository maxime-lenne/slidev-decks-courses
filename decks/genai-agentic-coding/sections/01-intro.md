---
hideInToc: true
layout: two-cols-header
---

### Objectifs & Prérequis

::left::

#### Objectifs

À l'issue de cette session vous saurez :

- **Structurer** le *contexte*
- **Choisir** entre *Skills, Commands et Hooks et Subagents*
- **Connecter** vos agents a des tools via MCP
- **Orchestrer** des workflows multi-agents
- **Adopter** la *verification loop*

::right::

#### Prérequis

- Pratique courante d'un coding agent (Claude Code, Cursor ou Copilot) sur au moins **un projet réel**
- Bases ligne de commande, **Git**, projet versionné
- Notions de **LLM** et de **tool calling** — couvertes dans le deck `genai-llm-introduction`

<div class="text-sm opacity-70 mt-3">

**Niveau** : devs expérimentés · formation interne entreprise

</div>

<!--
- 5 objectifs alignés sur les 5 sections "must-have" du deck
- Si le prérequis "pratique courante" n'est pas rempli, le débit sera trop rapide — adapter
- Slide pivot : on va savoir où on va, et qui doit suivre
-->

---
hideInToc: true
layout: default
---

### Vous êtes ici : les <span class="text-[#457b9d]">AI Builders</span>

<br>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3 opacity-60">

#### 👥 Métiers

GenAI, chat, RAG no-code, agents prêts à l'emploi.

<div class="text-xs opacity-70 mt-2">**Cible** : usagers — n'écrivent pas de code.</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-3 bg-[#457b9d]/10 py-3 rounded">

#### 🛠️ AI Builders

**Coding agents** — Claude Code, Cursor, Copilot, plugins.

<div class="text-xs opacity-70 mt-2">**Cible** : devs qui codent **avec** des agents IA.</div>
<div class="text-xs text-[#457b9d] font-bold mt-1">→ vous êtes ici</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3 opacity-60">

#### 🧠 AI Engineers

Création de RAG, agents, fine-tuning, eval.

<div class="text-xs opacity-70 mt-2">**Cible** : devs qui **construisent** les agents IA.</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">
Trois formations différentes — aujourd'hui on parle de <strong>celui du milieu</strong>.
</div>

<!--
- Important de bien situer : on ne forme pas à créer des LLMs ou des agents — on forme à les utiliser pour coder
- Le glissement de carrière typique : ingé full-stack → AI Builder → AI Engineer (mais pas obligé)
- Cette session ne couvre pas LangChain, LangGraph, fine-tuning, eval — c'est dans le deck AI Engineer
-->

---
src: ../../templates/slides.md#1
---

---
hideInToc: true
layout: default
---

<div class="toc-page">

### Table of Contents

<Toc :max-depth="2" />

</div>

---
layout: section
---

## Rappels

---
layout: default
---

### Rappel : GenAI, LLM & Prompt Engineering

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Vocabulaire de base

**GenAI** — IA générative : produit du contenu (texte, code, image) par complétion statistique, entraînée sur des milliards de tokens.

**LLM** (*Large Language Model*) — prédit le token suivant. Claude, GPT-4, Gemini, Llama…

**Prompt** — l'instruction envoyée au modèle. La qualité du prompt détermine la qualité de la réponse.

</div>

<div>

#### Template de base d'un prompt

<div class="font-mono text-xs bg-[#1d3557]/10 rounded p-3 mt-1 space-y-1 leading-relaxed">

<div>🎭 <strong>Rôle</strong> &nbsp;&nbsp;&nbsp;&nbsp;→ "Tu es un expert en..."</div>
<div>📋 <strong>Contexte</strong> → "Dans ce projet..."</div>
<div>🎯 <strong>Tâche</strong> &nbsp;&nbsp;&nbsp;→ "Génère / Analyse / Corrige..."</div>
<div>📐 <strong>Format</strong> &nbsp;&nbsp;→ "En bullet points, max 5"</div>
<div>💡 <strong>Exemple</strong> &nbsp;→ "Par exemple : ..."</div>

</div>

<div class="text-xs opacity-70 mt-3"><strong>Prompt Engineering</strong> = structurer ces éléments pour maximiser la pertinence de la réponse.</div>

</div>

</div>

<!--
- GenAI ≠ AGI — rester factuel sur ce que c'est vraiment
- LLM = completion engine : il prédit le prochain token, l'intelligence émerge à l'échelle
- Les 5 éléments du template sont universels (Claude, GPT, Gemini...)
- Pour les détails : deck genai-llm-introduction
-->

---
layout: default
---

### Rappel : qu'est-ce qu'un agent ?

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Boucle ReAct + tools

```mermaid {scale: 0.6}
graph TB
    P[Prompt utilisateur] --> T[Pensée<br/>Reasoning]
    T --> A[Action<br/>Tool call]
    A --> O[Observation<br/>Tool result]
    O --> T
    T --> R[Réponse<br/>finale]
```

<div class="text-xs opacity-70 mt-2">L'agent <strong>raisonne</strong>, <strong>agit</strong> (lit/écrit/exécute), <strong>observe</strong>, recommence — jusqu'à finir la tâche.</div>

</div>

<div>

#### Les *tools* d'un coding agent

- 📖 **Read** — lire un fichier
- ✏️ **Edit / Write** — modifier
- 🔍 **Grep / Glob** — chercher
- 🖥️ **Bash** — exécuter une commande
- 🌐 **WebFetch** — lire une URL
- 🔌 **MCP** — appeler un service externe
- 🤖 **Task** — déléguer à un subagent

<div class="text-xs opacity-70 mt-3">Plus on a de bons tools, plus on peut déléguer.</div>

</div>

</div>

<!--
- Tout coding agent moderne suit ce pattern : Claude Code, Cursor Agent, Copilot Workspace, Devin, Aider
- Le tool calling (function calling) est le mécanisme bas-niveau — déjà couvert dans le deck genai-llm-introduction
- Renvoi : pour les bases LLM/tool calling, voir le deck `genai-llm-introduction`
-->

---
layout: default
---

### Rappel : c'est quoi MCP ?

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Sans MCP — l'agent dans sa bulle

L'agent ne peut pas :

- 🔍 Lire ton Jira / Linear
- 🔀 Créer une PR GitHub
- 🗄️ Interroger ta base de données
- 📊 Consulter Sentry / Grafana
- 🎨 Lire un fichier Figma

<div class="text-xs opacity-70 mt-3">Chaque intégration = code custom à maintenir. Problème N × M.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### MCP — Model Context Protocol

**Protocole ouvert** (Anthropic, 2024) — interface standardisée entre un LLM et ses outils externes.

- **1 interface** commune pour tous les services
- Architecture **host / client / server**
- Primitives : **tools**, **resources**, **prompts**
- N + M connecteurs au lieu de N × M

<div class="text-xs opacity-70 mt-3">= "USB-C pour les LLM" — un plug, tous les services.</div>

</div>

</div>

<!--
- L'analogie qu'on entend partout : "USB-C pour les LLM"
- Plus juste : MCP est un protocole stateful comme SMTP, IMAP, LSP — pas une API REST
- Pour le détail, renvoi explicite au deck genai-ai-engineer-mcp-deep-dive
-->

---
layout: center
---

### Besoin de revoir les bases ?

<div class="text-center mt-6">

<div class="text-base opacity-70 mb-6">GenAI · LLM · Tokenization · Embeddings · RAG · Tool calling</div>

<div class="text-[#457b9d] text-lg font-mono border border-[#457b9d]/40 px-8 py-4 rounded-lg inline-block">
  <a href="https://decks.maxime-lenne.fr/decks/genai-llm-introduction">decks.maxime-lenne.fr/decks/genai-llm-introduction</a>
</div>

<div class="text-sm opacity-60 mt-6">Deck pré-requis · ~45 min</div>

</div>

<!--
- Partager ce lien dans le chat Teams/Slack en début de session
- Ce deck couvre tout ce que cette formation suppose acquis
-->

---
layout: section
---

## Demo

---
layout: statement
---

### Que vient-il de se passer ?

<div class="text-3xl mt-6 opacity-90">Une <span class="text-[#457b9d] font-bold">cascade agentique</span> en 60 secondes.</div>

<div class="text-base mt-8 opacity-70 max-w-3xl mx-auto">
Une <strong>Skill</strong> qui s'auto-active · un <strong>Subagent</strong> qui part en arrière-plan ·
un <strong>serveur MCP</strong> qui répond · un <strong>Hook</strong> qui notifie ·
un diff propre à reviewer.
</div>

<div class="text-sm opacity-50 mt-8">→ C'est <strong>ça</strong> qu'on va décortiquer pendant 2h30.</div>

<!--
- Laisser 30 secondes de silence après cette slide — les gens digèrent
- Demander à la salle "qu'avez-vous vu se passer ?" — si 3+ choses citées, démo réussie
- Si on n'a pas pu faire la démo live : remplacer par le screencast assets/demo-fallback.mp4
-->
