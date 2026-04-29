https://www.notion.so/maxime-lenne/Les-bases-du-CI-CD-e5c932712dfb838c8d1081f25f655bbe?source=copy_link
https://www.notion.so/maxime-lenne/Docker-Continious-Deployment-6b7932712dfb8381a73f018f7183c760?source=copy_link

### Rappel sur le déploiement continu (CD)

Avant de plonger dans la manière dont Docker facilite le déploiement continu, rappelons brièvement ce qu'est le Déploiement Continu (Continuous Deployment - CD).

Comme nous l'avons vu dans le premier chapitre, le Déploiement Continu est une extension de l'Intégration Continue (CI) et de la Livraison Continue (Continuous Delivery).

- **Intégration Continue (CI)** : Vous intégrez fréquemment votre code, et chaque intégration déclenche un build et des tests automatisés.
- **Livraison Continue (Continuous Delivery)** : Si la phase CI est réussie, votre application est automatiquement préparée pour être livrée (par exemple, un artefact est construit et stocké). Le déploiement effectif en production nécessite alors une approbation manuelle.
- **Déploiement Continu (Continuous Deployment)** : C'est l'étape ultime. Si toutes les étapes précédentes (CI et tests de la phase de livraison) sont réussies, la nouvelle version de l'application est **automatiquement déployée en production** sans intervention humaine.

**Le rôle du Déploiement Continu est de :**

1. **Réduire le délai de mise en production** : Les nouvelles fonctionnalités, les corrections de bugs et les améliorations parviennent aux utilisateurs finaux beaucoup plus rapidement.
2. **Diminuer les risques** : En déployant de petits changements fréquemment, le risque associé à chaque déploiement est plus faible. Si un problème survient, il est plus facile à identifier et à corriger car il est lié à un petit ensemble de modifications.
3. **Augmenter la fiabilité** : Le processus de déploiement étant automatisé et testé, il est moins sujet aux erreurs humaines.
4. **Améliorer la productivité des développeurs** : Les développeurs peuvent se concentrer sur la création de valeur plutôt que sur les aspects manuels et stressants du déploiement.
5. **Obtenir un feedback plus rapide** : En mettant rapidement les fonctionnalités entre les mains des utilisateurs, vous obtenez plus vite des retours, ce qui peut orienter les développements futurs.

**Prérequis pour le Déploiement Continu :**

Le Déploiement Continu n'est pas une solution miracle et nécessite une fondation solide :

- **Une suite de tests automatisés très complète et fiable** : C'est la pierre angulaire. Vous devez avoir une grande confiance dans vos tests pour autoriser des déploiements automatiques en production.
- **Un pipeline CI/CD robuste** : Le processus d'intégration, de test et de packaging doit être bien huilé.
- **Des mécanismes de surveillance (monitoring) et d'alerte en production** : Pour détecter rapidement tout problème après un déploiement.
- **Des stratégies de rollback rapides et fiables** : Pour pouvoir revenir rapidement à une version précédente stable en cas de problème.

Docker joue un rôle crucial dans la mise en œuvre du Déploiement Continu en fournissant un moyen standardisé et fiable de packager et d'exécuter des applications.

### Packaging de l'application en image Docker

