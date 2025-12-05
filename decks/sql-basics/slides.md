---
theme: ../../themes/simplon
title: SQL Basics
layout: cover
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---
# Jour 1 — Cours SQL & Bases Relationnelles

## 🎯 Objectifs du jour
- Comprendre ce qu’est une base de données relationnelle  
- Comprendre les relations (has one / has many / belongs to)  
- Installer SQLite et exécuter des requêtes  
- Utiliser SELECT, WHERE, ORDER BY  
- Manipuler les données avec INSERT, UPDATE, DELETE  

---

# 1. Introduction aux bases de données relationnelles

## Pourquoi une base de données ?
- Éviter les doublons  
- Assurer la cohérence  
- Organiser proprement les données  
- Gérer des volumes croissants  

---

# 1. Introduction aux bases de données relationnelles

## Tables, colonnes, lignes
Une base contient :
- **Tables**
- **Colonnes**
- **Lignes**
- **Clés primaires (PK)**
- **Clés étrangères (FK)**

---

# 2. Relations — has one / has many / belongs to

## has one (1 → 1)
Un utilisateur **a un** profil.

## has many (1 → n)
Un client **a plusieurs** commandes.

## belongs to (n → 1)
Une commande **appartient à** un client.  
→ La table qui contient la clé étrangère est celle qui *belongs to*.

### Schéma simple
```
Clients (1) ---- (n) Commandes
```

---

# 5. Les requêtes SELECT

## SELECT simple
```
SELECT * FROM clients;
```

## WHERE — filtrer
```
SELECT nom, ville FROM clients WHERE ville = 'Lille';
```

## ORDER BY — trier
```
SELECT nom, age FROM clients ORDER BY age DESC;
```

---

# 7. INSERT — ajouter des données

## INSERT simple
```
INSERT INTO clients (nom, ville, age)
VALUES ('Karim Diallo', 'Marseille', 30);
```

## INSERT multiple
```
INSERT INTO produits (nom, prix)
VALUES 
 ('Clé USB', 12.90),
 ('Tapis de souris', 7.50),
 ('Micro USB', 39.00);
```

⚠️ Eviter d'inserer un enregistrement avec id, les séquences sql le font pour nous.

---

# 7. INSERT — ajouter des données

## INSERT … SELECT
```
INSERT INTO archive_commandes (client_id, total, date)
SELECT client_id, total, date FROM commandes WHERE total > 200;
```

## SQLite : INSERT OR REPLACE
```
INSERT OR REPLACE INTO clients (id, nom, ville)
VALUES (3, 'Emma Bernard', 'Nice');
```

---

# 8. UPDATE — modifier des données

## UPDATE simple
```
UPDATE clients
SET nom = 'Karim Diallo',
    ville = 'Marseille',
    age = 31
WHERE id = 4;
```

## UPDATE multiple
```
UPDATE produits
SET prix = prix * 1.10
WHERE prix < 50;
```

---

# 8. UPDATE — modifier des données

## UPDATE sans WHERE (⚠️ dangereux)
```
UPDATE clients SET ville = 'Paris';
```

## UPDATE avec sous-requête
```
UPDATE commandes
SET total = total * 0.8
WHERE client_id = (SELECT id FROM clients WHERE nom = 'Camille Leroy');
```

---

# 9. DELETE — supprimer des données

## DELETE simple
```
DELETE FROM produits WHERE id = 5;
```

## DELETE multiple
```
DELETE FROM clients WHERE ville = 'Lyon';
```

## DELETE via sous-requête
```
DELETE FROM commandes
WHERE client_id = (SELECT id FROM clients WHERE nom = 'David Moreau');
```

## DELETE sans WHERE (⚠️ danger)
```
DELETE FROM commandes;
```

---

# 🎉 Fin — Demain : JOINS, GROUP BY, HAVING

