---
layout: section-liquid
---

# Module 2

<div class="text-lg opacity-70 mt-4">1h30 · inférence · tokens · fenêtre de contexte · température · choix du modèle</div>

## LLM : Inférence, Tokens, Modèles & Multimodal

*1h30 — 10h45 → 12h15*

---
hideInToc: true
layout: statement
---

# "Un LLM ne 'pense' pas."

Il prédit le prochain token, encore et encore, des milliers de fois par seconde.

Comprendre ça change tout à la façon dont vous l'utilisez.

<!--
Hook du module 2.
C'est contre-intuitif : on a l'impression que le modèle "réfléchit".
En réalité, c'est une série de prédictions probabilistes.
-->

---
hideInToc: true
layout: default
---

# L'inférence — Comment un LLM génère du texte

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**Le processus, étape par étape**

```
Prompt : "La capitale de la France est"
         ↓
Token 1 : " Paris"     (prob: 98%)
Token 2 : "."          (prob: 87%)
→ Fin de séquence
```

<v-clicks>

1. Le modèle lit tout le contexte
2. Il calcule une distribution de probabilité sur tous les tokens possibles
3. Il en choisit un (selon la température)
4. Ce token est ajouté au contexte
5. Recommence depuis 1

</v-clicks>

</div>

<div>

<div class="p-4 rounded-lg bg-slate-800 border border-slate-700 text-sm mt-2">

**Autoregressive generation**

Chaque token dépend de tous les tokens précédents.

C'est pourquoi :

- Le modèle ne peut pas "revenir en arrière"
- La vitesse de génération = tokens/seconde
- Les réponses longues coûtent plus cher

</div>

<div class="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm mt-3">

**Démo live** : tokenizer.c (OpenAI) ou platform.openai.com/tokenizer

</div>

</div>

</div>

<!--
Démontrer avec le tokenizer en direct.
Taper "extraordinairement" et montrer comment c'est découpé en plusieurs tokens.
Taper du code et montrer que les tokens sont différents du langage naturel.
-->

---
hideInToc: true
layout: default
---

# Les tokens — L'unité de base des LLM

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**Qu'est-ce qu'un token ?**

- Unité de texte (sous-mot, mot, ou morceau de mot)
- 1 token ≈ **4 caractères** en moyenne (anglais)
- 1 token ≈ **3 caractères** en français (langues latines tokenisent moins bien)

**Exemples**

| Texte | Tokens |
|-------|--------|
| "chat" | 1 |
| "extraordinaire" | 3-4 |
| "Claude" | 1 |
| "tokenisation" | 3 |

</div>

<div>

**Pourquoi c'est important ?**

<v-clicks>

- Les **prix** sont facturés en tokens (input + output)
- La **fenêtre de contexte** est mesurée en tokens
- Les **temps de réponse** dépendent du nombre de tokens générés
- **1000 tokens ≈ 750 mots** (anglais)

</v-clicks>

<div class="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm">

Un token n'est pas un mot — *"bonjour"* = 1 token, *"extraordinairement"* peut en valoir 4.

</div>

</div>

</div>

<!--
"Un token n'est pas un mot — c'est une unité statistique."
Important pour comprendre les coûts et les limites de contexte.
Le français, l'arabe, le chinois tokenisent moins bien que l'anglais → coûts plus élevés.
-->

---
hideInToc: true
layout: default
---

# La fenêtre de contexte

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**Définition**

Tout ce que le modèle "voit" à un instant donné : le système prompt + l'historique de conversation + votre message.

**Le modèle n'a pas de mémoire entre sessions.** Chaque conversation repart de zéro.

**Tailles actuelles**

| Modèle | Fenêtre |
|--------|---------|
| GPT-4o | 128K tokens |
| Claude Sonnet 4.6 | 1M tokens |
| Gemini 3.1 Pro | 1M tokens |

</div>

<div>

**Impact pratique**

<v-clicks>

- Une conversation longue peut "oublier" le début si elle dépasse la fenêtre
- RAG (module 4) permet d'injecter des documents dans le contexte
- 1M tokens ≈ 700 000 mots ≈ 7 romans de 100 pages

</v-clicks>

<div class="mt-6 p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm">

```
[ System prompt ] + [ Messages ] + [ Votre message ]
      ↑                  ↑               ↑
   Toujours           Historique     Ce que vous
   présent           de la conv.     tapez maintenant
   ──────────────────────────────────────────────
                = Fenêtre de contexte
```

</div>

</div>

</div>

