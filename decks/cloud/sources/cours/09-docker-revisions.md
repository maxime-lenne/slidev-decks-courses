# Cours 09 — Docker : révisions et bonnes pratiques production

> **Durée indicative** : 30 min — Jeudi matin (transition vers le brief)
> **Pré-requis** : avoir déjà fait un Dockerfile la semaine précédente

## 🎯 Objectifs

Avant de lancer le brief, **rapidement** consolider :

1. La structure d'un Dockerfile **multi-stage** efficace pour Python.
2. Le `.dockerignore` qui fait gagner 50 % de temps de build.
3. Les images **distroless** / `python:3.12-slim` vs images full.
4. La taille d'image, le coût de pull, les risques de sécurité.

---

## 1. Dockerfile FastAPI — template recommandé

```dockerfile
# ─── Stage 1 : builder ─────────────────────────────────
FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Layer 1 : deps système (rarement changeantes)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

# Layer 2 : deps Python (changent rarement)
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Layer 3 : le code (change souvent)
COPY . .

# ─── Stage 2 : runtime ─────────────────────────────────
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH=/home/appuser/.local/bin:$PATH

# Création d'un user non-root (sécurité)
RUN useradd --create-home --shell /bin/bash appuser
USER appuser
WORKDIR /home/appuser/app

# Copier les deps installées dans le stage builder
COPY --from=builder --chown=appuser:appuser /root/.local /home/appuser/.local
COPY --from=builder --chown=appuser:appuser /app .

EXPOSE 8080

# Healthcheck (Cloud Run ne l'utilise pas mais Docker local oui)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/health').read()" || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

Points-clés :

- **Multi-stage** : le runtime ne contient pas `build-essential` (économise ~200 Mo).
- **Layers ordonnées du moins au plus changeant** : pip cache efficace.
- **User non-root** : exigé pour des scans de sécurité (Trivy, Snyk).
- **`EXPOSE 8080`** : convention Cloud Run.
- **CMD avec uvicorn directement** : pas de `python -m`, pas de gunicorn surnuméraire
  (Cloud Run gère la concurrence par le load balancer).

---

## 2. `.dockerignore` — souvent oublié

À mettre à la racine, **AVANT** le premier `docker build`. Sans lui, le build
copie tout, y compris `.venv/` (1 Go), `node_modules/`, `.git/` (parfois 500 Mo)
dans le contexte de build et donc dans l'image.

```gitignore
# Python
__pycache__
*.pyc
.venv
venv/
.pytest_cache
.ruff_cache
.mypy_cache

# Git
.git
.gitignore

# Editor
.vscode
.idea
.DS_Store

# Tests / docs
tests/
docs/
*.md

# Secrets
.env
.env.*
*.pem
*-key.json
```

> 💡 **Tester l'efficacité** : `docker build --progress=plain` montre la taille
> du contexte envoyé au daemon. Avant `.dockerignore` : souvent 500 Mo. Après : ~ 5 Mo.

---

## 3. Choix d'image de base

| Image | Taille | Avantages | Inconvénients |
|-------|--------|-----------|---------------|
| `python:3.12` | 1 Go | Toutes les libs système | Gros, surface d'attaque |
| `python:3.12-slim` | 130 Mo | Bon compromis | apt manquant pour quelques libs |
| `python:3.12-alpine` | 50 Mo | Très petit | Pip wheels rares, glibc absente → galère |
| `gcr.io/distroless/python3-debian12` | 60 Mo | Pas de shell, surface minimale | Pas de debugging in situ |

> 🎯 **Recommandé pour le brief** : `python:3.12-slim` en stage runtime.
> **Distroless** = bonus si vous avez le temps en fin de semaine.

---

## 4. Stratégies pour réduire la taille

Avant optimisation : 1,2 Go. Cibles raisonnables :

| Étape | Taille typique |
|-------|----------------|
| `FROM python:3.12` + tout en monolithe | 1,2 Go |
| Slim base | 350 Mo |
| Multi-stage | 250 Mo |
| `.dockerignore` propre | 230 Mo |
| Distroless runtime | 140 Mo |

Conséquences sur Cloud Run :

- **Cold start** : une image 1 Go met 8 s à se télécharger sur un nouveau node,
  une image 200 Mo met 1 s.
- **Coût d'Artifact Registry** : ~ 0,10 $/Go/mois. Une équipe avec 100 images
  de 1 Go = 100 Go × 0,10 = 10 $/mois sur le stockage (négligeable mais ça compte).

---

## 5. Sécurité : scanner l'image

Avant de pousser en prod, scanner avec **Trivy** (open source) :

```bash
docker run --rm aquasec/trivy image \
  europe-west1-docker.pkg.dev/simplon-rag-prod/rag-images/api:v1.0.0
```

Sortie : liste des CVE par sévérité. En CI, on échoue le build si CVE HIGH ou CRITICAL.

GCP propose aussi **Artifact Analysis** (scan automatique des images poussées
sur Artifact Registry, à activer).

---

## 6. Build avec BuildKit / Buildx

À activer (par défaut sur Docker Desktop) :

```bash
export DOCKER_BUILDKIT=1
docker build .
```

Avantages :

- Cache plus malin (parallélisation des stages)
- `--mount=type=cache` pour mettre en cache `pip` entre builds
- Support multi-arch (utile si tu builds sur Mac M-series et déploies sur amd64)

> ⚠️ **Piège Mac M1/M2/M3/M4** : par défaut, `docker build` produit une image **arm64**.
> Cloud Run attend **amd64**. Toujours préciser :
>
> ```bash
> docker buildx build --platform linux/amd64 -t ... .
> ```

---

## 7. Quiz rapide

> À résoudre en 10 min en groupe.

1. Pourquoi placer `COPY requirements.txt` **avant** `COPY . .` dans un Dockerfile ?
2. Le binôme d'à côté a une image qui fait 2 Go. Liste 4 questions à poser pour
   diagnostiquer.
3. Tu vois ce stage final : `FROM python:3.12 AS final` et l'image fait 1 Go.
   Sans changer l'image de base, comment la faire passer sous 300 Mo ?
4. Pourquoi tu ne dois **jamais** mettre `MISTRAL_API_KEY=sk-...` dans un `ENV`
   du Dockerfile ?

---

## 🔗 Ressources

- [Docker best practices](https://docs.docker.com/build/building/best-practices/)
- [Distroless images (Google)](https://github.com/GoogleContainerTools/distroless)
- [Trivy](https://github.com/aquasecurity/trivy)
- [Stéphane Robert — Docker](https://blog.stephane-robert.info/docs/conteneurs/)
- [Hadolint — linter Dockerfile](https://github.com/hadolint/hadolint)
