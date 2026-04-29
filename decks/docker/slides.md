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

<Toc />

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

---
src: ../templates/slides.md#2
---
