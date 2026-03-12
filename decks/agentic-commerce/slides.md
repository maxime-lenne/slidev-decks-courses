---
theme: ../../themes/simplon
title: Commerce Agentique — L'IA au service de la vente
layout: cover
background: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Commerce Agentique

## L'IA au service de la vente

<div class="pt-8 text-gray-300">
  De la prospection à la fidélisation — sans supervision humaine à chaque étape
</div>

---
layout: default
---

# Il est 3h du matin…

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

Un prospect visite votre site pour la **4e fois**.

Il hésite sur une commande à **50 000 €**.

Pendant ce temps :

<v-clicks>

- 🔍 Un agent **identifie** son comportement
- 🧠 Il **analyse** son historique et ses hésitations
- ✍️ Il **personnalise** une offre et un message
- 📩 Il **envoie** au bon moment
- ✅ Le deal est **signé** avant votre réveil

</v-clicks>

</div>
<div class="flex items-center justify-center font-mono text-sm bg-gray-900 text-green-400 rounded-xl p-6">

```
03:17 — Prospect revient sur /pricing
03:18 — Agent: signal d'achat fort détecté
03:18 — Génère offre personnalisée -5%
03:19 — Envoie email + SMS
03:42 — Prospect accepte l'offre
03:42 — CRM mis à jour automatiquement
─────────────────────────────────
✓ Deal signé: 47 500 €
```

</div>
</div>

<div class="mt-4 text-sm text-gray-400 italic">
Ce n'est pas de la science-fiction — c'est en production chez Amazon, Salesforce, HubSpot
</div>

---
layout: default
---

# Agenda

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="flex flex-col gap-3">

<div class="flex items-center gap-3 p-3 border rounded-lg">
  <span class="text-2xl">🤖</span>
  <div><strong>IA classique vs IA agentique</strong><br/><span class="text-sm text-gray-500">Comprendre la différence</span></div>
</div>

<div class="flex items-center gap-3 p-3 border rounded-lg">
  <span class="text-2xl">⚡</span>
  <div><strong>Les 4 super-pouvoirs</strong><br/><span class="text-sm text-gray-500">Cas d'usage concrets</span></div>
</div>

</div>

<div class="flex flex-col gap-3">

<div class="flex items-center gap-3 p-3 border rounded-lg">
  <span class="text-2xl">🏗️</span>
  <div><strong>Comment ça marche</strong><br/><span class="text-sm text-gray-500">Architecture sans code</span></div>
</div>

<div class="flex items-center gap-3 p-3 border rounded-lg">
  <span class="text-2xl">⚖️</span>
  <div><strong>Opportunités & vigilance</strong><br/><span class="text-sm text-gray-500">Enjeux métier</span></div>
</div>

</div>

</div>

---
layout: section
---

# Qu'est-ce que l'IA agentique ?

---
layout: default
---

# IA classique vs IA agentique

<div class="grid grid-cols-2 gap-10 mt-6">

<div class="border border-gray-200 rounded-xl p-6">

### IA classique

<div class="font-mono text-sm bg-gray-100 rounded p-3 my-3">
  Question → Réponse
</div>

- Répond à **une** question
- Résultat **unique**, passif
- Pas d'action dans le monde réel
- *Exemple : ChatGPT en mode chat*

</div>

<div class="border-2 border-[#f26f5c] rounded-xl p-6">

### IA agentique ✨

<div class="font-mono text-sm bg-gray-100 rounded p-3 my-3">
  Objectif → Percevoir → Réfléchir<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Agir → Évaluer → …
</div>

- Poursuit un **objectif** de façon autonome
- Prend des **décisions** et **exécute** des actions
- Utilise des **outils** : email, CRM, API…
- *Exemple : agent qui prospecte en continu*

</div>

</div>

---
layout: default
---

# Anatomie d'un agent IA

<div class="grid grid-cols-4 gap-4 mt-8">

<div class="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
  <div class="text-3xl mb-2">🧠</div>
  <strong>Cerveau</strong>
  <div class="text-sm text-gray-600 mt-1">LLM (GPT-4, Claude…)<br/>Comprend, raisonne, génère</div>
</div>

<div class="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
  <div class="text-3xl mb-2">💾</div>
  <strong>Mémoire</strong>
  <div class="text-sm text-gray-600 mt-1">Historique client<br/>Contexte, règles métier</div>
