---
theme: ../../themes/simplon
title: "Understanding APIs, REST & HTTP Requests"
titleTemplate: "%s - Web Development Fundamentals"
info: |
  ## APIs, REST, and HTTP Requests

  A comprehensive introduction to web APIs, RESTful architecture,
  and HTTP request fundamentals.

  Learn how modern applications communicate over the web.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920
---

# Understanding APIs, REST & HTTP Requests

Building blocks of modern web communication

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Let's explore <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
Welcome! Today we'll explore how applications talk to each other over the web.
We'll cover APIs, REST architecture, and HTTP fundamentals.
-->

---
layout: default
class: text-center
---

# Au programme

<div class="grid grid-cols-2 gap-8 mt-8 text-left">

<div>

**1 · Qu'est-ce qu'une API ?**
Concepts fondamentaux, communication entre systèmes

**2 · HTTP : Le protocole du web**
Requête/réponse, méthodes, codes de statut

**3 · Architecture REST**
Principes REST, conception des ressources

**4 · Consommer une API**
cURL, DevTools, Postman, JavaScript Fetch

</div>

<div>

**5 · Fonctionnalités avancées**
Pagination, filtres, tri, soft delete

**6 · Bonnes pratiques**
Sécurité, performance, documentation

</div>

</div>

<!--
Voici le plan complet de la session.
On couvre à la fois la théorie et les outils pratiques.
-->

---
layout: section
---

# What is an API?

Application Programming Interface

---
layout: default
---

# API Basics

An **API** is a contract that defines how systems (client / server) communicate together.

```mermaid
graph LR
    A[Client : App] -->|Request| B[Server : API]
    B -->|Response| A
    B <-->|Expose| C[Datas, Services]
```

<v-clicks>

- **Interface**: A set of rules and protocols (HTTP, REST, JSON...)
- **Communication**: Exchange of data (Request / Response) between systems (client / server)
- **Client**: consume API
- **Server**: expose data / service through API to the outside world

</v-clicks>

<!--
APIs are everywhere - when you check the weather on your phone,
order food online, or use social media, you're using APIs.

Bénéfices :
- **Abstraction**: Hide complex implementation details
- **Standardization**: Consistent way to interact

-->

---
layout: default
---

# Typologies de clients API

Tout ce qui peut envoyer une requête HTTP est un client API

<div class="grid grid-cols-3 gap-4 mt-4">

<v-clicks>

<div class="border border-gray-600 rounded p-4">

### Navigateur web

SPA (React, Vue), pages HTML classiques, extensions.
Utilise `fetch()` ou `axios`.

</div>

<div class="border border-gray-600 rounded p-4">

### Application mobile

iOS (URLSession), Android (Retrofit), React Native.
Même protocole HTTP, même JSON.

</div>

<div class="border border-gray-600 rounded p-4">

### Serveur → Serveur

Microservices, webhooks, jobs planifiés.
`requests` (Python), `axios` (Node), `HttpClient` (Java).

</div>

<div class="border border-gray-600 rounded p-4">

### CLI & scripts

Automatisation, CI/CD, migrations.
`cURL`, `HTTPie`, scripts Python/bash.

</div>

<div class="border border-gray-600 rounded p-4">

### IoT & embarqué

Capteurs connectés, domotique, montres.
Contraintes de bande passante et d'énergie.

</div>

<div class="border border-gray-600 rounded p-4">

### Intégrations tierces

Zapier, Make, n8n connectent des APIs sans code.

</div>

</v-clicks>

</div>

<!--
L'API ne sait pas qui l'appelle — c'est la force du protocole HTTP.
Un même endpoint sert un mobile, un navigateur et un script bash identiquement.
-->

---
layout: default
---

# Popular Public APIs

<div class="grid grid-cols-2 gap-6">

<v-clicks>

<div>

## GitHub API

```javascript
const response = await fetch(
  'https://api.github.com/users/octocat'
);
const user = await response.json();
```

**Features**: Repository management, issues, pull requests

</div>

<div>

## OpenWeather API

```javascript
const response = await fetch(
  'https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=YOUR_KEY'
);
const weather = await response.json();
```

**Features**: Current weather, forecasts, historical data

</div>

<div>

## Stripe API

```javascript
const payment = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd'
});
```

**Features**: Payment processing, subscriptions

</div>

<div>

## REST Countries

```javascript
const response = await fetch(
  'https://restcountries.com/v3.1/name/france'
);
const countries = await response.json();
```

**Features**: Country data (no auth required!)

</div>

</v-clicks>

</div>

<!--
These are real APIs you can use in your projects.
REST Countries is great for learning - no API key needed!
-->

---
layout: section
---

# HTTP Protocol

Hypertext Transfer Protocol

---
layout: two-cols-header
---

# HTTP Request/Response Anatomy

::left::

## Request

```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Accept: application/json
```

<v-clicks>

- **Method**: GET, POST, PUT, DELETE, etc.
- **URL**: Resource identifier
- **Headers**: Metadata
- **Body**: Optional data payload

</v-clicks>

::right::

## Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
```

<v-clicks>

- **Status Code**: 200, 404, 500, etc.
- **Headers**: Content info, caching
- **Body**: Response data

</v-clicks>

<!--
Every web interaction follows this pattern: a client sends a request,
and the server sends back a response.
-->

---
layout: default
---

# Request - URL

```
  https://api.example.com:443/api/users/123?role=admin&page=2#results
  \_____/ \_______________/ \_/ \__________/ \______________/ \_____/
  scheme       host          port    path       query string  fragment
```

<v-clicks>

| Partie | Exemple | Rôle |
|--------|---------|------|
| **Scheme** | `https://` | Protocole utilisé (`http`, `https`, `ws`...) |
| **Host** | `api.example.com` | Domaine ou adresse IP du serveur |
| **Port** | `:443` | Optionnel — 443 par défaut pour HTTPS, 80 pour HTTP |
| **Path** | `/api/users/123` | Chemin vers la ressource, peut contenir des paramètres |
| **Query string** | `?role=admin&page=2` | Paires `clé=valeur` séparées par `&`, après le `?` |
| **Fragment** | `#results` | Ancre côté client uniquement — **jamais envoyé au serveur** |

</v-clicks>

