<script setup lang="ts">
import LiquidChrome from '../components/LiquidChrome.vue'

withDefaults(
  defineProps<{
    interactive?: boolean
  }>(),
  {
    interactive: true,
  },
)
</script>

<template>
  <div class="slidev-layout section-liquid">
    <LiquidChrome class="section-liquid-bg" :interactive="interactive" />
    <div class="section-liquid-content my-auto w-full">
      <slot />
    </div>
  </div>
</template>
