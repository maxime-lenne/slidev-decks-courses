export interface DeckMetadata {
  id: string
  title: string
  description: string
  status: string
  objectives: string[]
  prerequisites: string[]
  duration: string
  theme: string
  thumbnail: string
  tags: string[]
  language: string
  version: string
  authors: Array<{ name: string; email?: string }>
  created: string
  updated: string
}

export interface IndexStats {
  totalDecks: number
  totalDuration: number
  languages: string[]
  themes: string[]
  tags: string[]
}

export interface IndexData {
  generated: string
  version: string
  decks: DeckMetadata[]
  stats: IndexStats
}

export async function loadIndexData(): Promise<IndexData> {
  try {
    const response = await fetch('/index-data.json')

    if (!response.ok) {
      throw new Error(`Failed to load index data: ${response.statusText}`)
    }

    const data: IndexData = await response.json()
    return data
  } catch (error) {
    console.error('Error loading index data:', error)
    throw error
  }
}

// Port mapping for local development
// Each deck runs on its own Slidev dev server
const DEV_DECK_PORTS: Record<string, number> = {
  'example-sql-basics': 3030,
  'sql-basics': 3031,
  'sql-basics-practice': 3032,
  'sql-advanced-queries': 3033,
  'sql-advanced-queries-practice': 3034,
}

export function getDeckUrl(deckId: string): string {
  // In development, link to the deck's Slidev dev server
  if (import.meta.env.DEV && DEV_DECK_PORTS[deckId]) {
    return `http://localhost:${DEV_DECK_PORTS[deckId]}/`
  }

  // In production, use relative path
  return `/decks/${deckId}/`
}

export function getThumbnailUrl(deckId: string, thumbnailPath: string): string {
  // In development, fetch thumbnail from the deck's Slidev dev server
  if (import.meta.env.DEV && DEV_DECK_PORTS[deckId]) {
    const cleanPath = thumbnailPath.replace('./', '')
    return `http://localhost:${DEV_DECK_PORTS[deckId]}/${cleanPath}`
  }

  // In production, use relative path
  return `/decks/${deckId}/${thumbnailPath.replace('./', '')}`
}
