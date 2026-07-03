---
layout: section-liquid
---

## La stack

<div class="text-lg opacity-70 mt-4">25 min · Cursor vs Claude Code · modes · sandbox · Cloud Agents</div>

---
layout: two-cols-header
---

### Cursor vs Claude Code — deux philosophies

::left::

#### 🖱️ Cursor — IDE-first

- **Fork de VS Code** avec IA partout
- 4 zones : Sidebar · Editor · Panel · IA
- 4 modes : **Ask · Plan · Agent · Debug**
- `Cmd+K` (inline edit), `Cmd+I` (composer)
- **Marketplace** de plugins (v2.5)

<div class="text-sm opacity-70 mt-3">**Force** : édition fine, Tab completion, visualisation diff. Le pair-programmer.</div>

::right::

#### ⌨️ Claude Code — CLI-first

- **Terminal interactif** lancé via `claude`
- Slash commands : `/help`, `/context`, `/memory`
- Plan Mode (`Shift+Tab`) avant exécution
- Worktree isolation (`claude -w`)
- **Background agents** (`Ctrl+J`)

<div class="text-sm opacity-70 mt-3">**Force** : tâches longues, autonomes, scriptables. L'agent qui bosse pendant que tu dors.</div>

<div class="text-center text-sm mt-6 text-[#457b9d] font-bold">

Pas l'un OU l'autre — **les deux** selon le moment.

</div>

<!--
- Erreur classique : choisir un seul outil et le défendre comme une religion
- Pattern qui marche : Cursor pour l'édition de précision, Claude Code pour les tâches autonomes
- Tous les deux utilisent les mêmes modèles dessous (Claude Sonnet/Opus, GPT-4, etc.)
-->

---
layout: default
---

### Les 4 modes de Cursor

<br>

<div class="grid grid-cols-4 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-3">

#### Ask

Poser des questions à Cursor sur la codebase.

<div class="text-xs opacity-70 mt-2">Lecture seule, exploration.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### Plan

Créer des plans détaillés pour accomplir une tâche.

<div class="text-xs opacity-70 mt-2">Sans modifier les fichiers.</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

#### Agent

Planifier, analyser, **construire**.

<div class="text-xs opacity-70 mt-2">Mode par défaut — édite les fichiers.</div>

</div>

<div class="border-l-4 border-[#e63946] pl-3">

#### Debug

Diagnostiquer et corriger les bugs.

<div class="text-xs opacity-70 mt-2">Spécialisé erreur + stack trace.</div>

</div>

</div>

<div class="text-sm opacity-70 mt-8 text-center">

Switcher de mode : <code>Cmd+.</code> · Ouvrir le panneau IA : <code>Cmd+I</code>

</div>

<!--
- Plan et Agent sont les 2 plus utilisés
- Plan = équivalent du Plan Mode de Claude Code
- Debug : utilise les info de Problems panel + Output → diagnostic rapide
-->

---
layout: default
---

### Le workflow recommandé par Anthropic

<br>

<div class="grid grid-cols-4 gap-3 mt-6 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3">

#### 1. Explore

Demander à l'agent d'**explorer** le code sans modifier.

<div class="text-xs opacity-70 mt-2">Lecture, grep, glob, compréhension.</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

#### 2. Plan

Demander un **plan détaillé** avant de coder.

<div class="text-xs opacity-70 mt-2">`Shift+Tab` ou `/plan`.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### 3. Code

Implémenter **étape par étape**.

<div class="text-xs opacity-70 mt-2">Valider chaque diff.</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

#### 4. Commit

Valider et **commiter**.

<div class="text-xs opacity-70 mt-2">Tests + relecture humaine.</div>

</div>

</div>

<div class="text-center mt-8 text-base text-[#e63946] font-bold">

Ne jamais foncer tête baissée — toujours **Explore → Plan** avant d'**implémenter**.

</div>

