# Theme Demo - Deck de Test

Ce dossier contient plusieurs présentations de démonstration du thème Maxime Lenne.

## Fichiers disponibles

### 1. `slides.md` - Démo SQL Thématique

Présentation axée sur SQL et les bases de données.

**Contenu:**

- Layouts: cover, section, default, two-cols, center, fact, quote
- Composants personnalisés: highlight-box, gradient-border, badges, grid-3
- Tableaux SQL
- Code SQL avec syntaxe highlighting
- Diagramme ER (Entity-Relationship)

**Pour tester:**

```bash
bun run dev:deck theme-demo
```

### 2. `test-complete.md` - Test Exhaustif

Présentation complète testant **TOUTES** les fonctionnalités Slidev.

**Contenu:**

#### 📐 Layouts (17 testés)

- ✅ `cover` - Page de couverture
- ✅ `intro` - Introduction
- ✅ `section` - Diviseur de section
- ✅ `default` - Layout standard
- ✅ `center` - Centré
- ✅ `full` - Plein écran
- ✅ `quote` - Citations
- ✅ `fact` - Chiffres d'impact
- ✅ `statement` - Déclarations
- ✅ `end` - Page de fin
- ✅ `two-cols` - Deux colonnes
- ✅ `two-cols-header` - Deux colonnes avec en-tête
- ✅ `image-left` - Image à gauche
- ✅ `image-right` - Image à droite
- ✅ `image` - Image plein écran
- ✅ `iframe-right` - Iframe à droite
- ✅ `none` - Sans style

#### 🧩 Built-in Components

- ✅ `Arrow` - Flèches entre éléments
- ✅ `AutoFitText` - Texte auto-ajustable
- ✅ `SlideCurrentNo` - Numéro slide actuel
- ✅ `SlidesTotal` - Total slides
- ✅ `Toc` - Table des matières
- ✅ `LightOrDark` - Conditionnel thème
- ✅ `Transform` - Transformation/échelle
- ✅ `v-click` - Animation au clic
- ✅ `v-clicks` - Animation multiple
- ✅ `v-after` - Après les clics
- ✅ `v-switch` - Basculement contenu
- ✅ `v-drag` - Éléments déplaçables
- ✅ `Link` - Navigation inter-slides

#### 📝 Éléments Markdown

- ✅ Tous les niveaux de titres (h1-h6)
- ✅ Texte en gras, italique, barré
- ✅ Listes ordonnées, non-ordonnées, tâches
- ✅ Tableaux avec alignement
- ✅ Citations simples et multi-lignes
- ✅ Code blocks (Python, JS/TS, SQL, HTML/CSS)
- ✅ Code highlighting avec lignes
- ✅ Code avec Monaco editor
- ✅ Liens externes et internes
- ✅ Images standard et avec attributs
- ✅ Emojis et icônes Carbon

#### 📊 Diagrammes Mermaid

- ✅ Flowchart
- ✅ Sequence Diagram
- ✅ State Diagram
- ✅ Gantt Chart
- ✅ ER Diagram

#### ✨ Fonctionnalités Avancées

- ✅ Grilles personnalisées (grid-2, grid-3, grid-4)
- ✅ Composants Vue inline avec state
- ✅ Classes UnoCSS personnalisées
- ✅ Animations CSS (bounce, pulse, spin)
- ✅ Media queries responsive
- ✅ Composants personnalisés du thème

**Pour tester:**

```bash
cd /Users/maxime-lenne/Documents_Non_iCloud/workspace_js_ts/slidev-decks-simplon
npx slidev decks/theme-demo/test-complete.md
```

## Comparaison

| Aspect | slides.md | test-complete.md |
|--------|-----------|------------------|
| **Objectif** | Démo thématique SQL | Test exhaustif |
| **Layouts** | 7 | 17 (tous) |
| **Components** | Basic | Tous les built-in |
| **Markdown** | Standard | Complet |
| **Diagrammes** | ER | 5 types Mermaid |
| **Durée** | ~15 slides | ~70 slides |
| **Usage** | Présentation réelle | Test & validation |

## Utilisation

### Lancer slides.md

```bash
# Depuis la racine du projet
bun run dev:deck theme-demo

# Ou avec npx
npx slidev decks/theme-demo/slides.md
```

### Lancer test-complete.md

```bash
# Avec npx
npx slidev decks/theme-demo/test-complete.md --port 3031
```

## Checklist de Test

Utiliser `test-complete.md` pour vérifier :

### Visuels

- [ ] Dégradés bleu-vert affichés correctement
- [ ] Titres avec effet gradient
- [ ] Layouts cover et section avec effets lumineux
- [ ] Tableaux avec en-tête gradient
- [ ] Code blocks bien stylisés

### Navigation

- [ ] Transitions fluides entre slides
- [ ] Composant Link fonctionne
- [ ] Numéros de slides corrects
- [ ] Table des matières générée

### Animations

- [ ] v-click animations au clic
- [ ] v-drag éléments déplaçables
- [ ] Arrow affichée correctement
- [ ] Animations CSS (bounce, pulse, spin)

### Composants

- [ ] highlight-box avec bordure gradient
- [ ] gradient-border autour des cartes
- [ ] badges avec fond gradient
- [ ] grids (grid-2, grid-3, grid-4)

### Diagrammes

- [ ] Mermaid flowchart rendu
- [ ] Mermaid sequence diagram
- [ ] Mermaid state diagram
- [ ] Mermaid Gantt chart
- [ ] Mermaid ER diagram

### Responsive

- [ ] Texte s'adapte aux tailles d'écran
- [ ] Grilles responsive fonctionnent
- [ ] Images s'adaptent

### Mode Sombre/Clair

- [ ] Switch entre modes fonctionne
- [ ] Couleurs s'adaptent
- [ ] LightOrDark component fonctionne
- [ ] Lisibilité maintenue

## Notes

- Les deux présentations utilisent le thème `../../themes/maxime-lenne`
- `test-complete.md` est le plus complet pour validation
- `slides.md` est un exemple d'utilisation réelle
- Tous les layouts Slidev sont testés dans `test-complete.md`
- Tous les built-in components sont testés

## Prochaines Étapes

1. Tester avec `test-complete.md`
2. Vérifier la checklist ci-dessus
3. Ajuster le thème si nécessaire
4. Utiliser `slides.md` comme template pour vos présentations

## Ressources

- [Documentation Slidev](https://sli.dev)
- [Layouts Built-in](https://sli.dev/builtin/layouts)
- [Components Built-in](https://sli.dev/builtin/components)
- [Thème Maxime Lenne](../../themes/maxime-lenne/README.md)
