---
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
src: ../../templates/slides.md#1
---

---
layout: toc
---

<Toc :max-depth="2" />

---
layout: section-liquid
---

## Contexte et introduction

---
layout: section
---

### Rappels

---
layout: default
---

### Rappel : Vocabulaire

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

### Demo
