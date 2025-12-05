<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout cover simplon-gradient-primary">
    <div class="cover-content">
      <div class="cover-logo">
        <!-- Simplon logo placeholder - replace with actual logo -->
        <div class="logo-placeholder">SIMPLON</div>
      </div>

      <h1 class="cover-title">
        <slot />
      </h1>

      <div class="cover-subtitle" v-if="$frontmatter.subtitle">
        {{ $frontmatter.subtitle }}
      </div>

      <div class="cover-info">
        <div v-if="$frontmatter.author" class="author">
          {{ $frontmatter.author }}
        </div>
        <div v-if="$frontmatter.date" class="date">
          {{ $frontmatter.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 4rem 3rem;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.cover::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 60%;
  height: 200%;
  background: radial-gradient(circle, rgba(242, 111, 92, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cover::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -20%;
  width: 50%;
  height: 150%;
  background: radial-gradient(circle, rgba(206, 0, 51, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cover-content {
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.cover-logo {
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease-out;
}

.logo-placeholder {
  font-size: 3rem;
  font-weight: 700;
  color: var(--simplon-burnt-sienna);
  letter-spacing: 0.3em;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;
}

.logo-placeholder::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 10%;
  right: 10%;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--simplon-burnt-sienna), transparent);
}

.cover-title {
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.1;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.cover-subtitle {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--simplon-burnt-sienna);
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.cover-info {
  margin-top: 4rem;
  font-size: 1.125rem;
  opacity: 0.95;
  animation: fadeIn 0.8s ease-out 0.6s both;
}

.author {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.date {
  opacity: 0.85;
  font-size: 1rem;
  font-style: italic;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .cover-title {
    font-size: 2.5rem;
  }

  .cover-subtitle {
    font-size: 1.25rem;
  }

  .logo-placeholder {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cover-content *,
  .logo-placeholder,
  .cover-title,
  .cover-subtitle,
  .cover-info {
    animation: none;
  }
}
</style>
