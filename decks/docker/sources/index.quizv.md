---
title: Docker
description: >
  Les bases de Docker : installation, concepts fondamentaux 
  (image, conteneur, Dockerfile, registry, volume, réseau, commandes de base)
  et build d'images. Hors Docker Compose.
theme: default
author: Maxime Lenne
tags: [docker-fundamentals, image, container]
max-questions: 20
target-difficulty: medium
---

---
type: single
timer: 15
difficulty: easy
tags: [docker, image]
---

## Qu'est-ce qu'une image Docker ?

- [ ] Un conteneur en cours d'exécution sur le système hôte
- [ ] Un fichier de configuration réseau pour Docker
- [ ] Un volume de stockage persistant
- [x] Un ensemble de couches en lecture seule servant de modèle pour créer des conteneurs

> Une **image Docker** est un ensemble de couches (layers) en **lecture seule** qui contient tout le nécessaire pour
> exécuter une application (librairies, binaires, configurations). Elle sert de modèle immuable à partir duquel on lance
> des **conteneurs**.

---
type: single
timer: 15
difficulty: easy
tags: [docker, image]
---

## Quelle commande permet de lister les images Docker présentes localement ?

- [x] `docker images`
- [ ] `docker ps`
- [ ] `docker list`
- [ ] `docker ls`

> La commande **`docker images`** affiche toutes les images stockées localement. À ne pas confondre avec `docker ps` qui
> liste les **conteneurs** en cours d'exécution.

---
type: single
timer: 15
difficulty: easy
tags: [docker, image]
---

## Quelle commande permet de télécharger une image depuis Docker Hub ?

- [ ] `docker download nginx:latest`
- [x] `docker pull nginx:latest`
- [ ] `docker get nginx:latest`
- [ ] `docker fetch nginx:latest`

> La commande **`docker pull <image>:<tag>`** télécharge une image depuis un registre (Docker Hub par défaut). Les
> commandes `download`, `get` et `fetch` n'existent pas dans Docker.

---
type: single
timer: 15
difficulty: easy
tags: [docker, container]
---

## Qu'est-ce qu'un conteneur Docker ?

- [x] Une instance en cours d'exécution d'une image Docker
- [ ] Un fichier texte contenant les instructions de construction d'une image
- [ ] Un espace de stockage persistant pour les données
- [ ] Un registre permettant de distribuer des images

> Un **conteneur** est une **instance active** d'une image. Docker ajoute une couche de lecture/écriture par-dessus
> l'image, permettant au conteneur de s'exécuter de manière isolée tout en partageant le noyau de l'hôte.

---
type: single
timer: 15
difficulty: easy
tags: [docker, container]
---

## Quelle commande affiche uniquement les conteneurs en cours d'exécution ?

- [ ] `docker ps -a`
- [ ] `docker containers`
- [x] `docker ps`
- [ ] `docker list --running`

> **`docker ps`** liste les conteneurs **actifs** uniquement. Pour voir tous les conteneurs, y compris ceux arrêtés, on
> utilise **`docker ps -a`**.

---
type: single
timer: 15
difficulty: easy
tags: [docker, container]
---

## Quelle option de `docker run` permet de lancer un conteneur en arrière-plan ?

- [ ] `-b`
- [ ] `--background`
- [ ] `-bg`
- [x] `-d`

> L'option **`-d`** (pour **detached**) lance le conteneur en arrière-plan. Le terminal reste disponible et le conteneur
> tourne indépendamment.

---
type: single
timer: 15
difficulty: easy
tags: [docker, container, volume]
---

## Que se passe-t-il lorsque l'on supprime un conteneur Docker sans avoir utilisé de volume ?

- [ ] Les données sont automatiquement sauvegardées sur l'hôte
- [x] Toutes les données écrites dans le conteneur sont perdues
- [ ] Les données sont archivées dans une image de sauvegarde
- [ ] Les données sont transférées vers Docker Hub

> Les conteneurs sont **éphémères** par conception. Toute donnée écrite dans le système de fichiers interne d'un
> conteneur est **perdue** à sa suppression. Pour conserver des données, il faut utiliser des **volumes** ou des **bind
> mounts**.

