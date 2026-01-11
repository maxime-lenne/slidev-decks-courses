---
theme: ../../themes/simplon
title: Advanced SQL Queries
subtitle: Jointures • Sous-requêtes • Group By
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---


# SQL — Jour 2  
## Jointures complexes · Sous-requêtes · Agrégations

**Recommended:** Complete [SQL Fundamentals](/decks/example-sql-basics/) first

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

### ON = indique les colones qui permettent de les reliées

```sql
clients.id = commandes.client_id
```

Le plus souvent entre une clef primarie et une clef étrangère.

---
layout: two-cols
---

# Types of JOINs


**INNER JOIN**: Returns matching rows from both tables

**LEFT JOIN**: Returns all rows from left table, matches from right

**RIGHT JOIN**: Returns all rows from right table, matches from left

**FULL OUTER JOIN**: Returns all rows when there's a match in either table

::right::

```sql
-- INNER JOIN example
SELECT
  u.name,
  o.order_date,
  o.total
FROM users u
INNER JOIN orders o
  ON u.id = o.user_id
WHERE o.total > 100;
```

---

# 🧩 Schéma visuel — JOINS

### schémas colorés (vert = inclus, gris = exclu)

- Table **A** = cercle gauche <span v-click>🟢</span>
- Table **B** = cercle droit <span v-click>🟢</span>
- Zones **vertes** = **incluses** dans le résultat <span v-click>✅</span>
- Zones **grises** = exclues <span v-click>🚫</span>

---

# INNER JOIN
## Intersection uniquement (A ∩ B)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <!-- Background -->
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Left circle (A) excluded -->
      <circle cx="120" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Right circle (B) excluded -->
      <circle cx="220" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection highlight -->
      <path d="M120,30
               a80,80 0 1,0 0,160
               a80,80 0 1,0 0,-160
               M220,30
               a80,80 0 1,0 0,160
               a80,80 0 1,0 0,-160" fill="none"/>
      <defs>
        <clipPath id="clipA">
          <circle cx="120" cy="110" r="80"/>
        </clipPath>
        <clipPath id="clipB">
          <circle cx="220" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipA)">
        <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <!-- Borders -->
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Ne conserve que l'<strong>intersection</strong> (valeurs communes)</li>
      <li v-click>Très utilisé pour croiser des données cohérentes</li>
      <li v-click>Ex: clients ✖️ commandes effectives</li>
    </ul>
  </div>
</div>

```sql
SELECT *
FROM A
INNER JOIN B ON A.key = B.key
```

---

# LEFT JOIN
## Tout A + correspondances trouvées dans B

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Left circle (A) included -->
      <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <!-- Right-only area excluded -->
      <circle cx="220" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection overlay (ensure green where overlapping) -->
      <defs>
        <clipPath id="clipA2">
          <circle cx="120" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipA2)">
        <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de A</li>
      <li v-click>Complète avec B quand une correspondance existe</li>
      <li v-click>Sinon, colonnes de B = <code>NULL</code></li>
    </ul>
  </div>
</div>

```sql
SELECT *
FROM A
LEFT JOIN B ON A.key = B.key
```

---

# RIGHT JOIN
## Tout B + correspondances depuis A (LEFT JOIN inversé)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Right circle (B) included -->
      <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <!-- Left-only area excluded -->
      <circle cx="120" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection overlay (ensure green where overlapping) -->
      <defs>
        <clipPath id="clipB2">
          <circle cx="220" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipB2)">
        <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de B</li>
      <li v-click>Complète avec A si correspondance</li>
      <li v-click>Peut être remplacé par LEFT JOIN en inversant les tables</li>
    </ul>
  </div>
</div>

```sql
SELECT *
FROM A
RIGHT JOIN B ON A.key = B.key
```
---

# FULL OUTER JOIN
## Union complète (A ∪ B)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de A et de B</li>
      <li v-click>Les lignes sans correspondance sont remplies avec <code>NULL</code></li>
      <li v-click>⚠️ SQLite ne supporte pas <em>FULL JOIN</em> nativement</li>
    </ul>
  </div>
</div>

```sql
SELECT *
FROM A
RIGHT JOIN B ON A.key = B.key
```

---

# CROSS JOIN
## Produit cartésien (tout × tout)


```sql
SELECT *
FROM table1
CROSS JOIN table2
```


---

# Récapitulatif

- <span v-click>INNER = intersection (A ∩ B)</span>  
- <span v-click>LEFT = A + intersection</span>  
- <span v-click>RIGHT = B + intersection</span>  
- <span v-click>FULL = A ∪ B</span>  
- <span v-click>CROSS = toutes les combinaisons</span>

---

# Jointures complexes

### JOIN + conditions supplémentaires  
### JOIN sur plusieurs colonnes  
### Combiner plusieurs JOINS

Exemples de problèmes possibles :
- Trouver les clients sans commandes  
- Trouver les produits jamais vendus  
- Lister les ventes avec client + produit + catégorie  

---

# Sous-requêtes (Subqueries)

### Une sous-requête = un SELECT **à l’intérieur** d’un autre SELECT.

Permet par exemple :
- Filtrer selon un résultat calculé  
- Chercher des valeurs maximales  
- Comparer une ligne à un ensemble de lignes  


---

# Sous-requêtes (Subqueries)

Queries nested inside other queries:

```sql {all|2-5|all}
SELECT name, email
FROM users
WHERE id IN (
  SELECT user_id FROM orders
  WHERE total > 1000
);
```

<v-click>

**Alternative with JOIN:**
```sql
SELECT DISTINCT u.name, u.email
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 1000;
```

</v-click>

---

# Sous-requêtes : cas d’usage

### Trouver les commandes dont le total est supérieur à la moyenne  
→ utiliser une sous-requête dans WHERE

### Trouver les clients ayant fait plus de X commandes  
→ sous-requête + GROUP BY

---

# GROUP BY — Pourquoi ?

GROUP BY permet :
- de *regrouper* les lignes  
- de calculer des *statistiques* par groupe  
  (par ville, par client, par produit…)

---

# Fonctions d’agrégation
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

# Performance Optimization

**Best Practices:**

<v-clicks>

1. **Use indexes** on frequently queried columns
2. **Avoid SELECT \*** - specify needed columns
3. **Use WHERE** before JOIN when possible
4. **Limit results** with LIMIT/OFFSET
5. **Analyze query plans** with EXPLAIN

</v-clicks>

<v-click>

```sql
-- Good: Uses index, specific columns
SELECT id, name FROM users WHERE email = 'alice@example.com';

-- Bad: No index, all columns
SELECT * FROM users WHERE LOWER(name) LIKE '%alice%';
```

</v-click>

---
layout: center
transition: fade
---

# 🎉 Fin