</div>

<div class="text-center p-4 bg-green-50 rounded-xl border border-green-200">
  <div class="text-3xl mb-2">🔧</div>
  <strong>Outils</strong>
  <div class="text-sm text-gray-600 mt-1">Email, CRM, web<br/>APIs produit, agenda</div>
</div>

<div class="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
  <div class="text-3xl mb-2">🎯</div>
  <strong>Objectif</strong>
  <div class="text-sm text-gray-600 mt-1">La mission donnée<br/>par l'équipe commerciale</div>
</div>

</div>

<div class="mt-6 p-4 bg-gray-50 rounded-xl text-center text-sm">
  L'<strong>orchestrateur</strong> (ex: LangGraph, n8n) décide quand utiliser quel outil
  — les <strong>guardrails</strong> définissent les limites d'autorisation
</div>

---
layout: section
---

# Les 4 super-pouvoirs d'un agent commercial

---
layout: default
---

# ① Prospection autonome

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

L'agent **surveille et qualifie** en continu :

- Signaux d'achat sur LinkedIn / news sectorielles
- Visites répétées sur le site web
- Ouvertures d'emails, comportement en ligne

Il **rédige et envoie** des messages ultra-personnalisés à l'échelle de **milliers de prospects simultanément**.

<div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
  <strong>Exemple :</strong> Clay.com — enrichit et contacte automatiquement des listes de prospects avec des messages personnalisés générés par LLM
</div>

</div>
<div class="flex flex-col items-center justify-center text-center gap-3">
  <div class="text-6xl">🎯</div>
  <div class="text-4xl font-bold text-[#f26f5c]">×1000</div>
  <div class="text-gray-500">prospects traités en parallèle</div>
</div>
</div>

---
layout: default
---

# ② Négociation et personnalisation

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

L'agent **adapte l'offre en temps réel** selon :

- Le profil et l'historique du client
- Le contexte de la conversation
- Les règles de pricing définies par l'équipe

Il **gère les objections** courantes 24/7 et **escalade vers un humain** pour les cas complexes.

<div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
  <strong>Exemple :</strong> Salesforce Einstein — adapte les arguments de vente selon le profil du prospect en temps réel dans le CRM
</div>

</div>
<div class="flex flex-col items-center justify-center text-center gap-3">
  <div class="text-6xl">🤝</div>
  <div class="text-4xl font-bold text-[#f26f5c]">24/7</div>
  <div class="text-gray-500">disponible, multilingue, sans fatigue</div>
</div>
</div>

---
layout: default
---

# ③ Suivi et relance intelligente

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

L'agent **détecte le bon moment** pour intervenir :

- Retour sur le site après une période de silence
- Ouverture d'un email de proposition
- Expiration d'un devis sans réponse

Il rédige des **follow-ups contextualisés** (pas des templates génériques) et met à jour le **CRM automatiquement**.

<div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
  <strong>Exemple :</strong> HubSpot AI Sequences — relances adaptées au comportement du prospect en temps réel
</div>

</div>
<div class="flex flex-col items-center justify-center text-center gap-3">
  <div class="text-6xl">⏰</div>
  <div class="text-4xl font-bold text-[#f26f5c]">0 oubli</div>
  <div class="text-gray-500">chaque lead est suivi, sans exception</div>
</div>
</div>

---
layout: default
---

# ④ Analyse et recommandations

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

L'agent **analyse le pipeline** en continu :

- Identifie les opportunités d'**upsell** et **cross-sell**
- Prédit le **churn** avant qu'il se produise
- **Priorise** automatiquement les deals urgents
- Génère des **rapports** et alertes pour les managers

<div class="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
  <strong>Exemple :</strong> Gong.io — analyse les appels commerciaux et recommande les prochaines actions
</div>

</div>
<div class="flex flex-col items-center justify-center text-center gap-3">
  <div class="text-6xl">📊</div>
  <div class="text-4xl font-bold text-[#f26f5c]">Prédictif</div>
  <div class="text-gray-500">anticipe, priorise, recommande</div>
</div>
</div>

---
layout: section
---

# Comment ça marche concrètement ?

---
layout: default
---

# Les outils d'un agent commercial