<!--
"Ce qui n'est pas dans le contexte n'existe pas pour le modèle."
La fenêtre de 1M tokens de Claude = révolution pour les usages sur de gros documents.
Un fichier PDF de 300 pages ≈ 150 000 tokens — rentrerait dans une fenêtre de 1M.
-->

---
hideInToc: true
layout: two-cols-header
---

# La température — Strict vs Créatif

::left::

### `temperature = 0`

Déterministe et reproductible

```
Prompt : "La capitale de la France ?"
→ "Paris." (toujours)
```

**Quand l'utiliser ?**

- Extraction de données
- Classification
- Questions factuelles
- Résumés structurés

::right::

### `temperature = 0.7 → 1`

Varié et créatif

```
Prompt : "Donne-moi une idée de startup"
→ Réponse différente à chaque fois
```

**Quand l'utiliser ?**

- Brainstorming
- Génération de contenu créatif
- Variations de style
- Exploration d'idées

<!--
La plupart des interfaces (Claude.ai, ChatGPT) utilisent une température par défaut ~0.7.
Les APIs permettent de la configurer précisément.
"Extended thinking" (Claude) et "o1" (OpenAI) = mécanisme de raisonnement interne, différent de la température.
-->

---
hideInToc: true
layout: two-cols-header
---

# LLM vs SLM — Grande taille vs Petite taille

::left::

### LLM — Large Language Models

**Taille :** 70B → 1T+ paramètres

**Exemples :** Claude Opus, GPT-5, Gemini Pro

**Forces :**

- Raisonnement complexe
- Multilinguisme
- Tâches ouvertes variées

**Contraintes :**

- Cloud uniquement
- Coût élevé ($$$)
- Latence plus haute

::right::

### SLM — Small Language Models

**Taille :** 1B → 30B paramètres

**Exemples :** Phi-3, Gemma 2B, Llama 3.2 3B

**Forces :**

- Tournent en local (téléphone, laptop)
- Coût nul ou très faible
- Réponse rapide
- Données restent chez vous

**Contraintes :**

- Moins capable sur tâches complexes
- Spécialisation nécessaire

<div class="mt-2 text-sm text-orange-400">

**Tendance 2025** : les SLM se rapprochent des LLM sur des tâches ciblées — distillation de connaissance.

</div>

<!--
"Un SLM de 7B paramètres tourne sur votre téléphone. Un LLM de 400B nécessite un datacenter."
Microsoft Phi-3 Mini (3.8B) = performances comparables à GPT-3.5 sur certaines tâches.
Apple Intelligence sur iPhone = SLM en local.
-->

---
hideInToc: true
layout: default
---

# Types de modèles selon l'usage

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">

### Chat

Conversationnel, tour par tour

*Claude.ai, ChatGPT, Gemini*

Optimisé pour le dialogue naturel, garde le fil de la conversation

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">

### Instruct

Suit des instructions précises

*Claude API, GPT-4 Turbo*

Format structuré, résultats formatés (JSON, XML, Markdown)

</div>

<div class="p-3 rounded-lg border border-orange-500/30 bg-orange-500/5">

### Reasoning

"Pense avant de répondre"

*Claude Extended Thinking, o1, o3*

Raisonnement en chaîne interne — meilleur sur problèmes complexes, maths, code

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">

### Multimodal

Texte + Image + Audio + Vidéo

*GPT-4o, Gemini, Claude 3+*

Analyse d'images, transcription, génération multi-format

</div>

</div>

<div class="mt-3 p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-400">

**Embedding** (bonus) : représentation vectorielle du sens d'un texte — utilisé pour la recherche sémantique et le RAG (module 4)

</div>

<!--
"Multimodal ne veut pas dire 'tout faire' — chaque modèle a ses points forts selon ses données d'entraînement."
Les modèles Reasoning coûtent plus cher car ils génèrent des tokens de "réflexion" en interne.
-->

---
hideInToc: true
layout: default
---

# Panorama des modèles 2025

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div class="p-3 rounded-lg border border-orange-500/40 bg-orange-500/5">
<div class="font-bold text-orange-400 mb-2">🇺🇸 Anthropic — Claude</div>

Safety-first · Long context 1M
Leader code · Extended Thinking
Gamme : Haiku / Sonnet / Opus

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">
<div class="font-bold mb-2">🇺🇸 OpenAI — GPT</div>

Large adoption · Computer Use
Créativité · GPT-5.4
o1/o3 pour le raisonnement

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">
<div class="font-bold mb-2">🇺🇸 Google — Gemini</div>

