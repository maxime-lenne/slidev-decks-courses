# Data Model: Multi-Deck Slidev Project

**Date**: 2025-11-24
**Phase**: 1 - Design
**Status**: Complete

## Overview

This document defines the data entities, relationships, and validation rules for the multi-deck Slidev project. The model supports independent slide decks with rich metadata, custom theming, and automated index generation.

---

## Entity Definitions

### 1. Slide Deck

**Description**: A complete, independent Slidev presentation on a specific topic.

**Location**: `decks/{deck-id}/`

**Structure**:

```
decks/{deck-id}/
├── slides.md          # Slidev presentation content (markdown)
├── meta.json          # Deck metadata (see DeckMetadata entity)
├── package.json       # Deck-specific dependencies (optional)
└── assets/            # Deck-specific images, files
    └── preview.png    # Thumbnail for index (400x300px recommended)
```

**Properties**:

- `deck-id` (string, required): Unique identifier, kebab-case, used in URLs
- `slides.md` (file, required): Markdown file with Slidev frontmatter
- `meta.json` (file, required): Machine-readable metadata for index
- `assets/` (directory, optional): Local resources for this deck

**Relationships**:

- Has one DeckMetadata (required)
- Uses one Theme (via Slidev frontmatter)
- Generates one BuildArtifact

**Validation Rules**:

- `deck-id` must be unique across all decks
- `deck-id` must match directory name
- `deck-id` must be valid URL slug (lowercase, hyphens, no spaces)
- `slides.md` must contain valid Slidev frontmatter
- `meta.json` must conform to DeckMetadata schema

**State Transitions**:

```
[Draft] → [Review] → [Published] → [Archived]
  ↓          ↓           ↓
[Draft] ← [Draft] ← [Published]
```

**Example**:

```
decks/sql-basics/
├── slides.md          # Contains: "---\ntheme: simplon\ntitle: SQL Basics\n---"
├── meta.json          # See DeckMetadata example
└── assets/
    └── preview.png
```

---

### 2. DeckMetadata

**Description**: Machine-readable metadata describing a slide deck for discovery and display in the index.

**Location**: `decks/{deck-id}/meta.json`

**Schema**:

```typescript
interface DeckMetadata {
  id: string;                    // Unique identifier (must match deck-id)
  title: string;                 // Human-readable title
  description: string;           // Brief summary (1-2 sentences, max 160 chars)
  status: DeckStatus;            // Publication status
  objectives: string[];          // Learning objectives (3-5 items)
  prerequisites: string[];       // Required knowledge (0-5 items)
  duration: string;              // Estimated time (e.g., "2 hours", "90 minutes")
  theme: string;                 // Slidev theme name (e.g., "simplon", "default")
  thumbnail: string;             // Relative path to preview image
  tags: string[];                // Searchable tags (e.g., ["SQL", "Beginner"])
  language: string;              // ISO 639-1 code (e.g., "fr", "en")
  version: string;               // Semantic version (e.g., "1.0.0")
  authors: Author[];             // Content creators
  created: string;               // ISO 8601 date (YYYY-MM-DD)
  updated: string;               // ISO 8601 date (YYYY-MM-DD)
}

type DeckStatus = "draft" | "review" | "published" | "archived";

interface Author {
  name: string;                  // Full name
  email?: string;                // Contact email (optional)
}
```

**Validation Rules**:

- `id` must match parent directory name
- `title` required, 5-100 characters
- `description` required, max 160 characters (for meta tags)
- `status` must be one of: draft, review, published, archived
- `objectives` must have 1-5 items
- `prerequisites` can be empty array
- `duration` must match pattern: /^\d+\s+(minutes?|hours?|days?)$/
- `theme` must reference installed theme or "default"
- `thumbnail` must be relative path within deck directory
- `tags` must be lowercase, max 10 tags
- `language` must be valid ISO 639-1 code
- `version` must follow semantic versioning (major.minor.patch)
- `authors` must have at least one author
- `created` must be valid ISO 8601 date
- `updated` must be ≥ `created` date

**Example**:

```json
{
  "id": "sql-basics",
  "title": "SQL Fundamentals",
  "description": "Introduction to SQL queries, data types, and basic database operations for beginners.",
  "status": "published",
  "objectives": [
    "Write SELECT queries with WHERE clauses",
    "Understand primary and foreign keys",
    "Perform basic JOINs between tables"
  ],
  "prerequisites": [
    "Basic programming concepts",
    "Understanding of tabular data"
  ],
  "duration": "2 hours",
  "theme": "simplon",
  "thumbnail": "./assets/preview.png",
  "tags": ["sql", "database", "beginner", "queries"],
  "language": "fr",
  "version": "1.0.0",
  "authors": [
    {
      "name": "Simplon Training Team",
      "email": "training@simplon.co"
    }
  ],
  "created": "2025-11-24",
  "updated": "2025-11-24"
}
```

