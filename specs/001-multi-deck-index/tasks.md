# Implementation Tasks: Multi-Deck Slidev Project with Index

**Feature**: Multi-Deck Slidev Project with Index
**Branch**: `001-multi-deck-index`
**Created**: 2025-11-24
**Status**: Ready for Implementation

## Overview

This document provides actionable, dependency-ordered tasks for implementing the multi-deck Slidev presentation system. Tasks are organized by user story to enable independent implementation and testing. Each user story represents a complete, testable increment.

**Tech Stack**:

- Slidev (latest stable) + Vue 3 + Vite
- TypeScript for type safety
- JSON Schema for validation
- File-based storage (markdown + JSON)

---

## Implementation Strategy

### MVP Approach (Recommended)
**Start with User Story 1 only** - This provides immediate value with a working index page and example decks.

### Incremental Delivery
After MVP, implement in priority order:

1. **US1 (P1)**: Index page - Core navigation (MVP)
2. **US2 (P2)**: Deck creation tooling - Content workflow
3. **US3 (P3)**: Simplon theme - Brand identity
4. **US4 (P4)**: Common theme foundation - Developer experience

### Parallel Execution
Tasks marked `[P]` can be executed in parallel with other `[P]` tasks in the same phase, as they operate on different files with no dependencies.

---

## Task Summary

- **Total Tasks**: 48
- **Setup Phase**: 5 tasks
- **Foundational Phase**: 8 tasks
- **US1 (P1)**: 11 tasks
- **US2 (P2)**: 9 tasks
- **US3 (P3)**: 8 tasks
- **US4 (P4)**: 5 tasks
- **Polish Phase**: 2 tasks

---

## Phase 1: Project Setup

**Goal**: Initialize project structure and install dependencies

**Tasks**:

- [x] T001 Initialize Node.js project with package.json in repository root
- [x] T002 Install core dependencies: slidev, vue, vite, typescript
- [x] T003 Create directory structure: decks/, themes/, index/, scripts/, public/, tests/ per plan.md:80-144
- [x] T004 Initialize TypeScript configuration in tsconfig.json with Vue and Vite settings
- [x] T005 Create .gitignore for node_modules/, dist/, .DS_Store, and *.log files

**Completion Criteria**: `bun install` runs successfully, directory structure matches plan.md

---

## Phase 2: Foundational Infrastructure

**Goal**: Establish core infrastructure needed by all user stories

**Dependencies**: Phase 1 must be complete

**Tasks**:

- [x] T006 [P] Install dev dependencies: vitest, @vue/test-utils, ajv for JSON schema validation
- [x] T007 [P] Create Vite configuration in vite.config.ts for index page with Vue plugin
- [x] T008 [P] Create validation script in scripts/validate-metadata.js using Ajv per contracts/README.md
- [x] T009 [P] Set up package.json scripts: generate-index, build:decks, build:index, build:all, dev:deck, dev:index, validate per data-model.md:338-347
- [x] T010 [P] Create build script in scripts/build-all.sh that orchestrates all builds
- [x] T011 [P] Create example .env file documenting BASE_URL and other config variables
- [x] T012 [P] Add GitHub Actions workflow template in .github/workflows/ for CI/CD per research.md (deployment section)
- [x] T013 [P] Create public/favicon.ico and public/shared-assets/logos/ directory structure

**Completion Criteria**: All scripts defined, validation works, build pipeline structure exists

**Parallel Execution Example**:

```bash
# These foundational tasks can run in parallel:
bun install vitest @vue/test-utils ajv &  # T006
create vite.config.ts &                    # T007
create validate-metadata.js &              # T008
# Wait for all to complete
wait
```

---

## Phase 3: User Story 1 - View and Navigate Index Page (P1)

**Story Goal**: Instructors/learners can visit a centralized index page, browse available slide decks, see preview information, and navigate to presentations.

**Why P1**: This is the entry point - without it, users cannot discover or access content.

**Independent Test Criteria**:

- Opening root URL displays index page with deck listing
- Clicking a deck card navigates to that presentation
- Each deck shows title, description, and thumbnail
- Index works on mobile viewports (320px-768px)

**Dependencies**: Phase 2 must be complete

**Foundational Tasks**:

- [x] T014 [P] [US1] Create two example decks: decks/example-sql-basics/ and decks/example-advanced-queries/ with directory structure per data-model.md:23-28
- [x] T015 [P] [US1] Write slides.md for example-sql-basics with Slidev frontmatter, 5 sample slides, and SQL examples per quickstart.md:39-84
- [x] T016 [P] [US1] Write slides.md for example-advanced-queries with different content and 5 sample slides
- [x] T017 [P] [US1] Create meta.json for example-sql-basics following DeckMetadata schema with status: "published" per data-model.md:120-148
- [x] T018 [P] [US1] Create meta.json for example-advanced-queries with status: "published"
- [x] T019 [P] [US1] Generate 400x300px preview.png thumbnails for both example decks in their assets/ folders

