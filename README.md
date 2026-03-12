# Formations SQL - Multi-Deck Slidev Project

Multi-deck Slidev presentation system for SQL training with Simplon branding. Features a centralized index page, easy deck creation workflow, and custom theming support.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

#### View the index page

```bash
# Generate index data and start dev server
npm run generate-index
npm run dev:index
```

Open <http://localhost:5173> to see all available presentations.

#### View a specific deck

```bash
# View example-sql-basics deck
npm run dev:deck --deck=example-sql-basics
```

Open <http://localhost:3030> to view the Slidev presentation.

### Build for Production

```bash
# Build everything (index + all decks)
npm run build:all
```

Output will be in `dist/`:

- `dist/index.html` - Index page
- `dist/decks/*/` - Built presentations

## 📁 Project Structure

```
.
├── decks/                      # Slide deck directories
│   ├── example-sql-basics/
│   │   ├── slides.md           # Slidev presentation
│   │   ├── meta.json           # Deck metadata
│   │   └── assets/             # Images, files
│   └── example-advanced-queries/
├── index/                      # Index page Vue app
│   ├── App.vue                 # Main component
│   ├── components/             # Vue components
│   ├── utils/                  # Utilities
│   └── index.html              # Entry point
├── themes/                     # Custom Slidev themes
│   ├── common/                 # Shared components
│   └── simplon/                # Simplon-branded theme
├── scripts/                    # Build scripts
│   ├── generate-index.sh       # Generate index data
│   ├── build-all.sh            # Build pipeline
│   └── validate-metadata.js    # Validate deck metadata
├── public/                     # Static assets
└── specs/                      # Documentation
    └── 001-multi-deck-index/
        ├── spec.md             # Feature specification
        ├── plan.md             # Implementation plan
        ├── data-model.md       # Data model
        ├── research.md         # Technical research
        └── quickstart.md       # Deck creation guide
```

## 📝 Creating a New Deck

### Manual Creation

1. Create deck directory:

```bash
mkdir -p decks/my-new-deck/assets
```

1. Create `decks/my-new-deck/slides.md`:

```markdown
---
theme: default
title: My New Deck
---

# My New Deck

Content goes here
```

1. Create `decks/my-new-deck/meta.json`:

```json
{
  "id": "my-new-deck",
  "title": "My New Deck",
  "description": "Brief description here",
  "status": "published",
  "objectives": ["Learn something"],
  "prerequisites": [],
  "duration": "1 hour",
  "theme": "default",
  "thumbnail": "./assets/preview.svg",
  "tags": ["tag1", "tag2"],
  "language": "fr",
  "version": "1.0.0",
  "authors": [{"name": "Your Name"}],
  "created": "2025-11-24",
  "updated": "2025-11-24"
}
```

1. Generate index and view:

```bash
npm run generate-index
npm run dev:index
```

### Using Creation Script (Future Enhancement)

```bash
npm run create-deck my-new-deck
```

## 🎨 Themes

### Available Themes

- `default` - Standard Slidev theme
- `simplon` - Simplon.co branded theme (in development)

### Using a Theme

In your `slides.md` frontmatter:

```yaml
---
theme: simplon
---
```

### Creating Custom Themes

See `themes/` directory for examples. Follow Slidev theme conventions:

- Package name: `slidev-theme-*`
- Include layouts, components, and styles

## 🔍 Metadata Validation

Validate all deck metadata against JSON schemas:

```bash
npm run validate
```

This checks:

- Required fields present
- Correct data types
- Valid formats (dates, semver, etc.)
- Status values

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:index` | Start index page dev server |
| `npm run dev:deck --deck=NAME` | Start Slidev for specific deck |
| `npm run generate-index` | Generate index data from metadata |
| `npm run build:index` | Build index page |
| `npm run build:decks` | Build all Slidev presentations |
| `npm run build:all` | Full build pipeline |
| `npm run validate` | Validate deck metadata |
| `npm test` | Run tests |

## 🚢 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:

1. Validates metadata
2. Builds all decks and index
3. Deploys to GitHub Pages

Push to `main` branch to trigger deployment.

### Manual Deployment

```bash
npm run build:all
```

Deploy the `dist/` directory to any static hosting service (Netlify, Vercel, etc.).

## 📚 Documentation

Detailed documentation is available in `specs/001-multi-deck-index/`:

- **[spec.md](specs/001-multi-deck-index/spec.md)** - Feature requirements and user stories
- **[plan.md](specs/001-multi-deck-index/plan.md)** - Technical implementation plan
- **[data-model.md](specs/001-multi-deck-index/data-model.md)** - Data structures and schemas
- **[research.md](specs/001-multi-deck-index/research.md)** - Technical research and decisions
- **[quickstart.md](specs/001-multi-deck-index/quickstart.md)** - Deck creation guide
- **[contracts/](specs/001-multi-deck-index/contracts/)** - JSON Schema definitions

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Validate metadata: `npm run validate`
4. Test locally: `npm run dev:index`
5. Build: `npm run build:all`
6. Submit a pull request

## 📄 License

MIT

## 👥 Authors

Simplon Training Team

## 🔗 Links

- [Slidev Documentation](https://sli.dev/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Simplon.co](https://simplon.co/)
