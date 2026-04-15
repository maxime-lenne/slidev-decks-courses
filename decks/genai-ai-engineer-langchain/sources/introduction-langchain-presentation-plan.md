# Introduction à LangChain - Plan de Présentation

**Duration:** 8-10 minutes
**Audience:** Développeurs techniques
**Format:** Conférence/talk
**Venue:** Session de formation

---

## Core Message

> "LangChain permet le chaînage d'opérations pour créer des applications LLM puissantes et modulaires"

## Call to Action

Créer leur premier prototype LangChain en utilisant les patterns de chaînage présentés.

---

## Time Allocation

| Section | Time | Focus |
|---------|------|-------|
| 1. Opening Hook | 1 min | Montrer la complexité sans LangChain |
| 2. Context/Problem | 1 min | Pourquoi le chaînage est essentiel |
| 3. Main Content - Concepts LangChain | 4 min | Chaînes, prompts, composants |
| 4. Demo/Examples | 2 min | Exemple concret de chaînage |
| 5. Wrap-up | 1 min | Prochaines étapes |

---

## Section 1: Opening Hook (1 min)

### Hook Options

**Option A - Code Comparison:**
> "Sans LangChain: 50 lignes pour interroger un PDF. Avec LangChain: 5 lignes."

**Option B - Problem Statement:**
> "Vous avez un LLM. Vous avez des données. Comment les connecter intelligemment?"

**Option C - Visual:**
> Diagramme: Spaghetti code vs. Chaîne claire et modulaire

### Context to Establish

