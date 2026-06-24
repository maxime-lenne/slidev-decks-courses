---
layout: section-liquid
---

# PRD & Spec-Driven Development

<div class="text-lg opacity-70 mt-4">15 min · Spec > Code · les frameworks AIDD</div>

---
layout: two-cols-header
---

### Le problème du prompting direct

::left::

#### Ce qu'on voudrait faire

```text
Fais-moi une feature de login
```

#### Ce que l'agent comprend

- Login avec quoi ? Email ? OAuth ?
- Quel design ? Quelle validation ?
- Où stocker la session ?
- Quelles erreurs gérer ?

::right::

#### Résultat

- Code **bancal**
- Manque de **cas limites**
- Design **aléatoire**
- **Refactoring** immédiat nécessaire

<div class="border-l-4 border-[#e63946] pl-4 mt-3 text-sm">

**Manque de contexte = agent qui improvise.**
La spec, c'est précisément l'antidote.

</div>

<!--
- Pour faire rire la salle : montrer le diff produit par un prompt vague, c'est toujours instructif
- Le réflexe naturel du dev : "il fallait juste mieux prompter" — mais non, il fallait spécifier
-->

---
layout: quote
---

« Les spécifications, la description de ce que l'on attend de notre logiciel, c'est ça qui compte. »

<div class="text-base opacity-70 mt-4">— Dexter Horthy, Human Layer</div>

---
layout: default
---

### Spec-First Development — le principe

<br>

#### Avec l'IA, la spécification est une étape **indispensable**

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#457b9d] pl-4">

L'IA génère le code, mais **vous** définissez le **quoi** et le **pourquoi**.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

Sans spec claire → **hallucinations**, hors-sujet, dette technique.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

Les spécifications sont **versionnées, reviewées, itérées** — dans le repo.

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70 max-w-2xl mx-auto">

Spec-driven ≠ waterfall. La spec **évolue** avec le code, à chaque PR.

</div>

<!--
- L'objection classique : "c'est du waterfall déguisé"
- Réponse : non, la spec vit dans le repo, change à chaque sprint, est commité avec le code
- Différence clé : la spec waterfall était figée. La spec agentique est vivante.
-->

---
layout: two-cols-header
---

### Review specs > Review code

**Catch problems early** — une erreur dans les specs coûte **10x moins** qu'une erreur dans le code.

::left::

#### Review de code

- **2000 lignes** de Go
- Temps : **2-4 heures**
- Erreurs : détectées **tard**

::right::

#### Review de specs

- **200 lignes** de markdown
- Temps : **20-30 minutes**
- Erreurs : détectées **tôt**

<div class="text-center mt-8 text-base text-[#10b981] font-bold">

</div>

<!--
- L'asymétrie est massive : 10x moins de lignes, 6x moins de temps, problèmes détectés en amont
- Argument irréfutable pour les équipes qui veulent "passer plus vite à l'implémentation"
- Le temps économisé en refactoring paye largement le temps investi en spec
-->

---
layout: fact
---

# -50%

<div class="text-2xl mt-4">temps de refactoring</div>

<div class="text-sm opacity-70 mt-8 max-w-2xl mx-auto">

Données mesurées (LogRocket 2025, GitLab 2025) sur les équipes ayant adopté un workflow spec-driven avec l'agentic AI.

Aussi : **-40 à 60%** bugs en production · **+30%** vélocité après adoption · **78%** des équipes enterprise utilisent des outils AI.

</div>

<!--
- Le ROI est démontré par les études GitLab Research et LogRocket
- Learning curve : 3-4 semaines selon le framework
- Pour convaincre un sponsor budget : ces chiffres + un projet pilote sur 6 semaines = pitch parfait
-->

---
layout: default
---

### PRD — Product Requirements Document

<div class="text-sm opacity-70 mt-2">Adapté à l'agentic coding — la spec devient un artefact du repo</div>

<div class="text-sm leading-tight mt-4">

| Aspect | PRD traditionnel | PRD agentic |
|--------|-------------------|-------------|
| **Format** | Prose détaillée | Structure markdown |
| **Audience** | Pour humains | Pour humains **ET** agents |
| **Cycle de vie** | Statique, figé | Évolutif avec le code |
| **Localisation** | Hors repo (Notion, Confluence) | Versionné dans le repo |

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-6 text-sm">

**Structure > Prose** — l'agent parse mieux les sections markdown structurées et y revient à chaque PR.

</div>

