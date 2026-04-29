---
layout: section
---

# À retenir

Checklist · Maturité · Outils · Action

<!--
- Dernière ligne droite : récap actionnable
- Le CTA est la slide la plus importante de toute la présentation
-->

---
layout: default
---

## Checklist des bonnes pratiques

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div>

### Pipeline saine

- [ ] **Feedback rapide** (&lt; 15 min)
- [ ] **Build once, deploy many**
- [ ] Tags **immutables** (SHA, pas `latest`)
- [ ] **Idempotence** (lockfiles committés)
- [ ] **Fail fast** (échec immédiat)

</div>

<div>

### Architecture saine

- [ ] **Séparation** build / deploy
- [ ] **Pipelines déclaratives**
- [ ] **Observabilité** (durée, succès, flaky)
- [ ] **Secrets séparés** par environnement
- [ ] **Pas de SPOF** (runners, maintainers)

</div>

</div>

<div class="text-center mt-8 text-base opacity-75 italic">
Audit trimestriel recommandé.<br/>
Les anti-patterns s'installent <strong>progressivement</strong>.
</div>

<!--
- Cette checklist = la même quel que soit l'outil
- À garder sous la main pour évaluer toute pipeline
-->

---
layout: default
---

## Modèle de maturité

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="p-3 border-l-4 border-[#2a9d8f] bg-[#2a9d8f]/10 rounded">
<div class="text-xs uppercase tracking-widest opacity-60">Niveau 1</div>
<div class="font-bold text-base mt-1">Hygiène de base</div>
<ul class="text-xs mt-2 space-y-1 list-disc pl-4">
<li>Permissions minimales par job</li>
<li>Lockfiles committés (<code>npm ci</code>)</li>
<li>Aucun secret en dur dans le code</li>
</ul>
</div>

<div class="p-3 border-l-4 border-[#457b9d] bg-[#457b9d]/10 rounded">
<div class="text-xs uppercase tracking-widest opacity-60">Niveau 2</div>
<div class="font-bold text-base mt-1">Épinglage & isolation</div>
<ul class="text-xs mt-2 space-y-1 list-disc pl-4">
<li>Dépendances épinglées par hash SHA</li>
<li>Runners éphémères</li>
<li>Secrets séparés par environnement</li>
</ul>
</div>

<div class="p-3 border-l-4 border-[#f4a261] bg-[#f4a261]/10 rounded">
<div class="text-xs uppercase tracking-widest opacity-60">Niveau 3</div>
<div class="font-bold text-base mt-1">Vérification & traçabilité</div>
<ul class="text-xs mt-2 space-y-1 list-disc pl-4">
<li>Artefacts signés cryptographiquement</li>
<li>SBOM généré à chaque build</li>
<li>Attestations de provenance</li>
</ul>
</div>

<div class="p-3 border-l-4 border-[#e63946] bg-[#e63946]/10 rounded">
<div class="text-xs uppercase tracking-widest opacity-60">Niveau 4</div>
<div class="font-bold text-base mt-1">Confiance zéro</div>
<ul class="text-xs mt-2 space-y-1 list-disc pl-4">
<li>OIDC partout (pas de secret statique)</li>
<li>Vérification obligatoire avant déploiement</li>
<li>Monitoring comportemental des runners</li>
</ul>
</div>

</div>

<div class="text-center mt-4 text-xs opacity-75 italic">
Commencez simple. Complexifiez quand un vrai besoin apparaît.
</div>

<!--
- 90% des équipes vivent très bien au niveau 1-2
- Niveau 3-4 : grandes orgas avec exigences réglementaires
- Pas de saut d'étape : on construit progressivement
-->

---
layout: default
---

## Outils du marché · mention agnostique

<div class="text-xs leading-tight mt-4">

| Outil | Forces | Contexte idéal |
|---|---|---|
| **GitHub Actions** | Intégration native GitHub, marketplace riche | Code sur GitHub |
| **GitLab CI/CD** | Solution complète, auto-hébergeable | Code sur GitLab |
| **Jenkins** | Extensibilité maximale, plugins pour tout | Grandes entreprises, besoins spécifiques |
| **Dagger** | Pipelines programmables en code | Multi-plateformes, portabilité |
| **ArgoCD** | GitOps pull-based pour Kubernetes | K8s, Continuous Deployment fiable |
| **CircleCI / Buildkite / Drone** | Alternatives SaaS / self-hosted | Selon contexte |

</div>

<div class="mt-6 p-4 bg-[#1d3557]/20 rounded text-base text-center">
Les <strong>principes</strong> vus aujourd'hui sont <strong>universels</strong>.<br/>
<span class="text-sm opacity-80 italic">Choisir l'outil = choisir l'écosystème, pas les principes.</span>
</div>

