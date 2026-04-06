# AI Introduction — Présentation Plan

**Durée:** 1 journée intensive (8h — 9h-13h / 14h-18h)
**Audience:** Tous profils — No-coders, Vibe coders, Devs, Métiers/Produit
**Format:** Cours magistral semi-technique + démos rapides + exercices autonomes (remote-friendly)
**Venue:** Bootcamp IA — Socle commun Fondamentaux AI

---

## Core Messages

> "L'IA générative n'est pas magique — comprendre comment elle fonctionne, c'est apprendre à s'en servir intelligemment."

- **Démystifier** : comprendre les mécanismes (LLM, tokens, agents)
- **Utiliser** : savoir prompter, choisir ses outils, maîtriser ses coûts
- **Orienter** : identifier quelle formation correspond à son profil

## Call to Action

Après cette journée, chaque participant peut :

1. Expliquer ce qu'est un LLM et en quoi il diffère d'un agent
2. Écrire un prompt structuré et efficace
3. Choisir sa trajectoire parmi les 3 formations IA

---

## Planning journée — 5 Modules

| Heure | Module | Titre | Durée |
|-------|--------|-------|-------|
| 9h00  | 1 | Bases IA Gen | 1h30 |
| 10h30 | — | *Pause* | 15min |
| 10h45 | 2 | LLM : Inférence, tokens, modèles & multimodal | 1h30 |
| 12h15 | — | *Déjeuner* | 1h45 |
| 14h00 | 3 | Prompt Engineering (+ économie des tokens) | 1h30 |
| 15h30 | — | *Pause* | 15min |
| 15h45 | 4 | Concepts clefs : RAG, Agents & MCP | 1h |
| 16h45 | 5 | Orientations & formations | 30min |
| 17h15 | — | Q&A + bilan | 45min |

---

## MODULE 1 — Bases IA Gen (1h30)

*Source : M01 hoko.team*

### Hook

> "En 2017, une équipe de Google publie un article de 8 pages intitulé 'Attention is All You Need'. Aujourd'hui, cet article est la fondation de toute l'IA générative."

### Key Points

- **Historique** : de Turing (1950) aux LLM — Deep Blue, AlphaGo, Transformer, ChatGPT, Agents IA (2024)
- **Les 3 termes à distinguer** :
  - IA (intelligence artificielle) — 1940-1960
  - ML (machine learning) — 1970-1990
  - DL (deep learning) + **Gen AI** (2020+) = DL + Transformers + Scale massif
- **Les 3 familles de Gen AI** :
  - GAN (images réalistes)
  - Modèles de diffusion (Stable Diffusion, DALL-E, Midjourney)
  - LLM — Large Language Models (texte, code, raisonnement)
- **Architecture Transformer** : "Attention is All You Need" — traitement parallèle, mécanisme d'attention, scale
- **3 phases d'entraînement** : pré-entraînement (non supervisé) → fine-tuning (supervisé) → RLHF (alignement)
- **Déterministe vs non-déterministe** : même prompt ≠ même réponse — c'est normal
- **Limites des LLM** : hallucinations, fenêtre de contexte, date de coupure, calculs approximatifs
- **Modèles frontier 2025** : Claude (Anthropic), GPT (OpenAI), Gemini (Google)

### Visuels Nécessaires

- [ ] Timeline interactive : évolution IA 1950 → 2025
- [ ] Diagramme gigogne : IA ⊃ ML ⊃ DL ⊃ Gen AI ⊃ LLM
- [ ] Schéma : 3 familles Gen AI (GAN / Diffusion / LLM)
- [ ] Diagramme simplifié : architecture Transformer (attention)
- [ ] Tableau : 3 phases d'entraînement
- [ ] Slide : déterministe vs non-déterministe (tableau comparatif)
- [ ] Tableau : modèles frontier (Claude / GPT / Gemini — forces/faiblesses)

### Exercice rapide (autonome, 10 min)

> Tester le même prompt sur 3 modèles différents et observer les différences de réponse et de ton

### Talking Points

- Transformer : "comme un correcteur prédictif, mais à l'échelle de milliards de mots"
- RLHF : "les humains ont appris au modèle à être utile, inoffensif et honnête"
- Hallucination : "le modèle ne sait pas ce qu'il ne sait pas — il invente avec confiance"
- Température : "c'est le curseur de créativité — 0 = strict, 1 = inventif"

---

## MODULE 2 — LLM : Inférence, tokens, modèles & multimodal (1h30)

### Hook

> "Un LLM ne 'pense' pas. Il prédit le prochain token, encore et encore, des milliers de fois par seconde. Comprendre ça change tout à la façon dont vous l'utilisez."

