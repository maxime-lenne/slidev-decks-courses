---
layout: section
---

# FastMCP

<div class="text-lg opacity-70 mt-4">Le framework Python de référence</div>

---
layout: fact
---

# ~70%
des serveurs MCP en circulation

<p class="text-gray-500">~1M téléchargements par jour · FastMCP, Python · <a href="https://gofastmcp.com">gofastmcp.com</a></p>

<!--
- Adoption massive = la communauté a tranché
- FastMCP 1.0 a été mergé dans le SDK Python officiel → ce que tu apprends ici s'applique aussi au SDK
-->

---
layout: default
---

## Pourquoi FastMCP

<v-clicks>

- **Génération automatique des schémas** depuis les type hints Python
- **Gestion transparente** du lifecycle, des capabilities, du transport
- **Décorateurs simples** : `@mcp.tool`, `@mcp.resource`, `@mcp.prompt`
- **Hosting** intégré (stdio, ASGI/FastAPI, Prefect Horizon)
- **Auth providers** (OAuth, bearer) prêts à l'emploi
- **Client** Python first-class pour consommer n'importe quel MCP

</v-clicks>

<div class="mt-6 p-4 border-l-4 border-[#10b981] bg-[#10b981]/5 text-sm">

FastMCP encapsule tout ce qu'on a vu sections 3-7. **Le protocole reste vrai en dessous** — juste, on n'écrit plus la plomberie JSON-RPC à la main.

</div>

---
layout: two-cols-header
---

### Trois piliers

::left::

#### 🛠 Servers

Exposer des fonctionnalités via décorateurs.

#### 💻 Clients

Consommer n'importe quel serveur MCP (local ou remote).

::right::

#### 🎨 Apps

Interfaces UI livrées dans la conversation.

<div class="text-sm opacity-70 mt-3">

Un même framework couvre la **production**, la **consommation** et l'**affichage** — pas besoin de jongler entre 3 outils.

</div>

---
layout: default
---

## `@mcp.tool` — un tool en 6 lignes

```python {1-10|1-3|5-9}
from fastmcp import FastMCP

mcp = FastMCP("weather-server")

@mcp.tool
def get_weather(city: str, units: str = "metric") -> dict:
    """Get current weather for a city."""
    return fetch_weather(city, units)

mcp.run()
```

<div class="text-sm opacity-70 mt-2">

- Le **schema JSON** est généré depuis les type hints (`city: str`, `units: str = "metric"`)
- La **description** vient de la docstring
- `mcp.run()` lance en stdio par défaut

</div>

---
layout: default
---

## `@mcp.resource` & `@mcp.prompt`

```python {1-15|3-6|8-15}
from fastmcp import FastMCP
mcp = FastMCP("travel-server")

@mcp.resource("travel://prefs/{user_id}")
def get_prefs(user_id: str) -> dict:
    """User travel preferences."""
    return db.get_prefs(user_id)

@mcp.prompt
def plan_vacation(destination: str, days: int) -> str:
    """Guided vacation planning."""
    return f"""Plan a {days}-day trip to {destination}.
Steps:
1. Check weather...
2. Suggest activities..."""
```

<div class="text-sm opacity-70 mt-2">URI templates supportés directement dans le décorateur · les arguments sont typés et documentés.</div>

---
layout: default
---

## Client FastMCP — consommer un serveur

```python {1-10|3-4|6-10}
from fastmcp import Client

client = Client("https://my-mcp-server.example.com")

async with client:
    tools = await client.list_tools()
    result = await client.call_tool(
        "get_weather",
        {"city": "Lille"}
    )
```

<div class="text-sm opacity-70 mt-2">Même API pour stdio (`Client("./server.py")`) ou HTTP. <strong>Async natif</strong>, context manager pour le lifecycle.</div>

---
layout: default
---

## Intégrations

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

#### Hosting

- **stdio** local (default)
- **ASGI** : monte le serveur dans FastAPI / Starlette
- **Prefect Horizon** : hosting managé MCP

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Auth & sécurité

- **OAuth 2.1** providers prêts (Google, GitHub, Okta)
- **Bearer tokens** custom
- **Middlewares** ASGI standards (CORS, rate limit)

</div>

</div>

<div class="text-center mt-8 text-sm opacity-80">

→ De `mcp.run()` local à un service multi-tenant authentifié, **le même code de tool ne bouge pas**.

</div>
