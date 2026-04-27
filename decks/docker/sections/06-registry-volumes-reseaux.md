---
layout: section
---

# Registry, Volumes & Réseaux

Stocker, persister, communiquer

<!--
Trois concepts complémentaires pour un usage réel de Docker
-->

---
layout: two-cols-header
---

### Docker Hub & registres privés

::left::

### Docker Hub (public)

- Registre **par défaut** de Docker
- Images officielles : `python`, `nginx`, `postgres`...
- Gratuit (limité en dépôts privés)

```bash
docker pull nginx:latest
docker search python
```

::right::

### Registres privés

<v-clicks>

- **Amazon ECR** (AWS)
- **Google Artifact Registry** (GCP)
- **Azure ACR** (Azure)
- **Self-hosted** : `registry:2`

```bash
docker pull mon-registry.com/mon-app:1.0
```

</v-clicks>

<!--
Docker Hub est le registre par défaut — si pas de préfixe, Docker cherche là
Les registres privés sont indispensables en entreprise
-->

---

### Tags, push & pull

```bash {1-2|4-5|7-8|10-11|all}
# Taguer une image pour un registre
docker tag mon_app:1.0 monuser/mon_app:1.0

# Se connecter à Docker Hub
docker login

# Envoyer l'image sur le registre
docker push monuser/mon_app:1.0

# Télécharger l'image depuis le registre
docker pull monuser/mon_app:1.0
```

<v-click>

<div class="highlight-box mt-4">
  💡 Versionnez vos images avec des tags précis (<code>1.0</code>, <code>1.1</code>) — évitez de vous fier uniquement à <code>latest</code>.
</div>

</v-click>

<!--
latest est un tag par défaut mais ne garantit PAS que c'est la dernière version
Toujours utiliser des tags explicites en production
-->

---
layout: two-cols-header
---

### Volumes : persister les données

::left::

### Volumes nommés (recommandé)

Gérés par Docker dans `/var/lib/docker/volumes/`

```bash
docker volume create mes_donnees
docker run -v mes_donnees:/app/data myimage
```

- Indépendants du cycle de vie du conteneur
- Idéal pour **bases de données**, logs

::right::

### Bind mounts

Montage direct d'un dossier de l'hôte

```bash
docker run -v $(pwd)/src:/app/src myimage
```

- Le contenu local est **synchronisé** dans le conteneur
- Idéal pour le **développement** (hot-reload)

<v-click>

<div class="highlight-box mt-4">
  ⚠️ Sans volume, un <code>docker rm</code> sur un conteneur PostgreSQL = <strong>toutes les données perdues</strong>.
</div>

</v-click>

<!--
Volumes nommés pour la persistance, bind mounts pour le développement
Toujours utiliser un volume pour les bases de données
-->

---

### Réseaux Docker

<v-clicks>

| Type | Description | Cas d'usage |
|------|-------------|-------------|
| **bridge** | Réseau isolé par défaut | Conteneurs sur le même h��te |
| **host** | Partage l'interface de l'hôte | Performance réseau maximale |
| **none** | Pas de connectivité | Sécurité, batch jobs |
| **overlay** | Communication inter-hôtes | Swarm, Kubernetes |

</v-clicks>

<v-click>

```bash
# Créer un réseau personnalisé
docker network create mon_reseau

# Lancer un conteneur dans ce réseau
docker run -d --name db --network mon_reseau postgres:15
docker run -d --name app --network mon_reseau mon_app
```

</v-click>

<!--
Le réseau bridge par défaut ne permet PAS la résolution DNS par nom
Il faut créer un réseau nommé pour ça
-->

---

### Communication inter-conteneurs par DNS

<v-clicks>

- Sur un réseau **nommé**, Docker fournit un **DNS interne**
- Les conteneurs se joignent par **nom de conteneur**
- Pas besoin de connaître l'IP !

</v-clicks>

<v-click>

```bash
# Créer le réseau
docker network create mon_net

# Lancer PostgreSQL
docker run -d --name db --network mon_net postgres:15

# Lancer l'application — elle se connecte à "db" par DNS
docker run -d --name app --network mon_net \
  --env DATABASE_URL=postgresql://admin:secret@db:5432/mydb \
  mon_app
```

</v-click>

<v-click>

L'application accède à PostgreSQL via l'hôte `db` — Docker résout automatiquement le nom.

</v-click>

<!--
La résolution DNS est la base de la communication dans Docker Compose
C'est ce qui permet d'utiliser le nom du service comme hostname
-->

---
layout: center
class: text-center
---

# Pause / Questions

Avant de passer à Docker Compose

<!--
On a couvert beaucoup de concepts
S'assurer que volumes et réseaux sont bien compris avant Compose
-->
