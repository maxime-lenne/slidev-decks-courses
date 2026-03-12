---
theme: ../../themes/maxime-lenne
title: Démo Thème Maxime Lenne
layout: cover
background: https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# SQL & Bases de Données

## Formation Simplon avec le thème Maxime Lenne

Jour 1 - Introduction

---
layout: section
---

# Introduction aux bases relationnelles

Comprendre les fondamentaux

---
layout: default
---

# Qu'est-ce qu'une base de données ?

## Définition

Une base de données est un **système organisé** de stockage d'informations permettant :

- La persistance des données
- L'accès concurrent
- La cohérence des informations
- La sécurité

<div class="highlight-box mt-4">
💡 Les bases relationnelles utilisent des tables liées entre elles
</div>

---
layout: two-cols
---

# Types de bases de données

::left::

## Relationnelles (SQL)

- PostgreSQL
- MySQL
- SQLite
- Oracle

**Avantages** :

- ACID compliance
- Schéma strict
- Requêtes complexes

::right::

## NoSQL

- MongoDB
- Redis
- Cassandra
- Neo4j

**Avantages** :

- Flexibilité
- Scalabilité horizontale
- Performance

---
layout: default
---

# Structure d'une base relationnelle

## Tables

| id | nom | email | age |
|----|-----|-------|-----|
| 1 | Alice | <alice@example.com> | 25 |
| 2 | Bob | <bob@example.com> | 30 |
| 3 | Charlie | <charlie@example.com> | 28 |

<div class="grid-2 mt-4">
  <div class="gradient-border">
    <div class="gradient-border-content">
      <strong>Clé primaire (PK)</strong><br>
      Identifiant unique de chaque ligne
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content">
      <strong>Clé étrangère (FK)</strong><br>
      Référence vers une autre table
    </div>
  </div>
</div>

---
layout: default
---

# Requêtes SQL de base

## SELECT

```sql
-- Sélectionner tous les utilisateurs
SELECT * FROM users;

-- Sélectionner avec filtre
SELECT nom, email
FROM users
WHERE age > 25;

-- Tri des résultats
SELECT * FROM users
ORDER BY age DESC;
```

<span class="badge">Lecture</span>
<span class="badge">Filtrage</span>
<span class="badge">Tri</span>

---
layout: center
---

# Les relations entre tables

**1:1** • **1:N** • **N:N**

---
layout: fact
---

# 3

Types de relations

---
layout: default
---

# Relations 1:1 (One-to-One)

Un utilisateur a **un** profil.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username VARCHAR(50)
);

CREATE TABLE profiles (
  id INTEGER PRIMARY KEY,
  user_id INTEGER UNIQUE, -- Clé étrangère unique
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

<div class="highlight-box">
🔑 La clé UNIQUE garantit la relation 1:1
</div>

---
layout: default
---

# Relations 1:N (One-to-Many)

Un client a **plusieurs** commandes.

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE commandes (
  id INTEGER PRIMARY KEY,
  client_id INTEGER,
  montant DECIMAL(10,2),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

<div class="highlight-box">
📦 Une commande appartient à UN client, mais un client peut avoir PLUSIEURS commandes
</div>

---
layout: quote
---

> "Les données sont le nouveau pétrole, mais contrairement au pétrole, les données ne s'épuisent jamais."
>
> — Clive Humby

---
layout: default
---

# Jointures (JOINS)

## Types de jointures

<div class="grid-3">
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <strong>INNER JOIN</strong><br>
      Correspondances exactes
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <strong>LEFT JOIN</strong><br>
      Toutes les lignes de gauche
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <strong>RIGHT JOIN</strong><br>
      Toutes les lignes de droite
    </div>
  </div>
</div>

```sql
-- INNER JOIN exemple
SELECT clients.nom, commandes.montant
FROM clients
INNER JOIN commandes ON clients.id = commandes.client_id;
```

---
layout: default
---

# Manipulation de données

## INSERT - Ajouter des données

```sql
INSERT INTO clients (nom, email)
VALUES ('Jean Dupont', 'jean@example.com');
```

## UPDATE - Modifier des données

```sql
UPDATE clients
SET email = 'nouveau@example.com'
WHERE id = 1;
```

## DELETE - Supprimer des données

```sql
DELETE FROM clients WHERE id = 1;
```

---
layout: section
---

# Bonnes pratiques

---
layout: default
---

# Principes de conception

## Les 3 formes normales

1. **1FN** : Atomicité des données
   - Pas de valeurs multiples dans une colonne

2. **2FN** : Dépendance fonctionnelle complète
   - Chaque colonne dépend de la clé primaire entière

3. **3FN** : Pas de dépendance transitive
   - Les colonnes ne dépendent que de la clé primaire

<div class="highlight-box">
✨ La normalisation réduit la redondance et améliore l'intégrité
</div>

---
layout: default
---

# Index et performance

## Pourquoi indexer ?

- **Accélère les recherches** : comme un index de livre
- **Optimise les jointures** : améliore les performances des JOIN
- **Ralentit les écritures** : mise à jour de l'index nécessaire

```sql
-- Créer un index
CREATE INDEX idx_email ON users(email);

-- Index composite
CREATE INDEX idx_nom_prenom ON users(nom, prenom);
```

<span class="badge">Performance</span>
<span class="badge">Optimisation</span>

---
layout: center
---

# À vous de jouer !

Exercices pratiques avec SQLite

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

# Merci !

## Questions ?

📧 <contact@maxime-lenne.fr>
