---
layout: section
---

# Dockerfile & Build

De l'image de base à votre propre image

<!--
Le Dockerfile est le fichier le plus important de Docker
C'est lui qui décrit COMMENT construire une image
-->

---

### Qu'est-ce qu'un Dockerfile ?

<v-clicks>

- Un **fichier texte** contenant des instructions pour construire une image
- Chaque instruction crée une **nouvelle couche** dans l'image
- Convention : nommé `Dockerfile` (sans extension)
- Construit avec `docker build -t <nom>:<tag> .`

</v-clicks>

<v-click>

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
```

</v-click>

<!--
Le Dockerfile est le "plan de construction" de votre image
Le . à la fin de docker build indique le contexte (répertoire courant)
-->

---
layout: two-cols-header
---

### Instructions principales

::left::

<v-clicks>

- **FROM** — image de base

```dockerfile
FROM python:3.11-slim
```

- **RUN** — exécuter une commande pendant le build

```dockerfile
RUN apt-get update && apt-get install -y curl
```

- **COPY** — copier des fichiers locaux

```dockerfile
COPY . /app
```

</v-clicks>

::right::

<v-clicks>

- **WORKDIR** — répertoire de travail

```dockerfile
WORKDIR /app
```

- **EXPOSE** — documenter le port utilisé

```dockerfile
EXPOSE 8000
```

- **CMD** — commande au démarrage

```dockerfile
CMD ["python", "main.py"]
```

</v-clicks>

<!--
FROM est toujours la première instruction
EXPOSE est informatif — il ne publie pas le port
-->

---
layout: two-cols-header
---

### ENV, ENTRYPOINT & la différence avec CMD

::left::

### ENV — Variables d'environnement

```dockerfile
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
```

Disponibles au **build** ET au **runtime**.

### ENTRYPOINT — Point d'entrée fixe

```dockerfile
ENTRYPOINT ["python"]
CMD ["main.py"]
```

`docker run mon_app test.py` → exécute `python test.py`

::right::

### CMD vs ENTRYPOINT

<v-clicks>

| | CMD | ENTRYPOINT |
|--|-----|------------|
| Rôle | Commande **par défaut** | Point d'entrée **fixe** |
| Remplaçable ? | Oui, via `docker run` | Non (args ajoutés après) |
| Usage | App classique | CLI, wrapper script |

</v-clicks>

<v-click>

**COPY vs ADD** : préférez `COPY` sauf besoin de décompression auto d'archives. `ADD` peut aussi télécharger des URLs.

</v-click>

<!--
CMD est remplacée si on passe une commande à docker run
ENTRYPOINT est fixe — les arguments sont ajoutés après
-->

---

### Construction : `docker build`

```bash {1-2|4-5|7-8|all}
# Construire une image nommée et taguée
docker build -t mon_app:1.0 .

# Construire sans utiliser le cache
docker build --no-cache -t mon_app:1.0 .

# Vérifier que l'image est créée
docker images | grep mon_app
```

<v-click>

```text
Step 1/5 : FROM python:3.11-slim
 ---> 2e7a8b9c3d4f
Step 2/5 : WORKDIR /app
 ---> Using cache          ← couche en cache !
 ---> 5f6a7b8c9d0e
Step 3/5 : COPY . /app
 ---> 1a2b3c4d5e6f         ← nouvelle couche
...
Successfully tagged mon_app:1.0
```

</v-click>

<!--
Le . à la fin = contexte de build (répertoire contenant le Dockerfile)
"Using cache" signifie que cette couche n'a pas changé
-->

---

### Bonnes pratiques Dockerfile

<v-clicks>

- **Minimiser les couches** — combiner les `RUN` avec `&&`

```dockerfile
RUN apt-get update && apt-get install -y curl wget && rm -rf /var/lib/apt/lists/*
```

- **Image de base adaptée** — `alpine` (5 Mo) vs `ubuntu` (77 Mo) vs `slim` (entre les deux)
- **Nettoyer les fichiers temporaires** dans le même `RUN`
- **Ajouter un `.dockerignore`** — éviter de copier `node_modules`, `.git`, `.env`
- **Un processus par conteneur** — pas de serveur web + BDD dans le même conteneur

</v-clicks>

<!--
Les bonnes pratiques réduisent la taille de l'image et améliorent la sécurité
On va voir l'optimisation du cache et le multi-stage build dans la section suivante
-->
