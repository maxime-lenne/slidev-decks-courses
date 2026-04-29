---
theme: ../../themes/maxime-lenne
title: "CI / CD"
titleTemplate: "%s - Formation Simplon"
info: |
  Introduction to Continuous Integration and Continuous Delivery:
  principles, tools, and pipelines for modern software teams
  (test in CI, build in CI, developer tools in CI, lint,
  semantic versioning, release notes...).
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1920&q=80
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 via-[#0f172a]/70 to-[#1d3557]/80" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<div class="text-[#457b9d] text-sm font-bold uppercase tracking-widest mb-4">Formation</div>

<h1 class="text-7xl font-black mb-6">
CI <span class="opacity-50">/</span> CD
</h1>

<div class="text-2xl opacity-90 max-w-3xl">
Une <span class="text-[#457b9d] font-bold">culture</span> avant d'être un outil
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
Intégration · Livraison · Déploiement continus<br/>
Principes, pipelines et bonnes pratiques pour des déploiements <strong>fiables</strong> et <strong>maîtrisés</strong>
</div>

<div class="absolute bottom-8 text-xs opacity-50">
Maxime Lenne · Simplon · 2026
</div>

</div>

<!--
- Présenter rapidement : 90-110 min, lecture/talk, pas de live demo
- Annoncer le CTA dès le début : à la fin, chacun ajoute une pipeline minimale à son repo
- Insister sur le côté agnostique : pas de syntaxe complète d'outil
-->

---
src: ./sections/01-intro.md
---

---
src: ./sections/02-tester.md
---

---
src: ./sections/03-builder.md
---

---
src: ./sections/04-livrer-deployer.md
---

---
src: ./sections/05-securite-anti-patterns.md
---

---
src: ./sections/06-conclusion.md
---
