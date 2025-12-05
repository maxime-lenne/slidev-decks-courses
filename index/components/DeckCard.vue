<template>
  <article class="deck-card">
    <a :href="deckUrl" class="deck-card-link">
      <div class="deck-card-image">
        <img :src="thumbnailUrl" :alt="`${deck.title} preview`" />
      </div>
      <div class="deck-card-content">
        <h2 class="deck-card-title">{{ deck.title }}</h2>
        <p class="deck-card-description">{{ deck.description }}</p>

        <div class="deck-card-meta">
          <span class="deck-card-duration">⏱️ {{ deck.duration }}</span>
          <span class="deck-card-language">🌐 {{ deck.language.toUpperCase() }}</span>
        </div>

        <div class="deck-card-tags">
          <span v-for="tag in deck.tags" :key="tag" class="deck-card-tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DeckMetadata } from '../utils/deckLoader'
import { getDeckUrl, getThumbnailUrl } from '../utils/deckLoader'

interface Props {
  deck: DeckMetadata
}

const props = defineProps<Props>()

const deckUrl = computed(() => getDeckUrl(props.deck.id))
const thumbnailUrl = computed(() => getThumbnailUrl(props.deck.id, props.deck.thumbnail))
</script>

<style scoped>
.deck-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.deck-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.deck-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.deck-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.deck-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.deck-card-content {
  padding: 1.5rem;
}

.deck-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #123744;
}

.deck-card-description {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.deck-card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #64748b;
}

.deck-card-duration,
.deck-card-language {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.deck-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.deck-card-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0e7ff;
  color: #4338ca;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .deck-card-content {
    padding: 1rem;
  }

  .deck-card-title {
    font-size: 1.25rem;
  }

  .deck-card-image {
    height: 150px;
  }
}
</style>
