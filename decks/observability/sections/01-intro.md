---
layout: two-cols-header
---

### Prérequis & Objectifs

::left::

### Prérequis

- Bases de **Python** (FastAPI, async)
- Bases de **Docker** et `docker-compose`
- Notions **HTTP** (codes status, headers, REST)
- Familiarité avec un appel **LLM** via API (OpenAI, Anthropic) — souhaitable
- **Git** pour le versioning du projet brief

**Niveau :** apprenants en onboarding IA · profils techniques mixtes

::right::

### Objectifs

À l'issue des 3 jours vous serez capable de :

- Distinguer **observabilité** et **monitoring**, et appliquer les modèles mentaux (**RED / USE / Golden Signals**)
- Instrumenter une app dockerisée avec **logs JSON + métriques Prometheus + traces OTel**
- Construire des **dashboards Grafana** et définir des alertes basées sur **SLO + burn rate**
- Mettre en place **Langfuse** (traces, scores, coûts) + détection de **drift modèle** (KS, PSI, Wasserstein)
- Conduire un **incident** + rédiger un **post-mortem blameless**

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
    <li>🏗️ Co-founder &amp; ex-CTO @EcoTa.co · @mobilityz</li>
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
layout: default
---

## Au programme · 3 jours

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Jour 1 · ~5h</div>
<div class="font-bold mb-2">Fondamentaux + IA</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>M1 · Pourquoi l'observability ?</li>
<li>M2 · Logging structuré</li>
<li>M8 · Drift modèle ML</li>
<li>M9 · Observability LLM &amp; Langfuse</li>
<li>Atelier · stack obs LLM</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Jour 2 · ~5h</div>
<div class="font-bold mb-2">Stack technique</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>🛠️ Brief — projet à instrumenter</li>
<li>M3 · Métriques &amp; Prometheus</li>
<li>M4 · Grafana &amp; dashboards</li>
<li>M-OTel · OpenTelemetry</li>
<li>Brief continu</li>
</ul>
</div>

<div class="border-l-4 border-[#e63946] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Jour 3 · ~6h</div>
<div class="font-bold mb-2">Production + Game Day</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>M5 · Alerting + SLO</li>
<li>M6 · APM &amp; tracing</li>
<li>M-Synthetics · Uptime Kuma</li>
<li>M7 · Incident management</li>
<li>🔥 Game Day · 3 incidents</li>
</ul>
</div>

</div>

<div class="text-center text-sm mt-8 text-[#457b9d] font-bold">🎯 Objectif : sortir avec un projet dockerisé instrumenté + un post-mortem blameless</div>

<!--
- Workshop = on alterne lecture + brief continu
- Annoncer le Game Day J3 sans révéler les incidents
- Adapter le débit en M1-M2 (fondamentaux pour les nouveaux)
-->

---
layout: statement
---

# Vendredi, 14h30.

<div class="text-2xl mt-6 opacity-80">Ton modèle est en prod depuis 3 mois.</div>
<div class="text-2xl mt-2 opacity-80">Le service répond <code class="text-[#10b981]">200 OK</code> à toutes les requêtes.</div>
<div class="text-2xl mt-2 opacity-80">Les utilisateurs disent que les recos sont <em>devenues nulles</em>.</div>

<div class="text-3xl mt-8 text-[#e63946] font-bold">Que fais-tu ?</div>

<!--
- L'accroche du support de cours — universelle pour toute app IA en prod
- Le monitoring HTTP classique = silence radio
- Tout est vert côté infra, mais le système IA est dégradé
- Transition : c'est exactement ce que l'observability résout
-->

---
layout: quote
---

# Quand on peut mesurer ce dont on parle et l'exprimer en chiffres, on en sait quelque chose ; mais quand on ne peut pas le mesurer, quand on ne peut pas l'exprimer en chiffres, notre connaissance est d'une nature maigre et insatisfaisante.

> Lord Kelvin, physicien, in *Electrical Units of Measurement* (1883)
