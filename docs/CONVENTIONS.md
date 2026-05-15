# Conventions

Advanced coding conventions and guidelines.

## Code Style

### General Principles

- Write readable, self-documenting code
- Follow the DRY principle (Don't Repeat Yourself)
- Keep functions small and focused
- Use meaningful names for variables and functions

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `deck-card.vue` |
| Classes | PascalCase | `DeckCard` |
| Functions | camelCase | `loadDeckMeta` |
| Constants | UPPER_SNAKE_CASE | `MAX_DECKS_PER_PAGE` |
| Variables | camelCase | `deckTitle` |

### File Organization

```typescript
// 1. Imports (external first, then internal)
import { ref, computed } from 'vue';
import { loadDecks } from './utils/deckLoader';

// 2. Types/Interfaces
interface DeckMeta {
  id: string;
  title: string;
}

// 3. Constants
const DEFAULT_STATUS = 'draft';

// 4. Component/Function
export function useDeck(id: string) {
  // Implementation
}
```

---

## Markdown Content Style (Slides)

### Slide Structure

```markdown
---
theme: simplon
title: Slide Deck Title
---

# Slide Title

Content here

---
layout: two-cols
---

# Left Column Title

Left content

::right::

Right content
```

### Content Rules

- Use `#` for slide titles (one per slide)
- Use `---` to separate slides
- Wrap SQL in triple backticks with `sql` language tag
- Use Vue components with `<ComponentName />` syntax
- Maximum 7 bullet points per slide
- Maximum 20 lines of code per code block

### SQL Example Style

```markdown
\```sql
-- Include context comment
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
-- Expected: each user with their order count (0 if none)
\```
```

- Include setup scripts (CREATE TABLE, INSERT) for standalone examples
- Show expected output as comments
- Keep queries under 20 lines for readability
- Test all queries before committing

---

## Project Organization

### Directory Structure

```text
project-root/
├── .github/            # GitHub configuration
│   ├── workflows/      # CI/CD workflows
│   └── ISSUE_TEMPLATE/ # Issue templates
├── decks/              # Slide deck content
├── docs/               # Documentation
├── index/              # Index page Vue app
├── scripts/            # Automation scripts
├── themes/             # Slidev themes
├── package.json
├── bun.lock
├── CLAUDE.md           # AI assistant guide
└── README.md
```

### Import Order

1. External packages
2. Internal modules (absolute paths)
3. Relative imports
4. Styles

---

## Git Conventions

### Branch Naming

```text
feature/short-description
fix/issue-number-description
refactor/component-name
docs/update-readme
chore/maintenance-task
```

### Commit Messages (Gitmoji or Conventional)

This project accepts **Gitmoji** or **Conventional Commits** formats:

```bash
# Use the interactive gitmoji tool
bun run commit
```

#### Gitmoji Format

`<emoji> <description>`

Examples:

- `✨ Add sql-joins slide deck`
- `🐛 Fix deck not appearing in index`
- `📝 Update TECHNICAL_GUIDE with Slidev commands`

Common gitmojis:

| Emoji | When to use |
|-------|-------------|
| ✨ | New feature |
| 🐛 | Bug fix |
| 📝 | Documentation |
| 🎨 | Code style/format |
| ♻️ | Refactor |
| 🔧 | Configuration |
| ✅ | Add tests |
| 🔥 | Remove code/files |
| 🚀 | Deploy |
| 💄 | UI/style |
| ⬆️ | Upgrade dependencies |

Full reference: [gitmoji.dev](https://gitmoji.dev)

#### Conventional Commits Format

`<type>(scope): <description>`

Examples:

- `feat(decks): add sql-joins deck`
- `fix(index): fix deck not appearing after publish`
- `docs: update TECHNICAL_GUIDE with Slidev commands`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## Accessibility Guidelines

- Alt text for all images
- Descriptive link text (not "click here")
- Sufficient color contrast (WCAG AA minimum: 4.5:1 normal text, 3:1 large text)
- Avoid relying solely on color to convey information
- Keyboard-navigable components (native in Slidev)

---

## Documentation

### Markdown Style

- Follow markdownlint rules
- No trailing whitespace
- Single blank line between sections
- Use fenced code blocks with language identifier

---

*Last updated: 2026-05-16*
