---
layout: section
---

## Skills, Commands & SubAgents

<div class="text-lg opacity-70 mt-4">20 min · l'écosystème d'extension côté repo</div>

---
layout: default
---

### Les 3 primitives d'extension

<br>

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-3">

<div class="text-3xl mb-1">🎯</div>

#### Skills

**Auto-invoquées** — Claude décide seul.

<div class="text-xs opacity-70 mt-2">Packages de capacités activés selon le contexte (description critique).</div>

<div class="text-xs text-[#457b9d] mt-2">Patterns récurrents, bonnes pratiques.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

<div class="text-3xl mb-1">⚡</div>

#### Slash Commands

**Invoquées manuellement** via `/nom`.

<div class="text-xs opacity-70 mt-2">Templates de prompts réutilisables avec arguments.</div>

<div class="text-xs text-[#10b981] mt-2">Workflows ponctuels, actions répétitives.</div>

</div>

<div class="border-l-4 border-[#e63946] pl-3">

<div class="text-3xl mb-1">🤖</div>

#### Subagents

**Délégation** via Task tool.

<div class="text-xs opacity-70 mt-2">Agents spécialisés en contexte isolé.</div>

<div class="text-xs text-[#e63946] mt-2">Tâches lourdes, multi-étapes.</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">

Trois outils complémentaires.

</div>

<!--
- Skills > Commands > Subagents dans l'ordre de l'effort d'écriture
- Skills coûtent rien à utiliser (auto), Commands demandent à se rappeler du nom, Subagents prennent du contexte
- Pour démarrer : 1-2 skills équipe + 2-3 commands courantes + 1-2 subagents spécialisés
- Subagents = primitive d'extension MAIS leur usage relève du multi-agent → détaillés plus loin
-->

---
layout: default
---

### Skills — capacités auto-découvertes

<br>

<div class="text-sm leading-tight mt-2">

| Emplacement | Portée |
|-------------|--------|
| `~/.claude/skills/` | Perso — tous vos projets |
| `.claude/skills/` | Projet — partagé via Git |

</div>

#### Structure d'une Skill

```text
.claude/skills/mon-skill/
├── SKILL.md          # Instructions principales (requis)
├── reference.md      # Documentation complémentaire (optionnel)
└── examples/
    └── sample.md     # Exemples de sorties (optionnel)
```

<div class="text-sm opacity-70 mt-4">

**Loading progressif** : seul `SKILL.md` est chargé au démarrage. Les autres fichiers sont lus à la demande.

</div>

<!--
- Skills sont chargées progressivement → tu peux mettre beaucoup de contexte sans saturer
- Skills perso vs projet : la perso te suit, la projet est partagée avec ton équipe via Git
- Convention : un dossier par skill (pas un seul SKILL.md géant)
-->

---
layout: default
---

### SKILL.md — le format

<br>

```markdown
---
name: explain-code
description: Explains code with diagrams and analogies. Use when the user
  asks "how does this work?" or wants to understand a piece of code.
allowed-tools: Read, Grep, Glob
---

When explaining code, always:
1. **Start with an analogy** — compare to something from everyday life
2. **Draw a diagram** — use ASCII art to show flow
3. **Walk through step-by-step** — explain what happens at each stage
4. **Highlight a gotcha** — what's a common mistake?
```

<div class="border-l-4 border-[#e63946] pl-4 mt-4 text-sm">

**Le champ <code>description</code> est critique** — c'est lui qui déclenche l'activation automatique par Claude.

</div>

<!--
- Le piège : description trop générique → la skill ne se déclenche jamais
- Bonne description : verbe d'action + déclencheur précis + cas d'usage ("Use when...")
- Tester : prompt typique → la skill s'active-t-elle ? Si non, reformuler la description
-->

---
layout: two-cols-header
---

### Agent Skills — le standard ouvert

::left::

#### Le problème (avant)

Chaque outil avait son **propre format** :

- `.cursorrules` (Cursor)
- `CLAUDE.md` (Claude Code)
- `copilot-instructions.md` (GitHub)
- `.windsurfrules` (Windsurf)
- ...

<div class="text-sm opacity-70 mt-3">Impossible de mutualiser les patterns entre outils.</div>

::right::

#### La solution : `.agents/skills/`

- Standard ouvert avec **SKILL.md** unifié
- Package manager : `npx skills install ...`
- Adopté par **35+ plateformes** (Codex, Copilot, Cursor, Claude Code, Continue, Cody, Aider...)

```bash
# Installer une skill communautaire
npx skills install vercel/react-best-practices

# Ou depuis un repo
npx skills install github.com/org/skill-name
```

<!--
- Convergence vers un format commun = bonne nouvelle. La fragmentation 2024 est terminée
- Comme MCP pour les connecteurs, Agent Skills devient le standard pour les capacités
- Ton équipe peut commiter ses skills dans .agents/skills/ et elles marcheront dans tous les outils
-->

