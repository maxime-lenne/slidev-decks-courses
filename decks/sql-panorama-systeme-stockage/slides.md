---
theme: default
layout: cover
title: Panorama des systèmes de stockage
subtitle: Bases, usages & choix dans le développement IA
transition: fade
---

# Panorama des systèmes de stockage  
## Comprendre où et comment stocker les données  
### Relationnel • NoSQL • Fichiers • Colonnes • Vector Stores

---
transition: slide-left
layout: center
---

# 🎯 Objectifs du module

- Comprendre les grandes familles de systèmes de stockage  
- Savoir **quand** utiliser chaque type de base  
- Découvrir les usages clés dans le **développement IA**  
- Avoir une vision claire du rôle des **vector stores**  

---
transition: slide-left
---

# 📚 Les grandes familles

1. **Bases relationnelles (SQL)**  
2. **Document stores (NoSQL)**  
3. **Bases clé-valeur**  
4. **Bases orientées colonnes**  
5. **Bases orientées graphes**  
6. **Stockage fichiers / objets**  
7. **Vector stores (IA)**  

---
transition: slide-left
---

# 🟦 1. Bases relationnelles (SQL)

### Exemples  
- PostgreSQL  
- MySQL / MariaDB  
- SQLite  

### Caractéristiques
- Schéma structuré  
- Relations (PK/FK)  
- Requêtes puissantes (JOIN, GROUP BY)  
- Très bon pour : données structurées, cohérence forte

### Cas d’usage typiques
- CRM / ERP  
- Données métier  
- Analytics classiques  

---
transition: appear
---

# 🟦 Pourquoi c’est important pour l’IA ?

- Source principale des données “propres”  
- Utilisées pour entraîner des modèles tabulaires  
- Extraction / agrégation pour feature engineering  

---
transition: slide-left
---

# 🟧 2. Bases documentaires (NoSQL)

### Exemples  
- MongoDB  
- CouchDB  
- Firestore  

### Caractéristiques
- Stockage en **documents JSON**  
- Structure flexible  
- Pas de JOIN (ou limités)  
- Très bon pour données hétérogènes

### Usages
- APIs flexibles  
- Données semi-structurées  
- Applications mobiles / web rapides  

---
transition: slide-left
---

# 🟩 3. Clé-valeur (KV Stores)

### Exemples  
- Redis  
- Memcached  
- DynamoDB (mode KV)  

### Caractéristiques
- Ultra rapide  
- Lecture/écriture en O(1)  
- Idéal pour caches, sessions

### Usages
- Cache d’inférence IA  
- Stockage temporaire de tokens / sessions  
- Feature flags  

---
transition: slide-left
---

# 🟨 4. Bases orientées colonnes

### Exemples  
- BigQuery  
- ClickHouse  
- Apache Parquet / ORC  

### Caractéristiques
- Optimisées pour les **analyses massives**  
- Lecture par colonne (pas par ligne)  
- Très performantes en analytics

### Usages
- Data warehouses  
- Entrepôts de données IA  
- Préparation de datasets massifs  

---
transition: slide-left
---

# 🟪 5. Bases orientées graphes

### Exemples  
- Neo4j  
- TigerGraph  
- ArangoDB  

### Caractéristiques
- Données modélisées en **nœuds + arêtes**  
- Parfait pour relations complexes

### Usages
- Détection de fraude  
- Recommandation  
- Analyse de réseaux sociaux  

---
transition: slide-left
---
# 🟫 6. Stockage fichiers / objets

### Exemples
- AWS S3, MinIO  
- Google Cloud Storage  
- Azure Blob Storage  
- Systèmes locaux : disque, NAS, NFS  

### Caractéristiques
- Stocke des fichiers : JSON, CSV, images, vidéos, Parquet…  
- Scalabilité très forte  
- Idéal pour IA car supporte formats volumineux

### Usages
- Stockage datasets IA  
- Stockage de modèles (weights)  
- Pipelines ETL  

---
transition: slide-left
---

# 🔵 7. Vector Stores — très important en IA

### Exemples  
- **Supabase Vector**  
- Pinecone  
- Weaviate  
- Milvus  
- Chroma  

### Caractéristiques
- Stocke des **embeddings** sous forme de vecteurs  
- Permet la **recherche par similarité (cosine, euclidean)**  
- Base indispensable pour :  
  - RAG (Retrieval-Augmented Generation)  
  - Moteurs de recherche IA  
  - Classement / clustering  

---
transition: appear
---

# Pourquoi un Vector Store ?

- Comparer des textes, images, code, audio  
- Trouver des documents proches d’une requête  
- Mémoriser des conversations dans un chatbot  
- Fonctionner comme un “mémoire à long terme” pour IA  

---
transition: slide-left
---
# 📊 Où se situent-ils dans l’architecture ?

```
Données → Extraction → Embeddings → Vector Store → LLM
```

Ils ne **remplacent pas** les bases SQL  
Ils **complètent** les systèmes classiques  

---
transition: fade
---

# 🧠 Synthèse générale

