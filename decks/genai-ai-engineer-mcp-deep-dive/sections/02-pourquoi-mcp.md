---
layout: section-liquid
---

## MCP : Model Control Protocol

<div class="text-lg opacity-70 mt-4">Intro</div>

---
layout: default
---

### Le problème : N × M

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

#### Avant MCP

- **N** apps LLM (Claude, Cursor, VS Code, agents maison...)
- **M** services à brancher (GitHub, Sentry, DB, filesystem...)
- → **N × M** intégrations custom à écrire et maintenir

<div class="text-sm opacity-70 mt-4 mb-4">Chaque agent réimplémente son propre protocole tool calling.</div>

```mermaid {scale: 0.6}
graph LR
    subgraph "Avant — N × M"
        H1[Claude] --> S1[GitHub]
        H1 --> S2[Sentry]
        H1 --> S3[DB]
        H2[Cursor] --> S1
        H2 --> S2
        H2 --> S3
        H3[Agent] --> S1
        H3 --> S2
        H3 --> S3
    end
```

</div>

<div>

#### Avec MCP

- **N** apps qui parlent **un seul protocole**
- **M** servers qui exposent **le même protocole**
- → **N + M** implémentations, branchables entre elles

<div class="text-sm opacity-70 mt-4 mb-4">Un standard ouvert, un transport, des primitives définies.</div>

```mermaid {scale: 0.6}
graph LR
    subgraph "Après — N + M"
        C1[Claude] --> MCP{{MCP Protocol}}
        C2[Cursor] --> MCP
        C3[Agent] --> MCP
        MCP --> M1[GitHub MCP]
        MCP --> M2[Sentry MCP]
        MCP --> M3[DB MCP]
    end
```

</div>

</div>

<!--
- L'analogie évidente : USB-C pour les LLM
- Mais USB-C reste un cable. MCP est un protocole stateful avec négociation
- Plus proche conceptuellement de SMTP, IMAP, LSP
-->

---
layout: statement
---

### MCP n'est pas une API.

<div class="text-3xl mt-6 opacity-90">C'est un <span class="text-[#457b9d] font-bold">protocole stateful</span>.</div>

<div class="text-xl mt-6 opacity-70 max-w-2xl mx-auto">Avec son lifecycle, sa négociation de capabilities, ses primitives strictes — à traiter avec la même rigueur qu'un protocole réseau.</div>

<!--
- LE message central de la présentation
- Vrai protocole = JSON-RPC sous le capot, primitives strictes, capabilities négotiées
- Pas un wrapper REST, pas un "OpenAPI pour LLM"
- Plus proche de LSP (Language Server Protocol) côté philosophie
-->

---
layout: image
image: https://mintcdn.com/mcp/bEUxYpZqie0DsluH/images/mcp-simple-diagram.png?w=2500&fit=max&auto=format&n=bEUxYpZqie0DsluH&q=85&s=dc4ab238184b6c70e06e871681c921c5
backgroundSize: contain
---
