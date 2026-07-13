---
layout: section-liquid
---

## Gouvernance & sécurité

<div class="text-lg opacity-70 mt-4">Confidentialité · RGPD · hallucinations · shadow AI · usage responsable</div>

---
layout: statement
---

### La règle numéro un

<div class="text-3xl mt-6 opacity-90">Ce que vous collez dans un chat peut <span class="text-[#e63946] font-bold">sortir de l'entreprise</span>.</div>

<div class="text-base mt-8 opacity-70 max-w-3xl mx-auto">
Sur un outil <strong>grand public gratuit</strong>, vos saisies peuvent être conservées, relues, voire utilisées pour <strong>entraîner</strong> le modèle.
</div>

<div class="text-sm opacity-50 mt-8">→ Avant de coller quelque chose : « est-ce que j'enverrais ça par mail à un inconnu ? »</div>

<!--
- Ouvrir fort : la confidentialité est LE risque n°1 pour un usager métier
- Le test mental "mail à un inconnu" est simple et mémorable
- Nuance : les offres Entreprise (Copilot M365, ChatGPT Enterprise) n'entraînent pas sur vos données
-->

---
layout: default
---

### Confidentialité : ce qu'on ne colle jamais (sur du grand public)

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### 🚫 À ne pas coller

- Données **personnelles** (clients, salariés) → RGPD
- **Secrets** : mots de passe, tokens, accès
- Contrats, données **financières**, juridiques
- Code ou **données propriétaires** sensibles
- Tout ce qui est **sous NDA**

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### ✅ Bons réflexes

- Utiliser l'offre **Entreprise** validée par la DSI
- **Anonymiser** avant de coller (retirer noms, chiffres)
- Vérifier la **politique interne** IA
- En cas de doute : **ne pas coller**, demander

<div class="text-xs opacity-70 mt-3">La donnée qui ne sort pas est la plus sûre.</div>

</div>

</div>

<!--
- Adapter la liste "à ne pas coller" au secteur de l'audience
- Rappeler : anonymiser ≠ suffisant pour du très sensible → outil entreprise
- Renvoyer à la charte IA interne si elle existe (sinon, recommander d'en créer une)
-->

---
layout: default
---

### RGPD & données personnelles

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Les points de vigilance

- Une **donnée personnelle** (nom, email, dossier client) reste soumise au **RGPD**, même dans un chat
- **Finalité & consentement** : la personne a-t-elle accepté cet usage ?
- **Localisation** : où sont hébergées/traitées les données ?
- **Droit à l'oubli** : pouvez-vous faire supprimer ?

</div>

<div>

#### En pratique

- ✅ Privilégier les offres **hébergées UE / conformes**
- ✅ **Minimiser** : ne donner que le strict nécessaire
- ✅ **Pseudonymiser** quand c'est possible
- ✅ Documenter les usages IA (registre de traitement)

<div class="text-xs opacity-70 mt-3">En cas de doute juridique : DPO / service conformité.</div>

</div>

</div>

<!--
- Rester factuel et non-juridique : orienter vers le DPO pour les cas précis
- Message clé : "un chat n'efface pas le RGPD"
- Les offres Entreprise proposent souvent des garanties d'hébergement UE
-->

---
layout: default
---

### Hallucinations : l'IA se trompe avec aplomb

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#f59e0b] pl-4">

#### Le phénomène

L'IA **prédit du texte plausible** — elle peut inventer :

- ❌ Des **chiffres** faux
- ❌ Des **citations / sources** inexistantes
- ❌ Des **faits** erronés énoncés avec assurance
- ❌ Des **références** juridiques fictives

<div class="text-xs opacity-70 mt-3">Le ton confiant ne garantit rien.</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### Comment s'en prémunir

- 🔎 **Vérifier** faits, chiffres, sources critiques
- 📎 Fournir la **matière** (RAG, fichiers) → réponses ancrées
- 🔗 Demander les **sources** et les contrôler
- 🧑 Garder l'**humain dans la boucle** sur les décisions
- 🎯 Croiser avec une **source de vérité**

</div>

</div>

<div class="text-center text-xs opacity-60 mt-6">
Plus l'enjeu est élevé (client, argent, légal), plus la <strong>relecture humaine</strong> est obligatoire.
</div>

<!--
- Exemple marquant : avocat sanctionné pour jurisprudences inventées par ChatGPT (2023)
- Le RAG (sections précédentes) réduit mais n'élimine pas les hallucinations
- Règle : l'IA propose, l'humain dispose — surtout sur les sujets à risque
-->

---
layout: default
---

### Shadow AI & usage responsable

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">

#### Le « Shadow AI »

Utiliser des outils IA **hors du cadre** validé par l'entreprise.

- Comptes **perso** pour des tâches pro
- Outils **non validés** par la DSI
- Données d'entreprise sur des services **inconnus**

<div class="text-xs opacity-70 mt-3">Souvent bien intentionné… mais risqué (fuite, conformité).</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4">

#### L'usage responsable

- 📋 Suivre la **charte IA** de l'entreprise
- 🛠️ Utiliser les outils **validés** (Copilot M365…)
- 🙋 **Signaler** un besoin plutôt que contourner
- 👁️ **Transparence** : dire quand un contenu est IA-assisté
- 🧠 Garder l'**esprit critique** sur chaque sortie

</div>

</div>

<div class="text-center text-sm mt-6 opacity-70">
L'objectif n'est pas d'interdire, mais d'utiliser l'IA <strong>dans un cadre sûr</strong>.
</div>

<!--
- Le Shadow AI naît souvent d'un manque d'outils officiels → plaider pour un cadre clair
- Transparence : mentionner l'usage IA (déontologie, confiance)
- Si l'entreprise n'a pas de charte IA : c'est un next-step naturel (voir wrap-up)
-->

---
layout: default
---

### Votre checklist avant d'envoyer un prompt

<br>

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Les 5 questions réflexes

1. 🔒 **Confidentiel ?** Puis-je coller ces données ici ?
2. 🏢 **Bon outil ?** Suis-je sur l'offre validée ?
3. 👤 **Données perso ?** RGPD respecté ?
4. 🔎 **Vérifiable ?** Comment je contrôle la réponse ?
5. 🧑 **Responsable ?** Je valide avant de diffuser.

</div>

<div class="flex flex-col justify-center">

<div class="bg-[#1d3557]/10 rounded-lg p-4">

<div class="text-base font-bold mb-2">La règle en une phrase</div>

<div class="text-sm opacity-80">L'IA est un <strong>copilote</strong> : elle accélère, vous décidez. Vous restez <strong>responsable</strong> de ce qui sort de vos mains.</div>

</div>

</div>

</div>

<!--
- Cette checklist = l'asset le plus utile de la section (à afficher / distribuer)
- Faire répéter les 5 questions à voix haute : ancrage mémoriel
- Transition vers le wrap-up : on récapitule et on passe à l'action
-->
