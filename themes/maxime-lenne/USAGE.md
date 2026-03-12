# Guide d'utilisation - Thème Maxime Lenne

## Installation rapide

Dans votre fichier `slides.md`, ajoutez simplement :

```yaml
---
theme: ../../themes/maxime-lenne
---
```

## Palettes de couleurs

Le thème utilise le système de couleurs du site maxime-lenne.fr :

### Couleurs principales

- **Bleu primaire** : `#2563eb` → utilisé pour les accents principaux
- **Vert secondaire** : `#10b981` → utilisé pour les accents secondaires
- **Dégradé signature** : `linear-gradient(135deg, #2563eb 0%, #10b981 100%)`

### Couleurs de statut

- Succès : `#10b981` (vert)
- Warning : `#f59e0b` (orange)
- Erreur : `#ef4444` (rouge)

## Layouts disponibles

### 1. Cover - Page de couverture

```markdown
---
layout: cover
---

# Titre de la présentation

## Sous-titre ou description

Auteur, date, etc.
```

**Caractéristiques** :

- Fond avec dégradé bleu-vert
- Texte centré
- Effet de lumière radiale

### 2. Section - Diviseur de section

```markdown
---
layout: section
---

# Nouvelle Section

Introduction à cette partie
```

**Caractéristiques** :

- Fond avec dégradé et effets lumineux
- Texte blanc centré
- Parfait pour séparer les parties

### 3. Default - Layout standard

```markdown
---
layout: default
---

# Titre

Contenu normal de la slide
```

**Caractéristiques** :

- Marges et padding optimisés
- Titres avec dégradé
- Le plus utilisé pour le contenu

### 4. Two Columns - Deux colonnes

```markdown
---
layout: two-cols
---

# Titre

::left::

Contenu colonne gauche

::right::

Contenu colonne droite
```

### 5. Center - Contenu centré

```markdown
---
layout: center
---

# Message centré

Parfait pour les points clés
```

### 6. Quote - Citations

```markdown
---
layout: quote
---

> "Citation inspirante"
>
> — Auteur
```

### 7. Fact - Chiffres d'impact

```markdown
---
layout: fact
---

# 98%

Taux de satisfaction
```

**Caractéristiques** :

- Texte très grand (text-9xl)
- Centré verticalement et horizontalement

### 8. Image Right/Left

```markdown
---
layout: image-right
---

# Contenu

Texte à gauche

::image::

![Description](chemin/vers/image.jpg)
```

### 9. Full - Plein écran

```markdown
---
layout: full
---

Contenu sans marges (vidéos, images full, etc.)
```

## Composants personnalisés

### Boîte en surbrillance

```html
<div class="highlight-box">
  Contenu mis en évidence avec bordure gradient
</div>
```

### Bordure gradient

```html
<div class="gradient-border">
  <div class="gradient-border-content">
    Carte avec bordure en dégradé
  </div>
</div>
```

### Badges

```html
<span class="badge">Nouveau</span>
<span class="badge">Premium</span>
```

### Grilles

```html
<div class="grid-2">
  <div>Colonne 1</div>
  <div>Colonne 2</div>
</div>

<div class="grid-3"><!-- 3 colonnes --></div>
<div class="grid-4"><!-- 4 colonnes --></div>
```

## Styles de texte

### Titres avec dégradé

Les titres `h1` à `h6` ont automatiquement le dégradé bleu-vert.

### Texte en gras

```markdown
**Texte important** → aura aussi le dégradé
```

### Texte en italique

```markdown
*Texte en emphase* → couleur verte
```

### Code inline

```markdown
Utilisez `const variable = value` pour du code inline
```

### Blocs de code

```markdown
\```javascript
const greeting = "Hello World"
console.log(greeting)
\```
```

## Tableaux

```markdown
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Donnée 1  | Donnée 2  |
```

**Caractéristiques** :

- En-tête avec fond dégradé
- Lignes au survol avec changement de couleur

## Mode sombre

Le thème s'adapte automatiquement au mode sombre/clair de Slidev.

## Variables CSS personnalisées

Vous pouvez utiliser les variables CSS suivantes dans vos styles custom :

```css
var(--ml-color-primary)
var(--ml-color-secondary)
var(--ml-gradient-primary)
var(--ml-background)
var(--ml-text-primary)
var(--ml-radius-lg)
var(--ml-shadow-md)
var(--ml-transition-normal)
```

## Exemples complets

Consultez le fichier `example.md` pour voir tous les layouts et composants en action.

## Support

Pour toute question ou suggestion : [maxime-lenne.fr](https://maxime-lenne.fr)
