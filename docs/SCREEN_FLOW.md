# Screen Flow

Application screen flow and navigation.

## Overview

```
[User] → [Index Page] → [Slide Deck Presentation]
                              ↓
                        [Presenter Mode]
                              ↓
                        [Overview Mode]
```

## Screens

### Index Page

- **Purpose** - Lists all published slide decks with title, description, and thumbnail.
- **Entry Points** - Root URL (`/` or `/index.html`)
- **Exit Points** - Any individual slide deck (click on a deck card)

### Slide Deck Presentation

- **Purpose** - Full Slidev presentation for a specific topic.
- **Entry Points** - From index page, or direct URL (`/decks/{deck-id}/`)
- **Exit Points** - Browser back to index, or direct URL navigation

### Presenter Mode

- **Purpose** - Speaker view with notes, timer, and slide preview.
- **Entry Points** - Append `?presenter` to any deck URL, or press `p`
- **Exit Points** - Close presenter window or press `p` again

### Overview Mode

- **Purpose** - Grid thumbnail view of all slides in the current deck.
- **Entry Points** - Press `o` during a presentation
- **Exit Points** - Press `o` again or click a slide to navigate to it

---

## User Flows

### Flow 1: Browse and Open a Deck

1. User navigates to the root URL
2. Index page loads and displays all published decks
3. User clicks on a deck card
4. Slidev presentation opens at slide 1
5. User navigates slides with arrow keys or space bar

### Flow 2: Create and Publish a New Deck

1. Creator runs `bun run create-deck <name>` to scaffold deck
2. Creator edits `decks/<name>/slides.md` with content
3. Creator fills `decks/<name>/meta.json` (title, description, status: `"draft"`)
4. Creator runs `bun run validate` to check metadata
5. Creator updates `status: "published"` in `meta.json`
6. Creator commits and pushes — CI/CD builds and deploys automatically
7. New deck appears in the index page

### Flow 3: Present with Presenter Mode

1. Presenter opens deck URL on main screen
2. Presenter appends `?presenter` to URL in a second window/device
3. Presenter uses second screen with notes while audience sees main view
4. Press `d` to toggle drawing mode, `o` for overview

---

*Last updated: 2026-05-16*
