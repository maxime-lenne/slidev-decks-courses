<template>
  <div class="code-block-wrapper">
    <div class="code-block-header" v-if="title">
      <span class="code-block-title">{{ title }}</span>
      <button
        class="copy-button"
        @click="copyCode"
        :class="{ 'copied': copied }"
        :aria-label="copied ? 'Code copied!' : 'Copy code'"
      >
        <span v-if="!copied">📋</span>
        <span v-else>✓</span>
      </button>
    </div>
    <div class="code-block-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  lang?: string
}>()

const copied = ref(false)

function copyCode(event: MouseEvent) {
  const codeBlock = (event.target as HTMLElement).closest('.code-block-wrapper')
  const code = codeBlock?.querySelector('code')?.textContent

  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}
</script>

<style scoped>
.code-block-wrapper {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}

html.dark .code-block-wrapper {
  background: #1e293b;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #e9ecef;
  border-bottom: 1px solid #dee2e6;
}

html.dark .code-block-header {
  background: #334155;
  border-bottom-color: #475569;
}

.code-block-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #495057;
}

html.dark .code-block-title {
  color: #e2e8f0;
}

.copy-button {
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.copy-button:hover {
  background: #ffffff;
  border-color: #123744;
}

html.dark .copy-button {
  border-color: #64748b;
}

html.dark .copy-button:hover {
  background: #475569;
  border-color: #f26f5c;
}

.copy-button.copied {
  background: #28a745;
  border-color: #28a745;
  color: white;
}

.code-block-content {
  padding: 1rem;
  overflow-x: auto;
}

.code-block-content :deep(pre) {
  margin: 0;
  background: transparent !important;
}

.code-block-content :deep(code) {
  background: transparent;
  padding: 0;
}
</style>
