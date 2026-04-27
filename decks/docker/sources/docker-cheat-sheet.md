# docker cheat-sheet

## 1. Gestion des Images Docker

### Télécharger une image depuis Docker Hub

```bash
docker-fundamentals pull <image>:<tag>
```

Exemple :

```bash
docker-fundamentals pull ubuntu:latest
```

### Lister les images locales

```bash
docker-fundamentals images
```

### Supprimer une image

```bash
docker-fundamentals rmi <image_id>
```

### Construire une image à partir d’un Dockerfile

Il faut se trouver dans le dossier contenant le Dockerfile avant de lancer la commande :

```bash
docker-fundamentals build -t <nom_image>:<tag> .
```

Exemple :

```bash
docker-fundamentals build -t mon_app:1.0 .
```

### Taguer une image avant de l’envoyer sur Docker Hub

```bash
docker-fundamentals tag <image> <nom_utilisateur>/<nom_image>:<tag>
```

### Envoyer une image sur Docker Hub

```bash
docker-fundamentals push <nom_utilisateur>/<nom_image>:<tag>
```

### Télécharger une image spécifique depuis un registre privé

```bash
docker-fundamentals pull <registry>/<image>:<tag>
```

---

## 2. Gestion des Conteneurs

### Lancer un conteneur

```bash
docker-fundamentals run -d --name <nom> <image>:<tag>
```

Exemple :

```bash
docker-fundamentals run -d --name web_server -p 8080:80 nginx
```

### Lister les conteneurs actifs

```bash
docker-fundamentals ps
```

### Lister tous les conteneurs (y compris arrêtés)

```bash
docker-fundamentals ps -a
```

### Voir les logs d’un conteneur

```bash
docker-fundamentals logs <nom|id>
```

### Arrêter un conteneur

```bash
docker-fundamentals stop <nom|id>
```

### Redémarrer un conteneur

```bash
docker-fundamentals restart <nom|id>
```

### Supprimer un conteneur

```bash
docker-fundamentals rm <nom|id>
```

### Accéder en mode interactif à un conteneur

```bash
docker-fundamentals exec -it <nom|id> bash
```

Exemple :

```bash
docker-fundamentals exec -it web_server bash
```

---

## 3. Gestion des Volumes

### Lister les volumes

```bash
docker-fundamentals volume ls
```

### Créer un volume

```bash
docker-fundamentals volume create <nom_volume>
```

### Attacher un volume à un conteneur

```bash
docker-fundamentals run -d -v <nom_volume>:/chemin/dans/conteneur <image>
```

### Utiliser un dossier local

```bash
docker-fundamentals run -v $(pwd)/site:/usr/share/nginx/html -d nginx
```

### Supprimer un volume

```bash
docker-fundamentals volume rm <nom_volume>
```

---

## 4. Réseau Docker

### Lister les réseaux Docker

```bash
docker-fundamentals network ls
```

### Créer un réseau

```bash
docker-fundamentals network create <nom_reseau>
```

### Connecter un conteneur à un réseau

```bash
docker-fundamentals network connect <nom_reseau> <nom_conteneur>
```

### Déconnecter un conteneur d’un réseau

```bash
docker-fundamentals network disconnect <nom_reseau> <nom_conteneur>
```

### Supprimer un réseau

```bash
docker-fundamentals network rm <nom_reseau>
```

---

## 5. Gestion des Conteneurs en Mode Compose

### Lancer une application avec Docker Compose

```bash
docker-fundamentals compose up
```

Ajouter `-d` pour lancer le conteneur en détaché (sans interface graphique).

```bash
docker-fundamentals compose up -d
```

### Arrêter une application Docker Compose

```bash
docker-fundamentals compose down
```

### Afficher les logs des services

```bash
docker-fundamentals compose logs -f
```

### Redémarrer un service spécifique

```bash
docker-fundamentals compose restart <service>
```

### Rebuild d’un service spécifique

Reconstruire l’image d’un service (ex. `api`) et relancer l’application :

```bash
docker-fundamentals compose up --build <service>
```

### Rebuild complet de tous les services

Force la reconstruction de toutes les images, même si aucune modification n’a été détectée :

```bash
docker-fundamentals compose build --no-cache
```

### Supprimer les volumes (attention, les données sont perdues)

```bash
docker-fundamentals compose down -v
```

### Supprimer les images générées par Docker Compose

```bash
docker-fundamentals compose down --rmi all
```

---

## 6. Autres Commandes Utiles

### Nettoyer les ressources inutilisées

```bash
docker-fundamentals system prune -a
```

### Afficher les statistiques des conteneurs actifs

```bash
docker-fundamentals stats
```

### Afficher les détails d’un conteneur

```bash
docker-fundamentals inspect <nom|id>
```

Exemple

```bash
docker-fundamentals inspect postgresql | grep "IPAddress"
```

### Afficher l’espace utilisé par Docker

```bash
docker-fundamentals system df
```

---

## 7. Connexion à Docker Hub

### Se connecter

```bash
docker-fundamentals login
```

En précisant un pseudonyme

```bash
docker-fundamentals login -u <username>
```

### Se déconnecter

```bash
docker-fundamentals logout
```
