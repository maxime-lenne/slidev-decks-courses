# Slidev Theme Simplon

Simplon.co branded Slidev theme for educational presentations.

## Features

- **Brand Colors**: Official Simplon.co color palette
  - Primary: `#123744` (Elephant)
  - Accent: `#f26f5c` (Burnt Sienna)
  - Highlight: `#ce0033` (Monza)

- **Typography**: DM Sans for headings and body text, Fira Code for code blocks

- **Layouts**:
  - `cover` - Title slide with branding
  - `default` - Content slides with header/footer

- **Dark Mode**: Full support for light and dark color schemes

- **Accessibility**: WCAG AA compliant, motion-safe animations

## Usage

In your `slides.md` frontmatter:

```yaml
---
theme: simplon
title: Your Presentation Title
---
```

## Customization

Override theme variables in your deck's custom CSS:

```css
:root {
  --simplon-elephant: #123744;
  --simplon-burnt-sienna: #f26f5c;
  --simplon-monza: #ce0033;
}
```

## License

MIT © Simplon Training Team
