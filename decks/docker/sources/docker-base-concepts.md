# Docker base concept

### 1. Images Docker

1. **Définition**

   - Une **image Docker** est un ensemble de couches (layers) représentant un système de fichiers « figé » à un instant donné.
   - Elle contient tout le nécessaire pour exécuter une application (librairies, fichiers binaires, configurations, etc.), à l'exception du noyau.
   - Les images sont en **lecture seule** : elles sont immuables et servent de "modèle" pour lancer des conteneurs.

2. **Hiérarchie et système de fichiers en couches**

   - Chaque commande dans un `Dockerfile` (par ex. `RUN apt-get install`, `COPY mon_fichier …`) crée une couche supplémentaire.
   - Docker utilise un mécanisme appelé **Union File System** pour fusionner ces couches.
   - Les couches supérieures héritent des couches inférieures. Ainsi, la plupart des images partagent souvent une base commune (par ex. `ubuntu:latest`), ce qui permet de réutiliser des couches déjà existantes et d'économiser de l'espace disque.

3. **Images officielles vs. images communautaires**

   - Sur Docker Hub (la principale plateforme de distribution d'images), on trouve :
     - Des **images officielles** maintenues par Docker ou par l'éditeur du logiciel (ex. `python`, `nginx`, `redis`), qui suivent des standards de sécurité et de mise à jour.
     - Des **images communautaires** créées par des utilisateurs, pouvant être utiles mais parfois moins fiables (qualité variable).
   - Il est recommandé, dans un premier temps, de s'appuyer sur des images officielles reconnues pour leurs bonnes pratiques et leur maintenance régulière.

4. **Gestion des images**

   - **Télécharger** une image depuis Docker Hub : `docker pull <nom_image>:<tag>`
   - **Lister** les images locales : `docker images`
   - **Supprimer** une image : `docker rmi <image_id>`
   - **Rechercher** une image : `docker search <mot_cle>` (sur Docker Hub, depuis la CLI)

---

### 2. Conteneurs

1. **Qu'est-ce qu'un conteneur ?**

   - Un **conteneur Docker** est une instance (un processus) d'une image en cours d'exécution.
   - Au démarrage, Docker ajoute une couche de lecture/écriture par-dessus l'image, permettant au conteneur de modifier son système de fichiers (fichiers temporaires, logs, etc.) sans impacter l'image originale.
   - Les conteneurs s'exécutent de manière isolée, partageant le noyau de l'hôte tout en ayant leurs propres vues sur le système (réseau, processus, utilisateurs, etc.) via des **namespaces** et **cgroups**.

2. **Cycle de vie d'un conteneur**

   - **Création** : `docker create` ou `docker run` (ce dernier crée et lance immédiatement).
   - **Exécution / Démarrage** : `docker run` ou `docker start`.
   - **Arrêt** : `docker stop <conteneur>` ou `docker kill <conteneur>` (arrêt plus brutal).
   - **Suppression** : `docker rm <conteneur>`.
   - Par défaut, lorsque le processus principal du conteneur se termine, le conteneur s'arrête.

3. **Commandes principales liées aux conteneurs**

   - `docker run` : la plus utilisée pour démarrer un nouveau conteneur à partir d'une image.
     - Options courantes :
       - `-d` (mode détaché, le conteneur tourne en arrière-plan)
       - `-p <port_hote>:<port_conteneur>` (expose un port)
       - `-v <chemin_hote>:<chemin_conteneur>` (monte un volume ou un dossier)
       - `--name <nom_conteneur>` (nom personnalisé)
       - `--env <nom_variable>=<valeur_variable>` (variables d'environnement)
       - `--env-file <chemin-du-.env>` (intégrer un fichier .env)
   - `docker ps` : liste les conteneurs en cours d'exécution.
   - `docker ps -a` : liste tous les conteneurs (y compris ceux arrêtés).
   - `docker stop <nom|id>` : arrête un conteneur en lui envoyant un signal d'arrêt propre.
   - `docker rm <nom|id>` : supprime un conteneur arrêté.

4. **Isolation et ressources**

   - On peut limiter l'utilisation des ressources (CPU, mémoire) pour chaque conteneur :
     - `docker run -m 512m --cpus=1 <image>` pour limiter à 512 Mo de RAM et 1 CPU.
   - Docker assure l'isolation réseau via des **bridges** internes ou des **réseaux overlay** (pour l'orchestration).
   - Sécurité : Docker propose des mécanismes pour restreindre les privilèges (capabilities, user namespaces, etc.).

5. **Ephemeral by design**

   - Les conteneurs sont éphémères : toute donnée écrite dans le système de fichiers interne est perdue si le conteneur est supprimé.
   - Pour **conserver** des données, on utilise des **volumes** ou des montages de répertoires de l'hôte (voir la partie sur network & volumes, ou la partie sur la création d'images).

