# Quickstart Guide - Multi-Deck Slidev Project

**Last Updated**: 2025-11-24
**Target Audience**: Content creators adding new slide decks
**Prerequisites**: Node.js 18+, npm/pnpm, basic markdown knowledge

## Table of Contents

1. [Project Setup](#project-setup)
2. [Creating Your First Deck](#creating-your-first-deck)
3. [Writing Slides](#writing-slides)
4. [Testing Locally](#testing-locally)
5. [Customizing Theme](#customizing-theme)
6. [Publishing Your Deck](#publishing-your-deck)
7. [Common Tasks](#common-tasks)

---

## Project Setup

### Initial Installation

```bash
# Clone the repository
git clone <repository-url>
cd slidev-decks-simplon

# Install dependencies
npm install

# Verify installation
npm run validate
```

### Project Structure Overview

```
.
├── decks/              # Your slide decks go here
│   └── example/
│       ├── slides.md   # Slide content
│       ├── meta.json   # Deck metadata
│       └── assets/     # Images, files
├── themes/
│   ├── common/         # Shared components
│   └── simplon/        # Simplon.co theme
├── index/              # Index page app
└── scripts/            # Automation scripts
```

---

## Creating Your First Deck

### Option 1: Using the Creation Script (Recommended)

```bash
# Create a new deck with scaffolding
npm run create-deck sql-joins

# This creates:
# - decks/sql-joins/slides.md
# - decks/sql-joins/meta.json
# - decks/sql-joins/assets/
```

### Option 2: Manual Creation

```bash
# Create directories
mkdir -p decks/my-new-deck/assets

# Create slides file
touch decks/my-new-deck/slides.md

# Create metadata file
touch decks/my-new-deck/meta.json
```

### Configure Deck Metadata

Edit `decks/my-new-deck/meta.json`:

```json
{
  "id": "my-new-deck",
  "title": "My Awesome SQL Tutorial",
  "description": "Learn SQL fundamentals with practical examples and exercises.",
  "status": "draft",
  "objectives": [
    "Write basic SELECT queries",
    "Filter data with WHERE clauses",
    "Join multiple tables"
  ],
  "prerequisites": [
    "Basic programming concepts"
  ],
  "duration": "2 hours",
  "theme": "simplon",
  "thumbnail": "./assets/preview.png",
  "tags": ["sql", "database", "beginner"],
  "language": "fr",
  "version": "0.1.0",
  "authors": [
    {
      "name": "Your Name",
      "email": "you@example.com"
    }
  ],
  "created": "2025-11-24",
  "updated": "2025-11-24"
}
```

**Important Fields:**

- `id`: Must match directory name, lowercase with hyphens
- `status`: Start with `"draft"`, change to `"published"` when ready
- `duration`: Format as "X hours" or "Y minutes"
- `theme`: Use `"simplon"` for Simplon branding, or `"default"`

### Validate Your Metadata

```bash
# Validate metadata against schema
npm run validate

# Should output: ✅ All deck metadata files are valid
```

---

## Writing Slides

### Basic Slide Structure

Edit `decks/my-new-deck/slides.md`:

```markdown
---
theme: simplon
title: My Awesome SQL Tutorial
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# My Awesome SQL Tutorial

Learn SQL fundamentals with practical examples

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space to start <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: default
---

# Learning Objectives

By the end of this tutorial, you will be able to:

- Write basic SELECT queries
- Filter data with WHERE clauses
- Join multiple tables

---
layout: two-cols
---

# SQL Basics

SQL stands for Structured Query Language

::right::

```sql
SELECT name, email
FROM users
WHERE active = true;
```

---

# Practice Exercise

Try writing a query to select all products:

```sql
-- Your code here
SELECT * FROM products;
```

<v-click>

**Solution:**

```sql
SELECT product_id, name, price
FROM products
WHERE in_stock = true
ORDER BY price DESC;
```

</v-click>
```

### Using Slidev Features

**Layouts:**

```markdown
---
layout: cover
---
# Cover Slide

---
layout: two-cols
---
Left column
::right::
Right column

---
layout: center
---
Centered content
```

**Animations:**

```markdown
<v-click>

This appears on click

</v-click>

<v-clicks>

- Item 1
- Item 2
- Item 3

</v-clicks>
```

**Code Highlighting:**

```markdown
```sql {2,4|3|all}
SELECT *
FROM users
WHERE age > 18
ORDER BY name;
\```
```

### Adding Images

```markdown
# Database Schema

![Database Diagram](./assets/schema.png)

<!-- Or with sizing -->
<img src="./assets/logo.png" class="h-20" />
```

Place images in `decks/my-new-deck/assets/`

---

## Testing Locally

### Development Server

```bash
# Start dev server for your deck
npm run dev:deck my-new-deck

# Or use Slidev directly
npx slidev decks/my-new-deck/slides.md
```

Access at: `http://localhost:3030`

**Dev Server Features:**

- Auto-reload on file changes
- Presenter mode: Add `?presenter` to URL
- Drawing mode: Press `d` during presentation
- Overview mode: Press `o`

### Testing the Index Page

```bash
# Generate index data
npm run generate-index

# Start index dev server
npm run dev:index
```

Access at: `http://localhost:5173`

Verify your deck appears in the listing (if `status: "published"`)

---

## Customizing Theme

### Using Simplon Theme

Add to your slides frontmatter:

```yaml
---
theme: simplon
---
```

**Included Features:**

- Simplon.co brand colors
- DM Sans typography
- Custom layouts optimized for education
- Code syntax highlighting with SQL support

### Using Custom Components

Simplon theme provides reusable components:

```markdown
# Learning Objective

<LearningObjective>
Understand how to write efficient SQL queries
</LearningObjective>

# Code Example

<CodeBlock lang="sql" title="User Query">
SELECT * FROM users WHERE active = true;
</CodeBlock>

# Exercise Card

<ExerciseCard difficulty="beginner" duration="10 min">
Write a query to find all products under €20
</ExerciseCard>
```

### Overriding Styles

Create `decks/my-deck/styles.css`:

```css
/* Custom styles for this deck */
.slidev-layout {
  background: linear-gradient(to bottom, #f26f5c, #123744);
}

h1 {
  color: var(--simplon-elephant);
}
```

Reference in frontmatter:

```yaml
---
theme: simplon
css: ./styles.css
---
```

---

## Publishing Your Deck

### Pre-Publication Checklist

- [ ] All slides reviewed for accuracy
- [ ] Code examples tested and working
- [ ] Images optimized (<500KB each)
- [ ] Preview thumbnail created (400x300px, `assets/preview.png`)
- [ ] Metadata complete and validated (`npm run validate`)
- [ ] Presenter notes added for complex topics
- [ ] Accessibility checked (contrast, alt text)

### Update Metadata Status

Edit `meta.json`:

```json
{
  "status": "published",
  "version": "1.0.0",
  "updated": "2025-11-24"
}
```

### Create Preview Thumbnail

```bash
# Option 1: Screenshot the cover slide
# Open deck in browser, take 400x300px screenshot

# Option 2: Use Slidev export
npx slidev export decks/my-deck/slides.md --format png
# Crop first slide to 400x300px
# Save as decks/my-deck/assets/preview.png
```

### Commit and Push

```bash
# Validate before committing
npm run validate

# Stage your changes
git add decks/my-new-deck/

# Commit with descriptive message
git commit -m "Add SQL Joins tutorial deck

- Covers INNER, LEFT, RIGHT, and FULL JOINs
- Includes 5 practice exercises
- Estimated duration: 2 hours"

# Push to repository
git push origin main
```

### Automatic Deployment

After pushing:

1. CI/CD pipeline runs automatically
2. Validates all metadata
3. Generates index data
4. Builds all decks
5. Deploys to hosting (GitHub Pages/Netlify)
6. Your deck appears in the index within ~5 minutes

---

## Common Tasks

### Updating an Existing Deck

```bash
# 1. Edit slides or metadata
nano decks/sql-joins/slides.md

# 2. Update version and date in meta.json
# Increment patch: 1.0.0 → 1.0.1 (fixes/clarifications)
# Increment minor: 1.0.1 → 1.1.0 (new content added)
# Increment major: 1.1.0 → 2.0.0 (restructured, prerequisites changed)

# 3. Test locally
npm run dev:deck sql-joins

# 4. Validate and commit
npm run validate
git add decks/sql-joins/
git commit -m "Update SQL Joins deck: Add CROSS JOIN examples"
git push
```

### Adding Presenter Notes

```markdown
---
layout: default
---

# Complex Topic

Content visible to audience

<!--
Presenter notes (press 'p' in Slidev):
- Emphasize this point
- Common student misconceptions
- Extra examples if time permits
-->
```

### Creating Multi-Language Versions

```bash
# Create language variants
decks/
├── sql-basics/         # French version
│   ├── slides.md
│   └── meta.json       # "language": "fr"
└── sql-basics-en/      # English version
    ├── slides.md
    └── meta.json       # "language": "en"
```

### Archiving Old Content

```json
{
  "status": "archived"
}
```

Archived decks won't appear in the index but remain accessible via direct URL.

### Troubleshooting

**Problem: Deck not appearing in index**

```bash
# Check metadata status
cat decks/my-deck/meta.json | grep status
# Should be: "status": "published"

# Regenerate index
npm run generate-index

# Check for validation errors
npm run validate
```

**Problem: Theme not loading**

```bash
# Check theme name in slides.md frontmatter
# Must match installed theme

# For Simplon theme:
theme: simplon

# Not: theme: "simplon-theme" or theme: slidev-theme-simplon
```

**Problem: Images not displaying**

```markdown
# Use relative paths from slides.md
![Correct](./assets/image.png)

# Not absolute paths
![Wrong](/decks/my-deck/assets/image.png)
```

---

## Next Steps

- Review the [Data Model](./data-model.md) for schema details
- Explore [Constitution](../../.specify/memory/constitution.md) for quality standards
- Check [Research](./research.md) for technical decisions
- Browse existing decks in `decks/` for examples

## Getting Help

- **Slidev Documentation**: <https://sli.dev/>
- **Project Issues**: <repository-url>/issues
- **Team Contact**: <training@simplon.co>

---

**Version**: 1.0.0 | **Last Updated**: 2025-11-24
