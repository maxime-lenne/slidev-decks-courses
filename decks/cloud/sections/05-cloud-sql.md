---
layout: section-liquid
---

# Module 4
## Cloud SQL + pgvector

<div class="text-sm opacity-60 mt-4">35 min · DBaaS pour l'IA · Mercredi après-midi</div>

---
layout: default
---

## Pourquoi un DBaaS ?

<div class="text-sm opacity-85 mt-4">

Gérer un Postgres en prod, c'est :

</div>

<div class="grid grid-cols-2 gap-4 mt-3 text-xs">

<div class="border-l-4 border-[#e63946] pl-3">
<div class="font-bold mb-1 text-[#e63946]">À ta charge sans DBaaS</div>
<ul class="list-none space-y-1 opacity-85">
<li>Provisionner VM + storage</li>
<li>Installer + configurer Postgres</li>
<li>Réplication HA multi-zone</li>
<li>Backups + tester la restauration</li>
<li>Upgrades mineures + majeures</li>
<li>Monitoring (CPU, locks, vacuum...)</li>
<li>Failover quand le primaire tombe</li>
<li>Patchs sécurité CVE</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="font-bold mb-1 text-[#10b981]">Avec Cloud SQL</div>
<ul class="list-none space-y-1 opacity-85">
<li>1 commande → endpoint prêt en 5 min</li>
<li>Backups quotidiens auto</li>
<li>HA en 1 clic</li>
<li>Patchs auto (fenêtre configurable)</li>
<li>Métriques + logs inclus</li>
<li>Coût + élevé qu'une VM nue, mais ratio temps/coût ✅</li>
</ul>
</div>

</div>

<!--
- Démythifier le « c'est juste un Postgres sur une VM » — non, c'est BEAUCOUP plus
- Le ratio temps/coût bascule en faveur du DBaaS dès qu'on sort du prototype
-->

---
layout: default
---

## Cloud SQL en 30 secondes

<div class="grid grid-cols-2 gap-6 mt-4 text-xs">

<div>
<div class="font-bold text-sm mb-2 text-[#457b9d]">Les 3 SGBD managés sous Cloud SQL</div>
<ul class="list-none space-y-2 opacity-85">
<li>🐘 Cloud SQL for <strong>PostgreSQL</strong> ← on utilise ça</li>
<li>🐬 Cloud SQL for MySQL</li>
<li>🟦 Cloud SQL for SQL Server</li>
</ul>
</div>

<div>
<div class="font-bold text-sm mb-2 text-[#10b981]">Pour aller plus loin</div>
<ul class="list-none space-y-2 opacity-85">
<li>🚀 <strong>AlloyDB</strong> — Postgres optimisé Google, + rapide, + cher</li>
<li>🌍 <strong>Spanner</strong> — SQL distribué globalement</li>
<li>📊 <strong>BigQuery</strong> — analytique, pas transactionnel</li>
</ul>
</div>

</div>

<div class="text-xs opacity-60 mt-6 text-center">
🎯 Pour la formation : <strong>Cloud SQL Postgres 15 ou 16</strong> (16 supporte pgvector nativement de mieux en mieux)
</div>

<!--
- AlloyDB est tentant pour la prod mais surdimensionné pour le brief
- Spanner = niveau « Google-scale » (PayPal, banques) — overkill pour 99% des projets
- BigQuery sera vu au M7
-->

---
layout: default
---

## Création d'une instance

```bash {1-7|9-10|all}
gcloud sql instances create rag-db \
  --database-version=POSTGRES_15 \
  --region=europe-west1 \
  --tier=db-f1-micro \
  --storage-size=10GB \
  --storage-type=SSD \
  --root-password='<MOT-DE-PASSE-FORT>' \
  --availability-type=zonal

# Création : 5 à 10 min
# Instance Connection Name : simplon-rag-prod:europe-west1:rag-db
```

<div class="text-xs mt-3">

| Champ | Valeur formation | Note |
|---|---|---|
| Tier | `db-f1-micro` | 0,6 Go RAM, ~10 $/mois — formation uniquement |
| Storage | 10 Go SSD | Auto-extend par défaut |
| Availability | `zonal` | `regional` = HA, +2× le coût |

</div>

<div class="text-xs opacity-60 mt-3 border-l-4 border-[#e63946] pl-3">
⚠️ Pour de la <strong>prod légère</strong> : viser <code>db-custom-2-7680</code> (2 vCPU, 7,5 Go RAM).
</div>

