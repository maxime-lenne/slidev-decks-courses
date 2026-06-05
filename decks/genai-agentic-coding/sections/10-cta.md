---
layout: section
---

# Vos 2 chantiers

<div class="text-lg opacity-70 mt-4">10 min · par où commencer demain matin</div>

---
layout: default
---

### Les 2 chantiers à lancer cette semaine

<br>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4 bg-[#457b9d]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🏗️</div>

#### Chantier 1 — Contexte

Construire le contexte de **tous vos projets**.

- `CLAUDE.md` hiérarchique (racine + sous-dossiers)
- Skills propres au besoin **entreprise / projet / persona / workflow**
- ADRs pour les décisions clés

</div>

<div class="border-l-4 border-[#10b981] pl-4 bg-[#10b981]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🔄</div>

#### Chantier 2 — Vérification

Organiser & automatiser la boucle de **vérification**.

- Audit **8 piliers** + scoring du projet
- Tooling : tests, lint, types, build, observability
- Éviter les dérapages : hooks + subagent reviewer

</div>

</div>

<div class="text-center mt-8 text-base text-[#e63946] font-bold max-w-3xl mx-auto">

L'un sans l'autre = échec. Contexte sans vérification = agent qui fait des bêtises plus vite.

</div>

<!--
- Reformuler les 2 CTA après tout le contenu — c'est maintenant qu'ils prennent leur sens
- Insister sur la complémentarité : ce sont deux jambes d'un même corps
- Chantier 1 = quoi/comment l'agent code. Chantier 2 = qui valide ce qu'il code.
-->

---
layout: default
---

### Chantier 1 — Construire le contexte

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Actions concrètes

1. **Auditer** vos projets : combien ont un `CLAUDE.md` ? Hiérarchique ?
2. **Identifier** 3-5 patterns récurrents → en faire des **skills**
3. **Commiter** dans `.claude/skills/` et `.claude/agents/`
4. **Documenter** les décisions structurantes en **ADRs**

</div>

<div>

#### Pièges à éviter

- ❌ Un seul `CLAUDE.md` géant à la racine
- ❌ Duplication entre niveaux
- ❌ Skills à description trop vague (ne se déclenchent jamais)
- ❌ ADRs en wiki externe (l'agent ne les lit pas)

<div class="text-xs opacity-70 mt-3">

**Règle d'or** : tout ce qui aide l'agent vit **dans le repo**.

</div>

</div>

</div>

<!--
- Le piège #1 : "j'ai mis tout mon contexte dans CLAUDE.md" → trop gros, l'agent perd l'attention
- Le piège #4 : décisions documentées dans Notion/Confluence → l'agent ne les voit pas, refait les mêmes débats
- Pour démarrer : commencer petit, itérer chaque semaine
-->

---
layout: default
---

### Chantier 2 — Organiser la vérification

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Actions concrètes

1. **Télécharger** + remplir la checklist 8 piliers
2. **Identifier** les 2 piliers les plus faibles
3. **Mettre en place** le tooling correspondant :
   - Tests faibles → pre-commit hook + subagent test-writer
   - Build flaky → CI deterministe + dependency lock
   - Quality faible → linter strict + subagent reviewer
4. **Itérer** par sprint (1 sprint = 1 pilier amélioré)

</div>

<div>

#### Outils du deck à mobiliser

- **Hooks** PreToolUse (bloquer rm -rf, secrets)
- **Hooks** PostToolUse (lint, format, build)
- **Subagent reviewer** déclenché PROACTIVELY
- **Subagent test-writer** sur les fichiers modifiés
- **MCP Sentry/Grafana** pour l'observability
- **Spec-driven** workflow pour la documentation

</div>

</div>

<!--
- Le scoring est plus important que la perfection : savoir où on en est >> tout faire parfaitement
- Pour les 2 piliers prioritaires : 1 atelier équipe + 1 sprint dédié = ça avance vraiment
- Mesurer 6 mois plus tard pour voir l'évolution
-->

---
layout: default
---

### Roadmap 30 / 60 / 90 jours

<br>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

#### 📅 30 jours

- `CLAUDE.md` **hiérarchique** committé partout
- **3 skills** équipe partagées
- **Score 8 piliers** du projet principal

<div class="text-xs opacity-70 mt-3">Quick wins : visibles dès la première semaine.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### 📅 60 jours

- **2-3 subagents** équipe en `.claude/agents/`
- **Hooks** pour la boucle de validation
- **1 MCP métier** intégré (Sentry, Linear, Supabase…)

<div class="text-xs opacity-70 mt-3">Automatisation : l'agent devient autonome sur les bases.</div>

</div>

<div class="border-l-4 border-[#e63946] pl-4">

#### 📅 90 jours

- Pattern **multi-agent** sur une feature complète
- **Framework spec-driven** adopté (BMAD, OpenSpec...)
- **+10 points** sur la grille 8 piliers

<div class="text-xs opacity-70 mt-3">Maturité : votre équipe est devenue agentique.</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70 max-w-3xl mx-auto">

Pas de big-bang — itération hebdomadaire avec mesure d'impact.

</div>

<!--
- Calibration prudente : viser 30j tangibles plutôt qu'une transformation immédiate
- Mesurer = essentiel : nombre de PRs auto-revieweées, % de tâches déléguées, score 8 piliers
- À 90j, si la culture a pris, vous êtes prêts pour les workflows multi-agents avancés
-->

---
layout: default
---

### À ne pas faire

<br>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div>

#### ❌ Big bang

« On lance 5 subagents + 10 MCPs + spec-driven + multi-agent partout dès demain. »

→ Échec, démotivation, retour au CLI nu.

</div>

<div>

#### ❌ Outil-religion

« On choisit Cursor / Claude Code, et on défend la chapelle. »

→ Vous passez à côté de 50% du potentiel.

</div>

<div>

#### ❌ Skip la vérification

« Tant que ça compile, on merge. »

→ Tech debt agentique = 10x plus vite.

</div>

<div>

#### ❌ Tout faire seul

« Je vais structurer le contexte à ma sauce. »

→ Vos skills/CLAUDE.md doivent être **partagés** via Git.

</div>

</div>

<!--
- Les 4 anti-patterns observés en mission chez des clients
- L'erreur la plus coûteuse : skip la vérification → on enrichit la tech debt avec de l'IA en plus
- Pour pousser : 1 atelier d'équipe pour aligner sur les conventions partagées
-->
