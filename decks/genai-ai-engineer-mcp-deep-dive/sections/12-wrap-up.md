---
layout: section-liquid
---

## Take-aways

<div class="text-lg opacity-70 mt-4">3 choses à retenir + Ressources</div>

---
layout: default
---

<h3 class="text-3xl mb-4">Les 3 choses à retenir</h3>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

<div class="text-3xl mb-2">🧩</div>

#### MCP = vrai protocole

Lifecycle, capabilities, JSON-RPC strict. Pas une API, pas un wrapper REST.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

<div class="text-3xl mb-2">🪞</div>

#### Server ↔ Client

Server : tools, resources, prompts.<br/>Client : sampling, elicitation, roots, logging.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

<div class="text-3xl mb-2">⚡</div>

#### FastMCP + SWE

6 lignes pour démarrer.<br/>**Mais** tests, CI/CD, registry, obs = comme toujours.

</div>

</div>

<div class="text-center mt-8 text-[#457b9d] text-lg font-bold">

Le protocole est solide.

</div>

---
layout: default
---

### Ressources pour aller plus loin

#### Documentation

- [modelcontextprotocol.io](https://modelcontextprotocol.io) : Spec MCP
- [gofastmcp.com](https://gofastmcp.com) : Framework Python pour MCP
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector) toolkit
- [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters)

<br>

#### Community

- Discord actif (50k+ membres)
- GitHub discussions

---
layout: default
---

### Prochaines étapes — par où commencer

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4 bg-[#457b9d]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🛠️</div>

#### Cette semaine — construire

- **FastMCP** : scaffolder un vrai serveur (tools + resources réels), pas juste un exemple jouet
- Tester en local avec **MCP Inspector** (stdio)
- API REST déjà documentée en interne ? Essayer un générateur **OpenAPI → MCP** avant de coder from scratch

</div>

<div class="border-l-4 border-[#10b981] pl-4 bg-[#10b981]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🔌</div>

#### Ensuite — intégrer & industrialiser

- Brancher le serveur comme **skill** dans un agent (Claude Code, Cursor) ou via `langchain-mcp-adapters` dans un workflow LangGraph
- Passer la **Tools & DX Checklist** : tests, CI/CD, versioning, registry, auth OAuth 2.1, observability
- Publier / documenter pour que l'équipe le découvre (registry interne, Discord ou GitHub discussions)

</div>

</div>

<div class="text-center mt-6 text-[#457b9d] font-bold">

Le protocole est prêt. Le prochain FastMCP à écrire, c'est le vôtre.

</div>

<!--
- CTA concret : ne pas repartir avec juste de la théorie, repartir avec un chantier daté
- "Cette semaine" = scope volontairement petit pour garantir un vrai démarrage
- "Ensuite" = rappel que MCP en prod = même discipline SWE que tout service (cf. Tools & DX Checklist)
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="genai-ai-engineer-mcp-deep-dive" />

---
src: ../../templates/slides.md#2
---
