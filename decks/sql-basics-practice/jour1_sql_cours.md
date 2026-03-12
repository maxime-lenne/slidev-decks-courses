# Jour 1 — Cours SQL & Bases Relationnelles

## 🎯 Objectifs du jour

- Comprendre ce qu’est une base de données relationnelle  
- Comprendre les relations (has one / has many / belongs to)  
- Installer SQLite et exécuter des requêtes  
- Utiliser SELECT, WHERE, ORDER BY  
- Manipuler les données avec INSERT, UPDATE, DELETE  

---

# 🟦 1. Introduction aux bases de données relationnelles

## Pourquoi une base de données ?

- Éviter les doublons  
- Assurer la cohérence  
- Organiser proprement les données  
- Gérer des volumes croissants  

## Tables, colonnes, lignes
Une base contient :

- **Tables**
- **Colonnes**
- **Lignes**
- **Clés primaires (PK)**
- **Clés étrangères (FK)**

---

# 🟧 2. Relations — has one / has many / belongs to

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

# 🟨 3. Installation SQLite

## macOS
SQLite est déjà installé.

```
sqlite3 --version
```

## Linux

```
sudo apt install sqlite3
```

## Windows

1. Télécharger sqlite-tools  
2. Extraire  
3. Vérifier :

```
sqlite3 --version
```

---

# 🟦 4. Démarrer avec SQLite (CLI)

Ouvrir la base :

```
sqlite3 formation.db
```

Lister les tables :

```
.tables
```

Voir la structure :

```
.schema clients
```

Quitter :

```
.quit
```

---

# 🟩 5. Les requêtes SELECT

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

# 🟪 6. Exercices SELECT (10 exos)

1. Afficher tous les clients  
2. Afficher les noms + villes  
3. Clients habitant Lille  
4. Trier par âge décroissant  
5. Afficher les 5 premiers clients  
6. Clients > 18 ans  
7. Montant + date des commandes  
8. Trier les commandes par prix  
9. Compter les clients  
10. JOIN simple client + commandes  

---

# 🟥 7. INSERT — ajouter des données

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

# 🟦 8. UPDATE — modifier des données

## UPDATE simple

```
UPDATE clients
SET ville = 'Lyon'
WHERE id = 4;
```

## UPDATE multiple

```
UPDATE produits
SET prix = prix * 1.10
WHERE prix < 50;
```

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

# 🟧 9. DELETE — supprimer des données

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
