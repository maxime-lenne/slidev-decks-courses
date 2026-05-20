# Quiz 02 — Services GCP (mercredi fin d'après-midi)

> **Durée** : 25 min  •  **Format** : 12 QCM (1 point) + 1 cas pratique (8 points)  •  **Total** : 20 points
> **À l'issue des cours `04` à `06`** (Cloud Run, Cloud SQL, Cloud Storage)

---

## Partie A — QCM (12 × 1 pt)

### 1. Sur quel port Cloud Run attend-il par défaut que ton container écoute ?

- [ ] A. 80
- [ ] B. 443
- [ ] C. **8080**
- [ ] D. 5000

### 2. Quelle commande pousse une image vers Artifact Registry ?

- [ ] A. `gcloud artifacts push ...`
- [ ] B. `gcloud run push-image ...`
- [ ] C. **`docker push europe-west1-docker.pkg.dev/...`**
- [ ] D. `gcloud artifact-registry deploy ...`

### 3. **Vrai ou faux** : Cloud Run garantit que les fichiers écrits dans `/tmp/cache/` persistent entre 2 requêtes différentes.

- [ ] **A. Faux** (file system éphémère, partagé par instance, perdu au scale-down)
- [ ] B. Vrai
- [ ] C. Uniquement si `--volume` est passé

### 4. Tu fais `gcloud run deploy` pour la 3ᵉ fois. Que se passe-t-il pour les 2 révisions précédentes ?

- [ ] A. Elles sont supprimées
- [ ] B. **Elles existent toujours, 100 % du trafic va sur la nouvelle**
- [ ] C. Elles sont archivées dans GCS
- [ ] D. Elles continuent à recevoir 33 % du trafic

### 5. Quel `--concurrency` est cohérent pour un FastAPI bien async qui répond en 200 ms ?

- [ ] A. 1
- [ ] B. 5
- [ ] C. **80**
- [ ] D. 5000

### 6. Comment Cloud Run se connecte à Cloud SQL de la manière **la plus recommandée** ?

- [ ] A. IP publique de l'instance, mot de passe en env var
- [ ] B. **Cloud SQL connector via socket Unix (`--add-cloudsql-instances`)**
- [ ] C. SSH tunnel
- [ ] D. VPN site-to-site

### 7. Pour activer pgvector sur Cloud SQL Postgres 15+ :

- [ ] A. `apt install postgres-pgvector` sur l'instance
- [ ] B. `gcloud sql instances install-extension`
- [ ] C. **`CREATE EXTENSION vector` dans la base concernée**
- [ ] D. Ce n'est pas supporté

### 8. **Plusieurs réponses possibles** — Quelles options réduisent le **cold start** d'un Cloud Run ?

- [ ] A. **`--min-instances=1`**
- [ ] B. **Image légère (multi-stage, slim)**
- [ ] C. Augmenter `--max-instances`
- [ ] D. **Ne pas charger les gros modèles dans `main.py`** au démarrage
- [ ] E. **`--cpu-boost` au démarrage**

### 9. Sur GCS, quelle classe de stockage est adaptée à un fichier lu **plusieurs fois par jour** ?

- [ ] A. Archive
- [ ] B. Coldline
- [ ] C. Nearline
- [ ] D. **Standard**

### 10. À quoi sert une **signed URL** sur Cloud Storage ?

- [ ] A. Renommer un objet
- [ ] B. **Donner un accès temporaire à un objet privé sans IAM**
- [ ] C. Encrypter l'objet
- [ ] D. Versionner l'objet

### 11. Tu veux que ton bucket GCS ne soit **jamais** accessible par `allUsers`. Quelle configuration appliquer ?

- [ ] A. Ajouter `roles/storage.objectViewer` à `allUsers`
- [ ] B. **Activer `Public access prevention` sur le bucket**
- [ ] C. Mettre le bucket en région unique
- [ ] D. Désactiver l'API GCS

### 12. Tu vois cette erreur sur ton Cloud Run :
`google.api_core.exceptions.Forbidden: 403 Caller does not have storage.objects.get on bucket simplon-rag-corpus`.
Cause la plus probable ?

- [ ] A. Le bucket n'existe pas
- [ ] B. La région du bucket n'est pas la bonne
- [ ] C. **La SA du Cloud Run n'a pas le rôle `roles/storage.objectViewer` sur ce bucket**
- [ ] D. Le fichier est trop gros

---

## Partie B — Cas pratique (8 pt)

### 13. Architecture à concevoir

Tu pars d'un projet GCP vide. Tu dois déployer **une API FastAPI** qui :

- expose une route `POST /chat` qui appelle Mistral
- lit des PDFs depuis un bucket
- enregistre les conversations dans Postgres + pgvector
- doit pouvoir scaler de 0 à ~5 instances

**Liste, dans l'ordre, les étapes de provisioning** (10 à 14 étapes attendues),
en précisant pour chacune **la commande `gcloud` principale** (pas besoin du
détail des flags si vous ne les retenez pas tous, mais le nom de la commande
et son objet doivent être justes). Indique aussi quelles **API GCP** doivent
être activées et quels **rôles IAM** vont sur quelle SA.

---

## Corrigé

| Q | Réponse |
|---|---------|
| 1 | C |
| 2 | C |
| 3 | A |
| 4 | B |
| 5 | C |
| 6 | B |
| 7 | C |
| 8 | A, B, D, E |
| 9 | D |
| 10 | B |
| 11 | B |
| 12 | C |

**Q13 — solution de référence** (l'ordre des étapes peut varier légèrement) :

1. `gcloud projects create simplon-chat-prod` (création projet)
2. `gcloud billing projects link ...` (lier au billing account)
3. Créer une **alerte de budget** (20 €)
4. `gcloud services enable run.googleapis.com artifactregistry.googleapis.com sqladmin.googleapis.com storage.googleapis.com secretmanager.googleapis.com iam.googleapis.com`
5. `gcloud artifacts repositories create chat-images --repository-format=docker --location=europe-west1`
6. `gcloud sql instances create chat-db --database-version=POSTGRES_15 --tier=db-f1-micro --region=europe-west1`
7. `gcloud sql databases create chat --instance=chat-db` + `gcloud sql users create chat_app --instance=chat-db`
8. `CREATE EXTENSION vector` dans la base via le Cloud SQL Auth Proxy
9. `gcloud storage buckets create gs://simplon-chat-corpus --location=europe-west1 --uniform-bucket-level-access`
10. `gcloud secrets create mistral-api-key` + `gcloud secrets versions add ...`
11. `gcloud secrets create db-password` + `gcloud secrets versions add ...`
12. `gcloud iam service-accounts create chat-api` (SA dédiée)
13. Bindings IAM sur la SA `chat-api` :
    - `roles/cloudsql.client` (au projet)
    - `roles/secretmanager.secretAccessor` (au projet ou sur les secrets)
    - `roles/storage.objectViewer` (sur le bucket)
    - `roles/logging.logWriter` (au projet)
14. `docker push europe-west1-docker.pkg.dev/.../chat-images/api:<sha>`
15. `gcloud run deploy chat-api --image=... --service-account=chat-api@... --add-cloudsql-instances=... --update-secrets=... --memory=1Gi --max-instances=5 --allow-unauthenticated`

**Barème indicatif** :
- Ordre globalement correct : 2 pt
- APIs activées explicitement : 1 pt
- SA dédiée mentionnée + au moins 2 rôles bien attribués : 2 pt
- Cloud SQL Auth Proxy ou socket Unix pour la connexion : 1 pt
- Secret Manager utilisé (pas env var en clair) : 1 pt
- Alerte budget : 1 pt
