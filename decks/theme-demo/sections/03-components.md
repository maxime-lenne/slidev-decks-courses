---
layout: section
---

# Section 3 : Built-in Components

Test de tous les composants Slidev

---

# Arrow Component

Dessiner des flèches entre éléments

<div class="relative h-80">
  <div v-click class="absolute top-10 left-20 border border-primary px-4 py-2 rounded">
    Point A
  </div>

  <div v-click class="absolute top-40 right-20 border border-secondary px-4 py-2 rounded">
    Point B
  </div>

  <Arrow v-click x1="200" y1="60" x2="600" y2="180" color="#2563eb" width="2" />
</div>

```vue
<Arrow x1="200" y1="60" x2="600" y2="180" />
```

---

# AutoFitText Component

Texte qui s'adapte automatiquement

<AutoFitText :max="300" :min="50" class="h-60 border border-primary rounded p-4">
  Ce texte s'adapte automatiquement à la taille du conteneur
</AutoFitText>

<AutoFitText :max="100" :min="20" class="h-40 border border-secondary rounded p-4 mt-4">
  Texte plus petit qui s'adapte aussi
</AutoFitText>

---

# SlideInfo Components

<div class="grid grid-cols-2 gap-8">
  <div class="gradient-border">
    <div class="gradient-border-content">
      <h3>Slide actuel</h3>
      <div class="text-6xl font-bold gradient-text">
        <SlideCurrentNo />
      </div>
    </div>
  </div>

  <div class="gradient-border">
    <div class="gradient-border-content">
      <h3>Total slides</h3>
      <div class="text-6xl font-bold gradient-text">
        <SlidesTotal />
      </div>
    </div>
  </div>
</div>

```vue
<SlideCurrentNo /> / <SlidesTotal />
```

---

# Table of Contents (Toc)

Composant `<Toc />` — surcharge du built-in Slidev par le thème (auto-détection)

<Toc maxDepth="1" />

---

# Toc — items manuels

Override avec des entrées explicites

<Toc :items="[
  { title: 'Layouts', to: 2 },
  { title: 'Markdown', to: 15 },
  { title: 'Components', to: 25 },
  { title: 'Diagrams', to: 50 },
]" />

---

# LightOrDark Component

Affiche du contenu différent selon le thème

<LightOrDark>
  <template #dark>
    <div class="text-4xl">🌙 Mode Sombre Actif</div>
  </template>
  <template #light>
    <div class="text-4xl">☀️ Mode Clair Actif</div>
  </template>
</LightOrDark>

```vue
<LightOrDark>
  <template #dark>Contenu mode sombre</template>
  <template #light>Contenu mode clair</template>
</LightOrDark>
```

---

# Transform Component

Transformer et mettre à l'échelle des éléments

<div class="grid grid-cols-2 gap-4">
  <Transform :scale="1.5">
    <div class="border border-primary p-4">
      Échelle 1.5x
    </div>
  </Transform>

  <Transform :scale="0.8" :origin="'top left'">
    <div class="border border-secondary p-4">
      Échelle 0.8x
    </div>
  </Transform>
</div>

<Transform :scale="2" class="mt-8">
  <div class="gradient-border">
    <div class="gradient-border-content">
      Grand texte 2x
    </div>
  </div>
</Transform>

---
clicks: 5
---

# V-Click Animations

Animations au clic

<div>
  <p v-click>1. Apparaît au premier clic</p>
  <p v-click>2. Apparaît au deuxième clic</p>
  <p v-click>3. Apparaît au troisième clic</p>
</div>

<div v-click class="highlight-box mt-8">
  4. Une boîte qui apparaît
</div>

<div v-click="5" class="text-4xl gradient-text font-bold mt-8">
  5. Grand texte final
</div>

<Arrow v-click="3" x1="100" y1="200" x2="300" y2="250" />

---

# V-Clicks (pluriel)

Anime automatiquement tous les enfants

<v-clicks>

- Item 1
- Item 2
- Item 3
- Item 4

</v-clicks>

<v-clicks>

1. Premier point
2. Deuxième point
3. Troisième point

</v-clicks>

---

# V-After

Affiche du contenu après un certain clic

<v-clicks>

- Clic 1
- Clic 2
- Clic 3

</v-clicks>

<div v-after class="highlight-box mt-8">
  Apparaît après tous les v-clicks
</div>

---

# V-Switch

Bascule entre plusieurs contenus

<v-switch>
  <template #0>
    <div class="text-4xl">Premier contenu 🎯</div>
  </template>
  <template #1>
    <div class="text-4xl">Deuxième contenu ✨</div>
  </template>
  <template #2>
    <div class="text-4xl">Troisième contenu 🚀</div>
  </template>
</v-switch>

Cliquez pour voir changer le contenu

---

# V-Drag

Éléments déplaçables

<v-drag text-4xl>
  <div class="gradient-border inline-block">
    <div class="gradient-border-content">
      Déplacez-moi ! 👆
    </div>
  </div>
</v-drag>

<v-drag pos="200,200" text-2xl>
  <carbon-logo-github class="text-6xl" />
</v-drag>
