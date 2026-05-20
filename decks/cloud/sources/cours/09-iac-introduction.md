# Cours 09 — Introduction à l'Infrastructure as Code (IaC)

> **Durée indicative** : 1h — Mardi matin
> **Pré-requis** : cours 01 (concepts cloud), Git, YAML
> **Référence principale** : <https://blog.stephane-robert.info/docs/cloud/iaac/>

## 🎯 Objectifs

À la fin du cours, l'apprenant·e doit savoir :

1. Expliquer pourquoi on automatise l'infrastructure.
2. Distinguer **déclaratif vs impératif**, **immutable vs mutable**.
3. Citer les outils principaux (Terraform, Pulumi, Ansible, Crossplane) et savoir lequel pour quoi.
4. Comprendre le concept de **GitOps** et son intérêt pour la traçabilité.

---

## 1. Pourquoi automatiser ?

Cas concret : tu as déployé la stack RAG de la semaine précédente sur GCP. La
production tourne. Trois mois plus tard :

- Un autre formateur veut **reproduire l'environnement** pour un autre groupe.
- Tu dois **changer la région** (`europe-west1` → `europe-west9` Paris) pour
  conformité RGPD.
- Tu veux un **environnement de staging** identique à la prod pour tester.

Trois options :

| Option | Coût | Risque |
|--------|------|--------|
| Reclicker dans la console GCP | 4 h | Très haut (oubli, dérive) |
| Reproduire à partir d'un Google Doc | 2 h | Haut (docs périmées) |
| Réexécuter `terraform apply` | 5 min | Bas (versionné, testé) |

> **IaC = décrire l'infra dans du code, versionner ce code, et laisser un
> outil le matérialiser de manière reproductible.**

Bénéfices :

- **Reproductibilité** — même `apply`, même résultat
- **Auditabilité** — `git log` = qui a changé quoi quand pourquoi
- **Revue** — Pull Request = revue par un pair avant prod
- **Rollback** — `git revert` + `apply`
- **Documentation vivante** — le code *est* la documentation

---

## 2. Déclaratif vs impératif

### Impératif (le « comment »)

```bash
# Bash impératif
gcloud compute instances create vm1 --zone=europe-west1-b
gcloud compute firewall-rules create allow-http --allow=tcp:80
```

L'utilisateur dit **chaque étape**. Si l'étape échoue à mi-parcours, l'état est partiel.

### Déclaratif (le « quoi »)

```hcl
# Terraform déclaratif
resource "google_compute_instance" "vm1" {
  name         = "vm1"
  machine_type = "e2-small"
  zone         = "europe-west1-b"
}

resource "google_compute_firewall" "allow_http" {
  name    = "allow-http"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
}
```

L'utilisateur décrit **l'état final souhaité**. L'outil calcule les étapes (`plan`)
puis les exécute (`apply`) de manière idempotente.

> ✅ **À retenir** : pour de l'infra cloud, on préfère le déclaratif (Terraform,
> Pulumi). Pour de la configuration d'OS / d'app, on peut tolérer l'impératif (Ansible).

---

## 3. Immutable vs mutable infrastructure

