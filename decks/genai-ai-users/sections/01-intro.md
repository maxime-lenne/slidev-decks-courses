---
layout: two-cols-header
---

### Objectifs & Prérequis

::left::

#### Objectifs

À l'issue de cette demi-journée vous saurez :

- **Choisir** le bon outil pour le bon besoin
- **Prompter** efficacement (sans coder)
- **Utiliser** Copilot dans M365 & ChatGPT
- **Interroger** vos documents en *no-code*
- **Créer** un agent no-code *(Copilot Studio)*
- **Adopter** les réflexes de *confidentialité*

::right::

#### Prérequis

- **Aucune** compétence en développement
- Utilisation courante d'un poste **bureautique** (M365 / Google Workspace) et d'un **navigateur**
- Un compte **ChatGPT** et/ou un accès **Microsoft Copilot** = un plus pour suivre en pratique

<div class="text-sm opacity-70 mt-3">

**Cible** : usagers métiers — marketing, communication, commerce, RH, ops…

</div>

<!--
- 6 objectifs alignés sur les 6 sections "must-have" du deck
- Public non technique : bannir le jargon dev, tout illustrer par des cas métier
- Slide pivot : on va savoir où on va, et pour qui
-->

---
layout: default
---

### Vous êtes ici : les <span class="text-[#1d3557]">AI Users</span>

<br>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3 bg-[#1d3557]/10 py-3 rounded">

#### 👥 AI Users

GenAI, chat, RAG no-code, vibe coding, agents prêts à l'emploi.

<div class="text-xs opacity-70 mt-2">**Cible** : usagers — n'écrivent pas de code.</div>
<div class="text-xs text-[#1d3557] font-bold mt-1">→ vous êtes ici</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-3 opacity-60">

#### 🛠️ AI Builders

**Coding agents** — Claude Code, Cursor, Copilot, plugins.

<div class="text-xs opacity-70 mt-2">**Cible** : devs qui codent **avec** des agents IA.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3 opacity-60">

#### 🧠 AI Engineers

Création de RAG, agents, fine-tuning, eval.

<div class="text-xs opacity-70 mt-2">**Cible** : devs qui **construisent** les agents IA.</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">
Trois formations différentes — aujourd'hui on parle de <strong>la première</strong>.
</div>

<!--
- Bien situer : ici on ne code PAS. On utilise des outils prêts à l'emploi.
- Le parcours : AI Users (aujourd'hui) → AI Builders (coder avec des agents) → AI Engineers (construire les agents)
- Rassurer la salle : "no-code" ne veut pas dire "sans valeur" — 80% de la valeur est atteignable sans une ligne de code
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
layout: default
---

### Rappel : GenAI, LLM & prompt — sans jargon

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Le vocabulaire minimum

**GenAI** — *IA générative* : produit du contenu (texte, image, tableau, code) à partir d'une demande en langage naturel.

**LLM** (*Large Language Model*) — le « moteur » derrière le chat : il **prédit la suite** d'un texte, mot après mot. GPT (OpenAI), Copilot (Microsoft), Gemini, Claude…

**Prompt** — votre **demande** au modèle. La qualité de la demande fait la qualité de la réponse.

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
- GenAI ≠ moteur de recherche, ≠ base de vérité : c'est un générateur de texte plausible
- Insister : "il prédit le mot suivant" → d'où les hallucinations (section gouvernance)
- Message clé : c'est un copilote, la relecture humaine reste indispensable
-->

---
src: ../../templates/slides.md#3
---

---
src: ../../templates/slides.md#4
---

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
