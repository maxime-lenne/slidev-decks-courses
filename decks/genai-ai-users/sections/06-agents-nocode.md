---
layout: section-liquid
---

## Agents no-code

<div class="text-lg opacity-70 mt-4">Agents prêts à l'emploi · Copilot Studio · tools & connecteurs · MCP</div>

---
layout: default
---

### D'un assistant à un agent

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

#### Un assistant / chatbot

- **Répond** à partir de vos documents
- Reste dans la **conversation**
- Ne fait rien « dans le monde réel »

<div class="text-xs opacity-70 mt-3">Ex : « Que dit notre politique de télétravail ? »</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Un agent

- **Répond** *et* **agit** via des **outils**
- Enchaîne plusieurs **étapes** seul
- Se **déclenche** (message, planning, événement)

<div class="text-xs opacity-70 mt-3">Ex : « Crée le ticket, envoie le mail de confirmation et note-le dans le tableau. »</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">
La différence tient en un mot : les <strong>outils</strong> (<em>tools</em>). Un agent est un assistant… qui peut appuyer sur des boutons.
</div>

<!--
- Distinction clé : assistant = parle ; agent = parle ET agit
- "Appuyer sur des boutons" = image simple pour les tools/actions
- Tout se fait en no-code : on ne code pas les outils, on les branche
-->

---
layout: default
---

### Les *tools* : ce qu'un agent peut faire

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Un *tool* = une action que l'agent déclenche

- 📧 **Envoyer un mail** (Outlook)
- 🗂️ **Créer un fichier / une ligne** (Excel, SharePoint, Lists)
- 🎫 **Ouvrir un ticket** (ServiceNow, Jira)
- 📅 **Poser un créneau** (Calendrier)
- 🔎 **Chercher une info** (web, base interne)
- 💬 **Poster un message** (Teams)

</div>

<div>

#### Comment l'agent choisit ?

Vous **décrivez** chaque outil en langage naturel. L'agent, selon la demande, **décide** lequel appeler.

<div class="font-mono text-xs bg-[#1d3557]/10 rounded p-3 mt-2 leading-relaxed">
Utilisateur : « Réserve la salle B pour 14 h et préviens l'équipe »<br/><br/>
Agent → <strong>tool Calendrier</strong> (réserve)<br/>
Agent → <strong>tool Teams</strong> (notifie)
</div>

<div class="text-xs opacity-70 mt-3">Vous branchez les outils ; l'agent orchestre.</div>

</div>

</div>

<!--
- Ne pas parler de "function calling" : dire "l'agent choisit le bon outil"
- Le rôle de l'humain no-code : décrire clairement chaque outil (nom + quand l'utiliser)
- Plus la description est claire, mieux l'agent choisit — c'est du "prompting d'outil"
-->

---
layout: default
---

### Les connecteurs : brancher l'agent à vos apps

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Des centaines de connecteurs prêts

Dans **Copilot Studio** / **Power Platform**, un catalogue de connecteurs relie l'agent à vos logiciels :

- 🟦 **Microsoft 365** — Outlook, Teams, SharePoint, Excel
- ☁️ **SaaS** — Salesforce, ServiceNow, SAP, HubSpot
- 🗄️ **Données** — SQL, Dataverse, OneLake
- 🌐 **Web & API** — connecteurs personnalisés

</div>

<div>

#### Vous assemblez, sans coder

- Choisir le connecteur dans une **liste**
- **S'authentifier** (votre compte, vos droits)
- Sélectionner l'**action** voulue

<div class="text-xs opacity-70 mt-3">C'est du « brancher des Lego » : chaque connecteur = une boîte d'actions prêtes.</div>

<div class="text-xs opacity-70 mt-2">⚠️ L'agent hérite de **vos permissions** — il ne peut faire que ce que vous pouvez faire.</div>

</div>

</div>