<!--
- C'est LE workflow officiel d'Anthropic (et de tous les bons coding agents 2026)
- Explore + Plan = 30-40% du temps total, mais évite 80% des bugs
- Si l'agent saute Explore et propose direct du code → demander à reculer
-->

---
layout: default
---

### Plan Mode : planifier avant d'implémenter

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Activation

- **Claude Code** : `Shift+Tab` (toggle) · `/plan`
- **Cursor** : sélecteur de mode → **Plan**
- Indicateur visuel : `⏸ plan mode on`

<div class="text-xs opacity-70 mt-4">Les fichiers ne sont **pas modifiés** en Plan Mode — seul un plan est généré.</div>

</div>

<div>

#### Pourquoi c'est important

- Vous validez l'**approche** avant toute modification
- Vous évitez les implémentations **hors-sujet**
- Vous gardez la main sur les **fichiers à toucher**
- Le plan devient un artefact réutilisable

<div class="text-xs opacity-70 mt-4">**Coût** : 30 secondes. **Gain** : 30 minutes de code à jeter.</div>

</div>

</div>

<!--
- Le mode Plan est gratuit en termes de risque — toujours commencer par là pour les tâches non triviales
- En Cursor, Plan Mode peut produire un fichier .cursor/plans/X.md sauvegardable
- En Claude Code, le plan est rendu dans le chat puis demande validation explicite
-->

---
layout: default
---

### Worktree isolation — <code>claude -w</code>

<br>

```bash
# Lance Claude Code dans un worktree Git isolé
claude -w "Implémente la feature notifications"
```

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div>

#### Comment ça marche

1. Crée un **worktree Git** dans `.claude/worktrees/`
2. L'agent travaille **sans affecter** votre branche courante
3. Vous reviewez le diff et mergez si satisfait

</div>

<div>

#### Idéal pour

- ⚠️ Approches **risquées** (refactor, migration)
- 🚀 Agents **en parallèle** (3 features simultanément)
- 🔀 Tester **plusieurs approches** sans switch de branche

</div>

</div>

<!--
- Pattern game-changer : tu peux lancer 3 worktrees, 3 agents sur 3 features, et reviewer les 3 PRs à la fin
- Compatible avec git worktree natif — tu peux ouvrir les worktrees dans 3 fenêtres Cursor/VS Code
- Si conflit de merge : tu choisis ce qui rentre, l'agent n'a pas pollué main
-->

---
layout: default
---

### Sandbox modes — 3 niveaux d'isolation

<br>

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-3">

<div class="text-3xl mb-1">🔒</div>

#### OS-level

`sandbox-exec` (macOS), `bubblewrap` / `firejail` (Linux).

<div class="text-xs opacity-70 mt-2">L'agent ne peut écrire **que** dans le repo, pas d'accès à `~/.ssh`, `~/.env`.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

<div class="text-3xl mb-1">📦</div>

#### Container

Docker · devcontainers · OrbStack.

<div class="text-xs opacity-70 mt-2">Recommandation officielle Anthropic pour le mode YOLO (`--dangerously-skip-permissions`).</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

<div class="text-3xl mb-1">☁️</div>

#### VM cloud

Cursor Cloud Agents · Anthropic Managed Agents · Devin.

<div class="text-xs opacity-70 mt-2">VMs isolées dans le cloud — pas besoin de garder votre machine allumée.</div>

</div>

</div>

<div class="text-center mt-8 text-base text-[#e63946] font-bold">

Sans sandbox, pas d'**autonomie longue** — c'est l'enabler du multi-agent.

</div>

<!--
- Le mode sandbox est devenu CENTRAL en 2026 — sans lui, pas de long-running autonomous coding
- Choisir le niveau selon le risque : refacto sur prod = container ou VM. Petits tweaks = OS-level suffit
- Cursor a son privacy mode + sandbox intégré ; Claude Code utilise sandbox-exec sur macOS récent
-->

