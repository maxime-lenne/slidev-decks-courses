# GenAI - Agentic Coding — Plan de présentation

**Durée :** 2h30 (cible — fenêtre 2-3h)
**Audience :** Devs expérimentés, formation interne entreprise — cible **AI Builders** (coding agents)
**Format :** Conférence/talk avec **démo d'ouverture avant les slides** (1 seule demo, en intro)
**Niveau de code sur les slides :** Modéré — extraits clés (CLAUDE.md, SKILL.md, hooks JSON, configs subagent, MCP)
**Langue :** Français
**Thème :** maxime-lenne
**Cover :** `https://images.unsplash.com/photo-1680783954745-3249be59e527?w=1920` — mains humain + robot (écho "Agent = vrai teammate")

---

## Core Message

> « Le contexte est le nouveau code. »
>
> La qualité de ce qu'un agent produit ne dépend plus du prompt, mais de l'infrastructure que tu lui fournis : contexte (CLAUDE.md, skills, ADRs), connecteurs (MCP), garde-fous (hooks, sandbox), et boucle de vérification (les 8 piliers).

## Call to Action — 2 chantiers à lancer dès demain

1. **Construire le contexte de tous vos projets** — créer les `CLAUDE.md` (racine + sous-dossiers) et choisir les skills propres aux besoins entreprise / projet / persona / workflow.
2. **Organiser et automatiser la boucle de vérification** — choisir son tooling, éviter les dérapages, auditer son agent-readiness avec la checklist des 8 piliers.

---

## Sources utilisées

| Source | Description | Sections où l'utiliser |
|--------|-------------|------------------------|
| `M04 - Focus Cursor.pdf` | Interface Cursor, 4 modes, layout presets, Cloud Agents (Fév 2026) | §3 La stack |
| `M05 - Focus Claude Code.pdf` | CLI, CLAUDE.md, Auto-Memory, worktree isolation, escape, modèles & coûts | §1 intro, §3 La stack |
| `M06 - Skills, Commands & Subagents.pdf` | Skills, Slash Commands, Subagents, plugin system, workflow multi-agent | §4 Extensibilité |
| `M07 - Context Engineering.pdf` | Taxonomie des 4 échecs, CLAUDE.md hiérarchique, ADRs, pipeline research/synthesis/spec | §2 Contexte |
| `M08 - PRD - Spécifier pour mieux générer.pdf` | Spec-First, 6 frameworks (BMAD, Spec Kit…), template PRD, Socratique | §7 Spec-Driven |
| `M09 - MCP - Connecter l'agent au monde réel.pdf` | Architecture host/client/server, primitives, exemples | §6 MCP |
| `M11 - Testing - Valider le code généré.pdf` | Validation du code généré | §8 8 piliers |
| `LinkedIn Carousel – Hooks Claude Code.pdf` | Hooks PreToolUse/PostToolUse, setup `/hooks`, notifs macOS, voix Zarvox | §5 Hooks |
| `8-pillars-checklist.md` (Upsun, Apache V2) | Testing, Docs, Code Quality, Build, Dev Env, Observability, Security, Standards — scoring + readiness levels | §8 8 piliers |
| `2026 Agentic Coding Trends Report.pdf` | Macro-contexte 2026 | §1 intro, §9 CTA |
| `Anthropic Managed Agents — Shubham Sharma.pdf` | Cloud agents Anthropic, pattern review multi-agent | §3 Cloud Agents, §6 multi-agents |
| `Architecture multi-agents IA — Shubham Sharma.pdf` | Patterns d'orchestration multi-agents | §4/§6 multi-agents |
| `Claude Code Dynamic Workflows — Shubham Sharma.pdf` | Workflows Claude Code 2026 | §3, §4 |
| `Claude Code Skills — Shubham Sharma.pdf` | Standard Agent Skills, 35+ plateformes | §4 Skills |
| `Context engineering — Shubham Sharma.pdf` | Guide complet 2026 | §2 Contexte |
| `Context Engineering pour le développement assisté par IA — Hoko Blog.pdf` | Analyse comparative Cursor / Claude Code / Copilot / Windsurf / Cline | §2, §3 |
| `Spec-Driven Development — 6 Frameworks AIDD — Hoko Blog.pdf` | Comparatif détaillé des 6 frameworks AIDD | §7 Spec-Driven |
| `Tout_sur_les_Agents.pdf` | Fondamentaux des agents (ReAct, tools, mémoire) | §1 architecture agent |
| `costs.pdf`, `cursor.pdf`, `mcp.pdf`, `prd.pdf`, `prompting.pdf`, `context-engineering.pdf` | Slides condensées de référence | Appoint dans plusieurs sections |

---

## Time Allocation

