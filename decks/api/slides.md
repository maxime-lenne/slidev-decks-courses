---
theme: default
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
layout: section
---

# What is an API?

Application Programming Interface

---
layout: two-cols
---

# API Basics

An **API** (Application Programming Interface) is a contract that defines how software components communicate.

::right::

<v-clicks>

- **Interface**: A set of rules and protocols
- **Communication**: Exchange of data between systems
- **Abstraction**: Hide complex implementation details
- **Standardization**: Consistent way to interact

</v-clicks>

<v-click>

```mermaid
graph LR
    A[Client App] -->|Request| B[API]
    B -->|Response| A
    B -->|Queries| C[Database]
    B -->|Calls| D[External Services]
```

</v-click>

<!--
APIs are everywhere - when you check the weather on your phone,
order food online, or use social media, you're using APIs.
-->

---
layout: default
---

# Types of APIs

<v-clicks>

## Web APIs (HTTP-based)
The most common type for internet applications

## Library/Framework APIs
Functions and methods in programming libraries (e.g., `Array.map()` in JavaScript)

## Operating System APIs
System-level operations (file I/O, networking)

## Hardware APIs
Direct communication with hardware devices

</v-clicks>

<v-click>

**Today's focus**: Web APIs and HTTP-based communication

</v-click>

<!--
We'll focus on Web APIs since they're the foundation of modern web applications.
-->

---
layout: section
---

# HTTP: The Protocol of the Web

Hypertext Transfer Protocol

---
layout: two-cols-header
---

# HTTP Request/Response Cycle

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

# HTTP Methods (Verbs)

Common HTTP methods and their purposes

<v-clicks>

| Method | Purpose | Example | Idempotent |
|--------|---------|---------|------------|
| **GET** | Retrieve data | `GET /api/users` | ✅ Yes |
| **POST** | Create new resource | `POST /api/users` | ❌ No |
| **PUT** | Update/replace resource | `PUT /api/users/123` | ✅ Yes |
| **PATCH** | Partial update | `PATCH /api/users/123` | ❌ No |
| **DELETE** | Remove resource | `DELETE /api/users/123` | ✅ Yes |

</v-clicks>

<v-click>

**Idempotent**: Multiple identical requests have the same effect as one request

</v-click>

<!--
Understanding HTTP methods is crucial - they tell the server what action you want to perform.
GET is for reading, POST for creating, PUT/PATCH for updating, DELETE for removing.
-->

---
layout: default
---

# HTTP Status Codes

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

REST is an **architectural style** for designing networked applications

<v-clicks>

## Core Principles

1. **Client-Server Separation**: Independent evolution
2. **Stateless**: Each request contains all needed information
3. **Cacheable**: Responses must define if they're cacheable
4. **Uniform Interface**: Consistent resource identification
5. **Layered System**: Client can't tell if connected directly
6. **Code on Demand** (optional): Server can send executable code

</v-clicks>

<v-click>

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

</v-click>

<!--
REST isn't a protocol or standard - it's a set of architectural constraints
that make APIs scalable, reliable, and easy to understand.
-->

---
layout: two-cols
---

# RESTful Resource Design

Resources are the key abstraction

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

# RESTful API Example

Building a blog API

```javascript
// GET /api/posts - List all posts
[
  { "id": 1, "title": "Understanding REST", "author": "Alice", "published": true },
  { "id": 2, "title": "HTTP Deep Dive", "author": "Bob", "published": false }
]

// POST /api/posts - Create a new post
// Request body:
{
  "title": "My New Post",
  "content": "This is the content...",
  "author": "Charlie"
}
// Response: 201 Created
{
  "id": 3,
  "title": "My New Post",
  "content": "This is the content...",
  "author": "Charlie",
  "published": false,
  "createdAt": "2024-01-10T10:30:00Z"
}
```

<!--
This shows how RESTful APIs handle collections and resource creation.
Notice the 201 status code for successful creation.
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
layout: default
---

# Authentication & Authorization

Securing API access

<v-clicks>

## Common Methods

### 1. API Keys
```javascript
fetch('/api/data', {
  headers: { 'X-API-Key': 'your-api-key-here' }
});
```

### 2. Bearer Tokens (JWT)
```javascript
fetch('/api/data', {
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
});
```

### 3. OAuth 2.0
More complex, uses authorization servers for delegated access

</v-clicks>

<!--
Authentication proves who you are. Authorization determines what you can do.
JWT (JSON Web Tokens) are very popular for modern web apps.
-->

---
layout: fact
---

# Real-World APIs

Let's look at some popular examples

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
layout: two-cols
---

# Best Practices

Building great APIs

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
- Optimize database queries

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

- 📚 [MDN HTTP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- 🌐 [REST API Tutorial](https://restfulapi.net/)
- 🔧 [Postman](https://www.postman.com/) - API testing tool
- 📖 [Public APIs List](https://github.com/public-apis/public-apis)

## Practice

- Build a simple REST API with Node.js/Express
- Explore public APIs with fetch()
- Use browser DevTools Network tab
- Try GraphQL (alternative to REST)

</v-clicks>

<!--
The best way to learn is by building. Start with simple APIs
and gradually tackle more complex authentication and data structures.
-->

---
layout: end
---

# Thank You!

Questions?

<div class="text-sm opacity-75 mt-8">
  Built with Slidev - The presentation slides for developers
</div>
