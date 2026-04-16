# [PROJECT NAME] Development Guidelines

Auto-generated from all feature plans. Last updated: [DATE]

## Active Technologies

[EXTRACTED FROM ALL PLAN.MD FILES]

### Slidev-Specific Technologies

- **Framework**: Slidev (Vue 3-based presentation framework)
- **Markdown**: Extended markdown with Vue components
- **Styling**: UnoCSS/Windi CSS for utility-first styling
- **Interactivity**: Vue components for interactive SQL demos

## Project Structure

```text
[ACTUAL STRUCTURE FROM PLANS]
```

### Typical Slidev Structure

```text
slides/
├── slides.md           # Main slide content
├── components/         # Vue components for interactive demos
├── public/            # Static assets (images, data files)
├── setup/             # Slidev setup files
└── styles/            # Custom styles

examples/
└── sql/               # Executable SQL examples with test data
```

## Commands

[ONLY COMMANDS FOR ACTIVE TECHNOLOGIES]

### Slidev Commands

```bash
# Development server with hot reload
bun run dev

# Build for production
bun run build

# Export to PDF
bun run export

# Export to SPA (static hosting)
bun run build -- --base /[repo-name]/
```

## Code Style

[LANGUAGE-SPECIFIC, ONLY FOR LANGUAGES IN USE]

### Markdown Content Style

- Use `#` for slide titles (one per slide)
- Use `---` to separate slides
- Use `::code-group` for multiple code examples
- Wrap SQL in triple backticks with `sql` language tag
- Use Vue components with `<ComponentName />` syntax

### SQL Example Style

- Include setup scripts (CREATE TABLE, INSERT)
- Show expected output as comments
- Keep queries under 20 lines for readability
- Test all queries before committing

### Accessibility Guidelines

- Alt text for all images
- Descriptive link text (not "click here")
- Sufficient color contrast (use devtools to verify)
- Avoid relying solely on color to convey information

## Recent Changes

[LAST 3 FEATURES AND WHAT THEY ADDED]

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