| # | Section | Durée | Slides | Focus |
|---|---------|-------|--------|-------|
| 0 | **Demo d'ouverture (live, avant slides)** | 10 min | 0 | Hook : "Que vient-il de se passer ?" |
| 1 | Setup & positionnement | 15 min | 7 | 3 cibles formations, archi agent (ReAct), programme |
| 2 | Le contexte est le nouveau code | 20 min | 8 | 4 échecs, CLAUDE.md hiérarchique, ADRs |
| 3 | La stack de l'AI Builder | 25 min | 10 | Cursor vs Claude Code, modes, sandbox, Cloud Agents |
| 4 | Skills · Commands · Subagents | 25 min | 10 | Les 3 primitives + plugin system |
| 5 | Hooks : fermer la boucle | 12 min | 6 | LinkedIn carousel pattern |
| 6 | MCP & Multi-agents | 15 min | 7 | Connecteurs + pattern review multi-agent |
| 7 | Spec-Driven Development | 15 min | 7 | Spec > Code, 6 frameworks, matrice de choix |
| 8 | Les 8 piliers de la vérification | 15 min | 7 | Karpathy, scoring, checklist Upsun |
| 9 | Mise en pratique — 2 CTA | 10 min | 5 | Plan d'action 30/60/90 jours |
| 10 | Présentation Maxime & Q&A | 8+ min | 3 | Template présentation + closing |
| | **Total** | **~150 min** | **~70 slides** | |

---

## Section 0 — Démo d'ouverture (live, 10 min, 0 slide)

### Le scénario (avant la première slide)

Lancer Claude Code sur un projet (idéalement un projet réel mais minimal), taper une demande qui déclenche **en cascade** :

1. Une **Skill** s'auto-active (badge `using skill`)
2. Un **subagent** part en arrière-plan (Ctrl+J / Task)
3. Un **serveur MCP** est appelé (Context7 / GitHub)
4. Un **hook** notifie via la voix synthétique macOS quand l'agent demande une permission
5. Le résultat arrive — code + tests + diff propre à reviewer

### Talking points

- « Pas un mot d'explication, on regarde. »
- Laisser quelques silences pour que les yeux suivent.
- Conclure par : **« Comment on en est arrivé là ? Ce qu'on vient de voir, c'est 4 ans de virages dans le métier de dev. C'est ça qu'on va décortiquer. »**

### Backup si la demo casse

- Capture vidéo pré-enregistrée du même scénario (à préparer la veille).
- Capture d'écran du résultat final + screencast accéléré x4.

---

## Section 1 — Setup & positionnement (15 min, 7 slides)

### Key points

- Ouvrir avec une slide cover percutante, puis poser le décor.
- Situer cette session dans le paysage des 3 formations parallèles : on parle d'AI Builders, pas d'AI Engineers ni de l'usage métier.
- **Rappeler vite** ce qu'est un agent (boucle ReAct + tools) — sans refaire un cours LLM, juste un rappel visuel + renvoi vers le deck `genai-llm-introduction`.
- Annoncer le programme et le core message.

### Visuels nécessaires

- [ ] Slide cover (layout `cover`, fond Unsplash mains humain+robot, titre H1 + sous-titre)
- [ ] Slide "que vient-il de se passer ?" — capture du terminal final de la démo
- [ ] **Diagramme 3 cibles** (3 colonnes : Métiers / AI Builders / AI Engineers) avec mise en évidence du milieu
- [ ] **Schéma ReAct** : boucle `Pensée → Action → Observation → …` + tools attachés
- [ ] Sommaire visuel (9 sections avec icônes)

### Talking points

