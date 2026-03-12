<script setup lang="ts">
// Two columns layout
</script>

<template>
  <div class="slidev-layout two-cols">
    <div class="col-left">
      <slot name="left" />
    </div>
    <div class="col-right">
      <slot name="right" />
    </div>
  </div>
</template>