---
type: single
timer: 15
difficulty: easy
tags: [docker, dockerfile]
---

## Dans un Dockerfile, quel est le rôle de l'instruction `FROM` ?

- [x] Spécifier l'image de base sur laquelle construire
- [ ] Définir le port exposé par le conteneur
- [ ] Copier des fichiers dans l'image
- [ ] Définir la commande exécutée au démarrage du conteneur

> L'instruction **`FROM`** est toujours la première instruction d'un Dockerfile. Elle définit l'**image de base** à
> partir de laquelle la nouvelle image sera construite (par exemple `FROM ubuntu:20.04`).

---
type: single
timer: 15
difficulty: easy
tags: [docker, dockerfile, image]
---

## Quelle commande permet de construire une image Docker à partir d'un Dockerfile ?

- [ ] `docker create -t mon_app:1.0 .`
- [ ] `docker make -t mon_app:1.0 .`
- [ ] `docker compile -t mon_app:1.0 .`
- [x] `docker build -t mon_app:1.0 .`

> La commande **`docker build -t <nom>:<tag> .`** construit une image à partir du Dockerfile situé dans le répertoire
> courant (`.`). L'option **`-t`** permet de nommer et versionner l'image.

---
type: single
timer: 20
difficulty: medium
tags: [docker, registry]
---

## Qu'est-ce que Docker Hub ?

- [ ] Un outil en ligne de commande pour gérer les conteneurs
- [x] Le registre public par défaut permettant de stocker et distribuer des images Docker
- [ ] L'interface graphique de Docker Desktop
- [ ] Un système de fichiers utilisé par les conteneurs

> **Docker Hub** est la plateforme publique par défaut pour rechercher, télécharger et publier des images Docker. Il
> héberge des **images officielles** (nginx, python, redis...) et des images communautaires. À ne pas confondre avec
> GitHub (hébergement de code) ou Docker Desktop (application locale).

---
type: single
timer: 25
difficulty: medium
tags: [docker, volume]
---

## Quelle est la différence principale entre un volume nommé et un bind mount ?

- [ ] Un volume nommé est en lecture seule, un bind mount est en lecture/écriture
- [ ] Un bind mount est plus performant qu'un volume nommé
- [x] Un volume nommé est géré par Docker, un bind mount pointe vers un dossier de l'hôte
- [ ] Un volume nommé ne fonctionne que sur Linux

> Un **volume nommé** est géré par Docker et stocké dans `/var/lib/docker/volumes/`. Un **bind mount** monte directement
> un répertoire de la machine hôte dans le conteneur. Les volumes nommés sont **recommandés** pour les données
> persistantes car ils sont indépendants de la structure de fichiers de l'hôte.

---
type: multiple
timer: 25
difficulty: medium
tags: [docker, network]
---

## Parmi les suivants, lesquels sont des types de réseaux Docker ? (plusieurs réponses)

- [x] bridge
- [x] host
- [ ] nat
- [x] overlay

> Docker propose quatre types de réseaux : **bridge** (par défaut, communication entre conteneurs sur le même hôte),
> **host** (partage l'interface réseau de l'hôte), **none** (pas de connectivité réseau) et **overlay** (communication
> inter-hôte pour Swarm/orchestration). Le type `nat` n'existe pas dans Docker.

---
type: single
timer: 20
difficulty: medium
tags: [docker, installation]
---

## Quel composant est nécessaire pour faire fonctionner Docker Desktop sur Windows ?

- [x] WSL 2 (Windows Subsystem for Linux 2)
- [ ] VirtualBox
- [ ] VMware Workstation
- [ ] Cygwin

> Docker Desktop sur Windows s'appuie sur **WSL 2** pour exécuter des conteneurs Linux. Les prérequis incluent Windows
> 10/11 64 bits avec WSL 2 activé, au moins 4 Go de RAM et 2 CPU.

---
type: single
timer: 25
difficulty: medium
tags: [docker, image]
---

## Pourquoi les images Docker utilisent-elles un système de couches (layers) ?

