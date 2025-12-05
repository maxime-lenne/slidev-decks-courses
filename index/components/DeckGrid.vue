<template>
  <div class="deck-grid">
    <DeckCard v-for="deck in decks" :key="deck.id" :deck="deck" />
  </div>
</template>

<script setup lang="ts">
import DeckCard from './DeckCard.vue'
import type { DeckMetadata } from '../utils/deckLoader'

interface Props {
  decks: DeckMetadata[]
}

defineProps<Props>()
</script>

<style scoped>
.deck-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .deck-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .deck-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .deck-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