| Type | Forces | Faiblesses | Cas d’usage |
|------|--------|------------|--------------|
| SQL | Cohérence, relations | Rigidité | Données métier |
| NoSQL | Flexible | Moins structuré | Apps modernes |
| KV | Ultra rapide | Clé unique | Cache |
| Colonnes | Analytics massif | Pas transactionnel | Data warehouse |
| Graphes | Relations complexes | Courbe d’apprentissage | Reco / fraude |
| Objets | Scalabilité | Pas de requêtes | Datasets IA |
| Vector Store | Similarité, RAG | Requêtes limitées | IA, embeddings |


---


| Usage / Type de base                     | SQL (Postgre/SQLite)        | NoSQL Document (Mongo)       | Clé-valeur (Redis)                | Colonnes (BigQuery/ClickHouse)            | Graphes (Neo4j)                         | Stockage Objet (S3/GCS)                  | Vector Store (Pinecone/Supabase Vector) |
|------------------------------------------|------------------------------|-------------------------------|-----------------------------------|---------------------------------------------|-------------------------------------------|--------------------------------------------|--------------------------------------------|
| **Lire un enregistrement par ID**        | ⭐⭐⭐⭐☆ (rapide avec index)   | ⭐⭐⭐⭐☆                        | ⭐⭐⭐⭐⭐ (O(1))                      | ⭐⭐☆☆☆                                      | ⭐⭐⭐☆☆                                    | ⭐☆☆☆☆ (latence réseau)                    | ⭐⭐☆☆☆                                      |
| **Écrire un enregistrement**             | ⭐⭐⭐⭐☆                        | ⭐⭐⭐⭐⭐ (flexible)             | ⭐⭐⭐⭐⭐ (mémoire)                   | ⭐⭐⭐⭐☆                                      | ⭐⭐⭐☆☆                                    | ⭐⭐☆☆☆ (objet complet)                     | ⭐⭐☆☆☆                                      |
| **Jointures complexes**                  | ⭐⭐⭐⭐⭐ (meilleur)            | ⭐⭐☆☆☆ (limité)              | ☆☆☆☆☆ (non supporté)             | ⭐☆☆☆☆ (faible)                              | ⭐⭐⭐⭐☆ (si relationnelle et profonde)     | ☆☆☆☆☆                                      | ⭐☆☆☆☆                                      |
| **Aggregations lourdes (SUM, AVG…)**     | ⭐⭐⭐⭐☆                        | ⭐⭐☆☆☆                        | ⭐☆☆☆☆                             | ⭐⭐⭐⭐⭐ (conçu pour analytics)                | ⭐⭐☆☆☆                                    | ☆☆☆☆☆                                      | ⭐⭐☆☆☆                                      |
| **Filtrer / trier des listes**           | ⭐⭐⭐⭐☆ (index)               | ⭐⭐⭐⭐☆                        | ⭐☆☆☆☆ (pas fait pour ça)         | ⭐⭐⭐⭐⭐                                      | ⭐⭐☆☆☆                                    | ☆☆☆☆☆                                      | ⭐⭐☆☆☆                                      |
| **Scalabilité horizontale**              | ⭐⭐☆☆☆ (possible mais dur)   | ⭐⭐⭐⭐☆                        | ⭐⭐⭐⭐⭐                             | ⭐⭐⭐⭐⭐                                      | ⭐⭐⭐⭐☆                                    | ⭐⭐⭐⭐⭐                                      | ⭐⭐⭐⭐☆                                      |
| **Latence moyenne**                      | ⭐⭐☆☆☆ ~ ⭐⭐⭐⭐☆ selon charge | ⭐⭐⭐☆                         | ⭐⭐⭐⭐⭐ (sub-ms)                    | ⭐⭐☆☆☆                                      | ⭐⭐☆☆☆                                    | ⭐☆☆☆☆ (100–300ms)                         | ⭐⭐☆☆☆                                      |
| **Volumes massifs (TB-PB)**              | ⭐⭐☆☆☆                       | ⭐⭐⭐⭐☆                        | ⭐⭐☆☆☆ (RAM limitée)              | ⭐⭐⭐⭐⭐ (spécialiste)                         | ⭐⭐⭐☆                                     | ⭐⭐⭐⭐⭐                                      | ⭐⭐⭐⭐☆                                      |
| **Flexibilité du schéma**                | ⭐☆☆☆☆ (rigide)              | ⭐⭐⭐⭐⭐ (schema-less)          | ⭐⭐⭐☆                              | ⭐⭐☆☆☆                                      | ⭐⭐⭐⭐☆                                    | ⭐⭐⭐⭐☆                                      | ⭐⭐⭐☆                                        |
| **Usage principal**                      | Données métier structurées   | Données semi-structurées     | Cache, sessions, lookup rapide    | Analytics, BI, data warehouse                | Graphe social, dépendances complexes      | Stockage de fichiers / datasets IA        | Recherche par similarité / RAG             |

---
transition: center
---

# 🎤 Questions pour débat
- Un LLM peut-il remplacer un moteur de recherche ?  
- Supabase Vector vs Pinecone : qu’est-ce qu’on privilégie pour un projet IA réel ?  
- Pourquoi une base SQL reste essentielle même en IA ?  

---
transition: fade
layout: center
---

# 🎉 Fin — Panorama des systèmes de stockage  
Prêt pour la mise en pratique !

