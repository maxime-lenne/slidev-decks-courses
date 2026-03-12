---
theme: default
layout: cover
title: SQL - Jour 2
subtitle: Jointures • Sous-requêtes • Group By
---

# SQL — Jour 2  
## Jointures complexes · Sous-requêtes · Agrégations

---

# 🎯 Objectifs pédagogiques

- Comprendre les relations entre tables  
- Reproduire puis adapter des requêtes avec jointures  
- Découvrir GROUP BY et l’agrégation  
- Commencer à répondre à des besoins métier

---

# 🧭 Programme du jour

## Matin

- Cours : **JOINS**, **GROUP BY**, **HAVING**  
- Atelier : *Visualiser la base* (schéma tables & relations)

## Après-midi

- **Mise en situation n°2 : analyse des ventes**
- Reproduction de 3 requêtes fournies
- Adaptation de 2 requêtes (niveau 2)

---

# 🟦 Introduction — Pourquoi des jointures ?
Une base relationnelle sépare les données en plusieurs tables.

Pour analyser :  

- les commandes  
- les clients  
- les produits  

👉 On doit **relier** les tables avec des jointures.

---

# 🟦 JOINS — Rappel simple
### JOIN = relier deux tables sur leur relation logique.

Exemple (concept) :

```
clients.id = commandes.client_id
```

---

# 🟧 Les différents types de JOINS

### 🔹 INNER JOIN  
Retourne seulement ce qui “matche” dans les deux tables.

### 🔹 LEFT JOIN  
Retourne tout à gauche + ce qui matche à droite.

### 🔹 RIGHT JOIN (selon SGBD)  
Tout à droite + ce qui matche à gauche.

### 🔹 FULL OUTER JOIN  
Tout des deux côtés.

---

# 🧩 Schéma visuel — JOINS
*(expliquer avec un schéma illustré ou dessiné en atelier)*

---

# 🟨 Jointures complexes

### JOIN + conditions supplémentaires  
### JOIN sur plusieurs colonnes  
### Combiner plusieurs JOINS

Exemples de problèmes possibles :

- Trouver les clients sans commandes  
- Trouver les produits jamais vendus  
- Lister les ventes avec client + produit + catégorie  

---

# 🟥 Sous-requêtes (Subqueries)

### Une sous-requête = un SELECT **à l’intérieur** d’un autre SELECT.

Permet par exemple :

- Filtrer selon un résultat calculé  
- Chercher des valeurs maximales  
- Comparer une ligne à un ensemble de lignes  

---

# 🟥 Sous-requêtes : cas d’usage

### Trouver les commandes dont le total est supérieur à la moyenne  
→ utiliser une sous-requête dans WHERE

### Trouver les clients ayant fait plus de X commandes  
→ sous-requête + GROUP BY

---

# 🟩 GROUP BY — Pourquoi ?

GROUP BY permet :

- de *regrouper* les lignes  
- de calculer des *statistiques* par groupe  
  (par ville, par client, par produit…)

---

# 🟩 Fonctions d’agrégation
Les plus courantes :

- `COUNT()`  
- `SUM()`  
- `AVG()`  
- `MIN()`  
- `MAX()`  

---

# 🟪 HAVING — Filtrer *après* l’agrégation

WHERE → filtre **avant** le GROUP BY  
HAVING → filtre **après** agrégation  

---

# 🛠️ Atelier du matin : Visualiser la base

Fournir aux apprenants :

- un schéma tables → colonnes  
- les relations PK / FK  
- exemple : clients — commandes — produits  

Objectifs :

- comprendre les liens  
- identifier les clés étrangères  
- repérer les jointures à faire  

---

# 🔥 Après-midi — Mise en situation n°2  
## *Analyse de performance des ventes*

Objectif :
> Un client veut analyser la performance des ventes : produire **5 indicateurs**.

---

# 🔥 MS2 — Partie 1 : Reproduire 3 requêtes
Le formateur fournit 3 requêtes :

- total des ventes  
- nombre de commandes par client  
- panier moyen  

Les apprenants doivent :

1. comprendre  
2. reproduire  
3. valider avec les données réelles

---

# 🔥 MS2 — Partie 2 : Adapter 2 requêtes (niveau 2)

Exemples d'adaptations :

- filtrer par ville  
- filtrer par période  
- calculer un top 3  
- ajouter un ORDER BY  
- combiner des conditions  

Objectifs :

- réutiliser les JOINS  
- introduire l’idée “adapter = modifier les paramètres du problème”  

---

# 📊 Indicateurs possibles (exemples)

1. Total des ventes global  
2. Total des ventes par ville  
3. Panier moyen par client  
4. Nombre de commandes par semaine  
5. Top 3 des clients par montant dépensé  

---

# 🧠 Rappel méthodo : Imitation → Adaptation → Transposition

Jour 2 = Niveau 2 : **Adapter**  

---

# 🎉 Fin de la journée

Questions ?  
Prochaines étapes :  
→ préparer la mini-projet du jour 3 : **modélisation & création de tables**
