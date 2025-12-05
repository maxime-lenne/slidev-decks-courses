<template>
  <div class="slidev-layout center-layout">
    <div class="center-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.center-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 3rem;
  background: var(--simplon-white);
  position: relative;
}

html.dark .center-layout {
  background: var(--simplon-elephant);
}

.center-layout::before {
  content: '';
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  border: 3px solid var(--simplon-light-grey);
  border-radius: 16px;
  pointer-events: none;
}

html.dark .center-layout::before {
  border-color: rgba(242, 111, 92, 0.2);
}

.center-content {
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 2rem;
}
</style>