---
layout: default
---

### Slash Commands — templates de prompts

<br>

**Emplacement** : `.claude/commands/` (projet) ou `~/.claude/commands/` (perso).

#### Exemple : `.claude/commands/fix-issue.md`

```markdown
---
description: Fix a GitHub issue
argument-hint: [issue-number]
---

Fix issue #$ARGUMENTS.

Steps:
1. Read the issue description with `gh`
2. Explore the relevant code
3. Implement the fix
4. Write tests
5. Commit with "fix: closes #$ARGUMENTS"
```

<div class="text-sm opacity-70 mt-4">

Usage : <code>/fix-issue 42</code> → l'agent suit les étapes définies.

</div>

<!--
- Slash commands = templates de prompts versionnés dans le repo
- Différent des skills : déclenchement explicite par l'utilisateur, pas auto
- Très utile pour standardiser les workflows d'équipe (PR, release, hotfix...)
-->

---
layout: two-cols-header
---

### Slash Commands — variables & namespacing

::left::

#### Variables disponibles

<div class="text-sm leading-tight">

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Tout le texte après `/cmd` |
| `$1`, `$2` | Arguments positionnels |

</div>

<div class="text-sm opacity-70 mt-3">

Permet de paramétrer la commande sans réécrire le prompt.

</div>

::right::

#### Namespacing par sous-dossier

```text
.claude/commands/
├── fix-issue.md      → /fix-issue
├── deploy.md         → /deploy
└── debug/
    ├── api.md        → /debug:api
    └── ui.md         → /debug:ui
```

<div class="text-sm opacity-70 mt-3">

Sous-dossier → namespace `nom:sous-cmd`. Permet d'organiser une bibliothèque de commandes par domaine.

</div>

<!--
- Pattern d'équipe : un namespace par grand domaine (debug, deploy, db, security)
- Permet d'avoir 20+ commandes sans pollution de l'autocomplete
- À combiner avec un README dans .claude/commands/ pour l'onboarding
-->

---
layout: default
---

### Subagents — système multi-agent

<br>

Les Subagents sont des **agents spécialisés** qui tournent dans un **contexte isolé**.
Claude délègue via le **Task tool** et reçoit un résumé en retour.

#### 3 agents intégrés (Claude Code)

<div class="text-sm leading-tight mt-4">

| Agent | Modèle | Accès | Usage |
|-------|--------|-------|-------|
| **Explore** | Haiku | Lecture seule | Recherche rapide dans le code |
| **Plan** | Sonnet | Lecture seule | Collecte de contexte pour planification |
| **General-purpose** | Sonnet | Complet | Tâches multi-étapes complexes |

</div>

<!--
- L'isolation du contexte est la valeur clé : le subagent ne pollue pas ton contexte principal
- Explore = excellent pour les codebases inconnues, ne consomme presque rien
- General-purpose = à utiliser quand tu as besoin de déléguer une vraie tâche
-->

---
layout: default
---

### Créer un subagent personnalisé

<br>

**Fichier** : `.claude/agents/code-reviewer.md`

```markdown
---
name: code-reviewer
description: Expert code review specialist. Use PROACTIVELY after code changes.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer. When invoked:
1. Run `git diff` to identify modified files
2. Focus on security issues, code quality, and performance
3. Provide a prioritized action list

Never suggest changes unrelated to the diff.
```

<div class="text-sm opacity-70 mt-4">

**Pattern** : définir 2-3 agents par projet, commités dans `.claude/agents/` → l'équipe en bénéficie.

</div>

<!--
- Le mot "PROACTIVELY" dans la description fait que Claude l'invoque sans qu'on lui demande
- tools: limiter aux outils nécessaires = plus rapide, moins risqué
- model: Sonnet par défaut, Haiku si la tâche est simple (lint, format)
-->

---
layout: default
---

### Plugin System & Marketplace

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Un plugin contient

- **Skills** + **Subagents**
- **Serveurs MCP**
- **Hooks** + **Rules**
- Packagé et versionné

```bash
# Valider un plugin
claude plugin validate
```

</div>

<div>

#### Cursor Marketplace (v2.5)

Plugins installables en un clic :

- **Amplitude**, **AWS**, **Figma**
- **Linear**, **Stripe**, **Supabase**

<div class="text-xs opacity-70 mt-3">

**Convergence** : le format Skills est devenu le standard commun — un même plugin fonctionne dans Claude Code, Cursor, Copilot, et 35+ plateformes.

</div>

</div>

</div>

<!--
- Plugin = la couche supérieure : tout ton écosystème d'extension en un artefact
- L'analogie : npm package pour les agents
- Marketplace en 2026 = explosion, choisir avec parcimonie (max 10 plugins actifs)
-->
