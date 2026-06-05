---
layout: section
---

# Spec-Driven Development

<div class="text-lg opacity-70 mt-4">15 min · Spec > Code · les 6 frameworks AIDD</div>

---
layout: two-cols-header
---

### Le problème du prompting direct

::left::

#### Ce qu'on voudrait faire

```text
Fais-moi une feature de login
```

#### Ce que l'agent comprend

- Login avec quoi ? Email ? OAuth ?
- Quel design ? Quelle validation ?
- Où stocker la session ?
- Quelles erreurs gérer ?

::right::

#### Résultat

- Code **bancal**
- Manque de **cas limites**
- Design **aléatoire**
- **Refactoring** immédiat nécessaire

<div class="border-l-4 border-[#e63946] pl-4 mt-3 text-sm">

**Manque de contexte = agent qui improvise.**
La spec, c'est précisément l'antidote.

</div>

<!--
- Pour faire rire la salle : montrer le diff produit par un prompt vague, c'est toujours instructif
- Le réflexe naturel du dev : "il fallait juste mieux prompter" — mais non, il fallait spécifier
-->

---
layout: quote
---

« Les spécifications, la description de ce que l'on attend de notre logiciel, c'est ça qui compte. »

<div class="text-base opacity-70 mt-4">— Dexter Horthy, Human Layer</div>

---
layout: default
---

### Spec-First Development — le principe

<br>

#### Avec l'IA, la spécification est une étape **indispensable**

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#457b9d] pl-4">

L'IA génère le code, mais **vous** définissez le **quoi** et le **pourquoi**.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

Sans spec claire → **hallucinations**, hors-sujet, dette technique.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

Les spécifications sont **versionnées, reviewées, itérées** — dans le repo.

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70 max-w-2xl mx-auto">

Spec-driven ≠ waterfall. La spec **évolue** avec le code, à chaque PR.

</div>

<!--
- L'objection classique : "c'est du waterfall déguisé"
- Réponse : non, la spec vit dans le repo, change à chaque sprint, est commité avec le code
- Différence clé : la spec waterfall était figée. La spec agentique est vivante.
-->

---
layout: two-cols-header
---

### Review specs > Review code

::left::

#### Review de code

- **2000 lignes** de Go
- Temps : **2-4 heures**
- Erreurs : détectées **tard**

::right::

#### Review de specs

- **200 lignes** de markdown
- Temps : **20-30 minutes**
- Erreurs : détectées **tôt**

<div class="text-center mt-8 text-base text-[#10b981] font-bold">

**Catch problems early** — une erreur dans les specs coûte **10x moins** qu'une erreur dans le code.

</div>

<!--
- L'asymétrie est massive : 10x moins de lignes, 6x moins de temps, problèmes détectés en amont
- Argument irréfutable pour les équipes qui veulent "passer plus vite à l'implémentation"
- Le temps économisé en refactoring paye largement le temps investi en spec
-->

---
layout: fact
---

# -50%

<div class="text-2xl mt-4">temps de refactoring</div>

<div class="text-sm opacity-70 mt-8 max-w-2xl mx-auto">

Données mesurées (LogRocket 2025, GitLab 2025) sur les équipes ayant adopté un workflow spec-driven avec l'agentic AI.

Aussi : **-40 à 60%** bugs en production · **+30%** vélocité après adoption · **78%** des équipes enterprise utilisent des outils AI.

</div>

<!--
- Le ROI est démontré par les études GitLab Research et LogRocket
- Learning curve : 3-4 semaines selon le framework
- Pour convaincre un sponsor budget : ces chiffres + un projet pilote sur 6 semaines = pitch parfait
-->

---
layout: default
---

### Spec-Driven Development : les 6 frameworks AIDD

<br>

<div class="grid grid-cols-6 gap-2 mt-4 text-xs">

<div class="border-l-4 border-[#1d3557] pl-2">

#### BMAD Method

Multi-agents agile (21 rôles). **Enterprise**, audit trails complets.

</div>

<div class="border-l-4 border-[#457b9d] pl-2">

#### Spec Kit

Constitution-based, léger. Du vibe coding à l'agentic.

</div>

<div class="border-l-4 border-[#10b981] pl-2">

#### OpenSpec

Proposal-based, incrémental. **Brownfield**, features existantes.

</div>

<div class="border-l-4 border-[#f59e0b] pl-2">

#### Kiro (AWS)

IDE natif, specs intégrées. **AWS**, environnement unifié.

</div>

<div class="border-l-4 border-[#e63946] pl-2">

#### GSD

Sub-agents, isolation contexte. **Solo dev**, vélocité max.

</div>

<div class="border-l-4 border-[#8b5cf6] pl-2">

#### Task Master

PRD-centric, dépendances auto. **Cursor**, décomposition de tâches.

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-8 text-sm">

**Point commun** : la spec est la source de vérité, le code n'est que son implémentation.

</div>

<!--
- Marché jeune (tous nés en 2024-2025), pas encore de "winner take all"
- Le choix dépend du contexte (voir matrice slide suivante)
- BMAD = enterprise, Task Master = Cursor, OpenSpec = brownfield... pas un seul ne gagne sur tous les axes
-->

---
layout: default
---

### Quelle méthode choisir ?

<div class="text-sm leading-tight mt-4">

| Contexte | Framework recommandé | Raison |
|----------|----------------------|--------|
| **Solo dev, perso** | OpenSpec ou GSD | Rapidité, zero config |
| **Solo dev, clients** | Spec Kit / Task Master | Structure + doc pour handoff |
| **Solo greenfield complexe** | GSD | Isolation contexte, commits atomiques |
| **Startup** | OpenSpec / Spec Kit | Vélocité sans sacrifier maintenabilité |
| **Équipe (3-10)** | Spec Kit / Task Master | Agent-agnostic, multi-IDE |
| **Enterprise** | BMAD | Traçabilité, audit-ready |
| **Écosystème AWS** | Kiro | Intégration native, support enterprise |
| **Projet existant** | OpenSpec | Conçu pour évolutions sur codebase |

</div>

<!--
- Matrice simple à projeter en grand quand on hésite
- Recommandation par défaut pour un AI Builder en entreprise : commencer par Spec Kit ou Task Master
- Pour brownfield : OpenSpec est conçu exactement pour ça
-->
