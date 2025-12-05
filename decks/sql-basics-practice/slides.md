---
theme: default
layout: cover
title: Introduction à SQLite
subtitle: Installation • Premières requêtes • Exercices
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
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

## macOS

SQLite est **déjà installé**. Vérifier la version :
```bash
sqlite3 --version
```

## Linux

Installer si besoin (Souvent préinstallé.) :
```bash
sudo apt install sqlite3
```

---

# 🚀 Installation de SQLite

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

## Ouvrir la base fournie
```bash
sqlite3 formation.db
```

## Commandes utiles
Lister les tables :
```sql
.tables
```

Voir la structure :
```sql
.schema clients
```

Quitter SQLite :
```
.quit
```

---

# 🧪 Exercices SQL — SELECT
### *But : découvrir et lire les données*


- Afficher **tous les clients**.
- Afficher les **noms et villes** des clients.
- Afficher les clients habitant **Lille**.
- Trier les clients du **plus âgé au plus jeune**.
- Afficher les **5 premiers clients**.
- Afficher les clients ayant **plus de 18 ans**.
- Afficher le **montant et la date** des commandes.
- Trier les commandes de la **plus chère à la moins chère**.

### BONUS : 

- Compter le **nombre total** de clients.
- Requête JOIN simple : afficher les commandes avec nom client


---

# ✍️ Exercices SQL — INSERT / UPDATE / DELETE 
### *But : manipuler et modifier les données*

- INSERT : Ajouter un client
**“Karim Diallo”, Marseille, 30 ans**
- INSERT multiple : Ajouter les produits
  - Clé USB 32Go – 12.90  
  - Tapis de souris – 7.50  
  - Microphone USB – 39.00  
- UPDATE : Modifier la ville de **Emma Bernard** → Nice
- UPDATE multiple : Augmenter de **10%** les produits à **moins de 50€**.
- UPDATE multiple : Changer tous les clients de **Lille** → **Roubaix**
- DELETE : Supprimer le produit **“Webcam HD”**.
- DELETE multiple : Supprimer les clients vivant à **Lyon**.
- DELETE multiple : Supprimer les commandes dont le total > **250€**.

---

# ✍️ Exercices SQL — INSERT / UPDATE / DELETE 
### *But : manipuler et modifier les données*

### BONUS : 
- DELETE via sous-requête - Supprimer toutes les commandes du client **“David Moreau”**.
- UPDATE ciblé - Réduire de **20%** toutes les commandes du client **“Camille Leroy”**.


---
layout: center
class: text-center
---

# 🎉 Fin & Prochaines étapes

Continuer avec **Requêtes SQL Avancées** : Jointures complexes, Subqueries (select imbiquées)

<div class="pt-12">
  <a href="/decks/example-advanced-queries/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Go →
  </a>
</div>
