# Cours 06 — Cloud Storage (GCS)

> **Durée indicative** : 45 min cours + atelier intégré — Mercredi après-midi
> **Pré-requis** : cours 03 (GCP), cours 04 (Cloud Run)

## 🎯 Objectifs

1. Comprendre la notion de **stockage objet** vs stockage bloc / fichier.
2. Créer un **bucket** GCS et y déposer des fichiers.
3. Gérer les **classes de stockage** (Standard, Nearline, Coldline, Archive).
4. Générer une **signed URL** pour partager un objet privé.
5. Lire / écrire depuis un Cloud Run (équivalent S3 sur AWS).

---

## 1. Stockage objet, c'est quoi ?

Trois familles de stockage cloud :

| Type | Exemple | Usage |
|------|---------|-------|
| **Bloc** | Persistent Disk, AWS EBS | Disque pour une VM, base de données |
| **Fichier** | Filestore, AWS EFS | Partage NFS multi-host |
| **Objet** | **GCS**, AWS S3, Azure Blob | Fichiers immuables (PDF, images, modèles ML, backups) |

Le stockage objet est :

- **Plat** : pas de vrais dossiers, juste des clés (`logs/2026/05/15/access.log`).
  Les « dossiers » sont une illusion d'IHM.
- **Immuable** par défaut : on ne « modifie » pas un objet, on en met un nouveau.
- **Très scalable** : pétaoctets, milliards d'objets.
- **Pas conçu pour des lectures haute fréquence** : 10 req/s par objet = OK,
  10000 req/s = il faut un CDN devant.

Pour le brief : on va stocker les **PDFs sources** du corpus RAG dans un bucket GCS,
plutôt que de les inclure dans l'image Docker (mauvaise pratique).

---

## 2. Buckets et classes de stockage

### Un bucket = un namespace global

Le nom de bucket est **unique mondialement** (pas seulement dans ton projet).
Conséquence : prefix-toi pour éviter les collisions.

```bash
gcloud storage buckets create gs://simplon-rag-corpus-prod \
  --location=europe-west1 \
  --uniform-bucket-level-access \
  --default-storage-class=STANDARD
```

### Classes de stockage

| Classe | Coût/Go/mois | Min. retention | Usage |
|--------|--------------|----------------|-------|
| **Standard** | ~ 0,020 $ | aucun | Accès fréquent (corpus actif) |
| **Nearline** | ~ 0,010 $ | 30 jours | Backup, accès < 1×/mois |
| **Coldline** | ~ 0,004 $ | 90 jours | Archives, accès < 1×/trimestre |
| **Archive** | ~ 0,0012 $ | 365 jours | Conformité, jamais lu sauf incident |

> 💰 **Coût caché** : sur Nearline / Coldline / Archive, **chaque lecture est facturée**
> (en plus du stockage). Pas adapté à un usage applicatif au quotidien.

### Lifecycle

On peut déplacer automatiquement les objets : Standard → Nearline après 30 jours
→ Coldline après 90 jours → suppression après 365 jours.

```json
{
  "lifecycle": {
    "rule": [
      {"action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
       "condition": {"age": 30}},
      {"action": {"type": "Delete"},
       "condition": {"age": 365}}
    ]
  }
}
```

```bash
gcloud storage buckets update gs://simplon-rag-corpus-prod \
  --lifecycle-file=lifecycle.json
```

---

## 3. Uniform vs Fine-grained access

Deux modes d'IAM sur les buckets :

| Mode | Quand l'utiliser |
|------|------------------|
| **Uniform** (recommandé) | IAM appliqué au bucket. Tous les objets héritent. |
| **Fine-grained** (legacy ACL) | IAM par objet. À éviter sauf besoin spécifique. |

> 📌 **Pour la formation** : toujours `--uniform-bucket-level-access`.

---

## 4. Charger / lister / télécharger

```bash
# Lister
gcloud storage ls gs://simplon-rag-corpus-prod/

# Upload
gcloud storage cp ./data/docs/*.pdf gs://simplon-rag-corpus-prod/corpus/

# Download
gcloud storage cp gs://simplon-rag-corpus-prod/corpus/rncp-2023.pdf .

# Suppression
gcloud storage rm gs://simplon-rag-corpus-prod/corpus/old.pdf
```

