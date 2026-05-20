# Cours 05 — Cloud SQL (Postgres + pgvector)

> **Durée indicative** : 1h15 cours + 1h atelier — Mercredi après-midi
> **Pré-requis** : SQL Postgres, pgvector (vu en semaine RAG), cours 04 (Cloud Run)

## 🎯 Objectifs

1. Comprendre ce qu'est un **DBaaS** et ce que Cloud SQL gère pour nous.
2. Provisionner une instance Cloud SQL Postgres (avec une tier économique).
3. Activer l'extension **pgvector**.
4. Connecter un Cloud Run à Cloud SQL via le **Cloud SQL Connector**.
5. Connaître les bonnes pratiques : backups, IAM auth, mots de passe.

---

## 1. Pourquoi un DBaaS ?

Gérer un Postgres en prod, c'est :

- Provisionner une VM (CPU, RAM, SSD)
- Installer + configurer Postgres
- Configurer la **réplication** (HA) sur plusieurs zones
- Faire des **backups** automatiques + tester la restauration
- Gérer les **upgrades mineures et majeures**
- Monitorer (CPU, disque, locks, vacuum...)
- Gérer le **failover** quand le primaire tombe
- Patcher les **failles de sécurité** dès leur sortie

Avec **Cloud SQL**, tout ça est managé. Tu cliques (ou tu tapes une commande),
tu obtiens un endpoint Postgres prêt en 5 min.

Coût : **plus cher** qu'une VM nue, mais le ratio « temps économisé / coût »
penche très fort côté DBaaS dès que tu sors du « prototype ».

---

## 2. Cloud SQL en 30 s

GCP propose **3 SGBD managés** sous le nom Cloud SQL :

- Cloud SQL for **PostgreSQL** ← ce qu'on utilise
- Cloud SQL for **MySQL**
- Cloud SQL for **SQL Server**

Pour des charges plus lourdes ou globales, il existe :

- **AlloyDB** (Postgres optimisé Google, plus rapide, plus cher)
- **Spanner** (SQL distribué globalement, cohérence forte, niveau Google-scale)
- **BigQuery** (analytique, pas transactionnel)

Pour la formation : **Cloud SQL Postgres**, version 15 ou 16 (16 supporte
pgvector nativement de mieux en mieux).

---

## 3. Création d'une instance

### Via la console

`Cloud SQL → Create instance → PostgreSQL`

Champs clés :

| Champ | Valeur formation | Note |
|-------|------------------|------|
| Instance ID | `rag-db` | Unique dans le projet |
| Password (postgres) | `<générer>` | À mettre dans Secret Manager |
| Database version | `Postgres 15` ou `16` | 16 pour pgvector récent |
| Region | `europe-west1` | Même région que Cloud Run |
| Zonal availability | `Single zone` | « Multiple zones » = HA, plus cher |
| Machine type | `db-f1-micro` ou `db-custom-1-3840` | Pour formation seulement ! |
| Storage | `10 GB SSD` | Auto-extend coché |

### Via gcloud

```bash
gcloud sql instances create rag-db \
  --database-version=POSTGRES_15 \
  --region=europe-west1 \
  --tier=db-f1-micro \
  --storage-size=10GB \
  --storage-type=SSD \
  --root-password='<MOT-DE-PASSE-FORT>' \
  --availability-type=zonal
```

Création : **5 à 10 min**.

Le **Instance Connection Name** est l'identifiant qui sert ensuite :
`<PROJECT>:<REGION>:<INSTANCE>` → `simplon-rag-prod:europe-west1:rag-db`.

> ⚠️ **Tier `db-f1-micro`** : 0,6 Go de RAM, ~ 10 $ / mois. Suffisant pour
> formation, **PAS pour la prod**. Pour de la prod légère, viser `db-custom-2-7680`.

---

## 4. Bases et utilisateurs

Bonne pratique : **ne pas utiliser le user `postgres` (root)** depuis l'app.
Créer un user dédié avec des droits limités.

```bash
gcloud sql databases create rag --instance=rag-db
gcloud sql users create rag_app --instance=rag-db --password='<APP-PWD>'
```

Puis se connecter en `postgres` et donner les bons droits :

```sql
GRANT CONNECT ON DATABASE rag TO rag_app;
\c rag
GRANT USAGE ON SCHEMA public TO rag_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO rag_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO rag_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO rag_app;
```

---

## 5. Extension pgvector

pgvector permet de stocker et requêter des embeddings (vecteurs flottants
de dimension fixe) avec l'algorithme **HNSW** ou **IVFFlat**.

```sql
-- Connecté à la base `rag`
CREATE EXTENSION IF NOT EXISTS vector;

-- Vérification
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
```

Cloud SQL Postgres 15+ supporte pgvector dans la liste des extensions
autorisées. Si la commande échoue, vérifier dans la console
`Cloud SQL → Instance → Flags → cloudsql.enable_pgvector = on`.

> Détail technique : avec Mistral `mistral-embed`, les vecteurs font **1024
> dimensions**. Penser à le déclarer correctement :
>
> ```sql
> CREATE TABLE chunks (
>   id SERIAL PRIMARY KEY,
>   content TEXT,
>   embedding vector(1024)
> );
> CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
> ```

---