<!--
Le fragment (#) est souvent confondu avec un paramètre : il est traité exclusivement par le navigateur.
Le port est rarement visible car 443 (HTTPS) et 80 (HTTP) sont les valeurs par défaut.
L'URL est case-sensitive pour le path, mais pas pour le host.
-->

---
layout: default
---

# Les méthodes HTTP (verbes)

La méthode indique au serveur **l'intention** de la requête. Quelques exemples :

<div class="grid grid-cols-2 gap-6 mt-2">

<v-clicks>

<div>

**GET** — Récupérer une ressource

```http
GET /index.html HTTP/1.1       ← page web
GET /images/logo.png HTTP/1.1  ← image
GET /api/users HTTP/1.1        ← données JSON
```

Lecture seule. Pas de body. Résultat identique peu importe le nombre d'appels.

**POST** — Soumettre des données

```http
POST /login HTTP/1.1           ← formulaire de connexion
POST /upload HTTP/1.1          ← envoi de fichier
```

Corps obligatoire. Chaque appel peut produire un effet différent.

</div>

<div>

**DELETE** — Supprimer

```http
DELETE /cache HTTP/1.1         ← vide un cache
```

Généralement sans body.

**HEAD** — Comme GET, sans le body

```http
HEAD /fichier.zip HTTP/1.1     ← taille et type sans télécharger
```

Utile pour vérifier l'existence ou la taille d'une ressource.

**OPTIONS** — Capacités du serveur

```http
OPTIONS /api/users HTTP/1.1    ← quelles méthodes sont autorisées ?
```

Utilisé par les navigateurs pour le preflight CORS.

</div>

</v-clicks>

</div>

<!--
Les méthodes HTTP existent depuis HTTP/1.0 (1996) — bien avant REST.
Un navigateur n'utilise que GET et POST nativement (formulaires, liens).
PUT, PATCH, DELETE sont principalement utilisés par les APIs.
HEAD et OPTIONS sont utilisés par l'infrastructure (cache, CORS, CDN).
-->

---
layout: default
---

# Response - HTTP Status Codes

Server responses telling you what happened

<div class="grid grid-cols-2 gap-4">

<v-clicks>

<div>

## 2xx Success

- **200 OK**: Request succeeded
- **201 Created**: Resource created
- **204 No Content**: Success, no data

</div>

<div>

## 3xx Redirection

- **301 Moved Permanently**
- **302 Found** (temporary)
- **304 Not Modified** (cached)

</div>

<div>

## 4xx Client Errors

- **400 Bad Request**: Invalid data
- **401 Unauthorized**: Not authenticated
- **403 Forbidden**: No permission
- **404 Not Found**: Resource missing

</div>

<div>

## 5xx Server Errors

- **500 Internal Server Error**
- **502 Bad Gateway**
- **503 Service Unavailable**

</div>

</v-clicks>

</div>

<!--
Status codes are like HTTP's way of talking back to you.
2xx means success, 4xx means you messed up, 5xx means the server messed up.
-->

---
layout: section
---

# REST Architecture

Representational State Transfer

---
layout: default
---

# What is REST?

REST is an **architectural style** for designing API.

## Core Principles

Utilise ressources, verbes HTTP et codes de statut

1. **Client-Server Separation**: Independent evolution
2. **Stateless**: Each request contains all needed information
3. **Cacheable**: Responses must define if they're cacheable
4. **Uniform Interface**: Consistent resource identification
5. **Layered System**: Client can't tell if connected directly
6. **Code on Demand** (optional): Server can send executable code

---
layout: default
---

```mermaid
graph TD
    A[REST API] --> B[Stateless]
    A --> C[Resource-Based]
    A --> D[HTTP Methods]
    A --> E[Standard Formats]
    B --> F[No Session State]
    C --> G[URIs for Resources]
    D --> H[GET, POST, PUT, DELETE]
    E --> I[JSON, XML]
```

<!--
REST isn't a protocol or standard - it's a set of architectural constraints
that make APIs scalable, reliable, and easy to understand.
-->

---
layout: two-cols-header
---

# Non RESTful Resource Design

::left::

<v-clicks>

## Bad Practices

Les verbes dans l'URL = anti-pattern REST.
L'URL dit QUOI, la méthode HTTP dit COMMENT.

**❌ Style RPC (à éviter)**

</v-clicks>

::right::

<v-click>

## Examples

```http
# Collections
GET  /getUsers

# Individual resources
POST /createUser
POST /updateUser?id=5
GET  /deleteUser/5
POST /getUserSessions

```

</v-click>

<!--
Notice how we use nouns (users, posts) not verbs (getUsers, createPost).
The HTTP method tells us the action.
-->

---
layout: two-cols-header
---

# RESTful Resource Design

Resources are the key abstraction

::left::

<v-clicks>

## Good Practices

- Use **nouns**, not verbs
- Be **consistent** with naming
- Use **plural** for collections
- **Nest** for relationships
- Use **query params** for filtering

</v-clicks>

::right::

<v-click>

## Examples

```http
# Collections
GET    /api/users
POST   /api/users

# Individual resources
GET    /api/users/123
PUT    /api/users/123
DELETE /api/users/123

# Nested resources
GET    /api/users/123/posts
POST   /api/users/123/posts

# Filtering
GET    /api/posts?author=123&status=published
```

</v-click>

<!--
Notice how we use nouns (users, posts) not verbs (getUsers, createPost).
The HTTP method tells us the action.
-->

---
layout: default
---

# Les endpoints d'une ressource REST

Exemple avec la ressource `/users`

<v-clicks>

| Method | Purpose                 | URL | Idempotent | Body | Success status |
|--------|-------------------------|---------|:----------:|:-----:|:-------------:|
| **GET** | Retrieve data           | `/api/users` | ✅ | ❌ | `200 OK` |
| **GET** | Retrieve one user       | `/users/{id}` |  ✅ | ❌ | `200 OK` |
| **POST** | Create new resource     | `/api/users` | ❌ | ✅ | `201 Created` |
| **PUT** | Update/replace resource | `/api/users/123` | ✅ | ✅ | `200 OK` |
| **PATCH** | Partial update          | `/api/users/123` | ❌ | ✅ | `200 OK` |
| **DELETE** | Remove resource         | `/api/users/123` | ✅ | ❌ | `204 No Content` |

</v-clicks>

<v-click>

**Idempotent**: Multiple identical requests have the same effect as one request

</v-click>

<!--
Ces 6 endpoints couvrent le CRUD complet d'une ressource.
Retenez : l'URL identifie la ressource, la méthode HTTP identifie l'action.
-->

---
layout: two-cols-header
---

# Request - Les paramètres

Quatre façons de transmettre des données au serveur

::left::

<v-clicks>

### **Path parameters** — dans l'URL

```http
GET /api/users/{id}
GET /api/users/123          ← id = 123
GET /api/sessions/42/inscriptions  ← session_id = 42
```

Identifient une ressource **spécifique**.
Toujours obligatoires.

</v-clicks>

::right::

<v-clicks>

### **Query parameters** — après le `?`

```http
GET /api/users?role=apprenant&page=2&limit=20
               ↑               ↑      ↑
             filtre        pagination  taille
```

Pour le **filtrage**, la **pagination** et le **tri** ici par example.
Toujours optionnels (ou avec valeur par défaut).

</v-clicks>

<!--
Path param = QUI (quelle ressource), query param = COMMENT (filtrer, trier, paginer).
Le body ne doit jamais contenir d'identifiant de ressource — c'est le rôle du path.
Les headers customs commencent par X- par convention, bien que cette convention soit dépréciée en RFC 6648.
-->

---
layout: two-cols-header
---

# Request - Les paramètres

::left::

<v-click>

### **Header parameters** — métadonnées de la requête

```http
GET /api/users HTTP/1.1
Authorization: Bearer eyJhbGci...   ← authentification
Content-Type: application/json      ← format du body
Accept: application/json            ← format attendu en retour
Accept-Language: fr-FR              ← langue préférée
X-Request-ID: abc-123               ← traçabilité (custom)
```

Transportent l'**authentification**, le format des données, et les métadonnées techniques.

</v-click>

::right::

<v-click>

### **Body parameters** — corps de la requête

```json
POST /api/users
Content-Type: application/json

{
  "nom": "Alice",
  "email": "alice@example.com",
  "role": "apprenant"
}
```

Utilisé avec `POST`, `PUT`, `PATCH`.<br />
`GET` et `DELETE` n'ont pas de body.

</v-click>

<!--
Path param = QUI (quelle ressource), query param = COMMENT (filtrer, trier, paginer).
Le body ne doit jamais contenir d'identifiant de ressource — c'est le rôle du path.
Les headers customs commencent par X- par convention, bien que cette convention soit dépréciée en RFC 6648.
-->

---
layout: two-cols-header
---

# GET /users — Lister une collection - request

::left::

**Requête**

```http
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Accept: application/json
```

::right::

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Header | `Authorization` | Token d'authentification |
| Query | `?page=1&limit=20` | Pagination |
| Query | `?role=admin` | Filtre |
| Query | `?sort=-created_at` | Tri |

<!--
GET ne modifie jamais les données — il est safe et idempotent.
Une réponse vide retourne [] (tableau vide), pas 404.
-->

---
layout: two-cols-header
---

# GET /users — Lister une collection - response

::left::

**Réponse `200 OK`**

```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "email": "alice@example.com",
    "role": "admin",
    "createdAt": "2026-01-10T10:30:00Z"
  },
  {
    "id": 2,
    "nom": "Martin",
    "email": "bob@example.com",
    "role": "user",
    "createdAt": "2026-01-11T09:00:00Z"
  }
]
```

::right::

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `401` | Token manquant ou invalide |
| `403` | Droits insuffisants |

<!--
GET ne modifie jamais les données — il est safe et idempotent.
Une réponse vide retourne [] (tableau vide), pas 404.
-->

---
layout: two-cols-header
---

# GET /users/{id} — Récupérer une ressource

::left::

**Requête**

```http
GET /api/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
```

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Path | `id` | Identifiant unique de l'utilisateur |
| Header | `Authorization` | Token d'authentification |

::right::

**Réponse `200 OK`**

```json
{
  "id": 42,
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "createdAt": "2026-01-10T10:30:00Z"
}
```

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `401` | Non authentifié |
| `404` | Aucun utilisateur avec cet `id` |

<!--
Si l'id n'existe pas → 404, jamais 200 avec un body vide.
-->

---
layout: two-cols-header
---

# POST /users — Créer une ressource

::left::

**Requête**

```http
POST /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "user"
}
```

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Header | `Content-Type` | `application/json` obligatoire |
| Body | `nom`, `prenom` | Requis |
| Body | `email` | Requis, format valide, unique |
| Body | `role` | Requis, valeur dans un enum |

::right::

**Réponse `201 Created`**

```http
HTTP/1.1 201 Created
Location: /api/users/43
Content-Type: application/json

{
  "id": 43,
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "user",
  "createdAt": "2026-03-03T14:00:00Z"
}
```

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `400` | Email déjà utilisé |
| `422` | Données invalides (champ manquant, format) |

<!--
Le header Location indique l'URL de la ressource créée — bonne pratique.
201 ≠ 200 : préciser que la création a eu lieu, pas juste un succès.
-->

---
layout: two-cols-header
---

# PUT /users/{id} — Remplacer une ressource

::left::

**Requête**

```http
PUT /api/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "admin"
}
```

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Path | `id` | Identifiant de la ressource |
| Body | tous les champs | **Tous obligatoires** — les champs absents sont effacés |

::right::

**Réponse `200 OK`**

```json
{
  "id": 42,
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "updatedAt": "2026-03-03T15:00:00Z"
}
```

**PUT vs PATCH**

```
PUT   → remplacement complet
        champ absent = champ effacé ⚠️

PATCH → mise à jour partielle
        champ absent = champ inchangé ✅
```

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `404` | Ressource introuvable |
| `422` | Données invalides |

<!--
PUT est idempotent : appeler 2× avec les mêmes données → même résultat.
En pratique, PATCH est préféré car PUT force à envoyer TOUT l'objet.
-->

---
layout: two-cols-header
---

# PATCH /users/{id} — Modifier partiellement

::left::

**Requête**

```http
PATCH /api/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "admin"
}
```

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Path | `id` | Identifiant de la ressource |
| Body | champs à modifier | **Tous optionnels** — seuls les champs présents sont mis à jour |

::right::

**Réponse `200 OK`**

```json
{
  "id": 42,
  "nom": "Dupont",
  "prenom": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "updatedAt": "2026-03-03T15:30:00Z"
}
```

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `404` | Ressource introuvable |
| `422` | Format de données invalide |

<!--
PATCH est l'approche recommandée pour la modification.
La réponse contient toujours la ressource complète après modification.
-->

---
layout: two-cols-header
---

# DELETE /users/{id} — Supprimer une ressource

::left::

**Requête**

```http
DELETE /api/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
```

**Paramètres**

| Type | Nom | Description |
|------|-----|-------------|
| Path | `id` | Identifiant de la ressource à supprimer |
| Header | `Authorization` | Souvent un droit admin requis |

**Pas de body dans la requête.**

::right::

**Réponse `204 No Content`**

```http
HTTP/1.1 204 No Content
```

Aucun body en réponse — le `204` confirme le succès.

**Variante soft delete**

```http
HTTP/1.1 200 OK

{
  "id": 42,
  "deletedAt": "2026-03-03T16:00:00Z"
}
```

Si la ressource est archivée plutôt que supprimée, retourner `200` avec la ressource mise à jour.

**Cas d'erreur**

| Status | Cause |
|--------|-------|
| `404` | Ressource introuvable |
| `403` | Droits insuffisants pour supprimer |

<!--
204 = succès sans contenu. Ne pas retourner un body avec 204.
Appeler DELETE deux fois : 1ère fois 204, 2ème fois 404 — c'est normal (idempotent sur l'état final).
-->

