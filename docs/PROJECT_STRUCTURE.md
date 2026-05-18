# Project Structure

## Directory Organization

```text
slidev-decks-courses/
├── .claude/                    # Claude Code configuration
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   │   ├── lint.yml            # Markdown and YAML linting
│   │   └── release.yml         # Semantic release
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   └── pull_request_template.md
├── decks/                      # Individual slide decks
│   └── {deck-id}/
│       ├── slides.md           # Slidev presentation content
│       ├── meta.json           # Deck metadata for index
│       └── assets/             # Deck-specific images/files
│           └── preview.png     # Thumbnail (400x300px)
├── docs/                       # Documentation
│   ├── AGENTS.md               # AI assistant guide
│   ├── PROJECT_STRUCTURE.md    # This file
│   ├── CONVENTIONS.md          # Code and content conventions
│   ├── TECHNICAL_GUIDE.md      # Technical guide
│   ├── DESIGN_SYSTEM.md        # Design system (themes, colors)
│   ├── COMPONENT_REFERENCE.md  # Vue component docs
│   ├── FEATURES.md             # Features and user stories
│   ├── SCREEN_FLOW.md          # Navigation flows
│   └── TASKS.md                # Task tracking
├── index/                      # Index page Vue application
│   ├── components/             # Index-specific Vue components
│   ├── utils/                  # Deck discovery utilities
│   ├── public/                 # Static assets for index
│   ├── slides.md               # Index Slidev entry
│   └── vite.config.ts          # Vite configuration
├── node_modules/               # Dependencies (Bun)
├── public/                     # Shared static assets
├── scripts/                    # Build and automation scripts
│   ├── build-all.sh            # Build all decks and index
│   ├── build.js                # JS build orchestrator
│   ├── create-deck.sh          # Scaffold a new deck
│   ├── dev.js                  # Dev server helper
│   ├── generate-covers.js      # Generate deck thumbnails
│   ├── generate-index.sh       # Regenerate index metadata
│   └── validate-metadata.js    # JSON schema validation
├── themes/                     # Custom Slidev themes
│   ├── common/                 # Shared theme foundation
│   │   ├── components/         # Reusable Vue components
│   │   ├── layouts/            # Common slide layouts
│   │   └── styles/             # Base styles and variables
│   ├── maxime-lenne/           # Maxime Lenne personal theme
│   ├── simplon/                # Simplon.co branded theme
│   │   ├── components/         # Simplon-specific components
│   │   ├── layouts/            # Simplon layouts
│   │   ├── styles/             # Simplon brand styles
│   │   └── assets/             # Simplon logos and images
│   └── THEME_MAXIME_LENNE.md   # Theme documentation
├── .editorconfig
├── .gitignore
├── .gitmoji.json               # Gitmoji-cli configuration
├── .markdownlint.json          # Markdownlint rules
├── .yamllint.yml               # Yamllint configuration
├── bun.lock                    # Bun lock file
├── CHANGELOG.md
├── CLAUDE.md                   # AI assistant entry point
├── CNAME                       # GitHub Pages custom domain
├── commitlint.config.js
├── CONTRIBUTING.md
├── LICENSE                     # MIT License
├── package.json                # Project configuration
├── README.md                   # Main documentation
├── renovate.json               # Renovate configuration
├── tsconfig.json
└── tsconfig.node.json
```

---

## Configuration Files

### Project Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `bun.lock` | Locked dependency versions |
| `tsconfig.json` | TypeScript configuration |
| `.gitmoji.json` | Gitmoji-cli configuration |

### Code Quality

| File | Purpose |
|------|---------|
| `.markdownlint.json` | Markdown linting rules |
| `.yamllint.yml` | YAML linting rules |
| `.editorconfig` | Editor settings |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/lint.yml` | Lint on push/PR |
| `.github/workflows/release.yml` | Automated semantic release |
| `renovate.json` | Automatic dependency updates |
| `.github/dependabot.yml` | Security updates |

### Git Hooks

| Directory | Purpose |
|-----------|---------|
| `.husky/` | Git hooks managed by Husky |

---

## Documentation (`docs/`)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Main guide for AI assistants |
| `PROJECT_STRUCTURE.md` | This file — directory layout |
| `CONVENTIONS.md` | Code style and git conventions |
| `TECHNICAL_GUIDE.md` | Technical implementation details |
| `DESIGN_SYSTEM.md` | Slidev themes, colors, typography |
| `COMPONENT_REFERENCE.md` | Vue component documentation |
| `FEATURES.md` | User stories and requirements |
| `SCREEN_FLOW.md` | Navigation and user flows |
| `TASKS.md` | Project task tracking |

---

## GitHub Configuration (`.github/`)

### Workflows

- **`lint.yml`** — Runs all linters on push/PR
- **`release.yml`** — Automated semantic release on push to `main`

### Issue Templates

- **`bug_report.yml`** — Bug report template
- **`feature_request.yml`** — Feature request template
- **`config.yml`** — Issue template configuration

### Pull Request

- **`pull_request_template.md`** — PR template

---

*Last updated: 2026-05-16*
