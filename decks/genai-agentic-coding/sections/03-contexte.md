---
layout: section-liquid
---

# Le contexte

<div class="text-lg opacity-70 mt-4">20 min · 4 échecs · CLAUDE.md hiérarchique · ADRs</div>

---
layout: default
---

### De Prompt Engineering à Context Engineering

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#1d3557] pl-4 opacity-70">

#### Prompt Engineering · 2022-2024

- *« Tu es un assistant expert en X »*
- Few-shot examples dans le prompt
- Tuning fin du wording, des séparateurs
- Le **prompt** = unité de travail

<div class="text-xs opacity-70 mt-3">Modèles faibles → on les guidait mot à mot.</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4">

#### Context Engineering · 2025-2026

- `CLAUDE.md`, skills, ADRs, sub-agents
- Le contexte est **construit, versionné, partagé**
- L'agent fouille le projet et décide
- Le **contexte** = unité de travail

<div class="text-xs opacity-70 mt-3">Modèles forts → on les nourrit du bon contexte.</div>

</div>

</div>

<div class="text-center mt-8 text-[#457b9d] text-lg font-bold">

« Le contexte est le nouveau code. »

</div>

<!--
- 2022-2024 : on bricolait des prompts. 2025-2026 : on construit du contexte.
- Si tu passes encore 80% de ton temps à tuner ton prompt et 20% à structurer ton repo, c'est l'inverse aujourd'hui
- Ce slide pose le core message du deck — y revenir à chaque section
-->

---
layout: default
---

### Composition du contexte — 🗂️ statique

<div class="text-sm opacity-70 mt-2">Persistant entre sessions · construit en amont · sous votre contrôle</div>

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3">

#### 🏭 Anthropic

- **Context window** — capacité max (200k Sonnet · 1M Sonnet 1M · 200k Opus)
- **System prompt** — tools disponibles + comportements imposés

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

#### 👥 Repo · partagé via Git

- **`CLAUDE.md`** racine + sous-dossiers (hiérarchique)
- **`AGENTS.md`** standard ouvert multi-outils
- **`.claude/skills | agents | commands/`** — SKILL.md, subagents, slash commands
- **`.mcp.json`** — capabilities des serveurs MCP

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### 👤 Personnel · hors repo

- **`~/.claude/CLAUDE.md`** — préférences globales (tous projets)
- **Auto-Memory** — `~/.claude/projects/<p>/memory/` (patterns appris)

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-4 text-sm">

**Loading progressif** : un fichier n'entre dans le contexte que lorsqu'il est activé (skill déclenchée, command appelée, fichier `@`-mentionné) — jamais tout d'un coup.

</div>

<!--
- 3 sources distinctes : Anthropic (imposé), Repo (équipe, via Git), Personnel (toi seul)
- AGENTS.md = standard ouvert qui converge depuis 2025 (multi-plateformes, équivalent CLAUDE.md)
- Loading progressif : pourquoi un gros .claude/skills/ ne pollue pas le contexte au démarrage
- /context te montre quel composant pèse combien
- À retenir : tout ce qui est "Repo" est commitable → vrai onboarding agentique pour l'équipe
-->

---
layout: default
---

### Composition du contexte — 🌊 dynamique

<div class="text-sm opacity-70 mt-2">Variable durant la session · grossit au fil de la conversation</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-3">

#### 💬 Apporté par l'utilisateur

- **Conversation history** — tous les messages échangés depuis le début
- **@-mentions de fichier** — `@src/app/page.tsx` ajoute un fichier au contexte
- **@-mentions de dossier** — `@components/` ajoute tout un dossier
- **`@web`** — déclenche une recherche web et injecte les résultats

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### 🤖 Apporté par l'agent

- **Tool results** — outputs de Read, Grep, Bash, WebFetch, MCP...
- **Plan Mode artifacts** — plans générés en `Shift+Tab`
- **System reminders** — env, cwd, git status, hooks, todos

</div>

</div>

<div class="border-l-4 border-[#e63946] pl-4 mt-4 text-sm">

**C'est cette partie qui grossit** — d'où le besoin de `/compact` et `/clear`. Surveillance via `/context`.

</div>

<!--
- Distinction utile : ce qui vient de toi (tu peux retirer/limiter) vs ce que l'agent injecte (tu peux compresser)
- Le piège classique : un Read sur un gros fichier ajoute ~10k tokens d'un coup
- @-mentions = précis et économique. Demander à l'agent de "lire le projet" = bourrer le contexte
- /context te dit ce qui pèse — souvent les tool results dominent dans une session active
-->

