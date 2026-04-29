---
layout: section
---

# Sécurité & Bonnes pratiques

Sécuriser vos conteneurs dès le développement

<!--
La sécurité n'est pas optionnelle, même en développement
Ces pratiques doivent devenir des réflexes
-->

---
layout: two-cols-header
---

### Images officielles & utilisateur non-root

::left::

### Images vérifiées

<v-clicks>

- Toujours utiliser des **images officielles** (`python`, `nginx`, `postgres`)
- Épingler une **version précise** (`postgres:15.3`, pas `postgres:latest`)
- Scanner régulièrement avec `trivy` ou `docker scout`

</v-clicks>

::right::

### Ne pas exécuter en root

<v-clicks>

```dockerfile
FROM python:3.11-slim
WORKDIR /app

# Créer un utilisateur non-root
RUN useradd -m appuser
COPY --chown=appuser:appuser . /app
RUN pip install -r requirements.txt

# Basculer sur l'utilisateur non-root
USER appuser
CMD ["python", "main.py"]
```

</v-clicks>

<!--
Par défaut les conteneurs tournent en root — c'est dangereux
Si une faille permet de sortir du conteneur, l'attaquant a les droits root sur l'h��te
-->

---

### Secrets, ports & réseaux isolés

<v-clicks>

- **Secrets** : fichier `.env` + `.gitignore`, jamais de mot de passe dans le Dockerfile
- **Ports** : n'exposez que le **strict nécessaire** — PostgreSQL ne devrait **jamais** être en `5432:5432`
- **Réseaux isolés** :

```yaml
services:
  db:
    networks:
      - backend        # BDD accessible uniquement en interne
  api:
    networks:
      - backend        # API communique avec la BDD
      - frontend       # API exposée au client
networks:
  backend:
  frontend:
```

</v-clicks>

<!--
Séparer les réseaux permet d'isoler les services sensibles
La BDD n'est accessible que par l'API, pas directement par le client
-->

---

### Limiter les ressources & scanner les images

<v-clicks>

- **Limiter CPU et mémoire** pour éviter qu'un conteneur consomme tout :

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: "512M"
```

- **Scanner les images** pour détecter les vulnérabilités :

```bash
# Avec Trivy (outil CLI populaire)
trivy image mon_app:1.0

# Avec Docker Scout (intégré à Docker Desktop)
docker scout cves mon_app:1.0
```

- **Mettre à jour** régulièrement les images de base

</v-clicks>

<!--
Les limites de ressources sont particulièrement importantes sur des serveurs partagés
Trivy est gratuit et très utilisé en production / CI/CD
-->
