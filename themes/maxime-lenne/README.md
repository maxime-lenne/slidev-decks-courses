# Slidev Theme: Maxime Lenne

A custom Slidev theme based on the [maxime-lenne.fr](https://maxime-lenne.fr) design system.

## Features

- **Blue to Green Gradient**: Signature gradient color scheme
- **Modern Design**: Clean, professional aesthetic
- **Multiple Layouts**: 12+ layout options for different content types
- **Dark/Light Mode**: Automatic color scheme switching
- **Accessible**: High contrast and readable typography

## Color Palette

### Primary Colors

- Primary Blue: `#2563eb`
- Secondary Green: `#10b981`

### Gradients

- Main gradient: `linear-gradient(135deg, #2563eb 0%, #10b981 100%)`

## Available Layouts

### Cover (`layout: cover`)
Full-screen layout with gradient background, perfect for title slides.

### Section (`layout: section`)
Section divider with gradient background and centered content.

### Default (`layout: default`)
Standard content layout with padding.

### Two Columns (`layout: two-cols`)
Two-column layout for side-by-side content.

```markdown
::left::
Left content here

::right::
Right content here
```

### Center (`layout: center`)
Centered content, both horizontally and vertically.

### Quote (`layout: quote`)
Styled layout for displaying quotes.

### Fact/Statement (`layout: fact` or `layout: statement`)
Large, impactful text for key numbers or statements.

### Image Layouts (`layout: image-right` or `layout: image-left`)
Content with image positioning.

```markdown
::default::
Your content here

::image::
![Image](path/to/image)
```

### Full (`layout: full`)
Edge-to-edge layout with no padding.

### Intro (`layout: intro`)
Similar to cover but with softer styling.

## Usage

In your `slides.md` frontmatter:

```yaml
---
theme: ../../themes/maxime-lenne
title: Your Presentation Title
---
```

## Custom Components & Classes

### Gradient Border

```html
<div class="gradient-border">
  <div class="gradient-border-content">
    Your content with gradient border
  </div>
</div>
```

### Highlight Box

```html
<div class="highlight-box">
  Highlighted content with gradient accent
</div>
```

### Badge

```html
<span class="badge">Tag</span>
```

### Grid Layouts

```html
<div class="grid-2"><!-- 2 columns --></div>
<div class="grid-3"><!-- 3 columns --></div>
<div class="grid-4"><!-- 4 columns --></div>
```

## Typography

Headings automatically use the gradient text effect. Use `**bold**` for gradient-styled bold text.

## Installation

This theme is local to the project. Simply reference it in your slide deck:

```yaml
theme: ../../themes/maxime-lenne
```

## License

MIT License - Maxime Lenne