---
layout: default
---

### Gérer & contrôler le contexte

<div class="text-sm leading-tight mt-3">

| Commande | Action | Quand l'utiliser |
|----------|--------|-------------------|
| `/context` | Tokens utilisés · coût · durée de session | **Voir où va le contexte** — repérer la pollution |
| `/compact` | Compresse l'historique en gardant l'essentiel | Contexte > 40% · même tâche en cours |
| `/clear` | Vide la conversation, repart à zéro | Changement de tâche majeur · contexte > 60% |
| `/memory` | Voir / éditer l'Auto-Memory du projet | Vérifier ce que Claude a retenu — corriger |
| `/skills` | Liste les skills disponibles + activées | Une skill devrait s'auto-activer mais ne le fait pas |
| `/permissions` | Gérer les permissions des outils | Bloquer un `Bash` dangereux · autoriser un MCP |
| `/fork` | Dupliquer la session courante | Explorer une alternative sans perdre le contexte |
| `/resume <id>` | Reprendre une session précédente | Continuer le travail d'hier ou recharger un crash |

</div>

<!--
- /context est LE réflexe d'hygiène quotidien — à utiliser dès qu'on sent que ça rame
- /compact préserve le fil de pensée ; /clear coupe net — choisir selon le besoin
- /memory : surprise fréquente — Claude a retenu des choses fausses, à corriger explicitement
- /fork : super utile en debug ("et si j'essayais autre chose ?") sans perdre la piste actuelle
- À garder en tête : ces commandes existent côté Claude Code. Cursor a ses équivalents (Notepads, @Past Chats)
-->

---
layout: default
---

### La taxonomie des 4 échecs de contexte

<br>

<div class="grid grid-cols-4 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-3">

<div class="text-3xl mb-1">🕳️</div>

#### Missing

Contexte **absent**.

<div class="text-xs opacity-70 mt-2">L'agent invente, recrée des fichiers, hallucine des conventions.</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

<div class="text-3xl mb-1">🌫️</div>

#### Polluted

Contexte **bruité**.

<div class="text-xs opacity-70 mt-2">Trop d'info, l'agent noyé, mélange les patterns (ex : REST + GraphQL).</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

<div class="text-3xl mb-1">🦴</div>

#### Stale

Contexte **périmé**.

<div class="text-xs opacity-70 mt-2">Info obsolète, l'agent ignore les changements récents, utilise l'ancienne API.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

<div class="text-3xl mb-1">⚔️</div>

#### Conflicting

Contexte **contradictoire**.

<div class="text-xs opacity-70 mt-2">Deux sources se contredisent (CLAUDE.md dit Zod, rules dit Yup) — l'agent hésite.</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">

Avant de blâmer le modèle, diagnostique le **contexte**.

</div>

<!--
- Cette taxonomie est issue de M07 — c'est le framework mental le plus utile du deck
- Chaque échec a un symptôme reconnaissable et un remède différent
- Le plus fréquent : Missing dans les petits projets, Polluted dans les gros monorepos
-->

---
layout: default
---

### Symptômes par type d'échec

<div class="text-sm leading-tight mt-4">

| Type | Symptôme observable | Exemple concret |
|------|---------------------|-----------------|
| **🕳️ Missing** | Invente des noms, recrée des fichiers existants | « Je crée `utils.ts` » alors qu'il existe déjà |
| **🌫️ Polluted** | Réponses confuses, surcharge cognitive, mélange de styles | 10 fichiers de rules → mix REST + GraphQL dans la même réponse |
| **🦴 Stale** | Ignore les changements récents, propose du code obsolète | Utilise l'ancienne API au lieu de la version migrée |
| **⚔️ Conflicting** | Alterne entre 2 approches, hésite, change d'avis en cours | `CLAUDE.md` dit Zod, `.cursor/rules` dit Yup |

</div>

<div class="text-center mt-6 text-base text-[#457b9d] font-bold">

Diagnostic d'abord — la solution dépend du type d'échec.

</div>

<!--
- Slide pratique : à montrer en grand quand un·e dev se plaint que "Claude est nul"
- 90% du temps, c'est un de ces 4 patterns
- Pour Polluted : commencer par /clear ou /compact, puis nettoyer les rules
-->

---
layout: default
---

### Diagnostic : « Explain your understanding »

<br>

**Avant de coder, demandez à l'agent de reformuler :**

