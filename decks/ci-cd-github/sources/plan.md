# CI/CD avec GitHub Actions — Plan de présentation

**Durée :** 45-60 minutes (workshop)
**Public :** Apprenants en onboarding + profils techniques mixtes (varied expertise)
**Format :** Workshop — slides pédagogiques avec pauses pour exercices courts
**Langue :** Français
**Thème :** maxime-lenne

---

## Message clé

> **« Automatiser tests et build, c'est gagner en qualité et en confiance — chaque commit valide ce qui ne l'était que dans la tête du dev. »**

## Call to Action

À la fin de la session, chaque participant repart avec un objectif concret :
**créer son premier workflow GitHub Actions** sur un de ses projets (perso ou de cours)
qui lance les tests à chaque `push` — avant la séance suivante.

---

## Sources utilisées

| Source | Description |
|--------|-------------|
| `sources/github-action-tests.md` | Source principale (Notion) — Configuration GitHub Actions pour CI/CD, workflow pytest complet, matrix strategy, artifacts, gestion des échecs |
| `sources/ignore/fondation.md` | Bien démarrer avec GitHub Actions — pipeline CI/CD, sécurité (SHA pinning, permissions, secrets), terminologie, attaque tj-actions, contexte |
| `sources/ignore/github-intro.md` | Vue d'ensemble GitHub Actions — Marketplace, modèle tarifaire (quotas, multiplicateurs runners), parcours formation 5 modules |
| `sources/ignore/workflow.md` | Anatomie détaillée workflow — name/on/jobs/steps, hiérarchie, déclencheurs, contextes, 5 règles d'or, erreurs classiques, validation (actionlint, scorecard) |
| `sources/ignore/matrix-strategy.md` | **Source dédiée matrix** (Stéphane Robert, 2025-12) — produit cartésien, include/enrichit, exclude, fail-fast, max-parallel, matrix dynamique `fromJSON`, exemples Python/Docker multi-arch/multi-env, 5 règles d'or matrix |

---

## Allocation du temps

| Section | Temps | Slides | Focus |
|---------|-------|--------|-------|
| 1. Hook & ouverture | 3 min | 2-3 | Pourquoi automatiser ? |
| 2. CI/CD démystifié | 5 min | 3-4 | Concepts + positionnement GitHub Actions |
| 3. Anatomie d'un workflow | 10 min | 6-7 | YAML, hiérarchie, déclencheurs |
| 4. Premier workflow CI Python | 10 min | 5-6 | checkout → setup → install → pytest |
| **Exercice 1** | 5 min | — | Écrire un workflow minimal sur un projet |
| 5. Stratégie matrix | 8 min | 6-7 | Avant/après, produit cartésien, include/exclude, fail-fast |
| **Exercice 2** | 5 min | — | Étendre le workflow avec une matrix |
| 6. Survol sécurité + 5 règles d'or | 7 min | 5-6 | Réflexes essentiels + erreurs courantes |
| 7. Récap & CTA | 3 min | 2-3 | Résumé visuel + appel à l'action |
| **Total** | **~56 min** | **~37 slides** | |

> Les exercices sont courts et autonomes (5 min) — chacun sur son poste, validation par observation/binôme.

---

## Section 1 : Hook & ouverture (3 min, ~3 slides)

### Points clés

- Cover slide (titre, fond Unsplash)
- Slide *Présentation* (depuis `decks/templates/slides.md`) : Maxime Lenne
- Slide *Pourquoi nous sommes ici ?* — la douleur du dev qui lance les tests à la main, oublie un fichier, casse `main`
- Présenter l'objectif de la session : **« sortir avec un 1er workflow CI fonctionnel »**

### Visuels nécessaires

- [ ] Cover Unsplash (déjà choisie : `photo-1717386255777-ce60792a2a56` — câbles serveur)
- [ ] Photo + bio + QR LinkedIn (template existant)
- [ ] Schéma "avant/après" : dev fait tout à la main vs CI auto

### Talking points

- Demander en intro : *"Qui a déjà oublié de lancer les tests avant un push ?"*
- Cadrer : c'est un workshop, pas une démo — vous allez écrire du YAML

### Sources

- `decks/templates/slides.md` (Présentation)

---

## Section 2 : CI/CD démystifié (5 min, ~4 slides)

### Points clés

- Définitions claires : **CI** (intégration continue) vs **CD-Delivery** (livraison continue) vs **CD-Deployment** (déploiement continu)
- L'idée : **petits changements fréquents validés automatiquement** plutôt que grosses releases risquées
- GitHub Actions = service CI/CD intégré à GitHub (depuis 2019)
- Tarif : **gratuit pour repos publics**, quota mensuel pour privés (multiplicateurs Linux ×1, Windows ×2, macOS ×10)
- Workflow textuel YAML dans `.github/workflows/`