Docker simplifie considérablement le processus de packaging d'une application et de ses dépendances en une unité portable et standardisée : une **image Docker**. Cette image contient tout ce dont votre application a besoin pour s'exécuter : le code, le runtime (par exemple, l'interpréteur Python), les bibliothèques système, les dépendances de l'application, et les configurations.

**Pourquoi packager avec Docker pour le déploiement ?**

1. **Cohérence des environnements** :

- "Ça marche sur ma machine !" est un problème que Docker aide à résoudre. Une image Docker s'exécutera de la même manière sur la machine d'un développeur, sur un serveur de test, et en production, car elle embarque son propre environnement.
1. **Isolation** :

- Les conteneurs Docker isolent les applications les unes des autres et du système hôte. Cela évite les conflits de dépendances entre applications.
1. **Portabilité** :

- Une image Docker construite sur une machine peut être exécutée sur n'importe quelle autre machine où Docker est installé (Linux, Windows, macOS, cloud), sans se soucier des différences d'environnement sous-jacent.
1. **Reproductibilité** :

- Le `Dockerfile` qui définit comment construire l'image est versionné avec votre code. Cela garantit que vous pouvez reconstruire exactement la même image à tout moment.
1. **Déploiements simplifiés et standardisés** :

- Au lieu de devoir installer manuellement des runtimes, des bibliothèques et de configurer des serveurs, vous déployez simplement une image. Le processus de démarrage d'une application devient une simple commande `docker run` (ou son équivalent dans un orchestrateur comme Kubernetes).
1. **Scalabilité** :

- Il est facile de démarrer plusieurs instances (conteneurs) de la même image pour gérer une charge croissante.

**Le `Dockerfile` pour la production :**

Le `Dockerfile` que vous utilisez pour créer une image destinée à la production est souvent optimisé différemment de celui utilisé pour les tests. Les priorités pour une image de production sont généralement :

- **Taille minimale** : Pour réduire les temps de transfert et l'utilisation des ressources.
- **Sécurité** : Inclure uniquement ce qui est strictement nécessaire pour exécuter l'application, réduire la surface d'attaque, utiliser des utilisateurs non-root.
- **Efficacité au démarrage**.

Voici un exemple de `Dockerfile` optimisé pour une application Python de production, utilisant potentiellement un **multi-stage build** pour réduire la taille :

```yaml
# --- Étape 1: Builder (optionnel, mais bon pour la propreté) ---
# Cette étape peut être utilisée pour compiler des assets, installer des dépendances de build, etc.
# Pour une application Python simple, elle peut ressembler à ceci si on veut séparer les concerns.
FROM python:3.9-slim AS builder
WORKDIR /app

COPY requirements.txt ./
# Installer les dépendances dans un répertoire spécifique pour les copier plus tard,
# ou simplement les installer classiquement.
# Pour cet exemple, nous les installons classiquement et l'étape 'app' fera de même
# pour garantir que seuls les paquets de prod sont là.
RUN pip install --no-cache-dir --user -r requirements.txt # --user peut aider si on n'est pas root

COPY src/ ./src/
# Si vous avez des étapes de build (ex: frontend assets, compilation de code)
# RUN ... commandes de build ...

# --- Étape 2: Application finale (Production) ---
# Utiliser une image de base la plus petite possible et sécurisée
FROM python:3.9-slim AS app
WORKDIR /app

# Créer un utilisateur non-root pour exécuter l'application (meilleure pratique de sécurité)
RUN groupadd -r appuser && useradd --no-log-init -r -g appuser appuser

# Copier uniquement les dépendances de production
COPY requirements.txt ./
# Installer les dépendances de production proprement
# L'utilisation de virtualenvs dans Docker est moins courante,
# car le conteneur lui-même offre l'isolation.
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application.
# Si vous avez utilisé --from=builder pour des assets compilés, ce serait ici.
COPY src/ ./src/

# Changer le propriétaire des fichiers pour l'utilisateur non-root
RUN chown -R appuser:appuser /app
USER appuser

# Exposer le port sur lequel l'application écoute (si c'est une application web)
EXPOSE 8000

# Commande pour démarrer l'application
# Pour une application Django/Flask, ce serait gunicorn, uwsgi, ou la commande de dev pour des tests.
# Exemple pour une application simple:
CMD ["python", "src/main.py"]
# Exemple pour Gunicorn avec Flask (supposons que main:app est votre instance Flask):
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "main:app"]

```

**Points clés de ce `Dockerfile` de production :**

- **Image de base `slim`** : Plus petite que les images par défaut.
- **Utilisateur non-root (`appuser`)** : Améliore la sécurité en évitant d'exécuter l'application en tant que root dans le conteneur.
- **`COPY` sélectif** : On ne copie que ce qui est nécessaire. Si l'étape `builder` avait produit des artefacts compilés, on les copierait avec `COPY --from=builder ...`.
- **`EXPOSE`** : Documente le port que l'application utilise à l'intérieur du conteneur. Notez que cela ne publie pas le port sur l'hôte ; cela se fait avec `docker run -p <port_hote>:<port_conteneur>`.
- **`CMD`** : Définit la commande par défaut pour lancer votre application.

Une fois ce `Dockerfile` créé, le processus de packaging de votre application consiste simplement à exécuter :
`docker build -t mon-application:v1.0 .`

Cette commande crée une image nommée `mon-application` avec le tag `v1.0` (il est crucial de bien gérer le versioning de vos images). Cette image est maintenant prête à être poussée vers un registre d'images et déployée.

### Intégration du build Docker dans le pipeline CI

Une fois que vous avez un `Dockerfile` pour packager votre application (que ce soit pour les tests ou pour la production), l'étape suivante logique est d'automatiser la construction de cette image Docker à chaque fois que des modifications pertinentes sont apportées à votre code ou à votre `Dockerfile`. C'est là qu'intervient l'intégration du build Docker dans votre pipeline d'Intégration Continue (CI).

**Pourquoi intégrer le build Docker dans le CI ?**

1. **Automatisation** : Plus besoin de construire manuellement les images. Le pipeline s'en charge.
2. **Cohérence** : Chaque build Docker est effectué de la même manière, en utilisant les mêmes outils et configurations, garantissant la reproductibilité.
3. **Validation précoce** : Si votre `Dockerfile` contient une erreur ou si des dépendances ne peuvent pas être installées, le pipeline CI échouera rapidement, vous alertant du problème.
4. **Artefact prêt pour les étapes suivantes** : L'image Docker construite devient un artefact clé qui peut être utilisé pour :

- Exécuter des tests d'intégration ou des tests end-to-end dans un environnement conteneurisé.
- Être poussée vers un registre d'images (comme Docker Hub, GitLab Container Registry, AWS ECR, Google GCR) pour le stockage et le versioning.
- Être déployée dans des environnements de staging ou de production.
1. **Versioning des images** : Le pipeline CI peut automatiquement taguer les images Docker avec des informations pertinentes (par exemple, le hash du commit Git, le numéro de version, le nom de la branche).

**Étapes typiques dans le pipeline CI pour le build Docker :**

1. **Déclenchement** : Généralement après la réussite des tests unitaires et des tests de qualité du code (linting).
2. **Connexion à un service Docker** : L'agent CI (runner) doit avoir accès à un démon Docker pour pouvoir exécuter des commandes `docker`.

- **GitHub Actions** : Utilise souvent des actions comme `docker/setup-buildx-action` ou `docker/setup-qemu-action` (pour le multi-plateforme) et `docker/login-action` pour se connecter à un registre.
- **GitLab CI** : Peut utiliser un service `docker:dind` (Docker-in-Docker) ou s'exécuter sur un runner qui a déjà Docker installé.
1. **Construction de l'image (`docker build`)** :

- La commande `docker build` est exécutée, en utilisant le `Dockerfile` de votre projet.
- Il est crucial de bien taguer l'image. Un schéma de tagging courant inclut :
  - Le nom du registre (si applicable) : `registry.example.com/mon-app`
  - Le nom de l'image : `mon-app`
  - Un tag de version :
    - `latest` (souvent utilisé, mais à manier avec précaution en production).
    - Le hash du commit Git (`git rev-parse --short HEAD`).
    - Un numéro de version sémantique (par exemple, `v1.2.3`).
    - Le nom de la branche (pour les builds de développement).
- Exemple de commande : `docker build -t registry.gitlab.com/mon-groupe/mon-projet:${CI_COMMIT_SHORT_SHA} -t registry.gitlab.com/mon-groupe/mon-projet:latest .` (exemple GitLab CI)
1. **(Optionnel) Test de l'image construite** :

- Après le build, vous pouvez lancer un conteneur à partir de l'image fraîchement construite et effectuer des tests "smoke" ou des vérifications de base pour s'assurer qu'elle démarre correctement et que l'application est accessible.
1. **Poussée de l'image vers un registre (`docker push`)** :

- Si le build (et les tests optionnels sur l'image) réussit, l'image est poussée vers un registre d'images centralisé.
- Cela nécessite une authentification préalable auprès du registre.
- Exemple de commande : `docker push registry.gitlab.com/mon-groupe/mon-projet:${CI_COMMIT_SHORT_SHA}`
- `docker push registry.gitlab.com/mon-groupe/mon-projet:latest`

**Exemple avec GitHub Actions :**

```yaml
# .github/workflows/docker-ci.yml
name: Docker Build and Push

on:
  push:
    branches: [ main ] # Déclencher sur push vers la branche main
    # Vous pouvez ajouter d'autres déclencheurs (pull_request, tags)

jobs:
  build-and-push-docker-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write # Nécessaire pour pousser vers GitHub Container Registry (ghcr.io)

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up QEMU (for multi-platform builds, optional)
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx (builder instance)
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }} # L'utilisateur qui a déclenché le workflow
          password: ${{ secrets.GITHUB_TOKEN }} # Token généré automatiquement par GitHub Actions

      - name: Extract metadata (tags, labels) for Docker
        id: meta # Donne un ID à cette étape pour référencer ses sorties
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/mon-application # ex: ghcr.io/mon-user/mon-repo
          # Options de tagging:
          # type=schedule (pour les cron)
          # type=ref,event=branch
          # type=ref,event=pr
          # type=semver,pattern={{version}} (si vous utilisez des tags Git sémantiques)
          # type=sha (tag avec le hash du commit court)
          tags: |
            type=sha,prefix=
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: . # Le contexte de build (où se trouve le Dockerfile)
          file: ./Dockerfile # Chemin vers votre Dockerfile
          push: true # Pousser l'image après le build
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha # Utiliser le cache Docker de GitHub Actions
          cache-to: type=gha,mode=max

```

**Explication (GitHub Actions) :**

- `docker/setup-qemu-action` et `docker/setup-buildx-action` : Prépare l'environnement pour des builds Docker avancés.
- `docker/login-action` : Se connecte à un registre (ici, GitHub Container Registry - `ghcr.io`). Vous auriez besoin de configurer des secrets pour d'autres registres.
- `docker/metadata-action` : Une action très utile pour générer automatiquement des tags et des labels pour votre image Docker en fonction des événements Git (branche, tag, SHA du commit).
- `docker/build-push-action` : L'action principale qui construit l'image et la pousse.
  - `context` et `file` pointent vers votre `Dockerfile`.
  - `push: true` indique de pousser l'image.
  - `tags` et `labels` utilisent les métadonnées générées.
  - `cache-from` et `cache-to` configurent l'utilisation du cache Docker fourni par GitHub Actions pour accélérer les builds.

**Exemple avec GitLab CI :**

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build_docker
  # ... autres stages comme deploy ...

# Supposons une image de base qui a Docker client, ou utilisation de Docker-in-Docker
# Pour cet exemple, nous supposons un runner avec Docker installé ou DIND.
# La variable $CI_REGISTRY_IMAGE est fournie par GitLab (ex: registry.gitlab.com/votre_groupe/votre_projet)
# $CI_COMMIT_SHORT_SHA est le hash court du commit.
# $CI_REGISTRY_USER et $CI_REGISTRY_PASSWORD (ou $CI_JOB_TOKEN) sont pour l'authentification.

build_app_image:
  stage: build_docker
  image: docker:20.10 # Utilise une image Docker pour exécuter les commandes docker
  services:
    - docker:20.10-dind # Docker-in-Docker service pour que le démon Docker soit disponible
  variables:
    IMAGE_TAG_COMMIT: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
    IMAGE_TAG_LATEST: $CI_REGISTRY_IMAGE:latest
    DOCKER_TLS_CERTDIR: "/certs" # Requis pour DIND
  before_script:
    # Connexion au registre de conteneurs GitLab
    # $CI_JOB_TOKEN est plus sécurisé et a une portée limitée au job.
    - docker login -u $CI_REGISTRY_USER -p $CI_JOB_TOKEN $CI_REGISTRY
    # Ou pour Docker Hub:
    # - echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin
  script:
    - echo "Building Docker image..."
    - docker build -t $IMAGE_TAG_COMMIT -t $IMAGE_TAG_LATEST .
    - echo "Pushing Docker image to registry..."
    - docker push $IMAGE_TAG_COMMIT
    - docker push $IMAGE_TAG_LATEST
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"' # Construire et pousser uniquement pour la branche main

```

**Explication (GitLab CI) :**

- `image: docker:20.10` et `services: - docker:20.10-dind` : Met en place un environnement où les commandes `docker build` et `docker push` peuvent être exécutées.
- `variables` : Définit les tags d'image en utilisant les variables prédéfinies de GitLab CI.
- `before_script` : Gère la connexion au registre de conteneurs de GitLab (ou un autre registre). `CI_JOB_TOKEN` est recommandé pour GitLab.
- `script` : Exécute `docker build` et `docker push`.
- `rules` : Contrôle quand ce job s'exécute (par exemple, uniquement sur la branche `main`).

En intégrant le build Docker dans votre pipeline CI, vous vous assurez que chaque version de votre code qui passe les tests est automatiquement transformée en un artefact déployable standardisé, prêt pour les prochaines étapes de votre cycle de livraison ou de déploiement.

### Déploiement de conteneurs Docker (concepts généraux)

Une fois que votre application est packagée dans une image Docker et que cette image est stockée dans un registre, l'étape suivante est de la déployer, c'est-à-dire d'exécuter un ou plusieurs conteneurs à partir de cette image dans un environnement cible (staging, production). Le déploiement continu (CD) avec Docker vise à automatiser ce processus.

Voici les concepts généraux impliqués dans le déploiement de conteneurs Docker :

1. **Registre d'Images (Image Registry)** :

- C'est le lieu centralisé où vos images Docker versionnées sont stockées (par exemple, Docker Hub, GitLab Container Registry, Amazon ECR, Google GCR, Azure CR).
- Votre environnement de déploiement doit avoir accès à ce registre pour pouvoir télécharger (pull) les images.
1. **Hôte(s) de Déploiement (Deployment Host(s))** :

- Ce sont les serveurs (machines virtuelles, serveurs physiques) où Docker est installé et où vos conteneurs s'exécuteront.
- Cela peut aller d'un simple serveur unique à un cluster de plusieurs machines géré par un orchestrateur.
1. **Processus de Déploiement** :
   Le processus de base pour déployer une nouvelle version d'une application conteneurisée implique généralement :

- **Arrêter et supprimer l'ancien conteneur** (si une version précédente est en cours d'exécution).
- **Télécharger (pull) la nouvelle image Docker** depuis le registre.
- **Démarrer (run) un nouveau conteneur** à partir de la nouvelle image, avec la configuration appropriée (ports mappés, volumes montés, variables d'environnement).
1. **Stratégies de Déploiement** :
   Il existe plusieurs stratégies pour mettre à jour une application en production afin de minimiser les temps d'arrêt et les risques :

- **Déploiement Recreate (ou Big Bang)** : Arrêter l'ancienne version, puis démarrer la nouvelle. Implique un temps d'arrêt. Simple, mais risqué pour les applications critiques.
- **Déploiement Blue/Green (ou Red/Black)** :
  - Vous avez deux environnements identiques ("Blue" et "Green"). Un seul est en production (par exemple, Blue).
  - Vous déployez la nouvelle version sur l'environnement inactif (Green).
  - Une fois que Green est testé et validé, vous basculez le trafic de Blue vers Green. Green devient la production.
  - Permet un rollback rapide en rebasculant simplement le trafic vers l'ancien environnement (Blue).
  - Nécessite plus de ressources (deux environnements complets).
- **Déploiement Canary** :
  - Vous déployez la nouvelle version sur un petit sous-ensemble de serveurs ou pour un petit pourcentage d'utilisateurs.
  - Vous surveillez attentivement les performances et les erreurs.
  - Si tout va bien, vous augmentez progressivement le trafic vers la nouvelle version jusqu'à ce que tous les utilisateurs l'utilisent.
  - Permet de détecter les problèmes avec un impact limité.
- **Déploiement avec Mises à Jour Progressives (Rolling Updates)** :
  - Les instances de l'application sont mises à jour une par une ou par petits groupes. L'ancienne version continue de servir le trafic pendant que les nouvelles instances sont déployées et démarrent.
  - Assure une haute disponibilité pendant le déploiement. C'est une stratégie courante avec les orchestrateurs de conteneurs.
1. **Configuration des Conteneurs** :
   Lors du démarrage d'un conteneur, vous devez souvent fournir une configuration :

- **Variables d'environnement** : Pour les clés d'API, les URL de base de données, les paramètres de l'application. Celles-ci peuvent être injectées par le système CI/CD ou l'orchestrateur.
- **Mappage des ports** : Pour exposer les ports de l'application à l'extérieur du conteneur (par exemple, `p 80:8000`).
- **Volumes** : Pour la persistance des données (par exemple, une base de données) ou pour monter des fichiers de configuration. Les données générées par une application stateless n'ont généralement pas besoin de volumes persistants.
- **Limites de ressources** : CPU, mémoire.
1. **Orchestration de Conteneurs (pour les déploiements plus complexes)** :
   Pour les applications qui nécessitent plusieurs conteneurs, la haute disponibilité, la mise à l'échelle automatique, et une gestion simplifiée, on utilise des **orchestrateurs de conteneurs** comme :

- **Kubernetes (K8s)** : La solution d'orchestration la plus populaire et la plus complète. Offre des fonctionnalités avancées de déploiement, de mise à l'échelle, de découverte de services, d'auto-réparation, etc.
- **Docker Swarm** : Une solution d'orchestration plus simple, intégrée à Docker.
- **Amazon ECS (Elastic Container Service)**, **Google Kubernetes Engine (GKE)**, **Azure Kubernetes Service (AKS)** : Services cloud gérés pour Kubernetes ou des orchestrateurs propriétaires.
- Les orchestrateurs automatisent de nombreuses tâches de déploiement, y compris les stratégies de mise à jour, la gestion de la configuration, et le load balancing.
1. **Automatisation du Déploiement dans le Pipeline CD** :
   L'étape de déploiement dans votre pipeline CD va typiquement :

- S'authentifier auprès de l'hôte de déploiement ou de l'API de l'orchestrateur.
- Exécuter des commandes (par exemple, `docker run`, `docker-compose up`, `kubectl apply`, `helm upgrade`) ou appeler des scripts pour déployer la nouvelle version de l'image Docker.
- Potentiellement, exécuter des tests "post-déploiement" (smoke tests) pour vérifier que l'application fonctionne correctement dans le nouvel environnement.
- Gérer le rollback en cas d'échec.

**Exemple conceptuel d'étape de déploiement dans un pipeline CI/CD (très simplifié, sans orchestrateur) :**

```yaml
# Dans un fichier comme .github/workflows/cd.yml ou .gitlab-ci.yml

# ... (étapes précédentes: build_docker, push_to_registry) ...

deploy_to_production:
  # stage: deploy # Pour GitLab CI
  name: Deploy to Production
  # needs: [push_to_registry]
  runs-on: ubuntu-latest # Ce runner aurait besoin d'accès SSH au serveur de prod, par exemple

  environment: # Pour GitHub Actions, définit un environnement de déploiement
    name: production
    url: <http://mon-app.example.com> # URL de l'application déployée

  steps:
    - name: Deploy new version
      # Utiliser SSH pour se connecter au serveur de production et exécuter les commandes Docker
      # Ceci est un exemple très basique. En pratique, des outils comme Ansible,
      # des scripts de déploiement plus robustes, ou des intégrations d'orchestrateur seraient utilisés.
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.PROD_SERVER_HOST }}
        username: ${{ secrets.PROD_SERVER_USERNAME }}
        key: ${{ secrets.PROD_SERVER_SSH_KEY }}
        script: |
          # Se connecter au registre Docker (si nécessaire sur le serveur)
          # echo "${{ secrets.DOCKER_REGISTRY_PASSWORD }}" | docker login ${{ secrets.DOCKER_REGISTRY_URL }} -u "${{ secrets.DOCKER_REGISTRY_USERNAME }}" --password-stdin

          # Télécharger la dernière image (supposons qu'elle est taggée 'latest' et avec un tag de commit)
          docker pull ${{ secrets.DOCKER_IMAGE_NAME }}:${{ github.sha }} # Utiliser un tag spécifique
          docker pull ${{ secrets.DOCKER_IMAGE_NAME }}:latest

          # Arrêter et supprimer l'ancien conteneur (si son nom est connu, ex: 'mon-app-container')
          if [ $(docker ps -q -f name=mon-app-container) ]; then
            docker stop mon-app-container
            docker rm mon-app-container
          fi

          # Démarrer le nouveau conteneur
          docker run -d --name mon-app-container \\
            -p 80:8000 \\
            -e API_KEY=${{ secrets.API_KEY_PROD }} \\
            # ... autres variables d'environnement ...
            ${{ secrets.DOCKER_IMAGE_NAME }}:${{ github.sha }} # Lancer l'image avec le tag spécifique

          echo "Déploiement terminé."

    # - name: Verify deployment (Smoke Test)
    #   run: |
    #     # Script pour vérifier que l'application répond correctement
    #     curl -f <http://mon-app.example.com/health> || exit 1
    #     echo "Vérification du déploiement réussie."

```

**Important** : L'exemple ci-dessus est très simplifié. Pour des déploiements en production robustes, surtout avec plusieurs serveurs ou des besoins de haute disponibilité, l'utilisation d'un orchestrateur de conteneurs est fortement recommandée. Le pipeline CD interagirait alors avec l'API de cet orchestrateur (par exemple, `kubectl apply -f deployment.yaml` pour Kubernetes).

Le déploiement continu avec Docker et un orchestrateur vous permet de livrer de la valeur à vos utilisateurs de manière rapide, fiable et répétable, transformant la façon dont vous développez et maintenez vos applications.
