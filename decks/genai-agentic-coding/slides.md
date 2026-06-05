---
theme: ../../themes/maxime-lenne
title: "GenAI - Agentic Coding"
titleTemplate: "%s - Slidev Decks"
info: |
  Coder avec des agents IA : context engineering, MCP, skills, hooks, sub-agents,
  spec-driven development, mode sandbox, et workflows multi-agents (reviews, etc.).
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1680783954745-3249be59e527?w=1920
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/92 via-[#0f172a]/80 to-[#1d3557]/85" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<h1 class="text-7xl font-black mb-6">
Agentic Coding
</h1>
<div class="text-[#457b9d] text-2xl font-bold uppercase mb-6">Le contexte est le nouveau code</div>

<div class="text-xl max-w-3xl text-[#457b9d] font-bold">
Context engineering · Skills · Subagents · Hooks<br/>
MCP · Spec-Driven Development · Sandbox · Multi-agents
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
De votre <code>CLAUDE.md</code> à votre boucle de vérification,<br/>
le passage du prompt engineering au <strong>context engineering</strong>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-xs opacity-50">
Maxime Lenne · 2026 · Formation interne <strong>AI Builders</strong>
</div>

</div>

<!--
- Démo d'ouverture (10 min) AVANT de cliquer sur "next" — Skill auto + Subagent + MCP + Hook vocal
- Backup : screencast `assets/demo-fallback.mp4`
- Core message à marteler dès le titre : "le contexte est le nouveau code"
- Audience : devs expérimentés en interne, cible AI Builders (pas AI Engineers)
- Durée cible : 2h30 dans la fenêtre 2-3h
-->

---
layout: default
---

<script setup>
const tocItems = [
  { title: 'Setup & positionnement', to: 3 },
  { title: 'La stack de l\'AI Builder', to: 8 },
  { title: 'Le contexte est le nouveau code', to: 18 },
  { title: 'Spec-Driven Development', to: 33 },
  { title: 'Skills & Commands', to: 41 },
  { title: 'Hooks : fermer la boucle', to: 49 },
  { title: 'MCP', to: 55 },
  { title: 'Les 8 piliers de la vérification', to: 60 },
  { title: 'Multi-Agents', to: 66 },
  { title: 'Vos 2 chantiers', to: 75 },
  { title: 'Take-aways & ressources', to: 81 },
]
</script>

<TocCustom :items="tocItems" />

---
src: ./sections/01-intro.md
---

---
src: ../templates/slides.md#1
---

---
src: ./sections/02-stack.md
---

---
src: ./sections/03-contexte.md
---

---
src: ./sections/07-spec-driven.md
---

---
src: ./sections/04-extensions.md
---

---
src: ./sections/05-hooks.md
---

---
src: ./sections/06-mcp.md
---

---
src: ./sections/08-verification.md
---

---
src: ./sections/09-multi-agents.md
---

---
src: ./sections/10-cta.md
---

---
src: ./sections/11-wrap-up.md
---
