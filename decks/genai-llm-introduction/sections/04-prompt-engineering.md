---
layout: section-liquid
---

# Module 3

<div class="text-lg opacity-70 mt-4">1h30 · anatomie d'un prompt · patterns de prompting · stratégies Anthropic · économie des tokens</div>

## Prompt Engineering

*1h30 — 14h00 → 15h30*

---
hideInToc: true
layout: statement
---

# "Un prompt, c'est un cahier des charges."

Garbage in, garbage out — la précision fait tout.

Et un bon prompt, c'est aussi un prompt qui ne gaspille pas.

<!--
Hook du module 3.
Tout le monde a déjà eu une mauvaise réponse d'un LLM.
La plupart du temps, le problème vient du prompt, pas du modèle.
-->

---
hideInToc: true
layout: default
---

# Anatomie d'un bon prompt

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**Les 4 composantes**

<div class="space-y-3 text-sm">

<div class="p-3 rounded-lg border border-orange-500/40 bg-orange-500/5">
<strong class="text-orange-400">1. Rôle / Persona</strong><br>
"Tu es un expert en marketing digital avec 10 ans d'expérience."
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50">
<strong>2. Contexte</strong><br>
"Je dirige une startup B2B SaaS, budget marketing limité, cible PME françaises."
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50">
<strong>3. Tâche</strong><br>
"Propose 5 idées de contenu LinkedIn pour attirer des prospects."
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50">
<strong>4. Contraintes / Format</strong><br>
"Réponds en bullet points, max 3 lignes par idée, ton professionnel mais accessible."
</div>

</div>

</div>

<div>

**Sans structure vs Avec structure**

<div class="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm mb-3">

❌ *"Donne-moi des idées de contenu LinkedIn"*

→ Réponse générique, inutilisable sans contexte

</div>

<div class="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">

✅ *"Tu es expert marketing B2B. Je dirige une startup SaaS PME. Propose 5 idées LinkedIn en bullet points, max 3 lignes, ton pro."*

→ Réponse précise, directement actionnable

</div>

</div>

</div>

<!--
"Le modèle ne peut pas deviner ce que vous avez en tête — soyez explicite sur le format de sortie attendu."
La contrainte de format est souvent oubliée. Elle est pourtant cruciale pour l'utilisabilité de la réponse.
-->

---
hideInToc: true
layout: default
---

# Les patterns de prompting essentiels

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

### Zero-shot

Instruction directe, sans exemple.

```
"Traduis ce texte en espagnol :
[texte]"
```

Simple, rapide. Fonctionne bien
sur des tâches connues.

</div>

<div class="p-4 rounded-lg border border-orange-500/30 bg-orange-500/5">

### Few-shot

Donner des exemples dans le prompt.

```
"Catégorise ces emails :
'Offre spéciale' → Spam
'Réunion vendredi' → Pro
'Anniversaire demain' → [?]"
```

Idéal pour calibrer le format de sortie.

</div>

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

### Chain of Thought

"Pense étape par étape."

```
"Résous ce problème.
Montre ton raisonnement
pas à pas avant de
donner la réponse."
```

Peut doubler la qualité sur
les problèmes complexes.

</div>

</div>

<div class="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-400">

**Chain of thought** : force le modèle à "montrer son travail" avant de conclure → réduit les erreurs de raisonnement.

</div>

<!--
"'Pense étape par étape' peut doubler la qualité sur un problème complexe."
Few-shot est particulièrement utile pour calibrer le format de sortie : si vous montrez des exemples JSON, vous obtenez du JSON.
Chain of thought = technique découverte par Google en 2022, maintenant intégrée dans les modèles Reasoning.
-->

---
hideInToc: true
layout: default
---

# Les 4 stratégies Anthropic

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="p-4 rounded-lg border border-orange-500/40 bg-orange-500/5">

### ✍️ Write — Générer

Créer du contenu original à partir d'instructions.

*Email, article, code, résumé, traduction...*

```
"Écris une description produit pour..."
```

</div>

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

### 🔍 Select — Filtrer / Classer

Choisir parmi des options, router, classifier.

*Triage, catégorisation, sentiment, pertinence...*

```
"Parmi ces 10 emails, identifie
les urgents."
```

</div>

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

### 📦 Compress — Résumer / Extraire

Condenser, extraire l'essentiel d'un contenu.

*Résumé, extraction d'entités, synthèse...*

```
"Extrais les 5 points clés de
ce rapport de 50 pages."
```

</div>

<div class="p-4 rounded-lg border border-slate-700 bg-slate-800/50">

### 🔀 Isolate — Séparer

Décomposer un problème, séparer les préoccupations.

*Preprocessing, routing multi-étapes, RAG...*

```
"D'abord classe la demande,
puis génère la réponse adaptée."
```

</div>

</div>

<!--
Ces 4 stratégies viennent de la documentation Anthropic pour la construction d'applications.
Isolate est la plus avancée — c'est la base du RAG et des agents multi-étapes.
En combinant ces 4 stratégies, on peut construire des workflows complexes.
-->

---
hideInToc: true
layout: two-cols-header
---

# System prompt vs User prompt

::left::

### System prompt

La "notice d'instructions" invisible à l'utilisateur.

