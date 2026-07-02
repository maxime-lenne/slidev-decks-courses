---
layout: section-liquid
---

# Server

<div class="text-lg opacity-70 mt-4">Primitives : Tools · Resources · Prompts · Notifications</div>

---
layout: default
---

## Qui contrôle quoi ?

<div class="text-sm leading-tight mt-4">

| Primitive | Contrôlée par | À quoi ça sert | Exemples |
|---|---|---|---|
| **Tools** | 🤖 Modèle | Actions exécutables (le LLM décide) | `search_flights`, `send_email`, `query_db` |
| **Resources** | 📱 Application | Données contextuelles (lecture seule) | Fichiers, schémas DB, docs API |
| **Prompts** | 👤 Utilisateur | Templates de workflows invoqués explicitement | `/plan-vacation`, `/review-pr` |

</div>

<div class="mt-6 text-center">

**3 primitives → 3 niveaux de contrôle distincts**

</div>

<!--
- Cette distinction "qui contrôle" est la clé pour comprendre la philosophie
- Tools = autonomie du modèle (avec ou sans approval)
- Resources = l'app sélectionne ce qu'elle envoie en contexte
- Prompts = invocation utilisateur explicite (style slash command)
-->

---
layout: default
---

## Tools — actions invocables

```json {1-15|2,4|5-14}
{
  "name": "search_flights",
  "title": "Search Flights",
  "description": "Search available flights between two cities",
  "inputSchema": {
    "type": "object",
    "properties": {
      "origin":      { "type": "string", "description": "Departure city" },
      "destination": { "type": "string", "description": "Arrival city"   },
      "date":        { "type": "string", "format": "date" }
    },
    "required": ["origin", "destination", "date"]
  }
}
```

<div class="text-sm opacity-70 mt-2">`tools/list` retourne ces définitions · `tools/call` les exécute. <strong>JSON Schema</strong> = validation et auto-completion gratuites.</div>

---
layout: default
---

## Resources — données par URI

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

#### Resources directes

URI fixe vers une donnée précise.

```
file:///home/me/notes.md
calendar://events/2026
```

→ `resources/list` puis `resources/read`

</div>

<div>

#### Templates de resources

URI paramétrée, complétion possible.

```
weather://forecast/{city}/{date}
travel://flights/{origin}/{dest}
```

→ `resources/templates/list`

</div>

</div>

<div class="mt-6 text-sm opacity-80">

- **MIME type** déclaré → l'app sait comment traiter le contenu
- **Subscribe** possible : `resources/subscribe` + notification de changement
- L'**app** décide quoi inclure (embedding search, sélection manuelle, auto…)

</div>

---
layout: default
---

## Prompts — workflows réutilisables

```json {1-12|3,4|5-11}
{
  "name": "plan-vacation",
  "title": "Plan a vacation",
  "description": "Guide through vacation planning",
  "arguments": [
    { "name": "destination", "type": "string", "required": true  },
    { "name": "duration",    "type": "number", "description": "days" },
    { "name": "budget",      "type": "number", "required": false },
    { "name": "interests",   "type": "array",  "items": { "type": "string" } }
  ]
}
```

<div class="text-sm opacity-70 mt-2">Exposé typiquement comme <strong>slash command</strong> côté host (`/plan-vacation`). Invocation 100% utilisateur — pas auto.</div>

---
layout: default
---

## Notifications — synchronisation temps réel

<v-clicks>

- **`notifications/tools/list_changed`** → la liste des tools a évolué, le client recharge
- **`notifications/resources/list_changed`** → idem pour les resources
- **`notifications/resources/updated`** → un fichier souscrit a changé
- **`notifications/progress`** → progression d'une op longue

</v-clicks>

<div class="mt-6 p-4 border-l-4 border-[#457b9d] bg-[#457b9d]/5 text-sm">

**Capability-based.** Le client ne reçoit ces notifications que si le serveur a déclaré `"listChanged": true` au handshake. Sinon → polling manuel.

</div>

<!--
- Le serveur push, pas de polling nécessaire
- Crucial pour les MCP dynamiques (tools qui apparaissent selon le contexte)
-->
