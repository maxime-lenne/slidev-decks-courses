# Research: Multi-Deck Slidev Project with Index

**Date**: 2025-11-24
**Phase**: 0 - Technical Research
**Status**: Complete

## Overview

This document consolidates research findings for implementing a multi-deck Slidev presentation system with custom theming and an index page. All NEEDS CLARIFICATION items from the Technical Context have been resolved.

---

## Research Questions & Findings

### 1. Simplon.co Brand Guidelines

**Question**: What are the specific brand colors, fonts, and logo assets for Simplon.co?

**Decision**: Use Simplon.co official brand assets with defined color palette and typography.

**Findings**:

- **Colors**:
  - Primary Dark: `#123744` (Elephant) - Deep blue-grey for text and headers
  - Primary Light: `#f26f5c` (Burnt Sienna) - Warm coral-orange for accents
  - Accent: `#ce0033` (Monza) - Vibrant red for CTAs and highlights

- **Typography**:
  - Headings: DM Sans (Google Fonts)
  - Body: Arial (web-safe fallback)

- **Logo Assets**:
  - Available in PNG (820x188px) and SVG formats
  - Dark theme variant available
  - Icon variant: 841x841px for favicons/app icons
  - Source: [Brandfetch](https://brandfetch.com/simplon.co)

**Rationale**: Official brand assets ensure consistency with Simplon.co's existing digital presence and maintain professional appearance for educational content.

**Alternatives Considered**:

- Generic educational themes - Rejected: Lacks brand recognition
- Custom color schemes - Rejected: Would dilute Simplon.co brand identity

**Source**: [Brandfetch - Simplon.co](https://brandfetch.com/simplon.co)

---

### 2. Slidev Multi-Deck Architecture

**Question**: How can Slidev support multiple independent presentations in one repository?

**Decision**: Use directory-based structure with separate slides.md per deck and custom build orchestration.

**Findings**:

- **Native Support**: Slidev can build multiple presentations via `slidev build *.md` or explicit file list
- **Output Structure**: Each presentation generates its own folder in the output directory
- **Limitation**: No built-in index page generator
- **Community Solutions**:
  - [jonathanlukas/slidev-setup-sample](https://github.com/jonathanlukas/slidev-setup-sample) - Multi-deck sample setup
  - [gabriel-del/slidev](https://github.com/gabriel-del/slidev) - Multi-entry template
- **Active Discussions**: GitHub issues [#248](https://github.com/slidevjs/slidev/issues/248), [#1777](https://github.com/slidevjs/slidev/discussions/1777), [#1791](https://github.com/slidevjs/slidev/issues/1791)

**Implementation Approach**:

```bash
# Project structure
decks/
├── sql-basics/
│   └── slides.md
├── advanced-queries/
│   └── slides.md

# Build command
slidev build decks/*/slides.md --base /decks/ --out dist
```

**Rationale**: Directory structure provides clear separation, version control isolation, and allows independent development of each deck.

**Alternatives Considered**:

- Monolithic slides with sections - Rejected: Doesn't support independent themes, harder to navigate
- Separate repositories - Rejected: Increases maintenance overhead, no shared theme foundation

**Sources**:

- [Slidev: Building and Hosting](https://sli.dev/guide/hosting)
- [GitHub Discussion #1777](https://github.com/slidevjs/slidev/discussions/1777)
- [GitHub Issue #1791](https://github.com/slidevjs/slidev/issues/1791)

---

### 3. Index Page Implementation

**Question**: How should the index page discover and list all available decks?

**Decision**: Build a custom Vue 3 SPA that reads deck metadata files and generates a searchable index.

**Findings**:

- **No Built-in Solution**: Slidev doesn't provide index page generation
- **Best Practice**: Create separate Vite/Vue app alongside Slidev decks
- **Metadata Approach**: Each deck has a `meta.json` file with:
  - Title and description
  - Learning objectives and prerequisites
  - Theme information
  - Estimated duration
  - Thumbnail/preview image path

**Implementation Strategy**:

1. Create `index/` directory with Vue 3 app
2. Build script scans `decks/` for `meta.json` files
3. Generate `index-data.json` at build time
4. Index app fetches and displays deck catalog
5. Deploy index to root, decks to `/decks/*` subdirectories

**Example meta.json**:

```json
{
  "id": "sql-basics",
  "title": "SQL Fundamentals",
  "description": "Introduction to SQL queries and database basics",
  "prerequisites": ["Basic programming concepts"],
  "duration": "2 hours",
  "theme": "simplon",
  "thumbnail": "./assets/preview.png",
  "objectives": [
    "Write SELECT queries",
    "Understand table relationships"
  ]
}
```

**Rationale**: Metadata-driven approach enables auto-discovery, allows rich index features (search, filtering), and maintains single source of truth per deck.

**Alternatives Considered**:

- Manual index.html with hardcoded links - Rejected: Not maintainable, error-prone
- Filesystem scanning at runtime - Rejected: Not possible with static hosting
- Git-based discovery - Rejected: Couples index to Git, complicates CI/CD

---

### 4. Slidev Theme System & Customization

**Question**: How can we create a Simplon-branded theme that shares common components with other themes?

**Decision**: Create two npm packages: `slidev-theme-common` (foundation) and `slidev-theme-simplon` (Simplon brand), using theme ejection for customization.

**Findings**:

- **Theme Creation**: Use `pnpm create slidev-theme` to scaffold
- **Package Naming**: Must start with `slidev-theme-*`
- **Required Keywords**: `["slidev-theme", "slidev"]` in package.json
- **Default Configs**: Themes can provide defaults via `slidev.defaults` field:

  ```json
  {
    "slidev": {
      "defaults": {
        "transition": "slide-left",
        "aspectRatio": "16/9",
        "colorSchema": "both"
      }
    }
  }
  ```

- **Theme Inheritance**: No formal parent-child mechanism, but themes can:
  - Eject existing theme via `slidev theme eject`
  - Override layouts/components through loading order
  - Import components from other packages

**Theme Structure**:

```
themes/simplon/
├── package.json          # slidev-theme-simplon
├── components/           # Vue components
├── layouts/              # Slide layouts
├── styles/               # Simplon brand CSS
│   ├── colors.css        # Brand colors as CSS vars
│   └── index.css         # Main stylesheet
├── setup/                # Slidev setup files
│   └── shiki.ts          # Code highlighting config
└── slides.md             # Local preview
```

**Component Sharing Strategy**:

- `themes/common/`: Shared Vue components (CodeBlock, LearningObjective, etc.)
- `themes/simplon/`: Imports from common, adds Simplon-specific styling
- Other themes can import from common for consistency

**Rationale**: Package-based themes enable npm distribution, version control, and reuse. Common foundation reduces duplication while allowing brand-specific customization.

**Alternatives Considered**:

- Single theme with CSS variables - Rejected: Limits customization depth, harder to manage multiple brand identities
- Copy-paste approach - Rejected: Maintenance nightmare, divergence over time
- CSS preprocessing with extends - Rejected: Doesn't support component-level inheritance

**Sources**:

- [Slidev: Writing Themes](https://sli.dev/guide/write-theme)
- [Slidev: Customizations](https://sli.dev/custom/)
- [Slidev: Eject Theme](https://sli.dev/features/eject-theme)

---

### 5. Automated Deck Discovery Mechanism

**Question**: How can the index page automatically detect new decks without manual updates?

**Decision**: Use build-time script that scans `decks/` directory for `meta.json` files and generates consolidated index data.

**Implementation**:

**Build Script** (`scripts/generate-index.sh`):

```bash
#!/bin/bash
# Scan decks directory and consolidate metadata
find decks -name "meta.json" -type f | \
  jq -s '.' > index/public/index-data.json
```

**CI/CD Integration**:

```yaml
# .github/workflows/build.yml
- name: Generate Index Data
  run: bun run generate-index
- name: Build All Decks
  run: bun run build:decks
- name: Build Index Page
  run: bun run build:index
```

**Package.json Scripts**:

```json
{
  "scripts": {
    "generate-index": "./scripts/generate-index.sh",
    "build:decks": "slidev build decks/*/slides.md --base /decks/",
    "build:index": "vite build index",
    "build:all": "bun run generate-index && bun run build:decks && bun run build:index"
  }
}
```

**Validation**: Script should validate meta.json against JSON schema before inclusion.

**Rationale**: Build-time generation is static-hosting compatible, provides single source of truth, and enables schema validation before deployment.

**Alternatives Considered**:

- Runtime filesystem access - Rejected: Impossible with static hosting (no Node.js runtime)
- Database-backed index - Rejected: Adds infrastructure complexity, overkill for static content
- Manual registration file - Rejected: Error-prone, requires remembering to update

---

### 6. Deployment Target Platform

**Question**: Which platform should be used for hosting the multi-deck project?

**Decision**: GitHub Pages (primary recommendation) with Netlify as alternative.

**Findings**:

- **GitHub Pages**:
  - Pros: Free, integrated with repo, simple GitHub Actions workflow
  - Cons: Public repos only for free tier, some URL limitations
  - Build: Uses GitHub Actions to run build scripts

- **Netlify**:
  - Pros: Free tier generous, preview deploys, instant rollbacks
  - Cons: Build minutes limited on free tier
  - Config: Requires `netlify.toml`

- **Vercel**:
  - Pros: Excellent DX, instant deploys, serverless functions available
  - Cons: May be overkill for static site
  - Config: Uses `vercel.json` for rewrites

**Recommended Setup** (GitHub Pages):

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: bun install --frozen-lockfile
      - run: bun run build:all
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Base Path Configuration**:

- GitHub Pages (org repo): `--base /repo-name/`
- Custom domain: `--base /`

**Rationale**: GitHub Pages provides zero-config hosting that integrates naturally with the development workflow. Free tier is sufficient for educational content.

**Alternatives Considered**:

- Self-hosted server - Rejected: Unnecessary maintenance, costs
- AWS S3 + CloudFront - Rejected: Complexity not justified for static content
- Firebase Hosting - Rejected: Requires Google account, less integrated with GitHub workflow

**Source**: [Slidev: Building and Hosting](https://sli.dev/guide/hosting)

---

## Summary of Resolved Clarifications

| Original Question | Resolution |
|------------------|------------|
| Simplon.co brand guidelines | Colors: #123744, #f26f5c, #ce0033; Fonts: DM Sans, Arial; Logos available via Brandfetch |
| Deployment target | GitHub Pages (primary), Netlify (alternative) |
| Multi-deck architecture | Directory-based structure with `slidev build decks/*/slides.md` |
| Index page implementation | Custom Vue 3 app reading meta.json files |
| Theme customization | Package-based themes with common foundation, no formal inheritance but component sharing |
| Auto-discovery | Build-time script scanning meta.json files to generate index-data.json |

---

## Next Steps

All research is complete. Ready to proceed to Phase 1:

1. Define data model for deck metadata and index structure
2. Create API contracts (JSON schemas) for metadata files
3. Generate quickstart documentation for creating new decks
4. Update agent context with technology decisions

---

**Sources Summary**:

- [Brandfetch - Simplon.co Brand Assets](https://brandfetch.com/simplon.co)
- [Slidev: Writing Themes](https://sli.dev/guide/write-theme)
- [Slidev: Building and Hosting](https://sli.dev/guide/hosting)
- [Slidev: Customizations](https://sli.dev/custom/)
- [GitHub Discussion #1777 - Monorepo Setup](https://github.com/slidevjs/slidev/discussions/1777)
- [GitHub Issue #1791 - Index Page Request](https://github.com/slidevjs/slidev/issues/1791)
