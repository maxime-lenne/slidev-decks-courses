# Quiz 01 — Concepts cloud (mardi midi)

> **Durée** : 30 min  •  **Format** : 15 QCM (1 point) + 2 ouvertes (5 points chacune)  •  **Total** : 25 points
> **À l'issue du cours `01-concepts-cloud.md` et `02-iac-introduction.md`**

Une seule bonne réponse par question, sauf indication contraire. Plusieurs réponses possibles = **mention explicite**.

---

## Partie A — QCM (15 × 1 pt)

### 1. Parmi ces caractéristiques, **laquelle n'est PAS** une des 5 caractéristiques essentielles du cloud selon le NIST ?

- [ ] A. On-demand self-service
- [ ] B. Broad network access
- [ ] C. **Stockage perpétuel et gratuit**
- [ ] D. Measured service
- [ ] E. Rapid elasticity

### 2. Sur un Cloud Run (CaaS), qui est responsable de patcher l'OS du noeud sous-jacent ?

- [ ] A. Toi (le développeur)
- [ ] B. **Google (le fournisseur)**
- [ ] C. C'est partagé selon le SLA
- [ ] D. Personne, il n'y a pas d'OS sur Cloud Run

### 3. Tu as une fonction Python qui doit être déclenchée à 3 h du matin chaque jour pour 30 s de traitement. Quel modèle XaaS est le plus économique ?

- [ ] A. IaaS (VM permanente)
- [ ] B. PaaS (App Engine)
- [ ] C. **FaaS (Cloud Functions)**
- [ ] D. SaaS

### 4. Quelle est la principale différence entre **PaaS** et **CaaS** ?

- [ ] A. Le PaaS coûte toujours plus cher
- [ ] B. **En PaaS, le runtime est imposé ; en CaaS, tu apportes ton container avec le runtime de ton choix**
- [ ] C. Le CaaS ne supporte que Python
- [ ] D. Le PaaS scale plus vite

### 5. Sur Cloud Run, si tu mets `--min-instances=0`, que se passe-t-il après 15 min sans trafic ?

- [ ] A. Le service reste actif et facturé
- [ ] B. **0 instance tourne, 0 € facturé**
- [ ] C. Le service est supprimé
- [ ] D. Une instance "spot" est lancée

### 6. Quel est l'avantage majeur de l'**immutable infrastructure** par rapport à la mutable ?

- [ ] A. C'est plus rapide
- [ ] B. **Pas de "snowflake servers", rollback trivial**
- [ ] C. C'est moins cher
- [ ] D. Ça marche sans Docker

### 7. Région vs Zone — laquelle de ces affirmations est **fausse** ?

- [ ] A. Une région contient plusieurs zones
- [ ] B. Une zone = un datacenter physique
- [ ] C. **Une zone contient plusieurs régions**
- [ ] D. La HA passe par la réplication multi-zone

### 8. Tu vois ce code Terraform :

```hcl
resource "google_storage_bucket" "logs" {
  name     = "my-logs"
  location = "EU"
}
```

C'est :

- [ ] A. De l'IaC impératif
- [ ] B. **De l'IaC déclaratif**
- [ ] C. Un script Bash
- [ ] D. Un fichier YAML

### 9. **Plusieurs réponses possibles** — Quels sont des avantages du GitOps ?

- [ ] A. **Traçabilité (qui a changé quoi)**
- [ ] B. **Revue par PR avant déploiement**
- [ ] C. Pas besoin de tests
- [ ] D. **Rollback via `git revert`**
- [ ] E. Coût d'infra inférieur

### 10. Le **shared responsibility model** dit que :

- [ ] A. Le fournisseur est responsable de tout, c'est le principe du cloud
- [ ] B. **Le partage des responsabilités dépend du modèle XaaS choisi**
- [ ] C. Tu es responsable de tout, le cloud n'apporte rien
- [ ] D. Seules les données sont à ta charge, jamais l'identité

### 11. Quel terme désigne le **trafic réseau qui sort de GCP vers Internet** ?

- [ ] A. Ingress
- [ ] B. **Egress**
- [ ] C. Throughput
- [ ] D. Backbone

### 12. Tu veux un cloud public, en France, sous juridiction française, certifié SecNumCloud. Quelle option ?

- [ ] A. AWS Frankfurt
- [ ] B. GCP `europe-west9` (Paris)
- [ ] C. Azure France Central
- [ ] D. **OVH SecNumCloud / Bleu / Numspot**

### 13. Sur un projet GCP de TP, quelle est la **première** mesure de sécurité à prendre ?

- [ ] A. Mettre en place un firewall
- [ ] B. Créer un VPC custom
- [ ] C. **Créer une alerte de budget**
- [ ] D. Activer Cloud Armor

### 14. Tu choisis `db-f1-micro` pour ta base Cloud SQL. Ce choix est adapté à :

- [ ] A. Production légère
- [ ] B. **Formation, prototypage**
- [ ] C. Workload BI 1To
- [ ] D. Streaming temps réel

### 15. Lequel de ces outils est **principalement** un outil de configuration management (impératif), pas un outil de provisioning ?

- [ ] A. Terraform
- [ ] B. Pulumi
- [ ] C. **Ansible**
- [ ] D. Crossplane

---

## Partie B — Questions ouvertes (2 × 5 pt)

### 16. *(5 pt)*
Tu dois héberger sur cloud public **un chatbot RAG** composé de : (a) une API
FastAPI, (b) une base Postgres + pgvector, (c) un corpus de 200 PDF, (d) un
frontend Streamlit, (e) un modèle d'embedding Mistral. Pour chacun des 5
composants, indique le **modèle XaaS** et le **service GCP** que tu choisirais,
en justifiant brièvement (1 phrase chacun).

### 17. *(5 pt)*
Explique en 5-6 phrases **pourquoi l'infrastructure as code** (Terraform ou
équivalent) est-elle préférable à **« cliquer dans la console GCP »** pour un
projet qui doit durer plus de 3 mois. Donne au moins 3 bénéfices concrets et
au moins 1 limite ou risque qu'apporte l'IaC.

---

## Corrigé (à ne montrer qu'après remise)

| Q | Réponse |
|---|---------|
| 1 | C |
| 2 | B |
| 3 | C |
| 4 | B |
| 5 | B |
| 6 | B |
| 7 | C |
| 8 | B |
| 9 | A, B, D |
| 10 | B |
| 11 | B |
| 12 | D |
| 13 | C |
| 14 | B |
| 15 | C |

**Q16 — éléments attendus** :
- API FastAPI → **CaaS** → **Cloud Run** (stateless, scale-to-zero)
- Postgres + pgvector → **DBaaS** → **Cloud SQL Postgres** (ou AlloyDB pour + de perf)
- 200 PDF → **Object storage** → **Cloud Storage (GCS)** (classe STANDARD, immuable)
- Frontend Streamlit → **CaaS** → **Cloud Run** (ou Cloud Run + Cloud CDN)
- Modèle d'embedding Mistral → **SaaS** (API Mistral hébergée)

**Q17 — éléments attendus** (au moins 3 bénéfices et 1 limite) :
- Reproductibilité (re-créer un env en 1 cmd)
- Auditabilité (`git log`)
- Revue par PR avant prod
- Rollback (`git revert` + `apply`)
- Documentation vivante
- Limites possibles : courbe d'apprentissage HCL, **fichier de state** à protéger
  (secrets, locking, drift), risque de "tout casser" en 1 `apply`, code IaC
  devient lui aussi à maintenir, modules / providers parfois en retard sur la doc.
