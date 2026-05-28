# Estimation des coûts GCP — Brief déploiement RAG

> Tarifs publics GCP 2026, région `europe-west1`, free tier inclus.
> Hypothèse : ~5 jours actifs, scale-to-zero la nuit (19 h → 8 h) + week-end.

---

## 💰 Estimation hebdomadaire

### MVP (Phases 1 → 5)

| Service | Configuration | Coût / semaine | Commentaire |
|---|---|---|---|
| **Cloud Run** `rag-api` | 1 GiB / 1 vCPU, max 5, min 0 | **~0 €** | Largement dans le free tier (2 M req, 360k vCPU-s, 180k GiB-s / mois) |
| **Cloud SQL** `rag-db` | `db-f1-micro` single zone + 10 Go SSD | **~2,50 – 3 €** | **Facturé 24/7**, pas de scale-to-zero — le poste principal |
| **Cloud Storage** | bucket Standard EU, ~50 Mo | **< 0,05 €** | |
| **Artifact Registry** | ~500 Mo d'images | **< 0,05 €** | |
| **Secret Manager** | 2 secrets, < 10k accès | **0 €** | Free tier |
| **Cloud Logging / Monitoring** natif Cloud Run | < 1 Go / sem | **0 €** | 50 Go / mois gratuits |
| **Egress** | < 1 Go | **0 €** | 1 Go / mois gratuit |
| **Total MVP** | | **~3 € / sem** | |

### Bonus

| Bonus | Coût / semaine | Commentaire |
|---|---|---|
| **Bonus 1 — Obs auto-hébergée Compute Engine** `e2-small` 24/7 + 10 Go disk | **~4 €** | À **stopper la nuit / WE** → ~2 € |
| **Bonus 2 — Obs managée GCP** | **~0 €** | Logs Cloud Run + log-based metrics + 1 dashboard restent gratuits |
| **Bonus 3 — Vertex AI** Gemini 1.5 Flash | **< 0,50 €** | < 1 M tokens en démo |

### Ordre de grandeur sur la semaine complète

- MVP seul : **~3 €**
- MVP + Bonus 1 (Compute Engine) : **~5 – 7 €**
- MVP + Bonus 2 : **~3 €**
- MVP + Bonus 3 : **~3,50 €**

→ Bien sous le **crédit gratuit 300 $** et sous le budget projet du brief.

---

## 🔌 Services à couper et commandes

Seuls **Cloud SQL** et **Compute Engine** facturent en idle.
Cloud Run / Storage / Artifact Registry / Secret Manager n'ont pas besoin d'être coupés.

### Cloud SQL — stopper / redémarrer

```bash
# Stop (le soir / vendredi soir)
gcloud sql instances patch rag-db --activation-policy=NEVER

# Start (le matin / lundi)
gcloud sql instances patch rag-db --activation-policy=ALWAYS

# Vérifier l'état
gcloud sql instances describe rag-db \
  --format="value(state,settings.activationPolicy)"
```

### Compute Engine (si Bonus 1) — stopper / redémarrer

```bash
# Stop
gcloud compute instances stop obs-vm --zone=europe-west1-b

# Start
gcloud compute instances start obs-vm --zone=europe-west1-b

# Lister les VM allumées
gcloud compute instances list --filter="status=RUNNING"
```

### Cloud Run — déjà scale-to-zero

Vérifier que `min-instances=0` (par défaut) :

```bash
gcloud run services update rag-api \
  --region=europe-west1 \
  --min-instances=0
```

### Tout couper en fin de formation (nettoyage complet)

```bash
# Cloud Run
gcloud run services delete rag-api --region=europe-west1 --quiet
gcloud run services delete rag-frontend --region=europe-west1 --quiet 2>/dev/null

# Cloud SQL (⚠️ supprime aussi les données)
gcloud sql instances delete rag-db --quiet

# Compute Engine (si Bonus 1)
gcloud compute instances delete obs-vm --zone=europe-west1-b --quiet

# Bucket corpus
gcloud storage rm --recursive gs://simplon-<binome>-corpus

# Artifact Registry
gcloud artifacts repositories delete rag-images \
  --location=europe-west1 --quiet

# Ou plus radical : supprimer tout le projet
gcloud projects delete simplon-rag-<binome>
```

