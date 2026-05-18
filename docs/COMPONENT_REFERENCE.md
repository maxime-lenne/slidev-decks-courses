# Component Reference

Complete technical reference for Vue components used in this project.

## Overview

Components live in two places:

- **`index/components/`** — Vue components for the index page
- **`themes/common/components/`** and **`themes/simplon/components/`** — Reusable slide-level components

### Naming Convention

- **Component Name**: PascalCase (e.g., `DeckCard`, `CodeBlock`)
- **File Name**: match component name (e.g., `DeckCard.vue`)
- **Props**: camelCase

---

## Index Page Components (`index/components/`)

### DeckCard

Displays a single deck's metadata as a clickable card on the index page.

| File | Path |
|------|------|
| Component | `index/components/DeckCard.vue` |

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Deck identifier (matches directory name) |
| `title` | `string` | yes | Deck display title |
| `description` | `string` | yes | Short description |
| `thumbnail` | `string` | no | Path to preview image (`assets/preview.png`) |
| `tags` | `string[]` | no | Topic tags |
| `duration` | `string` | no | Estimated duration (e.g., `"2 hours"`) |
| `status` | `'draft' \| 'published' \| 'archived'` | yes | Publication status |

#### Usage

```vue
<DeckCard
  id="sql-basics"
  title="SQL Basics"
  description="Learn SQL fundamentals"
  duration="2 hours"
  status="published"
  :tags="['sql', 'beginner']"
/>
```

---

### DeckGrid

Renders a responsive grid of `DeckCard` components.

| File | Path |
|------|------|
| Component | `index/components/DeckGrid.vue` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `decks` | `DeckMeta[]` | - | Array of deck metadata objects |
| `filter` | `string` | `''` | Search/filter string applied to title and tags |

---

## Slide-Level Components (`themes/common/components/`)

These components are available in any Slidev deck via `<ComponentName />` in markdown.

### CodeBlock

Displays a code snippet with syntax highlighting, optional title, and copy button.

| File | Path |
|------|------|
| Component | `themes/common/components/CodeBlock.vue` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'text'` | Language for syntax highlighting (e.g., `sql`, `js`) |
| `title` | `string` | - | Optional title displayed above the block |

#### Usage in Slidev markdown

```markdown
<CodeBlock lang="sql" title="User Query">
SELECT * FROM users WHERE active = true;
</CodeBlock>
```

---

### LearningObjective

Displays a highlighted callout for learning objectives.

| File | Path |
|------|------|
| Component | `themes/common/components/LearningObjective.vue` |

#### Usage

```markdown
<LearningObjective>
Understand how to write efficient SQL JOIN queries
</LearningObjective>
```

---

### ExerciseCard

Displays an exercise prompt with difficulty level and estimated time.

| File | Path |
|------|------|
| Component | `themes/common/components/ExerciseCard.vue` |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `difficulty` | `'beginner' \| 'intermediate' \| 'advanced'` | `'beginner'` | Exercise difficulty |
| `duration` | `string` | - | Estimated time (e.g., `"10 min"`) |

#### Usage

```markdown
<ExerciseCard difficulty="beginner" duration="10 min">
Write a query to find all products under €20
</ExerciseCard>
```

---

## Deck Metadata Schema

Each deck must have a `meta.json` file. Required structure:

```json
{
  "id": "sql-basics",
  "title": "SQL Basics",
  "description": "Learn SQL fundamentals with practical examples.",
  "status": "published",
  "objectives": ["Write SELECT queries", "Filter with WHERE"],
  "prerequisites": ["Basic programming concepts"],
  "duration": "2 hours",
  "theme": "simplon",
  "thumbnail": "./assets/preview.png",
  "tags": ["sql", "beginner"],
  "language": "fr",
  "version": "1.0.0",
  "authors": [{ "name": "Maxime Lenne", "email": "hello@maxime-lenne.fr" }],
  "created": "2025-11-24",
  "updated": "2026-05-16"
}
```

**Key rules:**

- `id` must match the directory name, lowercase with hyphens
- `status: "draft"` hides the deck from the index; use `"published"` to show it
- `thumbnail` is relative to the deck directory (400×300px recommended)

---

*Last updated: 2026-05-16*
