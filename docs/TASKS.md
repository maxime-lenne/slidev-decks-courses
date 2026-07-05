# Tasks

Project task tracking.

## Backlog

- [ ] with should have the same command for launch simple slidev deck and Multi-Deck Projects structure (index + decks).
- [ ] Refacto on index: should use a theme used by Slidev (simplon or maxime-lenne) not CSS directly in Vue file
- [ ] skills dans le projet
- [ ] Add a button in presenter bar to go back to index
- [ ] <https://github.com/christian-bromann/slidev-agent/blob/main/packages/slidev-agent/agent/skills/slidev/SKILL.md>
- [ ] Background effect style: <https://baizeai.github.io/talks/2025-06-11-kubecon-hk/#/15>
- [ ] <https://decks.maxime-lenne.fr/1> — diffuser et call to action (Bootcamp !)
- [ ] Add deck categories
- [ ] Refactor existing components (link list in presentation, prerequisites and objectives)
- [x] Refactor design of TOC for langchain deck
- [ ] Rethink unused components with potential (CodeBlock → file, ExerciseCard see in langchain, LearningObjective...)
- [ ] Add roti / feedback slide
- [ ] component qrcode, slide links
- [ ] Make this a template project
- [ ] generate index on deploy
- [ ] url sourcerer
- [ ] templates call to action quizz, briefs...
- [ ] Add calendar slide template : with cofee break, lunch, demo
- [ ] Fix build system
- [ ] Add more icons and images / use template slides / starters / layout available without customizing /
- [ ] Add a logo for Simplon theme
- [x] Slide dimensions

Refactor de tous les deck :
- refaco des TOC pour qu'il soit tous comme le deck : agentic coding -> revenir au composant de base qui surcharge plutot qu'un custom
- decouper tous les decks en sections comme le deck : agentic coding
- slide remerciement comme le deck : ci-cd-github
- slide de fin comme : agentic coding
- citation comme le deck : agentic coding

- [x] refaco des TOC pour qu'il soit tous comme le deck : agentic coding -> revenir au composant de base qui surcharge plutot qu'un custom
- [x] citation comme le deck : agentic coding -> revenir à la syntax de base réadapté le style pour garder exactement le style actuel

- [x] Refacto les titres dans tous les decks :
  - [x] il ne doit n'y avoir qu'un seul h1 la slide de coder
  - [x] Les titres h2 ne sont que les titres de sections (peut être supprimer les hideInToc: true qui ne sert plus forcement, et bloquer le niveau des TOC à h2)
  - [x] les h3 peuvent être utilisé pour les sous sections ou les titres d'une slides
  - [x] h4 et h5 peuvent être utilisés un peu partout (sous titres...)
  - [x] Attention le design actuel du themes maxime-lenne ne doit pas changer.

- Refacto dans tous les decks, les dernières slides systématiquement :
  - 3 take aways -> faire composant ou layout
  - avec ressources pour aller plus loin
  - next steps,
  - slide composant remerciement

```
---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="genai-ai-engineer-mcp-deep-dive" />
```

- Slide final basé sur le template :

```
---
src: ../../templates/slides.md#2
---
```

en faire une composant dans layout end en gardant exactement sont design et contenu actuel.

- premières section systématiquement : prérequuis et objectifs, TOC, Présentation

- image sections ou layout image, filtre en fonction theme dark / light
- sections et sous sections
- composant liste d'étapes

- mermaid
- slides exercices dans decks langchain -> créer composants / layout

### Deck Agentic coding

- ajout slide mcp à côté du dev (figma, Pencil..)
- ajout tooling : git, ide, tty, compteur de token (codexbar), stack ai builder,...
- workflow
- demo multi agents
- photo
- [x] lien vers slide rappel
- skills : ajouter une slide : ou trouver des skills (skills.sh par vercel), pour les créer / valider / optimiser / personaliser utiliser une skills de création de skills (inception), créer des plugins pour partager avec votre équipes

## Completed

- [x] Remove `.specify/` and `specs/` — knowledge migrated to `docs/`
- [x] Plus de npm
- [x] Deployment to GitHub Pages
- [x] Mermaid setup for maxime-lenne theme (colors: #1d3557, #457b9d, #123744, #475569)
- [x] Release workflow triggers changelog update and adds to GitHub release
- [x] Clean all docs
- [x] Get issue and PR templates from frizbiz
- [x] Add Dependabot
- [x] Renovatebot
- [x] commitlint (gitmoji)
- [x] Changelog (gitmoji + conventional)
- [x] semantic-release (gitmoji)
- [x] .editorconfig
- [x] CONTRIBUTING.md

---

- PRD, ensuite Spec drivent après context, ensuite skills
- passer section stack ai builer avant module context
- schéma react
- clean objectif
- supprimer référence hoko

*Last updated: 2026-05-16*