<!--
- Connecteur = pont vers une app ; tool = action précise dans cette app
- Insister sur l'auth : l'agent agit "au nom de" quelqu'un, avec ses droits → gouvernance
- Éviter le catalogue exhaustif : montrer 4-5 connecteurs que la salle reconnaît
-->

---
layout: default
---

### MCP : la prise universelle des agents

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Le problème sans standard

Chaque outil se branche à sa façon → autant d'intégrations sur-mesure à créer et maintenir.

<div class="text-xs opacity-70 mt-3">Problème « N × M » : N agents × M outils.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### MCP — *Model Context Protocol*

**Protocole ouvert** (Anthropic, 2024) : une **prise standard** entre un agent et des outils / données.

- **1 branchement** pour tous les agents compatibles
- Un **serveur MCP** = un outil ou une source, exposé une fois
- Adopté par **Microsoft (Copilot Studio)**, **OpenAI**, etc.

<div class="text-xs opacity-70 mt-3">= « l'<strong>USB-C</strong> des agents » — une prise, tous les services.</div>

</div>

</div>

<div class="text-center text-xs opacity-60 mt-6">
Concrètement : votre éditeur d'agent no-code peut <strong>ajouter un serveur MCP</strong> pour brancher un outil, sans intégration sur-mesure.
</div>

<!--
- Analogie USB-C = la plus parlante pour un public non technique
- Ne pas détailler le protocole : ce qui compte = "standard = ça se branche partout"
- Copilot Studio supporte l'ajout de serveurs MCP → un agent no-code peut consommer un outil MCP
- Renvoyer les curieux au deck "MCP deep dive" (AI Engineer)
-->

---
layout: default
---

### Tools, connecteurs, MCP : qui fait quoi ?

<br>

<div class="text-sm">

| Brique | C'est quoi | Analogie |
|--------|-----------|----------|
| 🔧 **Tool** | Une action précise que l'agent déclenche | Un bouton |
| 🔌 **Connecteur** | Le pont vers une app (Outlook, Salesforce…) | La multiprise d'une app |
| 🔗 **MCP** | Le standard universel pour brancher outils & données | La prise USB-C |
| 📚 **Connaissances** | Les documents sur lesquels l'agent s'appuie (RAG) | La bibliothèque |

</div>

<div class="text-center text-xs opacity-60 mt-4">
Un agent no-code = <strong>connaissances</strong> (pour répondre) + <strong>tools / connecteurs / MCP</strong> (pour agir).
</div>

<!--
- Cette table récapitule tout le vocabulaire de la section
- Message : vous n'avez pas à coder ces briques, vous les assemblez
- Vérifier que "RAG = connaissances" fait le lien avec la section précédente
-->

---
layout: default
---

### Construire un agent no-code : la démarche

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### 5 étapes dans Copilot Studio (ou GPT builder)

1. **Décrire** le rôle & le ton *(prompt système)*
2. **Ajouter les connaissances** *(documents, sites, SharePoint)*
3. **Brancher les tools** *(connecteurs, MCP)*
4. **Définir les déclencheurs** *(chat, planning, événement)*
5. **Tester, publier, partager** *(Teams, web, M365)*

</div>

<div>

#### Bonnes pratiques

- 🎯 **Un agent = un objectif** clair
- 📝 Décrire chaque outil **précisément** (quand l'utiliser)
- 🔒 Limiter aux **connecteurs nécessaires**
- 🧪 **Tester** les cas limites avant de publier
- 👤 Vérifier les **permissions** & données exposées

<div class="text-xs opacity-70 mt-3">On reste responsable de ce que l'agent fait en notre nom → gouvernance.</div>

</div>

</div>

<div class="text-center text-sm mt-6 opacity-70">
Démo : un agent « support interne » — connaissances SharePoint + tool Outlook + un serveur MCP.
</div>

<!--
- Démo idéale : construire un agent minimal en live (même partiel)
- Insister sur "un agent = un objectif" : les agents fourre-tout échouent
- Fil rouge : chaque tool branché = une responsabilité → transition gouvernance
-->
