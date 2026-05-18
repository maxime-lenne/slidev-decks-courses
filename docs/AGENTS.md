# AI Agents Guide

Complete guide for AI assistants working on this repository.

## Documentation Index

| File | Purpose | Description |
|------|---------|-------------|
| [`AGENTS.md`](./AGENTS.md) | AI Guide | This file — conventions and rules for AI agents |
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) | Architecture | Directory and file organization |
| [`CONVENTIONS.md`](./CONVENTIONS.md) | Code style | Naming conventions, code style, git |
| [`TECHNICAL_GUIDE.md`](./TECHNICAL_GUIDE.md) | Implementation | Scripts, CI/CD, Slidev workflow, deck creation |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | UI/UX | Slidev themes, colors, typography, accessibility |
| [`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md) | Components | Vue component reference and meta.json schema |
| [`FEATURES.md`](./FEATURES.md) | Features | Epics, user stories, requirements |
| [`SCREEN_FLOW.md`](./SCREEN_FLOW.md) | Navigation | Screen flows and user journeys |
| [`TASKS.md`](./TASKS.md) | Tasks | Task tracking and backlog |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Slidev (Vue 3-based presentation) |
| UI | Vue 3, Vite |
| Language | TypeScript |
| Package Manager | Bun |
| Node Version | >= 18.0.0 |
| Git Hooks | Husky + lint-staged |
| Commit Convention | Gitmoji |
| Commit Validation | commitlint |
| Linting | markdownlint, yamllint |
| Dependency Updates | Renovate, Dependabot |
| CI/CD | GitHub Actions |
| Deployment | GitHub Pages |

### Available Commands

```bash
bun install               # Install dependencies
bun run lint              # Lint markdown and yaml
bun run lint:md:fix       # Auto-fix markdown
bun run dev               # Start index dev server
bun run dev:deck <name>   # Start deck dev server
bun run build:all         # Build everything
bun run validate          # Validate all meta.json files
bun run create-deck <n>   # Scaffold a new slide deck
bun run commit            # Interactive gitmoji commit
```

---

## File Summaries

### PROJECT_STRUCTURE.md

Actual directory tree with descriptions. Key points:

- `decks/` — individual slide decks, each with `slides.md`, `meta.json`, `assets/`
- `themes/` — Slidev themes: `simplon/`, `maxime-lenne/`, `common/`
- `index/` — Vue 3 index page that auto-discovers decks
- `scripts/` — build, dev, create-deck, validate automation

### CONVENTIONS.md

Development conventions. Key points:

- **Naming**: files kebab-case, classes PascalCase, functions camelCase, constants UPPER_SNAKE_CASE
- **Slides**: `#` for slide titles, `---` to separate slides, triple backticks with language tag for code
- **Git branches**: feature/fix/refactor/docs
- **Commits**: Gitmoji convention (emoji + description)

### TECHNICAL_GUIDE.md

Technical implementation guide. Key points:

- **Slidev commands**: `dev:deck <name>`, `build:all`, `validate`, `create-deck <name>`
- **Deck creation**: scaffold → edit `meta.json` → write `slides.md` → validate → publish
- **CI/CD**: GitHub Actions (lint on push/PR, release on push to main)
- **Dependency management**: Renovate (weekly) + Dependabot (security)

### DESIGN_SYSTEM.md

Slidev theme system. Key points:

- **Simplon theme**: `#123744` elephant, `#f26f5c` coral, `#ce0033` red — all WCAG AA verified
- **maxime-lenne theme**: `#1d3557`, `#457b9d`, `#123744`, `#475569`
- **Slide content rules**: 24pt body minimum, max 7 bullets/slide, max 20 lines/code block
- **Accessibility**: WCAG 2.1 AA, keyboard-navigable, motion-safe animations

### COMPONENT_REFERENCE.md

Vue components and data schema. Key points:

- **Index components**: `DeckCard`, `DeckGrid`
- **Slide components**: `CodeBlock`, `LearningObjective`, `ExerciseCard`
- **meta.json schema**: required fields, `status` controls index visibility

### FEATURES.md

Feature management. Key points:

- Three epics: Multi-Deck Navigation, Deck Creation Workflow, Theme System
- User stories with priority (P1–P4)
- Technical requirements (FR-001 to FR-013)

### SCREEN_FLOW.md

Navigation and user flows. Key points:

- Index → Deck presentation → Presenter Mode / Overview Mode
- Deck creation flow from scaffold to publish

### TASKS.md

Project tracking. Key points:

- Backlog and Completed sections
- Markdown checklist format

---

## Content Quality Constitution

These principles govern all slide deck content in this project:

### I. Content Quality & Clarity

Every slide deck MUST:

- State clear learning objectives upfront
- Progress logically from fundamentals to advanced concepts
- Include practical, executable examples (especially SQL)
- Use consistent terminology throughout
- Provide references for further learning

### II. Accessibility & Performance

- Semantic HTML (screen reader compatible)
- Color contrast WCAG AA minimum
- Keyboard-navigable slides (native in Slidev)
- Mobile-responsive layouts (320px+ viewports)
- Load time < 3s on standard broadband
- No animations that trigger motion sensitivity

### III. Modularity & Reusability

- Each deck stands alone as a complete lesson
- Content separated from styling (markdown + theme)
- Dependencies and prerequisites documented in `meta.json`
- Shared components for consistent interactive elements

### Quality Standards

- All SQL examples MUST be executable and produce stated results
- Maximum 7 bullet points per slide
- Maximum 20 lines of code per code block
- Each deck MUST include learning objectives and prerequisites in `meta.json`

---

## AI Agent Specific Rules

### Language Rule

**All written content must be in English**, regardless of the user's prompt language:

- Documentation (markdown files, comments)
- Commit messages
- Tasks and subtasks
- Code comments and JSDoc
- Variable and function names

*Exception*: Slide content itself may be in French (this is a French-language training project).

### Commit Convention

This project accepts **Gitmoji** or **Conventional Commits**:

```bash
bun run commit  # Interactive gitmoji tool
```

**Gitmoji format:** `<emoji> <description>`

| Emoji | Description |
|-------|-------------|
| ✨ | New feature |
| 🐛 | Bug fix |
| 📝 | Documentation |
| ♻️ | Refactor |
| 🔧 | Configuration |
| 🔥 | Remove code/files |

Full gitmoji list: [gitmoji.dev](https://gitmoji.dev)

### Fundamental Principles

1. **Read before modifying** — Always read a file before proposing changes
2. **Consult documentation** — Check relevant docs/ files before any task
3. **Respect existing patterns** — Follow the style and conventions already in place
4. **Minimize changes** — Only modify what is necessary
5. **Document changes** — Update docs if behavior changes

### Code Generation Preferences

| Language | Preferences |
|----------|-------------|
| **Markdown** | Follow markdownlint rules, no trailing spaces |
| **YAML** | Follow yamllint rules, consistent indentation |
| **Vue/TypeScript** | Composition API, strict types, no `any` |
| **SQL** | Include test data setup, show expected output |

### Behaviors to Avoid

- Do not create unnecessary files
- Do not add dependencies without justification
- Do not modify project structure without discussion
- Do not ignore linting errors
- Do not comment out dead code, delete it

### Priorities

1. **Functionality** — Code must work correctly
2. **Readability** — Code must be understandable
3. **Consistency** — Follow existing patterns
4. **Simplicity** — Avoid over-engineering

---

*Last updated: 2026-05-16*
