<template>
  <div class="learning-objective">
    <div class="objective-icon">
      🎯
    </div>
    <div class="objective-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.learning-objective {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid #f26f5c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

html.dark .learning-objective {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-left-color: #f26f5c;
}

.objective-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  line-height: 1;
}

.objective-content {
  flex: 1;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #212529;
}

html.dark .objective-content {
  color: #e2e8f0;
}

.objective-content :deep(strong) {
  color: #123744;
  font-weight: 700;
}

html.dark .objective-content :deep(strong) {
  color: #f26f5c;
}

.objective-content :deep(p) {
  margin: 0;
}

.objective-content :deep(ul) {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.objective-content :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
