---
theme: ../../themes/maxime-lenne
title: "Cloud"
titleTemplate: "%s - Infrastructure GCP"
info: |
  Du local à la prod sur Google Cloud Platform : concepts cloud, GCP, Cloud Run,
  Cloud SQL + pgvector, Cloud Storage, IAM, Data, AI/ML — formation modulaire.
author: Maxime Lenne
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85?w=1920
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#0f172a]/75 to-[#1d3557]/80" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<div class="text-[#457b9d] text-sm font-bold uppercase tracking-widest mb-4">Formation · 8 modules · ~5 h</div>

# <span class="font-black">Cl<span class="opacity-50">o</span>ud<br/><span class="text-[#457b9d]">Du local à la prod sur GCP</span></span>

<div class="text-2xl opacity-90 max-w-3xl">
Concepts · Cloud Run · Cloud SQL · Storage · IAM<br/>
<span class="text-[#457b9d] font-bold">Data · AI/ML · CI/CD GitHub Actions</span>
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
Conteneur + managed services + pipeline = autonomie<br/>
Brief : déployer un chatbot RAG sur GCP en 1,5 jour
</div>

<div class="absolute bottom-8 text-xs opacity-50">
Maxime Lenne · Simplon · 2026
</div>

</div>

<!--
- Cover photo : couloir data center (Paul Hanaoka / Unsplash)
- Annoncer le fil rouge : on part d'un docker-compose local et on arrive à un git push qui déploie en prod
- Public : Dev IA Simplon en onboarding cloud — Docker maîtrisé, Postgres OK
- Brief de la semaine = RAG-on-GCP (cf. atelier J4 PM + J5)
- Compétences ciblées : C17 N2, C18 N3, C19 N2, C21 N2
-->

---
src: ./sections/01-intro.md
---

---
src: ./sections/02-concepts-cloud.md
---

---
src: ./sections/03-gcp-overview.md
---

---
src: ./sections/04-cloud-run.md
---

---
src: ./sections/05-cloud-sql.md
---

---
src: ./sections/06-cloud-storage.md
---

---
src: ./sections/07-iam-secrets.md
---

---
src: ./sections/08-data-services.md
---

---
src: ./sections/09-ai-ml-services.md
---

---
src: ./sections/10-atelier-brief.md
---

---
src: ./sections/11-cloture.md
---

---
src: ../templates/slides.md#2
---
