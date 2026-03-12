<script setup lang="ts">
import { computed } from 'vue'

// Image-right layout - content on left, image on right
const props = defineProps<{
  image?: string
}>()

// Access frontmatter image property
const frontmatter = computed(() => {
  if (typeof window !== 'undefined' && (window as any).$slidev) {
    return (window as any).$slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter || {}
  }
  return {}
})

const imageUrl = computed(() => props.image || frontmatter.value.image)
</script>

<template>
  <div class="slidev-layout image-right">
    <div class="content">
      <slot />
    </div>
    <div class="image-container flex items-center justify-center">
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-full h-full object-cover rounded-lg" />
    </div>
  </div>
</template>
