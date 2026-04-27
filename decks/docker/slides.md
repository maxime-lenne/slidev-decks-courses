---
theme: ../../themes/maxime-lenne
title: "Docker"
titleTemplate: "%s - Formation Docker"
info: |
  Les bases de Docker : installation, concepts fondamentaux, avancées (build, cache) et docker compose
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?w=1920
download: true
exportFilename: docker
highlighter: shiki
---

# Docker

Les bases de Docker : installation, concepts fondamentaux, build avancé & Docker Compose

<!--
Formation complète Docker — 2h45
Public : mixed technical, formation éducative
-->

---
layout: two-cols-header
---

### Prérequis & Objectifs

::left::

### Prérequis

- Bases de la **ligne de commande** (terminal Linux ou PowerShell)
- Notions de base en **développement web** (API, base de données)
- Un **ordinateur** avec droits administrateur
- `docker --version` ≥ 20+ (on l'installe ensemble)

**Niveau :** développeurs, admins, data engineers — toutes spécialités

::right::

### Objectifs

À l'issue de la formation vous serez capable de :

- Comprendre pourquoi Docker est **incontournable** et la différence avec les VMs
- Installer Docker et exécuter vos **premiers conteneurs**
- Écrire un **Dockerfile** optimisé avec multi-stage builds et gestion du cache
- Maîtriser les **volumes**, **réseaux** et **registres** Docker
- Orchestrer des applications multi-services avec **Docker Compose**

---
layout: default
---

<div class="h-full flex items-center gap-16 px-4">
  <div class="w-2/5">
    <h1 class="text-[4.5rem] font-black leading-[1.05] text-[#457b9d] uppercase tracking-tight">
      Table<br>of<br>Contents
    </h1>
  </div>
  <div class="w-3/5">
    <ol class="space-y-3 text-lg list-none">
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">01</span>
        <Link to="5" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Pourquoi Docker ?</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">02</span>
        <Link to="9" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Installation</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">03</span>
        <Link to="14" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Concepts fondamentaux</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">04</span>
        <Link to="23" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Dockerfile &amp; Build</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">05</span>
        <Link to="30" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Build avancé &amp; Cache</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">06</span>
        <Link to="38" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Registry, Volumes &amp; Réseaux</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">07</span>
        <Link to="45" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Docker Compose</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">08</span>
        <Link to="55" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Sécurité &amp; Bonnes pratiques</Link>
      </li>
      <li class="flex gap-5 items-start">
        <span class="text-[#457b9d] font-black text-xl min-w-[2rem]">09</span>
        <Link to="59" class="no-underline opacity-80 hover:opacity-100 hover:text-[#457b9d] transition-colors">Conclusion &amp; What's Next</Link>
      </li>
    </ol>
  </div>
</div>

---
src: ../templates/slides.md#1
---

---
src: ./sections/01-pourquoi-docker.md
---

---
src: ./sections/02-installation.md
---

---
src: ./sections/03-concepts-fondamentaux.md
---

---
src: ./sections/04-dockerfile-build.md
---

---
src: ./sections/05-build-avance-cache.md
---

---
src: ./sections/06-registry-volumes-reseaux.md
---

---
src: ./sections/07-docker-compose.md
---

---
src: ./sections/08-securite.md
---

---
src: ./sections/09-conclusion.md
---