- Le titre du deck (« Agentic Coding ») n'est pas un buzzword : 78% des équipes enterprise utilisent déjà des outils AI (GitLab Research 2025), +32% de vélocité moyenne.
- « Vous êtes ici » — les AI Builders ne créent pas des agents (ça c'est les AI Engineers), ils en **utilisent** pour coder. Mais ça demande des nouvelles compétences.
- ReAct = squelette de tout coding agent (Claude Code, Cursor Agent, Copilot Workspace…) — on n'a pas besoin de plus pour la suite.

### Source

- `M04`/`M05` (intro), `Tout_sur_les_Agents.pdf` (ReAct), `2026 Agentic Coding Trends Report.pdf` (stats)
- Renvoi : deck **`genai-llm-introduction`** pour les bases LLM

---

## Section 2 — Le contexte est le nouveau code (20 min, 8 slides)

### Key points

- Évolution : Prompt engineering → **Context engineering**. Le prompt ne fait plus la différence, le contexte oui.
- Taxonomie des 4 échecs : **Missing, Polluted, Stale, Conflicting**.
- Diagnostic : technique **"Explain your understanding"** avant de coder.
- Solutions : `CLAUDE.md` hiérarchique (project / sous-dossier), **ADRs**, séparation `CLAUDE.md` (équipe) vs Auto-Memory (perso).

### Visuels nécessaires

- [ ] Slide section "Le contexte est le nouveau code"
- [ ] **Diagramme évolution** : Prompt Eng → Context Eng (frise temporelle)
- [ ] **Diagramme 4 quadrants** : Missing / Polluted / Stale / Conflicting (cartes avec icônes)
- [ ] **Table symptômes** : type d'échec → symptômes → exemple (de M07)
- [ ] **Bloc code** : prompt "Explain your understanding" (M07 slide 6)
- [ ] **Arborescence ASCII** : `project/CLAUDE.md`, `src/CLAUDE.md`, `api/CLAUDE.md` (M07 slide 15)
- [ ] **Bloc code** : exemple d'ADR-001 (M07 slide 17)

### Talking points

- L'agent ne "comprend" pas — il pattern-matche. Si le contexte ment, l'output ment.
- L'erreur la plus fréquente : un seul gros `CLAUDE.md` à la racine. Ça ne scale pas pour un monorepo.
- ADR = pourquoi avant quoi. L'agent arrête de re-proposer des alternatives à chaque fois.

### Source

- `M07 - Context Engineering.pdf` (cœur de la section)
- `Context engineering — Shubham Sharma.pdf` (compléments 2026)
- `Context Engineering pour le développement assisté par IA — Hoko Blog.pdf` (analyse comparative)

---

## Section 3 — La stack de l'AI Builder (25 min, 10 slides)

### Key points

- Deux philosophies majeures : **Cursor** (IDE) vs **Claude Code** (CLI). Ni l'un ni l'autre : les deux, selon le moment.
- Les **4 modes** de Cursor : Ask / Plan / Agent / Debug (M04 slide 12).
- **Workflow Anthropic** : Explore → Plan → Code → Commit (M05 slide 16). Toujours en mode Plan avant d'écrire.
- **Worktree isolation** (`claude -w`) — agents en parallèle sans casser ta branche.
- **Sandbox modes** : `sandbox-exec` macOS, devcontainers, Cloud Agents (Cursor Fév 2026, Anthropic Managed Agents). Pourquoi c'est devenu central.
- Modèles & coûts : Haiku / Sonnet / Opus, `/context` pour suivre, `/compact` pour gérer.

### Visuels nécessaires

- [ ] Slide section
- [ ] **Tableau comparatif Cursor vs Claude Code** : philosophie, interface, modes, points forts
- [ ] **Diagramme 4 modes Cursor** (Ask/Plan/Agent/Debug — M04 slide 12)
- [ ] **Diagramme workflow Explore→Plan→Code→Commit** (M05 slide 16) — animation séquentielle
- [ ] **Bloc code** : `claude -w "Implémente les notifications"` + explication worktree
- [ ] **Diagramme sandbox layers** : OS-level (sandbox-exec) / Container (devcontainer) / VM (Cloud Agents) — 3 niveaux d'isolation
- [ ] **Table coûts & modèles** (M05 slide 19) : Haiku / Sonnet / Opus + `/context` + `/compact`
- [ ] **Slide Cloud Agents** (M04 slide 19) : VMs isolées, Computer Use, 10-20 agents simultanés
- [ ] **Slide workflow Cloud Agent** (M04 slide 20)
- [ ] **Slide récap** : "Quel outil pour quel moment ?" (matrice de décision)

### Talking points

- Sandbox = enabler du **long-running autonomous coding**. Sans sandbox, le multi-agent serait ingérable côté permissions.
- Cloud Agents : 35% des PRs internes Cursor sont générées par leurs Cloud Agents (M04 slide 19).
- Le mode Plan (Shift+Tab) est **gratuit** en termes de risque — toujours commencer par là sur les tâches complexes.

### Source

- `M04 - Focus Cursor.pdf` (slides 5-20)
- `M05 - Focus Claude Code.pdf` (slides 5-20)
- `Claude Code Dynamic Workflows — Shubham Sharma.pdf`
- `Context Engineering pour le développement assisté par IA — Hoko Blog.pdf` (comparatif 5 plateformes)

---

## Section 4 — Skills · Commands · Subagents (25 min, 10 slides)

### Key points

- Vue d'ensemble : Skills (auto-invoquées) + Commands (manuel `/nom`) + Subagents (délégation isolée). Les **3 primitives d'extension**.
- **Skills** : packages auto-découverts dans `.claude/skills/` ou `~/.claude/skills/`. Le champ `description` du SKILL.md est **critique**.
- Le **standard ouvert Agent Skills** (`.agents/skills/`) — adopté par 35+ plateformes (Codex, Copilot, Cursor, Claude Code…). Convergence vers un format unique.
- **Slash Commands** : templates de prompts en markdown. `$ARGUMENTS`, namespacing par sous-dossier.
- **Subagents** : agents spécialisés en contexte isolé. 3 agents intégrés (Explore/Plan/General-purpose). Créer ses propres `code-reviewer`, `test-writer`, `security-checker`.
- **Plugin System** : packager Skills + Subagents + MCP + Hooks + Rules en un seul artefact installable.

### Visuels nécessaires

- [ ] Slide section
- [ ] **Diagramme 3 primitives** (3 cartes Skills/Commands/Subagents — M06 slide 3)
- [ ] **Bloc code SKILL.md** (M06 slide 6) — surlignage du champ `description`
- [ ] **Diagramme** : Skills auto-découvertes vs Commands manuelles vs Subagents délégués
- [ ] **Bloc code .claude/commands/fix-issue.md** (M06 slide 11)
- [ ] **Table variables** Slash Commands (M06 slide 12)
- [ ] **Bloc code subagent code-reviewer** (M06 slide 15) — frontmatter complet
- [ ] **Diagramme orchestration** : Agent principal → Subagents en parallèle (Haiku/Sonnet/Opus) → résultats
- [ ] **Slide Plugin System** (M06 slide 9) — Cursor Marketplace
- [ ] **Slide pattern** : 2-3 agents par projet, commités dans `.claude/agents/` (M06 slide 19)

### Talking points

- La règle : Skills pour les **patterns récurrents** (toujours formater les diffs, toujours écrire des tests), Commands pour les **workflows ponctuels** (`/deploy staging`), Subagents pour les **tâches qui méritent leur propre contexte**.
- Le champ `description` d'une Skill est ce que Claude lit pour décider d'activer la skill. Soigner cette ligne >> tout le reste.
- Pattern equipe : commiter 2-3 subagents dans `.claude/agents/` = onboarding agentique pour les nouveaux devs.

### Source

- `M06 - Skills, Commands & Subagents.pdf` (cœur de la section)
- `Claude Code Skills — Shubham Sharma.pdf` (standard ouvert, écosystème)
- `Architecture multi-agents IA — Shubham Sharma.pdf` (patterns)

---

## Section 5 — Hooks : fermer la boucle (12 min, 6 slides)

### Key points

- Le problème : **les agents ne sont pas autonomes à 100%** — il y a des moments où ils ont besoin de toi (permission, info, fin de tâche). Tu ne peux pas les regarder en permanence.
- La solution : **les hooks** = scripts shell déclenchés sur des événements (PreToolUse, PostToolUse, Notification, Stop, …).
- 3 patterns clés : `permission_prompt` (validation), `elicitation_dialog` (info supplémentaire), `Stop` (fin de tâche).
- Setup express : `/hooks` → matcher → commande shell. 2 minutes.
- Hack signature de Maxime : **notification vocale macOS** (`say -v Zarvox 'Human, I need more information'`).
- **Agent = vrai teammate** — c'est toi qui décides quand interagir.

### Visuels nécessaires

- [ ] Slide section (reprendre l'esthétique du carousel LinkedIn)
- [ ] **Slide "Les agents ne sont pas autonomes à 100%"** — le vrai sujet = le timing humain (carousel slide 2)
- [ ] **Diagramme 3 hooks clés** : permission_prompt / elicitation_dialog / Stop (carousel slide 3)
- [ ] **Bloc code** settings.json avec hook notif macOS (carousel slide 5)
- [ ] **Bloc code** voix synthétique Zarvox (carousel slide 6) + table voix dispo
- [ ] **Slide à retenir** : "Les hooks changent tout — Agent = teammate" (carousel slide 8)

### Talking points

- Garde un peu d'humour sur Zarvox/Trinoids — c'est aussi un signal de fin de session reconnaissable de loin.
- Hooks utilisables aussi pour : **bloquer** une commande dangereuse (PreToolUse + matcher `Bash` + check `rm -rf`), **lancer un lint** après un Edit, **commit auto-format** après Stop.

### Source

- `LinkedIn Carousel – Hooks Claude Code – Maxime Lenne.pdf` (cœur — c'est ton propre contenu, garde la signature visuelle)

---

## Section 6 — MCP & Multi-agents (15 min, 7 slides)

### Key points

- Le problème : un agent dans sa bulle ne peut pas lire ton Jira, créer une PR GitHub, ou interroger ta DB.
- **MCP = Model Context Protocol** : standard d'Anthropic pour connecter agents et services externes.
- Architecture **host / client / server** (3 rôles), primitives **tools / resources / prompts** côté serveur, **sampling / elicitation / roots / logging** côté client.
- Serveurs populaires (à mentionner sans deep-dive — c'est couvert dans le deck dédié) : GitHub, Context7, Linear, Stripe, Figma, Chrome DevTools, Supabase.
- **Multi-agents en pratique** : subagents + worktrees + MCP = équipe d'agents autonome sur une même codebase.
- Le pattern **review multi-agent** (Anthropic Managed Agents) : un agent code, un autre review, un troisième teste — tout en parallèle.

### Visuels nécessaires

- [ ] Slide section
- [ ] **Diagramme architecture MCP** : Host (Claude Code) ↔ Client ↔ Server ↔ API externe (M09)
- [ ] **Diagramme primitives** : server (tools/resources/prompts) + client (sampling/elicitation/roots/logging)
- [ ] **Galerie serveurs MCP** : logos GitHub / Context7 / Linear / Stripe / Figma / Supabase / Chrome
- [ ] **Diagramme multi-agent orchestration** : Agent principal → Subagent code (worktree A) + Subagent review (worktree B) + Subagent tests (worktree C) → merge
- [ ] **Bloc texte** : Cloud Agents Anthropic Managed Agents — VMs isolées, Computer Use, PR ready
- [ ] **Slide récap** : renvoi vers deck `genai-ai-engineer-mcp-deep-dive` pour le deep-dive complet

### Talking points

- MCP est encore jeune (~1 an) mais l'adoption est massive. C'est le **standard**.
- Pour un AI Builder, l'usage typique = installer 3-5 MCPs (Context7, GitHub, le SaaS interne) — pas en créer.
- Multi-agent ≠ buzzword. C'est concret : tu ouvres 3 worktrees, 3 agents bossent sur 3 features sans se marcher dessus, tu reviews les 3 PRs à la fin.

### Source

- `M09 - MCP - Connecter l'agent au monde réel.pdf`
- `Anthropic Managed Agents — Shubham Sharma.pdf`
- `Architecture multi-agents IA — Shubham Sharma.pdf`
- Renvoi : deck **`genai-ai-engineer-mcp-deep-dive`** déjà publié

---

## Section 7 — Spec-Driven Development (15 min, 7 slides)

### Key points

- Le problème du prompting direct (M08 slide 4) : « Fais-moi une feature de login » → code bancal, manque de cas limites.
- **Spec-First Development** (Dexter Horthy quote) : la spec est la source de vérité, le code n'est que son implémentation.
- **Review specs > review code** : 200 lignes de markdown en 20 min vs 2000 lignes de Go en 2-4h.
- ROI mesuré : **-40 à 60% bugs prod**, -50% refactoring, +30% vélocité (LogRocket 2025, GitLab 2025).
- Les **6 frameworks AIDD** : BMAD, Spec Kit, OpenSpec, Kiro (AWS), GSD, Task Master.
- Matrice de choix : selon contexte (solo, équipe, enterprise, AWS, brownfield…) → quel framework.

### Visuels nécessaires

- [ ] Slide section "Spec > Code"
- [ ] **Slide problème prompting direct** (M08 slide 4) — table "ce qu'on voudrait" vs "ce que l'agent comprend"
- [ ] **Slide citation Dexter Horthy** (M08 slide 5)
- [ ] **Slide review specs vs review code** (M08 slide 6) — comparaison 2 cartes
- [ ] **Slide ROI** (M08 slide 7) — 3 stats clés + chiffres
- [ ] **Slide 6 frameworks** (M08 slide 8) — 6 cartes avec point fort de chacun
- [ ] **Slide matrice de choix** (M08 slide 9) — table contexte → framework

### Talking points

- Spec-driven n'est PAS du waterfall. La spec évolue avec le code, dans le repo, à chaque PR.
- Le temps passé sur les specs est un **investissement, pas un coût**.
- Pour démarrer : OpenSpec ou GSD si tu es solo, BMAD ou Task Master si tu es en équipe avec besoin de traçabilité.

### Source

- `M08 - PRD - Spécifier pour mieux générer.pdf` (cœur — slides 4-15)
- `Spec-Driven Development — 6 Frameworks AIDD — Hoko Blog.pdf` (comparatif détaillé)
- `2026-02-10-ai-day-spec-driven-validation.pdf` (retours terrain)

---

## Section 8 — Les 8 piliers de la vérification (15 min, 7 slides)

### Key points

- Question centrale : **« Pourquoi un agent reste cantonné à des tâches simples sur mon repo, alors qu'il en fait 10x plus chez mon collègue ? »** → Réponse : verification infrastructure.
- **Karpathy** : *"Software 1.0 easily automates what you can specify. Software 2.0 easily automates what you can verify."*
- **Les 8 piliers** (8-pillars-checklist Upsun, Apache V2) : Testing · Documentation · Code Quality · Build Systems · Dev Environment · Observability · Security · Standards.
- Scoring (10 pts / pilier, 80 max) + 3 readiness levels : Basic (<32) / Ready (33-56) / Advanced (>56).
- Priorité d'amélioration : **Testing > Build > Code Quality > Documentation** (highest leverage).
- Reliage explicite : Skills/Hooks/MCP/Subagents/Spec-Driven → quels piliers ils renforcent (table de synthèse).

### Visuels nécessaires

- [ ] Slide section "L'autonomie dépend de la vérification"
- [ ] **Slide quote Karpathy** (grosse typo, fond sombre)
- [ ] **Diagramme 8 piliers** : 8 cartes en grille 4×2 avec icônes (Testing, Docs, Quality, Build, DevEnv, Obs, Security, Standards)
- [ ] **Table scoring** : 3 niveaux (Basic/Ready/Advanced) avec ce que ça implique en termes d'autonomie agent
- [ ] **Slide priorisation** : 4 piliers prioritaires (Testing > Build > Quality > Docs) avec justification
- [ ] **Table de reliage** : pilier → outils vus dans ce deck qui le renforcent (ex: Pilier Testing → subagent test-writer + hook post-edit ; Pilier Standards → CLAUDE.md + skills équipe)
- [ ] **Slide CTA** : "Téléchargez la checklist + scorez votre projet ce soir" (lien)

### Talking points

- Le pilier le plus négligé : **Standards**. Sans conventions explicites, l'agent invente. Avec, il copie. Le but : que l'agent travaille comme votre meilleur dev sénior.
- **Software 2.0 automates what you can verify** — si tu ne peux pas vérifier que c'est bon, tu ne peux pas déléguer.
- Les humains compensent une infra manquante avec intuition + workarounds. **Les agents, eux, ne compensent pas.** D'où l'importance.

### Source

- `8-pillars-checklist.md` (cœur — Upsun, Apache V2)
- `M11 - Testing - Valider le code généré.pdf`
- Référence externe : Karpathy "Verifiability", Jason Wei "Asymmetry of Verification"

---

## Section 9 — Mise en pratique : vos 2 chantiers (10 min, 5 slides)

### Key points

- Reformuler les **deux CTA** du début, maintenant que tout est posé :
  - **Chantier 1 — Construire le contexte de vos projets**
  - **Chantier 2 — Organiser la boucle de vérification**
- Donner une **roadmap 30/60/90 jours** concrète et activable.
- Lister les ressources clés (téléchargeables, lectures, decks compagnons).

### Visuels nécessaires

- [ ] Slide section "Vos 2 chantiers"
- [ ] **Slide chantier 1** : CLAUDE.md + skills sur-mesure
  - Auditer ses projets (combien ont un CLAUDE.md ? hiérarchique ?)
  - Identifier 3-5 patterns récurrents → en faire des skills
  - Commiter dans `.claude/skills/` et `.claude/agents/`
- [ ] **Slide chantier 2** : audit 8 piliers
  - Télécharger checklist Upsun → scorer
  - Identifier les 2 piliers prioritaires
  - 1 sprint = 1 pilier amélioré
- [ ] **Slide roadmap 30/60/90 jours** :
  - **30j** : CLAUDE.md hiérarchique commité partout + 3 skills équipe + score 8 piliers
  - **60j** : 2-3 subagents équipe + hooks pour la boucle de validation + 1 MCP métier
  - **90j** : pattern multi-agent sur une feature complète + 1 framework spec-driven adopté
- [ ] **Slide ressources** :
  - 8-pillars-checklist (Upsun)
  - LinkedIn Carousel Hooks (Maxime Lenne)
  - Decks compagnons : `genai-llm-introduction`, `genai-ai-engineer-mcp-deep-dive`
  - Frameworks : OpenSpec, Spec Kit, BMAD

### Talking points

- « Ne sortez pas en disant "il faut tout faire". Sortez en sachant **par où commencer** demain matin. »
- Le chantier 1 (contexte) sans le chantier 2 (vérification) = agent qui fait des bêtises plus vite.
- Le chantier 2 sans le chantier 1 = agent qui ne sait rien faire de votre stack.

### Source

- Synthèse de toutes les sources précédentes

---

## Section 10 — Présentation Maxime & Q&A (8+ min, 3 slides)

### Key points

- **Slide présentation** : reprendre le template `decks/templates/slides.md` (id=`presentation`, two-cols-header avec photo + bio + liens + QR LinkedIn).
- **Slide closing** : reprendre le template `layout: end` du template — *"Let's build together"*.
- **Q&A** ouvert sur 5+ min.

### Visuels nécessaires

- [ ] **Slide Présentation Maxime** (template `decks/templates/slides.md` ligne 1-44) — adapter le pitch à "agentic coding" (CTO/PE, +20 ans tech, formation AI Builders)
- [ ] **Slide closing "Let's build together"** (template ligne 45-74) — fond Unsplash mains + QR LinkedIn
- [ ] (Optionnel) Slide Q&A intermédiaire — visuel sobre

### Source

- `decks/templates/slides.md`

---

## Diagrammes à créer (synthèse pour /slidev:create)

1. **3 cibles formations** (§1) — 3 colonnes Métiers / AI Builders / AI Engineers, milieu mis en évidence. Type : 3 cartes en `grid grid-cols-3`.
2. **Boucle ReAct** (§1) — schéma cyclique Pensée → Action → Observation. Type : Mermaid `graph LR` avec boucle.
3. **Évolution Prompt Eng → Context Eng** (§2) — frise temporelle 2-3 étapes. Type : flèche horizontale.
4. **Taxonomie 4 échecs** (§2) — 4 cartes Missing/Polluted/Stale/Conflicting. Type : `grid grid-cols-4` (déjà existe dans M07).
5. **Arborescence CLAUDE.md hiérarchique** (§2) — ASCII tree dans un `<pre>` (déjà existe dans M07).
6. **Workflow Anthropic** (§3) — Explore → Plan → Code → Commit (déjà existe dans M05). Type : 4 cartes flèche.
7. **Sandbox layers** (§3) — 3 niveaux OS / Container / VM. Type : 3 cartes empilées avec icônes.
8. **3 primitives d'extension** (§4) — Skills / Commands / Subagents. Type : 3 cartes (déjà dans M06).
9. **Orchestration multi-agent** (§4 et §6) — Agent principal + 3 subagents en parallèle. Type : Mermaid `graph TD`.
10. **3 hooks clés** (§5) — permission_prompt / elicitation_dialog / Stop. Type : 3 lignes avec flèches.
11. **Architecture MCP** (§6) — Host ↔ Client ↔ Server ↔ API. Type : Mermaid `graph LR` 4 nœuds.
12. **6 frameworks AIDD** (§7) — 6 cartes BMAD/SpecKit/OpenSpec/Kiro/GSD/TaskMaster (déjà dans M08).
13. **Matrice de choix framework** (§7) — table contexte → framework (déjà dans M08).
14. **8 piliers** (§8) — grille 4×2 avec icônes par pilier.
15. **Table reliage piliers ↔ outils** (§8) — pilier × outil (skills/hooks/MCP/subagent/spec).
16. **Roadmap 30/60/90** (§9) — 3 colonnes calendrier.

---

## Code Examples à inclure

| # | Example | Langage | Usage | Source |
|---|---------|---------|-------|--------|
| 1 | `claude --version` | bash | Vérifier l'install Claude Code | M05 |
| 2 | `@src/app/page.tsx Explique ce fichier` | Claude Code prompt | Mentionner un fichier | M05 |
| 3 | `claude -w "Implémente les notifications"` | bash | Worktree isolation | M05 |
| 4 | `~/.claude/CLAUDE.md` + `./CLAUDE.md` hiérarchique | markdown | CLAUDE.md hiérarchique | M07 |
| 5 | Template ADR-001 (filtres URL) | markdown | Architecture Decision Record | M07 |
| 6 | Prompt "Explain your understanding" | Claude Code prompt | Diagnostic contexte | M07 |
| 7 | SKILL.md (explain-code) avec frontmatter | markdown | Format skill | M06 |
| 8 | `.claude/commands/fix-issue.md` | markdown | Slash command + $ARGUMENTS | M06 |
| 9 | Subagent `code-reviewer.md` | markdown | Frontmatter subagent | M06 |
| 10 | settings.json — hook notif macOS | json | Hook Notification + matcher | Carousel Hooks |
| 11 | settings.json — hook voix Zarvox | json | Hook avec `say -v Zarvox` | Carousel Hooks |
| 12 | Template PRD complet | markdown | Spec-Driven | M08 |
| 13 | Prompt Socratique | Claude Code prompt | 5 questions avant PRD | M08 |

**Highlights & progressive reveal :** sur SKILL.md surligner ligne `description:`. Sur subagent surligner `tools:` et `model:`. Sur hooks JSON surligner `matcher` + `command`.

---

## Demo Plan

### Démo unique : "Le cascade agentique" (10 min, avant les slides)

- **Quoi montrer :** un workflow où Skill auto-activée → Subagent en background → MCP appelé → Hook notif vocale → résultat livré avec diff propre.
- **Commandes :**
  1. `cd ~/projects/projet-demo`
  2. `claude` (ou `claude --resume agentic-coding-demo` si session préparée)
  3. Prompt préparé : *"Implémente une route POST /api/share qui partage une tâche entre 2 users, avec validation Zod, tests Vitest, et review par le subagent code-reviewer. Utilise Context7 pour les bonnes pratiques Hono."*
  4. Observer en silence : skill `explain-code` qui s'active, subagent qui part en arrière-plan, MCP Context7 qui répond, hook qui dit "Human, ready for review".
- **Fallback :** screencast préparé la veille (`assets/demo-fallback.mp4`).
- **Mesure de succès :** 30 secondes après la fin, demander à la salle "qu'avez-vous vu se passer ?". Si 3+ choses différentes citées → demo réussie.

---

## Potential Q&A

1. **« Quel outil pour démarrer : Cursor ou Claude Code ? »**
   - Les deux. Cursor pour les sessions d'édition fine (Tab completion, Inline Edit), Claude Code pour les tâches longues / autonomes. La majorité des AI Builders utilisent les deux en parallèle.

2. **« Combien ça coûte par dev/mois ? »**
   - Claude Pro/Max : 20-200$/mois selon usage. Plus l'API si tu utilises Sonnet/Opus sur des tâches longues. Compter ~50-100$/mois pour un dev qui code 6h/jour avec.

3. **« Et la confidentialité du code ? »**
   - Privacy Mode chez Cursor, no-training par défaut chez Anthropic. Pour du code sensible : devcontainer + agents en mode sandbox + privacy review explicite.

4. **« On parle de remplacer les devs ? »**
   - Non. On parle d'augmenter leur leverage. Le métier glisse vers : sélection des tâches, structuration du contexte, review, orchestration. Le code reste, mais ce n'est plus le centre de gravité.

5. **« Spec-driven, c'est pas du waterfall déguisé ? »**
   - Non — la spec vit dans le repo, évolue à chaque PR, est versionnée. Différent du PRD figé du waterfall.

6. **« Comment on évite les hallucinations sur du code legacy ? »**
   - 1) CLAUDE.md spécifique au sous-dossier legacy. 2) Subagent dédié avec accès limité (read-only). 3) Hook PreToolUse pour bloquer les modifs non-souhaitées. 4) Tests avant tout.

