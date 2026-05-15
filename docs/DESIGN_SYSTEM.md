# Design System

UI/UX design system for Slidev themes in this project.

## Design Principles

- **Pedagogical clarity** - Content hierarchy guides learners; never sacrifice readability for aesthetics.
- **Accessibility** - WCAG 2.1 AA compliance; all slides are keyboard-navigable.
- **Responsive** - Presentations work on mobile viewports (320px+) and large screens.
- **Performance** - Static builds, optimized images (<500KB per asset), <3s initial load.
- **Motion-safe** - No animations that trigger motion sensitivity; use `@prefers-reduced-motion`.

---

## Color System

### Simplon Theme (`themes/simplon/`)

Brand colors from Simplon.co:

```css
:root {
  --simplon-elephant: #123744;     /* Primary dark — headings, backgrounds */
  --simplon-coral: #f26f5c;        /* Accent — highlights, CTA */
  --simplon-red: #ce0033;          /* Error / warning emphasis */
  --simplon-steel: #457b9d;        /* Secondary — links, secondary headings */
  --simplon-slate: #475569;        /* Muted text */
  --simplon-white: #ffffff;
}
```

All color combinations verified to meet WCAG AA contrast ratios.

### maxime-lenne Theme (`themes/maxime-lenne/`)

```css
:root {
  --ml-dark: #1d3557;
  --ml-blue: #457b9d;
  --ml-teal: #123744;
  --ml-slate: #475569;
}
```

Used in Mermaid diagrams:

```text
style A fill:#1d3557
style B fill:#457b9d
style C fill:#123744
style D fill:#475569
style E fill:#1d3557
```

### Semantic Colors (shared)

```css
:root {
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

---

## Typography

### Simplon Theme

- **Body font**: DM Sans (Google Fonts)
- **Code font**: JetBrains Mono or system monospace

### Slidev Content Guidelines

| Element | Minimum Size | Notes |
|---------|-------------|-------|
| Body text | 24pt | Never go below this on slides |
| Headings | 36pt | `h1` on slides |
| Code blocks | 18pt | Keep readable without zooming |

### Cognitive Load Rules

- Maximum **7 bullet points** per slide
- Maximum **20 lines of code** per code block
- One concept per slide when possible

---

## Spacing

Uses Slidev's built-in UnoCSS/Windi CSS utility classes:

```text
p-4   → 1rem
p-8   → 2rem
mt-6  → 1.5rem
gap-4 → 1rem
```

---

## Layout

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Slidev Slide Dimensions

Default: 1920×1080 (16:9). Responsive scaling handled by Slidev.

---

## Components (Slide-Level)

See [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) for full documentation.

| Component | Theme | Description |
|-----------|-------|-------------|
| `CodeBlock` | common | Syntax-highlighted code with copy button |
| `LearningObjective` | common | Highlighted learning goal callout |
| `ExerciseCard` | common | Exercise prompt with difficulty/duration |
| `DeckCard` | index | Card showing deck info on the index page |

---

## Animations

Slidev transitions are configured in slide frontmatter:

```yaml
transition: slide-left   # or fade, none
```

Always respect motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .slidev-layout * { transition: none !important; }
}
```

---

## Accessibility

- All images must have `alt` text
- Code examples must be copyable (Slidev `shiki` highlighter)
- Color contrast minimum 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation native to Slidev (arrow keys, space bar)
- Skip-to-content link on index page

---

*Last updated: 2026-05-16*
