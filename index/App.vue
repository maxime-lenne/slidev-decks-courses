<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="site-title">Formations SQL</h1>
        <p class="site-subtitle">Présentations interactives avec Slidev</p>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <!-- Loading state -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Chargement des formations...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error">
          <p>❌ Erreur lors du chargement des formations</p>
          <p class="error-message">{{ error }}</p>
          <button @click="loadData" class="retry-button">Réessayer</button>
        </div>

        <!-- Empty state -->
        <div v-else-if="indexData && indexData.decks.length === 0" class="empty">
          <p>📚 Aucune formation disponible pour le moment.</p>
          <p class="empty-subtitle">Les nouvelles formations seront ajoutées prochainement.</p>
        </div>

        <!-- Deck grid -->
        <div v-else-if="indexData">
          <div class="stats">
            <div class="stat">
              <span class="stat-value">{{ indexData.stats.totalDecks }}</span>
              <span class="stat-label">Formations</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ formatDuration(indexData.stats.totalDuration) }}</span>
              <span class="stat-label">Durée totale</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ indexData.stats.tags.length }}</span>
              <span class="stat-label">Sujets</span>
            </div>
          </div>

          <DeckGrid :decks="indexData.decks" />
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Simplon Training Team - Powered by Slidev</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DeckGrid from './components/DeckGrid.vue'
import { loadIndexData, type IndexData } from './utils/deckLoader'

const loading = ref(true)
const error = ref<string | null>(null)
const indexData = ref<IndexData | null>(null)

async function loadData() {
  loading.value = true
  error.value = null

  try {
    indexData.value = await loadIndexData()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}min`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${mins}min`
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #123744 0%, #1e5a6f 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.site-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.site-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
}

.main {
  min-height: 60vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top-color: #123744;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #dc2626;
}

.error-message {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.5rem 0 1rem;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background: #123744;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #0f2a35;
}

.empty-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #123744;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.footer {
  background: #f8fafc;
  padding: 2rem 0;
  text-align: center;
  color: #64748b;
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .site-title {
    font-size: 2rem;
  }

  .site-subtitle {
    font-size: 1rem;
  }

  .stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
