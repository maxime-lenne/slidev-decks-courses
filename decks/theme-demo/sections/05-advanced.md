---
layout: section
---

# Section 5 : Fonctionnalités Avancées

---

# Grilles & Layouts Personnalisés

<div class="grid grid-cols-3 gap-4">
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <carbon-cloud class="text-4xl mb-2" />
      <div>Cloud</div>
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <carbon-security class="text-4xl mb-2" />
      <div>Sécurité</div>
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content text-center">
      <carbon-data-base class="text-4xl mb-2" />
      <div>Database</div>
    </div>
  </div>
</div>

<div class="grid-4 mt-8">
  <div class="badge text-center">Feature 1</div>
  <div class="badge text-center">Feature 2</div>
  <div class="badge text-center">Feature 3</div>
  <div class="badge text-center">Feature 4</div>
</div>

---

# Composants Vue Inline

<div class="flex gap-4">
  <button
    @click="count++"
    class="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-green-500 text-white"
  >
    Compteur: {{ count }}
  </button>

</div>

<div v-if="count > 5" class="highlight-box mt-8">
  🎉 Vous avez cliqué plus de 5 fois !
</div>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

---

# Classes Utilitaires UnoCSS

<div class="grid grid-cols-2 gap-4">
  <div class="p-4 bg-blue-500 text-white rounded-lg">
    bg-blue-500
  </div>
  <div class="p-4 bg-green-500 text-white rounded-lg">
    bg-green-500
  </div>
  <div class="p-4 gradient-bg text-white rounded-lg">
    gradient-bg (custom)
  </div>
  <div class="p-4 border-2 border-primary rounded-lg gradient-text font-bold text-2xl">
    gradient-text (custom)
  </div>
</div>

<div class="mt-8 grid grid-cols-4 gap-2">
  <div class="h-20 bg-primary rounded"></div>
  <div class="h-20 bg-secondary rounded"></div>
  <div class="h-20 bg-primary-light rounded"></div>
  <div class="h-20 bg-secondary-dark rounded"></div>
</div>

---

# Transitions & Animations

<div class="grid grid-cols-2 gap-4">
  <div v-click class="animate-bounce">
    <div class="gradient-border">
      <div class="gradient-border-content">
        Bounce Animation
      </div>
    </div>
  </div>

  <div v-click class="animate-pulse">
    <div class="gradient-border">
      <div class="gradient-border-content">
        Pulse Animation
      </div>
    </div>
  </div>
</div>

<div v-click class="mt-8 animate-spin inline-block text-6xl">
  ⚙️
</div>

---

# Media Queries & Responsive

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="gradient-border">
    <div class="gradient-border-content">
      Responsive<br>Grid
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content">
      Adapte<br>Automatiquement
    </div>
  </div>
  <div class="gradient-border">
    <div class="gradient-border-content">
      Selon<br>Écran
    </div>
  </div>
</div>

<div class="mt-8 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-4xl gradient-text font-bold">
  Texte responsive
</div>
