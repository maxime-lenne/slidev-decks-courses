<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  background: {
    type: String,
    default: '',
  },
})

const style = computed(() => {
  if (props.background) {
    return {
      backgroundImage: `url(${props.background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return {}
})
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <div class="my-auto w-full text-center">
      <slot />
    </div>
  </div>
</template>