---

### 3. IndexData

**Description**: Consolidated catalog of all published slide decks, generated at build time for the index page.

**Location**: `index/public/index-data.json` (generated)

**Schema**:

```typescript
interface IndexData {
  generated: string;             // ISO 8601 timestamp of generation
  version: string;               // Index data schema version
  decks: DeckMetadata[];         // Array of all published deck metadata
  stats: IndexStats;             // Aggregate statistics
}

interface IndexStats {
  totalDecks: number;            // Count of published decks
  totalDuration: number;         // Sum of all durations in minutes
  languages: string[];           // Unique languages available
  themes: string[];              // Unique themes in use
  tags: string[];                // All unique tags across decks
}
```

**Generation**: Created by `scripts/generate-index.sh` which:

1. Scans `decks/` for all `meta.json` files
2. Validates each against DeckMetadata schema
3. Filters to only `status: "published"` decks
4. Calculates aggregate statistics
5. Writes consolidated JSON to `index/public/index-data.json`

**Validation Rules**:

- Only includes decks with `status: "published"`
- Invalid `meta.json` files are logged but skipped
- `generated` timestamp must be current build time
- `stats` must reflect actual deck contents

**Example**:

```json
{
  "generated": "2025-11-24T10:30:00Z",
  "version": "1.0.0",
  "decks": [
    { /* DeckMetadata for sql-basics */ },
    { /* DeckMetadata for advanced-queries */ }
  ],
  "stats": {
    "totalDecks": 2,
    "totalDuration": 240,
    "languages": ["fr"],
    "themes": ["simplon", "default"],
    "tags": ["sql", "database", "beginner", "advanced", "queries"]
  }
}
```

---

### 4. Theme

**Description**: Visual styling configuration for slide decks, packaged as npm module following Slidev theme conventions.

**Location**: `themes/{theme-name}/`

**Structure**:

```
themes/{theme-name}/
├── package.json         # Theme package definition
├── index.ts             # Theme entry point (optional)
├── components/          # Vue components
│   └── *.vue
├── layouts/             # Slide layouts
│   └── *.vue
├── styles/              # Stylesheets
│   └── index.css
├── setup/               # Slidev setup files
│   ├── shiki.ts         # Code highlighting config
│   └── shortcuts.ts     # Keyboard shortcuts
└── slides.md            # Local preview/testing
```

**Package.json Schema**:

```typescript
interface ThemePackage {
  name: string;                  // Format: "slidev-theme-{name}"
  version: string;               // Semantic version
  keywords: string[];            // Must include: ["slidev-theme", "slidev"]
  main?: string;                 // Entry point (optional)
  engines: {
    slidev: string;              // Version constraint (e.g., ">=0.48.0")
  };
  slidev: {
    defaults?: SlidevConfig;     // Default presentation settings
    colorSchema?: "light" | "dark" | "both";
  };
}

interface SlidevConfig {
  transition?: string;           // Default transition (e.g., "slide-left")
  aspectRatio?: string;          // Default aspect ratio (e.g., "16/9")
  [key: string]: any;            // Other Slidev config options
}
```

**Properties**:

- Common theme: Provides shared components/layouts for reuse
- Simplon theme: Implements Simplon.co brand guidelines
- Custom themes: Can be added for other brands or styles

**Validation Rules**:

- Package name must start with `slidev-theme-`
- Must include keywords: `["slidev-theme", "slidev"]`
- `engines.slidev` must specify version constraint
- Layouts must export valid Vue components
- Styles must compile without errors

**Simplon Theme Specifics**:

```json
{
  "name": "slidev-theme-simplon",
  "version": "1.0.0",
  "keywords": ["slidev-theme", "slidev", "simplon", "education"],
  "engines": {
    "slidev": ">=0.48.0"
  },
  "slidev": {
    "defaults": {
      "transition": "slide-left",
      "aspectRatio": "16/9",
      "colorSchema": "both",
      "fonts": {
        "sans": "DM Sans, Arial, sans-serif",
        "mono": "Fira Code, monospace"
      }
    },
    "colorSchema": "both"
  }
}
```

**CSS Variables** (Simplon theme):

```css
:root {
  --simplon-elephant: #123744;      /* Primary dark */
  --simplon-burnt-sienna: #f26f5c;  /* Primary light */
  --simplon-monza: #ce0033;         /* Accent */

  --slidev-theme-primary: var(--simplon-elephant);
  --slidev-theme-accent: var(--simplon-burnt-sienna);
  --slidev-theme-highlight: var(--simplon-monza);
}
```

---

### 5. BuildConfiguration

**Description**: Settings and scripts for building multiple decks and the index page.