- [ ] Pour rendre les images plus difficiles à copier
- [ ] Pour chiffrer les données contenues dans l'image
- [ ] Pour permettre l'exécution simultanée de plusieurs conteneurs
- [x] Pour permettre le partage et la réutilisation de couches communes entre images, économisant ainsi de l'espace disque

> Docker utilise un **Union File System** pour fusionner les couches. Chaque instruction du Dockerfile crée une nouvelle
> couche. Les images qui partagent une base commune (ex. `ubuntu:latest`) **réutilisent les mêmes couches**, ce qui
> économise de l'espace disque et accélère les téléchargements.

---
type: multiple
timer: 25
difficulty: medium
tags: [docker, container]
---

## Parmi les options suivantes de `docker run`, lesquelles sont valides ? (plusieurs réponses)

- [x] `-p 8080:80`
- [ ] `--cpu-priority=high`
- [x] `--name mon_conteneur`
- [ ] `--auto-restart`

> Les options valides de `docker run` incluent : **`-p`** (mapping de ports) et **`--name`** (nom du conteneur).
> L'option `--cpu-priority` n'existe pas et la bonne option pour le redémarrage automatique est `--restart` (et non
> `--auto-restart`).

---
type: single
timer: 20
difficulty: medium
tags: [docker, container]
---

## Quelle commande permet d'ouvrir un terminal interactif dans un conteneur en cours d'exécution ?

- [ ] `docker ssh mon_conteneur`
- [x] `docker exec -it mon_conteneur bash`
- [ ] `docker connect mon_conteneur bash`
- [ ] `docker terminal mon_conteneur`

> La commande **`docker exec -it <conteneur> bash`** exécute une commande interactive dans un conteneur actif. L'option
> **`-i`** garde l'entrée standard ouverte et **`-t`** alloue un pseudo-terminal. `docker ssh` n'existe pas dans Docker.

---
type: single
timer: 25
difficulty: medium
tags: [docker, dockerfile]
---

## Quelle est la différence entre `CMD` et `ENTRYPOINT` dans un Dockerfile ?

- [ ] `CMD` est obligatoire, `ENTRYPOINT` est optionnel
- [ ] `ENTRYPOINT` définit les variables d'environnement, `CMD` lance la commande
- [ ] Il n'y a aucune différence, les deux sont interchangeables
- [x] `CMD` définit une commande remplaçable, `ENTRYPOINT` définit un point d'entrée fixe

> **`CMD`** définit la commande par défaut exécutée au démarrage du conteneur, mais elle peut être **remplacée** en
> passant une commande à `docker run`. **`ENTRYPOINT`** définit un point d'entrée **fixe** : les arguments passés à
> `docker run` sont ajoutés après l'entrypoint au lieu de le remplacer.

---
type: single
timer: 25
difficulty: medium
tags: [docker, dockerfile]
---

## Quelle est la bonne pratique pour minimiser le nombre de couches dans un Dockerfile ?

- [x] Combiner plusieurs commandes dans une même instruction `RUN` avec `&&`
- [ ] Utiliser une instruction `RUN` séparée pour chaque commande
- [ ] Éviter d'utiliser l'instruction `RUN`
- [ ] Utiliser `ADD` au lieu de `COPY` pour tout

> Chaque instruction `RUN` crée une **nouvelle couche** dans l'image. La bonne pratique est de **combiner** les
> commandes avec `&&` dans une même instruction `RUN`, par exemple : `RUN apt-get update && apt-get install -y curl &&
> rm -rf /var/lib/apt/lists/*`. Cela réduit le nombre de couches et la taille finale de l'image.

---
type: multiple
timer: 25
difficulty: medium
tags: [docker, registry]
---

## Quelles sont les étapes nécessaires pour pousser une image vers un registre Docker ? (plusieurs réponses)

- [x] Taguer l'image avec le préfixe du registre (`docker tag`)
- [ ] Valider l'image avec `docker verify`
- [x] Se connecter au registre (`docker login`)
- [x] Envoyer l'image (`docker push`)