**Index Generation**:

- [x] T020 [US1] Implement index generation script in scripts/generate-index.sh that scans decks/, validates meta.json, filters published status, and outputs index/public/index-data.json per data-model.md:177-182
- [x] T021 [US1] Test index generation script with example decks and verify output matches IndexData schema

**Index Page Implementation**:

- [x] T022 [US1] Create index page HTML entry point in index/index.html with proper meta tags and root div
- [x] T023 [US1] Implement Vue app initialization in index/main.ts importing App.vue and mounting to DOM
- [x] T024 [P] [US1] Create DeckCard.vue component in index/components/DeckCard.vue displaying title, description, thumbnail, duration, and tags per data-model.md:75-90
- [x] T025 [P] [US1] Create DeckGrid.vue component in index/components/DeckGrid.vue with responsive grid layout (CSS Grid, 1-3 columns based on viewport)
- [x] T026 [P] [US1] Create deckLoader.ts utility in index/utils/deckLoader.ts to fetch and parse index-data.json
- [x] T027 [US1] Implement main App.vue in index/App.vue: fetch index data on mount, handle loading/error states, render DeckGrid with DeckCard components
- [x] T028 [US1] Add responsive CSS to index components ensuring mobile support (320px-768px viewports) and WCAG AA contrast per constitution.md:40-45

**Story Test Validation**:

Test US1 acceptance criteria:

1. Run `bun run generate-index && bun run dev:index`
2. Open <http://localhost:5173> - verify both example decks appear
3. Click deck card - verify navigation to /decks/{deck-id}/
4. Resize to 320px width - verify responsive layout
5. Check color contrast with browser devtools

**Completion Criteria**: Index page displays both example decks, navigation works, mobile responsive, passes accessibility checks

**Parallel Execution Example**:

```bash
# Example deck creation can happen in parallel:
# Terminal 1
create decks/example-sql-basics/slides.md &          # T015

# Terminal 2
create decks/example-advanced-queries/slides.md &   # T016

# Terminal 3
create decks/example-sql-basics/meta.json &         # T017

# Terminal 4
create decks/example-advanced-queries/meta.json &   # T018

wait  # Wait for all to complete before T020
```

---

## Phase 4: User Story 2 - Create New Slide Deck Easily (P2)

**Story Goal**: Content creators can add new slide decks following a simple, standardized process that automatically integrates with the index.

**Why P2**: Once navigation exists, easy content creation is critical for project growth.

**Independent Test Criteria**:

- Running create-deck script generates valid deck structure
- New deck includes template slides.md and meta.json
- After setting status: "published", deck appears in index automatically
- Creator can complete process in under 10 minutes

**Dependencies**: User Story 1 must be complete (needs index generation)

**Tasks**:

- [x] T029 [US2] Create deck scaffolding script in scripts/create-deck.sh that accepts deck-id argument and creates directory structure per data-model.md:23-28
- [x] T030 [P] [US2] Create slides.md template file in scripts/templates/slides.md.template with Slidev frontmatter placeholders and example slide structure
- [x] T031 [P] [US2] Create meta.json template file in scripts/templates/meta.json.template with all required fields and placeholder values per data-model.md:75-90
- [x] T032 [US2] Implement create-deck.sh logic: validate deck-id format (lowercase, hyphens), check uniqueness, create directories, copy templates with replacements
- [x] T033 [US2] Add deck creation to package.json scripts as "create-deck": "./scripts/create-deck.sh"
- [x] T034 [US2] Create deck creation documentation section in README.md with usage examples per quickstart.md:18-70
- [x] T035 [US2] Add validation check to create-deck.sh script that validates generated meta.json against schema
- [x] T036 [US2] Test create-deck script end-to-end: create new-test-deck, verify structure, validate metadata, generate index, confirm it appears
- [x] T037 [US2] Add error handling to create-deck.sh for existing decks, invalid names, and file system errors

**Story Test Validation**:

Test US2 acceptance criteria:

1. Run `bun run create-deck my-new-deck`
2. Verify decks/my-new-deck/ created with slides.md, meta.json, assets/
3. Edit meta.json, set status: "published"
4. Run `bun run generate-index && bun run dev:index`
5. Verify my-new-deck appears in index
6. Time the process from start to finish (should be under 10 minutes)

