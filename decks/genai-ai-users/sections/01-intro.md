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

#### Ce que ça change pour vous

- ✍️ Rédiger plus vite (mails, posts, comptes-rendus)
- 📊 Synthétiser (réunions, rapports, docs longs)
- 💡 Idéer (brainstorm, angles, accroches)
- 🌍 Traduire & reformuler (ton, cible, format)
- 🔎 Interroger vos propres documents

<div class="text-xs opacity-70 mt-3">Un **copilote**, pas un pilote automatique : vous restez responsable du résultat.</div>

</div>

</div>

<!--
- GenAI ≠ moteur de recherche, ≠ base de vérité : c'est un générateur de texte plausible
- Insister : "il prédit le mot suivant" → d'où les hallucinations (section gouvernance)
- Message clé : c'est un copilote, la relecture humaine reste indispensable
-->

---
layout: default
---

### La règle d'or : ni magie, ni oracle

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Ce que l'IA n'est PAS

- ❌ Un moteur de recherche (elle **invente** parfois)
- ❌ Une source de vérité vérifiée
- ❌ À jour en temps réel (sauf outils connectés)
- ❌ Confidentielle par défaut *(voir gouvernance)*

<div class="text-xs opacity-70 mt-3">Elle produit du **plausible**, pas forcément du **vrai**.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Ce que l'IA EST

- ✅ Un assistant de rédaction & synthèse
- ✅ Un partenaire de brainstorming
- ✅ Un accélérateur sur les tâches répétitives
- ✅ Un traducteur / reformulateur instantané

<div class="text-xs opacity-70 mt-3">**Vous validez toujours** ce qui sort — surtout chiffres, noms, sources.</div>

</div>

</div>

<!--
- Poser cette diapo tôt : elle désamorce les deux extrêmes (peur & sur-confiance)
- Anecdote utile : une IA qui invente une jurisprudence / une source inexistante
- Ce cadre revient en fil rouge, notamment dans la section gouvernance
-->

---
layout: section
---

### Démo d'ouverture

---
layout: statement
---

### Que vient-il de se passer ?

<div class="text-3xl mt-6 opacity-90">Trois tâches métier en <span class="text-[#457b9d] font-bold">deux minutes</span>.</div>

<div class="text-base mt-8 opacity-70 max-w-3xl mx-auto">
Un <strong>document résumé</strong> · un <strong>mail rédigé</strong> au bon ton ·
un <strong>tableau</strong> extrait d'un PDF — le tout en langage naturel, sans une ligne de code.
</div>

<div class="text-sm opacity-50 mt-8">→ C'est <strong>ça</strong> qu'on va outiller pendant la demi-journée.</div>

<!--
- Faire la démo en LIVE de préférence : coller un vrai PDF dans ChatGPT + demander résumé + mail + tableau
- Laisser 20 secondes de silence, demander à la salle "qu'avez-vous vu se passer ?"
- Backup si pas de connexion : screencast dans assets/
-->