**Location**: Root `package.json` scripts section

**Schema**:

```typescript
interface BuildConfiguration {
  scripts: {
    "generate-index": string;    // Script to create index-data.json
    "build:decks": string;       // Build all slide decks
    "build:index": string;       // Build index page
    "build:all": string;         // Full build pipeline
    "dev:deck": string;          // Dev server for single deck
    "dev:index": string;         // Dev server for index page
    "create-deck": string;       // Scaffold new deck
    "validate": string;          // Validate all meta.json files
  };
  buildOptions: {
    baseUrl: string;             // Base path for deployment (e.g., "/")
    outputDir: string;           // Build output directory
    deckPattern: string;         // Glob pattern for decks
  };
}
```

**Example**:

```json
{
  "scripts": {
    "generate-index": "./scripts/generate-index.sh",
    "build:decks": "slidev build decks/*/slides.md --base /decks/ --out dist/decks",
    "build:index": "vite build index --outDir dist",
    "build:all": "npm run generate-index && npm run build:decks && npm run build:index",
    "dev:deck": "slidev decks/$DECK/slides.md",
    "dev:index": "vite index",
    "create-deck": "./scripts/create-deck.sh",
    "validate": "node scripts/validate-metadata.js"
  }
}
```

---

## Entity Relationships

```
IndexData
  │
  └──[aggregates]──> DeckMetadata (many)
                         │
                         └──[describes]──> Slide Deck
                                              │
                                              ├──[uses]──> Theme
                                              │
                                              └──[generates]──> BuildArtifact

Theme
  │
  ├──[extends]──> Common Components (shared)
  │
  └──[applied to]──> Slide Deck (many)

BuildConfiguration
  │
  ├──[orchestrates]──> Deck Builds (many)
  │
  ├──[orchestrates]──> Index Build
  │
  └──[uses]──> IndexData generation
```

**Cardinality**:

- One Slide Deck has exactly one DeckMetadata
- One DeckMetadata describes exactly one Slide Deck
- One Slide Deck uses zero or one Theme (default if none specified)
- One Theme can be applied to many Slide Decks
- One IndexData aggregates many DeckMetadata entries
- One BuildConfiguration orchestrates all builds

---

## Data Flow

### Creation Flow (New Deck)

```
1. User runs: npm run create-deck sql-advanced
   └─> Script creates: decks/sql-advanced/
       ├── slides.md (template)
       └── meta.json (template with id pre-filled)

2. User edits slides.md and meta.json
   └─> Adds content, sets status: "draft"

3. User tests locally: npm run dev:deck sql-advanced
   └─> Slidev dev server starts on localhost:3030

4. User updates meta.json status: "published"

5. User commits and pushes to Git
   └─> CI/CD pipeline triggers build
```

### Build Flow

```
1. CI/CD: npm run build:all
   │
   ├─> npm run generate-index
   │   ├─> Scans decks/*/meta.json
   │   ├─> Validates against schema
   │   ├─> Filters status="published"
   │   ├─> Calculates stats
   │   └─> Writes index/public/index-data.json
   │
   ├─> npm run build:decks
   │   ├─> Slidev builds each deck
   │   ├─> Outputs to dist/decks/{deck-id}/
   │   └─> Each has index.html + assets
   │
   └─> npm run build:index
       ├─> Vite builds index app
       ├─> Includes index-data.json
       └─> Outputs to dist/index.html

2. Deploy dist/ to hosting
   ├─> / serves index.html
   └─> /decks/{deck-id}/ serves deck presentation
```

### Runtime Flow (User Browsing)

```
1. User visits https://example.com/
   └─> Loads index.html

2. Index app fetches index-data.json
   └─> Parses and displays deck catalog

3. User clicks "SQL Basics" card
   └─> Navigates to /decks/sql-basics/

4. Slidev presentation loads
   └─> User navigates slides with keyboard/mouse
```

---

## Validation Summary

| Entity | Required Fields | Unique Constraints | Format Validations |
|--------|----------------|-------------------|-------------------|
| Slide Deck | deck-id, slides.md, meta.json | deck-id | deck-id is valid URL slug |
| DeckMetadata | id, title, description, status, duration, theme, version, authors, created, updated | id | ISO dates, semver, duration pattern, tag lowercase |
| IndexData | generated, version, decks | - | ISO timestamp, valid DeckMetadata array |
| Theme | package.json with name, keywords, engines | package name | Name starts with "slidev-theme-" |
| BuildConfiguration | scripts object | - | Valid shell commands |

---

## Next Steps

Data model is complete. Ready to generate:

1. JSON Schema contracts for DeckMetadata and IndexData
2. Quickstart guide referencing these entities
3. Validation scripts to enforce rules

---

**Version**: 1.0.0 | **Last Updated**: 2025-11-24