```text
Avant d'implémenter, explique-moi :
1. Ce que tu comprends de la structure actuelle du projet
2. Les conventions que tu vas suivre
3. Les fichiers que tu vas modifier / créer
4. Les patterns que tu vas utiliser

Attends ma validation avant de coder.
```

<div class="border-l-4 border-[#10b981] pl-4 mt-6 text-sm">

**🎯 Détecte les 4 types d'échec en 30 secondes** — si l'agent se trompe à cette étape, c'est un problème de **contexte**, pas de génération.

</div>

<!--
- C'est la technique unique la plus rentable du deck
- Coût : 30 secondes. Gain : éviter 30 min de code à jeter
- Faire l'exercice en interne sur 2-3 projets pour calibrer ce que renvoie l'agent
-->

---
layout: default
---

### CLAUDE.md hiérarchique

<br>

```text
project/
├── CLAUDE.md                 # Global : commandes, conventions générales
├── src/
│   ├── CLAUDE.md             # Frontend : patterns React, composants
│   └── components/
│       └── CLAUDE.md         # Composants : design system spécifique
├── api/
│   └── CLAUDE.md             # Backend : endpoints, validation
└── docs/
    └── architecture.md       # Vue d'ensemble pour exploration
```

<div class="text-sm opacity-70 mt-6">

Un seul `CLAUDE.md` ne scale pas pour un monorepo. La hiérarchie permet à l'agent de **charger le bon contexte** selon l'endroit où il travaille.

</div>

<!--
- Pattern essentiel pour les monorepos
- Chaque CLAUDE.md ne mentionne QUE ce qui est spécifique à son niveau
- Claude lit automatiquement tous les CLAUDE.md remontant depuis le fichier édité jusqu'à la racine
-->

---
layout: two-cols-header
---

### Contenu par niveau

::left::

#### Racine : `CLAUDE.md` global

```markdown
# CLAUDE.md

## Commands
- `npm run dev` : start all services
- `npm run test` : run all tests

## Structure
- `src/` → Frontend Next.js
- `api/` → Backend Hono

## Conventions globales
- TypeScript strict
- Commits conventionnels
```

::right::

#### Sous-dossier : `src/CLAUDE.md`

```markdown
# src/CLAUDE.md

## Patterns React
- Server Components par défaut
- 'use client' uniquement si nécessaire

## Composants UI
Voir @components/ui/ pour shadcn

## State Management
- URL state pour les filtres
- React Query pour le cache
```

<!--
- À la racine : commandes, structure, conventions générales — ce qui s'applique partout
- En sous-dossier : patterns spécifiques au sous-système — ce qui n'est vrai QUE là
- Règle d'or : ne JAMAIS dupliquer entre niveaux
-->

---
layout: default
---

### Imports `@` — memory files

<div class="text-sm opacity-70 mt-2">Référencer d'autres fichiers depuis un <code>CLAUDE.md</code> — deux stratégies, deux coûts</div>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### 🔗 Import direct — `@fichier`

```markdown
# CLAUDE.md
@docs/AGENTS.md
@docs/CONVENTIONS.md
```

- Contenu **injecté** dans le contexte à chaque session
- Officiellement appelé **memory file** par Anthropic
- ✅ Fiable : l'agent a TOUJOURS la source sous les yeux
- ⚠️ Coûteux : pèse sur le contexte même si non utilisé

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### 📎 Référence douce — lien markdown

```markdown
# CLAUDE.md
Full documentation:
[`docs/AGENTS.md`](docs/AGENTS.md)
```

- L'agent **consulte si pertinent** (via Read)
- ✅ Économique : zéro coût tant que non lu
- ✅ Toujours à jour (lecture à la demande)
- ⚠️ L'agent peut « oublier » de consulter

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-4 text-sm">

**Règle de pouce** : `@import` pour les conventions critiques (style, sécurité) — lien doux pour la doc volumineuse ou rarement utile.

</div>

<!--
- Le terme officiel Anthropic est "memory file" pour les fichiers importés via @
- @ = chargement transitif : un CLAUDE.md qui @ un autre fichier qui @ encore un autre… tout est injecté
- Piège : @docs/ENORME.md ajoute 10k tokens à CHAQUE conversation, même si tu fais une question triviale
- Le CLAUDE.md de ce projet utilise volontairement l'option 2 (lien doux vers docs/AGENTS.md) pour rester léger
- Bonne stratégie : @ pour 1-2 fichiers cruciaux (conventions, sécurité), lien doux pour le reste
-->

