---
layout: section
---

# Section 7 : Composants Communs

## `LearningObjective` · `ExerciseCard` · `CodeBlock`

Ces composants proviennent de `themes/common/components/` et sont disponibles dans tous les thèmes.

---

# LearningObjective

Encadré d'objectif pédagogique avec icône 🎯, bordure accent et support dark-mode.

**Props :** aucune — le contenu est passé via le slot par défaut.

<LearningObjective>
  **Comprendre les composants communs du thème**

  À la fin de cette slide vous saurez :
  - utiliser `<LearningObjective>` pour afficher un objectif pédagogique
  - passer du contenu riche (listes, gras) via le slot
</LearningObjective>

```html
<LearningObjective>
  **Comprendre les composants communs du thème**

  À la fin de cette slide vous saurez :
  - utiliser `<LearningObjective>` pour afficher un objectif pédagogique
  - passer du contenu riche (listes, gras) via le slot
</LearningObjective>
```

---

# ExerciseCard

Carte d'exercice avec badge difficulté coloré et durée estimée.

**Props :**
- `difficulty?: 'beginner' | 'intermediate' | 'advanced'`
- `duration?: string`

<ExerciseCard difficulty="intermediate" duration="20 min">

  Implémentez une chaîne LCEL qui :
  1. Prend une question en entrée
  2. Appelle un `ChatPromptTemplate`
  3. Passe la réponse à un `StrOutputParser`

  ```python
  chain = prompt | model | parser
  result = chain.invoke({"question": "Qu'est-ce que LCEL ?"})
  ```

</ExerciseCard>

```html
<ExerciseCard difficulty="intermediate" duration="20 min">
  Implémentez une chaîne LCEL ...
</ExerciseCard>
```

---

# CodeBlock

Wrapper de bloc de code avec titre dans le header et bouton **copier**.

**Props :**
- `title?: string` — titre affiché dans le header
- `lang?: string` — hint de langage (non utilisé directement, pour documentation)

<CodeBlock title="rag_chain.py">

```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def format_docs(docs: list) -> str:
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)
```

</CodeBlock>
