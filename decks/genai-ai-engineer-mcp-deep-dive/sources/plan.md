# MCP Deep Dive — Plan de présentation

**Durée :** 45-60 minutes
**Audience :** Mixte technique (juniors → seniors familiers LLM / agents)
**Format :** Lecture / talk + démo légère (1-2 démos)
**Langue :** Français
**Thème :** `maxime-lenne`
**Cover :** [photo Scott Rodgerson](https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=1920) — câbles réseau bleus (métaphore protocole)

---

## Core Message

> **« MCP est un vrai protocole — pas juste une API. Architecture client/server JSON-RPC, primitives strictes, capabilities negotiation : à traiter avec la même rigueur qu'un protocole réseau. »**

## Call to Action

> **Construire un premier serveur FastMCP cette semaine** : un `hello-world` Python en 10 lignes, lancé et inspecté avec MCP Inspector.

---

## Sources utilisées

| Source | Description |
|---|---|
| `sources/structure-links.md` | Trame fournie par l'auteur (10 thématiques + URLs officielles) |
| Web — [modelcontextprotocol.io/docs/learn/architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Architecture officielle MCP (host, client, server, layers, transports, JSON-RPC) |
| Web — [modelcontextprotocol.io/docs/learn/server-concepts](https://modelcontextprotocol.io/docs/learn/server-concepts) | Primitives server : tools, resources, prompts + UX patterns |
| Web — [modelcontextprotocol.io/docs/learn/client-concepts](https://modelcontextprotocol.io/docs/learn/client-concepts) | Primitives client : sampling, elicitation, roots |
| Web — [modelcontextprotocol.io/specification/2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) | Spec officielle (version cible) |
| Web — [gofastmcp.com/getting-started/welcome](https://gofastmcp.com/getting-started/welcome) | FastMCP : décorateurs, server/client/apps, adoption |
| Web — [docs.langchain.com/oss/python/langchain/mcp](https://docs.langchain.com/oss/python/langchain/mcp) | `langchain-mcp-adapters` — consommer MCP depuis LangChain |

---

## Time Allocation

| # | Section | Temps | Slides | Focus |
|---|---|---|---|---|
| 1 | Intro perso + Hook | 3 min | 2 | Présentation + accroche « MCP = USB-C des LLM ? Pas exactement. » |
| 2 | Pourquoi MCP existe | 5 min | 3 | Problème N×M des intégrations LLM ↔ tools |
| 3 | Architecture | 8 min | 5 | Host / Client / Server + 2 couches (data + transport) |
| 4 | Spécifications du protocole | 7 min | 5 | JSON-RPC 2.0, lifecycle, capabilities, version `2025-11-25`, SDKs |
| 5 | Primitives **serveur** | 7 min | 5 | Tools / Resources / Prompts + notifications |
| 6 | Primitives **client** | 5 min | 4 | Sampling, Elicitation, Roots, Logging (HITL) |
| 7 | Extensions du protocole | 4 min | 3 | Auth (OAuth), Apps, Tasks (expérimental) |
| 8 | Développer un serveur MCP = SWE classique | 3 min | 2 | Tests, CI/CD, versioning, registry, hosting, observability + outils (Inspector, MCPman) |
| 9 | FastMCP en profondeur | 10 min | 6 | Pourquoi, décorateurs `@tool/@resource/@prompt`, server/client/apps, intégrations |
| 10 | Agentic coding + LangChain/LangGraph | 3 min | 2 | Skills MCP + `langchain-mcp-adapters` |
| 11 | Démo Inspector (légère) | 3 min | 2 | Lancer un FastMCP, l'inspecter, appeler un tool |
| 12 | Take-aways + CTA + Q&A | 3 min | 3 | Récap + appel à construire + slide template CTA |
| | **Total** | **~60 min** | **~42 slides** | |

> Variante 45 min : raccourcir les sections 7 (extensions) et 10 (LangChain) à 1 slide chacune, économiser ~6 min.

---

## Section 1 : Intro perso + Hook (3 min, 2 slides)

### Key points
- Slide 1 : template `Présentation` (Maxime Lenne, CTO-as-a-service, contacts, QR LinkedIn)
- Slide 2 : Hook — une capture d'écran d'agent Claude utilisant 3 MCP servers (Sentry, filesystem, GitHub). Question : *« Comment savent-ils tous parler la même langue ? »*

### Visuals
- [ ] Slide template `Présentation` (réutilisé depuis `decks/templates/slides.md`)
- [ ] Screenshot agent Claude avec plusieurs MCP connectés (à capturer)

### Source
- Template projet + connaissances générales

---

## Section 2 : Pourquoi MCP existe (5 min, 3 slides)

### Key points
- Le problème **N×M** : N apps LLM × M tools = explosion d'intégrations custom
- Avant MCP : chaque agent réimplémentait son protocole tool calling
- Après MCP : un **standard ouvert**, un transport, des primitives — n'importe quel host parle à n'importe quel server

### Talking points
- L'analogie USB-C est utile en hook, **mais** USB-C reste un cable. MCP est un protocole **stateful** avec négociation de capabilités → plutôt SMTP ou LSP.
- Insister : MCP **ne dit pas** comment le LLM doit utiliser le contexte. Il transporte, point.

### Visuals
- [ ] Diagramme N×M → 1 protocole central (Mermaid graph)
- [ ] Comparaison rapide MCP ≠ « OpenAPI pour LLM » (pas de comparaison OpenAI Functions explicite, mais positionnement)

### Source
- modelcontextprotocol.io/docs/learn/architecture

---

## Section 3 : Architecture (8 min, 5 slides)

### Key points
- **Trois participants** : Host (l'app : Claude Desktop, VS Code…) → instancie 1+ Clients → chaque Client maintient 1 connexion dédiée à 1 Server
- **Local vs Remote** : Stdio (single-client) vs Streamable HTTP (multi-client)
- **Deux couches** : *Data layer* (JSON-RPC, primitives, lifecycle) et *Transport layer* (stdio / Streamable HTTP + auth)
- La **même** JSON-RPC peut transiter sur n'importe quel transport

### Visuals
- [ ] Diagramme Host → Clients → Servers (reprendre celui de la doc officielle, redessiné Mermaid)
- [ ] Tableau Stdio vs Streamable HTTP (perf, multi-client, auth)
- [ ] Schéma en oignon : Transport (extérieur) entoure Data (intérieur)

### Talking points
- Insister sur **1 client = 1 server**. Pas de fan-out côté MCP, c'est le host qui orchestre.
- Streamable HTTP a remplacé HTTP+SSE → vérifier la version qu'on cible.

### Source
- modelcontextprotocol.io/docs/learn/architecture

---

## Section 4 : Spécifications du protocole (7 min, 5 slides)

### Key points
- **JSON-RPC 2.0** : requêtes (avec `id`), réponses, **notifications** (sans `id`)
- **Lifecycle** :
  1. `initialize` (client → server) avec `protocolVersion`, `capabilities`, `clientInfo`
  2. Réponse server avec ses capabilities + `serverInfo`
  3. `notifications/initialized` (client → server)
  4. Opérations
  5. Shutdown
- **Capabilities negotiation** : chacun déclare ce qu'il supporte (`tools.listChanged`, `elicitation`, `resources`…). Pas de version compatible ? → connexion fermée
- **Version cible** : `2025-11-25` (spec actuelle)
- **SDKs officiels** : TypeScript, Python, Kotlin, Java, C#, Swift…

### Visuals
- [ ] Snippet JSON `initialize` request + response (highlight `protocolVersion`, `capabilities`) — code minimal mais commenté
- [ ] Séquence Mermaid : initialize → initialized → tools/list → tools/call

### Talking points
- Stateful, sauf sous-ensemble stateless possible avec Streamable HTTP
- Bien expliquer pourquoi capabilities negotiation = robustesse (évite les appels supportés par l'un mais pas l'autre)

### Source
- modelcontextprotocol.io/docs/learn/architecture
- modelcontextprotocol.io/specification/2025-11-25

---

## Section 5 : Primitives **serveur** (7 min, 5 slides)

### Key points

| Primitive | Contrôlée par | Méthodes | Cas d'usage |
|---|---|---|---|
| **Tools** | Modèle | `tools/list`, `tools/call` | Actions : query DB, send email, run code |
| **Resources** | Application | `resources/list`, `resources/read`, `resources/subscribe` | Données contextuelles : fichiers, schémas |
| **Prompts** | Utilisateur | `prompts/list`, `prompts/get` | Templates paramétrés : « plan-vacation » |

- Tools = JSON Schema sur `inputSchema` → validation et auto-completion côté client
- Resources = URIs (`file://`, `calendar://`, `weather://forecast/{city}`) + MIME type + templates dynamiques
- Prompts = slash commands type `/plan-vacation`
- **Notifications** : `tools/list_changed`, `resources/list_changed` → invalidation cache côté client

### Visuals
- [ ] Tableau « qui contrôle quoi » (Model / Application / User)
- [ ] Snippet JSON `tools/list` response (1 tool définition complète avec `inputSchema`)
- [ ] Schéma URI templates (`weather://forecast/{city}` → completion)

### Talking points
- Un tool **peut** demander consent utilisateur → c'est le host qui décide, pas le server
- Resources passives ≠ Tools actifs : confusion fréquente

### Source
- modelcontextprotocol.io/docs/learn/server-concepts

---

## Section 6 : Primitives **client** (5 min, 4 slides)

### Key points
- Le client peut **aussi** exposer des features au server (renversement classique) :

| Primitive client | Méthode | Cas d'usage |
|---|---|---|
| **Sampling** | `sampling/createMessage` | Server demande au client de faire un appel LLM (server agnostique du LLM) |
| **Elicitation** | `elicitation/create` | Server demande une info à l'utilisateur (preferences, confirmation) |
| **Roots** | `roots/list`, `roots/list_changed` | Client dit au server quels dossiers sont en scope (file://) |
| **Logging** | `logging/setLevel` + notifications | Server envoie ses logs au client |

- **Human-in-the-loop** : sampling et elicitation impliquent un checkpoint UI obligatoire dans le client
- Roots = **coordination**, pas sécurité (le server peut ignorer — sandboxing OS reste nécessaire)

### Visuals
- [ ] Diagramme sequence Mermaid : sampling avec 2 approvals utilisateur
- [ ] Tableau primitives client / méthode / cas d'usage

### Talking points
- Sampling = server reste model-independent → pas besoin d'embarquer Anthropic/OpenAI SDK
- Elicitation **n'est jamais** pour password/API key (règle de la spec)

### Source
- modelcontextprotocol.io/docs/learn/client-concepts

---

## Section 7 : Extensions du protocole (4 min, 3 slides)

### Key points
- **Auth** : OAuth 2.1 recommandé sur Streamable HTTP, bearer tokens, API keys, headers custom
- **Apps** (utility) : interfaces UI livrées dans la conversation
- **Tasks (expérimental)** : wrappers d'exécution durable → résultats différés, status tracking, batch (parfait pour computations longues)

### Visuals
- [ ] Slide synthèse : 3 extensions avec icône + 1 phrase chacune
- [ ] Snippet OAuth flow (header `Authorization: Bearer …`)

### Talking points
- Auth : pour un MCP remote multi-tenant en prod, OAuth obligatoire — pas négociable
- Tasks encore expérimental → à utiliser avec prudence en prod 2026

### Source
- modelcontextprotocol.io/specification/2025-11-25 (sections auth, apps, tasks)

---

## Section 8 : Développer un serveur MCP = software engineering classique (3 min, 2 slides)

### Key points
- Un serveur MCP suit les **mêmes règles** qu'un projet logiciel sérieux :
  - **Tests** unitaires + intégration (mock client MCP)
  - **CI/CD** : lint, type-check, tests, build
  - **Versioning** sémantique
  - **Registry** : publication pour découverte (MCP registry officiel)
  - **Hosting** : stdio = process local, Streamable HTTP = Cloud Run / Fly / K8s
  - **Observability** : logs structurés, métriques, tracing — comme une API REST
- **Outils** dédiés : **MCP Inspector** (debug visuel client/server), **MCPman** (gestionnaire)

### Visuals
- [ ] Slide unique : checklist DX (tests, CI, versioning, registry, hosting, obs)
- [ ] Capture MCP Inspector (preview)

### Talking points
- Le message : *ne pas réinventer une discipline SWE pour MCP*. Toute la chaîne CI/CD habituelle s'applique.

### Source
- Connaissances générales SWE + outils MCP officiels

---

## Section 9 : FastMCP en profondeur (10 min, 6 slides)

### Key points
- **C'est quoi ?** Framework Python de référence (téléchargé ~1M/jour, ~70% des serveurs MCP)
- **Décorateurs** :
  - `@mcp.tool` → expose une fonction Python comme tool MCP (schema auto-généré depuis les type hints)
  - `@mcp.resource("uri://template/{id}")` → ressource avec template
  - `@mcp.prompt` → prompt paramétré
- **Trois piliers** :
  1. **Servers** — exposer des fonctionnalités
  2. **Clients** — consommer n'importe quel server MCP (local ou remote)
  3. **Apps** — interfaces UI dans la conversation
- **Intégrations** : ASGI (FastAPI), auth providers, hosting (Prefect Horizon)
- Code minimal : un `hello-world` server complet en ~10 lignes (concept, pas montré en long snippet)

### Visuals
- [ ] Slide « pourquoi FastMCP » (chiffres adoption + ce que ça fait à ta place)
- [ ] Snippet **minimal** d'un tool décoré (5-6 lignes, focus sur le décorateur)
- [ ] Snippet **minimal** d'un client FastMCP (3-4 lignes)
- [ ] Schéma 3 piliers (servers / clients / apps)

### Talking points
- FastMCP 1.0 a été mergé dans le SDK officiel ; FastMCP standalone = la version maintenue, plus riche
- Bien dire : *les décorateurs masquent la complexité JSON-RPC, mais ce qu'on a vu en sections 3-6 reste vrai en dessous*

### Source
- gofastmcp.com/getting-started/welcome

---

## Section 10 : Agentic coding + LangChain / LangGraph (3 min, 2 slides)

### Key points
- **Agent Skills** (modelcontextprotocol.io/docs/develop/build-with-agent-skills) : construire son MCP avec un agent (Claude Code par ex)
- **LangChain** + `langchain-mcp-adapters` : convertir n'importe quel server MCP en `Tool` LangChain → utilisable dans LangGraph
- TL;DR : MCP s'intègre dans l'écosystème agent existant sans friction

### Visuals
- [ ] Schéma : MCP server → adapter → LangChain Tool → LangGraph node
- [ ] Lien GitHub `langchain-ai/langchain-mcp-adapters`

### Source
- docs.langchain.com/oss/python/langchain/mcp
- github.com/langchain-ai/langchain-mcp-adapters

---

## Section 11 : Démo MCP Inspector (3 min, 2 slides)

### Key points
- Lancer un serveur FastMCP minimal en local
- Ouvrir MCP Inspector (`npx @modelcontextprotocol/inspector`)
- Montrer : initialize → capabilities → tools/list → tools/call → notification

### Demo plan
- **Setup** : projet préparé sur le poste (FastMCP installé, serveur `hello.py` prêt)
- **Commandes** :

  ```bash
  uv run hello.py
  # autre terminal
  npx @modelcontextprotocol/inspector uv run hello.py
  ```

- **À montrer** :
  1. La frame `initialize` côté Inspector
  2. La liste des tools
  3. Un `tools/call` interactif
- **Fallback si fail** : screenshots préparés des 3 étapes

### Visuals
- [ ] Screenshot Inspector (au cas où)
- [ ] Slide « ce que vous venez de voir » (récap de ce qui se passe en JSON-RPC)

### Source
- Connaissances FastMCP + MCP Inspector

---

## Section 12 : Take-aways + CTA + Q&A (3 min, 3 slides)

### Key points
- **3 take-aways** :
  1. MCP = vrai protocole (lifecycle, capabilities, primitives strictes)
  2. Server primitives (tools/resources/prompts) ≠ Client primitives (sampling/elicitation/roots/logging)
  3. FastMCP réduit le code à l'os, mais la rigueur SWE reste obligatoire
- **CTA** : construire un FastMCP cette semaine + l'inspecter
- **Liens** : spec, FastMCP, Inspector, langchain-mcp-adapters
- Slide template `Let's build together` (depuis `decks/templates/slides.md`)

### Visuals
- [ ] Slide 3 take-aways (icônes)
- [ ] Slide ressources avec QR codes (spec MCP, FastMCP)
- [ ] Slide template CTA fin

---

## Diagrammes à créer

1. **Host / Clients / Servers** (architecture overview)
   - Type : Mermaid `graph TB`
   - Source : copie du diagramme de la doc officielle
2. **N×M → 1 protocole** (Section 2)
   - Type : Mermaid `graph LR` avant/après
3. **Lifecycle MCP** (Section 4)
   - Type : Mermaid `sequenceDiagram` (client/server initialize → operate)
4. **Sampling avec HITL** (Section 6)
   - Type : Mermaid `sequenceDiagram` à 4 acteurs (Server, Client, User, LLM)
5. **FastMCP 3 piliers** (Section 9)
   - Type : graph simple avec 3 boîtes
6. **Adapter LangChain** (Section 10)
   - Type : Mermaid `graph LR` (MCP server → adapter → LangChain Tool)

---

## Code examples (minimal)

1. **JSON-RPC `initialize`** (Section 4)
   - Lignes à highlight : `protocolVersion`, `capabilities`
2. **JSON-RPC `tools/list` response** (Section 5)
   - Lignes à highlight : `inputSchema`
3. **FastMCP `@mcp.tool`** (Section 9)
   - 5-6 lignes Python, highlight décorateur + signature typée
4. **FastMCP client** (Section 9)
   - 3-4 lignes, highlight `Client(...)`
5. **LangChain adapter** (Section 10)
   - 4-5 lignes Python, highlight conversion MCP → LangChain Tool

> Aucun walkthrough complet — concepts uniquement (`Code: Minimal` du choix utilisateur).

---

## Demo plan

### Démo : Hello-world FastMCP + Inspector (Section 11)
- **Quoi montrer** : un serveur FastMCP minimal exposant un tool, branché à MCP Inspector
- **Commandes** : `uv run hello.py` + `npx @modelcontextprotocol/inspector ...`
- **Backup** : 3 screenshots préparés (initialize, tools/list, tools/call) au cas où le réseau / Inspector pose problème

---

## Q&A anticipées

1. **« MCP vs OpenAI function calling ? »**
   → Function calling = format de message LLM. MCP = protocole d'**intégration** entre app et fournisseur de tools. Couches différentes, complémentaires.

2. **« Pourquoi pas juste un OpenAPI ? »**
   → MCP est stateful (lifecycle, capabilities, notifications), pas REST. Et il gère des primitives non-OpenAPI : prompts user-controlled, sampling, elicitation.

3. **« Sampling : pourquoi pas appeler le LLM directement côté server ? »**
   → Pour rester model-independent et laisser le contrôle (clés API, coût, sécurité) au host.

4. **« FastMCP vs SDK officiel ? »**
   → FastMCP 1.0 a été mergé dans le SDK Python officiel. La version standalone reste plus avancée (apps, hosting, providers auth).

5. **« Production-ready ? »**
   → Oui pour l'essentiel ; Tasks est encore expérimental. Auth OAuth solide. Manque encore d'outillage mature pour observabilité (à construire soi-même).

6. **« Sécurité ? »**
   → Tools demandent souvent consent UI côté host. Roots = coordination, pas sandbox. Pour du remote multi-tenant : OAuth + sandboxing OS obligatoire.

7. **« Performances stdio vs HTTP ? »**
   → Stdio = pas de réseau, idéal local. Streamable HTTP nécessaire pour multi-client / cloud.

---

## Template choices

- Slide intro réutilisé : `decks/templates/slides.md` → **slide "Présentation"** (id: `presentation`) en position 2
- Slide CTA fin réutilisé : `decks/templates/slides.md` → **slide "Let's build together"** (layout: `end`) en position finale

---

## Appendix — Slide outline

1. `[cover]` Titre — *MCP Deep Dive* — background Unsplash photo-1683322499436
2. `[two-cols-header]` **Présentation** (template) — qui parle
3. `[default]` **Hook** — Claude + 3 MCP, *« comment ils se parlent ? »*
4. `[default]` **Problème N×M** — explosion d'intégrations
5. `[default]` **Avant / Après MCP** — diagramme
6. `[quote]` **MCP n'est pas une API. C'est un protocole.**
7. `[two-cols]` **Architecture — Host / Client / Server** + diagramme
8. `[default]` **Local vs Remote** — stdio / Streamable HTTP
9. `[default]` **2 couches : Data + Transport** — schéma oignon
10. `[default]` **Tableau transports** — perf, multi-client, auth
11. `[default]` **Récap architecture** (1 phrase à retenir)
12. `[default]` **JSON-RPC 2.0** en MCP — requêtes / réponses / notifications
13. `[default]` **Lifecycle** — séquence initialize → initialized → operate
14. `[default]` **Snippet** `initialize` request + response
15. `[default]` **Capabilities negotiation** — pourquoi c'est crucial
16. `[default]` **Version `2025-11-25` + SDKs officiels** (TS, Py, Kotlin…)
17. `[section]` **Primitives serveur**
18. `[default]` **Tableau Tools / Resources / Prompts** (qui contrôle)
19. `[default]` **Tools** — JSON Schema + `tools/call`
20. `[default]` **Resources** — URIs + templates
21. `[default]` **Prompts** — slash commands user-controlled
22. `[default]` **Notifications** — `list_changed` & co.
23. `[section]` **Primitives client**
24. `[default]` **Sampling** — server demande au client de générer
25. `[default]` **Elicitation** — server demande à l'utilisateur
26. `[default]` **Roots + Logging** — scope filesystem, logs structurés
27. `[default]` **HITL** — diagramme sampling avec 2 approvals
28. `[section]` **Extensions du protocole**
29. `[default]` **Auth (OAuth 2.1)** — Streamable HTTP en prod
30. `[default]` **Apps + Tasks** — UI in-conversation + durable exec
31. `[section]` **Développer un MCP = SWE classique**
32. `[default]` **Checklist DX** — tests, CI/CD, versioning, registry, hosting, obs, Inspector, MCPman
33. `[section]` **FastMCP**
34. `[default]` **Pourquoi FastMCP** — adoption + ce que ça fait
35. `[default]` **3 piliers** — servers / clients / apps
36. `[default]` **`@mcp.tool`** — snippet minimal (concept)
37. `[default]` **`@mcp.resource` + `@mcp.prompt`** — snippets
38. `[default]` **Client FastMCP** — connect to any server
39. `[default]` **Intégrations** — ASGI, Prefect Horizon, auth providers
40. `[section]` **Écosystème**
41. `[default]` **Agentic coding + Skills** — construire son MCP avec un agent
42. `[default]` **LangChain / LangGraph + `langchain-mcp-adapters`**
43. `[section]` **Démo MCP Inspector**
44. `[default]` **Démo** — FastMCP hello-world + Inspector live (ou screenshots)
45. `[default]` **Récap démo** — ce qui s'est passé en JSON-RPC
46. `[section]` **Take-aways**
47. `[default]` **3 choses à retenir**
48. `[default]` **CTA** — construis un FastMCP cette semaine + ressources (QR)
49. `[end]` **Let's build together** (template)

> ~49 slides au total. Ajustable à ~42 si on regroupe les snippets et qu'on raccourcit les sections 7 et 10.

---

*Plan créé : 2026-05-28*
*Prêt pour la génération de slides : [ ]*