<!--
- Instance Connection Name = identifiant à retenir, c'est ce qu'on passe à Cloud Run
- db-f1-micro suffit largement pour 200 PDFs + chunks + index HNSW
- PITR (point-in-time recovery) désactivé en db-f1-micro — à activer en prod
-->

---
layout: default
---

## Bases + utilisateurs (least privilege)

<div class="text-xs opacity-85 mt-2">
Bonne pratique : ne <strong>pas</strong> utiliser <code>postgres</code> (root) depuis l'app. Créer un user dédié avec droits limités.
</div>

```bash
gcloud sql databases create rag --instance=rag-db
gcloud sql users create rag_app --instance=rag-db --password='<APP-PWD>'
```

```sql {1-2|4-9|all}
-- Connecté en `postgres` sur la base `rag`
GRANT CONNECT ON DATABASE rag TO rag_app;

\c rag
GRANT USAGE ON SCHEMA public TO rag_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO rag_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO rag_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO rag_app;
```

<div class="text-xs opacity-60 mt-3">
💡 Sans <code>ALTER DEFAULT PRIVILEGES</code>, chaque nouvelle table devrait être grantée à la main.
</div>

<!--
- Le user `postgres` ne doit JAMAIS être utilisé par l'app (rétro-portage de bonnes pratiques on-prem)
- Le `rag_app` n'a pas le droit CREATE TABLE — les migrations Alembic doivent tourner en `postgres`
- En prod : on peut séparer encore plus (app vs migrations vs analytics)
-->

---
layout: default
---

## Extension pgvector

```sql {1-2|4-5|7-13|all}
-- Connecté à la base `rag`
CREATE EXTENSION IF NOT EXISTS vector;

-- Vérification
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';

-- Table chunks pour embeddings Mistral (1024 dimensions)
CREATE TABLE chunks (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1024)
);

CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
```

<div class="text-xs opacity-85 mt-3">

- **HNSW** = Hierarchical Navigable Small World, index de référence pour ANN
- **IVFFlat** = alternative, plus lent à build mais OK pour très gros volumes

</div>

<div class="text-xs opacity-60 mt-2 border-l-4 border-[#f59e0b] pl-3">
🪤 Si l'extension échoue : console → Cloud SQL → Instance → Flags → <code>cloudsql.enable_pgvector = on</code>
</div>

<!--
- Mistral mistral-embed = 1024 dims, OpenAI text-embedding-3-small = 1536 dims
- Erreur typique : déclarer `vector(768)` alors qu'on utilise un embedding 1024 → index inutilisable
- HNSW est le choix par défaut en 2026
-->

---
layout: default
---

## Connecter Cloud Run à Cloud SQL

```mermaid {scale: 0.55}
graph LR
    CR[Cloud Run<br/>rag-api] -->|/cloudsql/...<br/>socket Unix| C[Cloud SQL Connector<br/>intégré]
    C --> DB[(Cloud SQL<br/>Postgres + pgvector)]
    style CR fill:#10b981,color:#fff
    style DB fill:#457b9d,color:#fff
    style C fill:#f59e0b,color:#fff
```

<div class="text-xs opacity-85 mt-3">

**3 étapes** :

1. Donner `roles/cloudsql.client` à la SA Cloud Run
2. `--add-cloudsql-instances` au déploiement
3. Env vars : `DB_HOST=/cloudsql/<connection-name>`

</div>

<div class="text-xs opacity-60 mt-3">
✅ <strong>Pas d'IP publique</strong>, pas de SSL à configurer, pas de Cloud SQL Auth Proxy à exécuter — tout est managé.
</div>

<!--
- Le socket Unix est invisible côté code, mais c'est ce qui fait la magie
- Pas d'IP publique = surface d'attaque réduite + latence + faible
- En projet client multi-VPC : Private Service Connect remplace ce setup
-->

---
layout: default
---

## DSN côté code

```python {1-5|7-13|all}
# Variables injectées par Cloud Run
import os
host = os.environ["DB_HOST"]   # /cloudsql/simplon-rag-prod:europe-west1:rag-db
db   = os.environ["DB_NAME"]   # rag
user = os.environ["DB_USER"]   # rag_app
pwd  = os.environ["DB_PASSWORD"]  # depuis Secret Manager

# Le socket Unix nécessite la syntaxe ?host=...
from sqlalchemy.ext.asyncio import create_async_engine
dsn = f"postgresql+asyncpg://{user}:{pwd}@/{db}?host={host}"
engine = create_async_engine(dsn)
```

<div class="text-xs opacity-85 mt-3">

Côté `gcloud run deploy` :