---

### 3. Dockerfile

1. **Qu'est-ce qu'un Dockerfile ?**

   - Un **Dockerfile** est un fichier texte contenant des **instructions** qui décrivent **comment** construire une image Docker.
   - À partir d'un Dockerfile, on peut construire une image personnalisée avec la commande `docker build`.

2. **Principales instructions**

   - **FROM** : spécifie l'image de base (ex. `FROM ubuntu:20.04`).
   - **RUN** : exécute une commande pendant la construction de l'image (ex. `RUN apt-get update && apt-get install -y python3`).
   - **COPY** ou **ADD** : copie des fichiers locaux dans l'image (ex. `COPY . /app`).
   - **WORKDIR** : définit le répertoire de travail par défaut (ex. `WORKDIR /app`).
   - **ENV** : définit des variables d'environnement (ex. `ENV POSTGRESQL_USER=Admin`).
   - **EXPOSE** : indique que le conteneur utilise tel port (ex. `EXPOSE 80`), surtout à titre d'information pour la documentation ou l'orchestration.
   - **CMD** / **ENTRYPOINT** : définit la commande principale ou le point d'entrée lancé lors de l'exécution de l'image (ex. `CMD ["python3", "app.py"]`).

3. **Bonne pratiques**

   - Minimiser le nombre de couches : chaque instruction `RUN`, `COPY`, etc. crée une nouvelle couche.
   - Combiner plusieurs commandes dans une même instruction `RUN` pour limiter les couches (ex. `RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*`).
   - Utiliser une image de base adaptée (ex. `alpine` pour la légèreté, `ubuntu` pour une base plus complète, etc.).
   - Gérer proprement le cache et nettoyer les fichiers temporaires pour réduire la taille finale de l'image.
   - Ajouter un `.dockerignore` pour éviter de copier des fichiers inutiles dans l'image (logs, répertoires node_modules, etc.).

4. **Construction de l'image**

   - Commande générale :

      ```bash
      docker-fundamentals build -t <nom_image>:<tag> .
      ```

   - L'option `t` (pour "tag") permet de nommer et versionner l'image.
   - Le `.` à la fin signifie que le Dockerfile (et son contexte) se trouvent dans le répertoire courant.

---

### 4. Docker Registry

1. **Qu'est-ce qu'un registre ?**

   - Un **Docker Registry** est un service qui stocke et distribue des images Docker.
   - Les plus connus sont **Docker Hub** (public) et les registres privés (hébergés sur votre propre serveur ou fournis par un Cloud provider).

2. **Docker Hub**

   - Plateforme publique par défaut pour rechercher, récupérer et publier des images.
   - Avantages :
     - Grande bibliothèque d'images officielles.
     - Facilité de partage et de collaboration.
   - Inconvénients :
     - Espace privé limité en version gratuite.
     - Accessible publiquement si vous ne configurez pas un dépôt privé payant.

3. **Registre privé**

   - Permet de stocker des images en interne, par exemple pour protéger du code source ou des images propriétaires.
   - Possibilité d'utiliser :
     - **Docker Registry** open-source (image `registry:2`) que vous hébergez vous-même.
     - Services managés des Clouds : ECR (AWS), GCR/Artifact Registry (GCP), ACR (Azure), etc.
   - Authentification et contrôle d'accès peuvent être configurés (LDAP, tokens, etc.).

4. **Gestion des tags et versions**

   - Un tag identifie une version spécifique de l'image (ex. `myapp:1.0`, `myapp:latest`).
   - Il est recommandé de versionner soigneusement vos images pour éviter les confusions.
   - Pour envoyer (push) une image vers un registre, il faut :
     1. Nommer l'image avec le préfixe du registre (ex. `docker tag myapp:1.0 myregistry.com/monrepo/myapp:1.0`).
     2. Se connecter (`docker login myregistry.com`).
     3. Envoyer l'image : `docker push myregistry.com/monrepo/myapp:1.0`.

5. **Pull et push d'images**

   - **Pull** : `docker pull myregistry.com/monrepo/myapp:1.0`
   - **Push** : `docker push myregistry.com/monrepo/myapp:1.0`
   - Docker Hub (si pas de préfixe) : `docker pull myapp:latest` se connecte au Hub par défaut.