| | Mutable | Immutable |
|---|---------|-----------|
| Principe | On modifie un serveur existant | On en crée un nouveau et on jette l'ancien |
| Outil typique | Ansible, Chef, Puppet | Packer, Docker, AMI |
| Risque de dérive | Élevé (« snowflake servers ») | Très faible |
| Temps de déploiement | Court (patch SSH) | Plus long (reconstruire l'image) |
| Rollback | Compliqué | Trivial (redéployer l'ancienne image) |

Pour un Dev IA, **les conteneurs Docker sont des artefacts immutables**. Tu ne
modifies pas un Cloud Run en SSH, tu redéploies une nouvelle révision.

---

## 4. Le paysage des outils IaC en 2026

```text
                          ┌─ Provisioning ─┐    ┌─ Configuration ─┐
        Déclaratif        │ Terraform      │    │                 │
                          │ OpenTofu       │    │ —               │
                          │ Pulumi         │    │                 │
                          │ Crossplane     │    │                 │
                          └────────────────┘    └─────────────────┘
        Impératif         ┌────────────────┐    ┌─────────────────┐
                          │ AWS CDK        │    │ Ansible         │
                          │ Cloud SDK      │    │ Chef / Puppet   │
                          │ Scripts bash   │    │                 │
                          └────────────────┘    └─────────────────┘
                          ↑                       ↑
                          Quoi créer ?            Comment le configurer ?
```

### Terraform / OpenTofu

L'outil de référence. Décrit l'infra en HCL (HashiCorp Configuration Language).

```hcl
provider "google" {
  project = "simplon-rag-prod"
  region  = "europe-west1"
}

resource "google_cloud_run_v2_service" "rag_api" {
  name     = "rag-api"
  location = "europe-west1"

  template {
    containers {
      image = "europe-west1-docker.pkg.dev/simplon-rag-prod/images/rag-api:v1.0.0"
    }
  }
}
```

> 📌 **OpenTofu** = fork open-source de Terraform créé après le changement de
> licence de HashiCorp en 2023. Drop-in replacement.

### Pulumi

Même principe que Terraform mais on écrit en **Python / TypeScript / Go**. Utile
quand on veut composer dynamiquement.

```python
# Pulumi en Python
import pulumi
import pulumi_gcp as gcp

service = gcp.cloudrunv2.Service(
    "rag-api",
    location="europe-west1",
    template={"containers": [{"image": "europe-west1-docker.pkg.dev/.../rag-api:v1"}]}
)
```

### Crossplane

IaC dans un cluster Kubernetes (« infrastructure as YAML »). Très adopté en plateforme
interne.

### Ansible

Pas vraiment de l'IaC au sens « provisioning » mais souvent associé. Idéal pour
configurer un OS, déployer des applis sur des VM existantes.

---

## 5. GitOps : la suite logique

> **GitOps = utiliser Git comme source de vérité unique pour l'infra et les déploiements.**

Principe :

```text
1. Un dev pousse un commit dans un repo `infra/`
2. Un CI (GitHub Actions, GitLab CI) lance `terraform plan` automatiquement
3. Le `plan` est posté en commentaire de la Pull Request
4. Un pair revue et approuve
5. Au merge sur `main`, le CI lance `terraform apply`
6. L'état réel converge vers l'état Git
```

Outils dédiés : **Atlantis** (Terraform), **ArgoCD / Flux** (Kubernetes), **Spacelift**, **Env0**.

Bénéfice énorme pour la **séparation des responsabilités** : un dev peut proposer un
changement infra sans avoir les droits IAM pour l'appliquer, le robot CI a les droits.

---

## 6. À l'échelle de cette formation

Cette semaine, on ne fera **pas** d'IaC dans le brief (pour ne pas trop charger).
On déploiera **à la main** via la console GCP et `gcloud`, puis on automatisera
**avec GitHub Actions** (cours 08).

La semaine N+1 pourra reprendre **Terraform** pour reprovisionner toute la stack
en 1 commande, et c'est à cet endroit que la valeur de l'IaC sera la plus claire.

> 🧠 **Pour aller plus loin tout de suite** : essayer de reproduire la création
> manuelle d'aujourd'hui en Terraform demain soir. Le « avant / après » est
> très formateur.

---

## 7. Exercices

1. Reformule chacune de ces phrases en mode **déclaratif** ou **impératif** :
   - « Lancer la commande `gcloud sql instances create rag-db --tier=db-f1-micro` »
   - « Avoir exactement 1 instance Cloud SQL nommée `rag-db`, tier `db-f1-micro` »
2. Tu veux qu'un nouveau apprenant·e puisse cloner ton repo et reconstruire
   *exactement* ton environnement Cloud Run + Cloud SQL + GCS en 1 commande.
   Qu'as-tu besoin de versionner ? Que ne dois-tu **jamais** versionner ?
3. Pourquoi l'idempotence est-elle une propriété si importante d'un outil d'IaC ?

---

## 🔗 Ressources

- [Stéphane Robert — IaC](https://blog.stephane-robert.info/docs/cloud/iaac/)
- [Terraform Docs](https://developer.hashicorp.com/terraform/docs)
- [OpenTofu](https://opentofu.org/)
- [Pulumi Docs](https://www.pulumi.com/docs/)
- [GitOps principles (OpenGitOps)](https://opengitops.dev/)
- [Crossplane](https://www.crossplane.io/)