---
layout: section
---

# Consommer une API

Qui envoie des requêtes — et avec quels outils

---
layout: two-cols-header
---

# cURL — Requêtes HTTP depuis le terminal

L'outil universel pour tester et déboguer les APIs

::left::

```bash
# GET — récupérer une ressource
curl https://api.example.com/users

# GET avec authentification
curl -H "Authorization: Bearer TOKEN" \
     https://api.example.com/users/me

# POST — créer une ressource
curl -X POST https://api.example.com/users \
     -H "Content-Type: application/json" \
     -d '{"nom": "Alice", "email": "alice@test.fr"}'

# DELETE
curl -X DELETE https://api.example.com/users/5
```

::right::

**Flags essentiels :**

<div class="text-xs leading-tight">

| Flag | Usage |
|------|-------|
| `-X` | Méthode HTTP (`-X POST`) |
| `-H` | Header (`-H "Key: Value"`) |
| `-d` | Corps de la requête (body) |
| `-o` | Sauvegarder dans un fichier |
| `-i` | Headers de réponse |
| `-v` | Verbeux (requête + réponse) |
| `-s` | Silencieux (pas de progress bar) |
| `-L` | Suivre les redirections |

</div>

<!--
cURL est disponible sur tous les OS. Maîtriser cURL c'est maîtriser HTTP.
La doc Swagger génère souvent des exemples cURL directement — pratique pour tester sans installer Postman.
-->

---
layout: two-cols-header
---

# cURL — Commandes avancées et astuces

::left::

```bash
# PATCH — mise à jour partielle
curl -X PATCH https://api.example.com/users/5 \
     -H "Content-Type: application/json" \
     -d '{"role": "admin"}'

# Voir les headers de réponse
curl -i https://api.example.com/users

# Mode verbeux — requête et réponse complètes
curl -v -X POST https://api.example.com/users \
     -H "Content-Type: application/json" \
     -d '{"nom": "Bob"}'
```

::right::

**Astuce : Copy as cURL**

Dans les DevTools du navigateur, clic droit sur une requête → **Copy → Copy as cURL** pour rejouer exactement la même requête dans le terminal (avec les bons headers et cookies).

<v-click>

**Utilisation en scripts**

```bash
# -s silencieux + -o pour sauvegarder
curl -s -o users.json \
     -H "Authorization: Bearer $TOKEN" \
     https://api.example.com/users
```