### Visuels nécessaires

- [ ] **Diagramme Mermaid** : commit → push → CI déclenché → tests/build/deploy → feedback
- [ ] Tableau pricing (multiplicateurs runners)
- [ ] Schéma de l'arbo `.github/workflows/`

### Talking points

- Insister sur "intégrer **continûment**" : pas "tous les vendredis" mais à chaque commit
- Mentionner le Marketplace : 20k+ actions communautaires (et l'enjeu de confiance)

### Sources

- `sources/ignore/github-intro.md` (intro, marketplace, pricing)
- `sources/ignore/fondation.md` (CI/CD basics)

---

## Section 3 : Anatomie d'un workflow (10 min, ~7 slides)

### Points clés

- **Hiérarchie** : Workflow → Jobs → Steps (analogie « entreprise → départements → tâches »)
- Les **3 grandes parties YAML** : `name`, `on`, `jobs`
- **Déclencheurs (`on:`)** : `push`, `pull_request`, `workflow_dispatch`, `schedule` (cron) — exemples concrets
- **Jobs** : machines vierges, parallèles par défaut, `needs:` pour séquencer
- **Steps** : `uses` (action) vs `run` (commande shell), même machine au sein du job
- **Runners** : `ubuntu-24.04`, `windows-2022`, `macos-14` — éviter `*-latest`
- Conséquence cruciale : fichiers d'un job **non disponibles** dans un autre (artifacts)

### Visuels nécessaires

- [ ] **Diagramme Mermaid** : arbre Workflow → 2 jobs → N steps
- [ ] **Code YAML** progressif : workflow squelette, dévoilé en 3 reveals (name → on → jobs)
- [ ] **Diagramme Mermaid** : 3 jobs en parallèle vs séquencés via `needs:`
- [ ] Tableau runners (OS / cas d'usage)

### Talking points

- Insister : **« YAML = espaces uniquement, jamais de tabulations, 2 espaces par niveau »**
- L'erreur la plus fréquente : oublier `actions/checkout` en premier step
- Visualiser la "fresh VM" : chaque job = nouvelle machine, on est une équipe de stagiaires sans mémoire

### Sources

- `sources/ignore/workflow.md` (anatomie complète, hiérarchie, déclencheurs, runners)
- `sources/ignore/fondation.md` (jobs vs steps, syntaxe YAML)

---

## Section 4 : Premier workflow CI Python (10 min, ~6 slides)

### Points clés

- Étape par étape, on construit `python-ci.yml` ensemble :
  1. `actions/checkout@v4` — récupérer le code
  2. `actions/setup-python@v5` avec `python-version: '3.10'`
  3. `pip install -r requirements.txt`
  4. `pytest` (avec `--junitxml=...` pour rapport)
  5. `actions/upload-artifact@v4` pour le rapport (avec `if: always()`)
- Lecture des logs en cas d'échec : exemple traceback `pytest`
- Statut visuel (✓ vert / ✗ rouge) dans l'onglet Actions

### Visuels nécessaires

- [ ] **Code YAML complet** (Shiki Magic Move) — révélé étape par étape, lignes mises en avant à chaque étape
- [ ] Screenshot onglet Actions (succès vs échec)
- [ ] Snippet log d'échec pytest typique

### Talking points

- Préfacer : *« On va construire ce fichier ensemble, ligne par ligne »*
- Montrer la sortie attendue dans l'UI GitHub
- Lien artefact ↔ debug : *"si les logs sont énormes, téléchargez l'artefact"*

### Sources

- `sources/github-action-tests.md` (workflow complet, lignes 110-149 + gestion échecs)

### 🛠️ Exercice 1 (5 min)

> **Énoncé** : sur un repo de ton choix (ou un repo template fourni), crée le fichier `.github/workflows/ci.yml` avec un job `test` qui :
> 1. fait un checkout
> 2. installe Python 3.10
> 3. lance `pytest`
>
> Pousse sur une branche, ouvre l'onglet Actions, observe.
>
> **Critère de succès** : voir un run vert (ou comprendre pourquoi il est rouge).

---

## Section 5 : Stratégie matrix (7 min, ~5 slides)

### Points clés

- **Problème** : « ça marche sur Python 3.10 chez moi » → pas garanti sur 3.9 / 3.11 / Windows
- **Avant/après** : passer de 9 jobs copiés-collés à un seul bloc paramétré (slide *avant/après* très impactante)
- **Matrix = produit cartésien** : 3 OS × 3 versions Python = 9 jobs générés *automatiquement* en parallèle
  - Analogie : « menu de restaurant — 2 entrées × 3 plats = 6 menus possibles »
  - Attention à l'**explosion combinatoire** : 4 axes × 5 valeurs = 625 jobs !
- **Syntaxe** : `strategy.matrix.<var>: [valeur1, valeur2, ...]`, accès via `${{ matrix.<var> }}`
- **`include`** : double rôle — *ajouter* des combinaisons hors produit cartésien OU *enrichir* des combinaisons existantes (ex : shell `pwsh` pour Windows, `bash` pour Linux)
- **`exclude`** : retirer des combinaisons (versions non supportées, économie de minutes CI)
- **`fail-fast`** : `true` (défaut, feedback rapide) vs `false` (voir TOUS les échecs en debug)
- **`max-parallel`** : limiter le parallélisme (BDD partagée, rate-limiting API, runners self-hosted limités)
- **Avancé (mention rapide)** : matrix dynamique avec `fromJSON()` — générer la matrix à la volée depuis un job amont ou un fichier `.github/matrix.json`

### Visuels nécessaires

- [ ] **Slide avant/après** : 9 jobs dupliqués (rouge) ↔ matrix concise (vert) — tirée directement de la source
- [ ] **Diagramme Mermaid** : 1 définition matrix (3 versions Python × 2 OS) → 6 jobs parallèles générés
- [ ] **Code YAML** : exemple complet commenté (Python multi-OS × multi-versions, ~15 lignes)
- [ ] **Code YAML** : `include` (cas Windows shell pwsh) + `exclude` (Node 22 sur Windows)
- [ ] **Tableau récap des concepts** (depuis la source : *À retenir* — 7 lignes : axes, accès, include, exclude, fail-fast, max-parallel, fromJSON)

### Talking points

- Pédagogie : *« la matrix multiplie votre confiance ET votre consommation de minutes — pesez le besoin »*
- **5 règles d'or matrix** (depuis la source) à mentionner brièvement :
  1. Nommer les jobs explicitement avec `name: Test ${{ matrix.os }} / ...`
  2. Utiliser `fail-fast: false` quand on debug
  3. Limiter la taille (10-20 combinaisons max sur PR)
  4. Gérer les spécificités OS via `include`
  5. Documenter les exclusions par un commentaire
- Astuce CI rapide : matrix réduite sur PR, matrix large sur push `main`
- *Pour aller plus loin* (mention en fin de section) : matrix dynamique `fromJSON` pour tester uniquement les modules modifiés

### Sources

- `sources/github-action-tests.md` (matrix lignes 178-194 + workflow complet 280-313)
- **`sources/ignore/matrix-strategy.md`** ⭐ — source principale pour cette section (Stéphane Robert, ~20 KB) : avant/après, produit cartésien, include/exclude détaillés avec exemples, fail-fast, max-parallel, matrix dynamique `fromJSON`, 5 règles d'or, exemples prêts à l'emploi (Python multi-versions, Docker multi-arch, déploiement multi-env)

### 🛠️ Exercice 2 (5 min)

> **Énoncé** : étends le workflow de l'exercice 1 avec une `matrix` qui teste sur Python 3.9 et 3.10.
> Ajoute `fail-fast: false` et observe le comportement.
>
> **Critère de succès** : 2 jobs apparaissent dans l'onglet Actions, l'un par version.

---

## Section 6 : Survol sécurité + 5 règles d'or (7 min, ~6 slides)

### Points clés (survol — pas de section dédiée approfondie)

- **Trois réflexes mentionnés rapidement** :
  1. Épingler les actions par **SHA** (pas tag mutable) — pourquoi (cf. tj-actions, mars 2025) sans détailler
  2. Déclarer `permissions: contents: read` au minimum
  3. Ne **jamais** `echo` un secret dans les logs (utiliser `env:`)
- Les **5 règles d'or** (slide récap visuel) :
  1. Un workflow = une responsabilité
  2. Toujours commencer par `actions/checkout`
  3. Permissions minimales explicites
  4. Nommer chaque step (lisibilité des logs)
  5. `timeout-minutes` explicite (défaut = 6h !)
- **Erreurs classiques à connaître** : pas de checkout, secret exposé, jobs parallèles non voulus, pas de timeout

### Visuels nécessaires

- [ ] Slide *3 réflexes sécurité* (icônes 🔒 + courte explication chacun)
- [ ] Slide *5 règles d'or* (numérotée, claire, à photographier)
- [ ] Tableau erreur → symptôme → solution

### Talking points

- Cadrer : *« la sécurité mérite une formation à part entière, on en survole les 3 réflexes pour que vos premiers workflows ne soient pas dangereux »*
- Pour aller plus loin : pointer vers ressources externes (Stéphane Robert, doc GitHub)

### Sources

- `sources/ignore/fondation.md` (3 réflexes sécurité, attaque tj-actions, terminologie SHA)
- `sources/ignore/workflow.md` (5 règles d'or, erreurs classiques)

---

## Section 7 : Récap & CTA (3 min, ~3 slides)

### Points clés

- **Slide récap visuel** : la chaîne event → workflow → jobs → steps → result
- **CTA explicite** : *« Avant la prochaine séance, ajoute un workflow CI à un de tes projets. Pousse-le. Montre le badge vert. »*
- Slide *Toc* (table des matières navigable du thème) pour relire
- Slide *ThankYou* (depuis `decks/templates/slides.md`) — QR LinkedIn, contact

### Visuels nécessaires

- [ ] Diagramme synthèse complet (Mermaid)
- [ ] Slide CTA forte typographie
- [ ] Slide *Let's build together* (template)

### Talking points

- Demander : *« Quel projet va recevoir son premier workflow ? »* (engagement public léger)

### Sources

- `decks/templates/slides.md`

---

## Diagrammes à créer

1. **Pipeline CI/CD GitHub Actions** (section 2)
   - Type : Mermaid `flowchart LR`
   - Éléments : Commit → Push → Trigger event → Workflow → Jobs (parallel) → Steps → Result (✓/✗) → Feedback (PR/email)

2. **Hiérarchie Workflow → Jobs → Steps** (section 3)
   - Type : Mermaid `graph TD`
   - Éléments : 1 workflow, 2 jobs (test, build), 3-4 steps chacun, mise en évidence "machines différentes"

3. **Jobs parallèles vs séquencés** (section 3)
   - Type : Mermaid `gantt` ou `flowchart LR`
   - Éléments : test || lint (parallèle) → build (needs) → deploy (needs)

4. **Stratégie matrix** (section 5)
   - Type : Mermaid `flowchart LR`
   - Éléments : 1 définition matrix (3 versions Python) → 3 jobs en parallèle générés

5. **Synthèse finale** (section 7)
   - Type : Mermaid `flowchart LR`
   - Récap visuel de la chaîne complète

---

## Exemples de code à inclure

1. **Workflow squelette progressif** (section 3) — YAML, ~10 lignes
   - Objet : montrer name + on + jobs en 3 reveals
   - Lignes mises en avant : à chaque étape la nouvelle clé
   - **Reveal progressif : oui** (Shiki Magic Move ou `{lines: ...}`)

2. **Workflow Python CI complet** (section 4) — YAML, ~25 lignes
   - Objet : pipeline lint → test → artifact
   - Lignes mises en avant : checkout, setup-python, pytest, upload-artifact
   - **Reveal progressif : oui**
   - Source : `sources/github-action-tests.md` lignes 114-146

3. **Matrix simple** (section 5) — YAML, ~12 lignes
   - Objet : tester Python 3.9, 3.10, 3.11
   - **Reveal progressif : non**

4. **Matrix avec exclude** (section 5) — YAML, ~18 lignes
   - Objet : OS × version avec exclusions
   - Lignes mises en avant : `exclude:` block
   - **Reveal progressif : non**

5. **Snippet permissions + SHA pinning** (section 6) — YAML, ~6 lignes
   - Objet : illustrer les 3 réflexes sécurité
   - **Reveal progressif : non**

---

## Plan d'exercices (au lieu de live demo)

### Exercice 1 : Premier workflow (~5 min, après section 4)

- **Quoi faire** : créer `.github/workflows/ci.yml` avec un job `test` minimal (checkout + setup-python + pytest)
- **Étapes guidées** :
  1. `mkdir -p .github/workflows && touch .github/workflows/ci.yml`
  2. Coller le squelette fourni sur slide
  3. `git add . && git commit -m "ci: add minimal workflow" && git push`
  4. Ouvrir l'onglet Actions sur GitHub
- **Plan B si bloqué** : repo template prêt à fork avec un test cassé exprès, juste à corriger le YAML

### Exercice 2 : Ajouter une matrix (~5 min, après section 5)

- **Quoi faire** : modifier le workflow précédent pour tester sur Python 3.9 ET 3.10
- **Plan B si bloqué** : snippet matrix prêt à copier-coller depuis les slides

> **Pas de live demo formateur** — tout passe par les exercices que les apprenants font eux-mêmes.

---

## Q&A anticipées

1. **« Combien ça coûte vraiment pour un projet privé ? »**
   - Quota gratuit 2000 min/mois (compte free) suffit largement pour un projet de classe / perso ; au-delà ~$0.008/min Linux.

2. **« Pourquoi pas Jenkins / GitLab CI ? »**
   - GitHub Actions = intégration native, gratuit pour public, marketplace énorme. Jenkins/GitLab restent excellents pour des contextes self-hosted ou multi-cloud — c'est un choix d'écosystème.

3. **« Mon workflow ne se déclenche pas, pourquoi ? »**
   - Vérifier le chemin exact `.github/workflows/`, l'extension `.yml`, la branche dans `on.push.branches`, et l'indentation YAML (espaces, pas tabs).

4. **« Faut-il toujours `fail-fast: false` ? »**
   - Pour le développement / debug : oui, ça aide à voir tous les échecs. En production sur PR : `fail-fast: true` (défaut) est OK pour économiser des minutes.

5. **« Et le déploiement (CD) ? »**
   - Même structure (un job `deploy` avec `needs: [test, build]`), mais nécessite secrets et environnements — sujet d'une autre session.

6. **« YAML c'est pénible, des alternatives ? »**
   - GitHub n'accepte que YAML ; mais des outils comme `actionlint` détectent les erreurs avant push, et l'extension VS Code "GitHub Actions" donne autocomplétion + validation live.

---

## Choix de templates

- **Slide *Présentation*** depuis `decks/templates/slides.md` (slide #1) — placée après la cover
- **Slide *Let's build together*** (slide #2 du template) — utilisée comme slide finale CTA

---

## Outline des slides (~37 slides)

1. `[cover]` Titre — *CI/CD avec GitHub Actions* (background Unsplash `photo-1717386255777`)
2. `[two-cols-header]` Présentation Maxime Lenne (depuis template)
3. `[default]` Pourquoi cette session ? La douleur du dev qui automatise rien
4. `[section]` 1. CI/CD démystifié
5. `[default]` CI vs CD-Delivery vs CD-Deployment (3 colonnes / 3 cartes)
6. `[default]` GitHub Actions : le moteur dans GitHub
7. `[default]` Tarification : multiplicateurs runners (tableau)
8. `[default]` Le pipeline en 1 schéma (Mermaid)
9. `[section]` 2. Anatomie d'un workflow
10. `[default]` Hiérarchie Workflow → Jobs → Steps (Mermaid)
11. `[default]` Les 3 grandes parties (`name`, `on`, `jobs`) — code reveal 1/3
12. `[default]` Les déclencheurs `on:` (tableau push/pull_request/workflow_dispatch/schedule)
13. `[default]` Jobs : runners + parallélisme + `needs:`
14. `[default]` Steps : `uses` vs `run`
15. `[default]` Pièges YAML : indentation, espaces, multi-lignes `|`
16. `[section]` 3. Premier workflow Python
17. `[default]` Construction guidée (code progressif Shiki Magic Move)
18. `[default]` Workflow complet annoté
19. `[default]` Lecture des logs : succès vs échec (screenshot)
20. `[default]` Artifacts : récupérer les rapports de test
21. `[default]` 🛠️ **Exercice 1** : ton premier workflow CI (5 min)
22. `[section]` 4. Stratégie matrix
23. `[default]` Pourquoi tester sur plusieurs versions ? (la douleur du copier-coller)
24. `[two-cols]` Avant/après : 9 jobs dupliqués ↔ une matrix concise
25. `[default]` Le produit cartésien : 3 OS × 3 versions = 9 jobs (Mermaid + analogie menu)
26. `[default]` Exemple complet commenté : Python multi-OS × multi-versions
27. `[default]` `include` : ajouter ou enrichir des combinaisons (ex : shell par OS)
28. `[default]` `exclude` + `fail-fast` + `max-parallel` (tableau récap)
29. `[default]` 🛠️ **Exercice 2** : ajouter une matrix (5 min)
30. `[section]` 5. Sécurité : 3 réflexes
31. `[default]` SHA pinning, permissions minimales, secrets (3 cards)
32. `[default]` Les 5 règles d'or (slide récap mémorisable)
33. `[default]` Erreurs classiques (tableau erreur → symptôme → solution)
34. `[section]` 6. Récap & action
35. `[default]` Diagramme synthèse final (Mermaid)
36. `[default]` 🎯 CTA : ton 1er workflow avant la prochaine séance
37. `[end]` Let's build together (depuis template, QR LinkedIn)

---

*Plan créé le : 2026-04-29*
*Prêt pour génération de slides : [ ]* (à valider après revue par le formateur)
