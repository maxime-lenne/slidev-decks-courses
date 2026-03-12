<template>
  <div class="index-dashboard">
    <!-- Loading state -->
    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
      <p>Chargement des formations...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="state-error">
      <p>Erreur lors du chargement des formations</p>
      <p class="error-message">{{ error }}</p>
      <button @click="loadData" class="retry-button">Réessayer</button>
    </div>

    <!-- Empty state -->
    <div v-else-if="indexData && indexData.decks.length === 0" class="state-empty">
      <p>Aucune formation disponible pour le moment.</p>
    </div>

    <!-- Dashboard -->
    <div v-else-if="indexData" class="dashboard-content">
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DeckGrid from './DeckGrid.vue'
import { loadIndexData, type IndexData } from '../utils/deckLoader'

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
  if (hours > 0 && mins > 0) return `${hours}h ${mins}min`
  if (hours > 0) return `${hours}h`
  return `${mins}min`
}

onMounted(() => loadData())
</script>

<style scoped>
.index-dashboard {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.state-loading,
.state-error,
.state-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--color-simplon-burnt-sienna, #f26f5c);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.state-error {
  color: #f87171;
}

.error-message {
  font-size: 0.85rem;
  opacity: 0.7;
}

.retry-button {
  padding: 0.5rem 1.25rem;
  background: var(--color-simplon-elephant, #123744);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-simplon-burnt-sienna, #f26f5c);
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.2rem;
}
</style>