Très long contexte · Multimodal natif
Intégration Google Workspace
Flash (éco) / Pro (perf)

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">
<div class="font-bold mb-2">🇨🇳 DeepSeek</div>

Open source · 10-30x moins cher
~72% SWE-bench
Considérations privacy (serveurs CN)

</div>

<div class="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5">
<div class="font-bold text-blue-400 mb-2">🇫🇷 Mistral</div>

Souveraineté européenne
Déployable en local
Apache 2.0 · Mistral Large

</div>

<div class="p-3 rounded-lg border border-slate-700 bg-slate-800/50">
<div class="font-bold mb-2">🌍 Open Source Local</div>

Meta Llama · Qwen (Alibaba)
0 coût · Données restent chez vous
RTX 4090 ou Mac 32GB minimum

</div>

</div>

<!--
Pas de "meilleur" modèle — il y a le modèle adapté à votre contexte.
Mistral = important pour les entreprises françaises/européennes avec des contraintes RGPD.
DeepSeek = révolution de janvier 2025 — performances frontier à prix open source, mais attention aux données.
-->

---
hideInToc: true
layout: default
---

# Les 4 tiers — Choisir selon le cas d'usage

<div class="space-y-3 mt-4">

<div class="p-3 rounded-lg border border-orange-500/40 bg-orange-500/5 flex items-center gap-4">
  <div class="text-2xl">🏆</div>
  <div>
    <div class="font-bold text-orange-400">Frontier</div>
    <div class="text-sm text-slate-400">Claude Opus · GPT-5 · Gemini Pro — Raisonnement complexe, architecture, code avancé</div>
  </div>
  <div class="ml-auto text-orange-400 font-bold">$$$</div>
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50 flex items-center gap-4">
  <div class="text-2xl">⚡</div>
  <div>
    <div class="font-bold">Mid-range</div>
    <div class="text-sm text-slate-400">Claude Sonnet · Gemini Flash — Usage quotidien, bon ratio perf/prix</div>
  </div>
  <div class="ml-auto text-slate-400 font-bold">$$</div>
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50 flex items-center gap-4">
  <div class="text-2xl">💰</div>
  <div>
    <div class="font-bold">Open source API</div>
    <div class="text-sm text-slate-400">DeepSeek · Mistral · Qwen — Budget serré, souveraineté, 90% des capacités à 10% du prix</div>
  </div>
  <div class="ml-auto text-slate-400 font-bold">$</div>
</div>

<div class="p-3 rounded-lg border border-slate-600 bg-slate-800/50 flex items-center gap-4">
  <div class="text-2xl">🏠</div>
  <div>
    <div class="font-bold">Local</div>
    <div class="text-sm text-slate-400">Llama · Qwen 7B · Devstral Small — Offline, données sensibles, 0 coût (RTX/Mac requis)</div>
  </div>
  <div class="ml-auto text-green-400 font-bold">Gratuit</div>
</div>

</div>

<div class="mt-4 text-center text-sm text-orange-400">
  Règle : commencer par le modèle le plus léger, escalader si nécessaire.
</div>

<!--
"Stratégie du modèle minimal viable" — détaillée dans le module 3 (économie des tokens).
Haiku / Flash pour les tâches simples. Sonnet pour le quotidien. Opus pour les problèmes complexes.
-->

---
hideInToc: true
layout: default
---

# Panorama des usages de l'IA

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Les 4 grandes catégories**

<v-clicks>

- **Génération de contenu** : textes, articles, emails, images, vidéos, code, musique
- **Analyse et extraction** : résumé, classification, extraction d'entités, sentiment
- **Conversation et assistance** : chatbots, support client, tutoriels, Q&A
- **Automatisation** : agents, workflows, intégrations no-code, RPA augmenté

</v-clicks>

</div>

<div>

**Interfaces et outils**

<v-clicks>

- **Chat généraliste** : Claude.ai, ChatGPT, Gemini, Le Chat (Mistral)
- **No-code / Métier** : Notion AI, Copilot M365, Make.com AI, Zapier AI
- **Créatif** : Midjourney, DALL-E, Suno (musique), ElevenLabs (voix)
- **Code** : Cursor, Claude Code, GitHub Copilot *(approfondissement en formation AI Builders)*
- **API** : intégrer un modèle dans vos propres applications

</v-clicks>

</div>

</div>

<!--
"API vs interface : utiliser un outil vs intégrer un modèle dans une app."
Pour la formation Métiers → ChatGPT, Notion AI, Make.com.
Pour AI Builders → Cursor, Claude Code.
Pour AI Engineers → API directe.
-->
