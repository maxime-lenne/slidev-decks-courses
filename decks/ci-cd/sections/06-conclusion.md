---
layout: section-liquid
---

## À retenir

<div class="text-lg opacity-70 mt-4">20 min · Checklist · Maturité · Outils · Take-aways · Ressources</div>

<!--
- Dernière ligne droite : récap actionnable
- Le CTA est la slide la plus importante de toute la présentation
-->

---
layout: default
---

### Checklist des bonnes pratiques

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

### Modèle de maturité

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

### Outils du marché · mention agnostique

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
layout: default
---

<h3 class="text-3xl mb-4">Les 3 choses à retenir</h3>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

<div class="text-3xl mb-2">⚡</div>

#### Fail fast, feedback rapide

Tests unitaires d'abord, lint en premier (pyramide des tests). Un échec doit remonter en **quelques minutes**, pas en fin de pipeline.

</div>

<div class="border-l-4 border-[#2a9d8f] pl-4">

<div class="text-3xl mb-2">📦</div>

#### Build once, deploy many

Un seul artefact, taggé par **SHA immutable**, promu de staging en production — jamais reconstruit entre les deux.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

<div class="text-3xl mb-2">🔐</div>

#### Confiance zéro par défaut

Moindre privilège, dépendances épinglées par hash, runners éphémères, **OIDC** plutôt que secrets statiques.

</div>

</div>

<!--
- 3 cartes = 3 messages clés à mémoriser
- Si on retient une seule chose : "build once, deploy many" — c'est LE principe testé dans le module Builder
- Si on retient une seule action : auditer les 4 piliers de sécurité de sa pipeline actuelle
-->

---
layout: default
---

### Ressources — Pour aller plus loin

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Lectures fondatrices

- 🧠 [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Martin Fowler
- 📗 [The Twelve-Factor App](https://12factor.net)
- 🏗️ [Release Engineering](https://sre.google/sre-book/release-engineering/) — Google SRE Book

#### Specs & sécurité supply-chain

- 🔏 [SLSA](https://slsa.dev) — niveaux de sécurité supply-chain
- 🖊️ [Sigstore / cosign](https://www.sigstore.dev) — signature d'artefacts
- 📝 [Conventional Commits](https://www.conventionalcommits.org)

</div>

<div>

#### Documentation officielle

- [GitHub Actions](https://docs.github.com/actions)
- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Jenkins](https://www.jenkins.io/doc/)
- [Dagger](https://docs.dagger.io)
- [Argo CD](https://argo-cd.readthedocs.io)

#### Decks compagnons

- 📦 [CI/CD avec GitHub Actions](https://decks.maxime-lenne.fr/decks/ci-cd-github)
- 📦 [Docker](https://decks.maxime-lenne.fr/decks/docker)

</div>

</div>

<!--
- Les decks compagnons sont l'étape pratique naturelle : GitHub Actions pour la mise en oeuvre concrète
- SLSA / Sigstore = pour aller au-delà des 4 piliers de sécurité vus aujourd'hui
- Garder ce lien affiché pendant les questions
-->

---
layout: section
---

## Prochaines étapes

<div class="text-lg opacity-70 mt-4">Passer à l'action, dès cette semaine</div>

---
layout: statement
---

### Cette semaine.

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

### Questions ?

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
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="ci-cd" />