7. **« Plugin / MCP — comment éviter le bordel ? »**
   - Limiter à ~10 MCPs actifs (recommandation Cursor). Commiter `.mcp.json` dans le projet. Documenter dans CLAUDE.md le rôle de chacun.

8. **« Et pour les juniors ? On les forme à coder ou à orchestrer ? »**
   - Les deux, mais l'équilibre change. Les fondamentaux algo/structures restent. Mais on ajoute : context engineering, review d'agents, debug de prompts. Les bons juniors apprennent l'orchestration en 6 mois.

---

## Template Choices

- **Slides de présentation Maxime et closing** : extraites de `decks/templates/slides.md` (id=`presentation` + `layout: end`).
- **Layout `section`** : utilisé pour chaque divider de section (§1 à §10).
- **Layout `cover`** : pour le titre.
- **Layout `two-cols` / `two-cols-header`** : pour les comparaisons (Cursor vs Claude Code, Skill vs Command, etc.).
- **Layout `fact`** : pour mettre en avant les stats ROI (-40%, +30%, etc.) — §7.
- **Layout `quote`** : pour Karpathy (§8) et Dexter Horthy (§7).

---

## Appendix : Slide Outline

```text
# Section 0 — Démo live (avant slides, pas de slide)

# Section 1 — Setup & positionnement (7 slides)
1.  [cover]    Title slide — GenAI · Agentic Coding (background Unsplash)
2.  [default]  Que vient-il de se passer ? (capture demo)
3.  [default]  Les 3 cibles : Métiers / AI Builders / AI Engineers
4.  [default]  Rappel : architecture d'un agent (ReAct + tools)
5.  [default]  Pourquoi maintenant ? (stats GitLab/LogRocket 2026)
6.  [default]  Programme — 9 sections en 2h30
7.  [default]  Objectifs de la session

# Section 2 — Le contexte est le nouveau code (8 slides)
8.  [section]  "Le contexte est le nouveau code"
9.  [default]  De Prompt Eng à Context Eng — l'évolution
10. [default]  Taxonomie des 4 échecs (Missing / Polluted / Stale / Conflicting)
11. [default]  Symptômes par type (table)
12. [default]  Technique : "Explain your understanding"
13. [default]  CLAUDE.md hiérarchique (arborescence)
14. [default]  Contenu par niveau : racine vs sous-dossier
15. [default]  Architecture Decision Records (ADRs)

# Section 3 — La stack de l'AI Builder (10 slides)
16. [section]  "La stack 2026"
17. [two-cols] Cursor vs Claude Code — 2 philosophies
18. [default]  Les 4 modes de Cursor (Ask / Plan / Agent / Debug)
19. [default]  Workflow Anthropic : Explore → Plan → Code → Commit
20. [default]  Plan Mode (Shift+Tab) — séparer exploration et exécution
21. [default]  Worktree isolation — claude -w
22. [default]  Sandbox modes — OS / Container / VM
23. [default]  Modèles & coûts — Haiku/Sonnet/Opus + /context + /compact
24. [default]  Cloud Agents (Cursor Fév 2026 + Anthropic Managed Agents)
25. [default]  Matrice de décision — quel outil pour quel moment

# Section 4 — Skills · Commands · Subagents (10 slides)
26. [section]  "L'écosystème d'extension"
27. [default]  Vue d'ensemble : 3 primitives Skills + Commands + Subagents
28. [default]  Skills — capacités auto-découvertes (.claude/skills/)
29. [default]  SKILL.md — le format, la description critique
30. [default]  Le standard ouvert Agent Skills — 35+ plateformes
31. [default]  Slash Commands — templates de prompts
32. [default]  Slash Commands — variables & namespacing
33. [default]  Subagents — système multi-agent (Task tool + 3 agents intégrés)
34. [default]  Créer un subagent personnalisé (code-reviewer)
35. [default]  Plugin System — packager skills + subagents + MCP + hooks

# Section 5 — Hooks : fermer la boucle (6 slides)
36. [section]  "Les Hooks — agent = vrai teammate"
37. [default]  Les agents ne sont pas autonomes à 100% (timing humain)
38. [default]  Les hooks déclenchent actions / scripts (3 patterns)
39. [default]  Setup rapide en 2 min (/hooks)
40. [default]  Exemple : notification macOS
41. [default]  Hack signature : voix synthétique Zarvox

# Section 6 — MCP & Multi-agents (7 slides)
42. [section]  "MCP — Model Context Protocol"
43. [default]  Le problème : l'agent dans sa bulle
44. [default]  Architecture host / client / server + primitives
45. [default]  Serveurs MCP populaires (GitHub, Context7, Linear, Stripe…)
46. [default]  Multi-agents en pratique — subagents + worktrees + MCP
47. [default]  Pattern review multi-agent (Anthropic Managed Agents)
48. [default]  Pour aller plus loin → deck MCP Deep Dive

# Section 7 — Spec-Driven Development (7 slides)
49. [section]  "Spec > Code"
50. [default]  Le problème du prompting direct
51. [quote]    "Les spécifications, c'est ça qui compte." — Dexter Horthy
52. [two-cols] Review specs > Review code (200 lignes/20 min vs 2000/2-4h)
53. [fact]     ROI mesuré : -50% refacto, -40% bugs prod, +30% vélocité
54. [default]  Les 6 frameworks AIDD (BMAD, Spec Kit, OpenSpec, Kiro, GSD, Task Master)
55. [default]  Matrice de choix — contexte → framework

# Section 8 — Les 8 piliers de la vérification (7 slides)
56. [section]  "L'autonomie dépend de la vérification"
57. [quote]    Karpathy — "Software 1.0/2.0"
58. [default]  Les 8 piliers (grille 4×2)
59. [default]  Scoring & readiness levels (Basic / Ready / Advanced)
60. [default]  Priorité d'amélioration (Testing > Build > Quality > Docs)
61. [default]  Reliage piliers ↔ outils vus (table de synthèse)
62. [default]  CTA — télécharger la checklist + scorer ce soir

# Section 9 — Vos 2 chantiers (5 slides)
63. [section]  "Vos 2 chantiers — par où commencer demain"
64. [default]  Chantier 1 — Construire le contexte (CLAUDE.md + skills)
65. [default]  Chantier 2 — Organiser la vérification (audit 8 piliers)
66. [default]  Roadmap 30 / 60 / 90 jours
67. [default]  Ressources : checklist, decks compagnons, frameworks

# Section 10 — Présentation & closing (3 slides)
68. [two-cols-header] Présentation — Maxime Lenne
69. [default]  Q&A — vos questions
70. [end]      Let's build together (QR LinkedIn, fond Unsplash)
```

---

## Cover image

**URL :** `https://images.unsplash.com/photo-1680783954745-3249be59e527?w=1920`
**Description :** Mains humain + robot qui se tendent — visuel proche du message "Agent = vrai teammate" du carousel Hooks.
**Suivant :** lors de `/slidev:create`, générer aussi `assets/cover.png` à partir du premier slide rendu (`bun run generate-covers -- genai-agentic-coding`) pour remplacer le placeholder `cover.svg`.

---

## Renvois vers d'autres decks

- **`genai-llm-introduction`** — pour les bases LLM (réf. dans §1)
- **`genai-ai-engineer-mcp-deep-dive`** — pour le deep-dive MCP (réf. dans §6)
- **`genai-ai-engineer-langchain`** — pour la création d'agents (côté AI Engineer, mention dans §1 et §9)

---

*Plan créé : 2026-06-04*
*Ready for slide generation : [ ]* (à valider par Maxime avant `/slidev:create`)
