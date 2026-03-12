---
theme: ../../themes/simplon
layout: cover
background: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920
title: Jour 3 — Modélisation & Schema BDD / SQL
subtitle: MERISE • UML • SQL Schema • Index • Contraintes • DDL
transition: fade
---

# Jour 3  
## Modélisation & Schémas de Bases de Données  
### Méthodes : MERISE · UML · SQL (DDL)

---
transition: slide-left
layout: center
---

# 🎯 Objectifs pédagogiques

- Comprendre la modélisation conceptuelle & logique  
- Lire et créer un **MCD** (Merise)  
- Lire et créer un **diagramme UML de base**  
- Passer d’un modèle à un **schéma SQL** (DDL)  
- Comprendre les **contraintes** (PK, FK, UNIQUE, CHECK…)  
- Créer / modifier / supprimer des tables  
- Comprendre les **index** et leurs impacts  

---
transition: slide-left
---

# 🧩 Partie 1 — Modélisation MERISE

## MERISE = 3 niveaux

1. **MCD — Modèle Conceptuel des Données**  
2. **MLD — Modèle Logique des Données**  
3. **MPD — Modèle Physique des Données**  

---
transition: appear
---

# 🟦 MCD — Modèle conceptuel des données

### But :

- Décrire **les entités**  
- Décrire **les relations**  
- Définir **les cardinalités**  
- Pas de considération technique

### Exemple simple :

```
CLIENT (id, nom, ville, age)
COMMANDE (id, date)
PRODUIT (id, nom, prix)

Relations :
CLIENT 1,n COMMANDE
COMMANDE 1,n LIGNE_COMMANDE n,1 PRODUIT
```

---
transition: slide-left
---

# 🟦 Cardinalités MERISE

### Types :

- **(0,1)** optionnel  
- **(1,1)** obligatoire  
- **(0,n)** plusieurs optionnels  
- **(1,n)** plusieurs obligatoires  

### Exemple :

```
CLIENT (1,n) COMMANDE
→ un client peut avoir plusieurs commandes
→ une commande appartient à un seul client
```

---
transition: slide-left
---

# 🟦 MLD — Modèle logique

Transforme les entités et relations en **tables + clés étrangères**.

### Exemple :

```
CLIENT(id PK, nom, ville, age)
COMMANDE(id PK, client_id FK, date)
PRODUIT(id PK, nom, prix)
LIGNE_COMMANDE(id PK, commande_id FK, produit_id FK, quantite, prix_unitaire)
```

---
transition: slide-left
---

# 🟦 MPD — Modèle physique

Traduction en SQL (DDL)  
→ dépend du SGBD (SQLite, Postgres, MySQL…)

---
transition: fade
layout: center
---

# 🧩 Partie 2 — UML (diagrammes de classes)

---
transition: slide-left
---

# 🟧 UML pour les bases de données

UML utilise :

- **Classes** = tables  
- **Attributs** = colonnes  
- **Associations** = relations  
- Cardinalités : `1..1`, `0..*`, `1..*`  

---
transition: appear
---

# Exemple UML

```
+------------------+
|    Client        |
|------------------|
| id : int         |
| nom : string     |
| ville : string   |
| age : int        |
+------------------+

Client 1 --- * Commande
```

---
transition: slide-left
---

# UML vs MERISE

| Critère | MERISE | UML |
|--------|--------|------|
| Usage | SI, France | International, général |
| Niveau | Conceptuel | Conceptuel + logique |
| Graphique | Oui | Oui |
| Références | Entités/associations | Classes/associations |

---
transition: fade
layout: center
---

# 🧩 Partie 3 — Création de schéma SQL (DDL)

---
transition: slide-left
---

# 🟩 DDL : Data Definition Language  
### (Créer et structurer)

Commandes principales :

- **CREATE TABLE**  
- **ALTER TABLE**  
- **DROP TABLE**  
- **CREATE INDEX**  
- **DROP INDEX**

---
transition: slide-left
---

# 🟩 CREATE TABLE — Exemples

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  ville TEXT,
  age INTEGER CHECK(age >= 0)
);
```

```sql
CREATE TABLE commandes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

---
transition: slide-left
---

# 🟧 Contraintes SQL  
## Pourquoi ? Pour garantir la qualité des données

### Types :

- **PRIMARY KEY**
- **FOREIGN KEY**
- **UNIQUE**
- **CHECK**
- **NOT NULL**
- **DEFAULT**

---
transition: appear
---

# Exemples de contraintes

```sql
nom TEXT NOT NULL
prix REAL CHECK(prix > 0)
email TEXT UNIQUE
quantite INTEGER DEFAULT 1
```

---
transition: slide-left
---

# 🟥 FOREIGN KEY

Garantit que la valeur existe dans la table référencée.

```sql
FOREIGN KEY (client_id) REFERENCES clients(id)
```

Avec suppression en cascade (PostgreSQL / MySQL) :

```sql
FOREIGN KEY (client_id)
  REFERENCES clients(id)
  ON DELETE CASCADE
```

---
transition: fade
layout: center
---

# 🧩 Partie 4 — Index

---
transition: slide-left
---

# 🟪 Index — Pourquoi ?

### Avantages :

- Accélère les recherches  
- Accélère les JOIN  
- Accélère les filtres avec WHERE

### Inconvénients :

- Plus de stockage  
- Plus lent en insertion  

---
transition: slide-left
---

# Exemple d’index

```sql
CREATE INDEX idx_clients_ville
ON clients(ville);
```

Index sur plusieurs colonnes :

```sql
CREATE INDEX idx_cmd_client_date
ON commandes(client_id, date);
```

---
transition: fade
layout: center
---

# 🧩 Partie 5 — ALTER & DROP

---
transition: slide-left
---

# 🟫 ALTER TABLE — Modifier une table

### Ajouter une colonne :

```sql
ALTER TABLE clients
ADD COLUMN telephone TEXT;
```

### Renommer une colonne (SQLite) :

```sql
ALTER TABLE clients
RENAME COLUMN ville TO localisation;
```

---
transition: slide-left
---

# 🟥 DROP TABLE — Supprimer une table

```sql
DROP TABLE ligne_commandes;
```

⚠️ Action **définitive**  
⚠️ Supprime **toutes** les données  

---
transition: fade
layout: center
---

# 🧪 Atelier pratique — Jour 3

---
transition: slide-left
--

# Atelier : Créer votre Base de donnée

Créer le MCD d’une application simple de gestion de formation :

- Utilisateurs
- compétences
- Projets  
- Tâches  
- Commentaires  

🧱 Règles métier (extraits)
 1. Un commentaire doit toujours référencer une tâche et un auteur (apprenant).
 2. Une tâche appartient à un unique projet.
 3. Une participation lie un apprenant à un projet avec un rôle (et optionnellement un temps alloué).
 4. La maîtrise d’une compétence par un apprenant est versionnée par date, niveau atteint, et validateur (formateur/tuteur).
 5. Une tâche peut exiger plusieurs compétences avec un niveau attendu.
 6. Un apprenant ne peut avoir qu’une entrée active de maîtrise d’une compétence donnée à une date donnée.

---
transition: slide-left
---

# Atelier : Passer du MCD → MPD → SQL

## 1. MCD (entités + relations)

Objectifs :

- Entités  
- Attributs  
- Cardinalités  

## 2. MLD (tables + PK/FK)

## 3. SQL (CREATE TABLE)

---
transition: fade
layout: center
---

# 🎉 Fin du Jour 3  
Bravo !
