---
layout: section-liquid
---

## Tools, MCP & CLI

<div class="text-lg opacity-70 mt-4">10 min · connecter l'agent au monde réel</div>

---
layout: default
---

### Architecture MCP — 3 acteurs

<br>

<div class="flex justify-center">

```mermaid {scale: 0.9}
graph TB
    subgraph Host["MCP Host - Agent IA"]
        Client1["MCP Client 1"]
        Client2["MCP Client 2"]
        Client3["MCP Client 3"]
    end
    subgraph Local["🖥️ Local"]
        ServerA["Filesystem"]
        ServerB["Figma"]
    end
    subgraph Remote["☁️ Distant"]
        ServerC["GitHub"]
    end
    Client1 ---|"subprocess"| ServerA
    Client2 ---|"subprocess"| ServerB
    Client3 ---|"HTTP/SSE"| ServerC
```

</div>

<div class="text-sm opacity-70 mt-2 text-center">

**🖥️ Local** = process enfant sur ta machine (stdio — même machine) · **☁️ Distant** = service réseau (HTTP/SSE) · même protocole MCP des deux côtés

</div>

<!--
- Figma MCP tourne en local : c'est un process Node qui lit le plugin Figma via l'API desktop
- GitHub MCP peut être distant (hébergé par Anthropic/GitHub) ou local selon la config
- stdio = stdin/stdout entre host et server, pas de port réseau → plus simple, plus sécurisé
- HTTP/SSE = server déployé quelque part, le host s'y connecte comme à une API
- Pour les AI Builders : la distinction n'impacte que la config (command vs url dans .mcp.json)
-->

---
layout: two-cols
---

### MCP ou CLI — quand choisir ?

<br>

<div class="text-sm">

#### Brancher un MCP

Préférer quand l'agent doit **agir de façon autonome** :

- Résultats **structurés** (JSON typé, pas du texte brut)
- Pas de sous-processus shell — l'agent appelle directement
- Erreurs **typées** et récupérables sans parser de stdout
- L'agent peut **chaîner** plusieurs appels (lire → décider → écrire)

<div class="text-xs opacity-70 mt-3">

Exemple : `github MCP` → lire les issues, créer une PR, commenter — tout dans un seul contexte.

</div>

</div>

::right::

<div class="text-sm mt-8">

#### Utiliser le CLI (ex. `gh`)

Préférer quand **l'humain reste en boucle** ou en CI :

- Setup minimal — aucune config MCP, juste `PATH`
- Idéal pour les **scripts CI/CD** ou les hooks git
- Output lisible par un humain (logs, PR URL…)
- Universel : fonctionne là où il n'y a pas d'hôte MCP

<div class="text-xs opacity-70 mt-3">

Exemple : `gh pr create` dans un script de release — pas besoin d'un agent pour ça.

</div>

</div>

<!--
- Règle d'or : MCP si l'agent décide, CLI si le script décide
- Éviter de dupliquer : si le MCP GitHub est actif, ne pas aussi appeler `gh` via Bash
- CLI reste utile pour bootstrapper avant qu'un MCP existe (ex. nouveau service interne)
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