**Completion Criteria**: create-deck script works reliably, generates valid structure, new decks auto-appear in index, documentation complete

**Parallel Execution Example**:

```bash
# Template creation can happen in parallel:
create scripts/templates/slides.md.template &    # T030
create scripts/templates/meta.json.template &    # T031
wait
# Then implement create-deck.sh (T032) which uses both templates
```

---

## Phase 5: User Story 3 - Apply Custom Themes per Deck (P3)

**Story Goal**: Creators can customize visual appearance of decks using a Simplon-branded theme that follows brand guidelines.

**Why P3**: Visual customization enhances learning experience and enables brand consistency.

**Independent Test Criteria**:

- Simplon theme package exists and follows Slidev conventions
- Deck with theme: simplon displays with correct brand colors (#123744, #f26f5c, #ce0033)
- DM Sans font loads correctly
- Theme works with both light and dark modes
- Multiple decks can use different themes independently

**Dependencies**: User Story 1 complete (needs example decks to apply theme to)

**Tasks**:

- [x] T038 [P] [US3] Create Simplon theme directory themes/simplon/ with package.json per data-model.md:269-291 and theme-package.schema.json
- [x] T039 [P] [US3] Create Simplon brand color CSS variables in themes/simplon/styles/colors.css with --simplon-elephant, --simplon-burnt-sienna, --simplon-monza per data-model.md:294-303
- [x] T040 [P] [US3] Create Simplon theme main stylesheet in themes/simplon/styles/theme.css importing colors and defining Slidev variable mappings
- [x] T041 [P] [US3] Configure DM Sans font loading in themes/simplon/styles/theme.css via Google Fonts API
- [x] T042 [P] [US3] Create cover layout in themes/simplon/layouts/cover.vue with Simplon branding and logo placement
- [x] T043 [P] [US3] Create default slide layout in themes/simplon/layouts/default.vue with consistent header/footer styling
- [x] T044 [US3] Configure theme package.json with slidev.defaults for transition, aspectRatio, fonts, and colorSchema: "both"
- [x] T045 [US3] Update example-sql-basics deck slides.md frontmatter to use theme: simplon and verify rendering with bun run dev:deck example-sql-basics

**Story Test Validation**:

Test US3 acceptance criteria:

1. Open example-sql-basics deck with Simplon theme
2. Verify brand colors visible on cover and slides
3. Verify DM Sans font loads (check browser devtools)
4. Toggle dark mode in Slidev - verify theme adapts
5. Create second deck with theme: default - verify themes don't conflict

**Completion Criteria**: Simplon theme renders correctly with brand identity, supports light/dark modes, multiple themes coexist

**Parallel Execution Example**:

```bash
# Theme asset creation can happen in parallel:
create themes/simplon/package.json &                  # T038
create themes/simplon/styles/colors.css &             # T039
create themes/simplon/styles/theme.css &              # T040
create themes/simplon/layouts/cover.vue &             # T042
create themes/simplon/layouts/default.vue &           # T043
wait
# Then configure and test (T044, T045)
```

---

## Phase 6: User Story 4 - Use Common Theme Elements (P4)

**Story Goal**: Creators can leverage shared theme components and layouts that work across all themes for consistency.

**Why P4**: Common foundation reduces duplication and speeds up theme/deck creation.

**Independent Test Criteria**:

- Common components (CodeBlock, LearningObjective, ExerciseCard) exist and render
- Components work with both default and Simplon themes
- Shared layouts (cover, section, two-cols) available across themes
- Documentation exists showing how to use common components

**Dependencies**: User Story 3 complete (Simplon theme must exist to test inheritance)

**Tasks**:

- [x] T046 [P] [US4] Create common theme directory themes/common/components/ with CodeBlock.vue, LearningObjective.vue, and ExerciseCard.vue per plan.md:93-95
- [x] T047 [P] [US4] Implement CodeBlock.vue component with syntax highlighting props, copy button, and title support
- [x] T048 [P] [US4] Implement LearningObjective.vue component with icon and styled container
- [x] T049 [P] [US4] Implement ExerciseCard.vue component with difficulty and duration props
- [x] T050 [P] [US4] Create common theme layouts in themes/common/layouts/: cover.vue, section.vue, two-cols.vue per plan.md:97-99
- [x] T051 [US4] Update Simplon theme to import and extend common components
- [x] T052 [US4] Add component usage examples to quickstart.md showing how to use common components in slides per quickstart.md:268-283
- [x] T053 [US4] Test common components in both example decks with different themes and verify consistent behavior

**Story Test Validation**:

Test US4 acceptance criteria:

1. Add `<LearningObjective>` to example-sql-basics slide - verify renders
2. Add `<CodeBlock>` with SQL code - verify syntax highlighting
3. Change deck theme to default - verify components still work
4. Check quickstart.md has clear component usage docs

**Completion Criteria**: Common components work across themes, documentation complete, example usage exists

**Parallel Execution Example**:

```bash
# All common components can be created in parallel:
create themes/common/components/CodeBlock.vue &          # T047
create themes/common/components/LearningObjective.vue &  # T048
create themes/common/components/ExerciseCard.vue &       # T049
create themes/common/layouts/cover.vue &                 # T050 (part 1)
create themes/common/layouts/section.vue &               # T050 (part 2)
create themes/common/layouts/two-cols.vue &              # T050 (part 3)
wait
```

---

## Phase 7: Polish & Cross-Cutting Concerns

**Goal**: Final improvements, CI/CD setup, and deployment configuration

**Dependencies**: All user stories complete

**Tasks**:

- [x] T054 [P] Configure GitHub Pages deployment with base path configuration in GitHub Actions workflow per research.md (deployment section)
- [x] T055 [P] Add comprehensive README.md at project root with project overview, quick start, deck creation guide, build instructions, and deployment docs

**Completion Criteria**: Project deployable to GitHub Pages, documentation complete

---

## Dependency Graph

### Story Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
    ├──→ Phase 3 (US1 - P1) ──→ Phase 4 (US2 - P2)
    │            ↓
    │            └──→ Phase 5 (US3 - P3) ──→ Phase 6 (US4 - P4)
    │
    └──────────────────────→ Phase 7 (Polish)
```

### Critical Path

1. Setup (Phase 1) - **5 tasks**
2. Foundational (Phase 2) - **8 tasks**
3. US1: Index Page (Phase 3) - **15 tasks** ← **MVP milestone**
4. US2: Deck Creation (Phase 4) - **9 tasks**
5. US3: Simplon Theme (Phase 5) - **8 tasks**
6. US4: Common Components (Phase 6) - **6 tasks**
7. Polish (Phase 7) - **2 tasks**

**Total Critical Path**: 53 tasks

### Parallel Opportunities by Phase

**Phase 2 (Foundational)**: 8 parallel tasks (T006-T013)
**Phase 3 (US1)**: 6 parallel groups possible

- T014-T019: Example deck creation (6 parallel)
- T024-T026: Index components (3 parallel)
**Phase 4 (US2)**: 2 parallel tasks (T030-T031)
**Phase 5 (US3)**: 6 parallel tasks (T038-T043)
**Phase 6 (US4)**: 6 parallel tasks (T046-T050)
**Phase 7 (Polish)**: 2 parallel tasks (T054-T055)

---

## Testing Strategy

**Note**: Tests are **not generated** in this plan as they were not explicitly requested in the feature specification. If TDD approach is desired:

1. Add test tasks before implementation tasks in each phase
2. Follow pattern: `[US#] Write test for [component]` → `[US#] Implement [component]`
3. Use Vitest for component tests in tests/components/

**Manual Testing Required**:

- Visual inspection of themes and layouts
- Browser testing across Chrome, Firefox, Safari, Edge
- Mobile responsive testing (320px, 768px breakpoints)
- Accessibility audits with Lighthouse/axe
- Presentation walkthroughs per constitution.md:100-104

---

## Success Metrics

Track these against success criteria from spec.md:111-118:

- **SC-001**: ✅ Verify users access all decks within 2 clicks (index → deck)
- **SC-002**: ⏱️ Time deck creation process (target: <10 minutes)
- **SC-003**: ✅ Confirm auto-discovery works (create deck → appears in index)
- **SC-004**: ✅ Verify theme isolation (multiple themes don't conflict)
- **SC-005**: 👁️ Visual comparison of Simplon theme vs brand guidelines
- **SC-006**: ⚡ Lighthouse performance audit (target: <3s load time)
- **SC-007**: 📱 Mobile testing on 320px-768px viewports
- **SC-008**: 📊 Track deck creation success rate with new users

---

## Next Steps

1. **For MVP**: Complete Phase 1, Phase 2, and Phase 3 (US1) only
2. **For incremental delivery**: Complete one user story at a time in priority order
3. **For parallel teams**: Assign US2, US3, US4 to different team members after US1 completes

**Ready to begin implementation!**

---

**Generated**: 2025-11-24
**Format**: All tasks follow required checklist format with IDs, [P] markers, [US#] labels, and file paths
**Validation**: ✅ Each user story is independently testable with clear acceptance criteria
