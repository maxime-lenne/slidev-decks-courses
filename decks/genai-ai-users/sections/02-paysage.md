---
layout: section-liquid
---

## Le paysage GenAI métier

<div class="text-lg opacity-70 mt-4">ChatGPT · Microsoft Copilot · quel outil pour quel besoin</div>

---
layout: default
class: implementation copilot
---

### Le paysage IA Microsoft, du chat perso au code

<div class="text-sm opacity-70 -mt-2 mb-5">Une même famille d'outils — du grand public au développeur. Repérez où vous vous arrêtez.</div>

<div class="grid grid-cols-5 gap-3 text-xs">

<div class="border border-[#0078d4]/40 bg-[#0078d4]/5 rounded-lg p-3">
<div class="text-xl">💬</div>
<div class="font-bold text-[#0078d4] mt-1">Copilot Chat</div>
<div class="opacity-80 mt-1">Chat grand public (copilot.microsoft.com). Usage <strong>personnel</strong>, gratuit.</div>
<div class="opacity-50 italic mt-2">Déjà connu</div>
</div>

<div class="border border-[#0078d4]/40 bg-[#0078d4]/5 rounded-lg p-3">
<div class="text-xl">📎</div>
<div class="font-bold text-[#0078d4] mt-1">Copilot 365</div>
<div class="opacity-80 mt-1">L'IA dans Word, Excel, Outlook, Teams — ancrée sur vos <strong>données M365</strong>.</div>
<div class="opacity-50 italic mt-2">Déjà connu</div>
</div>

<div class="border border-[#0078d4]/40 bg-[#0078d4]/5 rounded-lg p-3">
<div class="text-xl">🧩</div>
<div class="font-bold text-[#0078d4] mt-1">Agent Builder</div>
<div class="opacity-80 mt-1">Un agent simple créé <strong>en quelques clics</strong> dans Copilot / SharePoint.</div>
<div class="opacity-50 italic mt-2">No-code</div>
</div>

<div class="border border-[#0078d4]/40 bg-[#0078d4]/5 rounded-lg p-3">
<div class="text-xl">🛠️</div>
<div class="font-bold text-[#0078d4] mt-1">Copilot Studio</div>
<div class="opacity-80 mt-1">Agents plus riches. Pour vous : la partie <strong>AI Builder</strong>, sans code.</div>
<div class="opacity-50 italic mt-2">No-code</div>
</div>

<div class="border border-[#e63946]/40 bg-[#e63946]/5 rounded-lg p-3">
<div class="text-xl">⚙️</div>
<div class="font-bold text-[#e63946] mt-1">Azure AI Foundry</div>
<div class="opacity-80 mt-1">Plateforme <strong>pro-code</strong> : modèles, orchestration, déploiement.</div>
<div class="opacity-50 italic mt-2">Pour les devs</div>
</div>

</div>

<div class="grid grid-cols-5 gap-3 mt-3 text-xs font-bold">
<div class="col-span-4 text-center text-[#10b981] border-t-2 border-[#10b981]/50 pt-2">✅ Sans écrire de code — votre terrain d'AI User</div>
<div class="text-center text-[#e63946] border-t-2 border-[#e63946]/50 pt-2">⚙️ Zone code — devs</div>
</div>

