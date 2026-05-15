# Features

Application features organized by epics and user stories.
Each item is linked to a GitHub issue for tracking and status.

## Epics

| # | Epic | Description |
|---|------|-------------|
| 1 | Multi-Deck Navigation | Centralized index page listing all available slide decks with navigation links. |
| 2 | Deck Creation Workflow | Standardized, easy process for content creators to add new slide decks. |
| 3 | Theme System | Custom visual themes per deck, including Simplon.co branded and maxime-lenne themes. |

---

## User Stories

| Epic | Priority | User Story |
|------|----------|------------|
| 1 | P1 | As an instructor or learner, I want a centralized index page so I can discover and navigate all available slide decks. |
| 1 | P1 | As a user, I want each deck to display its title, description, and preview so I can choose what to view. |
| 1 | P1 | As a user, I want clickable deck links on the index page so I can open any presentation directly. |
| 2 | P2 | As a content creator, I want to scaffold a new slide deck quickly so I can focus on content rather than setup. |
| 2 | P2 | As a content creator, I want new decks to appear automatically in the index so I don't need manual configuration. |
| 3 | P3 | As a content creator, I want to apply a Simplon.co branded theme so presentations match brand guidelines. |
| 3 | P3 | As a content creator, I want to apply different themes to different decks so each has a distinct visual style. |
| 4 | P4 | As a developer, I want shared theme components (CodeBlock, LearningObjective, ExerciseCard) so I avoid duplicating UI logic across decks. |

---

## Technical Features

| Feature | Description |
|---------|-------------|
| Auto-discovery | Index page discovers decks from `meta.json` files — no manual registration needed. |
| JSON schema validation | `bun run validate` checks all `meta.json` files against the schema. |
| Deck scaffolding | `bun run create-deck <name>` generates the full deck directory structure. |
| Multi-theme support | `theme:` frontmatter key in `slides.md` selects the Slidev theme per deck. |
| Static site build | `bun run build` generates a deployable static site for all decks + index. |
| GitHub Pages deploy | Automated deployment via GitHub Actions on push to `main`. |

---

## Acceptance Criteria (key requirements)

| ID | Requirement |
|----|-------------|
| FR-001 | Project provides a centralized index page listing all available slide decks. |
| FR-002 | Index page displays each deck's title, description, and preview/thumbnail. |
| FR-003 | Index page provides clickable navigation to each slide deck. |
| FR-004 | Project supports multiple independent slide decks within the same repository. |
| FR-005 | Each slide deck functions as a standalone presentation with its own slides. |
| FR-006 | Creating a new slide deck follows a standardized, documented process. |
| FR-007 | New slide decks automatically register with the index page without manual configuration. |
| FR-008 | Project supports applying different visual themes to different slide decks. |
| FR-009 | Project includes a Simplon-branded theme matching Simplon.co brand guidelines. |
| FR-010 | Project provides a common theme foundation with shared components and utilities. |
| FR-012 | Slide decks are accessible via distinct URLs or navigation paths. |
| FR-013 | Index page and all decks are responsive and functional on mobile devices. |

---

*Status is managed directly on GitHub issues.*
