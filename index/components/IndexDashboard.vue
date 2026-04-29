<template>
  <div class="index-dashboard">
    <div v-if="loading" class="state-center">
      <div class="spinner"></div>
      <p class="state-text">Chargement des formations...</p>
    </div>

    <div v-else-if="error" class="state-center">
      <p class="state-text state-text--error">Erreur lors du chargement</p>
      <p class="state-subtext">{{ error }}</p>
      <button @click="loadData" class="retry-button">Réessayer</button>
    </div>

    <div v-else-if="indexData && indexData.decks.length === 0" class="state-center">
      <p class="state-text">Aucune formation disponible.</p>
    </div>

    <div v-else-if="indexData" class="dashboard-content">
      <header class="dashboard-header">
        <h1 class="dashboard-title">Formations</h1>
        <p class="dashboard-subtitle">Catalogue des cours</p>
      </header>

      <div class="section__stats">
        <div class="stat-number">
          <div class="stat-number__number">{{ indexData.stats.totalDecks }}</div>
          <div class="stat-number__label">Formations</div>
        </div>
        <div class="stat-number">
          <div class="stat-number__number">{{ formatDuration(indexData.stats.totalDuration) }}</div>
          <div class="stat-number__label">Durée totale</div>
        </div>
        <div class="stat-number">
          <div class="stat-number__number">{{ indexData.stats.tags.length }}</div>
          <div class="stat-number__label">Sujets</div>
        </div>
        <div class="stat-number">
          <div class="stat-number__number">{{ indexData.stats.languages.length }}</div>
          <div class="stat-number__label">Langues</div>
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
  if (hours > 0 && mins > 0) return `${hours}h${mins}`
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
  background: var(--ml-background, #ffffff);
  box-sizing: border-box;
}

/* ── States ─────────────────────────────────────────────── */

.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 0.75rem;
}

.state-text {
  font-size: 1rem;
  color: var(--ml-text-secondary, #64748b);
  margin: 0;
}

.state-text--error { color: #ef4444; }

.state-subtext {
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--ml-border, #e2e8f0);
  border-top-color: var(--ml-color-primary, #2563eb);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.retry-button {
  padding: 0.5rem 1.25rem;
  background: var(--ml-gradient-primary, linear-gradient(135deg, #2563eb, #10b981));
  color: white;
  border: none;
  border-radius: var(--ml-radius-full, 9999px);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.15s;
}

.retry-button:hover { opacity: 0.85; }

/* ── Dashboard ───────────────────────────────────────────── */

.dashboard-content {
  padding: 2rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 800;
  background: var(--ml-gradient-text, linear-gradient(135deg, #2563eb 0%, #10b981 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.dashboard-subtitle {
  font-size: 0.9rem;
  color: var(--ml-text-secondary, #64748b);
  margin: 0;
}

/* ── Stats — replicates section__stats from maxime-lenne.fr ─ */

.section__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: var(--ml-background-alt, #f8fafc);
  border: 1px solid var(--ml-border, #e2e8f0);
  border-radius: 12px;
}

.stat-number {
  text-align: center;
}

.stat-number__number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  background: var(--ml-gradient-text, linear-gradient(135deg, #2563eb 0%, #10b981 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.4rem;
}

.stat-number__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ml-text-secondary, #64748b);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
