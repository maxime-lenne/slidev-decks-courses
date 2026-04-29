# Docker - Plan de présentation

**Durée :** 2h45 (45min installation & concepts, 1h build avancé & cache, 1h Docker Compose)
**Audience :** Mixed technical (formation éducative, niveaux variés)
**Format :** Lecture/talk avec exercices pratiques intégrés
**Langue :** Français
**Thème :** maxime-lenne

---

## Message principal

> "Docker permet de construire, livrer et exécuter vos applications de manière reproductible, du laptop à la production — et Docker Compose orchestre le tout."

## Call to Action

Créer votre premier Dockerfile et votre premier docker-compose.yml pour conteneuriser une application multi-services.

---

## Sources utilisées

| Source | Description |
|--------|-------------|
| `pourquoi-docker.md` | Pourquoi Docker est incontournable : réseaux, routage, sécurité, monitoring, DNS, cloud, durcissement |
| `docker-install.md` | Guides d'installation Linux (Ubuntu/Debian) et Windows (Docker Desktop + WSL2) |
| `docker-base-concepts.md` | Images, conteneurs, Dockerfile, Registry, Volumes, Réseaux |
| `docker-cheat-sheet.md` | Référence complète des commandes Docker |
| `docker-compose.md` | Docker Compose : structure, commandes, variables d'environnement, sécurité, exemple FastAPI+PostgreSQL |
| `index.quizv.md` | 20 questions de quiz (facile/moyen/difficile) couvrant tous les sujets |
| Recherche web | Multi-stage builds, optimisation du cache, ARG vs ENV, .dockerignore avancé |

---

## Allocation du temps

| Section | Temps | Slides | Focus |
|---------|-------|--------|-------|
| 0. Couverture & Présentation | 5 min | 4 | Accueil, table des matières, présentation formateur |
| 1. Pourquoi Docker ? | 10 min | 4 | Contexte, problème résolu, métiers concernés |
| 2. Installation | 15 min | 5 | Linux, Windows/WSL2, vérification, dépannage |
| 3. Concepts fondamentaux | 15 min | 8 | Images, conteneurs, cycle de vie, commandes essentielles |
| **Pause / Questions** | 5 min | 1 | — |
| 4. Dockerfile & Build | 20 min | 7 | Instructions, bonnes pratiques, construction d'images |
| 5. Build avancé & Cache | 25 min | 8 | Multi-stage builds, optimisation cache, ARG/ENV, .dockerignore |
| 6. Registry, Volumes & Réseaux | 15 min | 6 | Docker Hub, registres privés, volumes nommés/bind mounts, réseaux |
| **Pause / Questions** | 5 min | 1 | — |
| 7. Docker Compose | 30 min | 10 | Structure YAML, commandes, env vars, cas pratique FastAPI+PostgreSQL |
| 8. Sécurité & Bonnes pratiques | 10 min | 4 | Non-root, secrets, ports, ressources, scan d'images |
| 9. Conclusion & What's Next | 10 min | 5 | Récapitulatif, CI/CD, Kubernetes, ressources |
| **Total** | **~2h45** | **~63** | |

---

## Section 0 : Couverture & Présentation (5 min, ~4 slides)

### Slides

1. [cover] Slide titre — "Docker" avec background Unsplash (conteneurs maritimes)
2. [default] Prérequis & Objectifs
3. [default] Table des matières (style LangChain avec numérotation 01-09 et liens)
4. [src] Slide présentation formateur (template)

### Source

- Template `decks/templates/slides.md#1`

---

## Section 1 : Pourquoi Docker ? (10 min, ~4 slides)

### Points clés

- Le problème du "ça marche sur ma machine"
- Conteneurs vs machines virtuelles (schéma comparatif)
- Pourquoi Docker est incontournable quel que soit le métier dev
- L'écosystème Docker (Engine, CLI, Desktop, Hub, Compose)

### Visuels nécessaires

- [ ] Diagramme : VM vs Conteneurs (architecture comparée)
- [ ] Diagramme : écosystème Docker (mindmap ou flowchart)

### Notes présentateur

- Ancrer le "pourquoi" avant le "comment" — donner du sens
- Mentionner les différents profils concernés (backend, data, devops, frontend)

### Source

- `pourquoi-docker.md`

---

## Section 2 : Installation (15 min, ~5 slides)

### Points clés

- Installation Linux (Ubuntu/Debian) : dépôt APT, clé GPG, paquets
- Installation Windows : Docker Desktop + WSL2
- Vérification : `docker version`, `docker info`, `docker run hello-world`
- Droits d'accès : groupe docker (Linux), intégration WSL (Windows)
- Dépannage courant : permissions, conflits de ports, service inactif