| Catégorie | Outils | Ce que l'agent peut faire |
|-----------|--------|--------------------------|
| 📧 Communication | Gmail, Outlook, SMS | Envoyer, lire, planifier des messages |
| 📊 CRM | Salesforce, HubSpot, Pipedrive | Lire/créer/mettre à jour leads & deals |
| 🔍 Intelligence | LinkedIn, news, web | Enrichir les profils, détecter des signaux |
| 📅 Planning | Google Calendar, Calendly | Proposer et réserver des créneaux |
| 📄 Documents | Drive, Notion, PDF | Générer des propositions commerciales |
| 💰 Pricing | ERP, catalogue produits | Calculer et proposer des offres |

<div class="mt-4 p-3 bg-[#123744] text-white rounded-lg text-sm text-center">
  Un agent commercial moderne peut combiner <strong>6 à 12 outils</strong> différents dans un même workflow autonome
</div>

---
layout: section
---

# Opportunités & points de vigilance

---
layout: default
---

# Ce que les agents changent vraiment

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

### ✅ Opportunités

<v-clicks>

- **Scalabilité** : 1 agent = 1000 prospects en parallèle
- **Disponibilité** : 24/7, multilingue, sans vacances
- **Cohérence** : jamais de mauvais jour, jamais d'oubli
- **Vitesse** : réponse en secondes, pas en heures
- **Data** : chaque interaction mesurée et apprise
- **Focus humain** : les commerciaux se concentrent sur la relation complexe

</v-clicks>

</div>

<div>

### ⚠️ Points de vigilance

<v-clicks>

- **Transparence** : le prospect sait-il qu'il parle à un agent ?
- **Qualité** : un mauvais agent dégrade l'image de marque
- **RGPD** : accès aux données personnelles à encadrer
- **Dépendance** : résilience si l'agent est indisponible
- **ROI** : mesurer sur des indicateurs précis et concrets
- **Relation** : certaines interactions restent nécessairement humaines

</v-clicks>

</div>

</div>

---
layout: default
---

# Quand garder l'humain dans la boucle ?

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="border-2 border-green-400 rounded-xl p-5">

### 🤖 L'agent gère seul

- Prospection initiale & qualification
- Relances automatiques (faible montant)
- Réponses aux FAQs et objections courantes
- Mise à jour du CRM en temps réel
- Reporting et alertes managers

</div>

<div class="border-2 border-orange-400 rounded-xl p-5">

### 👤 L'humain prend la main

- Deals stratégiques à fort enjeu
- Situations conflictuelles ou sensibles
- Négociations complexes (conditions spéciales)
- Relation client de long terme
- Décisions exceptionnelles (geste commercial)

</div>

</div>

<div class="mt-4 text-center text-gray-500 text-sm p-3 bg-gray-50 rounded-lg">
  La règle d'or : automatiser ce qui est <strong>répétitif et prévisible</strong>,
  garder l'humain pour ce qui est <strong>complexe et relationnel</strong>
</div>

---
layout: default
---

# 3 choses à retenir

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="text-center p-6 bg-[#123744] text-white rounded-xl">

### 1️⃣

**Un agent = LLM + mémoire + outils + objectif**

Pas de la magie — une architecture structurée avec des règles métier définies par votre équipe

</div>

<div class="text-center p-6 bg-[#f26f5c] text-white rounded-xl">

### 2️⃣

**4 super-pouvoirs**

Prospection · Personnalisation · Suivi · Analyse

À l'échelle, 24/7, sans fatigue

</div>

<div class="text-center p-6 bg-[#123744] text-white rounded-xl">

### 3️⃣

**Commencer petit**

Identifier 1 cas d'usage répétitif → tester sur un segment limité → mesurer → itérer

</div>

</div>

---
layout: cover
background: <https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920>
---

# Questions ?

<div class="text-xl mt-4 text-gray-200">
  Commerce Agentique — L'IA au service de la vente
</div>

<div class="mt-8 flex gap-4 justify-center text-sm text-gray-400">
  <span>Clay.com</span>
  <span>·</span>
  <span>Salesforce Einstein</span>
  <span>·</span>
  <span>HubSpot AI</span>
  <span>·</span>
  <span>Gong.io</span>
  <span>·</span>
  <span>LangGraph</span>
</div>