---
layout: default
---

### Modèles & coûts — ce qu'il faut savoir

<br>

<div class="grid grid-cols-2 gap-8 mt-2 text-sm">

<div>

#### Choisir son modèle

```bash
> /model       # Sélecteur (ou Alt+P)
> /context     # Tokens utilisés, coût, durée
> /compact     # Compresser le contexte
> /clear       # Repartir de zéro
```

<div class="text-xs opacity-70 mt-3">Suivre sa consommation en temps réel évite les surprises de facture.</div>

</div>

<div>

#### Quel modèle pour quoi

<div class="text-sm leading-tight">

| Modèle | Usage | Coût |
|--------|-------|------|
| **Haiku** | Tâches simples, rapide | $ |
| **Sonnet** | Usage quotidien | $$ |
| **Opus** | Problèmes complexes | $$$ |

</div>

<div class="text-xs opacity-70 mt-3">Pour les subagents : **Haiku** pour la recherche, **Sonnet** pour le code, **Opus** pour l'architecture.</div>

</div>

</div>

<!--
- L'erreur fréquente : tout faire avec Opus. Trop cher, trop lent pour 90% des tâches
- Stratégie : Sonnet par défaut, Opus uniquement sur le 10% de tâches qui en valent la peine
- /compact est ton ami : au lieu de /clear (perte de contexte), il garde l'essentiel
-->

---
layout: default
---

### Cloud Agents (2026)

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Le principe

Agents qui tournent sur des **VMs isolées dans le cloud** — pas besoin de garder votre machine allumée.

Avec **Computer Use**, l'agent exécute et teste **visuellement**, et livre screenshots, vidéos, logs.

<div class="text-xs opacity-70 mt-3">Cursor Cloud Agents · Anthropic Managed Agents · GitHub Copilot Workspace · Devin.</div>

</div>

<div>

<div class="text-sm leading-tight">

| Métrique | Valeur |
|----------|--------|
| **Agents en parallèle** | 10-20 simultanés |
| **Résultat** | PRs merge-ready |
| **Usage interne Cursor** | 35% des PRs |
| **Bugbot Autofix** | 35% mergés auto |

</div>

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-6 text-sm">

**Workflow type** : décrire la tâche → Cloud Agent fork + code + teste → vous recevez une PR à reviewer.

</div>

<!--
- Cloud Agents = lame de fond 2026. 35% des PRs internes Cursor sont générées par leurs Cloud Agents (Fév 2026)
- Anthropic Managed Agents = équivalent côté Anthropic, intégré à Claude Code
- Question éthique : si l'agent fait 35% du code, qui est responsable ? → toujours human-in-the-loop sur le merge
-->

---
layout: default
---

### Matrice de décision — quel outil pour quel moment

<div class="text-sm leading-tight mt-4">

| Situation | Outil recommandé | Pourquoi |
|-----------|------------------|----------|
| Édition fine ligne par ligne | Cursor (Cmd+K) | Inline edit ultra-rapide |
| Refactor multi-fichiers | Claude Code (Plan Mode + worktree) | Isolation, plan validable |
| Tâche autonome longue | Claude Code (`-w` + background) | Tourne pendant que tu fais autre chose |
| Tester une approche risquée | Claude Code + worktree + sandbox | Aucun impact sur ta branche |
| Tâche à scheduler / cron | Cloud Agent | Ne dépend pas de ta machine |
| Pair-programming en réunion | Cursor (Composer visible) | Démo collective fluide |
| Bug obscur | Cursor Debug mode + Claude Code en parallèle | 2 angles de diagnostic |

</div>

<!--
- Cette matrice est subjective — chaque dev forge la sienne en 2-3 semaines d'usage
- Ne pas se laisser enfermer dans un seul outil ; les forces se complètent
- Pour les équipes : standardiser les conventions (CLAUDE.md, skills) plus que les outils
-->