### Partie 2a — Inférence et tokens (30 min)

- **Inférence** : comment un LLM génère du texte — prédiction du token suivant, itération
- **Tokens** : unité de base du langage pour un LLM
  - 1 token ≈ 4 caractères en moyenne
  - Les tokens ne sont pas des mots : "extraordinaire" = 3-4 tokens
  - Démo : visualiser la tokenisation d'une phrase
- **Fenêtre de contexte** : tout ce que le modèle "voit" à un instant donné
  - Le modèle n'a pas de mémoire entre sessions — il ne voit que le contexte actuel
  - Longueurs : 8K, 128K, 1M tokens — impact sur les cas d'usage
- **Température** : paramètre de variabilité (0 = strict et reproductible, 1 = créatif)
- **Tokens input vs output** : le modèle lit l'input et génère l'output — différence de coût

### Partie 2b — Types de modèles (30 min)

- **LLM vs SLM** :
  - LLM (Large) : Claude Opus, GPT-5 — très capables, coûteux, cloud uniquement
  - SLM (Small) : Phi-3, Gemma, Llama 3.2 — rapides, légers, tournent en local
  - Tendance 2025 : les SLM se rapprochent des LLM en qualité sur des tâches ciblées
- **Types de modèles selon l'usage** :
  - Chat : conversationnel, tour par tour (ChatGPT, Claude.ai)
  - Instruct : suit des instructions précises, format structuré
  - Reasoning : raisonnement étendu, "pense avant de répondre" (Claude Sonnet Extended Thinking, o1)
  - Multimodal : traite texte + image + audio + vidéo (GPT-4o, Gemini, Claude)
  - Embedding : représentation vectorielle du sens (pour RAG)
- **Panorama des modèles** :
  - Claude (Anthropic) : safety-first, long context (1M), leader sur le code
  - GPT (OpenAI) : Computer Use, créativité, très large adoption
  - Gemini (Google) : très long contexte, multimodal natif, intégration Google
  - DeepSeek (open source chinois) : très économique, performances proches du frontier
  - Mistral (open source européen) : souveraineté, déploiement local
  - Llama / Qwen : modèles locaux, 0 coût, confidentialité
- **4 tiers selon le cas d'usage** :
  - Frontier (Claude Opus, GPT-5, Gemini Pro) : tâches complexes, raisonnement — $$$
  - Mid-range (Sonnet, Gemini Flash) : usage quotidien — $$
  - Open source API (DeepSeek, Mistral) : budget, souveraineté — $
  - Local (Llama, Qwen 7B) : offline, données sensibles — gratuit
- **Stratégie** : commencer par le modèle le plus léger, escalader si nécessaire

### Partie 2c — Panorama des usages et outils (30 min)

- **Les grandes catégories d'usage** :
  - Génération de contenu : textes, images, vidéos, code
  - Analyse et extraction : résumé, classification, extraction d'entités
  - Conversation et assistance : chatbots, support, tutoriels
  - Automatisation : agents, workflows, intégrations
- **Panorama des interfaces** :
  - Interfaces chat : Claude.ai, ChatGPT, Gemini, Mistral Le Chat
  - Outils no-code / métier : Notion AI, Copilot M365, Make.com, Zapier AI
  - Outils créatifs : Midjourney, DALL-E, Suno, ElevenLabs
  - Outils de code : Cursor, Claude Code, GitHub Copilot (mention rapide — approfondissement en formation AI Builders)
- **API vs interface** : la différence entre utiliser un outil et intégrer un modèle dans une app

### Visuels Nécessaires

- [ ] Animation ou schéma : inférence token par token
- [ ] Schéma : fenêtre de contexte (ce que le modèle "voit")
- [ ] Tableau : LLM vs SLM (taille / vitesse / coût / usage)
- [ ] Schéma : 4 types de modèles (chat / instruct / reasoning / multimodal / embedding)
- [ ] Carte : panorama modèles (Claude / GPT / Gemini / DeepSeek / Mistral / Local)
- [ ] Pyramide : 4 tiers modèles
- [ ] Carte : panorama des usages et interfaces

### Démo Live (5 min)

- Visualiser la tokenisation sur un tokenizer en ligne
- Montrer la différence de réponse entre temperature=0 et temperature=1 sur le même prompt

### Talking Points

