# CI / CD — Plan de présentation

**Durée :** 90-110 minutes (1h30 à 1h50)
**Public :** Mixte — apprenants Simplon (techniques variés) + nouveaux arrivants en équipe (onboarding)
**Format :** Lecture / talk (slides + parole, pas de live demo)
**Langue :** Français
**Thème :** maxime-lenne
**Contrainte :** Volontairement agnostique des outils (pas de syntaxe complète GitHub Actions / GitLab CI ; pas de K8s/Helm, MLOps, GitOps avancé, SLSA/SBOM en détail)

---

## Message central

> « Le CI/CD est une **culture** avant d'être un outil : automatisez l'usage de vos outils et bonnes pratiques de dev, et rendez vos déploiements **fiables** et **maîtrisés**. »

## Call to action

À la sortie de la formation, chaque participant doit pouvoir **ajouter à son repo en cours une pipeline minimale** comportant 4 jobs :

```text
lint  →  tests  →  build  →  deploy
```

Pas l'outil ni la syntaxe parfaite. La structure et les bonnes pratiques.

---

## Sources utilisées

| Source | Description |
|--------|-------------|
| `sources/introduction.md` | Définitions CI/CD, importance, différences CI vs Delivery vs Deployment, flux simplifié |
| `sources/best-practices.md` | Stratégies de tests, gestion des versions, stratégies de déploiement, monitoring, sécurité |
| `sources/docker-continous-deployment.md` | Packaging Docker, intégration build dans CI, déploiement de conteneurs, stratégies |
| `sources/ignore/introduction.md` | Parcours d'apprentissage en 7 étapes (vue d'ensemble) |
| `sources/ignore/pipeline.md` | Anatomie : jobs, stages, runners, cache vs artefacts, environnements, observabilité |
| `sources/ignore/integration-delivery-deployment.mnd` | CI vs Continuous Delivery vs Continuous Deployment (3 niveaux) |
| `sources/ignore/pipeline-moderne.md` | Architectures modernes : trunk-based, monorepo, build-once-deploy-many |
| `sources/ignore/best-practices.md` | Invariants : build once, immutabilité, idempotence, fail fast, déclaratif |
| `sources/ignore/anti-patern.md` | 7 anti-patterns classiques + checklist d'audit |
| `sources/ignore/securiser.md` | 4 piliers de sécurité : identités, dépendances, runners, artefacts |
| Templates `decks/templates/slides.md` | Slide « Présentation » (bio Maxime) + slide finale « Let's build together » |

Pas de recherche web complémentaire nécessaire — les sources couvrent largement le périmètre.

---

## Allocation du temps

| Partie | Section | Temps | Slides | Focus |
|--------|---------|-------|--------|-------|
| **1 — Intro & fondamentaux** | Hook + définitions + anatomie | **30 min** | ~12 | Pourquoi, vocabulaire commun, structure d'une pipeline |
| **2 — Deep dive** | A. Tester en CI | 15 min | ~8 | Pyramide, déterminisme, lint, couverture |
| | B. Builder en CI | 15 min | ~8 | Build once, immutabilité, versioning, registres |
| | C. Livrer & Déployer | 15-20 min | ~9 | Promotion, configuration runtime, stratégies, rollback |
| | D. Sécurité & anti-patterns | 5-10 min | ~5 | 4 piliers, top anti-patterns |
| **3 — Conclusion** | Bonnes pratiques, maturité, outils, CTA, Q&A | **15-20 min** | ~7 | Checklist, étapes par étapes, outils du marché |