## 6. Connecter Cloud Run à Cloud SQL

Trois façons. **La meilleure pour notre brief : Cloud SQL Connector via socket
Unix** (intégré, pas de Cloud SQL Auth Proxy à exécuter, pas d'IP publique).

### Étape 1 — Donner les droits à la SA de Cloud Run

```bash
PROJECT_NUMBER=$(gcloud projects describe simplon-rag-prod --format='value(projectNumber)')
gcloud projects add-iam-policy-binding simplon-rag-prod \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

### Étape 2 — Attacher l'instance au service Cloud Run

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --add-cloudsql-instances=simplon-rag-prod:europe-west1:rag-db
```

### Étape 3 — Configurer les variables d'environnement

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --update-env-vars=\
DB_HOST=/cloudsql/simplon-rag-prod:europe-west1:rag-db,\
DB_NAME=rag,\
DB_USER=rag_app \
  --update-secrets=DB_PASSWORD=db-password:latest
```

### Étape 4 — DSN côté code (SQLAlchemy asyncpg)

```python
import os
from sqlalchemy.ext.asyncio import create_async_engine

host = os.environ["DB_HOST"]  # /cloudsql/simplon-rag-prod:europe-west1:rag-db
db = os.environ["DB_NAME"]
user = os.environ["DB_USER"]
pwd = os.environ["DB_PASSWORD"]

# Le socket Unix nécessite la syntaxe ?host=...
dsn = f"postgresql+asyncpg://{user}:{pwd}@/{db}?host={host}"
engine = create_async_engine(dsn)
```

---

## 7. Alternative : connexion en local pour développer

Pour développer / migrer en local, on utilise le **Cloud SQL Auth Proxy** :

```bash
# Télécharger le proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.13.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy

# Lancer (le port 5432 local devient le proxy vers Cloud SQL)
./cloud-sql-proxy simplon-rag-prod:europe-west1:rag-db

# Dans un autre terminal
psql "postgresql://rag_app:$APP_PWD@127.0.0.1:5432/rag"
```

Le proxy s'authentifie via `gcloud auth application-default login`.

> 💡 **Idéal pour les migrations Alembic** : tu peux exécuter `alembic upgrade head`
> depuis ton poste contre la base Cloud SQL, via le proxy, comme si c'était localhost.

---

## 8. Backups et restauration

Backups **automatiques quotidiens** activés par défaut (rétention 7 jours).

```bash
# Liste des backups
gcloud sql backups list --instance=rag-db

# Restauration sur une nouvelle instance
gcloud sql backups restore <BACKUP_ID> --restore-instance=rag-db-restore
```

**Point-in-time recovery (PITR)** : récupérer l'état d'il y a 12 min, possible
si « Enable point-in-time recovery » est coché. Recommandé en prod.

> 🪤 **Piège** : par défaut sur une instance `db-f1-micro`, **le PITR est désactivé**.
> Pour la formation c'est OK. En projet client, **toujours l'activer**.

---

## 9. IAM Database Authentication (avancé)

Plutôt qu'un mot de passe, on peut s'authentifier avec un **service account GCP**.

Activé en option, plus sécurisé (rotation auto). Hors scope du brief, mais à
connaître.

```bash
gcloud sql users create rag_app_iam@simplon-rag-prod.iam --instance=rag-db --type=cloud_iam_service_account
```

---

## 10. Pièges classiques

| Symptôme | Cause | Solution |
|---|---|---|
| `Cloud SQL connector failed: forbidden` | SA Cloud Run sans `roles/cloudsql.client` | Ajouter le rôle |
| Connexion timeout en local | Proxy pas lancé / mauvais Instance Connection Name | `gcloud sql instances describe <id>` |
| `pgvector extension not allowed` | Flag manquant | Activer `cloudsql.enable_pgvector` |
| Migrations qui prennent 10 s pour 1 ligne | Connexion via IP publique avec SSL négocié | Passer en socket Unix (`/cloudsql/...`) |
| Facture qui explose | Tier trop gros + storage auto-extend monté | Surveiller, configurer alerte budget |

---

## 11. Atelier (1h)

> Sur le projet de l'atelier précédent.

1. Créer une instance Cloud SQL Postgres 15, `db-f1-micro`, single zone.
2. Activer pgvector (`CREATE EXTENSION vector`).
3. Créer la BDD `rag` et un user `rag_app`.
4. Lancer le **Cloud SQL Auth Proxy** en local.
5. Depuis `psql`, créer la table `chunks(id, content, embedding vector(1024))`
   et un index HNSW.
6. Mettre le mot de passe dans **Secret Manager**.
7. Reconfigurer le Cloud Run de l'atelier précédent pour qu'il se connecte à Cloud SQL.
8. Vérifier via les logs que la connexion est OK.

---

## 🔗 Ressources

- [Cloud SQL Postgres docs](https://cloud.google.com/sql/docs/postgres)
- [Cloud SQL + Cloud Run guide](https://cloud.google.com/sql/docs/postgres/connect-run)
- [pgvector](https://github.com/pgvector/pgvector)
- [Stéphane Robert — Cloud SQL](https://blog.stephane-robert.info/docs/cloud/gcp/cloud-sql/)
- [Cloud SQL pricing](https://cloud.google.com/sql/pricing)