</div>

```bash
gcloud run services update rag-api \
  --add-cloudsql-instances=simplon-rag-prod:europe-west1:rag-db \
  --update-env-vars=DB_HOST=/cloudsql/simplon-rag-prod:europe-west1:rag-db,\
DB_NAME=rag,DB_USER=rag_app \
  --update-secrets=DB_PASSWORD=db-password:latest
```

<!--
- La syntaxe @/db?host=... est spécifique à SQLAlchemy + socket Unix
- En sync SQLAlchemy : remplacer asyncpg par psycopg2
- pgbouncer en sidecar : pas nécessaire avec Cloud Run + Cloud SQL Connector (pool géré)
-->

---
layout: default
---

## Cloud SQL Auth Proxy (local dev)

<div class="text-xs opacity-85 mt-2">
Pour <strong>développer / migrer en local</strong>, on utilise le Cloud SQL Auth Proxy.
</div>

```bash {1-3|5-6|8-9|all}
# Télécharger le proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.13.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy

# Lancer (port 5432 local → Cloud SQL)
./cloud-sql-proxy simplon-rag-prod:europe-west1:rag-db

# Dans un autre terminal
psql "postgresql://rag_app:$APP_PWD@127.0.0.1:5432/rag"
```

<div class="text-xs opacity-85 mt-3">

S'authentifie via <code>gcloud auth application-default login</code>.

</div>

<div class="text-xs opacity-60 mt-2 border-l-4 border-[#10b981] pl-3">
🎯 <strong>Idéal pour Alembic</strong> : <code>alembic upgrade head</code> depuis ton poste contre Cloud SQL, comme si c'était localhost.
</div>

<!--
- Le proxy est le seul moyen propre de migrer depuis le poste local
- Pas besoin d'ouvrir l'IP publique de Cloud SQL
- En CI : on peut aussi lancer le proxy avant les migrations
-->

---
layout: default
---

## Backups + pièges classiques

<div class="grid grid-cols-2 gap-4 mt-2 text-xs">

<div class="border-l-4 border-[#457b9d] pl-3">
<div class="font-bold mb-1 text-[#457b9d]">Backups</div>
<ul class="list-none space-y-1 opacity-85">
<li>Quotidiens auto (rétention 7 j par défaut)</li>
<li>PITR — restauration à la minute, ⚠️ <strong>désactivé en db-f1-micro</strong></li>
<li>Restauration sur nouvelle instance</li>
</ul>

```bash
gcloud sql backups list --instance=rag-db
gcloud sql backups restore <ID> \
  --restore-instance=rag-db-restore
```

</div>

<div class="border-l-4 border-[#e63946] pl-3">
<div class="font-bold mb-1 text-[#e63946]">Pièges classiques</div>
<ul class="list-none space-y-1 opacity-85">
<li><code>Cloud SQL connector failed: forbidden</code> → SA sans <code>roles/cloudsql.client</code></li>
<li>Timeout en local → proxy pas lancé / mauvais Instance Connection Name</li>
<li><code>pgvector not allowed</code> → flag <code>cloudsql.enable_pgvector</code></li>
<li>Migrations 10 s/ligne → SSL via IP publique, passer en socket Unix</li>
</ul>
</div>

</div>

<!--
- Rétention 7 j = config formation. En prod : 30 j minimum.
- PITR vital pour la prod : récupérer un état d'il y a 12 min après un DROP TABLE
-->

---
hideInToc: true
layout: center
---

# Recap Module 4

<div class="text-sm opacity-85 mt-6 max-w-2xl mx-auto text-left">

✅ **Cloud SQL Postgres** = DBaaS managé, instance prête en 5 min
✅ **Tier `db-f1-micro`** = formation. En prod, viser `db-custom-2-7680`+
✅ **pgvector** = `CREATE EXTENSION vector` + table + index HNSW
✅ **User `rag_app`** dédié, droits minimaux (jamais `postgres`)
✅ **Cloud Run ↔ Cloud SQL** = socket Unix via `--add-cloudsql-instances`
✅ **Cloud SQL Auth Proxy** = pour Alembic / dev local
✅ **PITR désactivé** en `db-f1-micro` — à activer en prod

</div>

<div class="text-xs opacity-60 mt-8">→ Atelier mercredi PM : créer l'instance + pgvector + connecter Cloud Run</div>

<!--
- À l'issue, chaque binôme a `rag-db` créé + pgvector actif + connexion Cloud Run validée
- C'est la base technique du brief : sans Cloud SQL, pas de RAG
-->
