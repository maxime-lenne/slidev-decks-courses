<template>
  <div class="slidev-layout section-layout">
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--simplon-elephant) 0%, #1e5a6f 100%);
  color: white;
  padding: 4rem 3rem;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.section-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--simplon-burnt-sienna), var(--simplon-monza), var(--simplon-burnt-sienna));
}

.section-layout::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--simplon-burnt-sienna), var(--simplon-monza), var(--simplon-burnt-sienna));
}

.section-content {
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.section-content :deep(h1),
.section-content :deep(h2),
.section-content :deep(h3) {
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.section-content :deep(h1) {
  font-size: 4rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
}

.section-content :deep(h1)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: var(--simplon-burnt-sienna);
  border-radius: 2px;
}

.section-content :deep(h2) {
  font-size: 2.5rem;
  color: var(--simplon-burnt-sienna);
}

.section-content :deep(p) {
  font-size: 1.5rem;
  opacity: 0.95;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-content :deep(h1) {
    font-size: 2.5rem;
  }

  .section-content :deep(p) {
    font-size: 1.25rem;
  }
}
</style>