Idéal pour l'automatisation, les migrations et les pipelines CI/CD.

</v-click>

<!--
cURL est disponible sur tous les OS. Maîtriser cURL c'est maîtriser HTTP.
-->

---
layout: two-cols-header
---

# Browser DevTools — Onglet Réseau

Inspecter toutes les requêtes HTTP d'une page web en temps réel

::left::

**Ouvrir :** `F12` ou `Cmd+Option+I` → onglet **Réseau**

**Filtres :**

- **Fetch/XHR** → appels API
- **Doc** → HTML de la page
- **WS** → WebSockets

**Actions :**

- **Replay XHR** → rejouer la requête
- **Copy as cURL** → réutiliser dans le terminal
- **Preserve log** → conserver l'historique

::right::

**Informations disponibles par requête :**

```
▶ GET /api/users?page=1           200  45ms

  En-têtes (Headers)
  ├── Requête  : Authorization, Content-Type
  └── Réponse  : Content-Type, Cache-Control

  Charge utile (Payload)
  └── Corps envoyé en POST/PATCH

  Timing
  ├── DNS lookup    :   2ms
  ├── Connexion TCP :   8ms
  ├── Waiting TTFB  : 120ms  ← temps serveur
  └── Download      :  15ms
```

<!--
Le Network tab est le premier réflexe quand une API ne répond pas comme attendu.
TTFB (Time To First Byte) = temps d'attente serveur — indicateur clé de performance backend.
-->

---
layout: default
---

# Browser DevTools — Cas d'usage

Quand ouvrir l'onglet Réseau ?

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

<v-clicks>

**Déboguer une API**

- Vérifier qu'une requête part bien
- Contrôler les headers envoyés (token, Content-Type...)
- Inspecter le body de la réponse en JSON formaté

**Diagnostiquer CORS**

Si la console affiche `blocked by CORS policy`, l'onglet réseau montre exactement quel header manque dans la réponse.

</v-clicks>

</div>

<div>

<v-clicks>

**Analyser les performances**

- **TTFB** (Time To First Byte) = temps d'attente serveur
- Identifier les requêtes lentes (> 500ms)
- Détecter les appels redondants

**Reproduire une requête**

Clic droit → **Copy as cURL** → coller dans le terminal pour rejouer exactement la même requête avec les mêmes headers et token.

</v-clicks>

</div>

</div>

<!--
CORS : si la console affiche "blocked by CORS policy", l'onglet réseau montre exactement quel header manque.
TTFB (Time To First Byte) = temps d'attente serveur — indicateur clé de performance backend.
-->

---
layout: two-cols-header
---

# Postman — Client API graphique

L'outil de référence pour explorer, tester et documenter les APIs

::left::

**Construire une requête :**

- Choisir la méthode (GET, POST, PATCH...)
- Saisir l'URL
- Ajouter des **Headers** (Content-Type, Authorization...)
- Définir le **Body** (raw JSON, form-data, binary...)
- Envoyer et inspecter la réponse formatée

**Collections :** grouper les requêtes par projet (`/users`, `/sessions`...) et les partager avec l'équipe via un lien ou Git.

::right::

**Variables d'environnement :**

```
{{base_url}} = https://api.example.com
{{token}}    = eyJhbGci...
```

Switcher entre `dev`, `staging`, `prod` en un clic.

<v-click>

**Autres fonctionnalités :**

- **Mock server** : simuler une API avant qu'elle existe
- **Runner** : rejouer une collection en séquence
- **Import OpenAPI** : importer un `openapi.json`

**Alternatives open-source :** Insomnia, Hoppscotch

</v-click>

<!--
Postman est l'outil standard en entreprise pour partager les tests d'API entre équipes.
Les variables d'environnement évitent de copier-coller des tokens à chaque test.
-->

---
layout: default
---

# Postman — Tests automatiques

Valider les réponses API après chaque requête (onglet **Tests**)

```javascript
// Assertions exécutées après chaque requête
pm.test("Status 201", () => {
  pm.response.to.have.status(201);
});

pm.test("L'id est présent", () => {
  const body = pm.response.json();
  pm.expect(body.id).to.be.a("number");
});

// Stocker un token pour les prochaines requêtes
const token = pm.response.json().access_token;
pm.environment.set("token", token);
```

<v-click>

**Pourquoi écrire des tests Postman ?**

- Détecter les régressions dès le développement
- Le **Runner** permet de tester un scénario complet : login → créer → modifier → supprimer
- Les collections peuvent être jouées en CI/CD avec **Newman** (CLI Postman)

</v-click>

<!--
Le Runner permet de tester un scénario complet : login → créer → modifier → supprimer.
Newman est le CLI de Postman — idéal pour intégrer les tests dans une pipeline CI/CD.
-->

---
layout: default
---

# Making HTTP Requests in JavaScript

<v-clicks>

## Using Fetch API (modern approach)

```javascript
// GET request
const response = await fetch('https://api.example.com/users');
const users = await response.json();

// POST request with data
const newUser = {
  name: 'Alice Smith',
  email: 'alice@example.com'
};

const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify(newUser)
});

const result = await response.json();
console.log('Created user:', result);
```

</v-clicks>

<!--
The Fetch API is built into modern browsers and Node.js.
It's promise-based, making it work great with async/await.
-->

---
layout: two-cols-header
---

# Error Handling

::left::

## Check Status Codes