- Les LLMs seuls sont limités (pas d'accès aux données, pas de mémoire)
- Construire des apps LLM nécessite beaucoup de "plumbing code"
- LangChain résout ce problème avec des abstractions réutilisables

---

## Section 2: Context/Problem (1 min)

### Key Points

- **Le problème du chaînage**: Comment composer plusieurs opérations LLM?
- **Exemples de chaînes courantes**:
  - Récupérer des données → Générer un prompt → Appeler LLM → Formater résultat
  - Question utilisateur → Recherche vectorielle → Contexte → Réponse

### Visuals Needed

- [ ] Diagramme: Flow d'une application LLM typique
- [ ] Schema: Les composants qui doivent communiquer

### Talking Points

- Sans framework: code répétitif, difficile à tester, difficile à maintenir
- LangChain standardise ces patterns

---

## Section 3: Main Content - Concepts LangChain (4 min)

### 3.1 Les Building Blocks (1.5 min)

**Key Points:**

- **Models**: Interface unifiée pour LLMs (OpenAI, Anthropic, etc.)
- **Prompts**: Templates réutilisables et composables
- **Output Parsers**: Structurer les réponses LLM
- **Memory**: Maintenir le contexte entre interactions

**Code Example:**

```python
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI

template = "Traduire en {langue}: {texte}"
prompt = PromptTemplate(
    input_variables=["langue", "texte"],
    template=template
)
```

### 3.2 Les Chaînes (Chains) (1.5 min)

**Key Points:**

- SimpleChain: Une séquence linéaire d'opérations
- SequentialChain: Passer les outputs entre étapes
- RouterChain: Logique conditionnelle

**Code Example:**

```python
from langchain.chains import LLMChain, SimpleSequentialChain

# Chaîne 1: Générer un titre
chain_titre = LLMChain(llm=llm, prompt=prompt_titre)

# Chaîne 2: Écrire le contenu
chain_contenu = LLMChain(llm=llm, prompt=prompt_contenu)

# Composer les chaînes
overall_chain = SimpleSequentialChain(
    chains=[chain_titre, chain_contenu]
)
```

### 3.3 RAG Pattern (1 min)

**Key Points:**

- Retrieval-Augmented Generation = Connecter LLM à vos données
- Vector stores pour la recherche sémantique
- Document loaders pour ingérer des sources variées

**Visuals Needed:**

- [ ] Diagramme: Architecture RAG (Document → Embeddings → Vector Store → Retrieval → LLM)

**Code Example:**

```python
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

# Créer un retriever
retriever = vectorstore.as_retriever()

# Chaîne Q&A avec contexte
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever
)

# Poser une question avec contexte automatique
answer = qa_chain.run("Comment fonctionne X?")
```

---

## Section 4: Demo/Examples (2 min)

### Demo Option A: Chatbot avec Mémoire

**What to show:**

```python
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

# Conversation 1
conversation.predict(input="Je m'appelle Alice")

# Conversation 2 - se souvient du contexte
conversation.predict(input="Quel est mon nom?")
# Output: "Votre nom est Alice"
```

**Talking Points:**

- La mémoire est automatiquement gérée
- Pas besoin de manipuler manuellement l'historique
- Différents types de mémoire disponibles (buffer, summary, vector)

### Demo Backup Plan

- Screenshots préparés: [x] Notebook avec outputs
- Recording available: [ ]
- Explanation script: Expliquer le flow même si la démo échoue

---

## Section 5: Wrap-up (1 min)

### Key Takeaways

1. **LangChain = Lego pour LLMs**: Composants réutilisables
2. **Chaînage = Puissance**: Composer des opérations complexes simplement
3. **Abstraction = Productivité**: Focus sur la logique, pas le plumbing

### Call to Action

- Installer: `pip install langchain openai`
- Premier exercice: Créer une chaîne simple (prompt → LLM → output parser)
- Ressources: [LangChain docs](https://python.langchain.com/), [LangChain cookbook](https://github.com/langchain-ai/langchain/tree/master/cookbook)

---

## Diagrams to Create

1. **LangChain Architecture Overview** - Vue d'ensemble des composants
   - Type: Mermaid flowchart
   - Key elements: Models, Prompts, Chains, Memory, Data Loaders, Vector Stores

2. **RAG Flow Diagram** - Comment fonctionne Retrieval-Augmented Generation
   - Type: Mermaid sequence diagram
   - Key elements: User Query → Embedding → Vector Search → Context Retrieval → LLM → Response

3. **Chain Composition** - Exemple de chaînage séquentiel
   - Type: Mermaid flowchart
   - Key elements: Input → Chain 1 → Intermediate Output → Chain 2 → Final Output

---

## Code Examples to Include

1. **Simple Prompt Template** (Python)
   - Purpose: Montrer la base de LangChain
   - Lines to highlight: template definition, variable substitution
   - Progressive reveal: No (simple example)

2. **Sequential Chain Example** (Python)
   - Purpose: Démontrer le chaînage d'opérations
   - Lines to highlight: chain composition, flow of data
   - Progressive reveal: Yes (build step by step)

3. **RAG Chatbot** (Python)
   - Purpose: Use case complet et pratique
   - Lines to highlight: retriever setup, chain creation
   - Progressive reveal: Yes (show how pieces connect)

4. **Conversation Memory** (Python)
   - Purpose: Montrer la gestion d'état
   - Lines to highlight: memory initialization, automatic context
   - Progressive reveal: No (concise example)

---

## Potential Q&A

### Anticipated Questions

1. **"LangChain vs. appeler directement l'API OpenAI?"**
   - Answer: API directe = bien pour un appel simple. LangChain = essentiel dès que vous avez du chaînage, de la mémoire, ou des sources de données multiples. Réduction de boilerplate de 80%+.

2. **"Est-ce que LangChain supporte d'autres LLMs qu'OpenAI?"**
   - Answer: Oui! Interface unifiée pour 50+ providers (Anthropic, Cohere, HuggingFace, modèles locaux). Changez de modèle en changeant une ligne.

3. **"Performance et coûts?"**
   - Answer: LangChain ajoute un overhead minimal (<10ms). Pour les coûts: utilisez streaming, caching, et modèles appropriés à la tâche (GPT-3.5 vs GPT-4).

4. **"Prêt pour la production?"**
   - Answer: Oui, utilisé par des milliers d'entreprises. Ajoutez LangSmith pour monitoring et debugging. Attention à la gestion des erreurs et rate limiting.

5. **"Courbe d'apprentissage?"**
   - Answer: Concepts de base en 1-2h. Maîtrise en 1-2 semaines. Documentation excellente + communauté active.

---

## Presenter Checklist

### Before Presentation

- [ ] Run through entire presentation (timing: 8-10 min)
- [ ] Test all code examples in a fresh environment
- [ ] Prepare backup screenshots for demos
- [ ] Increase font sizes (code should be readable from back of room)
- [ ] Close unnecessary apps
- [ ] Have requirements.txt ready if participants want to follow along

### During Presentation

- [ ] Start with the hook showing the before/after comparison
- [ ] Emphasize the "chaining" concept throughout
- [ ] Use the diagrams to explain architecture visually
- [ ] Keep code examples on screen long enough to read
- [ ] End with clear next steps for participants

### Lightning Talk Specific

- [ ] Stay strictly on time (10 min max)
- [ ] Cut sections if running over (reduce demo time first)
- [ ] Practice pacing (don't rush the key concepts)
- [ ] Have a visible timer

---

## Appendix: Slide Outline

1. **Title slide**: "Introduction à LangChain - Chaîner des opérations LLM"
2. **Hook**: Code comparison (50 lines vs 5 lines)
3. **Problem**: Pourquoi avons-nous besoin de LangChain?
4. **Core Concept**: Le chaînage d'opérations
5. **Building Blocks**: Models, Prompts, Output Parsers, Memory
6. **Chains**: Types de chaînes et composition
7. **RAG Pattern**: Architecture diagram
8. **Code Example 1**: Simple chain
9. **Code Example 2**: Sequential chain
10. **Demo**: Conversation avec mémoire (code + output)
11. **Use Cases**: Quand utiliser LangChain?
12. **Getting Started**: Installation et premier projet
13. **Resources & Next Steps**: Liens et call to action
14. **Q&A**: Questions?

**Total: 14 slides** (perfect for 8-10 min talk)

---

## Additional Resources to Mention

- **Documentation**: <https://python.langchain.com/>
- **Cookbook**: <https://github.com/langchain-ai/langchain/tree/master/cookbook>
- **LangSmith**: Platform de monitoring et debugging
- **Community**: Discord actif avec 50k+ membres

---

_Plan created: 2026-02-09_
_Ready for slide generation: [x]_
