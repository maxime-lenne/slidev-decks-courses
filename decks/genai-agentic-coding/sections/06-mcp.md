---
layout: section
---

# MCP

<div class="text-lg opacity-70 mt-4">10 min · connecter l'agent au monde réel</div>

---
layout: default
---

### Le problème : l'agent dans sa bulle

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Sans MCP

L'agent ne peut pas :

- 🔍 Lire ton Jira / Linear
- 🔀 Créer une PR GitHub
- 🗄️ Interroger ta base de données
- 📊 Consulter Sentry / Grafana
- 🎨 Lire un fichier Figma

<div class="text-xs opacity-70 mt-3">Chaque intégration = code custom à maintenir.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Avec MCP

**Standard ouvert** d'Anthropic — adopté largement en 2026.

- Connecteurs **standardisés** (tools, resources, prompts)
- Architecture **host / client / server**
- **N + M** intégrations au lieu de **N × M**

<div class="text-xs opacity-70 mt-3">L'agent peut interagir avec tout service qui expose un MCP.</div>

</div>

</div>

<!--
- L'analogie qu'on entend partout : "USB-C pour les LLM"
- Plus juste : MCP est un protocole stateful comme SMTP, IMAP, LSP — pas une API REST
- Pour le détail, renvoi explicite au deck genai-ai-engineer-mcp-deep-dive
-->

---
layout: default
---

### Architecture MCP — 3 rôles

<br>

<div class="flex justify-center">

```mermaid {scale: 0.7}
graph TB
    subgraph "MCP Host (l'app IA)"
        Client1["MCP Client 1"]
        Client2["MCP Client 2"]
        Client3["MCP Client 3"]
    end
    ServerA["MCP Server — Filesystem<br/>(local, stdio)"]
    ServerB["MCP Server — GitHub<br/>(remote, HTTP)"]
    ServerC["MCP Server — Linear<br/>(remote, HTTP)"]
    Client1 ---|"Connexion<br/>dédiée"| ServerA
    Client2 ---|"Connexion<br/>dédiée"| ServerB
    Client3 ---|"Connexion<br/>dédiée"| ServerC
```

</div>

<div class="text-sm opacity-70 mt-2 text-center">

<strong>Host</strong> = Claude Code / Cursor · <strong>Client</strong> = composant interne (1 par connexion) · <strong>Server</strong> = programme qui expose des primitives

</div>

<!--
- 1 host → N clients → N servers (relation 1:1:1 par connexion)
- Le host consolide les capabilities de tous les servers pour le modèle
- Pour les AI Builders, le host = ton IDE/CLI ; tu n'écris que côté config
-->

---
layout: default
---

### Serveurs MCP populaires (2026)

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3">

#### Dev tooling

- **Context7** — docs à jour
- **GitHub** — PRs, issues, code
- **Chrome DevTools** — debug
- **Playwright** — tests E2E

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

#### Data & monitoring

- **Supabase** — DB, Auth
- **PostgreSQL** — queries
- **Sentry** — erreurs
- **Grafana** — dashboards

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### Produit & design

- **Linear** — tickets
- **Notion** — docs
- **Figma** — design tokens
- **Stripe** — paiements

</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-4 mt-6 text-sm">

**Recommandation** : limiter à ~10 MCPs actifs simultanément (Cursor) — au-delà, l'agent se perd dans les outils disponibles.

</div>

<div class="text-sm opacity-70 mt-4 text-center">

→ Pour le deep-dive du protocole, voir le deck <code>genai-ai-engineer-mcp-deep-dive</code>.

</div>

<!--
- Context7 = à installer en priorité, donne accès aux docs à jour de toutes les libs
- Pour un projet : commiter .mcp.json dans le repo + documenter dans CLAUDE.md le rôle de chacun
- Trop de MCPs = polluted context (revoir section 2)
-->

---
layout: default
---

### Pour aller plus loin : Deep Dive MCP

<br>

<div class="grid grid-cols-2 gap-8 mt-6 text-sm">

<div>

#### Couvert dans le deep-dive

- Architecture **host / client / server**
- **JSON-RPC 2.0** + lifecycle
- Primitives **server** (tools, resources, prompts)
- Primitives **client** (sampling, elicitation, roots, logging)
- **FastMCP** (Python) pour construire ses propres serveurs
- Écosystème (registry, observabilité, OAuth)

</div>

<div>

#### Quand suivre le deep-dive ?

- Vous voulez **construire** un MCP custom pour votre SaaS interne
- Vous voulez **debug** un MCP qui ne se connecte pas
- Vous passez du rôle **AI Builder** vers **AI Engineer**

<div class="text-xs opacity-70 mt-3">

📦 Deck : <code>genai-ai-engineer-mcp-deep-dive</code> · 45-60 min

</div>

</div>

</div>

<!--
- Distinction claire entre USER (AI Builder, ici) et BUILDER (AI Engineer, deep-dive)
- L'AI Builder a juste besoin de savoir : c'est quoi, comment l'installer, comment limiter le nombre
- Le deep-dive est obligatoire si on veut écrire son propre MCP
-->
