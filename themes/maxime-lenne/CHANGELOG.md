# Changelog - Thème Maxime Lenne

## Version 1.0.0 - 2024-12-09

### Création initiale du thème

#### 🎨 Système de design

- Palette de couleurs basée sur maxime-lenne.fr
- Dégradé signature bleu (#2563eb) vers vert (#10b981)
- Support mode sombre/clair automatique
- Variables CSS personnalisées pour tous les composants

#### 📐 Layouts (12 au total)

- **cover** : Page de couverture avec dégradé plein écran
- **section** : Diviseur de section avec effets lumineux
- **default** : Layout standard pour le contenu
- **two-cols** : Deux colonnes côte à côte
- **center** : Contenu centré verticalement et horizontalement
- **quote** : Citations avec style personnalisé
- **fact** : Chiffres d'impact en très grand
- **statement** : Déclarations importantes
- **image-right** : Image à droite, contenu à gauche
- **image-left** : Image à gauche, contenu à droite
- **full** : Plein écran sans marges
- **intro** : Introduction douce (alternative au cover)

#### 🧩 Composants personnalisés

- Boîtes en surbrillance (highlight-box)
- Bordures gradient (gradient-border)
- Badges/tags colorés
- Grilles responsives (grid-2, grid-3, grid-4)

#### ✨ Typographie

- Titres avec dégradé automatique
- Texte en gras avec effet dégradé
- Italique avec couleur verte
- Code blocks avec thème adapté
- Système de tailles cohérent

#### 🎯 Éléments stylisés

- Tableaux avec en-tête dégradé
- Citations avec guillemets stylisés
- Listes avec marqueurs colorés
- Liens avec effet au survol
- Scrollbars personnalisées
- Sélection de texte avec dégradé

#### 📦 Configuration

- Package.json configuré pour Slidev
- Setup UnoCSS avec presets personnalisés
- Setup Shiki pour la coloration syntaxique
- Fonts système optimisées

#### 📚 Documentation

- README.md complet
- USAGE.md avec exemples
- example.md avec démonstration de tous les layouts
- CHANGELOG.md (ce fichier)

### Fichiers créés

```
themes/maxime-lenne/
├── index.ts
├── package.json
├── README.md
├── USAGE.md
├── CHANGELOG.md
├── example.md
├── layouts/
│   ├── center.vue
│   ├── cover.vue
│   ├── default.vue
│   ├── fact.vue
│   ├── full.vue
│   ├── image-left.vue
│   ├── image-right.vue
│   ├── intro.vue
│   ├── quote.vue
│   ├── section.vue
│   ├── statement.vue
│   └── two-cols.vue
├── setup/
│   ├── shiki.ts
│   └── unocss.ts
└── styles/
    ├── index.ts
    ├── colors.css
    └── layouts.css
```

### Utilisation

```yaml
---
theme: ../../themes/maxime-lenne
---
```