---

## 🛑 Couper le projet entier

Deux approches selon ce qu'on veut faire.

### Option A — Détacher la facturation *(réversible, recommandé)*

Le compte de facturation est détaché du projet → la quasi-totalité des
services s'arrêtent immédiatement (Cloud Run, Cloud SQL, Compute Engine…),
**sans suppression de données**. Il suffit de re-rattacher la facturation
pour repartir.

```bash
# Lister les comptes de facturation
gcloud billing accounts list

# Voir le rattachement actuel du projet
gcloud billing projects describe simplon-rag-<binome>

# Couper la facturation
gcloud billing projects unlink simplon-rag-<binome>

# Re-rattacher
gcloud billing projects link simplon-rag-<binome> \
  --billing-account=0X0X0X-0X0X0X-0X0X0X
```

> ⚠️ Cloud SQL passe en `SUSPENDED` au bout de quelques minutes (données
> préservées). Cloud Storage reste accessible en lecture pendant ~30 j puis
> suppression progressive si la facturation n'est pas rétablie.

### Option B — Shutdown du projet *(soft delete, 30 j pour annuler)*

Le projet passe en `DELETE_REQUESTED` : tous les services sont stoppés et
plus rien n'est facturé. **30 jours pour annuler**, ensuite suppression
définitive et irréversible.

```bash
# Shutdown (« delete » côté gcloud, mais soft pendant 30 j)
gcloud projects delete simplon-rag-<binome>

# Annuler dans les 30 jours
gcloud projects undelete simplon-rag-<binome>

# Vérifier l'état du cycle de vie
gcloud projects describe simplon-rag-<binome> \
  --format="value(lifecycleState)"
```

### Quelle option choisir ?

| Cas | Solution |
|---|---|
| Pause d'un jour / week-end | `gcloud sql instances patch rag-db --activation-policy=NEVER` (cf. plus haut) |
| Pause longue (plusieurs semaines) | **Option A — unlink billing**, récupération en 10 s |
| Formation finie, on garde au cas où | **Option B — `gcloud projects delete`**, 30 j de marge |
| Nettoyage définitif | Laisser passer les 30 j après `delete` |

### Équivalents Console GCP

- **Couper la facturation** → `Billing → Account management → Disable billing`
- **Shutdown projet** → `IAM & Admin → Settings → SHUT DOWN`

---

## 🤖 Automatiser le stop / start

Plutôt que de penser à couper chaque soir, créer une **resource policy** Compute Engine :

```bash
# Créer un schedule "off à 19 h, on à 8 h, fuseau Paris, lundi → vendredi"
gcloud compute resource-policies create instance-schedule office-hours \
  --region=europe-west1 \
  --vm-start-schedule="0 8 * * 1-5" \
  --vm-stop-schedule="0 19 * * 1-5" \
  --timezone="Europe/Paris"

# L'attacher à la VM
gcloud compute instances add-resource-policies obs-vm \
  --zone=europe-west1-b \
  --resource-policies=office-hours
```

> Pour Cloud SQL, l'équivalent n'existe pas en natif : passer par
> **Cloud Scheduler → Cloud Functions** qui appelle l'API
> `instances.patch` avec `activationPolicy`.

---

## 📊 Vérifier la consommation

```bash
# Vue facturation rapide via la console
gcloud billing accounts list
gcloud beta billing projects describe simplon-rag-<binome>

# Export BigQuery de la facturation (recommandé pour analyse fine)
# → à activer une fois dans la console : Billing → Billing export
```

Astuce : la page **Billing → Reports** permet de filtrer par service et par
SKU, c'est le moyen le plus rapide d'identifier un coût qui dérape.
