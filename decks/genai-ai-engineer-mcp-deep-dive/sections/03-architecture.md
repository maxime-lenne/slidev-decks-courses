---
layout: section-liquid
---

# Architecture

<div class="text-lg opacity-70 mt-4">Host, Client, Server — et deux couches</div>

---
layout: default
---

### Trois composants

<br>

<div class="flex justify-center">

```mermaid {scale: 0.75}
graph TB
    subgraph "MCP Host (l'app IA)"
        Client1["MCP Client 1"]
        Client2["MCP Client 2"]
        Client3["MCP Client 3"]
    end
    ServerA["MCP Server A — Local<br/>(ex: Filesystem, stdio)"]
    ServerB["MCP Server B — Local<br/>(ex: SQLite, stdio)"]
    ServerC["MCP Server C — Remote<br/>(ex: Sentry, HTTP)"]
    Client1 ---|"Connexion<br/>dédiée"| ServerA
    Client2 ---|"Connexion<br/>dédiée"| ServerB
    Client3 ---|"Connexion<br/>dédiée"| ServerC
```

</div>

<div class="text-sm opacity-70 mt-2 text-center">Le <strong>Host</strong> orchestre · 1 <strong>Client</strong> par connexion · chaque <strong>Server</strong> est indépendant</div>

<div class="text-center text-xs mt-2 text-[#457b9d] font-bold">1 host → N clients → N servers (relation 1:1:1 sur chaque connexion)</div>

<!--
- VS Code = Host, qui instancie un client par MCP server
- Pas de fan-out côté MCP : c'est le host qui consolide
- Le client est un composant logique, pas une app
- Bien insister : 1 client = 1 connexion = 1 server (relation 1:1)
-->

---
layout: default
---

## Trois composants — rôles détaillés

<br>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#1d3557] pl-3">

#### 🖥️ Host

L'**application IA** visible par l'utilisateur.

- Instancie et gère les clients
- Applique les politiques (auth, permissions, sampling)
- **Consolide** les capacités de tous les servers pour le modèle

<div class="text-xs opacity-70 mt-2">Ex : Claude Desktop, VS Code, Cursor, agent custom</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

#### 🔌 Client

**Composant logique interne** du host (pas une app).

- **1 client ↔ 1 server ↔ 1 connexion**
- Porte la session JSON-RPC
- Négocie les *capabilities* à l'init
- Route les messages, maintient l'état (subscriptions, progress, sampling)

<div class="text-xs opacity-70 mt-2">Un objet/thread instancié par le host</div>

</div>

<div class="border-l-4 border-[#10b981] pl-3">

#### 🗄️ Server

**Programme indépendant** qui expose des **primitives**.

- *Tools · resources · prompts*
- **Local** via stdio (process forké) ou **remote** via HTTP (multi-host)
- N'a pas connaissance des autres servers — l'agrégation est faite par le host

<div class="text-xs opacity-70 mt-2">Ex : Filesystem, GitHub, Sentry, FastMCP custom</div>

</div>

</div>

<!--
- Slide pivot : poser le vocabulaire avant la spec JSON-RPC
- Host = la couche visible · Client = la plomberie · Server = le fournisseur
- Insister sur "client ≠ app" — c'est juste un connecteur dédié
-->

---
layout: two-cols-header
---

### Local vs Remote

::left::

#### Local — Stdio transport

- Process lancé par le host (stdio piping)
- **Mono-client** : un client = un process
- Pas de réseau, perf maximale
- Pas d'auth nécessaire (déjà sur la machine)

<div class="text-sm opacity-70 mt-3">Ex : filesystem server, SQLite server, npx tools</div>

::right::

#### Remote — Streamable HTTP

- Serveur HTTP autonome quelque part
- **Multi-client** : 1 server sert N hosts
- HTTP POST + Server-Sent Events optionnel
- **OAuth 2.1** recommandé pour l'auth

<div class="text-sm opacity-70 mt-3">Ex : Sentry MCP, GitHub MCP managé, services SaaS</div>

<div class="text-sm opacity-70 mt-3">

**SSE** *(Server-Sent Events)* : flux HTTP unidirectionnel server → client, utilisé ici pour pousser en temps réel notifications et résultats partiels sans WebSocket.

</div>

---
layout: default
---

### Deux couches : Data + Transport

<br>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

#### Data layer (intérieur)

- **Protocole JSON-RPC 2.0**
- Lifecycle (initialize, shutdown)
- Capabilities negotiation
- Primitives : tools, resources, prompts
- Notifications temps réel

<div class="opacity-70 mt-2">→ identique quel que soit le transport</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Transport layer (extérieur)

- **Stdio** : streams stdin/stdout
- **Streamable HTTP** : POST + SSE optionnel
- Auth : OAuth, bearer, API keys
- Framing des messages
- Connexion / déconnexion

<div class="opacity-70 mt-2">→ swappable sans toucher au data layer</div>

</div>

</div>

<div class="text-center text-sm mt-6 text-[#457b9d] font-bold">Le data layer est l'oignon intérieur — il survit à tout changement de transport</div>

<!--
- Séparation très propre : on peut changer le transport sans toucher au protocole
- Cette séparation est ce qui rend MCP futur-proof (un nouveau transport peut arriver)
-->

---
layout: default
---

## Synthèse architecture

<div class="text-sm leading-tight mt-4">

| Composant | Rôle | Exemple |
|---|---|---|
| **Host** | App qui orchestre les clients | Claude Desktop, VS Code, Cursor |
| **Client** | 1 connexion dédiée à 1 server | Composant interne du host |
| **Server** | Programme qui expose tools/resources/prompts | Filesystem, Sentry, DB |
| **Data layer** | JSON-RPC + lifecycle + primitives | Inchangé quel que soit le transport |
| **Transport** | Stdio ou Streamable HTTP | Choisi selon local vs remote |

</div>

<div class="text-center mt-6 text-lg">

**À retenir :** *1 host → N clients → N servers · Data layer agnostique du transport*

</div>

<!--
- Slide récap pour fixer les rôles avant de plonger dans la spec
- Bien insister sur "1 client = 1 connexion = 1 server"
-->