```javascript
const response = await fetch('/api/users');

if (!response.ok) {
  if (response.status === 404) {
    console.error('Not found');
  } else if (response.status === 500) {
    console.error('Server error');
  }
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

::right::

## Try-Catch for Network Errors

```javascript
try {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
} catch (error) {
  if (error.name === 'TypeError') {
    console.error('Network error:', error);
  } else {
    console.error('Request failed:', error);
  }
  throw error;
}
```

<!--
Always check response.ok before processing data.
Use try-catch for network failures and parsing errors.
-->

---
layout: section
---

# Authentification & Autorisation

Sécuriser l'accès à une API

---
layout: default
---

# Authentification vs Autorisation

<v-clicks>

**Authentification** — *Qui es-tu ?*
Vérifier l'identité de celui qui appelle l'API.

**Autorisation** — *Qu'as-tu le droit de faire ?*
Vérifier que l'identité authentifiée a les permissions pour l'action demandée.

</v-clicks>

<v-click>

```
Client                          Serveur
  |                                |
  |── POST /login ────────────────>|  ← Authentification
  |   { email, password }          |
  |<─ 200 { token: "eyJ..." } ─────|
  |                                |
  |── GET /admin/users ───────────>|  ← Autorisation
  |   Authorization: Bearer eyJ..  |    (le token prouve qui tu es)
  |<─ 403 Forbidden ───────────────|    (mais tu n'as pas le rôle admin)
```

</v-click>

<v-click>

**Méthodes courantes**

| Méthode | Usage | Complexité |
|---------|-------|:---:|
| **API Key** | Services serveur-à-serveur, scripts | Simple |
| **Bearer Token / JWT** | Applications web et mobile | Moyen |
| **OAuth 2.0** | Connexion via Google, GitHub, etc. | Complexe |

</v-click>

<!--
Authentification = prouver son identité (passeport).
Autorisation = avoir le droit d'entrer (visa).
On peut être authentifié mais non autorisé — ex: utilisateur connecté sans droits admin.
-->

---
layout: default
---

# API Key & JWT — Méthodes simples

<div class="grid grid-cols-2 gap-6 mt-2">

<div>

**API Key**

```http
GET /api/data HTTP/1.1
X-API-Key: sk-1234567890abcdef
```

- Clé secrète partagée entre client et serveur
- Générée une fois, envoyée dans chaque requête
- Idéal pour les intégrations serveur-à-serveur
- ⚠️ Ne pas exposer côté navigateur

</div>

<v-click>

<div>

**Bearer Token (JWT)**

```http
GET /api/users/me HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiJ9.sig
```

Un JWT est composé de 3 parties encodées en base64 :

```
Header.Payload.Signature
```

```json
// Payload (décodé)
{
  "sub": "42",
  "role": "admin",
  "exp": 1772000000
}
```

- Signé par le serveur → non falsifiable
- Auto-porteur → le serveur n'a pas besoin de DB pour valider

</div>

</v-click>

</div>

<!--
Le JWT est signé mais PAS chiffré — le payload est lisible en base64.
Ne jamais mettre de données sensibles (mot de passe) dans le payload JWT.
-->

---
layout: center
---

# OAuth 2.0 — Autorisation déléguée

Permettre à une app d'accéder à vos données **sans vous donner votre mot de passe**

<v-clicks>

- Le mot de passe n'est **jamais partagé** avec l'application tierce
- L'*authorization code* est à **usage unique** et courte durée de vie
- L'*access_token* est **limité dans le temps** (1h typiquement)
- Le *refresh_token* renouvelle l'accès **sans redemander** à l'utilisateur

</v-clicks>

---
layout: default
---

# OAuth 2.0 — Le flux d'autorisation

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant A as App
    participant AS as Auth Server
    participant RS as API

    U->>A: "Connecte-toi avec Google"
    A->>AS: /authorize?client_id=...&scope=email
    AS->>U: Page de consentement
    U->>AS: Accepte
    AS->>A: redirect_uri?code=AUTH_CODE
    A->>AS: POST /token {code, client_secret}
    AS->>A: {access_token, refresh_token}
    A->>RS: GET /userinfo Bearer token
    RS->>A: email, name...
```

<!--
OAuth 2.0 ne partage jamais le mot de passe de l'utilisateur avec l'application.
L'authorization code est à usage unique et à courte durée de vie.
Le access_token est ce que l'app utilise pour appeler l'API — limité dans le temps (1h typiquement).
Le refresh_token permet d'obtenir un nouveau access_token sans redemander à l'utilisateur.
-->

---
layout: two-cols-header
---

# OAuth 2.0 — Les acteurs et les tokens

::left::

**Les 4 acteurs**

<v-clicks>

- **Resource Owner** — l'utilisateur qui possède les données
- **Client** — l'application qui veut y accéder
- **Authorization Server** — délivre les tokens (Google, GitHub, Keycloak...)
- **Resource Server** — l'API qui protège les données

</v-clicks>

::right::

**Les tokens**

<div class="text-sm leading-tight">

| Token | Durée | Rôle |
|-------|-------|------|
| **Authorization Code** | ~10 min | Échangé contre les tokens |
| **Access Token** | ~1h | Appeler l'API |
| **Refresh Token** | Jours/sem. | Renouveler l'access token |
| **ID Token** (OIDC) | ~1h | Identité utilisateur (JWT) |

</div>

**Dans les headers**

```http
Authorization: Bearer <access_token>
```

<!--
OIDC (OpenID Connect) est une couche au-dessus d'OAuth 2.0 qui ajoute l'authentification.
OAuth 2.0 seul = autorisation. OIDC = authentification + autorisation.
"Se connecter avec Google" utilise OIDC, pas OAuth 2.0 seul.
-->

---
layout: two-cols-header
---

# OAuth 2.0 — Scopes et flux alternatifs

::left::

**Les scopes** — granularité des permissions

```
scope=email           → lire l'email seulement
scope=email profile   → email + profil public
scope=repo            → accès aux repos GitHub
scope=read:user       → lecture du profil utilisateur
```

::right::

**Flux alternatifs (grants)**

<v-clicks>

- **Authorization Code** → apps web/mobile ✅
- **Client Credentials** → serveur-à-serveur ✅
- **Implicit** → déprécié ⚠️
- **Password** → déprécié ⚠️

</v-clicks>

---
layout: section
---

# Fonctionnalités avancées des APIs

Pagination · Filtres · Tri · Soft Delete

---
layout: two-cols-header
---

# Pagination

Ne jamais retourner toute une table d'un coup

::left::

**Offset / Limit** (le plus courant)

```http
GET /api/users?limit=20&offset=0   → page 1 (1–20)
GET /api/users?limit=20&offset=20  → page 2 (21–40)
GET /api/users?limit=20&offset=40  → page 3 (41–60)
```

```json
{
  "data": [ ... ],
  "total": 247,
  "limit": 20,
  "offset": 0,
  "has_next": true
}
```

**Page / Per page** (variante)

```http
GET /api/users?page=1&per_page=20
GET /api/users?page=2&per_page=20
```

::right::

<v-clicks>

**Cursor-based** (pour les grandes tables et les feeds)

```http
GET /api/posts?after=eyJpZCI6NTB9&limit=20
```

```json
{
  "data": [ ... ],
  "cursor": {
    "next": "eyJpZCI6NzB9",
    "has_next": true
  }
}
```

Avantage : stable si des lignes sont insérées/supprimées entre deux pages.
Inconvénient : impossible de sauter directement à la page N.

</v-clicks>

<!--
Une API sans pagination peut mettre un serveur à genoux.
Offset/limit est simple mais peut être instable : si une ligne est insérée en page 1 entre deux appels, les éléments se décalent.
Cursor-based est la référence pour les feeds temps-réel (Twitter, Instagram).
-->

---
layout: default
---

# Pagination — Pourquoi toujours paginer ?

<v-clicks>

- Une table peut contenir des **millions de lignes**
- Protège la **base de données et le réseau**
- L'interface ne peut pas afficher 100 000 lignes
- Règle d'or : définir un `limit` **maximum côté serveur** (ex. 100)

</v-clicks>

---
layout: two-cols-header
---

# Filtres

Chercher des sous-ensembles de données

::left::

**Filtres simples — query params**

```http
# Valeur exacte
GET /api/users?role=apprenant
GET /api/sessions?formateur_id=5

# Filtres combinés (ET logique)
GET /api/sessions?formateur_id=5&niveau=avancé

# Plages (range)
GET /api/sessions?date_debut_min=2026-01-01
                 &date_debut_max=2026-06-30

# Recherche textuelle
GET /api/formations?q=python
GET /api/users?search=alice
```

::right::

**Conventions de nommage des filtres :**

<div class="text-sm leading-tight">

| Suffixe | Signification | Exemple |
|---------|--------------|---------|
| *(aucun)* | Égalité exacte | `?role=admin` |
| `_min` / `_max` | Borne numérique ou date | `?duree_min=10` |
| `_not` | Exclusion | `?role_not=admin` |
| `_in` | Parmi une liste | `?id_in=1,2,3` |
| `q` / `search` | Recherche textuelle | `?q=python` |

</div>

<!--
Les filtres s'implémentent côté serveur avec des WHERE dynamiques — jamais filtrer sur une réponse complète côté client.
Documenter chaque filtre dans Swagger avec des exemples concrets.
-->

---
layout: two-cols-header
---

# Filtres — Valeurs multiples et opérateurs

::left::

**Plusieurs valeurs pour un même champ**

```http
# Répétition du paramètre
GET /api/formations?niveau=débutant&niveau=intermédiaire

# Virgule séparée (selon l'API)
GET /api/formations?niveau=débutant,intermédiaire
```

::right::

**Filtres négatifs et numériques**

```http
GET /api/users?role_not=admin
GET /api/formations?duree_min=10&duree_max=40
GET /api/sessions?places_restantes_min=1
```

**Règle :** les filtres se cumulent avec un **ET logique**.
Pour un OU, convention explicite : `?niveau=débutant,intermédiaire`.

---
layout: two-cols-header
---

# Tri (Ordering)

Contrôler l'ordre des résultats

::left::

**Convention de base**

```http
# Tri par un champ — ascendant par défaut
GET /api/users?sort=nom

# Ordre explicite
GET /api/users?sort=nom&order=asc
GET /api/users?sort=nom&order=desc

# Variante avec préfixe - / + (GitHub, Stripe, Notion)
GET /api/users?sort=-date_inscription   → desc
GET /api/users?sort=+nom               → asc
```

**Tri multi-champs**

```http
# Virgule pour enchaîner les critères
GET /api/sessions?sort=date_debut,-capacite_max
# → date_debut ASC, puis capacite_max DESC
```

::right::

**Tri stable — indispensable avec la pagination**

```http
# ❌ Instable : deux users avec le même nom
#    peuvent changer d'ordre entre les pages
GET /api/users?sort=nom&page=1
GET /api/users?sort=nom&page=2

# ✅ Stable : id est unique → ordre garanti
GET /api/users?sort=nom,id
```

Si vous triez par `nom` sans critère de départage unique (`id`), deux utilisateurs homonymes peuvent permuter d'une page à l'autre — un élément peut apparaître **deux fois** ou **jamais**.

<!--
Un tri sans critère de départage unique est un bug subtil très courant en production.
La convention préfixe -/+ est utilisée par GitHub, Stripe et Notion dans leurs APIs publiques.
Le tri par défaut doit être documenté — les clients ne doivent pas dépendre d'un ordre implicite.
-->

---
layout: two-cols-header
---

# Tri — Valeur par défaut et règles

::left::

**Valeur par défaut** — toujours documentée

```http
# Sans paramètre → tri implicite
GET /api/users
# Équivalent à : ?sort=-date_inscription
```

Les clients ne doivent pas dépendre d'un ordre implicite.

::right::

**Règles à respecter**

<v-clicks>

- Toujours terminer le tri par un champ **unique** (`id`, `created_at` + `id`...)
- Documenter le **tri par défaut** dans Swagger
- La convention préfixe `-/+` : utilisée par GitHub, Stripe, Notion

</v-clicks>

---
layout: two-cols-header
---

# Soft Delete

Supprimer sans vraiment supprimer

::left::

**Hard delete vs Soft delete**

```sql
-- Hard delete : la ligne disparaît définitivement
DELETE FROM users WHERE id = 5;

-- Soft delete : on marque la date de suppression
UPDATE users SET deleted_at = NOW() WHERE id = 5;
-- La ligne reste en base de données
```

**DELETE ne supprime plus physiquement**

```http
DELETE /api/users/5
→ 204, mais deleted_at = NOW() en base
```

::right::

**Pourquoi soft delete ?**

- **Récupération** : annuler une suppression accidentelle
- **Audit trail** : historique complet conservé
- **Intégrité référentielle** : données liées cohérentes
- **Légal** : conservation obligatoire X années

**Le modèle**

```python
class User(SQLModel, table=True):
    nom: str
    email: str
    deleted_at: datetime | None = None  # None = actif
```

<!--
Le soft delete est la norme dans les applications métier.
Sans lui, une suppression accidentelle peut provoquer des incidents critiques.
-->

---
layout: two-cols-header
---

# Soft Delete — Filtrage et contraintes

::left::

**Masquer les supprimés par défaut**

```python
# Les supprimés sont invisibles par défaut
def get_users(db, include_deleted: bool = False):
    query = select(User)
    if not include_deleted:
        query = query.where(User.deleted_at == None)
    return db.exec(query).all()
```

**Endpoints utiles**

```http
# Inclure les supprimés (admin uniquement)
GET /api/users?include_deleted=true

# Restaurer un utilisateur supprimé
POST /api/users/5/restore
```

::right::

<v-click>

**Piège : contrainte UNIQUE**

La contrainte `UNIQUE(email)` doit tenir compte du `deleted_at` — un email "supprimé" doit pouvoir être réutilisé.

```sql
-- PostgreSQL : index partiel
CREATE UNIQUE INDEX users_email_unique
  ON users(email)
  WHERE deleted_at IS NULL;
```

La contrainte ne s'applique qu'aux lignes **actives**.

</v-click>

<!--
La contrainte d'unicité devient : UNIQUE(email) WHERE deleted_at IS NULL.
Sans index partiel, un utilisateur supprimé bloque la réinscription avec le même email.
-->

---
layout: two-cols-header
---

# Recherche (Search)

Chercher du texte libre dans les données

::left::

**Query param standard**

```http
# Recherche textuelle simple
GET /api/formations?q=python
GET /api/users?search=alice

# Combinée avec filtres et pagination
GET /api/formations?q=python&niveau=avancé&limit=10
```

**Multi-champs — côté serveur**

```sql
-- La recherche porte sur plusieurs colonnes
WHERE titre ILIKE '%python%'
   OR description ILIKE '%python%'
   OR tags ILIKE '%python%'
```

::right::

**Réponse enrichie**

```json
{
  "data": [ ... ],
  "total": 12,
  "query": "python",
  "took_ms": 8
}
```

**Bonnes pratiques**

<div class="text-sm leading-tight">

- Minimum 2–3 caractères avant de déclencher la recherche
- Retourner `[]` si aucun résultat (jamais `404`)
- Insensible à la casse et aux accents (`ILIKE`, `unaccent`)
- Pour des volumes importants → **Elasticsearch**, **Typesense**, **Meilisearch**

</div>

<!--
La recherche textuelle simple s'implémente avec ILIKE en PostgreSQL.
Pour la prod avec beaucoup de données, un moteur de recherche dédié est indispensable.
Le champ `took_ms` est utile pour monitorer les performances de recherche.
-->

---
layout: two-cols-header
---

# Recherche — Avancé et autocomplétion

::left::

**Recherche avancée (syntaxe structurée)**

```http
GET /api/formations?q=python+django&fields=titre,tags
```

Permet de cibler des champs spécifiques et combiner des termes.

::right::

**Autocomplétion (suggest)**

```http
GET /api/formations/suggest?q=py
→ ["Python", "PyTest", "PyDantic"]
```

Retourner les suggestions dès 2–3 caractères pour une bonne UX.

---
layout: two-cols-header
---

# Upload de fichiers

Envoyer des fichiers binaires via HTTP

::left::

**Multipart/form-data** (le plus courant)

```http
POST /api/users/42/avatar HTTP/1.1
Content-Type: multipart/form-data; boundary=----boundary

------boundary
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

<binary data>
------boundary--
```

```bash
# Avec cURL
curl -X POST /api/users/42/avatar \
     -F "file=@photo.jpg"
```

::right::

**Réponse `201 Created`**

```json
{
  "id": 7,
  "filename": "photo.jpg",
  "url": "https://cdn.example.com/avatars/42.jpg",
  "size_bytes": 204800,
  "mime_type": "image/jpeg",
  "uploaded_at": "2026-03-04T10:00:00Z"
}
```

**Upload avec métadonnées**

```bash
curl -X POST /api/documents \
     -F "file=@rapport.pdf" \
     -F "titre=Rapport Q1" \
     -F "categorie=finance"
```

<!--
Ne jamais stocker le nom de fichier envoyé par le client directement — risque de path traversal.
Toujours valider le MIME type côté serveur (le client peut mentir sur l'extension).
-->

---
layout: default
---

# Upload de fichiers — Validations côté serveur

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<v-clicks>

**Règles essentielles**

- **Type MIME** : accepter uniquement `image/*`, `application/pdf`...
- **Taille max** : rejeter au-delà d'un seuil (`413 Payload Too Large`)
- **Nom de fichier** : ne jamais faire confiance — utiliser un nom généré
- **Stockage** : ne pas stocker dans la base — utiliser S3, Cloudinary, etc.

</v-clicks>

</div>

<div>

<v-clicks>

**Codes de réponse**

| Status | Cause |
|--------|-------|
| `201` | Fichier uploadé avec succès |
| `400` | Type de fichier non autorisé |
| `413` | Fichier trop volumineux |

**Bonnes pratiques**

<div class="text-sm leading-tight">

- Valider le MIME type **côté serveur** (le client peut mentir sur l'extension)
- `Content-Length` : rejeter les fichiers trop volumineux avant de les lire

</div>

</v-clicks>

</div>

</div>

<!--
Le header Content-Length permet de rejeter les fichiers trop volumineux avant même de les lire.
-->

---
layout: section
---

# Swagger / OpenAPI

Documenter et exploiter son API

---
layout: two-cols-header
---

# Swagger UI — La documentation interactive

Une interface générée automatiquement à partir du code

::left::

**Ce que Swagger UI offre**

<v-clicks>

- **Exploration** : tous les endpoints listés avec leurs paramètres
- **Try it out** : exécuter des requêtes directement depuis le navigateur
- **Schémas** : modèles de requête et de réponse détaillés
- **Codes de statut** : tous les cas documentés

</v-clicks>

::right::

<v-click>

**Avec FastAPI — zéro configuration**

```python
# La doc est générée automatiquement
# Swagger UI  → http://localhost:8000/docs
# ReDoc       → http://localhost:8000/redoc
# JSON brut   → http://localhost:8000/openapi.json
```

</v-click>

<v-click>

**Enrichir la doc**

```python
@router.post("/users", summary="Créer un utilisateur",
             response_description="L'utilisateur créé")
async def create_user(user: UserCreate):
    """
    Crée un nouvel utilisateur.
    - **email** : doit être unique
    - **role** : `user` ou `admin`
    """
```

</v-click>

---
layout: two-cols-header
---

# OpenAPI spec — `openapi.json` source de vérité

Une interface générée automatiquement à partir du code

::left::

<v-click>

**Alternatives à Swagger UI**

| Outil | Forces |
|-------|--------|
| **Swagger UI** | Standard, intégré FastAPI |
| **ReDoc** | Plus lisible, meilleure nav |
| **Scalar** | Moderne, beau design |
| **Stoplight** | Portail dev complet |

</v-click>

::right::

<v-click>

```json
{
  "openapi": "3.1.0",
  "info": { "title": "Mon API", "version": "1.0.0" },
  "paths": {
    "/users": {
      "get": { "summary": "Lister les utilisateurs", ... },
      "post": { "summary": "Créer un utilisateur", ... }
    }
  },
  "components": { "schemas": { "User": { ... } } }
}
```

Ce fichier JSON est **machine-readable** — il peut être exploité bien au-delà de la doc.

</v-click>

<!--
FastAPI génère le openapi.json automatiquement à partir des types Pydantic et des annotations.
Swagger UI est l'interface de test la plus utilisée en développement — pas besoin de Postman pour les tests simples.
-->

---
layout: two-cols-header
---

# OpenAPI spec — Industrialiser le développement

::left::

<v-clicks>

**🔌 Clients API (SDK typés)**

Générer des clients typés pour consommer l'API :
TypeScript, Python, Java, C#, Go, Swift...

```bash
npx openapi-generator-cli generate \
  -i openapi.json -g typescript-fetch \
  -o ./src/api-client
```

-> appels typés, autocomplétion, moins d'erreurs

**🖥️ Stubs serveur (scaffold)**

Générer contrôleurs, routes et modèles à partir du contrat.
Structure générée — la logique métier reste à écrire.
*Outils : OpenAPI Generator, NSwag*

</v-clicks>

::right::

<v-clicks>

**🧪 Tests automatisés**

```bash
# Tests de conformité contrat ↔ implémentation
schemathesis run openapi.json --url http://localhost:8000
```

*Aussi : collections Postman, Newman, Dredd*

**🎭 Mock servers**

API simulée sans backend réel — idéal pour le front en avance de phase.
*Outils : Prism, Mockoon, Stoplight*

**🧱 Modèles & types**

Générer DTOs, interfaces TypeScript, validateurs Zod/Yup.
→ synchronise front ↔ back, évite la dérive de schéma.

</v-clicks>

---
layout: two-cols-header
---

# OpenAPI spec — Industrialiser le développement

::left::

<v-clicks>

**🔍 Validation runtime**

Valider requêtes entrantes et réponses sortantes en gateway ou middleware — contract enforcement automatique.

**🚀 Gouvernance API**

```bash
# Détecter les breaking changes entre deux versions
openapi-diff v1.json v2.json

# Linter le contrat (règles de style)
spectral lint openapi.json
```

→ changelog automatique, versioning, CI/CD

</v-clicks>

::right::

<v-clicks>

**🤖 Intégrations IA**

Le Swagger devient source de vérité **machine-readable** pour :

- Tools OpenAI / function calling
- Nodes LangChain / agents
- Connecteurs n8n, Make
- Serveurs MCP

→ L'IA peut découvrir et appeler votre API automatiquement.

</v-clicks>

<!--
Le openapi.json, c'est le contrat de l'API exprimé en JSON — lisible par les humains ET les machines.
API-first : écrire le contrat avant le code, puis générer les stubs et les clients.
Schemathesis fait du property-based testing : il génère des milliers de requêtes automatiquement pour trouver des bugs.
-->

---
layout: two-cols-header
---

# JSON:API — Une convention stricte

::left::

<v-clicks>

```json
{
  "data": {
    "type": "users",
    "id": "42",
    "attributes": { "nom": "Alice", "email": "alice@example.com" },
    "relationships": {
      "formations": {
        "data": [{ "type": "formations", "id": "5" }]
      }
    }
  }
}
```

<div class="text-sm leading-tight">

- Structure exacte des réponses JSON définie par spec
- Inclut : pagination, relations, liens, erreurs — tous normalisés
- Élimine les décisions de design au niveau du format
- Moins répandu mais cohérent pour des APIs complexes

</div>

</v-clicks>

::right::

<v-clicks>

**Autres specs**

| Spec | Particularité |
|------|--------------|
| **HAL** | Liens hypermedia dans les réponses |
| **AsyncAPI** | OpenAPI pour WebSockets / messages |
| **gRPC + Protobuf** | Binaire, très performant (microservices) |

</v-clicks>

<!--
OpenAPI décrit QUOI fait l'API. JSON:API définit COMMENT les données sont formatées.
gRPC est souvent utilisé pour la communication interne entre microservices (pas pour les APIs publiques).
-->

---
layout: section
---

# Les autres protocoles

REST n'est pas le seul modèle

---
layout: two-cols-header
---

# Au-delà de REST

::left::

**Webhooks — le serveur appelle le client**

REST = pull : le client interroge le serveur.
Webhook = push : le serveur notifie le client.

```http
# Le serveur envoie un POST vers l'URL du client
POST https://mon-app.fr/webhooks/paiement
Content-Type: application/json

{ "event": "payment.succeeded", "amount": 4900, "id": "pay_xyz" }
```

Exemples : Stripe, GitHub, Slack, n8n.
→ Idéal pour les événements asynchrones (paiement, CI/CD, alertes).

::right::

<v-click>

**SSE — Server-Sent Events**

```javascript
const stream = new EventSource('/api/notifications');
stream.onmessage = (e) => console.log(e.data);
```

- Connexion HTTP longue maintenue ouverte
- Le serveur pousse des événements texte (unidirectionnel)
- Natif dans les navigateurs, pas besoin de WebSocket
- Idéal : notifications temps réel, progression longue tâche

</v-click>

---
layout: two-cols-header
---

# Au-delà de REST

::left::

<v-clicks>

**GraphQL — requêtes flexibles**

```graphql
query {
  user(id: 42) {
    nom
    email
    formations { titre statut }
  }
}
```

- Le client choisit exactement les champs qu'il veut
- Un seul endpoint (`POST /graphql`)
- Évite l'over-fetching et l'under-fetching
- Complexité côté serveur (resolver, N+1 queries)

</v-clicks>

::right::

<v-clicks>

**MCP — Model Context Protocol**

Protocole d'Anthropic pour connecter les agents IA aux outils :

```
Agent IA ←→ MCP Server ←→ Base de données / API / Fichiers
```

- Standardise la découverte et l'appel d'outils par l'IA
- Le Swagger de votre API peut devenir un serveur MCP
- Permet à Claude / GPT d'appeler votre API automatiquement

</v-clicks>

<!--
WebSockets = bidirectionnel temps réel (chat, jeux). SSE = push unidirectionnel (notifications, logs).
GraphQL n'est pas "mieux" que REST — il répond à des besoins différents (front flexible, BFF).
MCP est en train de devenir le standard pour l'intégration IA-outils.
-->

---
layout: section
---

# Design & Méthodologie

Comment aborder la conception d'une API

---
layout: two-cols-header
---

# Contract-First vs Code-First

Deux philosophies de développement

::left::

**Contract-First (API-First)**

On définit le contrat OpenAPI **avant** d'écrire le code.

```
1. Design OpenAPI  → revue métier/tech
2. Mock server     → front peut démarrer
3. Implémentation  → backend
4. SDK généré      → clients typés
5. Tests contrat   → schemathesis, Dredd
```

*Outils : Stoplight, SwaggerHub, Bruno*

::right::

**Code-First**

On code l'API, le Swagger est généré après coup.

```python
# FastAPI génère l'OpenAPI automatiquement
@router.get("/users", response_model=list[UserRead])
async def list_users(db: Session = Depends(get_db)):
    ...
```

<v-clicks>

**Avantages contract-first :** front+back en parallèle, source de vérité commune, gouvernance propre.

**Avantages code-first :** rapide au démarrage, simple pour petites équipes.

**Risques code-first :** dérive doc/code, difficile à gouverner à grande échelle.

</v-clicks>

<!--
Contract-First est la référence pour les APIs publiques ou partagées entre équipes.
Code-First convient pour les projets rapides où l'API est consommée uniquement en interne.
-->

---
layout: default
---

# API-as-a-Product

Vision stratégique : l'API est un produit livré à des développeurs

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<v-clicks>

**Les piliers**

- Portail développeur avec doc interactive
- Versioning clair et changelog public
- SLA (Service Level Agreement) défini
- Support dédié aux intégrateurs

</v-clicks>

</div>

<div>

<v-clicks>

**Exemples de référence**

| Entreprise | API emblématique |
|------------|-----------------|
| **Stripe** | Paiements — doc exemplaire |
| **Twilio** | SMS / appels — DX soignée |
| **Cloudinary** | Images — SDK générés |
| **GitHub** | REST + GraphQL + webhooks |

</v-clicks>

</div>

</div>

<!--
API-as-a-Product est le niveau de maturité des grandes plateformes.
L'API devient un canal de distribution à part entière — parfois monétisable directement.
-->

---
layout: section
---

# Outiller & Industrialiser

Les briques d'une API en production

---
layout: two-cols-header
---

# Infrastructure d'une API (1/2)

Healthcheck · Rate limiter · API Gateway

::left::

**Healthcheck — surveiller l'état de l'API**

```http
GET /health  →  200 OK

{
  "status": "ok",
  "checks": {
    "database": "ok",
    "redis":    "ok",
    "storage":  "degraded"
  },
  "uptime_s": 86400
}
```

Un statut `degraded` → `200`, une panne → `503 Service Unavailable`.
Utilisé par les load balancers et les status pages.

::right::

<v-clicks>

**Rate Limiter — protéger l'API**

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1772000060
```

Règles typiques : 100 req/min par IP, 1000 req/min par API Key.

**API Gateway — point d'entrée unique**

```
Client → [Gateway] → Service A / B / C
```

Auth · Routing · Rate limit · CORS · SSL
*Kong, Traefik, AWS API Gateway, Nginx*

</v-clicks>

<!--
Le healthcheck est la première chose à implémenter avant de mettre en prod.
Le rate limiter est essentiel pour les APIs publiques.
-->

---
layout: two-cols-header
---

# Infrastructure d'une API (2/2)

Cache · Versioning

::left::

**Cache — réduire la charge**

```http
# Réponse serveur
Cache-Control: public, max-age=300
ETag: "abc123"

# Requête conditionnelle client
If-None-Match: "abc123"
→ 304 Not Modified  (pas de body = économie réseau)
```

*Niveaux : HTTP cache, Redis, CDN (Cloudflare)*

::right::

<v-click>

**Versioning**

```http
# URI versioning (le plus courant)
GET /api/v1/users
GET /api/v2/users   ← breaking change

# Header versioning
Accept: application/vnd.myapi+json;version=2
```

Politique : déprécier avec le header `Sunset`, maintenir N-1.

</v-click>

<!--
L'API gateway centralise tout ce qui est transverse et évite de le dupliquer dans chaque service.
Le cache HTTP est le plus simple et ne nécessite aucune infra supplémentaire.
-->

---
layout: section
---

# Best Practices

Building great APIs

---
layout: two-cols
---

<v-clicks>

## Design

- Use meaningful resource names
- Version your API (`/api/v1/`)
- Support filtering & pagination
- Provide clear error messages

## Performance

- Implement caching
- Use compression (gzip)
- Rate limiting

</v-clicks>

::right::

<v-clicks>

## Security

- Use HTTPS always
- Validate all inputs
- Implement authentication
- Rate limit to prevent abuse
- Never expose sensitive data

## Documentation

- Clear endpoint descriptions
- Request/response examples
- Error code explanations
- Interactive API explorer

</v-clicks>

<!--
Good API design is about thinking from the developer's perspective.
Make it intuitive, secure, well-documented, and fast.
-->

---
layout: center
class: text-center
---

# Resources & Next Steps

<v-clicks>

## Learn More

📚 [MDN HTTP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP)
🌐 [REST API Tutorial](https://restfulapi.net/)
🔧 [Postman](https://www.postman.com/) - API testing tool
📖 [Public APIs List](https://github.com/public-apis/public-apis)

</v-clicks>

<!--
The best way to learn is by building. Start with simple APIs
and gradually tackle more complex authentication and data structures.
-->

---
layout: center
class: text-center
---

# Thank You!

Questions?

<div class="text-sm opacity-75 mt-8">
  Built with Slidev - The presentation slides for developers
</div>
