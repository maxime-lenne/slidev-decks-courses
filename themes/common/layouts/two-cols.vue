<template>
  <div class="slidev-layout two-cols-layout">
    <div class="col-left">
      <slot />
    </div>
    <div class="col-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-cols-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  height: 100%;
  padding: 3rem;
  background: var(--simplon-white);
}

html.dark .two-cols-layout {
  background: var(--simplon-elephant);
}

.col-left,
.col-right {
  overflow-y: auto;
  position: relative;
}

.col-left {
  padding-right: 1.5rem;
  border-right: 3px solid var(--simplon-burnt-sienna);
}

html.dark .col-left {
  border-right-color: rgba(242, 111, 92, 0.5);
}

.col-right {
  padding-left: 1.5rem;
}

@media (max-width: 768px) {
  .two-cols-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .col-left {
    border-right: none;
    border-bottom: 3px solid var(--simplon-burnt-sienna);
    padding-right: 0;
    padding-bottom: 1.5rem;
  }

  .col-right {
    padding-left: 0;
    padding-top: 1.5rem;
  }
}
</style>
