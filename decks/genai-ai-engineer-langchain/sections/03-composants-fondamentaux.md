---
layout: section-liquid
---

# Les Composants Fondamentaux

<div class="text-lg opacity-70 mt-4">4 min · Models · Prompts · Output Parsers</div>

<!--
Ces 4 composants sont la base de toute application LangChain
Chacun résout un problème spécifique — on va les détailler un par un
-->

---
layout: two-cols-header
---

### Models

::left::

```python {3-4|6-8|all}
from langchain.chat_models import init_chat_model

# Interface unifiée — changer de modèle = changer une ligne
model_openai    = init_chat_model("gpt-4o-mini")
model_ollama    = init_chat_model(
    "llama3.2", model_provider="ollama"
)

# Même API .invoke() pour tous
response = model_openai.invoke("Explique LangChain.")
print(response.content)
```

::right::

**Models** 🤖 — Interface unifiée pour tous les LLMs (OpenAI, Anthropic, Ollama…)

<v-clicks>

- `init_chat_model()` — instancie **n'importe quel** modèle par son nom
- Changez de provider sans toucher au reste de la chaîne
- Même interface : `.invoke()` · `.stream()` · `.batch()`
- Retourne un `AIMessage` avec `.content` et les métadonnées

</v-clicks>

<!--
init_chat_model() remplace ChatOpenAI/ChatAnthropic directs depuis LangChain v0.2
Le model_provider est auto-détecté à partir du nom si non précisé
-->

---
layout: two-cols-header
---

### Prompts

::left::

```python {3-7|9-14|all}
from langchain_core.prompts import ChatPromptTemplate

# Messages structurés : system + human
# Les variables {langue} et {texte} sont auto-inférées
prompt = ChatPromptTemplate.from_messages([
    ("system", "Tu es un traducteur expert."),
    ("human", "Traduire en {langue}: {texte}"),
])

chain = prompt | model

result = chain.invoke(
  {"langue": "français", "texte": "Hello World"}
)
# Output: AIMessage(content="Bonjour le monde")
```

::right::

**Prompts** 📝 — Templates réutilisables avec variables dynamiques

<v-clicks>

- `from_messages()` — définit les rôles `system` / `human` / `ai`
- Variables **auto-inférées** — `input_variables` n'est plus requis
- `PromptTemplate` pour les modèles texte, `ChatPromptTemplate` pour les chat models
- Composable avec `|` : `prompt | model | parser`

</v-clicks>

<!--
langchain_core.prompts remplace langchain.prompts (package stable sans dépendances)
Le pipe | connecte chaque Runnable — pattern central de LCEL
-->

---
layout: two-cols-header
---

### Output Parsers

::left::

```python {3-8|10-16|all}
from langchain_core.output_parsers import StrOutputParser
from langchain_core.output_parsers import JsonOutputParser

# Texte brut
chain = ChatPromptTemplate.from_messages([
    ("human", "Explique {concept} en une phrase."),
]) | model | StrOutputParser()

result = chain.invoke({"concept": "LangChain"})
# → str: "LangChain est un framework..."

# JSON structuré
chain_json = ChatPromptTemplate.from_messages([
    ("system", "Réponds uniquement en JSON valide."),
    ("human", "Donne-moi {n} frameworks Python pour l'IA."),
]) | model | JsonOutputParser()

result = chain_json.invoke({"n": 3})
# → dict: {"frameworks": ["LangChain", "LlamaIndex", ...]}
```

::right::

**Output Parsers** 🔍 — Structurer les réponses LLM (texte, JSON, objets)

<v-clicks>

- `StrOutputParser` — extrait `.content` de l'`AIMessage` en `str`
- `JsonOutputParser` — parse automatiquement le JSON de la réponse
- `PydanticOutputParser` — valide et type la réponse via un schéma Pydantic
- En cas d'erreur de parsing : `OutputFixingParser` ré-essaie avec le LLM

</v-clicks>

<!--
StrOutputParser est le plus courant — il termine presque toutes les chaînes
JsonOutputParser injecte les instructions de format dans le prompt automatiquement
-->

---
layout: end
---

### Exercice

<div class="flex flex-col items-center gap-4 pt-8">
  <a href="https://github.com/maxime-lenne/course-langchain-introduction" target="_blank" class="flex items-center gap-3 text-xl no-underline opacity-80 hover:opacity-100 transition-opacity">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
    <code>maxime-lenne/course-langchain-introduction</code>
  </a>
</div>
