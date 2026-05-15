# Technical Guide

Detailed guide for technical implementation aspects.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Slidev | latest stable |
| UI | Vue 3 | ^3.x |
| Build | Vite | ^5.x |
| Package Manager | Bun | >= 1.1.45 |
| Node | Node.js | >= 18.0.0 |
| Language | TypeScript | ^5.x |
| Markdown | markdown-it | (via Slidev) |
| Git Hooks | Husky | ^9.1.7 |
| Staged Files | lint-staged | ^17.x |
| Commit Tool | gitmoji-cli | ^9.7.0 |
| Commit Lint | commitlint | ^21.x |
| Changelog | conventional-changelog | ^5.0.0 |
| Release | semantic-release | ^25.0.3 |
| Markdown Lint | markdownlint-cli | ^0.47.0 |
| Validation | Ajv (JSON schema) | ^8.x |

---

## Available Scripts

```bash
# Install dependencies
bun install

# --- Linting ---
bun run lint              # Lint all (markdown + yaml)
bun run lint:md           # Lint markdown only
bun run lint:md:fix       # Auto-fix markdown issues
bun run lint:yaml         # Lint YAML files

# --- Development ---
bun run dev               # Start index dev server (port 5173)
bun run dev:deck <name>   # Start Slidev dev server for one deck (port 3030)

# --- Build ---
bun run build             # Build index page only
bun run build:decks       # Build all slide decks
bun run build:all         # Build everything (decks + index)

# --- Deck management ---
bun run create-deck <name>   # Scaffold a new deck directory
bun run generate-index       # Regenerate index metadata from meta.json files
bun run validate             # Validate all meta.json files against schema

# --- Git / Release ---
bun run commit            # Interactive gitmoji commit
bun run changelog         # Update CHANGELOG.md
bun run release           # Run semantic release (usually done by CI)
bun run release:dry       # Preview release without publishing
```

---

## Deck Development Workflow

### 1. Create a New Deck

```bash
bun run create-deck sql-joins
# Creates: decks/sql-joins/{slides.md,meta.json,assets/}
```

### 2. Configure Metadata

Edit `decks/sql-joins/meta.json`:

```json
{
  "id": "sql-joins",
  "title": "SQL Joins",
  "description": "Master INNER, LEFT, RIGHT, and FULL JOINs with practical examples.",
  "status": "draft",
  "objectives": ["Write INNER JOIN queries", "Understand LEFT vs RIGHT JOINs"],
  "prerequisites": ["sql-basics"],
  "duration": "2 hours",
  "theme": "simplon",
  "thumbnail": "./assets/preview.png",
  "tags": ["sql", "intermediate"],
  "language": "fr",
  "version": "0.1.0",
  "authors": [{ "name": "Maxime Lenne", "email": "hello@maxime-lenne.fr" }],
  "created": "2026-05-16",
  "updated": "2026-05-16"
}
```

### 3. Write Slides

Edit `decks/sql-joins/slides.md`:

```markdown
---
theme: simplon
title: SQL Joins
highlighter: shiki
transition: slide-left
mdc: true
---

# SQL Joins

...

---
layout: two-cols
---

# INNER JOIN

::right::

\```sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
\```
```

### 4. Test Locally

```bash
bun run dev:deck sql-joins
# → http://localhost:3030
# Press 'p' for presenter mode
# Press 'o' for overview
```

### 5. Validate and Publish

```bash
bun run validate          # Check meta.json

# Update status in meta.json:
# "status": "published"

bun run commit            # Commit with gitmoji
git push origin main      # CI/CD deploys automatically
```

---

## Slides Frontmatter Reference

```yaml
---
theme: simplon             # Theme name (simplon | maxime-lenne)
title: Slide Deck Title
highlighter: shiki         # Code syntax highlighter
drawings:
  persist: false
transition: slide-left     # Slide transition
mdc: true                  # Enable MDC syntax
---
```

---

## Slidev Key Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `p` | Toggle presenter mode |
| `o` | Toggle overview mode |
| `d` | Toggle drawing mode |
| `f` | Toggle fullscreen |

---

## CI/CD

### Lint Workflow

Runs on every push and PR to `main`:

```yaml
# .github/workflows/lint.yml
jobs:
  markdownlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run lint:md

  yamllint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - run: pip install yamllint
      - run: yamllint .
```

### Release Workflow

Triggered on push to `main` — creates GitHub releases and updates `CHANGELOG.md`.

---

## Git Hooks

### Pre-commit

Husky runs lint-staged automatically:

```json
{
  "lint-staged": {
    "*.md": "markdownlint --fix",
    "*.{yml,yaml}": "yamllint"
  }
}
```

### Commit-msg

Commitlint validates commit messages. Two accepted formats:

- **Gitmoji**: `<emoji> <description>` (e.g., `✨ Add SQL Joins deck`)
- **Conventional**: `<type>(scope): <description>` (e.g., `feat(decks): add sql-joins`)

---

## Version Bumping

| Emoji | Version Bump |
|-------|-------------|
| 💥 | Major (breaking change) |
| ✨ 🎉 | Minor (new feature) |
| 🐛 🚑️ 🩹 ⚡️ 🔒️ 🚀 ♻️ ⬆️ ⬇️ | Patch (fix/improvement) |

---

## Deck Versioning

Each deck in `meta.json` uses semantic versioning independently:

| Change | Version bump |
|--------|-------------|
| Content restructure, prerequisite changes | MAJOR |
| New topics or sections added | MINOR |
| Corrections, clarifications, updated examples | PATCH |

---

## Dependency Management

### Renovate

Configured to group minor/patch updates and auto-merge patches for devDependencies. Runs Monday mornings (Europe/Paris timezone).

### Dependabot

Monitors Bun dependencies and GitHub Actions versions.

---

## Troubleshooting

**Deck not appearing in index:**

```bash
# Check status in meta.json (must be "published")
cat decks/my-deck/meta.json | grep status
bun run generate-index
bun run validate
```

**Theme not loading:**

```markdown
# slides.md frontmatter — use exact theme name
theme: simplon
# NOT: theme: "simplon-theme"
```

**Images not displaying:**

```markdown
# Use relative paths from slides.md
![Correct](./assets/image.png)
# NOT absolute paths
```

---

*Last updated: 2026-05-16*
