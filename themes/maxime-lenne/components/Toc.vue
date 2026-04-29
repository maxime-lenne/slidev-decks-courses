<script setup lang="ts">
import type { TocItem } from '@slidev/types'
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client/context'

interface Item {
  title: string
  to: number | string
}

const props = withDefaults(
  defineProps<{
    items?: Item[]
    maxDepth?: string | number
    minDepth?: string | number
  }>(),
  {
    maxDepth: 1,
    minDepth: 1,
  },
)

const { $slidev } = useSlideContext()

function flattenAuto(): Item[] {
  const tree = $slidev?.nav.tocTree as TocItem[] | undefined
  if (!tree)
    return []
  const min = Number(props.minDepth)
  const max = Number(props.maxDepth)
  const out: Item[] = []
  function walk(nodes: TocItem[]) {
    for (const node of nodes) {
      if (node.hideInToc)
        continue
      if (node.level >= min && node.level <= max)
        out.push({ title: node.title ?? '', to: node.no })
      if (node.children?.length)
        walk(node.children)
    }
  }
  walk(tree)
  return out
}

const items = computed<Item[]>(() => props.items ?? flattenAuto())

function pad(n: number) {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <div class="h-full flex items-center gap-16 px-4">
    <div class="w-2/5">
      <h1 class="text-[4.5rem] font-black leading-[1.05] text-[#457b9d] uppercase tracking-tight">
        Table<br>of<br>Contents
      </h1>
    </div>
    <div class="w-3/5">
      <ol class="space-y-3 text-lg list-none">
        <li
          v-for="(item, idx) in items"
          :key="idx"
          class="flex gap-5 items-start"
        >
          <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">{{ pad(idx + 1) }}</span>
          <Link
            :to="item.to"
            class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors"
          >
            {{ item.title }}
          </Link>
        </li>
      </ol>
    </div>
  </div>
</template>
