<script setup lang="ts">
interface TocEntry {
  title: string
  to: number | string
}

const props = defineProps<{
  items?: TocEntry[]
}>()

function pad(n: number) {
  return String(n + 1).padStart(2, '0')
}
</script>

<template>
  <div class="slidev-layout toc">
    <div class="toc-title">
      <h1>Table<br>of<br>Contents</h1>
    </div>
    <ol class="toc-list">
      <li v-for="(item, idx) in props.items" :key="idx" class="toc-item">
        <span class="toc-index">{{ pad(idx) }}</span>
        <Link :to="item.to">{{ item.title }}</Link>
      </li>
    </ol>
  </div>
</template>
