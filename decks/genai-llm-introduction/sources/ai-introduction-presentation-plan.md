# AI Introduction — Présentation Plan

**Durée:** Module multi-sessions (7 modules, ~8h jour 1)
**Audience:** Tous profils — No-coders, Vibe coders, Devs, Métiers/Produit
**Format:** Cours magistral semi-technique + démos rapides + exercices autonomes (remote-friendly)
**Venue:** Bootcamp IA Simplon — Socle commun Fondamentaux AI

---

## Core Messages

> "L'IA générative n'est pas magique — comprendre comment elle fonctionne, c'est apprendre à s'en servir intelligemment."

- Démystifier : comprendre les mécanismes de base (LLM, tokens, inférence)
- Utiliser : savoir prompter, choisir ses outils, optimiser ses coûts
- Orienter : identifier quelle formation correspond à son profil

## Call to Action

Après ce module, chaque participant doit pouvoir :

1. Expliquer ce qu'est un LLM à quelqu'un d'autre
2. Écrire un prompt structuré et efficace
3. Choisir sa trajectoire parmi les 3 formations Simplon IA

---

## Structure générale — 7 Modules

| Module | Titre | Durée | Moment |
|--------|-------|-------|--------|
| 1 | Bases IA Gen | 1h30 | Jour 1 — Matin |
| 2 | LLM & Outils | 1h30 | Jour 1 — Matin |
| 3 | Prompt Engineering | 1h | Jour 1 — Après-midi |
| 4a | Économie des tokens | 30min | Jour 1 — Après-midi |
| 4b | Base RAG | À planifier | Session 2 |
| 5 | Base Agent | À planifier | Session 2 |
| 6 | MCP | 30min | Jour 1 — Après-midi |
| 7 | Usages & Orientations | À planifier | Session 2 |

---

## MODULE 1 — Bases IA Gen (1h30)

### Hook

> "En 2017, une équipe de Google publie un article de 8 pages. Aujourd'hui, cet article est la fondation de toute l'IA générative."

### Key Points

- **Histoire rapide de l'IA** : du rule-based au deep learning, jusqu'à Gen AI
- **Les grandes familles de modèles génératifs** :
  - GAN (images réalistes)
  - Modèles de diffusion (Stable Diffusion, DALL-E, Midjourney)
  - LLM — Large Language Models (texte, code, raisonnement)
- **Architecture Transformer** : mécanisme d'attention, pourquoi ça change tout
- **Déterministe vs non-déterministe** : température, variabilité des réponses
- **Limites des LLM** : hallucinations, fenêtre de contexte, date de coupure
- **Modèles frontier** : Claude (Anthropic), GPT-4o (OpenAI), Gemini (Google)

### Visuels Nécessaires

- [ ] Timeline : évolution de l'IA 1950 → 2025
- [ ] Schéma : 3 familles Gen AI (GAN / Diffusion / LLM)
- [ ] Diagramme simplifié : architecture Transformer (attention)
- [ ] Tableau comparatif : modèles frontier (forces/faiblesses)

### Exercice rapide (autonome)

> Tester 3 modèles différents avec le même prompt et comparer les réponses

### Talking Points

- Analogie Transformer : "comme un correcteur orthographique prédictif, mais à l'échelle de milliers de livres"
- Hallucination : "le modèle ne sait pas ce qu'il ne sait pas"
- Non-déterminisme : même question, réponse différente → c'est normal

---

## MODULE 2 — LLM & Outils (1h30)

### Hook

> "Il existe des centaines d'outils IA. La question n'est pas 'lequel choisir' — c'est 'lequel pour quoi'."

### Key Points

- **Inférence** : comment un LLM génère du texte token par token
- **Tokens** : unité de base, tokenisation, relation avec la fenêtre de contexte
- **Types de modèles** :
  - Chat (conversationnel)
  - Instruct (instruction-following)
  - Multimodal (texte + image + audio + code)
- **Panorama des outils** :
  - Interfaces : ChatGPT, Claude.ai, Gemini
  - Coding assistants : Cursor, GitHub Copilot, Claude Code
  - Agents visuels : Lovable, Bolt, v0
- **Chat vs Agent** : réactif vs proactif, contexte vs actions
- **Différences Lovable/Bolt vs Cursor/Claude Code** : scaffolding vs assistance continue

### Visuels Nécessaires

- [ ] Animation : génération token par token (gif ou démo live)
- [ ] Carte mentale : écosystème outils IA 2025
- [ ] Tableau : Chat vs Agent (caractéristiques)
- [ ] Schéma : fenêtre de contexte (ce que le modèle "voit")