<!--
- Le PRD agentic n'est pas un PRD product manager — c'est un contrat machine-lisible pour l'agent
- Vit dans `docs/prds/` ou `specs/` du repo, à côté du code
- Mise à jour à chaque évolution de feature : le PRD reflète l'état actuel, pas l'intention initiale
- Lien direct avec les ADRs : les décisions techniques issues du PRD deviennent des ADRs
- Source : Module 8 — PRD : Spécifier pour mieux générer
-->

---
layout: default
---

### Template PRD complet

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">

<div>

```markdown
# Feature : [Nom explicite]

## Contexte
Pourquoi cette feature ?
Quel problème résout-elle ?

## User Stories
- En tant que [user],
  je veux [action]
  pour [bénéfice]

## Spécifications fonctionnelles
- Comportement attendu (cas nominal)
- Cas limites et erreurs
```

</div>

<div>

```markdown
## Contraintes techniques
- Stack, dépendances,
  patterns à respecter

## Critères d'acceptation
- [ ] Checklist de validation
- [ ] Tests à écrire
- [ ] Métriques de succès

## Hors-périmètre
- Ce qu'on ne fait PAS
```

</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 mt-3 text-sm">

**Le « pourquoi » avant le « quoi »** — l'agent comprend l'intention et arrête d'improviser sur les cas limites.

</div>

<!--
- Template volontairement court : un PRD doit tenir sur 1-2 pages, sinon personne ne le lit ni ne le maintient
- "Hors-périmètre" est aussi important que le périmètre — l'agent n'invente plus de features non demandées
- Workflow : Spec Kit / Task Master parsent ce template pour générer automatiquement les tasks
- Convention de stockage : `docs/prds/PRD-XXX-feature.md`, proche des ADRs
- Pour l'écrire, utiliser un questionnement socratique avec l'agent avant de figer le doc
-->

---
layout: section
---

# Spec-Driven Development : Les Frameworks

<div class="text-lg opacity-70 mt-4">les frameworks AIDD</div>

---
layout: two-cols-header
---

### Superpowers — marketplace Anthropic

<div class="text-sm opacity-70 mt-1">Plugin Claude Code · Marketplace Anthropic · Skills process, qualité, review, agents, git</div>

::left::

#### Présentation

Transforme chaque tâche de développement en un **workflow structuré et reproductible**, invocable via une commande `/` depuis le terminal ou l'IDE.

#### Workflow typique

```text
/brainstorming "nouvelle feature"
     ↓
/writing-plans
     ↓
/subagent-driven-development
     ↓
/verification-before-completion
```

<div class="border-l-4 border-[#8b5cf6] pl-4 mt-4 text-sm">

**Superpowers** couvre le cycle dev complet (process, qualité, git)

</div>

::right::

#### 14 skills inclus

<div class="text-sm mt-2 space-y-1">

- **Idéation** — `brainstorming`
- **Planification** — `writing-plans`, `executing-plans`
- **Qualité** — `systematic-debugging`, `test-driven-development`, `verification-before-completion`
- **Review** — `requesting-code-review`, `receiving-code-review`
- **Agents** — `subagent-driven-development`, `dispatching-parallel-agents`
- **Git** — `finishing-a-development-branch`, `using-git-worktrees`
- **Méta** — `using-superpowers`, `writing-skills`

</div>

<!--
- Superpowers ≠ SpecKit : deux plugins distincts de la marketplace Anthropic
- Skills préfixés superpowers: (ex: superpowers:brainstorming) — pas speckit.*
- Chaque skill = un processus éprouvé qui remplace un prompt improvisé
- Peut coexister avec SpecKit dans le même projet Claude Code
-->

---
layout: two-cols-header
---

### SpecKit — AI agnostic

<div class="text-sm opacity-70 mt-1">Open source toolkit · Specify CLI + Agent intégration · 9 skills · De l'idée à l'issue GitHub</div>

::left::

#### Présentation

Toolkit open source accessible en CLI en dehors de l'agent, avec intégration dans l'agent de code

#### Workflow typique

```text
/speckit.specify "feature login OAuth"
     ↓
/speckit.clarify
     ↓
/speckit.constitution
     ↓
/speckit.plan
     ↓
/speckit.implement
     ↓
/speckit.checklist
     ↓
/speckit.taskstoissues
```

::right::

#### 9 skills inclus

<div class="text-sm mt-2 space-y-1">

- `/speckit.specify` — génère le PRD interactif
- `/speckit.clarify` — questions avant d'agir
- `/speckit.constitution` — règles du projet (CLAUDE.md)
- `/speckit.analyze` — analyse le codebase existant
- `/speckit.plan` — décompose la spec en tâches
- `/speckit.tasks` — liste et priorise les tâches
- `/speckit.implement` — implémente selon la spec
- `/speckit.checklist` — valide les critères d'acceptance
- `/speckit.taskstoissues` — crée les issues GitHub

