---
layout: section
---

# Section 2 : Éléments Markdown

Test de tous les éléments markdown

---

# Typographie & Texte

## Tous les niveaux de titres

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Texte classique | **Texte en gras** | *Texte en italique* | ~~Texte barré~~ | `Code inline`

---
layout: two-cols-header
---

# Listes

::left::

## Liste non ordonnée

- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
    - Sub-sub-item
- Item 3

::right::

## Liste ordonnée

1. Premier
2. Deuxième
3. Troisième
   1. Sous-point 3.1
   2. Sous-point 3.2

## Liste de tâches

- [x] Tâche terminée
- [ ] Tâche en cours
- [ ] Tâche à faire

---

# Tableaux

## Tableau simple

| Nom | Rôle | Expérience |
|-----|------|-----------|
| Alice | Dev Frontend | 5 ans |
| Bob | Dev Backend | 3 ans |
| Charlie | DevOps | 7 ans |

---

## Tableau avec alignement

| Gauche | Centre | Droite |
|:-------|:------:|-------:|
| A | B | C |
| 1 | 2 | 3 |

---

# Citations & Blocs

## Citation simple

> Ceci est une citation

## Citation multi-lignes

> "Le code est comme l'humour.
> Quand vous devez l'expliquer, c'est mauvais."
>
> — Cory House

## Bloc d'information

<div class="highlight-box">
💡 <strong>Note importante:</strong> Les citations utilisent le caractère <code>></code>
</div>

---

# Code - Syntaxes diverses

## Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

## JavaScript/TypeScript

```ts
interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" }
]
```

---

# Code - Suite

## SQL

```sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = true
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;
```

## HTML/CSS

```html
<div class="container">
  <h1 class="title">Hello World</h1>
  <p class="description">Example</p>
</div>

<style>
.container {
  background: linear-gradient(135deg, #2563eb, #10b981);
}
</style>
```

---

# Code avec highlighting {1,3-5|2,6}

Code avec lignes en surbrillance

```ts {1,3-5|2,6}
export default {
  name: 'MyComponent',
  props: {
    count: Number
  },
  setup() {
    // Component logic
  }
}
```

## Code avec Monaco Editor

```ts {monaco}
// Éditable avec Monaco
function greet(name: string) {
  console.log(`Hello, ${name}!`)
}
```

---
layout: two-cols
---

# Liens & Images

::left::

## Liens

[Lien externe](https://sli.dev) | [Lien vers slide](#42)

<Link to="10">Aller au slide 10</Link>

::right::

## Images

![Unsplash](https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400)

---

## Image avec attributs

<img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300" class="rounded-xl" />

---

# Emojis & Icônes

## Emojis

🚀 🎨 💡 ✨ 🔥 ⚡️ 📊 📈 🎯 ✅ ❌ ⚠️

## Icônes Carbon (via Iconify)

<carbon-logo-github /> <carbon-edit /> <carbon-download /> <carbon-arrow-right />

## Badges personnalisés

<span class="badge">Nouveau</span>
<span class="badge">Beta</span>
<span class="badge">Premium</span>
