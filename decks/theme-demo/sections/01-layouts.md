---
layout: section
---

# Section 1 : Built-in Layouts

Test de tous les layouts Slidev (17 au total)

---
layout: intro
---

# Layout: Intro

## Introduction à votre présentation

Parfait pour présenter le sujet, l'auteur, la date

Par **Maxime Lenne** | Décembre 2024

---
layout: end
---

# Layout: End

Merci pour votre attention !

Questions ?

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

# Layout: cover

## avec background image

📧 <contact@maxime-lenne.fr>

---
layout: center
---

# Layout: Center

Contenu centré verticalement et horizontalement

Parfait pour les messages clés ou les transitions

---
layout: full
---

# Layout: Full

Utilise tout l'espace de l'écran avec un magnifique gradient d'arrière-plan

Le gradient est défini directement dans le thème

---
layout: quote
---

# Layout: Quote

> "La simplicité est la sophistication suprême."
>
> — Léonard de Vinci

Citations avec style personnalisé et guillemets stylisés

---
layout: fact
---

# 42

La réponse ultime

Layout: Fact

---
layout: statement
---

# Le design est important

Layout: Statement

Pour les déclarations importantes

---
layout: default
---

# Layout: Default

Le layout le plus basique pour afficher tout type de contenu.

## Utilisation

```yaml
layout: default
```

## Caractéristiques

- Padding et marges optimisés
- Parfait pour le contenu standard
- Le plus utilisé

**Ce slide utilise le layout `default`**

---
layout: two-cols
---

# Layout: Two Cols

Deux colonnes côte à côte

::left::

## Colonne Gauche

- Deux colonnes côte à côte
- Deux colonnes côte à côte
- Deux colonnes côte à côte

**Code exemple:**

::right::

## Colonne Droite

Deux colonnes côte à côte

```javascript
const greeting = "Bonjour"
console.log(greeting)
```

---
layout: two-cols-header
---

# Layout: Two Cols Header

En-tête pleine largeur suivi de deux colonnes

::left::

## Colonne 1

Contenu de la première colonne avec liste :

- Item A
- Item B
- Item C

::right::

## Colonne 2

Contenu de la deuxième colonne

| Feature | Status |
|---------|--------|
| Header | ✅ |
| Columns | ✅ |

---
layout: image-right
image: https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800
---

# Layout: Image Right

Contenu à gauche, image à droite

## Utilisation

```yaml
layout: image-right
image: url-de-votre-image
```

Parfait pour :

- Présenter un produit
- Montrer des screenshots
- Illustrer un concept

---
layout: image-left
image: https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800
---

# Layout: Image Left

Image à gauche, contenu à droite

<div class="highlight-box">
💡 L'image est définie dans le frontmatter avec <code>image: url</code>
</div>

**Avantages:**

- Asymétrie visuelle
- Meilleure attention
- Contexte visuel


---
layout: iframe-right
url: https://sli.dev
---

# Layout: Iframe Right

Contenu à gauche, iframe à droite

## Utilisation

```yaml
layout: iframe-right
url: https://sli.dev
```

Parfait pour :

- Démos live
- Documentation web
- Sites web

---
layout: iframe
url: https://sli.dev
---

---
layout: image
image: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200
backgroundSize: cover
---

# Layout: Image

Image en fond plein écran avec texte par-dessus

---
layout: none
class: px-20 py-10
---

# Layout: None

Aucun style par défaut - vous contrôlez tout

<div class="grid grid-cols-3 gap-4 mt-8">
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
  <div class="gradient-border">
    <div class="gradient-border-content">Clé unique</div>
  </div>
</div>