**Total estimé :** ~50 slides (≈ 2 min/slide en moyenne, certaines plus rapides — sections, dividers — d'autres plus longues — pyramide, stratégies de déploiement)

---

## PARTIE 1 — Intro & fondamentaux (30 min, ~12 slides)

### Section 1.1 — Hook & contexte (5 min, ~3 slides)

**Points clés**

- L'anecdote du vendredi soir qui plante (chaos sans CI/CD)
- "Ça marchait sur ma machine" — le syndrome universel
- Pourquoi ce sujet maintenant ? (vélocité, qualité, confiance, embauchabilité)

**Visuels**

- [ ] Couverture : image Unsplash chaîne d'assemblage robotisée (métaphore pipeline)
- [ ] Slide chaos : illustration ou liste à puces "5 dev → 1 vendredi → catastrophe"
- [ ] Citation de Stéphane Robert : "Le chaos a un nom : l'absence d'automatisation fiable"

**Sources**

- `sources/ignore/introduction.md` — section "Résoudre ce cauchemar sans fin"
- `sources/introduction.md` — section "Importance du CI/CD"

---

### Section 1.2 — Définitions : CI vs Delivery vs Deployment (10 min, ~3 slides)

**Points clés**

- **CI (Continuous Integration)** — chaque push déclenche build + tests, feedback en minutes
- **CD #1 — Continuous Delivery** — code toujours prêt à déployer, validation humaine
- **CD #2 — Continuous Deployment** — déploiement auto sans intervention humaine
- Chaque niveau **inclut** le précédent — c'est une progression
- Plus on automatise, plus les exigences de qualité augmentent

**Visuels**

- [ ] Schéma : 3 cercles concentriques CI ⊂ Delivery ⊂ Deployment
- [ ] Tableau comparatif (déclencheur, artefact, déploiement prod, intervention humaine)
- [ ] Analogie cuisine (du chef qui goûte → assiette dressée → service automatique)

**Talking points**

- Insister sur la confusion CD/CD — toujours préciser de quoi on parle
- Anti-pattern : viser le full Continuous Deployment sans avoir les fondations (Netflix mythe)
- "On commence par la CI. Toujours."

**Sources**

- `sources/ignore/integration-delivery-deployment.mnd` (cœur de la section)
- `sources/introduction.md` — section "Différences entre CI et CD"

---

### Section 1.3 — Pipeline ≠ Script (3 min, ~1 slide)

**Points clés**

- Un script Bash s'exécute, une pipeline est gouvernée
- 5 différences clés : environnement contrôlé, déclaration explicite, statut par étape, historique, événements Git

**Visuels**

- [ ] Tableau Script vs Pipeline (5 lignes)

**Sources**

- `sources/ignore/pipeline.md` — section "Pipeline n'est pas un script"

---

### Section 1.4 — Anatomie d'une pipeline (10 min, ~4 slides)

**Points clés**

- **Jobs** : unités atomiques, isolées, succès/échec
- **Stages** : phases séquentielles regroupant des jobs parallèles
- **Runners / agents** : machines qui exécutent — hébergés vs auto-hébergés vs éphémères
- **Artefacts vs cache** — *différence souvent confondue* :
  - Cache = accélérer (dépendances), optionnel
  - Artefact = transmettre (livrable), obligatoire si dépendance
- **Environnements** : dev / staging / production, avec règles de protection et secrets séparés

**Visuels**

- [ ] Diagramme DAG d'une pipeline (jobs en parallèle, dépendances)
- [ ] Schéma stages → jobs (lint + tests en parallèle puis build puis deploy)
- [ ] Tableau Cache vs Artefact (but, persistance, exemple, obligatoire ?)
- [ ] Schéma environnements : staging.example.com → prod.example.com

**Talking points**

- Un job = un conteneur jetable
- Plusieurs jobs = paralléliser pour gagner du temps
- Cache vs artefacts est LA confusion classique des débutants

**Sources**

- `sources/ignore/pipeline.md` (section principale)

---

### Section 1.5 — Les 3 invariants (3 min, ~1 slide récap)

**Points clés**

- **Reproductibilité** — même entrée = même sortie
- **Traçabilité** — remonter de l'artefact au commit
- **Observabilité** — savoir en temps réel ce qui se passe

**Visuels**

- [ ] Slide synthèse : 3 piliers visuels avec icônes

**Sources**

- `sources/ignore/pipeline.md` — section "Les invariants d'une pipeline"

---

## PARTIE 2 — Deep dive : Test, Build, Deploy (45-60 min, ~30 slides)

### Section 2.A — Job de test (15 min, ~8 slides)

**Points clés**

- Pourquoi tester EN CI ? Coût des bugs explose avec le temps
- **Pyramide des tests** :
  - Base large = tests unitaires (rapides, isolés, mocks)
  - Milieu = tests d'intégration (composants ensemble)
  - Sommet étroit = tests E2E (scénarios utilisateur, lents)
- **Shift Left Testing** — tester tôt et souvent
- **Lint & analyse statique** — vérifications syntaxiques en quelques secondes
- **Tests déterministes** — épingler dépendances (lockfile), mocker les API, isoler
- **Tests flaky** — le cancer silencieux : à corriger, jamais relancer
- **Couverture de code** — indicateur, pas objectif (100% ≠ zéro bug)
- **Fail fast** — lint → unit → intégration → E2E (échec rapide)

**Visuels**

- [ ] Diagramme : pyramide des tests (3 niveaux, proportions)
- [ ] Schéma : shift left (timeline détection bug → coût)
- [ ] Snippet pseudo-code : test flaky vs test isolé (Python ou JS)
- [ ] Tableau : `npm install` (non déterministe) vs `npm ci` (déterministe)

**Talking points**

- "Si vous lisez 'relance, ça va passer' dans Slack, vous avez un test flaky"
- 100% coverage ne garantit rien — c'est la qualité des assertions qui compte

**Sources**

- `sources/best-practices.md` — section "Stratégies de tests efficaces"
- `sources/ignore/anti-patern.md` — sections "Pipeline non-déterministe" + "Tests en fin de chaîne"
- `sources/ignore/best-practices.md` — section "Idempotence"

---

### Section 2.B — Job de build (15 min, ~8 slides)

**Points clés**

- **Build once, deploy many** — principe fondateur :
  - Construire l'artefact UNE fois
  - Le promouvoir d'environnement en environnement
  - Ce qui change = la configuration uniquement
- **Immutabilité** — un artefact créé ne change jamais :
  - ❌ Tags mutables (`latest`, `main`, `staging`)
  - ✅ Tags par SHA de commit (`app:abc123def`)
- **Idempotence** — même commit = même artefact, toujours
- **Versioning sémantique (SemVer)** : `MAJEUR.MINEUR.PATCH`
- **Tags Git** — marquer les commits de release, déclencher des pipelines de release
- **Release notes** — automatiser via les commits conventionnels (mention rapide, sans entrer dans les outils)
- **Registres d'artefacts** — où stocker les images/binaires (mention agnostique : Docker Hub, GHCR, GitLab Registry, ECR, Artifactory…)

**Visuels**

- [ ] Schéma : 1 build → 3 environnements (même artefact `app:abc123` partout)
- [ ] Diagramme : tag mutable (contenu change, nom reste) vs tag immutable (SHA)
- [ ] Tableau : Rebuild par env vs Promotion (reproductibilité, temps, rollback)
- [ ] Slide SemVer : MAJ.MIN.PATCH avec exemples (1.2.3 → 1.2.4 patch, → 1.3.0 minor, → 2.0.0 major)
- [ ] Snippet pseudo-code minimal : `docker build -t app:$COMMIT_SHA .`
- [ ] Schéma : registre central, multiple consommateurs (staging, prod, dev local)

**Talking points**

- "Si vous voyez `:latest` en production, vous avez un problème"
- Le SHA du commit comme tag = traçabilité totale code ↔ artefact
- SemVer n'est pas que pour les libs OSS — c'est aussi pour les applications

**Sources**

- `sources/ignore/best-practices.md` — sections "Build once, deploy many" + "Immutabilité" + "Idempotence"
- `sources/best-practices.md` — section "Gestion des versions"
- `sources/docker-continous-deployment.md` — section "Intégration du build Docker dans le pipeline CI"

---

### Section 2.C — Job de delivery / deployment (15-20 min, ~9 slides)

**Points clés**

- **Séparation build / deploy** — deux responsabilités distinctes :
  - Build = créer l'artefact générique (pas de config env)
  - Deploy = installer + injecter la configuration runtime
- **Configuration au runtime** : variables d'env, fichiers de config, secrets injectés
- **Stratégies de déploiement** (4 grandes familles) :
  1. **Recreate** — arrêt + redémarrage (downtime, simple)
  2. **Blue/Green** — deux envs, bascule du trafic, rollback instantané
  3. **Canary** — déploiement progressif sur sous-ensemble d'utilisateurs
  4. **Rolling updates** — instances mises à jour par groupes
- **Smoke tests post-déploiement** — vérifier que ça répond après déploiement
- **Rollback** — toujours prévoir le retour arrière (idéalement automatique)
- **Environnements & secrets** — séparation stricte staging ≠ prod

**Visuels**

- [ ] Diagramme : pipeline build → push registry → deploy (3 étapes distinctes)
- [ ] Schémas comparatifs (4 stratégies de déploiement) — un schéma par stratégie
- [ ] Tableau récap stratégies : downtime / ressources / complexité / rollback
- [ ] Slide rollback : "Pull tag précédent → redéployer" (1 ligne)

**Talking points**

- "Le rollback le plus rapide : redéployer un tag immutable précédent. Pas de rebuild."
- Canary = idéal mais nécessite infra capable de router le trafic (load balancer intelligent)
- Pour la majorité : commencer par Recreate (avec maintenance), évoluer vers Rolling

**Sources**

- `sources/ignore/best-practices.md` — section "Séparation build / deploy"
- `sources/best-practices.md` — section "Stratégies de Déploiement"
- `sources/docker-continous-deployment.md` — section "Déploiement de conteneurs Docker"

---

### Section 2.D — Sécurité & anti-patterns (5-10 min, ~5 slides)

**Points clés (sécurité — survol seulement)**

- Une pipeline = trousseau de clés qui ouvre toutes les portes
- **4 piliers** :
  1. **Identités** — moindre privilège, tokens éphémères (OIDC) > secrets statiques
  2. **Dépendances** — épingler par hash SHA (pas `@v4`), commiter les lockfiles
  3. **Runners** — éphémères, isolés, pas de secrets pour les forks externes
  4. **Artefacts** — signer cryptographiquement (mention) + traçabilité
- *Mention rapide :* incidents 2024-2025 (XZ Utils, tj-actions/changed-files) — la confiance implicite est dangereuse

**Points clés (anti-patterns — top 5)**

1. La pipeline monolithe (45 min de feedback)
2. La pipeline non-déterministe ("relance ça va passer")
3. Le copier-coller sans gouvernance (50 pipelines divergentes)
4. Le rebuild par environnement ("ça marchait en staging")
5. Les exceptions permanentes (sécurité désactivée "temporairement")

**Visuels**

- [ ] Slide sécurité : 4 piliers visuels avec une icône chacun
- [ ] Tableau anti-patterns : symptôme → solution (5 lignes)
- [ ] Encadré incident : "tj-actions/changed-files (2025) — secrets exfiltrés en quelques heures"

**Talking points**

- "On ne va pas faire un cours de DevSecOps, mais retenez le moindre privilège"
- Le pire anti-pattern n'est pas l'erreur bruyante mais la dette invisible

**Sources**

- `sources/ignore/securiser.md` — sections "4 piliers"
- `sources/best-practices.md` — section "Sécurité dans les pipelines"
- `sources/ignore/anti-patern.md` — checklist intégrale

---

## PARTIE 3 — Conclusion (15-20 min, ~7 slides)

### Section 3.1 — Bonnes pratiques : la checklist (5 min, ~2 slides)

**Points clés**
Checklist universelle (extrait de `best-practices.md` ignoré) :

- [ ] Feedback rapide (<15 min)
- [ ] Build once, deploy many
- [ ] Immutabilité (tags SHA)
- [ ] Idempotence (lockfiles)
- [ ] Fail fast (échec immédiat)
- [ ] Séparation build / deploy
- [ ] Pipelines déclaratives
- [ ] Observabilité (durée, taux de succès, flaky tests)

**Visuels**

- [ ] Checklist visuelle "à imprimer" — slide dense mais scannable

---

### Section 3.2 — Modèle de maturité (3 min, ~1 slide)

**Points clés**
4 niveaux progressifs :

1. **Hygiène de base** — permissions minimales, lockfiles, pas de secrets en dur
2. **Épinglage & isolation** — hashes SHA, runners éphémères, secrets par env
3. **Vérification & traçabilité** — signatures, SBOM, attestations
4. **Confiance zéro** — OIDC partout, monitoring comportemental

→ Commencer simple, complexifier quand un vrai besoin apparaît.

**Visuels**

- [ ] Pyramide ou échelle des 4 niveaux

---

### Section 3.3 — Outils du marché (3 min, ~1-2 slides)

**Points clés (mention agnostique, sans détailler la syntaxe)**

| Outil | Forces | Contexte idéal |
|-------|--------|----------------|
| GitHub Actions | Intégration native, marketplace | Code sur GitHub |
| GitLab CI/CD | Solution complète, auto-hébergeable | Code sur GitLab |
| Jenkins | Extensibilité maximale | Grandes entreprises |
| ArgoCD | GitOps pull-based | Kubernetes |
| Dagger | Pipelines en code, portables | Multi-plateformes |

**Talking points**

- Les principes vus aujourd'hui sont **universels** — quel que soit l'outil
- Choisir l'outil = choisir l'écosystème, pas les principes

**Sources**

- `sources/ignore/introduction.md` — section "Maintenant : choisir un outil"

---

### Section 3.4 — Call to action (3 min, ~1 slide)

**Points clés**
> Cette semaine, sur votre repo en cours :

```text
1. Ajouter un job  lint     (vérifier le style)
2. Ajouter un job  tests    (au moins unitaires)
3. Ajouter un job  build    (artefact taggé par SHA)
4. Ajouter un job  deploy   (vers staging, manuel pour prod)
```

Pas l'outil parfait. Pas la syntaxe parfaite. **La structure et les bonnes pratiques.**

**Visuels**

- [ ] Slide CTA : 4 jobs en pipeline horizontal (lint → tests → build → deploy)

---

### Section 3.5 — Q&A + clôture (5-7 min, ~3 slides)

- [ ] Slide Q&A
- [ ] Slide « Présentation Maxime » (template existant — bio + liens)
- [ ] Slide finale « Let's build together » (template existant — QR LinkedIn)

---

## Diagrammes Mermaid à créer

1. **CI / Delivery / Deployment — 3 niveaux concentriques**
   - Type : `graph` ou cercles imbriqués
   - Éléments : CI (commit → build → test) ⊂ Delivery (+ artefact + staging + validation humaine) ⊂ Deployment (+ prod auto)

2. **Anatomie d'une pipeline — DAG**
   - Type : `graph LR` (left-to-right)
   - Éléments : `commit → [lint, unit-tests, security-scan] → build → push-registry → [deploy-staging → e2e-tests] → deploy-prod`

3. **Pyramide des tests**
   - Type : `flowchart` (formes triangulaires) ou texte ASCII stylisé
   - Éléments : E2E (sommet étroit) / Intégration (milieu) / Unitaires (base large) avec annotations vitesse + nombre

4. **Build once, deploy many**
   - Type : `graph LR`
   - Éléments : `build (1 fois) → registry → [deploy-dev, deploy-staging, deploy-prod]` (même artefact partout, configs différentes)

5. **Stratégies de déploiement** — 4 mini-schémas
   - Recreate : `[v1 down] → [v2 up]`
   - Blue/Green : `[Blue v1 ← traffic] → switch → [Green v2 ← traffic]`
   - Canary : `[v1 90%] + [v2 10%]` puis `[v1 50%] + [v2 50%]` etc.
   - Rolling : `[3 instances v1] → [2 v1 + 1 v2] → [1 v1 + 2 v2] → [3 v2]`

6. **4 piliers de sécurité**
   - Type : carré 2×2 ou 4 colonnes
   - Éléments : Identités | Dépendances | Runners | Artefacts

---

## Code & exemples à inclure (Minimal–Modéré)

| # | Exemple | Langage | Objectif | Localisation |
|---|---------|---------|----------|--------------|
| 1 | `npm install` vs `npm ci` | Shell | Déterminisme | Section tests |
| 2 | Test flaky vs test isolé | Pseudo-Python | Tests déterministes | Section tests |
| 3 | Tag mutable vs SHA | Shell (`docker build`) | Immutabilité | Section build |
| 4 | Promotion d'artefact | Pseudo-YAML générique (3 jobs : build / staging / prod) | Build once | Section deploy |
| 5 | Pipeline impératif vs déclaratif | Pseudo-YAML générique | Déclaratif | Section bonnes pratiques (rapide) |

**Règles** :

- Pseudo-syntaxe générique : `pipeline:` / `jobs:` / `script:` — pas de `runs-on: ubuntu-latest`, pas de `actions/checkout@v4` (trop GitHub-specific)
- Préférer : commentaires ❌ / ✅ pour montrer le contraste
- Pas de bloc > 15 lignes sur un slide (overflow Slidev à 1280×720)

---

## Q&A anticipées

1. **« Mais quel outil tu nous conseilles concrètement ? »**
   - Réponse : Si votre code est sur GitHub → GitHub Actions (le plus accessible). Sur GitLab → GitLab CI. Sinon, partez de là où votre code vit déjà. Les principes sont les mêmes.

2. **« Une pipeline c'est lourd, on est seul sur le projet, ça vaut le coup ? »**
   - Réponse : Oui, dès le 1er jour. Même seul, "ça marchait sur ma machine" arrive. Une CI minimale (lint + tests) tient en 20 lignes et vous évite des heures de debug futur.

3. **« Trunk-based ou GitFlow ? »**
   - Réponse : Dépend du contexte. SaaS qui livre souvent → trunk-based. Plusieurs versions en prod (apps mobiles, logiciels installés) → GitFlow. Commencez simple.

4. **« Comment gérer les secrets ? »**
   - Réponse : JAMAIS dans le code. Utilisez le gestionnaire de secrets de votre plateforme (GitHub Secrets, GitLab CI variables, Vault…). Idéalement, OIDC/tokens éphémères plutôt que secrets statiques.

5. **« Et les tests qui dépendent d'une vraie API externe ? »**
   - Réponse : Mockez en CI. Testez l'intégration réelle dans un environnement de staging dédié, pas dans la pipeline principale.

6. **« 100% de couverture, c'est l'objectif ? »**
   - Réponse : Non. C'est un indicateur, pas un but. 100% lignes exécutées ≠ 100% des cas testés. Mieux vaut 70% bien pensés que 100% triviaux.

7. **« Pourquoi pas `:latest` en production ? »**
   - Réponse : Parce que `:latest` change. Si demain on rebuild `:latest` et qu'un service redémarre, il pull une autre image sans que personne ne le sache. Tag par SHA = traçabilité totale.

8. **« Un job échoue régulièrement, on peut le retry automatique ? »**
   - Réponse : NON. Un retry auto = vous masquez un test flaky. Corrigez la cause racine (timing, état partagé, ressource externe). Le retry, c'est de la dette invisible.

---

## Choix de templates

Templates utilisés depuis `decks/templates/slides.md` :

- ✅ Slide « Présentation » (bio Maxime, layout `two-cols-header`) → en avant-dernière position (avant le slide final)
- ✅ Slide « Let's build together » (layout `end`, background Unsplash, QR LinkedIn) → toute dernière slide

---

## Outline complet — Liste numérotée des slides

1. `[cover]` Couverture — « CI / CD » — background Unsplash chaîne d'assemblage
2. `[default]` Plan / Agenda
3. `[default]` Le chaos sans CI/CD (anecdote vendredi soir)
4. `[default]` "Ça marchait sur ma machine" — citation/illustration
5. `[default]` Définitions — CI / Delivery / Deployment (vue d'ensemble 3 niveaux)
6. `[two-cols]` CI : objectif, déclencheur, actions, résultat
7. `[two-cols]` Continuous Delivery : prêt à déployer + validation humaine
8. `[two-cols]` Continuous Deployment : auto, prérequis stricts
9. `[default]` Tableau comparatif CI / Delivery / Deployment
10. `[default]` Pipeline ≠ Script — tableau 5 différences
11. `[section]` ── Anatomie d'une pipeline ──
12. `[default]` Jobs : unité atomique (cycle de vie)
13. `[default]` Stages : grouper par phase, paralléliser dans une phase
14. `[default]` Diagramme DAG : ce qui peut tourner en parallèle
15. `[default]` Runners / agents : qui exécute le code
16. `[default]` Cache vs Artefact — tableau (LA confusion à éviter)
17. `[default]` Environnements & secrets séparés
18. `[default]` Les 3 invariants : reproductibilité / traçabilité / observabilité
19. `[section]` ── Tester en CI ──
20. `[default]` Pourquoi tester en CI ? Coût des bugs vs temps
21. `[default]` La pyramide des tests (visuel)
22. `[default]` Tests unitaires (rapides, isolés, mocks)
23. `[default]` Tests d'intégration & E2E
24. `[default]` Lint & analyse statique — shift left
25. `[default]` Tests déterministes — `npm install` vs `npm ci`
26. `[default]` Tests flaky : le cancer silencieux
27. `[default]` Couverture de code : indicateur, pas objectif
28. `[section]` ── Builder en CI ──
29. `[default]` Build once, deploy many — principe fondateur
30. `[default]` Schéma : 1 build → N environnements
31. `[default]` Immutabilité : tags SHA (jamais `:latest`)
32. `[default]` Idempotence : même commit = même artefact
33. `[default]` Versioning sémantique (MAJEUR.MINEUR.PATCH)
34. `[default]` Tags Git & release notes (mention rapide)
35. `[default]` Registres d'artefacts (rôle, exemples agnostiques)
36. `[default]` Snippet : `docker build -t app:$COMMIT_SHA`
37. `[section]` ── Livrer & Déployer ──
38. `[default]` Séparation build / deploy
39. `[default]` Configuration au runtime (vs config au build)
40. `[default]` Stratégie : Recreate (downtime, simple)
41. `[default]` Stratégie : Blue/Green (rollback instantané)
42. `[default]` Stratégie : Canary (déploiement progressif)
43. `[default]` Stratégie : Rolling updates (haute dispo)
44. `[default]` Tableau récap stratégies (downtime / ressources / complexité)
45. `[default]` Smoke tests + rollback automatisé
46. `[section]` ── Sécurité & anti-patterns ──
47. `[default]` 4 piliers : identités / dépendances / runners / artefacts
48. `[default]` Top 5 anti-patterns (tableau)
49. `[section]` ── À retenir ──
50. `[default]` Checklist des bonnes pratiques
51. `[default]` Modèle de maturité (4 niveaux)
52. `[default]` Outils du marché (mention agnostique)
53. `[default]` **CTA — Cette semaine sur votre repo** : lint → tests → build → deploy
54. `[default]` Q&A
55. `[two-cols-header]` Présentation Maxime (template)
56. `[end]` Let's build together (template)

---

*Plan créé le : 2026-04-29*
*Prêt pour génération de slides : [ ] (à valider par l'utilisateur)*