### Visuels nécessaires

- [ ] Code : commandes d'installation Linux (étapes clés)
- [ ] Code : commandes PowerShell pour WSL2
- [ ] Code : commandes de vérification

### Notes présentateur

- Les apprenants suivent en même temps sur leur machine
- Prévoir du temps pour les problèmes d'installation

### Source

- `docker-install.md`

---

## Section 3 : Concepts fondamentaux (15 min, ~8 slides)

### Points clés

- **Images** : couches en lecture seule, Union File System, images officielles vs communautaires
- **Conteneurs** : instance d'une image, couche lecture/écriture, isolation (namespaces, cgroups)
- **Cycle de vie** : create → start → stop → rm
- **Commandes essentielles** : `docker run`, `docker ps`, `docker stop`, `docker rm`, `docker exec`, `docker logs`
- Options courantes de `docker run` : `-d`, `-p`, `-v`, `--name`, `--env`
- Conteneurs éphémères : les données disparaissent sans volume

### Visuels nécessaires

- [ ] Diagramme : système de couches (layers) d'une image Docker
- [ ] Diagramme : cycle de vie d'un conteneur (flowchart)
- [ ] Code : commandes essentielles avec exemples concrets

### Notes présentateur

- Insister sur la nature éphémère des conteneurs — concept fondamental
- Démontrer `docker run -it ubuntu bash` pour montrer l'isolation

### Source

- `docker-base-concepts.md` (sections 1-2)
- `docker-cheat-sheet.md` (sections 1-2)

---

## Slide de pause / Questions (1 slide)

---

## Section 4 : Dockerfile & Build (20 min, ~7 slides)

### Points clés

- Qu'est-ce qu'un Dockerfile ? Fichier texte → image personnalisée
- Instructions principales : `FROM`, `RUN`, `COPY`, `WORKDIR`, `ENV`, `EXPOSE`, `CMD`, `ENTRYPOINT`
- Différence `CMD` vs `ENTRYPOINT`
- Différence `COPY` vs `ADD`
- Construction : `docker build -t mon_app:1.0 .`
- Bonnes pratiques : minimiser les couches, combiner `RUN`, nettoyer les caches

### Visuels nécessaires

- [ ] Code : Dockerfile exemple simple (app Python ou Node)
- [ ] Code : `docker build` et vérification
- [ ] Diagramme : instructions Dockerfile → couches image

### Notes présentateur

- Faire écrire un premier Dockerfile simple aux apprenants
- Montrer l'impact de chaque instruction sur les couches

### Source

- `docker-base-concepts.md` (section 3)
- `docker-cheat-sheet.md` (section 1)

---

## Section 5 : Build avancé & Cache (25 min, ~8 slides)

### Points clés

- **Optimisation du cache** : l'ordre des instructions compte !
  - Cache séquentiel : si une couche est invalidée, toutes les suivantes le sont aussi
  - Pattern "dépendances d'abord" : copier les fichiers de dépendances avant le code source
  - Réduction de 80-90% du temps de build
- **Multi-stage builds** :
  - Séparer l'étape de build de l'étape de runtime
  - `FROM ... AS builder` → `COPY --from=builder`
  - Réduction de 80%+ de la taille de l'image
  - Stages nommés pour la lisibilité