> Pour pousser une image vers un registre, il faut trois étapes : **1)** Taguer l'image avec le nom du registre (`docker
> tag myapp:1.0 myregistry.com/repo/myapp:1.0`), **2)** Se connecter (`docker login myregistry.com`), **3)** Envoyer
> (`docker push myregistry.com/repo/myapp:1.0`). La commande `docker verify` n'existe pas.

---
type: single
timer: 20
difficulty: medium
tags: [docker, volume]
---

## Quelle commande permet de créer un volume nommé Docker ?

- [ ] `docker create volume mon_volume`
- [ ] `docker volume new mon_volume`
- [x] `docker volume create mon_volume`
- [ ] `docker volume add mon_volume`

> La commande correcte est **`docker volume create <nom>`**. Les sous-commandes `new` et `add` n'existent pas dans
> Docker. La syntaxe Docker suit le modèle `docker <ressource> <action>`.

---
type: single
timer: 25
difficulty: medium
tags: [docker, network]
---

## Comment deux conteneurs sur un même réseau Docker nommé peuvent-ils communiquer entre eux ?

- [x] Par résolution DNS en utilisant le nom du conteneur
- [ ] Uniquement via l'adresse IP de l'hôte
- [ ] En partageant un volume commun
- [ ] En exposant leurs ports sur l'hôte

> Lorsque deux conteneurs sont sur un même **réseau nommé**, Docker fournit un **DNS interne** qui permet de les joindre
> par **nom de conteneur**. Par exemple, un conteneur `app` peut se connecter à un conteneur `db` via l'hôte `db`. Cela
> ne fonctionne pas sur le réseau bridge par défaut.

---
type: single
timer: 30
difficulty: hard
tags: [docker, image, registry]
---

## Vous devez déployer une application en production. Quel type d'image Docker est recommandé ?

- [ ] La première image trouvée sur Docker Hub correspondant au besoin
- [ ] Une image construite à partir de `scratch` pour toutes les applications
- [x] Une image officielle maintenue par Docker ou l'éditeur du logiciel
- [ ] Une image communautaire populaire avec beaucoup de téléchargements

> Pour la production, il est recommandé d'utiliser des **images officielles** maintenues par Docker ou l'éditeur du
> logiciel (ex. `python`, `nginx`). Elles suivent des **standards de sécurité** et sont régulièrement mises à jour. Les
> images communautaires sont de qualité variable et potentiellement moins fiables.

---
type: multiple
timer: 30
difficulty: hard
tags: [docker, container]
---

## Quelles options de `docker run` permettent de limiter les ressources d'un conteneur ? (plusieurs réponses)

- [x] `-m 512m`
- [ ] `--limit-disk=10G`
- [x] `--cpus=1`
- [ ] `--priority=low`

> Docker permet de limiter les ressources avec **`-m`** (limite de mémoire RAM) et **`--cpus`** (nombre de CPUs
> alloués). Les options `--limit-disk` et `--priority` n'existent pas dans Docker.

---
type: multiple
timer: 30
difficulty: hard
tags: [docker, container]
---

## Quels mécanismes Linux Docker utilise-t-il pour isoler les conteneurs ? (plusieurs réponses)

- [ ] Les machines virtuelles KVM
- [x] Les namespaces
- [ ] Le chiffrement AES des processus
- [x] Les cgroups (control groups)

> Docker repose sur deux mécanismes Linux principaux pour l'isolation : les **namespaces** (isolent les vues système :
> réseau, processus, utilisateurs) et les **cgroups** (limitent les ressources CPU, mémoire). Docker ne virtualise
> **pas** avec KVM — les conteneurs partagent le noyau de l'hôte.

---
type: single
timer: 30
difficulty: hard
tags: [docker, dockerfile]
---

## Quelle est la différence entre `COPY` et `ADD` dans un Dockerfile ?

- [ ] `COPY` est plus rapide que `ADD`
- [x] `ADD` peut décompresser automatiquement des archives et récupérer des URLs, contrairement à `COPY`
- [ ] `ADD` ne peut copier que des fichiers locaux
- [ ] `COPY` est déprécié au profit de `ADD`

> **`COPY`** copie simplement des fichiers locaux dans l'image. **`ADD`** offre des fonctionnalités supplémentaires :
> décompression automatique d'archives tar et téléchargement depuis des URLs. La **bonne pratique** est de préférer
> `COPY` sauf si vous avez spécifiquement besoin des fonctionnalités de `ADD`, pour plus de clarté et de prévisibilité.

---
type: single
timer: 25
difficulty: hard
tags: [docker, dockerfile]
---

## Quel est le rôle d'un fichier `.dockerignore` ?

- [ ] Lister les conteneurs à ignorer lors du déploiement
- [ ] Empêcher certaines images d'être téléchargées
- [ ] Ignorer certaines instructions du Dockerfile pendant le build
- [x] Exclure des fichiers et dossiers du contexte de build envoyé au daemon Docker

> Le fichier **`.dockerignore`** fonctionne comme un `.gitignore` : il exclut des fichiers du **contexte de build**
> envoyé au daemon Docker. Cela empêche d'inclure des fichiers inutiles (node_modules, logs, .env, .git) dans l'image,
> réduisant sa **taille** et évitant la fuite de fichiers sensibles.

---
type: multiple
timer: 30
difficulty: hard
tags: [docker, registry]
---

## Parmi les suivants, lesquels sont des services de registre Docker privé ? (plusieurs réponses)

- [x] Amazon ECR (Elastic Container Registry)
- [ ] GitHub Actions
- [x] Google Artifact Registry (anciennement GCR)
- [x] L'image Docker `registry:2` auto-hébergée

> Les registres privés Docker incluent : **ECR** (AWS), **Artifact Registry/GCR** (GCP) et l'image **`registry:2`** pour
> un registre auto-hébergé. GitHub Actions est un service CI/CD, pas un registre d'images.

---
type: single
timer: 30
difficulty: hard
tags: [docker, volume, container]
---

## Vous lancez PostgreSQL sans volume. Le conteneur est supprimé par erreur. Que se passe-t-il ?

- [ ] Les données sont automatiquement sauvegardées par Docker
- [x] Toutes les données de la base sont définitivement perdues
- [ ] Les données sont récupérables avec `docker restore`
- [ ] Les données sont conservées dans l'image PostgreSQL

> Sans volume, les données d'un conteneur sont stockées dans sa **couche de lecture/écriture**, qui est **supprimée**
> avec le conteneur. Pour une base de données, il est **indispensable** d'utiliser un volume nommé (ex. `docker run -v
> pgdata:/var/lib/postgresql/data postgres`) afin de conserver les données indépendamment du cycle de vie du conteneur.

---
type: single
timer: 30
difficulty: hard
tags: [docker, network]
---

## Dans quel cas utilise-t-on un réseau Docker de type `overlay` ?

- [x] Pour permettre la communication entre conteneurs répartis sur plusieurs hôtes Docker
- [ ] Pour isoler totalement un conteneur du réseau
- [ ] Pour partager l'interface réseau de l'hôte avec un conteneur
- [ ] Pour remplacer le réseau bridge par défaut

> Le réseau **overlay** permet la communication entre conteneurs situés sur des **hôtes Docker différents**, notamment
> dans un contexte d'orchestration (Docker Swarm, Kubernetes). Le réseau **bridge** est limité à un seul hôte, **host**
> partage la pile réseau de l'hôte, et **none** isole totalement le conteneur.

---
type: single
timer: 25
difficulty: hard
tags: [docker, installation]
---

## Sur Linux, quelle commande permet d'utiliser Docker sans taper `sudo` à chaque fois ?

- [ ] `sudo chmod 777 /var/run/docker.sock`
- [ ] `sudo docker config --no-sudo`
- [x] `sudo usermod -aG docker $USER`
- [ ] `sudo apt-get install docker-rootless`

> La commande **`sudo usermod -aG docker $USER`** ajoute l'utilisateur courant au **groupe docker**, ce qui lui donne
> les permissions d'accéder au socket Docker sans `sudo`. Il faut ensuite se **déconnecter et reconnecter** pour que le
> changement prenne effet. Modifier les permissions du socket avec `chmod 777` serait un risque de sécurité.
