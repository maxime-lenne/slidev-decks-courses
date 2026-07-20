---
layout: section-liquid
---

## RAG no-code

<div class="text-lg opacity-70 mt-4">Chatter avec vos propres documents — sans coder</div>

---
layout: default
---

### Le problème : l'IA ne connaît pas VOS documents

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Sans RAG

Un LLM ne connaît que ses **données d'entraînement** (figées, publiques).

- ❌ Ne connaît pas vos procédures internes
- ❌ Ne connaît pas votre catalogue produit
- ❌ Ne connaît pas vos derniers contrats
- ❌ **Invente** quand il ne sait pas

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Avec RAG

**RAG** = *Retrieval-Augmented Generation* : on **retrouve** les bons extraits de vos documents, puis l'IA **répond en s'appuyant dessus**.

- ✅ Réponses ancrées sur **vos** contenus
- ✅ Cite ses **sources**
- ✅ Reste à jour (on met à jour les docs)
- ✅ Moins d'hallucinations

</div>

</div>

<div class="text-center text-xs opacity-60 mt-6">
La bonne nouvelle : en 2026, faire du RAG ne demande <strong>aucun code</strong>.
</div>

<!--
- RAG expliqué simplement : "l'IA lit d'abord vos docs, puis répond avec"
- Analogie : un examen "à livre ouvert" plutôt que "de mémoire"
- Le grounding de Copilot (section précédente) EST une forme de RAG géré pour vous
-->

---
layout: default
---

### Comment ça marche (en 3 étapes)

<br>

<div class="grid grid-cols-2 gap-8 mt-2 text-sm">

<div>

```mermaid {scale: 0.55}
graph TB
    Q[Votre question] --> R[1 . Recherche<br/>dans vos documents]
    D[(Vos documents<br/>PDF, Word, wiki...)] --> R
    R --> C[2 . Extraits pertinents<br/>ajoutés au prompt]
    C --> G[3 . L'IA répond<br/>en citant les sources]
```

</div>

<div>

#### Ce que vous n'avez PAS à faire

- 🚫 Écrire du code
- 🚫 Gérer une « base vectorielle »
- 🚫 Configurer un serveur

#### Ce que vous faites

- 📎 **Déposer** vos documents
- ✍️ **Décrire** le rôle de l'assistant
- ✅ **Tester** et ajuster

<div class="text-xs opacity-70 mt-3">L'outil gère l'indexation et la recherche pour vous.</div>

</div>

</div>

<!--
- Ne pas entrer dans embeddings / chunking : hors scope pour des AI Users
- Le mot "base vectorielle" peut être cité une fois, mais on rassure : "c'est géré pour vous"
- Insister sur les 3 gestes : déposer, décrire, tester
-->

---
layout: default
---

### Les 3 façons de faire, du plus simple au plus riche

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border border-[#475569]/30 rounded-lg p-4">

<div class="text-2xl mb-1">1️⃣</div>

#### Fichier joint

Glisser un PDF/Word dans **ChatGPT** ou **Copilot** et poser ses questions.

<div class="text-xs opacity-70 mt-2">✅ Immédiat · ponctuel<br/>⚠️ Limité à la conversation</div>

</div>

<div class="border border-[#457b9d]/40 rounded-lg p-4 bg-[#457b9d]/10">

<div class="text-2xl mb-1">2️⃣</div>

#### GPT personnalisé

Un **GPT** avec vos documents en « connaissances », réutilisable et partageable.

<div class="text-xs opacity-70 mt-2">✅ Persistant · partageable<br/>⚠️ Vérifier le niveau de confidentialité</div>

</div>

<div class="border border-[#10b981]/40 rounded-lg p-4 bg-[#10b981]/10">

<div class="text-2xl mb-1">3️⃣</div>

#### Agent d'entreprise

**Copilot Studio** / **Copilot agents** ancrés sur SharePoint, Teams, vos bases.

<div class="text-xs opacity-70 mt-2">✅ Sécurisé · à l'échelle<br/>→ section suivante</div>

</div>

</div>

<div class="text-center text-sm mt-6 opacity-70">
Pour un besoin perso & ponctuel : <strong>fichier joint</strong>. Pour toute l'équipe & sur données sensibles : <strong>agent d'entreprise</strong>.
</div>

<!--
- Niveau 1 = démo live en 30 secondes (glisser un PDF)
- Niveau 2 = "assistant onboarding RH", "assistant catalogue produit" : cas parlants
- Niveau 3 = transition naturelle vers la section agents no-code
- Rappel confidentialité : ne pas mettre de doc sensible dans un GPT grand public
-->

---
layout: default
---

### Exemples d'assistants « sur vos documents »

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

#### 🧑‍💼 Support interne

- Assistant **RH** : congés, notes de frais, procédures
- Assistant **onboarding** : tout savoir la 1ʳᵉ semaine
- Assistant **IT** : « comment réinitialiser mon VPN ? »

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### 📣 Métier & clients

- Assistant **catalogue** : specs & prix produits
- Assistant **avant-vente** : réponses types, cas clients
- Assistant **conformité** : FAQ sur les politiques

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">
Point commun : un corpus de documents + une question en langage naturel = une réponse <strong>sourcée</strong>.
</div>

<!--
- Faire émerger de la salle 2-3 cas concrets à eux
- Toujours revenir sur "sourcée" : l'assistant doit pouvoir dire d'où vient l'info
- Ces cas se construisent en no-code dans la section suivante (Copilot Studio)
-->
