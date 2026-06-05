---
layout: statement
---

# Que vient-il de se passer ?

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

---
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
layout: default
---

### Rappel : qu'est-ce qu'un coding agent ?

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Boucle ReAct + tools

```mermaid {scale: 0.7}
graph LR
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
layout: two-cols-header
---

### Objectifs & Prérequis

::left::

#### Objectifs

À l'issue de cette session vous saurez :

- **Diagnostiquer** les 4 types d'échec de contexte et structurer un `CLAUDE.md` hiérarchique
- **Choisir** entre Skills, Commands et Subagents pour votre équipe
- **Configurer** des Hooks pour transformer l'agent en *teammate*
- **Connecter** vos agents via MCP et orchestrer des workflows multi-agents
- **Adopter** un workflow spec-driven et auditer votre *verification infrastructure*

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
