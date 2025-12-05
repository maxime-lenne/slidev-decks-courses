<template>
  <div class="exercise-card" :class="[`difficulty-${difficulty}`]">
    <div class="exercise-header">
      <div class="exercise-badge">
        <span class="badge-icon">✏️</span>
        <span class="badge-text">Exercise</span>
      </div>
      <div class="exercise-meta">
        <span class="difficulty-badge" v-if="difficulty">
          {{ difficultyLabel }}
        </span>
        <span class="duration-badge" v-if="duration">
          ⏱️ {{ duration }}
        </span>
      </div>
    </div>
    <div class="exercise-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  duration?: string
}>()

const difficultyLabel = computed(() => {
  const labels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé'
  }
  return props.difficulty ? labels[props.difficulty] : ''
})
</script>

<style scoped>
.exercise-card {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.exercise-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

html.dark .exercise-card {
  background: #1e293b;
  border-color: #334155;
}

.exercise-card.difficulty-beginner {
  border-left: 6px solid #28a745;
}

.exercise-card.difficulty-intermediate {
  border-left: 6px solid #ffc107;
}

.exercise-card.difficulty-advanced {
  border-left: 6px solid #ce0033;
}

.exercise-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}

html.dark .exercise-header {
  border-bottom-color: #334155;
}

.exercise-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #123744;
}

html.dark .exercise-badge {
  color: #f26f5c;
}

.badge-icon {
  font-size: 1.25rem;
}

.badge-text {
  font-size: 1.125rem;
}

.exercise-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.difficulty-badge,
.duration-badge {
  padding: 0.25rem 0.75rem;
  background: #f8f9fa;
  border-radius: 12px;
  font-weight: 500;
  white-space: nowrap;
}

html.dark .difficulty-badge,
html.dark .duration-badge {
  background: #334155;
}

.difficulty-beginner .difficulty-badge {
  background: #d4edda;
  color: #155724;
}

html.dark .difficulty-beginner .difficulty-badge {
  background: rgba(40, 167, 69, 0.2);
  color: #90ee90;
}

.difficulty-intermediate .difficulty-badge {
  background: #fff3cd;
  color: #856404;
}

html.dark .difficulty-intermediate .difficulty-badge {
  background: rgba(255, 193, 7, 0.2);
  color: #ffd966;
}

.difficulty-advanced .difficulty-badge {
  background: #f8d7da;
  color: #721c24;
}

html.dark .difficulty-advanced .difficulty-badge {
  background: rgba(206, 0, 51, 0.2);
  color: #ff6b85;
}

.exercise-content {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #212529;
}

html.dark .exercise-content {
  color: #e2e8f0;
}

.exercise-content :deep(code) {
  background: #f8f9fa;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.9em;
}

html.dark .exercise-content :deep(code) {
  background: #334155;
}

.exercise-content :deep(pre) {
  margin-top: 1rem;
}
</style>
