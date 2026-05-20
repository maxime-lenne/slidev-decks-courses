# Cours 01 — Les concepts du cloud computing

> **Durée indicative** : 1h30 — Mardi matin
> **Pré-requis** : avoir manipulé Docker (cours précédent), comprendre HTTP / TCP / un peu de Linux
> **Référence principale** : <https://blog.stephane-robert.info/docs/cloud/>

## 🎯 Objectifs

À la fin du cours, l'apprenant·e doit savoir :

1. Définir ce qu'est *« le cloud »* en évitant les pièges marketing.
2. Distinguer les **modèles de service** (IaaS, PaaS, SaaS, FaaS, CaaS, KaaS, DBaaS, BaaS).
3. Distinguer les **modèles de déploiement** (public, privé, hybride, multi-cloud, sovereign).
4. Comprendre le **shared responsibility model**.
5. Identifier ce qui change pour un Dev IA quand on passe « du local » au « cloud ».

---

## 1. Qu'est-ce que le cloud ?

> Le cloud, ce n'est pas « l'ordinateur de quelqu'un d'autre ». C'est **l'externalisation d'une partie de la chaîne d'exploitation IT**
> (matériel, hyperviseur, OS, runtime, application, données) à un fournisseur,
> facturée à l'usage, accessible via une API.

Définition officielle (**NIST SP 800-145**) — 5 caractéristiques essentielles :

1. **On-demand self-service** : je provisionne sans intervention humaine côté fournisseur.
2. **Broad network access** : accessible via Internet ou réseau privé.
3. **Resource pooling** : mutualisation des ressources physiques entre clients (multi-tenant).
4. **Rapid elasticity** : capacité de scaler en up/down rapidement (parfois automatiquement).
5. **Measured service** : facturation à la consommation (pay-as-you-go).

Si une des 5 caractéristiques manque → ce n'est pas du cloud, c'est de l'hébergement classique.

### Pourquoi on en parle autant en 2026 ?

- 60 % des nouvelles charges de travail naissent directement dans le cloud (Gartner).
- Les modèles d'IA générative consomment massivement du compute GPU, économique
  uniquement en location à l'heure / à la minute.
- Le « shift-left » de la production : un développeur déploie aujourd'hui ce
  qu'une équipe Ops devait provisionner pendant des semaines auparavant.

---

## 2. Les modèles de service (le fameux « XaaS »)

La pile classique du logiciel :

```text
Application      ← code métier
Données          ← BDD, fichiers
Runtime          ← Python, JVM, Node...
Middleware       ← Nginx, RabbitMQ...
OS               ← Linux, Windows
Hyperviseur      ← KVM, VMware
Hardware         ← serveurs, disques, réseau
```

À chaque modèle XaaS, **le fournisseur prend en charge une part de plus en plus large de la pile** :

| Modèle | Tu gères | Le fournisseur gère | Exemples | Cas d'usage typique |
|--------|----------|---------------------|----------|---------------------|
| **On-premise** | Tout | Rien | Tes serveurs au bureau | Compliance forte, charge stable |
| **IaaS** (Infrastructure as a Service) | OS + tout au-dessus | Hardware + hyperviseur | EC2, Compute Engine, OVH VPS | VM Linux pour un legacy |
| **CaaS** (Container as a Service) | L'image + sa config | OS + runtime conteneur | ECS, GKE, Cloud Run, Fargate | Déployer un container sans gérer le node |
| **KaaS** (Kubernetes as a Service) | Workloads K8s | Le control plane K8s | GKE, EKS, AKS | Microservices, plateforme interne |
| **PaaS** (Platform as a Service) | Code + données | OS + runtime + middleware | App Engine, Heroku, Railway | App web simple, prototypes |
| **DBaaS** (Database as a Service) | Schéma + requêtes | Engine + backups + HA | Cloud SQL, RDS, Atlas, Supabase | Postgres managé |
| **FaaS** (Function as a Service) | Une fonction | Tout le reste | Cloud Functions, Lambda | Webhooks, traitements ponctuels |
| **SaaS** (Software as a Service) | Rien (juste tes données métier) | Tout | Gmail, Notion, Mistral API | Outil métier sans installation |

