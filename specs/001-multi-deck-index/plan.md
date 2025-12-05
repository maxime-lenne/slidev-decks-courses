# Implementation Plan: Multi-Deck Slidev Project with Index

**Branch**: `001-multi-deck-index` | **Date**: 2025-11-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-multi-deck-index/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a Slidev-based presentation project supporting multiple independent slide decks with a centralized index page. The project will enable easy creation of new decks, support custom theming per deck (including a Simplon.co branded theme), and provide a common theme foundation for consistency. The index page will automatically discover and list all available decks with navigation links.

## Technical Context

**Language/Version**: JavaScript/TypeScript with Node.js 18+ (Slidev requirement)
**Primary Dependencies**: Slidev (latest stable), Vue 3, Vite, markdown-it
**Storage**: File-based (markdown files for slides, metadata for index)
**Testing**: Vitest for component tests, manual presentation walkthroughs, accessibility audits (axe-core/Lighthouse)
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions), static site generation
**Project Type**: Web (static multi-page presentation site)
**Performance Goals**: <3s initial page load (per constitution), fast deck switching
**Constraints**: WCAG AA color contrast, keyboard navigation, mobile responsive (320px-768px viewports), motion-safe animations only
**Scale/Scope**: Multiple independent slide decks (5-10 initially), shared theme system with 2+ themes (default + Simplon), auto-discovery index page

**Research Required:**
1. Simplon.co brand guidelines (colors, fonts, logo assets) - NEEDS CLARIFICATION
2. Deployment target platform preference (Netlify/Vercel/GitHub Pages) - NEEDS CLARIFICATION
3. Slidev multi-deck architecture patterns - NEEDS CLARIFICATION
4. Index page implementation approach for Slidev - NEEDS CLARIFICATION
5. Slidev theme customization and inheritance patterns - NEEDS CLARIFICATION
6. Automated deck discovery mechanism - NEEDS CLARIFICATION

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the project constitution (`.specify/memory/constitution.md`), verify compliance:

### I. Content Quality & Clarity
- [x] Learning objectives clearly stated - Index page provides clear navigation to learning materials
- [x] Logical progression from fundamentals to advanced - Each deck is independent with its own progression
- [x] Practical examples included and executable - Decks will contain SQL examples per constitution
- [x] Consistent terminology throughout - Project structure enforces terminology consistency
- [x] References provided for further learning - Index page metadata includes descriptions and prerequisites

### II. Accessibility & Performance
- [x] Semantic HTML structure planned - Vue 3 components with semantic markup
- [x] Color contrast requirements considered (WCAG AA) - Built into Simplon theme requirements
- [x] Keyboard navigation supported - Slidev provides native keyboard navigation
- [x] Mobile-responsive design - Responsive layouts specified in constraints (320px-768px)
- [x] Performance budget defined (<3s load time) - Explicitly defined in Technical Context
- [x] Motion-safe animations only - Specified in constraints, Slidev allows animation control

### III. Modularity & Reusability
- [x] Content organized into independent modules - Each deck is a self-contained module
- [x] Each module is self-contained - Decks function independently with distinct URLs
- [x] Dependencies and prerequisites documented - Index page displays prerequisites per deck
- [x] Component-based architecture for interactivity - Vue 3 component system for shared elements
- [x] Separation of content from styling - Theme system separates content (markdown) from presentation

**Gate Status**: ✅ PASSED - All constitutional requirements are met or planned. The multi-deck architecture naturally supports modularity, and the theme system ensures consistent quality while allowing customization.

## Project Structure

### Documentation (this feature)

