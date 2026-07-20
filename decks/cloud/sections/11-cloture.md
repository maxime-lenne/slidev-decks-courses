---
layout: section-liquid
---

## Take-aways

<div class="text-sm opacity-60 mt-4">3 choses à retenir · Ressources</div>

---
layout: default
---

<h3 class="text-3xl mb-4">Les 3 choses à retenir</h3>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

<div class="text-3xl mb-2">📦</div>

#### Conteneur + managed services = autonomie

Docker multi-stage sur **Cloud Run**, **Cloud SQL/pgvector** et **GCS** gérés par GCP. Votre code reste portable, l'infra ne vous appartient plus.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

<div class="text-3xl mb-2">🔐</div>

#### La sécurité IAM se construit, ne s'hérite pas

Rôles **predefined** au plus bas niveau, **1 SA par service**, jamais de **clé JSON** — toujours **Workload Identity Federation** pour le CI/CD.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

<div class="text-3xl mb-2">🚀</div>

#### Le pipeline CI/CD est le vrai livrable

Un **git push sur main** doit redéployer seul, sans intervention manuelle. Le **rollback ≤ 30 s** est la vraie mesure de maturité, pas juste le premier déploiement.

</div>

</div>

<!--
- 3 cartes = 3 messages clés à mémoriser après le module cloud
- Si on retient une seule chose : conteneur + managed services + pipeline = autonomie (le fil rouge du cover)
- Si on retient une seule action : auditer son propre projet avec get-iam-policy pour traquer les rôles trop larges
-->

---
layout: default
---

### Ressources pour aller plus loin

<div class="grid grid-cols-2 gap-4 mt-4 text-xs">

<div class="border-l-4 border-[#457b9d] pl-3">
<div class="font-bold mb-2 text-[#457b9d]">Documentation officielle</div>
<ul class="list-none space-y-1 opacity-85">
<li>🟦 <a href="https://cloud.google.com/docs" class="no-underline opacity-90">cloud.google.com/docs</a></li>
<li>🚀 <a href="https://cloud.google.com/run/docs" class="no-underline opacity-90">Cloud Run</a></li>
<li>🐘 <a href="https://cloud.google.com/sql/docs/postgres" class="no-underline opacity-90">Cloud SQL Postgres</a></li>
<li>🔐 <a href="https://cloud.google.com/iam/docs" class="no-underline opacity-90">IAM</a></li>
<li>🔑 <a href="https://github.com/google-github-actions/auth" class="no-underline opacity-90">WIF for GitHub Actions</a></li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="font-bold mb-2 text-[#10b981]">Référence pédagogique</div>
<ul class="list-none space-y-1 opacity-85">
<li>📘 <a href="https://blog.stephane-robert.info/docs/cloud/" class="no-underline opacity-90">Stéphane Robert — Cloud</a></li>
<li>📗 <a href="https://blog.stephane-robert.info/docs/cloud/gcp/" class="no-underline opacity-90">Stéphane Robert — GCP</a></li>
<li>📕 <a href="https://blog.stephane-robert.info/docs/cicd/" class="no-underline opacity-90">Stéphane Robert — CI/CD</a></li>
</ul>

<div class="font-bold mb-2 mt-4 text-[#10b981]">Communauté</div>
<ul class="list-none space-y-1 opacity-85">
<li>⭐ <a href="https://github.com/GoogleCloudPlatform/awesome-google-cloud" class="no-underline opacity-90">Awesome Google Cloud</a></li>
<li>🌐 <a href="https://landscape.cncf.io/" class="no-underline opacity-90">CNCF Landscape</a></li>
</ul>
</div>

</div>

<div class="text-xs opacity-60 mt-6 text-center">
🎓 Pour aller plus loin : certification <strong>Google Cloud Associate Cloud Engineer</strong> (ACE) ou <strong>Professional Cloud Architect</strong> (PCA)
</div>

<!--
- Stéphane Robert = référence pédagogique francophone de très haute qualité
- Awesome Google Cloud = liste curatée GitHub
- ACE = première certif, PCA = niveau senior
-->

---
layout: section-liquid
---

## Next Steps

<div class="text-sm opacity-60 mt-4">après le brief</div>

---
layout: default
---

### Après le brief

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4 bg-[#457b9d]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🌐</div>

#### Passer en vraie prod

Domaine custom + HTTPS géré, **alerte budget** active, **Cloud Monitoring** avec dashboards et SLO plutôt que des logs regardés à la main.

</div>

<div class="border-l-4 border-[#10b981] pl-4 bg-[#10b981]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🏗️</div>

#### Industrialiser en Infra as Code

Remplacer les commandes `gcloud` one-shot du brief par du **Terraform** versionné : reproduire l'environnement en un `apply`, plus une seule config à jour dans la tête d'un binôme.

</div>

<div class="border-l-4 border-[#f59e0b] pl-4 bg-[#f59e0b]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🤖</div>

#### Aller plus loin côté IA

Tester **Gemini API** comme upgrade de Mistral (1 SDK à changer), puis explorer **Document AI** ou **Vision AI** pour des cas d'usage au-delà du RAG.

</div>

</div>

<div class="text-xs opacity-60 mt-8 text-center">
🎓 Et pour formaliser tout ça : certification <strong>ACE</strong> ou <strong>PCA</strong> (cf. ressources)
</div>

<!--
- Ces 3 chantiers sont dans l'ordre logique post-brief : d'abord fiabiliser la prod, puis industrialiser, puis étendre
- Terraform est la suite naturelle : le brief impose gcloud pour bien comprendre chaque ressource, IaC vient après
- Gemini API = migration triviale techniquement (SDK), l'intérêt est de comparer coût/qualité vs Mistral en conditions réelles
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="cloud" />