---

## 5. Depuis Python (Cloud Run)

Installer la lib :

```bash
pip install google-cloud-storage
```

Lecture / écriture :

```python
from google.cloud import storage

client = storage.Client()  # utilise les credentials du runtime (SA Cloud Run)
bucket = client.bucket("simplon-rag-corpus-prod")

# Upload
blob = bucket.blob("corpus/new-doc.pdf")
blob.upload_from_filename("./local.pdf")

# Download
blob = bucket.blob("corpus/rncp-2023.pdf")
blob.download_to_filename("./tmp/rncp-2023.pdf")

# Stream (utile pour gros fichiers)
with blob.open("rb") as f:
    data = f.read()
```

### Auth

Sur Cloud Run, **pas de clé JSON à fournir**. Le service utilise sa **service
account** (par défaut `<PROJECT_NUMBER>-compute@...`). Il faut lui donner
le rôle sur le bucket :

```bash
gcloud storage buckets add-iam-policy-binding gs://simplon-rag-corpus-prod \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

(Ou `roles/storage.objectViewer` si lecture seule.)

---

## 6. Signed URLs (partage temporaire)

Pour partager un PDF privé avec un utilisateur sans lui donner d'accès IAM :

```python
from datetime import timedelta

blob = bucket.blob("corpus/rncp-2023.pdf")
url = blob.generate_signed_url(
    version="v4",
    expiration=timedelta(minutes=15),
    method="GET",
)
print(url)  # https://storage.googleapis.com/...?X-Goog-Signature=...
```

L'URL contient une signature HMAC valable 15 min. Au-delà → 403.

> Usage classique : un frontend qui demande à l'API « donne-moi le PDF source
> de la citation 3 », l'API renvoie une signed URL, le frontend télécharge
> directement depuis GCS sans repasser par l'API.

---

## 7. Versioning et soft delete

Activer le versioning :

```bash
gcloud storage buckets update gs://simplon-rag-corpus-prod --versioning
```

Une suppression devient une « marque de tombstone », l'objet précédent est
conservé. Utile pour récupérer après une suppression accidentelle.

**Soft delete** (par défaut depuis 2024) : un objet supprimé reste récupérable
pendant **7 jours**. Activable jusqu'à 90 jours.

---

## 8. Pièges classiques

| Symptôme | Cause | Solution |
|---|---|---|
| `403 Forbidden` sur l'upload | SA sans rôle sur le bucket | Ajouter `roles/storage.objectAdmin` |
| Bucket public ouvert au monde | `allUsers` en `objectViewer` (parfois par mégarde) | Audit IAM bucket régulier |
| Latence variable sur les lectures | Région du bucket ≠ région du Cloud Run | Toujours co-localiser |
| Facture qui grimpe | Lectures intensives depuis Cloud Run (egress) | Cache local + signed URL |
| `Bucket name already exists` | Nom pris (global) | Préfixer (`simplon-<orga>-<projet>`) |

---

## 9. Atelier intégré (~30 min)

1. Créer un bucket `gs://simplon-<prenom>-corpus`.
2. Uploader 2 PDF de test.
3. Modifier le code de l'API RAG pour qu'au démarrage, elle télécharge les
   PDFs depuis GCS plutôt que de les avoir embarqués.
4. Redéployer l'API Cloud Run.
5. Vérifier que l'ingestion fonctionne avec les fichiers GCS.

---

## 🔗 Ressources

- [Cloud Storage docs](https://cloud.google.com/storage/docs)
- [Cloud Storage pricing](https://cloud.google.com/storage/pricing)
- [Stéphane Robert — Stockage cloud](https://blog.stephane-robert.info/docs/cloud/gcp/)
- [Best practices for Cloud Storage](https://cloud.google.com/storage/docs/best-practices)
- [`google-cloud-storage` Python](https://cloud.google.com/python/docs/reference/storage/latest)
