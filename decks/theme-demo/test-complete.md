---
theme: ../../themes/maxime-lenne
title: Test Exhaustif - Thème Maxime Lenne
layout: cover
transition: slide-left
highlighter: shiki
drawings:
  persist: false
mdc: true
lineNumbers: true
info: |
  ## Test complet du thème Maxime Lenne

  Ce deck teste tous les built-in layouts, composants et éléments Markdown de Slidev.
css: unocss
---

# Thème Maxime Lenne

## Test Exhaustif des Fonctionnalités Slidev

Test de tous les layouts, composants et éléments markdown

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Commencer le test <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
Notes du présentateur :
- Ceci est une note pour le présentateur
- Elle n'apparaît que dans la vue présentateur
-->

---
src: ./sections/01-layouts.md
---

---
src: ./sections/02-markdown.md
---

---
src: ./sections/03-components.md
---

---
src: ./sections/04-diagrams.md
---

---
src: ./sections/05-advanced.md
---

---
src: ./sections/06-custom-styles.md
---

---
src: ./sections/07-common-components.md
---

---
src: ./sections/99-end.md
---
