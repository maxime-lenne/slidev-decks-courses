---
layout: section
---

# Section 4 : Diagrammes & Visualisations

Mermaid, PlantUML, etc.

---

# Diagrammes Mermaid

## Flowchart

```mermaid
flowchart LR
    A[Début] --> B{Condition?}
    B -->|Oui| C[Action 1]
    B -->|Non| D[Action 2]
    C --> E[Fin]
    D --> E
```

---

# Mermaid - Sequence Diagram

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB

    Client->>API: Requête GET /users
    API->>DB: SELECT * FROM users
    DB-->>API: Résultats
    API-->>Client: JSON Response
```

---

# Mermaid - State Diagram

```mermaid {scale: 0.8}
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: fetch()
    Loading --> Success: data received
    Loading --> Error: request failed
    Success --> [*]
    Error --> Idle: retry()
```

---

# Mermaid - Gantt

```mermaid {theme: 'default'}
gantt
    title Projet SQL Training
    dateFormat YYYY-MM-DD

    section Phase 1
    Conception      :a1, 2024-01-01, 30d
    Développement   :a2, after a1, 45d

    section Phase 2
    Tests          :a3, after a2, 20d
    Déploiement    :a4, after a3, 10d
```

---

# Mermaid - ER Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        int id PK
        string name
        string email
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
        int id PK
        date order_date
        int customer_id FK
    }
    LINE-ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
    }
    PRODUCT ||--o{ LINE-ITEM : "ordered in"
    PRODUCT {
        int id PK
        string name
        decimal price
    }
```
