<template>
  <div class="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-transparent" />

  <div class="relative z-10 h-full flex items-end pb-16 pl-4 gap-16">
    <div class="flex-1">
      <div class="text-[#457b9d] text-sm font-bold uppercase tracking-widest mb-4"></div>
      <h3 class="text-6xl font-black leading-tight mb-8">
        Let's <br><span class="text-[#457b9d]">build <br>together</span>
      </h3>
      <div class="text-sm opacity-60 mb-4">
        <a href="mailto:hello@maxime-lenne.fr" class="flex items-center gap-2 no-underline opacity-75 hover:opacity-100">✉️ hello@maxime-lenne.fr</a>
        <a href="https://maxime-lenne.fr" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">🌐 maxime-lenne.fr</a>
      </div>
      <div class="flex flex-col items-center gap-2">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.linkedin.com/in/maximelenne/&bgcolor=0f172a&color=FFF&margin=6" class="w-40 h-40 rounded-lg" alt="LinkedIn QR" />
        <div class="text-xs opacity-50">LinkedIn</div>
      </div>
    </div>
  </div>
</template>