### Comment choisir ?

> Heuristique de Stéphane Robert : « **Plus tu remontes dans la stack, moins tu gères, mais
> moins tu décides** ». À l'inverse, plus tu descends, plus tu es flexible mais plus tu portes la charge.

Questions à se poser pour choisir :

- Ai-je besoin d'un OS spécifique ou d'une configuration kernel particulière ? → IaaS
- Mon app est-elle conteneurisée et stateless ? → CaaS (Cloud Run, App Runner)
- Ai-je 10+ microservices avec des besoins de placement custom ? → KaaS
- Mon app est-elle un standard Rails / Django / Node sans particularité ? → PaaS
- Ai-je un usage ponctuel ou par burst ? → FaaS

### Le cas du Dev IA

| Besoin | XaaS recommandé |
|---|---|
| API qui sert un modèle (FastAPI) | **CaaS** (Cloud Run) — scale-to-zero, image Docker |
| Base vectorielle (pgvector, Qdrant) | **DBaaS** (Cloud SQL Postgres + pgvector, AlloyDB) |
| Inférence d'un LLM tiers (Mistral, OpenAI) | **SaaS** (API HTTP) |
| Inférence d'un LLM self-hosted (Mixtral, Llama) | **IaaS** GPU (Compute Engine A100/H100) ou **CaaS** GPU (Cloud Run GPU) |
| Stockage des PDFs / corpus | **Object Storage** (GCS) |
| Job d'entraînement | **FaaS** (Cloud Functions) ou Vertex AI Training |

---

## 3. Les modèles de déploiement

| Modèle | Description | Exemple |
|--------|-------------|---------|
| **Public** | Multi-tenant, sur l'infra du fournisseur, accessible via Internet | AWS, GCP, Azure |
| **Privé** | Mono-tenant, infra dédiée (sur site ou hébergée) | OpenStack on-prem, VMware Cloud Foundation |
| **Hybride** | Combinaison public + privé reliée par un lien réseau (VPN, Interconnect) | App publique, BDD on-prem |
| **Multi-cloud** | Plusieurs fournisseurs publics en parallèle | API sur GCP, ML sur AWS Sagemaker |
| **Sovereign / souverain** | Public mais isolé sous juridiction nationale | OVH SecNumCloud, Bleu (Microsoft+Capgemini+Orange) |

> ⚖️ **RGPD / Cloud Act** : un fournisseur soumis au droit américain (AWS, GCP,
> Azure) peut être contraint de transmettre des données aux autorités US, même
> si elles sont stockées en Europe. C'est la raison d'être des « sovereign cloud ».
> Pour un projet Simplon / centre de formation, on peut rester sur GCP / AWS / Azure
> sous réserve de **chiffrement applicatif** et de DPA conformes.

---

## 4. Shared responsibility model

> **Règle d'or** : *le cloud déplace la responsabilité, il ne la fait jamais disparaître.*

Schéma générique :

```text
                      IaaS      CaaS/PaaS      SaaS
Data                  [Toi]      [Toi]         [Toi]
Identité / accès      [Toi]      [Toi]         [Toi]
Réseau / firewall     [Toi]      [Partagé]     [Provider]
OS / patch            [Toi]      [Provider]    [Provider]
Hyperviseur           [Provider] [Provider]    [Provider]
Hardware              [Provider] [Provider]    [Provider]
Sécurité physique     [Provider] [Provider]    [Provider]
```

Conséquence concrète : **un bucket GCS ouvert au public, c'est ta faute, pas celle de GCP.**
C'est le scénario n°1 des incidents de fuite de données depuis 2018 (Capital One, Accenture, etc.).

### Ce qui reste à ta charge même en SaaS

