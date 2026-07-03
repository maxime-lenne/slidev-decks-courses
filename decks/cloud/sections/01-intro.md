---
hideInToc: true
layout: two-cols-header
---

### Présentation

::left::

<div class="flex flex-col gap-5 pt-2">
  <div class="flex items-center gap-4">
    <img src="https://github.com/maxime-lenne.png" class="w-20 h-20 rounded-full border-2 border-[#457b9d]" alt="Maxime Lenne" />
    <div>
      <div class="text-2xl font-bold">Maxime Lenne</div>
      <div class="text-[#457b9d] font-medium text-sm">CTO as a Service · Product Engineer</div>
    </div>
  </div>
  <p class="text-sm leading-relaxed opacity-85">Freelance passionné, engagé et créateur d'impact. Appétence forte pour l'entrepreneuriat, les startups, le produit, le management et la tech.</p>
  <ul class="text-sm space-y-2 list-none">
    <li>🧭 C(P)TO pendant 10 ans · management 40+ profils variés (Dev, Devops, UX/UI, PM, Data...)</li>
    <li>🚀 20 ans d'expérience tech (back, front, mobile, cloud, devops, IA, no-code)</li>
    <li>🏗️ Co-founder & ex-CTO @EcoTa.co · @mobilityz</li>
  </ul>
</div>

::right::

<div class="flex flex-col gap-3 text-sm pt-4">
  <a href="https://maxime-lenne.fr" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">🌐 maxime-lenne.fr</a>
  <a href="https://github.com/maxime-lenne" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">🐙 github.com/maxime-lenne</a>
  <a href="https://www.linkedin.com/in/maximelenne/" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">💼 linkedin.com/in/maximelenne</a>
  <a href="mailto:hello@maxime-lenne.fr" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">✉️ hello@maxime-lenne.fr</a>
  <div class="flex flex-col items-center gap-2 mt-3 pt-3">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.linkedin.com/in/maximelenne/&bgcolor=0f172a&color=94a3b8&margin=6" class="w-40 h-40 rounded-lg" alt="LinkedIn QR" />
    <div class="text-xs opacity-50">LinkedIn</div>
  </div>
</div>

---
hideInToc: true
layout: default
---

### Au programme — 8 modules

<div class="grid grid-cols-2 gap-4 mt-6 text-xs">

<div class="border-l-4 border-[#457b9d] pl-3">
<div class="font-bold mb-1">M1 · Concepts cloud <span class="opacity-50">· 45 min</span></div>
<p class="opacity-80">XaaS, souveraineté, comparatif hyperscalers, IaC, archi</p>
</div>

<div class="border-l-4 border-[#457b9d] pl-3">
<div class="font-bold mb-1">M2 · GCP overview + réseau <span class="opacity-50">· 45 min</span></div>
<p class="opacity-80">Hiérarchie, console, gcloud, VPC, LB, DNS, NAT</p>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="font-bold mb-1">M3 · Cloud Run + Artifact Registry <span class="opacity-50">· 45 min</span></div>
<p class="opacity-80">Conteneurs HTTP scale-to-zero, révisions, rollback</p>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="font-bold mb-1">M4 · Cloud SQL + pgvector <span class="opacity-50">· 35 min</span></div>
<p class="opacity-80">Postgres managé, embeddings, socket Unix</p>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="font-bold mb-1">M5 · Cloud Storage <span class="opacity-50">· 25 min</span></div>
<p class="opacity-80">Stockage objet, classes, signed URLs</p>
</div>

<div class="border-l-4 border-[#e63946] pl-3">
<div class="font-bold mb-1">M6 · IAM + Secret Manager <span class="opacity-50">· 35 min</span></div>
<p class="opacity-80">Service Accounts, least privilege, secrets versionnés</p>
</div>

<div class="border-l-4 border-[#f59e0b] pl-3">
<div class="font-bold mb-1">M7 · Services Data <span class="opacity-50">· 30 min</span></div>
<p class="opacity-80">BigQuery, Pub/Sub, Dataflow, Composer, Looker</p>
</div>

<div class="border-l-4 border-[#f59e0b] pl-3">
<div class="font-bold mb-1">M8 · Services AI/ML <span class="opacity-50">· 30 min</span></div>
<p class="opacity-80">Gemini Enterprise Agent Platform, Document/Vision AI</p>
</div>

</div>

<div class="text-center text-xs opacity-50 mt-6">Atelier : brief RAG-on-GCP (J4 PM + J5)</div>

<!--
- 5 h de cours pures, jouables mardi → vendredi avant les ateliers
- M1-M2 = vocabulaire commun, M3-M6 = ce qui sert dans le brief, M7-M8 = panorama Dev IA
- Annoncer dès maintenant que les démos seront en screenshots, pas en live
-->

---
hideInToc: true
layout: default
---

### Objectifs pédagogiques

<div class="text-sm opacity-85 mt-4">

À la fin de la semaine, tu sais :

<v-clicks>

- **Choisir** le bon modèle XaaS (IaaS / CaaS / PaaS / FaaS / DBaaS) pour un cas d'usage IA
- **Naviguer** dans la console GCP et utiliser `gcloud` pour provisionner les services de base
- **Déployer** une API conteneurisée sur Cloud Run avec une SA dédiée, secrets en Secret Manager, connexion Cloud SQL via socket Unix
- **Activer pgvector** sur une instance Cloud SQL Postgres et stocker un corpus PDF sur GCS
- **Appliquer le least privilege** sur les Service Accounts (zéro `roles/owner`)
- **Identifier** les services GCP pertinents pour la Data (BigQuery / Dataflow) et l'IA/ML (Gemini Enterprise Agent Platform)

</v-clicks>

</div>

<div class="grid grid-cols-4 gap-3 mt-6 text-xs">
<div class="border-l-4 border-[#457b9d] pl-3"><div class="font-bold">C17</div><div class="opacity-70">Déployer un service IA — N2</div></div>
<div class="border-l-4 border-[#10b981] pl-3"><div class="font-bold">C18</div><div class="opacity-70">Industrialiser via CI/CD — N3</div></div>
<div class="border-l-4 border-[#f59e0b] pl-3"><div class="font-bold">C19</div><div class="opacity-70">Mettre en œuvre cloud — N2</div></div>
<div class="border-l-4 border-[#e63946] pl-3"><div class="font-bold">C21</div><div class="opacity-70">Résoudre incidents — N2</div></div>
</div>

<!--
- 4 compétences RNCP visées, niveaux ciblés en fin de semaine
- Le brief valide tout ça en soutenance (7 min démo + 3 min Q&A)
- Annoncer la rétrospective de vendredi 16h30 dès maintenant
-->

---
hideInToc: true
layout: default
---

<div class="toc-page">

### Table of Contents

<Toc :max-depth="2" />

</div>

---
hideInToc: true
layout: quote
---

### A distributed system is one in which the failure of a computer you didn't even know existed can render your own computer unusable.

> Leslie Lamport, Turing Award laureate & pioneer of distributed systems theory
