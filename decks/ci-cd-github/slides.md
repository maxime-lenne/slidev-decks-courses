---
theme: ../../themes/maxime-lenne
title: "CI/CD avec GitHub Actions"
titleTemplate: "%s - Formation Simplon"
info: |
  Maitrisez les workflows GitHub Actions
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1717386255777-ce60792a2a56?w=1920&q=80
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 via-[#0f172a]/70 to-[#1d3557]/80" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<div class="text-[#457b9d] text-sm font-bold uppercase tracking-widest mb-4">Workshop</div>

# <span class="font-black">CI<span class="opacity-50">/</span>CD avec<br/><span class="text-[#457b9d]">GitHub Actions</span></span>

<div class="text-2xl opacity-90 max-w-3xl">
Maîtrisez les <span class="text-[#457b9d] font-bold">workflows</span> GitHub Actions
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
De l'anatomie YAML à un pipeline CI complet — tests pytest, matrix strategy,<br/>
artifacts, et les bons réflexes <strong>sécurité</strong> dès le premier workflow
</div>

<div class="absolute bottom-8 text-xs opacity-50">
Maxime Lenne · Simplon · 2026
</div>

</div>

<!--
- 45-60 min, format workshop avec 2 exercices courts (pas de live demo formateur)
- Annoncer le CTA dès le début : sortir avec un 1er workflow CI fonctionnel sur un projet
- Demander en intro : « Qui a déjà oublié de lancer les tests avant un push ? »
- Public mixte : nouveaux + niveaux variés — adapter le débit
-->

---
src: ./sections/01-introduction.md
---

---
src: ./sections/02-cicd-demystifie.md
---

---
src: ./sections/03-anatomie-workflow.md
---

---
src: ./sections/04-premier-workflow.md
---

---
src: ./sections/05-matrix-strategy.md
---

---
src: ./sections/06-securite.md
---

---
src: ./sections/07-conclusion.md
---

---
src: ../templates/slides.md#2
---
