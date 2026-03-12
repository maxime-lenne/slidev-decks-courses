# Common Theme Components

Shared components and layouts for use across all Slidev themes in this project.

## Components

### CodeBlock

Display code with syntax highlighting and a copy button.

```vue
<CodeBlock title="User Query" lang="sql">

```sql
SELECT * FROM users WHERE active = true;
\```

</CodeBlock>
```

**Props:**

- `title` (string, optional): Title for the code block
- `lang` (string, optional): Language for syntax highlighting

### LearningObjective

Highlight a learning objective with an icon.

```vue
<LearningObjective>
Understand how to write efficient SQL queries
</LearningObjective>
```

### ExerciseCard

Create an interactive exercise card with difficulty and duration indicators.

```vue
<ExerciseCard difficulty="beginner" duration="10 min">
Write a query to find all products under €20
</ExerciseCard>
```

**Props:**

- `difficulty` ('beginner' | 'intermediate' | 'advanced', optional): Exercise difficulty level
- `duration` (string, optional): Estimated time to complete (e.g., "10 min", "30 minutes")

## Layouts

### two-cols

Two-column layout for side-by-side content.

```markdown
---
layout: two-cols
---

# Left Column

Content here

::right::

# Right Column

Content here
```

### center

Centered content layout for emphasis.

```markdown
---
layout: center
---

# Centered Title

Centered content
```

### section

Section divider with branded background.

```markdown
---
layout: section
---

# New Section Title
```

## Usage in Themes

To use these components in a theme, import them in your theme's setup file:

```typescript
import { defineAppSetup } from '@slidev/types'
import CodeBlock from '../common/components/CodeBlock.vue'
import LearningObjective from '../common/components/LearningObjective.vue'
import ExerciseCard from '../common/components/ExerciseCard.vue'

export default defineAppSetup(({ app }) => {
  app.component('CodeBlock', CodeBlock)
  app.component('LearningObjective', LearningObjective)
  app.component('ExerciseCard', ExerciseCard)
})
```

## License

MIT © Simplon Training Team
