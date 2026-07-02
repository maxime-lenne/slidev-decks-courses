---
theme: ../../themes/maxime-lenne
title: "MCP Deep Dive (Architecture, Core concepts, Spécifications, Conception et FastMCP framework)"
titleTemplate: "%s - Slidev Decks"
info: |
  Architecture et spécifications MCP + implémentation avec FastMCP.
  Deep dive du protocole : host/client/server, JSON-RPC, primitives, FastMCP.
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=1920
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#0f172a]/75 to-[#1d3557]/80" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<h1 class="text-7xl font-black mb-6">
MCP
</h1>
<div class="text-[#457b9d] text-2xl font-bold uppercase mb-6">Deep Dive</div>

<div class="text-xl max-w-3xl text-[#457b9d] font-bold">
Architecture · Core concepts · Spécifications<br/>
Conception · FastMCP framework
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
Du JSON-RPC sur stdio aux primitives serveur / client,<br/>
en passant par les capabilities, OAuth et <strong>FastMCP</strong>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-xs opacity-50">
Maxime Lenne · 2026
</div>

</div>

<!--
- 45-60 min deep dive : 12 sections
- Core message : MCP est un vrai protocole, pas une API
- CTA final : construire un FastMCP cette semaine
- Audience mixte technique → adapter le débit sur la section 4 (JSON-RPC)
- Démo live ou screenshots préparés section 11 selon réseau
-->

---
layout: toc
items:
- title: MCP - Model Control Protocol
  to: 5
- title: Architecture
  to: 9
- title: Spécifications du protocole
  to: 15
- title: Server
  to: 25
- title: Client
  to: 31
- title: Extensions du protocole
  to: 37
- title: FastMCP
  to: 41
- title: Écosystème
  to: 49
- title: Take-aways
  to: 54
---

---
src: ./sections/01-intro.md
---

---
src: ../templates/slides.md#1
---

---
src: ./sections/02-pourquoi-mcp.md
---

---
src: ./sections/03-architecture.md
---

---
src: ./sections/04-specifications.md
---

---
src: ./sections/05-primitives-server.md
---

---
src: ./sections/06-primitives-client.md
---

---
src: ./sections/07-extensions.md
---

---
src: ./sections/09-fastmcp.md
---

---
src: ./sections/10-ecosysteme.md
---

---
src: ./sections/12-wrap-up.md
---

---
src: ../templates/slides.md#2
---