---

### 5. **Volumes Docker**

1. **Pourquoi les volumes ?**

   - Les conteneurs sont **éphémères** : tout fichier écrit dans leur système de fichiers disparaît à leur suppression.
   - Les **volumes** permettent de **conserver les données** indépendamment du cycle de vie des conteneurs.

2. **Types de volumes**

   - **Volumes nommés** (recommandé) : gérés par Docker, stockés dans `/var/lib/docker/volumes/`.
   - **Bind mounts** : montage direct d'un dossier de l'hôte dans le conteneur. Plus flexibles mais plus sensibles aux permissions et aux chemins.

3. **Commandes principales**

   - Créer un volume nommé :

      ```bash
      docker-fundamentals volume create mon_volume
      ```

   - Lister les volumes :

      ```bash
      docker-fundamentals volume ls
      ```

   - Supprimer un volume :

      ```bash
      docker-fundamentals volume rm mon_volume
      ```

   - Utiliser un volume dans un conteneur :

      ```bash
      docker-fundamentals run -v mon_volume:/app/data myimage
      ```

   - Utiliser un bind mount :

      ```bash
      docker-fundamentals run -v /chemin/local:/chemin/conteneur myimage
      ```

     - Un **bind mount** est une méthode pour monter un répertoire ou un fichier de l'hôte **directement dans un conteneur Docker**.
     - Concrètement il relie **un chemin local sur la machine hôte** (par exemple `/home/user/projet`) à un **chemin dans le conteneur** (par exemple `/app`).

4. **Bonnes pratiques**

   - Privilégier les **volumes nommés** pour les données persistantes (BDD, logs, etc.).
   - Éviter de monter tout le projet avec un bind mount en production (risques de fuite de fichiers sensibles ou de surcharge).

---

### 6. **Réseaux Docker**

1. **Pourquoi un réseau Docker ?**

   - Les conteneurs communiquent entre eux via un **réseau virtuel isolé**.
   - Docker crée par défaut un réseau `bridge` (passerelle) pour permettre la communication entre conteneurs.

2. **Types de réseaux**

   - **bridge** (par défaut) : conteneurs sur la même machine communiquent via une passerelle.
   - **host** : le conteneur partage l'interface réseau de l'hôte.
   - **none** : pas de connectivité réseau.
   - **overlay** : pour la communication entre plusieurs hôtes Docker (Swarm, orchestration).

3. **Commandes de base**

   - Lister les réseaux :

      ```bash
      docker-fundamentals network ls
      ```

   - Créer un réseau :

      ```bash
      docker-fundamentals network create mon_reseau
      ```

   - Exécuter un conteneur dans un réseau :

      ```bash
      docker-fundamentals run --network mon_reseau ...
      ```

   - Connecter un conteneur à un réseau existant :

      ```bash
      docker-fundamentals network connect mon_reseau mon_conteneur
      ```

4. **Communication entre conteneurs**

   - Si deux conteneurs partagent un même réseau **nommé**, ils peuvent se joindre par **nom DNS** (`nom_du_conteneur`).
   - Exemple avec une BDD :

   → L'application peut se connecter à la BDD via l'host `db`.

      ```bash
      docker network create mon_net
      docker run -d --name db --network mon_net postgres
      docker run -it --name app --network mon_net myapp
      ```

---

## Conclusion

La compréhension des **concepts clés** de Docker (images, conteneurs, Dockerfile, registres, volumes, réseaux) est essentielle pour maîtriser la conteneurisation :

- Les **images** sont la base des conteneurs : elles contiennent tout le nécessaire pour exécuter une application et sont généralement construites à partir d'un **Dockerfile**.
- Les **conteneurs** sont des instances actives et isolées de ces images, pouvant être démarrées, arrêtées et supprimées rapidement.
- Les **volumes** permettent de **conserver les données** au-delà du cycle de vie des conteneurs, ce qui est indispensable pour les applications avec état (ex. bases de données).
- Les **réseaux Docker** facilitent la **communication entre conteneurs** de manière sécurisée, notamment via des réseaux personnalisés.
- Les **registres** (comme Docker Hub) permettent de **stocker**, **partager** et **déployer** les images à grande échelle, en public ou en privé.

Docker offre ainsi un environnement **modulaire, léger et reproductible** pour le développement, le test et le déploiement d'applications.
