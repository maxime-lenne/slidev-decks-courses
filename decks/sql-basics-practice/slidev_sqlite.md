---
theme: default
layout: cover
title: Introduction à SQLite
subtitle: Installation • Premières requêtes • Exercices
---

# Introduction à SQLite
### Installation · Commandes · Exercices SQL
Base fournie : **formation.db**

---

# 🎯 Objectifs pédagogiques

- Installer SQLite (macOS / Linux / Windows)
- Ouvrir et explorer une base existante
- Utiliser la ligne de commande SQLite
- Réaliser les 20 premières requêtes SQL (SELECT → INSERT → UPDATE → DELETE)

---

# 📦 Ressource fournie
Téléchargez la base SQLite :  
👉 **formation.db**

---

# 🚀 Installation de SQLite

---

## macOS
SQLite est **déjà installé**.

Vérifier la version :

```bash
sqlite3 --version
```

---

## Linux
Souvent préinstallé.  
Installer si besoin :

```bash
sudo apt install sqlite3
```

---

## Windows

1. Télécharger `sqlite-tools` depuis sqlite.org  
2. Extraire l’archive  
3. (Optionnel) Ajouter le dossier au PATH  

Vérifier :

```powershell
sqlite3 --version
```

---

# 🛠️ Démarrer avec SQLite (CLI)

---

## Ouvrir la base fournie

```bash
sqlite3 formation.db
```

---

## Commandes utiles
Lister les tables :

```sql
.tables
```

Voir la structure :

```sql
.schema clients
```

Lire des données :

```sql
SELECT * FROM clients LIMIT 5;
```

Quitter SQLite :

```
.quit
```

---

# 🧪 Exercices SQL — SELECT (1 → 10)
### *But : découvrir et lire les données*

---

## Exercice 1  
Afficher **tous les clients**.

---

## Exercice 2  
Afficher les **noms et villes** des clients.

---

## Exercice 3  
Afficher les clients habitant **Lille**.

---

## Exercice 4  
Trier les clients du **plus âgé au plus jeune**.

---

## Exercice 5  
Afficher les **5 premiers clients**.

---

## Exercice 6  
Afficher les clients ayant **plus de 18 ans**.

---

## Exercice 7  
Afficher le **montant et la date** des commandes.

---

## Exercice 8  
Trier les commandes de la **plus chère à la moins chère**.

---

## Exercice 9  
Compter le **nombre total** de clients.

---

## Exercice 10  
Afficher pour chaque commande :  

- nom du client  
- montant  
- date  
*(JOIN simple)*

---

# ✍️ Exercices SQL — INSERT / UPDATE / DELETE (11 → 20)
### *But : manipuler et modifier les données*

---

## Exercice 11 — INSERT  
Ajouter un client :  
**“Karim Diallo”, Marseille, 30 ans**

---

## Exercice 12 — INSERT multiple  
Ajouter les produits :  

- Clé USB 32Go – 12.90  
- Tapis de souris – 7.50  
- Microphone USB – 39.00  

---

## Exercice 13 — UPDATE  
Modifier la ville de **Emma Bernard** → Nice

---

## Exercice 14 — UPDATE multiple  
Augmenter de **10%** les produits à **moins de 50€**.

---

## Exercice 15 — UPDATE multiple  
Changer tous les clients de **Lille** → **Roubaix**

---

## Exercice 16 — DELETE  
Supprimer le produit **“Webcam HD”**.

---

## Exercice 17 — DELETE multiple  
Supprimer les clients vivant à **Lyon**.

---

## Exercice 18 — DELETE multiple  
Supprimer les commandes dont le total > **250€**.

---

## Exercice 19 — DELETE via sous-requête  
Supprimer toutes les commandes du client **“David Moreau”**.

---

## Exercice 20 — UPDATE ciblé  
Réduire de **20%** toutes les commandes du client **“Camille Leroy”**.

---

# 🎉 Fin
Merci !  
Place maintenant à la pratique SQL.
