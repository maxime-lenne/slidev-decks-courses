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
    const response = await fetch(import.meta.env.BASE_URL + 'index-data.json')

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

// Deck port mapping for dev:all mode
// This will be populated dynamically from vite.proxy.config.js
let deckPortsCache: Record<string, number> | null = null

async function getDeckPorts(): Promise<Record<string, number>> {
  if (deckPortsCache) return deckPortsCache

  try {
    const response = await fetch(import.meta.env.BASE_URL + 'deck-ports.json')
    if (response.ok) {
      deckPortsCache = await response.json()
      return deckPortsCache!
    }
  } catch {
    // Fallback to empty object in production
  }

  return {}
}

export async function getDeckUrl(deckId: string): Promise<string> {
  // In dev:all mode, link directly to the deck's Slidev dev server
  if (import.meta.env.DEV) {
    const deckPorts = await getDeckPorts()
    if (deckPorts[deckId]) {
      return `http://localhost:${deckPorts[deckId]}/`
    }
  }

  // In production, use base-relative path
  return `${import.meta.env.BASE_URL}decks/${deckId}/`
}

export function getThumbnailUrl(deckId: string, thumbnailPath: string): string {
  const cleanPath = thumbnailPath.replace('./', '')
  return `${import.meta.env.BASE_URL}decks/${deckId}/${cleanPath}`
}
