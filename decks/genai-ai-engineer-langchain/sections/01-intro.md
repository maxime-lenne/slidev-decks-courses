---
layout: two-cols-header
---

### Prérequis & Objectifs

::left::

### Prérequis

- **Python** intermédiaire — fonctions, classes, décorateurs
- Notions d'**API REST** et JSON
- Clé API **OpenAI** ou **Mistral AI**
- `pip install langchain langchain-openai`

**Niveau :** développeurs avec une première expérience Python

::right::

### Objectifs

À l'issue du module vous serez capable de :

- Utiliser les composants fondamentaux de LangChain
- Composer des **chaînes** avec l'opérateur `|` (LCEL)
- Construire un **pipeline RAG** complet (ingestion → retrieval)
- Créer un **agent** avec outils et mémoire persistante
- Appréhender LangGraph &amp; LangSmith en production

---
layout: default
---

<script setup>
const tocItems = [
  { title: 'Présentation & Contexte', to: 5 },
  { title: 'Les Composants Fondamentaux', to: 9 },
  { title: 'Les Chaînes & LCEL', to: 14 },
  { title: 'RAG Pattern', to: 19 },
  { title: 'Agents & Tools', to: 25 },
  { title: 'Agent RAG — Exemple Complet', to: 31 },
  { title: 'Conclusion', to: 36 },
  { title: 'Au-delà de LangChain', to: 41 },
]
</script>

<TocCustom :items="tocItems" />

---
src: ../../templates/slides.md#1
---