<!--
- Fil conducteur : c'est UNE gamme continue, pas des produits séparés — on monte en puissance et en technicité de gauche à droite
- Chat Copilot & Copilot 365 : normalement déjà connus de la salle — passer vite, demander qui les utilise
- Agent Builder : le premier pas "maker" no-code, directement dans l'écosystème Copilot
- Copilot Studio : on y reste côté AI Builder (glisser-déposer, no-code) — le low-code/Power Fx est pour les makers avancés
- Azure AI Foundry : mentionné pour la culture générale — brique dev/pro-code, hors périmètre AI Users
- Message : un AI User peut aller loin (jusqu'à créer des agents) sans jamais coder
-->

---
layout: default
class: implementation copilot
---

### <span class="text-[#0078d4]">Microsoft</span> — l'IA là où vous travaillez déjà

<br>

<div class="grid grid-cols-2 gap-8 mt-2 text-sm">

<div>

#### Ce que c'est

L'IA **intégrée à vos outils** de travail, ancrée sur **vos données**.

- **Copilot** dans Word, Excel, Outlook, Teams, PowerPoint
- **Copilot Chat** (web & Windows) — sécurisé entreprise
- **Copilot Studio** — créer des agents no-code
- Ancré sur vos **données M365** via Microsoft Graph
- Respecte vos **permissions** existantes

</div>

<div>

#### Le réflexe Microsoft

<div class="border-l-4 border-[#0078d4] pl-4">

« Je reste **dans mes outils**, l'IA connaît **mon contexte**. »

</div>

<div class="mt-4">

**Idéal pour** :

- Travailler sur vos **documents & mails** d'entreprise
- Rester dans le **flux** de travail (Word, Teams…)
- Les usages où la **confidentialité** entreprise compte

</div>

<div class="text-xs opacity-60 mt-4">Sous le capot, Copilot s'appuie en grande partie sur les modèles <strong>OpenAI</strong> — les deux mondes sont liés.</div>

</div>

</div>

<!--
- Copilot = "IA là où vous travaillez déjà" : pas un chat séparé, mais dans vos apps
- Grounding M365 (Graph) = ancrage sur vos vraies données + respect des droits → moins d'hallucinations, pas de fuite
- Insister sur la complémentarité avec OpenAI (slide suivante) plutôt que l'opposition
-->

---
layout: default
class: implementation openai
disabled: true
---

### <span class="text-[#10a37f]">OpenAI</span> — le chat ouvert de référence

<br>

<div class="grid grid-cols-2 gap-8 mt-2 text-sm">

<div>

#### Ce que c'est

Le chat grand public le plus connu — **ouvert**, créatif, polyvalent.

- **ChatGPT** (web, mobile, desktop)
- Modèles **GPT** — texte, image, voix, vision
- **GPTs** personnalisés + **GPT Store**
- **Canvas** — rédaction & mini-code assisté

</div>

<div>

#### Le réflexe ChatGPT

<div class="border-l-4 border-[#10a37f] pl-4">

« J'ouvre un chat pour **réfléchir** / **produire**. »

</div>

<div class="mt-4">

**Idéal pour** :

- **Rédaction libre**, brainstorming, exploration
- Contenu **hors données d'entreprise**
- **Prototyper** un GPT ou un mini-outil
- Travailler sur un texte **que vous collez**

</div>

<div class="text-xs opacity-60 mt-4">Pour des <strong>données sensibles</strong>, privilégiez <strong>ChatGPT Enterprise</strong> ou Copilot — jamais le gratuit.</div>

</div>

</div>

<!--
- ChatGPT = chat ouvert : idéal quand les données ne sont PAS confidentielles
- GPTs + Store : on y reviendra (section assistants) — prototypage no-code d'assistants
- Rappel gouvernance : données d'entreprise → offre entreprise, pas de gratuit
-->

---
layout: default
---

### Gratuit, Pro, Entreprise : ça change quoi ?

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border border-[#475569]/30 rounded-lg p-4">

#### 🆓 Gratuit

- ChatGPT (modèle standard)
- Copilot Chat (web)

<div class="text-xs opacity-70 mt-3">Découverte & usage perso. **Vos données peuvent servir à l'entraînement** — prudence.</div>

</div>

<div class="border border-[#457b9d]/40 rounded-lg p-4 bg-[#457b9d]/10">

#### 💳 Pro / Plus

- Modèles plus puissants
- GPTs, Canvas, vision, voix
- Limites d'usage élargies

<div class="text-xs opacity-70 mt-3">~20-30 €/mois. Bon pour un usage intensif individuel.</div>

</div>

<div class="border border-[#10b981]/40 rounded-lg p-4 bg-[#10b981]/10">

#### 🏢 Entreprise

- **Copilot M365** / **ChatGPT Enterprise**
- Données **non entraînées**, isolées
- Admin, conformité, **grounding** sur vos docs

<div class="text-xs opacity-70 mt-3">Le seul cadre sûr pour les **données sensibles** de l'entreprise.</div>

</div>

</div>

<div class="text-center text-sm mt-6 opacity-70">
Règle simple : <strong>données d'entreprise → licence entreprise</strong>. On y revient en gouvernance.
</div>

<!--
- Le point critique pour un usager métier : quelle offre = quelles garanties sur mes données
- Gratuit ≠ mauvais, mais data d'entreprise sur du gratuit = risque de fuite/entraînement
- La DSI a souvent tranché : rappeler de vérifier la politique interne
-->

---
layout: default
---

### Quel outil pour quel besoin ?

<br>

<div class="text-sm">

| Besoin | Outil conseillé | Pourquoi |
|--------|-----------------|----------|
| ✍️ Rédiger un mail / post | **ChatGPT** ou **Copilot Outlook** | Rapide, dans le contexte |
| 📊 Analyser un fichier Excel | **Copilot Excel** | Ancré sur vos données |
| 📄 Résumer un long document | **ChatGPT** (fichier joint) | Grande fenêtre de contexte |
| 🎤 Préparer une réunion Teams | **Copilot Teams** | Notes & résumé automatiques |
| 🎨 Créer un visuel / slide | **Copilot PowerPoint** / GPT image | Génération intégrée |
| 🤖 Répondre sur vos procédures | **Agent no-code** (Copilot Studio / GPT) | RAG sur vos docs |

</div>

<div class="text-center text-xs opacity-60 mt-4">
Règle : si le besoin porte sur <strong>vos documents d'entreprise</strong>, privilégiez <strong>Copilot</strong> (ancré sur le tenant).
</div>

<!--
- Cette table = l'antisèche que les participants photographieront
- Insister : le "meilleur outil" dépend d'où sont vos données
- Ne pas être dogmatique : beaucoup utilisent ChatGPT + Copilot en complémentarité
-->
