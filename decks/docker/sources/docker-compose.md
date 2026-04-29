# Docker Compose - Organisation et gestion de conteneurs multi-services

### 1. Pourquoi Docker Compose ?

Lorsque vous devez exécuter plusieurs conteneurs qui interagissent entre eux (ex : une application web + une base de données + un cache), gérer ces conteneurs individuellement avec `docker run` devient vite lourd et peu maintenable.

**Docker Compose** permet de :

- Définir tous vos services dans un seul fichier YAML (`docker-compose.yml`).
- Démarrer et arrêter tous les conteneurs d’un projet d’un seul coup.
- Gérer facilement les volumes, réseaux et variables d’environnement partagés.

### 2. Installation de Docker Compose

Depuis Docker v20+, Docker Compose est inclus par défaut comme **plugin officiel**. La commande à utiliser est donc :

```bash
docker compose
```

(Et non plus `docker-compose` comme dans les anciennes versions)

> Vérification : `docker compose version`
>

### 3. Structure d’un fichier docker-compose.yml

Un fichier `docker-compose.yml` contient plusieurs sections :

- `version`: (optionnelle avec Compose V2)
- `services`: liste des conteneurs/services à lancer.
- `volumes`: volumes partagés entre services ou persistants.
- `networks`: réseaux personnalisés.

### Exemple de base : application web + base de données

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:

```

### 4. Commandes de base avec Docker Compose

- **Lancer les services** :
- **En arrière-plan (détaché)** :

```bash
docker compose up -d

```

- **Arrêter les services** :

```bash
docker compose down
```

- **Reconstruction des images (si `build` présent)** :

```bash
docker compose build
```

- **Afficher les logs** :

```bash
docker compose logs -f
```

- **Lister les conteneurs Compose actifs** :

```bash
docker compose ps
```

### 5. Variables d'environnement

Pour ne pas écrire en dur des mots de passe ou paramètres, on peut utiliser un fichier `.env` :

```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret
```

Et dans le YAML :

```yaml
db:
 environment:
   POSTGRES_USER: ${POSTGRES_USER}
   POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

Ou le fichier complet :

```yaml
db:
  env_file:
    - .env
```

### 6. Cas pratique : API FastAPI + PostgreSQL

### Arborescence :

```
.
├── app
│   └── main.py
├── Dockerfile
├── docker-compose.yml
└── .env

```

### Dockerfile (extrait)

```
FROM python:3.11-slim
WORKDIR /app
COPY ./app /app
RUN pip install fastapi uvicorn psycopg2-binary
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

```

### docker-compose.yml

```yaml
services:
  db:
    image: postgres:15
    container_name: database
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
    networks:
      - my_network
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: fastapi_app
    restart: always
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://admin:secret@db:5432/mydb
    networks:
      - my_network
    ports:
      - "8000:8000"

networks:
  my_network:
    driver: bridge
    
volumes:
  db_data:

```

### 7. Bonnes pratiques

- Nommer explicitement les services et volumes.
- Isoler les fichiers sensibles dans `.env`, ne pas les versionner.
- Utiliser `depends_on` pour l’ordre de démarrage logique.
- Pour les projets complexes, utiliser plusieurs fichiers Compose (`f fichier1.yml -f fichier2.yml`).

### 8. Sécurisation de l'environnement Docker Compose

En tant que futurs administrateurs systèmes et réseaux, la sécurisation de vos environnements de conteneurs est essentielle. Docker offre une grande souplesse, mais expose aussi à des risques si certaines pratiques de sécurité ne sont pas appliquées rigoureusement.

### Utiliser des images officielles ou vérifiées

Privilégiez toujours des images provenant de sources officielles (ex : `python`, `nginx`, `postgres`, etc.). Ces images sont maintenues et auditées par Docker ou les éditeurs du logiciel. Évitez d'utiliser des images anonymes non vérifiées du Docker Hub qui peuvent contenir du code malveillant.

### Limiter les privilèges (ne pas exécuter en root)

Par défaut, les conteneurs s'exécutent avec les privilèges root, ce qui est dangereux si une faille permet de sortir du conteneur. Il faut :

- Créer un utilisateur spécifique non-root dans le `Dockerfile` :

    ```yaml
    RUN useradd -m appuser
    USER appuser
    ```

- Donner à cet utilisateur les bons droits d’accès au répertoire :

    ```yaml
    WORKDIR /app
    COPY --chown=appuser:appuser . /app
    ```

- Éviter toute élévation de privilège inutile avec des options comme `-privileged` ou des capacités Linux supplémentaires dans le `docker-compose.yml`.

> En contexte de production, on peut aussi utiliser des outils comme AppArmor ou SELinux pour restreindre ce que le conteneur peut faire au niveau du système hôte.
>

### Utiliser un fichier `.env` et gérer les secrets

- Stockez les variables sensibles (mots de passe, URL, tokens) dans un fichier `.env` à la racine du projet :

    ```yaml
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=supersecret
    DATABASE_URL=postgresql://admin:supersecret@db:5432/mydb
    ```

- Ce fichier ne doit jamais être versionné : ajoutez `.env` dans le fichier `.gitignore`.
- Dans le fichier `docker-compose.yml`, les variables sont référencées via `${}` :

    ```yaml
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    
    ```

- Pour les environnements sensibles, Docker Swarm ou Kubernetes permettent de gérer des `secrets` de manière plus sécurisée (montés comme fichiers en lecture seule).

### Restreindre les ports exposés

- Ne publiez que les ports strictement nécessaires. Par exemple, une base de données PostgreSQL ne devrait **jamais** être exposée à l'extérieur (pas de `5432:5432`). Utilisez les réseaux internes Docker pour permettre la communication entre services.

### Configurer des réseaux Docker personnalisés

- Créez un réseau interne dédié pour isoler les services sensibles :

    ```yaml
    networks:
      backend:
      frontend:
    
    ```

- Définissez quel service est connecté à quel réseau :

    ```yaml
    services:
      db:
        networks:
          - backend
      api:
        networks:
          - backend
          - frontend
    
    ```

### Mettre à jour et scanner les images

- Utilisez des balises précises (ex : `postgres:15.3`) pour garder le contrôle sur les mises à jour.
- Testez toujours vos images avant mise en production.
- Scannez régulièrement vos images avec :
  - `docker scan` (intégré, utilise Snyk)
  - `trivy` (outil CLI très utilisé en production)

### Limiter les ressources par conteneur

Pour éviter qu’un service mal configuré ne consomme toute la mémoire ou le CPU de la machine :

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: "512M"

```

> Ces limitations sont particulièrement importantes dans des environnements mutualisés ou sur des hôtes Cloud avec ressources partagées.
>

---

**En résumé** : une bonne sécurisation avec Docker Compose repose sur une combinaison de pratiques :

- Choix des images
- Isolation des services
- Sécurisation des variables et accès
- Contrôle des ressources
- Maintenance régulière et audit

## Conclusion

Docker Compose simplifie le développement et le test d'applications multi-services. Il devient un outil incontournable dès qu'on dépasse un conteneur unique. Associé à Git, aux fichiers `.env` et à de bonnes pratiques de sécurité, il facilite l’automatisation, le partage de projets et la transition vers le déploiement en Cloud ou en CI/CD.
