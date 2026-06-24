---
layout: section
---

# Next Steps

<div class="text-lg opacity-70 mt-4">par où commencer</div>

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
- Memory files `docs/*.md`
- Choix de Skills propres au besoin **entreprise / projet / persona / workflow**
- Choix MCPs propres au besoin **entreprise / projet / persona / workflow**
- ADRs pour les décisions clés et PRDs pour les features

</div>

<div class="border-l-4 border-[#10b981] pl-4 bg-[#10b981]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🔄</div>

#### Chantier 2 — Vérification

Organiser & automatiser la boucle de **vérification**.

- Audit **8 piliers**
- Mettre en place le tooling permettant la vérification : tests, lint, types, build, observability
- Éviter les dérapages : hooks + subagent reviewer

</div>

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

1. **Créer** les `CLAUDE.md` dans vos projets (Hiérarchique si besoin)
2. **Identifier** 3-5 patterns récurrents → choisir / créer des **skills**
3. **Identifier et sélectionner** les MCP indispensable (max 3 enable par projet) et CLI
4. **Commiter** dans `.claude/skills/` et `.claude/commands/`
5. **Documenter** vos projets (memory files dans `docs/`) et les décisions structurantes en **ADRs**

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

1. **Evaluer** les 8 piliers de la vérifications
2. **Identifier** les piliers les plus faibles
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
