
---
layout: two-cols-header
---

### Prérequis & Objectifs

::left::

### Prérequis

- **Fondamentaux CI/CD** déjà vus *(deck [CI / CD](#https://decks.maxime-lenne.fr/decks/ci-cd/1))* — CI vs Delivery vs Deployment, anatomie d'une pipeline (jobs, stages, runners, artefacts), invariants (build once / deploy many, fail fast)
- Maîtrise de **Git** (commits, branches, PR)
- Compte **GitHub** actif (gratuit suffit)
- À l'aise avec la **ligne de commande** Linux/macOS
- Notions de **YAML** — recommandé, non bloquant

**Niveau :** apprenants en onboarding · profils techniques mixtes

::right::

### Objectifs

À l'issue de cette session vous serez capable de :

- Décrypter l'anatomie d'un **workflow YAML** (`name` / `on` / `jobs` / `steps`) et la hiérarchie Workflow → Jobs → Steps
- Construire un **pipeline CI complet** pour un projet Python (checkout → setup → install → pytest → artifacts)
- Mettre en œuvre une **stratégie matrix** pour tester sur plusieurs versions/OS en parallèle (`include`, `exclude`, `fail-fast`)
- Appliquer les **3 réflexes sécurité** et les **5 règles d'or** pour éviter les erreurs courantes

---
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
layout: statement
---

# Vendredi, 17h47.

<div class="text-2xl mt-6 opacity-80">Tu pousses sur <code>main</code>.</div>
<div class="text-2xl mt-2 opacity-80">Tu as <em>oublié</em> de lancer les tests.</div>
<div class="text-2xl mt-2 opacity-80">La CI ne tourne pas. La prod casse.</div>

<!--
- Le scénario universel — chaque dev l'a vécu
- "Ça marchait sur ma machine"
- Sans automatisation : la qualité dépend de la mémoire humaine
- L'automatisation = filet de sécurité qui ne dort jamais
-->

---
layout: default
---

## Au programme

<div class="grid grid-cols-2 gap-6 mt-8 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Partie 1 · 15 min</div>
<div class="font-bold mb-2">Comprendre</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>CI/CD démystifié</li>
<li>Anatomie d'un workflow YAML</li>
<li>Workflow → Jobs → Steps</li>
<li>Déclencheurs, runners, contextes</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Partie 2 · 30 min</div>
<div class="font-bold mb-2">Pratiquer</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>Premier workflow CI Python <span class="text-[#10b981]">🛠️ exo 1</span></li>
<li>Matrix strategy multi-versions <span class="text-[#10b981]">🛠️ exo 2</span></li>
<li>Survol sécurité + 5 règles d'or</li>
<li>Récap & CTA</li>
</ul>
</div>

</div>

<div class="text-center text-xs opacity-50 mt-12">≈ 45-60 minutes · Workshop · 2 exercices courts (5 min chacun)</div>

<div class="text-center text-sm mt-4 text-[#457b9d] font-bold">🎯 Objectif : sortir avec un 1er workflow CI fonctionnel</div>

<!--
- Le format est workshop : on alterne slides + exercices, pas de live demo formateur
- Public mixte : adapter le débit aux nouveaux pendant la partie 1
- Le CTA est explicite dès maintenant
-->
