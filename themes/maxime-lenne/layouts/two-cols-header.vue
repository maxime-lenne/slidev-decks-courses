<template>
  <div class="slidev-layout two-cols-header h-full grid grid-rows-[auto,1fr] gap-4">
    <div>
      <slot />
    </div>
    <div class="flex gap-12 min-w-0">
      <div class="col-left flex-1 min-w-0 overflow-auto">
        <slot name="left" />
      </div>
      <div class="col-right flex-1 min-w-0 overflow-auto">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