- Définit le rôle et la personnalité du modèle
- Fixe les règles et contraintes permanentes
- Fourni par le développeur ou l'application

```
System: "Tu es un assistant RH.
Tu réponds uniquement aux questions
liées aux ressources humaines.
Tu ne donnes pas de conseils médicaux."
```

::right::

### User prompt

Ce que l'utilisateur envoie à chaque tour.

- La question ou la tâche du moment
- Peut référencer des fichiers, des données
- Tout ce qu'on tape dans l'interface

```
User: "Quels sont les congés légaux
en France pour un salarié
en CDI ?"
```

<div class="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm">

Claude.ai, ChatGPT, Notion AI... utilisent tous un **system prompt** que vous ne voyez pas. C'est lui qui "personnalise" l'assistant.

</div>

<!--
"Le system prompt, c'est ce qui transforme un LLM générique en assistant spécialisé."
Quand vous utilisez Claude.ai, le system prompt inclut des instructions sur la sécurité et le comportement.
C'est l'outil de base pour construire des applications IA.
-->

---
hideInToc: true
layout: default
class: text-center
---

# Exercice pratique — 15 min

<div class="mt-6 p-6 rounded-xl border-2 border-orange-500/40 bg-orange-500/5 max-w-2xl mx-auto text-left">

**Réécrivez ce mauvais prompt :**

<div class="p-3 rounded-lg bg-red-500/10 border border-red-500/30 my-3">

❌ *"Aide-moi avec mon email"*

</div>

**Appliquez :**

1. Un rôle / persona approprié
2. Le contexte nécessaire
3. La tâche précise
4. Les contraintes de format
5. Bonus : ajoutez un pattern (few-shot ou chain of thought)

</div>

<div class="mt-4 text-slate-400 text-sm">
  Partagez votre version avec le groupe · Comparez les résultats
</div>

<!--
Exercice autonome ou en binôme.
Chaque participant choisit un cas d'usage de son métier.
Comparer en groupe : quelles contraintes de format ont été ajoutées ?
-->

---
hideInToc: true
layout: default
---

# Économie des tokens — L'essentiel

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Input vs Output**

| Type | Coût relatif |
|------|-------------|
| Input (ce que vous envoyez) | 1x |
| Output (ce que le modèle génère) | **3-5x plus cher** |

**Implication** : être précis dans son prompt réduit les allers-retours → moins de tokens consommés.

*"Réponds en 3 points maximum"* = plus lisible **et** moins coûteux.

</div>

<div>

**La règle des 30 secondes**

> Si une tâche prend moins de 30 secondes manuellement, évaluer si l'IA est vraiment utile.

| À éviter | Préférer |
|----------|---------|
| Formater du JSON simple | `jq` / Prettier |
| Renommer une variable | Refactoring IDE |
| Chercher une syntaxe basique | Documentation |

</div>

</div>

<div class="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm">

**Un bon prompt = une bonne réponse du premier coup = la meilleure façon d'économiser des tokens.**

</div>

<!--
"Output coûte plus cher : 'Réponds en 3 points maximum' est à la fois plus lisible ET moins coûteux."
Le prompt caching (technique avancée) peut réduire les coûts de 70% sur un contexte répété.
-->

---
hideInToc: true
layout: default
---

# Choisir le bon modèle selon la tâche

<div class="space-y-3 mt-4 text-sm">

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50 flex items-center gap-4">
  <div class="text-xl">🪶</div>
  <div class="flex-1">
    <strong>Tâche simple</strong> — autocomplétion, renommage, formatage
    <div class="text-slate-400">SLM local (Qwen 7B) ou Claude Haiku / Gemini Flash</div>
  </div>
  <div class="text-green-400 font-bold">Gratuit → $0.001</div>
</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50 flex items-center gap-4">
  <div class="text-xl">⚡</div>
  <div class="flex-1">
    <strong>Usage quotidien</strong> — emails, résumés, code standard, Q&A
    <div class="text-slate-400">Claude Sonnet / GPT-4o mini / Gemini Flash</div>
  </div>
  <div class="text-blue-400 font-bold">$$</div>
</div>

<div class="p-3 rounded-lg border border-orange-500/30 bg-orange-500/5 flex items-center gap-4">
  <div class="text-xl">🏆</div>
  <div class="flex-1">
    <strong>Tâche complexe</strong> — architecture, raisonnement, debugging difficile
    <div class="text-slate-400">Claude Opus / GPT-5 / Gemini Pro — en dernier recours</div>
  </div>
  <div class="text-orange-400 font-bold">$$$</div>
</div>

</div>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm text-center">

<div class="p-3 rounded-lg bg-slate-800 border border-slate-700">

**Side project** (10h/mois)
~$20-50/mois

</div>

<div class="p-3 rounded-lg bg-slate-800 border border-slate-700">

**Usage régulier** (40h/mois)
~$100-200/mois

</div>

<div class="p-3 rounded-lg bg-slate-800 border border-slate-700">

**Intensif** (full-time)
~$200-400/mois

</div>

</div>

<!--
"Commencer par le modèle le plus léger, escalader si nécessaire."
Haiku / Flash coûtent 20-50x moins cher qu'Opus pour des tâches similaires.
Budget : très variable selon l'usage. Ces chiffres sont des ordres de grandeur.
-->