### Démo Live (5 min)

- Ouvrir Claude.ai et Cursor côte à côte
- Montrer la différence entre mode chat et mode agent
- Visualiser les tokens avec un tokenizer en ligne

### Talking Points

- Token ≠ mot : "le" = 1 token, "extraordinary" peut être 3 tokens
- Multimodal : "le modèle peut voir une image ET lire du code"
- Lovable vs Cursor : "Lovable construit la maison, Cursor vous aide à la rénover"

---

## MODULE 3 — Prompt Engineering (1h)

### Hook

> "Un prompt, c'est comme une commande SQL : la précision fait tout."

### Key Points

- **Anatomie d'un bon prompt** :
  - Rôle / Persona
  - Contexte
  - Tâche
  - Contraintes / Format de sortie
- **Patterns essentiels** :
  - Few-shot : donner des exemples dans le prompt
  - Chain of thought : "pense étape par étape"
  - Zero-shot vs few-shot vs multi-shot
- **Les 4 stratégies Anthropic** :
  - **Write** : générer du contenu
  - **Select** : filtrer / classer
  - **Compress** : résumer / extraire
  - **Isolate** : séparer les préoccupations (RAG, routing)
- **System prompt vs user prompt** : rôles et bonnes pratiques

### Visuels Nécessaires

- [ ] Template : anatomie d'un prompt (visuel structuré)
- [ ] Comparatif : prompt vague vs prompt structuré → résultat
- [ ] Schéma : 4 stratégies Anthropic avec exemples

### Exercice pratique (15 min — autonome possible)

> Réécrire un mauvais prompt en appliquant l'anatomie + 1 pattern

### Talking Points

- "Le prompt est votre cahier des charges — garbage in, garbage out"
- Chain of thought : "ça force le modèle à montrer son raisonnement avant de répondre"
- System prompt : "c'est la notice d'instructions que l'utilisateur ne voit pas"

---

## MODULE 4a — Économie des Tokens (30 min)

### Hook

> "Les tokens, c'est votre carburant. Comprendre le compteur, c'est ne pas tomber en panne."

### Key Points

- **Facturation** : input tokens vs output tokens (prix différents)
- **Stratégie du modèle minimal viable** : ne pas utiliser GPT-4o pour du texte simple
- **Règle des 30 secondes** : si une tâche prend < 30s à faire manuellement, évaluer le ROI
- **Alternatives open source** :
  - Cline (VS Code)
  - Aider (terminal)
  - DeepSeek, Devstral (modèles économiques)
- **Budget réaliste** : exemple de coût mensuel selon usage type

### Visuels Nécessaires

- [ ] Tableau : comparatif coûts modèles (Claude / GPT / Gemini / DeepSeek)
- [ ] Schéma : pyramide modèles — coût vs capacité

### Talking Points

- "Claude Haiku coûte 50x moins cher que Opus — pour beaucoup de tâches, c'est suffisant"
- "Les tokens de sortie coûtent plus cher que les tokens d'entrée"

---

## MODULE 6 — MCP : Concepts (30 min)

### Hook

> "MCP, c'est l'USB-C de l'IA : un connecteur universel pour brancher n'importe quel outil."

### Key Points

- **Model Context Protocol** : standard ouvert d'Anthropic (nov. 2024)
- **Architecture** :
  - Host (Claude, Cursor...)
  - Protocol (MCP)
  - Server (GitHub, Figma, Chrome DevTools...)
- **Capabilities** :
  - Tools : actions exécutables
  - Resources : données accessibles
  - Prompts : templates réutilisables
- **Serveurs essentiels** :
  - Context7 (documentation live)
  - Chrome DevTools (debug navigateur)
  - Figma (design ↔ code)
  - GitHub (code, PRs, issues)

### Visuels Nécessaires

- [ ] Schéma : architecture MCP Host ↔ Protocol ↔ Server
- [ ] Carte : écosystème des serveurs MCP courants

### Démo (5 min)

- Montrer Claude avec un serveur MCP GitHub activé : poser une question sur un repo

### Talking Points

- "Avant MCP, chaque IA avait ses propres intégrations propriétaires. MCP standardise tout."
- "C'est ce qui permet à Claude Code de lire votre code, votre Figma, et votre repo GitHub en même temps"

---

## MODULE 4b — Base RAG (Session 2 — à planifier)

### Thèmes clés à couvrir