</div>

<!--
- SpecKit = plugin indépendant, préfixe speckit. (pas superpowers:)
- speckit.constitution = crée/met à jour le CLAUDE.md avec les règles du projet
- speckit.taskstoissues : crée automatiquement des issues GitHub depuis les tâches de la spec
- Peut être utilisé seul ou en complément de Superpowers sur le même projet
- Peut être utilisé partiellement : juste specify+plan pour un ticket ponctuel
-->

---
layout: two-cols-header
---

### BMAD Method — multi-agents agile

<div class="text-sm opacity-70 mt-1">21 rôles spécialisés · Audit trails · Traçabilité complète · Open-source</div>

::left::

#### Présentation

Framework multi-agents agile conçu pour les équipes enterprise. Chaque phase du cycle de vie est prise en charge par un **agent spécialisé** avec un rôle défini, des livrables attendus et une traçabilité complète des décisions.

#### Agents & rôles clés

<div class="text-sm mt-2 space-y-1">

- **Analyst** — collecte besoins, rédige le brief
- **Product Manager** — PRD, user stories, priorités
- **Architect** — architecture, ADRs, choix techniques
- **Dev (Frontend / Backend)** — implémentation par story
- **QA** — plan de test, validation, edge cases
- **DevOps** — CI/CD, infra, déploiement
- **Scrum Master** — coordination des agents, blockers

</div>

::right::

#### Workflow typique

```text
Brief → Analyst
     ↓
PRD → Product Manager
     ↓
Architecture → Architect
     ↓
Stories → Dev agents (//parallel)
     ↓
Tests → QA agent
     ↓
Deploy → DevOps agent
```

<div class="border-l-4 border-[#1d3557] pl-4 mt-3 text-sm">

**Audit-ready** — chaque décision est tracée, chaque livrable est versionné. Idéal pour les contextes réglementés.

</div>

<!--
- BMAD = "Breakthrough Method for Agile Development" (avec AI)
- 21 rôles = granularité fine, chaque agent a un prompt système dédié
- Audit trails = chaque agent log ses décisions → traçabilité complète pour compliance
- Plus lourd à mettre en place que SpecKit ou OpenSpec, mais incomparable en enterprise
- Adapté aux équipes qui doivent justifier chaque choix technique (finance, santé, défense)
-->

---
layout: default
---

### Spec-Driven Development : les autres frameworks AIDD

<br>

<div class="grid grid-cols-4 gap-2 mt-4 text-xs">

<div class="border-l-4 border-[#1d3557] pl-2">

#### OpenSpec

Proposal-based, incrémental. **Brownfield**, features existantes.

</div>

<div class="border-l-4 border-[#457b9d] pl-2">

#### Kiro (AWS)

IDE natif, specs intégrées. **AWS**, environnement unifié.

</div>

<div class="border-l-4 border-[#10b981] pl-2">

#### GSD

Sub-agents, isolation contexte. **Solo dev**, vélocité max.

</div>

<div class="border-l-4 border-[#f59e0b] pl-2">

#### Task Master

PRD-centric, dépendances auto. **Cursor**, décomposition de tâches.

</div>

</div>

<!--
- Marché jeune (tous nés en 2024-2025), pas encore de "winner take all"
- Le choix dépend du contexte (voir matrice slide suivante)
- BMAD = enterprise, Task Master = Cursor, OpenSpec = brownfield... pas un seul ne gagne sur tous les axes
-->

---
layout: default
---

### Quelle méthode choisir ?

<div class="text-sm leading-tight mt-4">

| Contexte | Framework recommandé | Raison |
|----------|----------------------|--------|
| **Solo dev, perso** | OpenSpec ou GSD | Rapidité, zero config |
| **Solo dev, clients** | Spec Kit / Task Master | Structure + doc pour handoff |
| **Solo greenfield complexe** | GSD | Isolation contexte, commits atomiques |
| **Startup** | OpenSpec / Spec Kit | Vélocité sans sacrifier maintenabilité |
| **Équipe (3-10)** | Spec Kit / Task Master | Agent-agnostic, multi-IDE |
| **Enterprise** | BMAD | Traçabilité, audit-ready |
| **Écosystème AWS** | Kiro | Intégration native, support enterprise |
| **Projet existant** | OpenSpec | Conçu pour évolutions sur codebase |

</div>

<!--
- Matrice simple à projeter en grand quand on hésite
- Recommandation par défaut pour un AI Builder en entreprise : commencer par Spec Kit ou Task Master
- Pour brownfield : OpenSpec est conçu exactement pour ça
-->