- La **gouvernance** des accès (qui peut faire quoi)
- La **classification** de la donnée (qu'est-ce qui est sensible ?)
- Les **sauvegardes applicatives** (un SaaS sauvegarde sa plateforme, pas
  forcément tes données — cf. Microsoft 365 backup tiers)
- Le **monitoring fonctionnel** (un Cloud Run peut redémarrer en boucle, GCP
  ne te dira pas que ta logique métier est cassée)

---

## 5. Tarification (FinOps light)

Trois grandes familles :

1. **À la consommation** (pay-as-you-go) — défaut. Tu payes ce que tu consommes
   à la seconde / Go / requête.
2. **Engagement** (reserved instances, committed use discounts) — tu t'engages
   sur 1 à 3 ans, tu obtiens 20 à 60 % de réduction.
3. **Spot / preemptible** — capacité non garantie, peut être coupée à tout moment,
   60 à 90 % moins chère. Pour des jobs batchables uniquement.

> ⚠️ **Piège à formation** : un Cloud Run mal configuré (`min-instances=10`) ou
> un Cloud SQL qui tourne 24/7 sur un projet de TP peut coûter 200 € en un week-end.
> Toujours mettre une **alerte budget** dès la création du projet GCP.

### Que regarder pour optimiser ?

- **Egress** (sortie réseau) — gratuit en entrée, payant en sortie. ~ 0,12 $/Go.
  Une bête erreur d'archi inter-régions peut faire exploser la facture.
- **Stockage** — distinguer hot / cold / archive (cf. cours 06 sur GCS).
- **Compute idle** — un service Cloud Run qui scale-to-zero coûte 0 quand
  personne ne l'appelle. Une VM Compute Engine coûte 24/7.

---

## 6. Vocabulaire à connaître par cœur

| Terme | Sens |
|-------|------|
| **Région** | Zone géographique (`europe-west1` = Belgique). Plusieurs **zones** (datacenters) par région. |
| **AZ / Zone** | Datacenter physique isolé (`europe-west1-b`). HA = répliquer sur plusieurs zones. |
| **Tenant** | Un client logique. Multi-tenant = plusieurs clients sur la même infra physique. |
| **Control plane** | Le cerveau du service (API, scheduler). Géré par le provider en CaaS / KaaS. |
| **Data plane** | Là où tournent les workloads. Tu peux en avoir la main partielle. |
| **Egress / Ingress** | Sortie / entrée de trafic réseau. L'egress est ce qui coûte. |
| **SLA** | Service Level Agreement — engagement chiffré du provider (ex : Cloud Run 99,95 %). |
| **SLO / SLI** | Service Level Objective / Indicator — tes propres objectifs internes. |

---

## 7. Exercices de réflexion

> À discuter en groupe, 15 min.

1. Le chatbot RAG de la semaine précédente : si on devait l'héberger sur **un cloud
   public**, quels XaaS choisirais-tu pour chacun de ces composants ?
   - L'API FastAPI
   - Le frontend Streamlit
   - Postgres + pgvector
   - Les PDFs du corpus
   - Les logs / métriques
2. Un client te demande de garantir que **les données du corpus ne quittent jamais
   le territoire français**. Cite 2 stratégies, chacune avec ses limites.
3. Pourquoi un Cloud Run à scale-to-zero pourrait poser problème pour un service
   d'IA qui charge un gros modèle en mémoire au démarrage ? Quelles parades ?

---

## 🔗 Ressources

- [Stéphane Robert — Le cloud, c'est quoi ?](https://blog.stephane-robert.info/docs/cloud/)
- [NIST SP 800-145 — The NIST Definition of Cloud Computing](https://csrc.nist.gov/publications/detail/sp/800-145/final)
- [Cloud Native Computing Foundation — Landscape](https://landscape.cncf.io/)
- [The State of FinOps 2026](https://www.finops.org/insights/the-state-of-finops/)
