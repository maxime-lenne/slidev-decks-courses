<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $frontmatter, $nav } = useSlideContext()
</script>

<template>
  <div class="slidev-layout default">
    <header class="slide-header" v-if="$frontmatter.header !== false">
      <div class="header-logo">
        <!-- Small Simplon logo in header -->
        <div class="logo-small">SIMPLON</div>
      </div>
      <div class="header-title" v-if="$frontmatter.title">
        {{ $frontmatter.title }}
      </div>
    </header>

    <main class="slide-content">
      <slot />
    </main>

    <footer class="slide-footer" v-if="$frontmatter.footer !== false">
      <div class="footer-info">
        <span v-if="$frontmatter.author">{{ $frontmatter.author }}</span>
      </div>
      <div class="footer-page">
        {{ $nav.currentPage }} / {{ $nav.total }}
      </div>
    </footer>
  </div>
</template>

<style scoped>
.default {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  background: var(--simplon-white);
  position: relative;
}

html.dark .default {
  background: var(--simplon-elephant);
}

.slide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem 1rem 3rem;
  background: linear-gradient(90deg, var(--simplon-elephant) 0%, #1e5a6f 100%);
  position: relative;
}

.slide-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 3rem;
  right: 3rem;
  height: 4px;
  background: var(--simplon-burnt-sienna);
}

.header-logo .logo-small {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--simplon-white);
  letter-spacing: 0.2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.header-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--simplon-burnt-sienna);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.slide-content {
  flex: 1;
  overflow-y: auto;
  padding: 3rem;
}

.slide-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  background: linear-gradient(90deg, var(--simplon-off-white) 0%, var(--simplon-light-grey) 100%);
  font-size: 0.875rem;
  color: var(--simplon-grey);
  position: relative;
}

.slide-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 3rem;
  right: 3rem;
  height: 2px;
  background: linear-gradient(90deg, var(--simplon-burnt-sienna) 0%, var(--simplon-monza) 100%);
}

html.dark .slide-footer {
  background: linear-gradient(90deg, #0a1f28 0%, var(--simplon-elephant) 100%);
  color: var(--simplon-light-grey);
}

.footer-info {
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-page {
  font-weight: 700;
  color: var(--simplon-elephant);
  font-size: 0.9375rem;
  padding: 0.25rem 0.75rem;
  background: var(--simplon-burnt-sienna);
  color: var(--simplon-white);
  border-radius: 4px;
}

html.dark .footer-page {
  background: var(--simplon-burnt-sienna);
  color: var(--simplon-elephant);
}
</style>
