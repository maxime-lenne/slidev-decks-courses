---
layout: section-liquid
---

## Les Chaînes (Chains)

<div class="text-lg opacity-70 mt-4">3 min · Le coeur de LangChain · LCEL · opérateur | · Runnable</div>

---

### Le Chaînage d'Opérations

<div class="highlight-box">
  📚 <strong>Définition :</strong> un pipeline réutilisable et composable qui fait circuler les données étape par étape à travers des prompts,
  des modèles, des outils, des transformations et des output parsers.
</div>

<v-clicks>

```mermaid
flowchart LR
    A[Question Utilisateur] --> B[Récupérer Données]
    B --> C[Générer Prompt]
    C --> D[Appeler LLM]
    D --> E[Formater Résultat]
    E --> F[Réponse Finale]

    style A fill:#475569
    style F fill:#475569
    style D fill:#457b9d
```

</v-clicks>

<v-clicks>

- Chaque étape dépend de la précédente
- Les données doivent circuler entre les composants
- Besoin d'abstractions réutilisables

</v-clicks>

<!--
Le coeur du problème: composer plusieurs opérations
LangChain standardise ces patterns
-->

---

### LCEL — Composer des Chaînes

<v-clicks>

- **Séquentiel** — opérateur `|` (pipe)
  - `prompt | model | parser`
  - Chaque composant est un `Runnable`

- **Parallèle** — `RunnableParallel`
  - Exécuter plusieurs chaînes simultanément
  - `RunnableParallel({"a": chain_a, "b": chain_b})`

- **Conditionnel** — `RunnableBranch`
  - Choisir dynamiquement selon la valeur d'entrée
  - `RunnableBranch((condition, chain_a), chain_default)`

</v-clicks>

<!--
LLMChain, SimpleSequentialChain, RouterChain sont dépréciés depuis LangChain v0.2
LCEL (LangChain Expression Language) est la syntaxe moderne unifiée
Tous les composants implémentent l'interface Runnable : .invoke() / .stream() / .batch()
-->

---

```python {1-6|8-12|14-19|21-23|all}
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-4o-mini")
parser = StrOutputParser()

prompt_titre = ChatPromptTemplate.from_messages([
    ("system", "Tu es un rédacteur expert."),
    ("human", "Génère un titre accrocheur pour un article sur: {sujet}"),
])
chain_titre = prompt_titre | model | parser

# Enchaîner: le titre devient l'input de la chaîne contenu
prompt_contenu = ChatPromptTemplate.from_messages([
    ("system", "Tu es un rédacteur expert."),
    ("human", "Écris un paragraphe d'introduction pour cet article: {titre}"),
])
chain_contenu = prompt_contenu | model | parser

# Composition séquentielle
chain = chain_titre | (lambda titre: {"titre": titre}) | chain_contenu
result = chain.invoke({"sujet": "l'IA générative"})
```

<!--
LLMChain et SimpleSequentialChain dépréciés depuis v0.2
LCEL : chaque composant est un Runnable, l'opérateur | passe l'output au suivant
.invoke() remplace .run() — même pattern pour toute la librairie
-->

---
layout: end
---

### Exercice

<div class="flex flex-col items-center gap-4 pt-8">
  <a href="https://github.com/maxime-lenne/course-langchain-runnable-chain" target="_blank" class="flex items-center gap-3 text-xl no-underline opacity-80 hover:opacity-100 transition-opacity">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
    <code>maxime-lenne/course-langchain-runnable-chain</code>
  </a>
</div>