- **ARG vs ENV** :
  - `ARG` = build-time only (pas dans l'image finale)
  - `ENV` = runtime (persiste dans le conteneur)
  - Ne jamais mettre de secrets dans `ARG` (visible dans `docker history`)
- **.dockerignore** :
  - Exclure `node_modules`, `.git`, `.env`, logs, etc.
  - Améliore la performance du build context
  - Évite la fuite de fichiers sensibles

### Visuels nécessaires

- [ ] Diagramme : cache séquentiel (avant/après optimisation)
- [ ] Code : Dockerfile AVANT optimisation cache vs APRÈS
- [ ] Code : Multi-stage build complet (Node.js ou Python)
- [ ] Code : fichier .dockerignore typique
- [ ] Diagramme : multi-stage build (2 stages → image finale)

### Notes présentateur

- Montrer un build sans cache puis avec cache pour voir la différence de temps
- Le multi-stage build est un concept avancé mais essentiel — prendre le temps

### Source

- Recherche web : multi-stage builds, cache optimization, ARG vs ENV
- `docker-base-concepts.md` (section 3 — bonnes pratiques)

---

## Section 6 : Registry, Volumes & Réseaux (15 min, ~6 slides)

### Points clés

- **Docker Registry** : Docker Hub, registres privés (ECR, GCR, ACR, registry:2)
- **Tags et versions** : `docker tag`, `docker push`, `docker pull`
- **Volumes** : volumes nommés vs bind mounts, persistance des données
- **Réseaux** : bridge, host, none, overlay — communication par nom DNS

### Visuels nécessaires

- [ ] Diagramme : flux push/pull vers un registry
- [ ] Code : commandes tag/push/pull
- [ ] Diagramme : volumes nommés vs bind mounts
- [ ] Code : commandes réseau et communication inter-conteneurs

### Notes présentateur

- Insister sur : "sans volume, les données disparaissent" (exemple PostgreSQL)
- Montrer la résolution DNS entre conteneurs sur un réseau nommé

### Source

- `docker-base-concepts.md` (sections 4-6)
- `docker-cheat-sheet.md` (sections 3-4)

---

## Slide de pause / Questions (1 slide)

---

## Section 7 : Docker Compose (30 min, ~10 slides)

### Points clés

- **Pourquoi Compose ?** Gérer plusieurs conteneurs devient vite ingérable avec `docker run`
- **Installation** : inclus par défaut depuis Docker v20+ (`docker compose` et non `docker-compose`)
- **Structure docker-compose.yml** : services, volumes, networks
- **Commandes** : `up -d`, `down`, `logs -f`, `ps`, `build`, `restart`
- **Variables d'environnement** : `.env`, `${VAR}`, `env_file`
- **Cas pratique** : API FastAPI + PostgreSQL
  - Dockerfile pour l'API
  - docker-compose.yml avec services, volumes, networks
  - `depends_on` pour l'ordre de démarrage
- **Rebuild** : `--build`, `build --no-cache`, `down -v`, `down --rmi all`

### Visuels nécessaires

- [ ] Diagramme : architecture multi-services (API + DB + réseau + volume)
- [ ] Code : docker-compose.yml minimal (nginx + postgres)
- [ ] Code : docker-compose.yml complet (FastAPI + PostgreSQL)
- [ ] Code : fichier .env et référencement des variables
- [ ] Code : commandes Compose essentielles

### Notes présentateur

- C'est la section la plus pratique — les apprenants créent leur propre docker-compose.yml
- Montrer le cas pratique FastAPI+PostgreSQL en entier
- Expliquer la communication par nom de service (DNS interne)

### Source

- `docker-compose.md` (sections 1-7)
- `docker-cheat-sheet.md` (section 5)

---

## Section 8 : Sécurité & Bonnes pratiques (10 min, ~4 slides)

### Points clés

- Utiliser des images officielles vérifiées
- Ne pas exécuter en root : `USER appuser` dans le Dockerfile
- Fichier `.env` + `.gitignore` pour les secrets
- Ne pas exposer les ports inutiles (ex: ne pas publier 5432 pour PostgreSQL)
- Réseaux personnalisés pour isoler les services
- Limiter les ressources : `cpus`, `memory` dans deploy
- Scanner les images : `docker scan`, `trivy`

### Visuels nécessaires

- [ ] Code : Dockerfile sécurisé (user non-root, COPY --chown)
- [ ] Code : docker-compose.yml avec réseaux isolés et limites de ressources

### Notes présentateur

- "La sécurité n'est pas optionnelle, même en développement"
- Mentionner les outils de scan d'images

### Source

- `docker-compose.md` (section 8)
- `pourquoi-docker.md` (sections sécurité et durcissement)

---

## Section 9 : Conclusion & What's Next (10 min, ~5 slides)

### Points clés

- Récapitulatif : mindmap des concepts couverts
- Cheat sheet : commandes essentielles (référence rapide)
- **What's Next** :
  - Build & deploy avec CI/CD (GitHub Actions, GitLab CI)
  - Kubernetes (orchestration à grande échelle)
  - Docker Swarm (orchestration simple)
- Ressources pour aller plus loin
- Slide de fin (template) avec QR code et contacts

### Visuels nécessaires

- [ ] Diagramme : mindmap récapitulative Docker
- [ ] Slide : "What's Next" avec CI/CD et Kubernetes

### Notes présentateur

- Laisser le cheat sheet visible / partageable
- Le "What's Next" ouvre des perspectives sans entrer dans le détail

### Source

- `docker-cheat-sheet.md`
- Template `decks/templates/slides.md#2`

---

## Diagrammes à créer

1. **VM vs Conteneurs** - Comprendre la différence architecturale
   - Type : Mermaid flowchart (2 colonnes)
   - Éléments : Hardware → OS → Hypervisor → Guest OS vs Hardware → OS → Docker Engine → Containers

2. **Système de couches (Layers)** - Comprendre l'immuabilité des images
   - Type : Mermaid flowchart vertical
   - Éléments : FROM ubuntu → RUN apt-get → COPY app → CMD (couches empilées)

3. **Cycle de vie d'un conteneur** - Maîtriser les transitions d'état
   - Type : Mermaid state diagram
   - Éléments : Created → Running → Paused → Stopped → Removed

4. **Cache séquentiel** - Pourquoi l'ordre des instructions compte
   - Type : Mermaid flowchart (avant/après)
   - Éléments : Instructions avec cache hit/miss, point d'invalidation

5. **Multi-stage build** - Séparer build et runtime
   - Type : Mermaid flowchart
   - Éléments : Stage 1 (builder) → COPY --from=builder → Stage 2 (runtime, image finale légère)

6. **Architecture multi-services** - Docker Compose en action
   - Type : Mermaid flowchart
   - Éléments : Client → Nginx → API → PostgreSQL, avec réseau et volume

7. **Mindmap récapitulative** - Vue d'ensemble de Docker
   - Type : Mermaid mindmap
   - Éléments : Docker → Images, Conteneurs, Dockerfile, Registry, Volumes, Réseaux, Compose

---

## Exemples de code à inclure

1. **Installation Linux** (bash)
   - But : montrer les étapes clés d'installation
   - Lignes à mettre en avant : `apt-get install docker-ce`, `docker run hello-world`
   - Révélation progressive : oui
   - Source : `docker-install.md`

2. **Commandes essentielles** (bash)
   - But : référence rapide des commandes de base
   - Lignes à mettre en avant : `docker run -d -p --name`, `docker ps`, `docker exec -it`
   - Révélation progressive : non
   - Source : `docker-cheat-sheet.md`

3. **Dockerfile simple** (dockerfile)
   - But : premier Dockerfile (app Python)
   - Lignes à mettre en avant : `FROM`, `COPY`, `RUN`, `CMD`
   - Révélation progressive : oui
   - Source : original (basé sur `docker-base-concepts.md`)

4. **Cache non-optimisé vs optimisé** (dockerfile)
   - But : montrer l'impact de l'ordre des instructions
   - Lignes à mettre en avant : placement de `COPY` vs `COPY package*.json`
   - Révélation progressive : oui (avant/après)
   - Source : recherche web

5. **Multi-stage build** (dockerfile)
   - But : image de production légère
   - Lignes à mettre en avant : `FROM ... AS builder`, `COPY --from=builder`
   - Révélation progressive : oui
   - Source : recherche web

6. **docker-compose.yml minimal** (yaml)
   - But : structure de base Compose
   - Lignes à mettre en avant : `services`, `image`, `ports`, `volumes`
   - Révélation progressive : oui
   - Source : `docker-compose.md`

7. **docker-compose.yml complet** (yaml)
   - But : cas pratique FastAPI + PostgreSQL
   - Lignes à mettre en avant : `build`, `depends_on`, `networks`, `env_file`
   - Révélation progressive : oui
   - Source : `docker-compose.md` (section 6)

8. **Dockerfile sécurisé** (dockerfile)
   - But : bonnes pratiques de sécurité
   - Lignes à mettre en avant : `RUN useradd`, `USER appuser`, `COPY --chown`
   - Révélation progressive : non
   - Source : `docker-compose.md` (section 8)

---

## Plan de démo (optionnel, préparé)

### Démo 1 : Premier conteneur

- Quoi montrer : `docker run hello-world` puis `docker run -it ubuntu bash`
- Commandes : `docker run hello-world`, `docker run -it ubuntu bash`, `ls`, `exit`, `docker ps -a`
- Fallback : screenshot du terminal

### Démo 2 : Build & cache

- Quoi montrer : build d'un Dockerfile, modification d'un fichier, rebuild avec cache
- Commandes : `docker build -t demo:1 .`, modifier un fichier, `docker build -t demo:2 .` (observer les couches cached)
- Fallback : screenshot montrant les logs de build avec "CACHED"

### Démo 3 : Docker Compose

- Quoi montrer : `docker compose up -d` avec FastAPI + PostgreSQL
- Commandes : `docker compose up -d`, `docker compose ps`, `docker compose logs -f`, `curl localhost:8000`, `docker compose down -v`
- Fallback : screenshot de l'API fonctionnelle + `docker compose ps`

---

## Q&A potentielles

1. **"Quelle est la différence entre Docker et une machine virtuelle ?"**
   - Réponse : Docker partage le noyau de l'hôte et isole via namespaces/cgroups. Une VM virtualise tout le hardware et a son propre OS. Docker est plus léger et rapide, mais moins isolé.

2. **"Pourquoi ne pas utiliser `docker-compose` (avec tiret) ?"**
   - Réponse : `docker-compose` (V1, Python) est déprécié. `docker compose` (V2, Go) est le plugin officiel intégré depuis Docker v20+.

3. **"Est-ce que Docker fonctionne sur Mac ?"**
   - Réponse : Oui, via Docker Desktop qui utilise une VM Linux légère (HyperKit ou Apple Virtualization). L'installation est similaire à Windows.

4. **"Faut-il toujours utiliser des volumes nommés ?"**
   - Réponse : Pour les données persistantes (BDD), oui. Pour le développement local (hot-reload), les bind mounts sont plus pratiques.

5. **"Comment déployer en production ?"**
   - Réponse : C'est le "What's Next" — CI/CD pour build & push, puis Kubernetes ou Docker Swarm pour l'orchestration.

---

## Choix du template

- Template utilisé : `decks/templates/slides.md`
- Slides sélectionnés :
  - `#1` — Slide présentation formateur (après la table des matières)
  - `#2` — Slide de fin (call to action + QR LinkedIn)

---

## Annexe : Plan des slides

1. [cover] Slide titre — background: https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?w=1920
2. [two-cols-header] Prérequis & Objectifs
3. [default] Table des matières (style numéroté 01-09 avec liens)
4. [src] Présentation formateur (template #1)
5. [section] Pourquoi Docker ?
6. [default] Le problème : "ça marche sur ma machine"
7. [two-cols-header] VM vs Conteneurs
8. [default] L'écosystème Docker
9. [section] Installation
10. [default] Installation Linux (Ubuntu/Debian)
11. [default] Installation Windows (Docker Desktop + WSL2)
12. [default] Vérification & premiers pas
13. [default] Droits d'accès & dépannage
14. [section] Concepts fondamentaux
15. [default] Les images Docker (layers, Union FS)
16. [default] Diagramme : système de couches
17. [default] Les conteneurs (instance, isolation, éphémère)
18. [default] Cycle de vie d'un conteneur
19. [default] Commandes essentielles (run, ps, stop, rm)
20. [default] Options de docker run (-d, -p, -v, --name, --env)
21. [default] docker exec & docker logs
22. [center] Pause / Questions
23. [section] Dockerfile & Build
24. [default] Qu'est-ce qu'un Dockerfile ?
25. [default] Instructions principales (FROM, RUN, COPY, WORKDIR)
26. [default] ENV, EXPOSE, CMD, ENTRYPOINT
27. [two-cols-header] CMD vs ENTRYPOINT
28. [default] Construction : docker build
29. [default] Bonnes pratiques Dockerfile
30. [section] Build avancé & Cache
31. [default] Comment fonctionne le cache Docker
32. [two-cols-header] Cache : avant vs après optimisation
33. [default] Pattern "dépendances d'abord"
34. [default] Multi-stage builds : concept
35. [default] Multi-stage builds : exemple complet
36. [two-cols-header] ARG vs ENV
37. [default] .dockerignore
38. [section] Registry, Volumes & Réseaux
39. [default] Docker Hub & registres privés
40. [default] Tags, push & pull
41. [two-cols-header] Volumes nommés vs Bind mounts
42. [default] Réseaux Docker (bridge, host, overlay)
43. [default] Communication inter-conteneurs par DNS
44. [center] Pause / Questions
45. [section] Docker Compose
46. [default] Pourquoi Docker Compose ?
47. [default] Structure docker-compose.yml
48. [default] Exemple minimal : nginx + postgres
49. [default] Commandes Compose essentielles
50. [default] Variables d'environnement & .env
51. [default] Cas pratique : FastAPI + PostgreSQL (architecture)
52. [default] Cas pratique : Dockerfile API
53. [default] Cas pratique : docker-compose.yml complet
54. [default] Rebuild & nettoyage
55. [section] Sécurité & Bonnes pratiques
56. [default] Images officielles & non-root
57. [default] Secrets, ports & réseaux isolés
58. [default] Limiter les ressources & scanner les images
59. [section] Conclusion & What's Next
60. [default] Mindmap récapitulative Docker
61. [default] Cheat sheet : commandes essentielles
62. [default] What's Next : CI/CD, Kubernetes
63. [default] Ressources pour aller plus loin
64. [src] Slide de fin (template #2)

---

_Plan créé : 2026-04-27_
_Prêt pour la génération des slides : [ ]_
