# Nouveau Thème Slidev : Maxime Lenne

## 📋 Résumé

Un thème Slidev personnalisé créé from scratch, basé sur le design system de [maxime-lenne.fr](https://maxime-lenne.fr).

**Caractéristique principale** : Dégradé signature bleu (#2563eb) vers vert (#10b981)

## 🎨 Système de design

### Couleurs principales

- **Bleu primaire** : `#2563eb`
- **Vert secondaire** : `#10b981`
- **Dégradé** : `linear-gradient(135deg, #2563eb 0%, #10b981 100%)`

### Neutrals

- Palette complète de gris slate : 50 → 900
- Support mode clair et mode sombre
- Variables CSS pour tous les composants

## 📐 Structure du thème

```
themes/maxime-lenne/
├── 📄 index.ts                 # Point d'entrée
├── 📄 package.json            # Configuration Slidev
├── 📖 README.md               # Documentation principale
├── 📖 USAGE.md                # Guide d'utilisation détaillé
├── 📖 CHANGELOG.md            # Historique des versions
├── 📄 example.md              # Exemples de tous les layouts
│
├── 📁 layouts/                # 12 layouts Vue
│   ├── cover.vue             # Page de couverture
│   ├── section.vue           # Diviseur de section
│   ├── default.vue           # Layout standard
│   ├── two-cols.vue          # Deux colonnes
│   ├── center.vue            # Centré
│   ├── quote.vue             # Citations
│   ├── fact.vue              # Chiffres d'impact
│   ├── statement.vue         # Déclarations
│   ├── image-right.vue       # Image à droite
│   ├── image-left.vue        # Image à gauche
│   ├── full.vue              # Plein écran
│   └── intro.vue             # Introduction
│
├── 📁 setup/                  # Configuration
│   ├── shiki.ts              # Coloration syntaxique
│   └── unocss.ts             # UnoCSS + presets
│
└── 📁 styles/                 # Styles CSS
    ├── index.ts              # Import des styles
    ├── colors.css            # Système de couleurs
    └── layouts.css           # Styles des layouts
```

## 🚀 Utilisation

### Dans un nouveau deck

```yaml
---
theme: ../../themes/maxime-lenne
title: Votre Titre
layout: cover
---

# Votre Titre

## Sous-titre
```

### Tester le thème

1. **Avec l'exemple inclus** :

```bash
cd themes/maxime-lenne
bunx slidev example.md
```

1. **Avec le deck de démo** :

```bash
bun run dev:deck theme-demo
```

## 🎯 Layouts disponibles

| Layout | Usage | Caractéristiques |
|--------|-------|------------------|
| `cover` | Page de couverture | Fond gradient + effets lumineux |
| `section` | Diviseur de section | Fond gradient + centré |
| `default` | Contenu standard | Marges optimisées |
| `two-cols` | Deux colonnes | `::left::` et `::right::` |
| `center` | Centré | Vertical + horizontal |
| `quote` | Citations | Guillemets stylisés |
| `fact` | Chiffres | Texte très grand (9xl) |
| `statement` | Déclarations | Texte grand et impactant |
| `image-right` | Image droite | Contenu + `::image::` |
| `image-left` | Image gauche | `::image::` + contenu |
| `full` | Plein écran | Sans marges |
| `intro` | Introduction | Alternative douce au cover |

## 🧩 Composants personnalisés

### Highlight Box

```html
<div class="highlight-box">
  Texte mis en évidence
</div>
```

### Gradient Border

```html
<div class="gradient-border">
  <div class="gradient-border-content">
    Contenu avec bordure gradient
  </div>
</div>
```

### Badges

```html
<span class="badge">Tag</span>
```

### Grilles

```html
<div class="grid-2"><!-- 2 colonnes --></div>
<div class="grid-3"><!-- 3 colonnes --></div>
<div class="grid-4"><!-- 4 colonnes --></div>
```

## ✨ Fonctionnalités

### Typographie

- ✅ Titres avec dégradé automatique
- ✅ Texte **gras** avec effet gradient
- ✅ Texte *italique* en vert
- ✅ Code inline stylisé
- ✅ Blocs de code avec thème adapté

### Éléments

- ✅ Tableaux avec en-tête gradient
- ✅ Citations avec style personnalisé
- ✅ Listes avec marqueurs colorés
- ✅ Liens avec effet au survol
- ✅ Scrollbars personnalisées
- ✅ Sélection de texte avec gradient

### Responsive

- ✅ Support mode sombre/clair
- ✅ Variables CSS pour personnalisation
- ✅ Transitions fluides
- ✅ Shadows et radius cohérents

## 📚 Documentation complète

- **README.md** : Vue d'ensemble du thème
- **USAGE.md** : Guide d'utilisation détaillé avec exemples
- **CHANGELOG.md** : Historique des versions
- **example.md** : Démonstration de tous les layouts

## 🔧 Variables CSS personnalisées

Toutes les variables commencent par `--ml-` :

```css
/* Couleurs */
--ml-color-primary
--ml-color-secondary
--ml-gradient-primary

/* Fond et texte */
--ml-background
--ml-text-primary

/* Spacing et design */
--ml-radius-lg
--ml-shadow-md
--ml-transition-normal
```

## 🎬 Deck de démonstration

Un deck complet a été créé dans `decks/theme-demo/` montrant :

- Tous les layouts en action
- Exemples de tableaux SQL
- Utilisation des composants personnalisés
- Différents types de contenu

Pour le tester :

```bash
bun run dev:deck theme-demo
```

## 📦 Différences avec le thème Simplon

| Aspect | Thème Simplon | Thème Maxime Lenne |
|--------|---------------|-------------------|
| Couleur primaire | Orange (#f26f5c) | Bleu (#2563eb) |
| Couleur secondaire | Rouge (#ce0033) | Vert (#10b981) |
| Dégradés | Non | Oui (signature) |
| Mode | Sombre uniquement | Clair + Sombre |
| Layouts | 6 | 12 |
| Composants | Basic | Avancés |
| Documentation | Minimal | Complète |

## 🎓 Cas d'usage

Le thème est parfait pour :

- ✅ Présentations techniques
- ✅ Formations développement
- ✅ Conférences tech
- ✅ Cours en ligne
- ✅ Pitchs startup
- ✅ Portfolio de projets

## 📝 Notes de version

**Version 1.0.0** - 2024-12-09

- Création initiale du thème
- 12 layouts Vue
- Système de couleurs complet
- Documentation complète
- Exemple et démo

## 🔮 Évolutions futures possibles

- [ ] Animations avancées
- [ ] Composants interactifs
- [ ] Dark mode toggle visible
- [ ] Export thème npm package
- [ ] Variantes de couleurs
- [ ] Templates de slides

## 📧 Support

Pour toute question ou suggestion :

- Site web : [maxime-lenne.fr](https://maxime-lenne.fr)
- Documentation : voir USAGE.md
- Exemples : voir example.md

---

**Créé avec ❤️ par Maxime Lenne**