- Pourquoi les LLM oublient (fenêtre de contexte, pas de mémoire native)
- Embeddings : représentation vectorielle du sens
- Architecture RAG : retrieve → augment → generate
- Cas d'usage : chatbot sur base de connaissance, documentation, support client
- Outils : LangChain, LlamaIndex, pgvector

---

## MODULE 5 — Base Agent (Session 2 — à planifier)

### Thèmes clés à couvrir

- Qu'est-ce qu'un agent IA vs un simple LLM
- Boucle ReAct : Reason → Act → Observe
- Outils (function calling) : comment l'agent décide d'agir
- Multi-agents : orchestration, délégation
- Exemples concrets : agent de recherche, agent de code, agent email

---

## MODULE 7 — Orientations & Usages (Session 2 — à planifier)

### Thèmes clés à couvrir

- Synthèse : quel profil → quelle formation
- **Formation Métiers** : gen AI, chat, agents, RAG, no-code
- **Formation AI Builders** : coding agents, Cursor, Claude Code
- **Formation AI Engineers** : création RAG, agents custom, API
- Quiz d'orientation interactif

---

## Diagrammes à créer (Mermaid)

1. **Timeline IA** — flowchart horizontal 1950→2025
2. **Architecture Transformer** — diagramme simplifié attention
3. **Écosystème outils IA** — mindmap
4. **Architecture MCP** — diagramme Host↔Protocol↔Server
5. **Architecture RAG** — séquence retrieve→augment→generate
6. **Boucle Agent ReAct** — flowchart cyclique

---

## Q&A Anticipées

1. **"ChatGPT et Claude c'est pareil ?"**
   → Non, modèles différents, philosophies différentes (Anthropic = safety-first). Même architecture de base (Transformer).

2. **"Peut-on faire confiance aux réponses des LLM ?"**
   → Toujours vérifier les informations factuelles. Les LLM excellent à la forme, pas toujours au fond.

3. **"Est-ce que l'IA va remplacer mon métier ?"**
   → Augmentation plutôt que remplacement. Ceux qui savent utiliser l'IA remplaceront ceux qui ne savent pas.

4. **"C'est quoi la différence entre IA et machine learning ?"**
   → ML est un sous-ensemble de l'IA. Gen AI est un sous-ensemble du DL (deep learning), lui-même sous-ensemble du ML.

5. **"Pourquoi mes résultats changent à chaque fois ?"**
   → La température du modèle introduit de l'aléatoire. C'est configurable.

---

## Checklist Présentateur

### Avant

- [ ] Tester tous les liens et démos en live
- [ ] Préparer captures d'écran de backup pour les démos
- [ ] Vérifier accès aux outils (Claude.ai, Cursor, tokenizer)
- [ ] Préparer un repo GitHub pour démo MCP

### Pendant

- [ ] Commencer par le hook, pas par "aujourd'hui on va voir..."
- [ ] Pause de 2 min après chaque module
- [ ] Encourager les questions dans le chat (remote-friendly)

---

## Slide Outline — Jour 1

### Module 1 — Bases IA Gen

1. Titre + hook ("l'article de 8 pages")
2. Timeline : évolution IA
3. Les 3 familles Gen AI
4. Architecture Transformer (simplifié)
5. Déterministe vs non-déterministe
6. Limites des LLM
7. Modèles frontier 2025
8. Exercice autonome

### Module 2 — LLM & Outils

1. Titre + hook ("des centaines d'outils")
2. Inférence : comment ça marche token par token
3. Tokens : définition + fenêtre de contexte
4. Types de modèles
5. Panorama des outils (carte)
6. Chat vs Agent
7. Lovable/Bolt vs Cursor/Claude Code
8. Démo live

### Module 3 — Prompt Engineering

1. Titre + hook ("commande SQL")
2. Anatomie d'un prompt
3. Prompt vague vs structuré (avant/après)
4. Patterns : few-shot + chain of thought
5. 4 stratégies Anthropic
6. System prompt vs user prompt
7. Exercice pratique

### Module 4a — Économie des Tokens

1. Titre + hook ("carburant")
2. Input vs output tokens
3. Comparatif coûts modèles
4. Pyramide modèles
5. Alternatives open source
6. Budget réaliste

### Module 6 — MCP

1. Titre + hook ("USB-C de l'IA")
2. Architecture MCP
3. Capabilities (Tools / Resources / Prompts)
4. Serveurs essentiels
5. Démo GitHub MCP
6. Ce qui s'ouvre avec MCP

---

_Plan créé : 2026-04-05_
_Prêt pour génération des slides : [ ]_