- "Un token n'est pas un mot — 'bonjour' = 1 token, 'extraordinairement' peut en valoir 4"
- "La fenêtre de contexte, c'est la mémoire de travail du modèle — ce qui n'est pas dedans n'existe pas pour lui"
- "Un SLM de 7B paramètres tourne sur votre téléphone. Un LLM de 400B nécessite un datacenter"
- "Multimodal ne veut pas dire 'tout faire' — chaque modèle a ses points forts selon ses données d'entraînement"

---

## MODULE 3 — Prompt Engineering (1h30)

*Inclut une section légère sur l'économie des tokens*

### Hook

> "Un prompt, c'est un cahier des charges. Garbage in, garbage out — la précision fait tout. Et un bon prompt, c'est aussi un prompt qui ne gaspille pas."

### Partie 3a — Prompt Engineering (1h)

- **Anatomie d'un bon prompt** :
  - Rôle / Persona ("Tu es un expert en...")
  - Contexte (ce que le modèle doit savoir)
  - Tâche (ce qu'il doit faire)
  - Contraintes / Format de sortie
- **Patterns essentiels** :
  - Zero-shot : instruction seule
  - Few-shot : donner des exemples dans le prompt
  - Chain of thought : "pense étape par étape" — force le modèle à raisonner avant de répondre
- **Les 4 stratégies Anthropic** :
  - **Write** : générer du contenu original
  - **Select** : filtrer / classer / router
  - **Compress** : résumer / extraire l'essentiel
  - **Isolate** : séparer les préoccupations (RAG, routing, multi-step)
- **System prompt vs user prompt** : le system prompt est la "notice d'instructions" invisible à l'utilisateur

### Exercice pratique (15 min — autonome possible)

> Réécrire un mauvais prompt fourni en appliquant l'anatomie complète + 1 pattern au choix

### Partie 3b — Économie des tokens : l'essentiel (20 min)

*Ce que tout utilisateur doit savoir, quelle que soit sa formation*

- **Input vs output** : le modèle lit l'input, génère l'output — output = 3-5x plus cher en tokens
- **Implication directe pour le prompt** : être précis réduit les allers-retours → moins de tokens consommés
- **La règle des 30 secondes** : si une tâche prend moins de 30s manuellement, évaluer si l'IA est vraiment utile
- **Choisir le bon modèle** : pas toujours le plus puissant — Haiku pour les tâches simples, Opus pour le raisonnement complexe
- **Budget ordre de grandeur** : usage occasionnel ~$20/mois, usage intensif $100-300/mois

### Visuels Nécessaires

- [ ] Template visuel : anatomie d'un prompt (bloc structuré)
- [ ] Comparatif : prompt vague → prompt structuré (avant/après, même résultat)
- [ ] Schéma : 4 stratégies Anthropic avec exemples concrets
- [ ] Slide : chain of thought (démonstration avant/après)
- [ ] Tableau simple : input vs output tokens (coût relatif)
- [ ] Pyramide : modèle selon la tâche (light → heavy)

### Talking Points

- "Le modèle ne peut pas deviner ce que vous avez en tête — soyez explicite sur le format de sortie attendu"
- "Chain of thought : 'pense étape par étape' peut doubler la qualité sur un problème complexe"
- "Un bon prompt donne une bonne réponse du premier coup — c'est aussi la meilleure façon d'économiser des tokens"
- "Output coûte plus cher : 'Réponds en 3 points maximum' est à la fois plus lisible ET moins coûteux"

---

## MODULE 4 — Concepts clefs : RAG, Agents & MCP (1h)

*Sources : M09 hoko.team, Tout_sur_les_Agents.pdf*

### Hook

> "Un LLM seul, c'est un expert brillant enfermé dans une pièce sans fenêtre. RAG, Agents et MCP, c'est ce qui lui ouvre les portes."

### Partie 4a — Base RAG (20 min)

- **Pourquoi les LLM oublient** : fenêtre de contexte limitée, pas de mémoire native, données figées
- **Limites à adresser** : connaissance figée, isolation de l'environnement
- **Principe RAG** : Retrieve → Augment → Generate
  1. L'utilisateur pose une question
  2. Le système cherche les documents pertinents (embeddings + similarité)
  3. Les documents sont injectés dans le prompt
  4. Le modèle génère une réponse informée
- **Embeddings** : représentation vectorielle du sens — les mots proches = vecteurs proches
- **Cas d'usage** : chatbot sur base de connaissance, support client, documentation interne
- **Outils** : LangChain, LlamaIndex, pgvector, Supabase Vector

### Partie 4b — Base Agent (20 min)

- **Agent IA vs chatbot** :
  - Chatbot : répond à des questions
  - Agent : accomplit des tâches (planifie, exécute, s'adapte)
- **Formule** : Agent = LLM + Outils + Boucle d'exécution
- **Composants d'un agent** :
  - Instructions (system prompt, contraintes)
  - Base de connaissances optionnel (RAG)
  - Mémoire (historique, état)
  - Moteur de raisonnement (LLM)
  - Outils & Actions (APIs, terminal, fonctions)
- **Pattern ReAct** : Reason → Act → Observe (boucle)
- **Function calling** : comment l'agent décide quel outil utiliser
- **Patterns multi-agents** : Single / Supervisor / Hierarchical / Network
- **Claude Code = Single Agent** : LLM + outils (terminal, fichiers, recherche web)

### Partie 4c — MCP (20 min)

*Source : M09 hoko.team*

- **Model Context Protocol** : "L'USB-C de l'IA" — standard ouvert Anthropic (nov. 2024), adopté par OpenAI (mars 2025)
- **Avant MCP** : chaque outil = intégration custom, code spécifique, maintenance lourde
- **Avec MCP** : un protocole universel, serveurs réutilisables, plug & play
- **Architecture** :
  - Host (Claude Code, Cursor, app custom)
  - Protocol (JSON-RPC, requêtes/réponses)
  - Server (GitHub, Figma, Chrome DevTools, Supabase...)
- **Capabilities** :
  - Tools : actions exécutables
  - Resources : données accessibles
  - Prompts : templates prédéfinis
- **Serveurs essentiels** : Context7 (doc live), Chrome DevTools (debug), Figma (design↔code), GitHub (code/PRs)

### Visuels Nécessaires

- [ ] Schéma : architecture RAG (retrieve → augment → generate)
- [ ] Visualisation : embeddings et similarité vectorielle
- [ ] Tableau : agent vs chatbot
- [ ] Schéma : composants d'un agent
- [ ] Diagramme : boucle ReAct
- [ ] Schéma : architecture MCP (Host ↔ Protocol ↔ Server)
- [ ] Carte : écosystème serveurs MCP courants

### Démo (5 min)

> Montrer Claude Code avec MCP GitHub activé : poser une question sur un repo en direct

### Talking Points

- RAG : "le modèle ne modifie pas sa connaissance — on lui donne les informations dans le prompt à chaque fois"
- Agent : "Claude Code, c'est un Single Agent : il lit votre code, lance des commandes, et recommence jusqu'à ce que ça marche"
- MCP : "avant MCP, brancher Figma à Claude = des semaines de dev. Avec MCP = 5 minutes de config"

---

## MODULE 5 — Orientations & Formations (30 min)

### Hook

> "Vous avez passé la journée à comprendre les fondations. Maintenant, la vraie question : où voulez-vous aller ?"

### Key Points

- **Récap de la journée** : ce qu'on a vu ensemble
- **Quiz d'orientation** : 5 questions pour identifier son profil
- **Les 3 trajectoires** :

| Formation | Pour qui | Contenu clef |
|-----------|----------|--------------|
| **Métiers** | Usage Gen AI, chat, agents, RAG, no-code | Prompting avancé, RAG sans code, agents no-code, usages métier |
| **AI Builders** | Coding agents, vibe → agentic | Claude Code, Cursor, agentic patterns, CI/CD IA |
| **AI Engineers** | Création RAG, agents custom, API | LangChain, embeddings, fine-tuning, agents from scratch |

- **Socle commun** : tout le monde a fait ce module aujourd'hui — la suite dépend de votre profil

### Visuels Nécessaires

- [ ] Slide récap : "Ce que vous savez maintenant" (5 points clefs)
- [ ] Questionnaire d'orientation (interactif si possible)
- [ ] Tableau : 3 formations (profil / contenu / prérequis)
- [ ] Slide : "Votre prochaine étape" avec liens

### Talking Points

- "Il n'y a pas de mauvaise trajectoire — il y a celle qui correspond à vos objectifs aujourd'hui"
- "Ces formations ne sont pas exclusives — beaucoup de AI Engineers ont commencé en Métiers"

---

## Diagrammes à créer (Mermaid)

1. **Timeline IA** — flowchart horizontal 1950→2025 (avec jalon Transformer 2017)
2. **Gigogne IA/ML/DL/GenAI** — diagramme de Venn ou gigogne
3. **Architecture Transformer** — schéma simplifié attention
4. **SWE-bench progression** — bar chart ou graphique
5. **Architecture RAG** — séquence retrieve→augment→generate
6. **Boucle ReAct** — flowchart cyclique Reason→Act→Observe
7. **Architecture MCP** — Host↔Protocol↔Server

---

## Q&A Anticipées

1. **"ChatGPT et Claude c'est pareil ?"**
   → Même architecture de base (Transformer), mais modèles distincts avec philosophies différentes (Anthropic = safety-first). Les benchmarks montrent des forces différentes selon les tâches.

2. **"Peut-on faire confiance aux réponses des LLM ?"**
   → Toujours vérifier les informations factuelles. Les LLM excellent à la forme et à la synthèse, mais hallucinent sur les faits précis. RAG réduit ce problème.

3. **"L'IA va remplacer mon métier ?"**
   → Augmentation plutôt que remplacement à court terme. Les profils qui savent déléguer à l'IA et superviser le résultat seront les plus recherchés.

4. **"Pourquoi mes résultats changent à chaque fois ?"**
   → La température introduit de l'aléatoire. C'est configurable — temperature=0 pour des résultats reproductibles.

5. **"Vibe coding ou agentic coding ?"**
   → Pattern hybride : vibe pour valider une idée, agentic pour scaler en production. Les deux ont leur place.

6. **"Quel modèle utiliser ?"**
   → Modèle minimal viable : commencer par le plus léger, escalader si nécessaire. Sonnet couvre 90% des cas d'usage.

---

## Checklist Présentateur

### Avant

- [ ] Tester toutes les démos (Claude.ai, Cursor, tokenizer, MCP GitHub)
- [ ] Préparer captures d'écran de backup pour les démos
- [ ] Vérifier accès aux comptes (Claude.ai, Cursor)
- [ ] Configurer serveur MCP GitHub pour la démo

### Pendant

- [ ] Commencer par le hook, pas par "aujourd'hui on va voir..."
- [ ] Pause de 15 min à 10h30 et 15h30
- [ ] Discussion collective en fin de Module 2 (15 min)
- [ ] Encourager les questions dans le chat (remote-friendly)

---

## Slide Outline — Journée complète

### Module 1 — Bases IA Gen (≈10 slides)

1. Titre + hook ("l'article de 8 pages")
2. Timeline : évolution IA 1950→2025
3. Les 3 termes : IA / ML / DL / Gen AI (gigogne)
4. Les 3 familles Gen AI (GAN / Diffusion / LLM)
5. Architecture Transformer (simplifié)
6. 3 phases d'entraînement
7. Déterministe vs non-déterministe
8. Limites des LLM
9. Modèles frontier 2025
10. Exercice autonome

### Module 2 — LLM : Inférence, tokens, modèles & multimodal (≈12 slides)

1. Titre + hook ("prédit le prochain token")
2. Inférence : génération token par token (démo tokenizer)
3. Fenêtre de contexte : ce que le modèle "voit"
4. Température : strict vs créatif
5. LLM vs SLM (tableau comparatif)
6. 4 types de modèles : chat / instruct / reasoning / multimodal
7. Panorama des modèles (carte : Claude / GPT / Gemini / DeepSeek / Mistral / Local)
8. Pyramide des 4 tiers (frontier → local)
9. Stratégie : modèle minimal viable
10. Panorama des usages (génération / analyse / conversation / automatisation)
11. Panorama des interfaces (chat / no-code / créatif / code — mention rapide)
12. Démo : tokenizer + différence de température

### Module 3 — Prompt Engineering + Économie des tokens (≈10 slides)

1. Titre + hook ("cahier des charges")
2. Anatomie d’un prompt (template structuré)
3. Comparatif : prompt vague vs structuré (avant/après)
4. Zero-shot / Few-shot / Chain of thought
5. 4 stratégies Anthropic (Write / Select / Compress / Isolate)
6. System prompt vs user prompt
7. Exercice pratique
8. Économie des tokens : input vs output
9. Règle des 30 secondes
10. Choisir le bon modèle selon la tâche

### Module 4 — RAG, Agents & MCP (≈12 slides)

1. Titre + hook ("expert sans fenêtre")
2. Limites LLM → pourquoi RAG
3. Architecture RAG (schéma)
4. Embeddings et similarité
5. Cas d'usage RAG
6. Agent vs chatbot
7. Composants d'un agent
8. Boucle ReAct
9. Patterns multi-agents
10. MCP : "USB-C de l'IA" + historique
11. Architecture MCP (schéma)
12. Démo MCP GitHub

### Module 5 — Orientations (≈5 slides)

1. Récap journée (ce que vous savez maintenant)
2. Quiz d'orientation
3. Les 3 trajectoires (tableau)
4. Prochaine étape selon profil
5. Ressources & liens

---

*Plan créé : 2026-04-05*
*Prêt pour génération des slides : [ ]*
