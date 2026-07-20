---
layout: section-liquid
---

## Extensions du protocole

<div class="text-lg opacity-70 mt-4">Auth · Apps · Tasks</div>

---
layout: default
---

### Auth — OAuth 2.1 pour le remote

<v-clicks>

- **Stdio** : pas d'auth nécessaire (local, contrôle OS)
- **Streamable HTTP** : auth obligatoire dès que c'est multi-tenant
- **OAuth 2.1** = la méthode recommandée par la spec
- Alternatives supportées : bearer tokens, API keys, headers custom
- Le flow OAuth se fait **côté host** — l'utilisateur autorise, le client reçoit un token

</v-clicks>

<div class="mt-8 p-4 border-l-4 border-[#457b9d] bg-[#457b9d]/5 text-sm">

**En prod, pour un MCP remote, OAuth 2.1 n'est pas négociable.** Sans ça, pas de séparation utilisateur, pas de révocation, pas d'audit propre.

</div>

---
layout: two-cols-header
---

### Apps & Tasks (utility primitives)

::left::

#### Apps

Interfaces UI **embarquées dans la conversation**.

- Le serveur livre un mini-front rendu par le host
- Use case : approbation visuelle, sélection, formulaire riche
- Encore jeune côté tooling

<div class="text-sm opacity-70 mt-3">Pratique pour ne pas réinventer une UI dans chaque host.</div>

::right::

#### Tasks *(expérimental)*

Wrappers d'**exécution durable**.

- Résultats différés (poll status, récupérer plus tard)
- Computations longues, batchs, multi-step
- État explicite : `pending`, `running`, `done`

<div class="text-sm opacity-70 mt-3">⚠️ Encore expérimental — à utiliser avec prudence en prod 2026.</div>

---
layout: default
---

### Récap extensions

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#10b981] pl-4">

#### Auth

Stable.

OAuth 2.1, bearer, API keys.

Obligatoire pour multi-tenant remote.

</div>

<div class="border-l-4 border-[#457b9d] pl-4">

#### Apps

Stable mais jeune.

UI in-conversation.

Approbations, formulaires.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

#### Tasks

⚠️ Expérimental.

Durable execution.

Long-running, batchs.

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">→ Ces extensions complètent le cœur du protocole sans le casser — capabilities = opt-in.</div>
