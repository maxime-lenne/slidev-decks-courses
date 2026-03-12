# Test du Thème Maxime Lenne

## 🧪 Guide de test rapide

### Option 1 : Tester avec l'exemple inclus

```bash
# Depuis la racine du projet
cd themes/maxime-lenne
npx slidev example.md --port 3030
```

Ouvrir <http://localhost:3030>

### Option 2 : Tester avec le deck de démo

```bash
# Depuis la racine du projet
npm run dev:deck theme-demo
```

### Option 3 : Créer un nouveau deck de test

1. Créer un fichier `test.md` :

```yaml
---
theme: ../../themes/maxime-lenne
title: Test Rapide
layout: cover
---

# Mon Test

Vérifier que tout fonctionne
```

1. Lancer :

```bash
npx slidev test.md
```

## ✅ Checklist de vérification

### Visuels

- [ ] Les dégradés bleu-vert s'affichent correctement
- [ ] Les titres ont l'effet gradient
- [ ] Le layout cover a le fond gradient
- [ ] Le layout section a les effets lumineux
- [ ] Les tableaux ont l'en-tête gradient

### Layouts

- [ ] `cover` : fond gradient + centré
- [ ] `section` : diviseur avec effets
- [ ] `default` : marges correctes
- [ ] `two-cols` : 2 colonnes égales
- [ ] `center` : contenu centré
- [ ] `quote` : guillemets stylisés
- [ ] `fact` : texte très grand
- [ ] `image-right/left` : disposition correcte

### Composants

- [ ] `highlight-box` : bordure gradient à gauche
- [ ] `gradient-border` : bordure gradient complète
- [ ] `badge` : fond gradient + texte blanc
- [ ] `grid-2/3/4` : colonnes égales

### Typographie

- [ ] Titres h1-h6 avec gradient
- [ ] **Texte gras** avec gradient
- [ ] *Texte italique* en vert
- [ ] `Code inline` stylisé
- [ ] Blocs de code avec fond sombre

### Interactivité

- [ ] Liens avec effet au survol
- [ ] Lignes de tableau au survol
- [ ] Navigation fonctionnelle
- [ ] Transitions fluides

### Mode sombre/clair

- [ ] Switch entre modes fonctionne
- [ ] Couleurs s'adaptent correctement
- [ ] Lisibilité maintenue
- [ ] Contrastes suffisants

## 🐛 Problèmes connus

Aucun problème connu pour le moment.

## 📊 Résultats attendus

### Cover slide

- Fond avec dégradé bleu → vert
- Effets de lumière radiale
- Texte blanc centré
- Ombre portée sur le titre

### Section slide

- Fond gradient similaire au cover
- Effets lumineux subtils
- Texte blanc
- Centré verticalement

### Default slide

- Fond uni (blanc ou sombre selon le mode)
- Titres avec gradient
- Texte lisible
- Marges et padding cohérents

### Two-cols slide

- Deux colonnes de largeur égale
- Espacement entre colonnes (gap)
- Contenu aligné en haut

### Tableaux

- En-tête avec fond gradient
- Texte en-tête blanc
- Bordures visibles
- Effet au survol des lignes

## 💡 Tips de debug

### Si le thème ne charge pas

1. Vérifier le chemin : `theme: ../../themes/maxime-lenne`
2. S'assurer d'être dans le bon dossier
3. Relancer Slidev

### Si les dégradés ne s'affichent pas

1. Vérifier que `colors.css` est importé
2. Inspecter les variables CSS dans le navigateur
3. Vérifier la console pour erreurs

### Si les layouts ne fonctionnent pas

1. Vérifier que les fichiers `.vue` sont présents dans `layouts/`
2. Vérifier la syntaxe du frontmatter
3. Essayer avec `layout: default` d'abord

## 🔍 Tests de performance

### Temps de chargement

- [ ] < 2s pour charger la première slide
- [ ] < 1s pour naviguer entre slides
- [ ] Pas de lag pendant les transitions

### Rendu

- [ ] Texte net et lisible
- [ ] Dégradés fluides (pas de banding)
- [ ] Images chargent rapidement
- [ ] Code colorié correctement

## 📝 Notes de test

Date : ___________
Testeur : ___________
Navigateur : ___________
Résolution : ___________

Commentaires :
___________________________________________
___________________________________________
___________________________________________

## ✨ Après le test

Si tout fonctionne :

1. ✅ Utiliser le thème dans vos présentations
2. 📖 Consulter USAGE.md pour plus d'exemples
3. 🎨 Personnaliser avec les variables CSS

Si problèmes :

1. 🐛 Vérifier la checklist ci-dessus
2. 📚 Consulter la documentation
3. 🔧 Ajuster si nécessaire