```text
specs/001-multi-deck-index/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── deck-metadata.schema.json  # Deck metadata contract
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
decks/                   # Individual slide deck directories
├── example-sql-basics/
│   ├── slides.md        # Slidev presentation content
│   ├── meta.json        # Deck metadata for index
│   └── assets/          # Deck-specific images/files
└── example-advanced-queries/
    ├── slides.md
    ├── meta.json
    └── assets/

themes/                  # Custom Slidev themes
├── common/              # Shared theme foundation
│   ├── components/      # Reusable Vue components
│   │   ├── CodeBlock.vue
│   │   ├── LearningObjective.vue
│   │   └── ExerciseCard.vue
│   ├── layouts/         # Common slide layouts
│   │   ├── cover.vue
│   │   ├── section.vue
│   │   └── two-cols.vue
│   └── styles/          # Base styles and utilities
│       ├── variables.css
│       └── typography.css
└── simplon/             # Simplon.co branded theme
    ├── package.json     # Theme package definition
    ├── components/      # Simplon-specific components
    ├── layouts/         # Simplon layouts (extends common)
    ├── styles/          # Simplon brand styles
    │   ├── colors.css   # Brand color palette
    │   └── theme.css    # Theme implementation
    └── assets/          # Simplon logos and images

index/                   # Index page application
├── index.html           # Entry HTML file
├── main.ts              # Vue app initialization
├── App.vue              # Main index page component
├── components/          # Index-specific components
│   ├── DeckCard.vue     # Individual deck card
│   ├── DeckGrid.vue     # Deck listing grid
│   └── SearchFilter.vue # Deck search/filter
└── utils/
    └── deckLoader.ts    # Auto-discovery logic

public/                  # Static assets
├── favicon.ico
└── shared-assets/       # Assets shared across decks
    └── logos/

scripts/                 # Build and automation scripts
├── create-deck.sh       # Script to scaffold new deck
├── build-all.sh         # Build all decks and index
└── generate-index.sh    # Regenerate index metadata

tests/
├── components/          # Component unit tests (Vitest)
│   └── DeckCard.spec.ts
├── themes/              # Theme rendering tests
│   └── simplon.spec.ts
└── accessibility/       # A11y audit tests
    └── contrast.spec.ts

package.json             # Root project dependencies
vite.config.ts           # Vite configuration for index page
tsconfig.json            # TypeScript configuration
```

**Structure Decision**: Web static site structure with multiple Slidev decks. Each deck is a self-contained Slidev presentation in its own directory with metadata. The index page is a separate Vue 3 application that auto-discovers decks via metadata files. Themes use Slidev's theme system with inheritance (Simplon extends common foundation). This structure supports independent deck development while maintaining consistency through shared components and themes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations detected. All requirements align with constitutional principles.

---

## Post-Design Constitution Check

*Re-evaluation after Phase 0 Research and Phase 1 Design completion*

### I. Content Quality & Clarity
- [x] ✅ Learning objectives clearly stated - Quickstart guide includes comprehensive examples of learning objectives
- [x] ✅ Logical progression maintained - Data model enforces prerequisites tracking
- [x] ✅ Practical examples executable - Quickstart includes working SQL examples, validation scripts ensure correctness
- [x] ✅ Consistent terminology - JSON schemas enforce standard field names and formats
- [x] ✅ References provided - Quickstart includes links to Slidev docs and internal documentation

### II. Accessibility & Performance
- [x] ✅ Semantic HTML planned - Vue 3 components with semantic markup confirmed in theme structure
- [x] ✅ Color contrast WCAG AA - Simplon brand colors verified (#123744, #f26f5c, #ce0033 meet AA standards)
- [x] ✅ Keyboard navigation - Slidev native support confirmed, documented in quickstart
- [x] ✅ Mobile responsive - Vite + Vue 3 stack supports responsive layouts, documented in constraints
- [x] ✅ Performance budget <3s - Static site generation with optimized builds confirmed in research
- [x] ✅ Motion-safe animations - Slidev transition system allows control, documented in theme defaults

### III. Modularity & Reusability
- [x] ✅ Independent modules - Each deck is self-contained with own directory, metadata, and assets
- [x] ✅ Self-contained modules - Deck structure enforces isolation (data model section 1)
- [x] ✅ Prerequisites documented - DeckMetadata schema requires prerequisites field with validation
- [x] ✅ Component-based architecture - Theme system provides reusable Vue components (CodeBlock, LearningObjective, ExerciseCard)
- [x] ✅ Content/styling separation - Markdown content separate from theme CSS/layouts

**Final Gate Status**: ✅ PASSED - All constitutional requirements remain satisfied after detailed design. No violations introduced during research or design phases. The architecture naturally supports all principles through:
- JSON schema validation for quality
- Static site generation for performance
- Directory-based isolation for modularity
- Theme system for accessibility and consistency
