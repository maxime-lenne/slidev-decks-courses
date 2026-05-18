# slidev-decks-courses

Multi-deck Slidev presentation project for technical training (SQL, API, CI/CD, GenAI...).

**Full AI guide**: [`docs/AGENTS.md`](./docs/AGENTS.md)

## Essential Rules

1. **Consult docs/** before any task — especially `AGENTS.md` and `TECHNICAL_GUIDE.md`
2. **Update docs/** if you change behavior, commands, or structure
3. **Follow conventions** from `docs/CONVENTIONS.md`
4. **Run `bun run lint`** before committing

## Quick Reference

```bash
bun run dev               # Index page dev server (port 5173)
bun run dev:deck <name>   # Deck dev server (port 3030)
bun run build:all         # Build everything
bun run validate          # Validate all meta.json files
bun run create-deck <n>   # Scaffold a new slide deck
bun run lint              # Lint markdown + yaml
bun run commit            # Interactive gitmoji commit
```

## Tech Stack

Slidev + Vue 3 + Vite + TypeScript + Bun + Husky + semantic-release
