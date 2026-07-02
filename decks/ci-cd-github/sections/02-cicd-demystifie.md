---
layout: section-liquid
---

# 1 · CI/CD démystifié

<div class="text-lg opacity-70 mt-4">5 min · CI vs CD · GitHub Actions · coûts · le pipeline</div>

Concepts essentiels et positionnement de GitHub Actions

---
layout: default
---

## CI vs CD : trois mots, trois automatisations

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-1">Continuous</div>
<div class="font-bold mb-2 text-[#457b9d]">Integration</div>
<p class="opacity-85 mb-2">À chaque modification, le code est <strong>testé</strong> et intégré automatiquement.</p>
<div class="text-xs opacity-60">→ détecter les bugs très tôt</div>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-1">Continuous</div>
<div class="font-bold mb-2 text-[#10b981]">Delivery</div>
<p class="opacity-85 mb-2">Le code validé est <strong>prêt à être déployé</strong> à tout moment (mais pas auto).</p>
<div class="text-xs opacity-60">→ déploiement déclenché manuellement</div>
</div>

<div class="border-l-4 border-[#f59e0b] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-1">Continuous</div>
<div class="font-bold mb-2 text-[#f59e0b]">Deployment</div>
<p class="opacity-85 mb-2">Chaque commit validé est <strong>déployé automatiquement</strong> en production.</p>
<div class="text-xs opacity-60">→ pas d'intervention humaine</div>
</div>

</div>

<div class="text-center text-sm mt-10 opacity-80 italic">
Petits changements <strong>fréquents</strong> validés <strong>automatiquement</strong> &mdash;<br/>
plutôt que de grosses releases risquées tous les mois
</div>

<!--
- Insister : « intégrer continûment » = à chaque commit, pas tous les vendredis
- CD-Delivery vs CD-Deployment : nuance importante en entreprise (validation humaine vs full auto)
- Aujourd'hui on focus surtout CI (les tests), le CD est une autre session
-->

---
layout: default
---

## GitHub Actions : le moteur de vos pipelines

<div class="text-sm mt-4 opacity-85">
Service CI/CD intégré nativement à GitHub depuis <strong>2019</strong>. Quand quelque chose se passe sur votre repo (push, PR, release...), GitHub Actions exécute des tâches automatisées.
</div>

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div>
<div class="font-bold mb-2 text-[#457b9d]">Vous écrivez</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>📄 Un fichier <strong>YAML</strong></li>
<li>📂 Dans <code>.github/workflows/</code></li>
<li>📋 Quoi faire, quand, où</li>
</ul>
</div>

<div>
<div class="font-bold mb-2 text-[#10b981]">GitHub fournit</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>🖥️ Des <strong>runners</strong> (VMs Linux/Win/Mac)</li>
<li>🛒 Un <strong>Marketplace</strong> de 20k+ actions</li>
<li>📊 L'interface de monitoring</li>
</ul>
</div>

</div>

<div class="text-center text-xs opacity-60 mt-8">
Le Marketplace = un écosystème énorme... <span class="text-[#f59e0b]">mais utiliser une action = exécuter du code tiers avec accès à vos secrets</span>
</div>

<!--
- Marketplace : énorme atout MAIS enjeu de confiance (on en reparle en sécurité)
- Mention que GitHub Actions est devenu le standard de facto pour les projets open source
-->

---
layout: default
---

## Combien ça coûte ?

<div class="text-sm opacity-85 mt-4">Modèle gratuit avec quotas qui couvre la majorité des projets perso et de classe.</div>

<div class="grid grid-cols-2 gap-8 mt-6 text-sm">

<div>
<div class="font-bold mb-2">Quotas mensuels gratuits</div>
<table class="text-xs">
<thead><tr><th>Type de repo</th><th>Quota / mois</th></tr></thead>
<tbody>
<tr><td>Public</td><td><strong class="text-[#10b981]">Illimité</strong></td></tr>
<tr><td>Privé (Free)</td><td>2 000 minutes</td></tr>
<tr><td>Privé (Team)</td><td>3 000 minutes</td></tr>
<tr><td>Privé (Enterprise)</td><td>50 000 minutes</td></tr>
</tbody>
</table>
</div>

<div>
<div class="font-bold mb-2">Multiplicateur selon l'OS</div>
<table class="text-xs">
<thead><tr><th>Runner</th><th>×</th><th>10 min réelles</th></tr></thead>
<tbody>
<tr><td>Linux <code>ubuntu-*</code></td><td><strong class="text-[#10b981]">×1</strong></td><td>10 min facturées</td></tr>
<tr><td>Windows</td><td>×2</td><td>20 min facturées</td></tr>
<tr><td>macOS</td><td><strong class="text-[#ef4444]">×10</strong></td><td>100 min facturées</td></tr>
</tbody>
</table>
</div>

</div>

<div class="text-center text-xs opacity-70 mt-8 italic">
💡 Astuce : les <strong>runners self-hosted</strong> ne consomment aucune minute du quota
</div>

<!--
- Pour un projet de classe / perso : largement suffisant en gratuit
- macOS coûte cher (×10) — n'utiliser que si nécessaire (apps iOS)
- Suivi de consommation : Settings → Billing and plans → Plans and usage
-->

---
layout: default
---

## Le pipeline en un schéma

```mermaid {scale: 0.85}
flowchart LR
    A[💻 Commit] --> B[📤 Push]
    B --> C{🎯 Event<br/>matches on:?}
    C -->|oui| D[⚙️ Workflow déclenché]
    C -->|non| Z[🚫 rien ne se passe]
    D --> E1[🧪 Job: test]
    D --> E2[🔍 Job: lint]
    E1 --> F[📦 Job: build]
    E2 --> F
    F --> G{✅ ou ❌}
    G -->|✅| H[🎉 Statut vert<br/>+ artifacts]
    G -->|❌| I[🚨 Notification<br/>+ logs]

    style D fill:#457b9d,color:#fff
    style H fill:#10b981,color:#fff
    style I fill:#ef4444,color:#fff
```

<div class="text-center text-xs opacity-60 mt-4">
Du commit local au feedback dans l'UI GitHub — entièrement automatisé
</div>

<!--
- Décomposer le schéma : event → workflow → jobs en parallèle → résultat
- Les jobs test et lint tournent en parallèle (machines différentes)
- build attend que les deux soient passés (needs:)
- Insister : tout est dans GitHub, pas d'infra à gérer
-->
