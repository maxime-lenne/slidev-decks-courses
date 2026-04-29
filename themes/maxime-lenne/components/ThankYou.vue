<script setup lang="ts">
import { computed } from 'vue'

interface Exercise {
  name: string
  url?: string
  label?: string
}

const props = withDefaults(
  defineProps<{
    deckSlug: string
    deckBaseUrl?: string
    slidesRepo?: string
    githubUser?: string
    exercises?: (string | Exercise)[]
    qrUrl?: string
    qrLabel?: string
  }>(),
  {
    deckBaseUrl: 'https://decks.maxime-lenne.fr/decks',
    slidesRepo: 'slidev-decks-courses',
    githubUser: 'maxime-lenne',
    exercises: () => [],
  },
)

const deckUrl = computed(() => `${props.deckBaseUrl}/${props.deckSlug}`)
const qrTarget = computed(() => props.qrUrl ?? deckUrl.value)

const qrSrc = computed(() => {
  const data = encodeURIComponent(qrTarget.value)
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${data}&bgcolor=0f172a&color=FFF&margin=6`
})

const slidesUrl = computed(() => `https://github.com/${props.githubUser}/${props.slidesRepo}`)

const exerciseList = computed(() =>
  props.exercises.map((e) => {
    if (typeof e === 'string')
      return { name: e, url: `https://github.com/${props.githubUser}/${e}`, label: e }
    return {
      name: e.name,
      url: e.url ?? `https://github.com/${props.githubUser}/${e.name}`,
      label: e.label ?? e.name,
    }
  }),
)

const qrCaption = computed(
  () => props.qrLabel ?? (exerciseList.value.length ? 'Slides & exercices' : 'Slides'),
)
</script>

<template>
  <div class="h-full flex flex-col justify-center gap-10 px-4">
    <h1 class="text-5xl font-black text-[#457b9d] mb-1">Merci !</h1>

    <div class="grid grid-cols-2 gap-8 text-sm">
      <div class="flex flex-col items-center gap-2">
        <img :src="qrSrc" class="w-40 h-40 rounded-lg" alt="QR Slides" />
        <div class="text-xs opacity-50">{{ qrCaption }}</div>
      </div>

      <div class="space-y-3">
        <div class="text-[#457b9d] font-bold uppercase text-xs tracking-widest mb-2">
          Slides :
        </div>
        <a
          :href="slidesUrl"
          target="_blank"
          class="flex items-center gap-2 no-underline opacity-75 hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
          {{ slidesRepo }}
        </a>

        <template v-if="exerciseList.length">
          <div class="text-[#457b9d] font-bold uppercase text-xs tracking-widest mb-2 mt-3">
            Exercices :
          </div>
          <a
            v-for="ex in exerciseList"
            :key="ex.name"
            :href="ex.url"
            target="_blank"
            class="flex items-center gap-2 no-underline opacity-75 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
            {{ ex.label }}
          </a>
        </template>
      </div>
    </div>

    <div class="text-xs opacity-30">
      Slides built with <a href="https://sli.dev" class="no-underline">sli.dev</a> · Thème maxime-lenne
    </div>
  </div>
</template>