---
layout: default
---

### CLAUDE.md vs Auto-Memory

<div class="border-l-4 border-[#457b9d] pl-4 mt-3 text-sm">

**Auto-Memory** = mémoire persistante par projet, introduite avec **Claude Code 2.0+**. Stockée dans `~/.claude/projects/<projet>/memory/`, **mise à jour automatiquement** par Claude au fil des sessions, et consultable via la commande `/memory`.

</div>

<div class="text-sm leading-tight mt-4">

| Aspect | `CLAUDE.md` (projet) | Auto-Memory (perso) |
|--------|----------------------|---------------------|
| **Type** | Manuel, projet | Automatique, appris |
| **Contenu** | Instructions, conventions | Patterns, préférences |
| **Gestion** | Vous l'écrivez | Claude le met à jour |
| **Portée** | Partagé via Git | Personnel — `~/.claude/projects/<p>/memory/` |
| **Exemple** | « TypeScript strict, Hono backend » | « Maxime utilise toujours `bun`, pas `npm` » |

</div>

<div class="border-l-4 border-[#10b981] pl-4 mt-4 text-sm">

**Les deux se complètent** — l'un est partagé avec l'équipe, l'autre est votre contexte personnel.

</div>

<!--
- Auto-Memory = nouveauté Claude Code 2.0+ — bien préciser ça pour ceux qui ont une version antérieure
- L'agent l'enrichit tout seul ("Retiens que j'utilise bun") ou via /memory pour la consulter/éditer
- Distinction utile : ne pas mettre dans CLAUDE.md ce qui est perso (préférences d'éditeur, alias shell)
- Risque de confusion fréquent : "j'ai déjà dit à Claude que..." → c'est dans Auto-Memory, pas dans CLAUDE.md
-->

---
layout: default
---

### Architecture Decision Records (ADRs)

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

```markdown
# ADR-001: Choix bibliothèque de filtres

## Statut
Accepté

## Contexte
Besoin de filtres URL-synced pour
la page événements.

## Décision
Utiliser nuqs pour la gestion
des query params.
```

</div>

<div>

```markdown
## Conséquences

- Tous les filtres utilisent useQueryState
- Pas de useState local pour les filtres
- SSR compatible

## Alternatives considérées
- React Query + URL manuelle → trop verbeux
- Zustand persisté en URL → état double
```

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-4 text-sm">

**L'agent comprend le « pourquoi »** — il ne re-proposera pas une solution alternative à chaque PR.

</div>

<!--
- ADRs = le format standard pour documenter les décisions techniques (depuis ~2017)
- Adopté par GitHub, AWS, Spotify... pas une mode IA
- Mais avec un coding agent, le ROI est x10 : l'agent lit les ADRs et arrête de re-débattre
- Garder courts (1 page max), versionner dans le repo
-->

---
layout: default
---

### ADRs avec Claude Code — mise en œuvre

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### 1. Setup repo

- Créer `docs/adrs/` à la racine
- Y placer `template.md` (Statut · Contexte · Décision · Conséquences · Alternatives)
- Convention : `ADR-XXX-titre-kebab.md`
- Référencer dans `CLAUDE.md` :

```markdown
## Décisions architecturales
Voir `docs/adrs/` — TOUJOURS consulter
avant de proposer une alternative.
```

</div>

<div>

#### 2. Slash command `/adr`

Fichier `.claude/commands/adr.md` :

```markdown
---
description: Crée un ADR depuis le contexte courant
argument-hint: [titre-court]
---

1. Liste `docs/adrs/` → prochain numéro `ADR-XXX`
2. Génère `ADR-XXX-$ARGUMENTS.md` depuis le template
3. Remplis Contexte / Décision / Conséquences
4. Statut par défaut : `Proposed`
5. Liste 2-3 alternatives + trade-offs
```

</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 mt-3 text-sm">

**3. Workflow** : décision en session → `/adr nom-court` → review du draft → status `Accepted` → commit. L'agent **consulte les ADRs** avant de proposer une alternative.

</div>

<!--
- Pattern qui marche : un ADR doit prendre <5 min à rédiger, sinon personne ne le fait
- /adr peut aller plus loin : lire `git diff`, détecter la décision technique, pré-remplir Contexte
- Convention de numérotation strictement croissante pour avoir un historique linéaire
- Pour les gros refactos : un ADR par décision majeure, pas un par PR
- Alternative : skill `adr-writer` (auto-déclenchée) à la place du slash command
-->
