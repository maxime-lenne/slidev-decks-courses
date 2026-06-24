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
  <div class="slidev-layout cover" :style="style">
    <LiquidChrome class="section-liquid-bg" :interactive="interactive" />
    <div class="my-auto w-full text-center">
      <slot />
    </div>
  </div>
</template>