<!--
- Vrai conseil pratique : prenez l'outil de votre forge Git
- GitHub Actions = le plus accessible pour démarrer
- GitLab CI = la solution la plus complète intégrée
-->

---
layout: statement
---

# Cette semaine.

<div class="text-2xl mt-6 opacity-80">Sur votre repo en cours.</div>

<div class="grid grid-cols-4 gap-3 mt-10 text-center">

<div class="p-4 bg-[#1d3557]/30 rounded">
<div class="text-3xl mb-2">🔍</div>
<div class="font-bold">lint</div>
<div class="text-xs opacity-70 mt-1">vérifier le style</div>
</div>

<div class="p-4 bg-[#1d3557]/30 rounded">
<div class="text-3xl mb-2">✅</div>
<div class="font-bold">tests</div>
<div class="text-xs opacity-70 mt-1">au moins unitaires</div>
</div>

<div class="p-4 bg-[#1d3557]/30 rounded">
<div class="text-3xl mb-2">📦</div>
<div class="font-bold">build</div>
<div class="text-xs opacity-70 mt-1">artefact taggé par SHA</div>
</div>

<div class="p-4 bg-[#1d3557]/30 rounded">
<div class="text-3xl mb-2">🚀</div>
<div class="font-bold">deploy</div>
<div class="text-xs opacity-70 mt-1">staging auto, prod manuel</div>
</div>

</div>

<div class="text-center mt-10 text-base opacity-75 italic">
Pas la syntaxe parfaite. Pas l'outil parfait.<br/>
<strong>La structure et les bonnes pratiques.</strong>
</div>

<!--
- LE moment clé de la conclusion
- Insister : commencer simple, itérer
- Chacun doit repartir avec un objectif concret pour la semaine
-->

---
layout: center
class: text-center
---

# Questions ?

<div class="text-base opacity-70 mt-6">Discussion · Vos pipelines · Cas concrets</div>

<div class="mt-12 text-sm opacity-60">
Le CI/CD est une <strong>culture</strong> avant d'être un outil.<br/>
Automatisez l'usage de vos outils et bonnes pratiques de dev,<br/>
et rendez vos déploiements <strong>fiables</strong> et <strong>maîtrisés</strong>.
</div>

<!--
- Garder la slide visible pendant les Q&A
- Si pas de questions, lancer : "Vous avez une CI sur votre projet en cours ?"
- Anticiper les Q&A préparées dans plan.md
-->

---
layout: two-cols-header
id: presentation
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
  <a href="https://github.com/maxime-lenne" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
    github.com/maxime-lenne
  </a>
  <a href="https://www.linkedin.com/in/maximelenne/" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
    linkedin.com/in/maximelenne
  </a>
  <a href="mailto:hello@maxime-lenne.fr" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">✉️ hello@maxime-lenne.fr</a>
  <div class="flex flex-col items-center gap-2 mt-3 pt-3">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.linkedin.com/in/maximelenne/&bgcolor=0f172a&color=94a3b8&margin=6" class="w-40 h-40 rounded-lg" alt="LinkedIn QR" />
    <div class="text-xs opacity-50">LinkedIn</div>
  </div>
</div>

---
layout: end
background: https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920
class: text-left
---

<div class="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-transparent" />

<div class="relative z-10 h-full flex items-end pb-16 pl-4 gap-16">
  <div class="flex-1">
    <div class="text-[#457b9d] text-sm font-bold uppercase tracking-widest mb-4">Merci</div>
    <h1 class="text-6xl font-black leading-tight mb-8">
      Let's <br><span class="text-[#457b9d]">build <br>together</span>
    </h1>
    <div class="text-sm opacity-60 mb-4">
      <a href="mailto:hello@maxime-lenne.fr" class="flex items-center gap-2 no-underline opacity-75 hover:opacity-100">✉️ hello@maxime-lenne.fr</a>
      <a href="https://maxime-lenne.fr" target="_blank" class="flex items-center gap-2 no-underline opacity-80 hover:opacity-100">🌐 maxime-lenne.fr</a>
    </div>
    <div class="flex flex-col items-center gap-2">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.linkedin.com/in/maximelenne/&bgcolor=0f172a&color=FFF&margin=6" class="w-40 h-40 rounded-lg" alt="LinkedIn QR" />
      <div class="text-xs opacity-50">LinkedIn</div>
    </div>
  </div>
</div>

<div class="text-xs opacity-30">Slides built with <a href="https://sli.dev" class="no-underline">sli.dev</a> · Thème maxime-lenne</div>

<!--
Call to action final — laisser le QR code visible pendant les questions
-->
