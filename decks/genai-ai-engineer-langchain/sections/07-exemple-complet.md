---
layout: section-liquid
---

## Exemple Complet: Agent RAG

<div class="text-lg opacity-70 mt-4">3 min · Tool · Prompt · Mémoire · Invocation</div>

---
layout: two-cols-header
---

### Agent RAG — 1/3 : Le Tool

::left::

```python {1-2|4-10|all}
from langchain.tools import tool
from langchain_core.documents import Document

@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Recherche des informations dans la base de documents internes."""
    docs = retriever.invoke(query)
    serialized = "\n\n".join(
        f"Source: {doc.metadata.get('source', 'inconnue')}\n{doc.page_content}"
        for doc in docs
    )
    return serialized, docs
```

::right::

<v-clicks>

- `response_format="content_and_artifact"` — retourne un tuple `(str, list)`
- `serialized` → texte injecté dans le contexte du LLM
- `docs` → artefact brut, accessible pour tracer les sources
- Le **docstring** guide le LLM sur quand appeler cet outil

</v-clicks>

<!--
content_and_artifact : sépare ce que voit le LLM (texte) de ce qu'on expose (documents)
Le retriever est celui créé en phase d'ingestion : vector_store.as_retriever()
-->

---
layout: two-cols-header
---

### Agent RAG — 2/3 : Prompt & Agent

::left::

```python {1-7|9-16|all}
from langchain.agents import create_agent
from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-4o-mini")

system_prompt = (
    "Tu es un assistant RAG. "
    "Utilise toujours l'outil `retrieve` pour rechercher "
    "des informations avant de répondre. "
    "Si l'information n'est pas dans les documents, "
    "dis-le clairement."
)

agent = create_agent(
    model,
    tools=[retrieve],
    system_prompt=system_prompt,
)
```

::right::

<v-clicks>

- `system_prompt` — dit à l'agent **quand** et **comment** utiliser l'outil
- `tools=[retrieve]` — liste des outils disponibles
- L'agent est **stateless** par défaut (pas de mémoire entre sessions)
- `create_agent` construit un graph LangGraph en arrière-plan

</v-clicks>

<!--
Le system_prompt est critique : sans instruction explicite, le LLM peut décider de ne pas appeler retrieve()
create_agent remplace AgentExecutor (déprécié depuis v0.2)
-->

---
layout: two-cols-header
---

### Agent RAG — 3/3 : Mémoire & Invocation

::left::

```python {1-2|4-9|11-14|16-19|all}
from langgraph.checkpoint.memory import MemorySaver

# Ajouter la mémoire persistante par session
memory = MemorySaver()
agent = create_agent(
    model,
    tools=[retrieve],
    system_prompt=system_prompt,
    checkpointer=memory,
)

# thread_id = session isolée par utilisateur
config = {"configurable": {"thread_id": "session_1"}}

response = agent.invoke(
    {"messages": [{"role": "user", "content": "Quelles réunions concernent Neolink ?"}]},
    config=config,
)
print(response["messages"][-1].content)
```

::right::

<v-clicks>

- `MemorySaver` + `checkpointer` — active la mémoire conversationnelle
- `thread_id` — chaque utilisateur a sa propre session isolée
- `response["messages"][-1]` — dernier message = réponse finale de l'agent
- `ToolMessage` dans `messages` → sources consultées accessibles

</v-clicks>

<!--
Sans checkpointer : l'agent répond mais oublie à chaque invoke()
Avec checkpointer : l'historique complet est injecté automatiquement
-->

---
layout: end
---

### Exercice

<div class="flex flex-col items-center gap-4 pt-8">
  <a href="https://github.com/maxime-lenne/course-langchain-agents" target="_blank" class="flex items-center gap-3 text-xl no-underline opacity-80 hover:opacity-100 transition-opacity">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
    <code>maxime-lenne/course-langchain-agents</code>
  </a>
</div>
