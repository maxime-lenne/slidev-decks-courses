---
layout: cover
background: https://images.unsplash.com/photo-1743090660977-babf07732432?w=1920
---

<div class="absolute inset-0 bg-gradient-to-br from-[#7f1d1d]/90 via-[#0f172a]/80 to-[#e63946]/70" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<div class="text-[#fbbf24] text-sm font-bold uppercase tracking-widest mb-4">🔥 Jour 3 · 90 min</div>

<h3 class="text-7xl font-black mb-6">
Game Day<br/><span class="text-[#fbbf24]">Vos systèmes sont attaqués</span>
</h3>

<div class="text-xl opacity-90 max-w-3xl">
3 incidents · 30 min par incident · diagnostic + mitigation<br/>
<span class="text-[#10b981] font-bold">Livrable : 1 post-mortem au moins</span>
</div>

</div>

---
layout: default
---

### Règles du Game Day

<div class="text-sm opacity-85 mt-6 space-y-2">

- 🎲 Le formateur exécute **3 scripts** sans prévenir sur votre API (ou instance partagée)
- ⏱️ Vous avez **30 min** par incident pour :
  1. **Diagnostiquer** (logs + dashboards + traces)
  2. Proposer une **mitigation**
  3. **Restaurer** le service
  4. Documenter **au fil de l'eau** (timeline)
- 🎙️ Discussion ouverte après chaque incident :<br/>
  *« qu'est-ce qui aurait pu rendre la détection plus rapide ? »*
- 📝 Livrable : **au moins 1 post-mortem complet** parmi les 3 incidents

</div>

---
layout: statement
---

### Incident <span class="text-[#fbbf24]">#1</span>

<div class="text-2xl opacity-85 mt-6">Quelque chose ne va pas.</div>
<div class="text-2xl opacity-85 mt-2">À vous de jouer.</div>

<div class="text-sm opacity-50 mt-8">⏱️ 30 min · diagnostic + mitigation</div>

<!--
- Script formateur : injecter time.sleep(random.uniform(0.5, 2)) dans /predict
- Symptôme attendu : alerte HighLatencyP95, p99 explose
- Le formateur reste discret, ne révèle rien
- Si un binôme est bloqué après 15 min, donner 1 indice ("regardez la latence par version de modèle")
-->

---
layout: default
---

### 🔍 Debrief · Incident #1

<div class="text-sm opacity-85 mt-6">

**Cause** : `time.sleep(random.uniform(0.5, 2))` injecté dans `/predict`.

</div>

<div class="text-sm mt-6 opacity-85">

**Symptôme attendu** :

- Alerte `HighLatencyP95` (warning) au bout de 5 min
- p99 monte à ~2 s, p95 à ~1.2 s
- Taux d'erreur **inchangé** (200 OK partout)

**Discussion** :

- Le RPS et le taux 5xx ne montrent rien : il faut **regarder la latence**
- Un dashboard sans p95/p99 n'aurait rien montré
- Le rollback du dernier déploiement = mitigation immédiate

</div>

---
layout: statement
---

### Incident <span class="text-[#fbbf24]">#2</span>

<div class="text-2xl opacity-85 mt-6">Encore un.</div>
<div class="text-2xl opacity-85 mt-2">Vos alertes vont parler.</div>

<div class="text-sm opacity-50 mt-8">⏱️ 30 min</div>

<!--
- Script : raise RuntimeError("oops") 1 fois sur 10 dans /predict
- Symptôme : alerte HighErrorRate (critical) au bout de 5 min, spike de logs ERROR
- Indice possible : "filtrez les logs par level=ERROR sur les 5 dernières minutes"
-->

---
layout: default
---

### 🔍 Debrief · Incident #2

<div class="text-sm opacity-85 mt-6">

**Cause** : `raise RuntimeError("oops")` 1 fois sur 10.

</div>

<div class="text-sm mt-6 opacity-85">

**Symptôme attendu** :

- Alerte `HighErrorRate` (critical) — 10 % > seuil 1 %
- Logs ERROR `RuntimeError: oops` corrélables via `request_id`
- Si tracing OTel actif : spans en `status=ERROR` visibles dans Tempo

**Discussion** :

- L'alerte est arrivée au bon niveau (critical) — réveil justifié
- L'inspection du stacktrace dans les logs (champ `error_type`) accélère le diagnostic
- Sans logs structurés : `grep RuntimeError` aurait peut-être marché... peut-être pas

</div>

---
layout: statement
---

### Incident <span class="text-[#fbbf24]">#3</span>

<div class="text-2xl opacity-85 mt-6">Le piège silencieux.</div>
<div class="text-2xl opacity-85 mt-2">Tout est vert.<br/>Vraiment ?</div>

<div class="text-sm opacity-50 mt-8">⏱️ 30 min</div>

<!--
- Script : remplacer le modèle pour qu'il prédise 95 % de "spam"
- Symptôme : distribution des prédictions déséquilibrée → alerte PredictionDistributionShift (warning)
- HTTP status, latence, taux d'erreur = TOUS verts
- Indice : "Quels signaux affichent un comportement inhabituel ?"
-->

---
layout: default
---

### 🔍 Debrief · Incident #3

<div class="text-sm opacity-85 mt-6">

**Cause** : modèle modifié pour prédire 95 % de `"spam"`.

</div>

<div class="text-sm mt-6 opacity-85">

**Symptôme attendu** :

- Tous les indicateurs **HTTP sont verts** : 200 OK, latence normale, RPS normal
- L'**alerte drift** (M8) se déclenche si elle est branchée
- Sinon : visible uniquement dans le **dashboard distribution prédictions**

**Discussion** :

- C'est **l'accroche du M1** (« tout est vert, mais les recos sont nulles »)
- Le monitoring infra **seul** = silence radio
- Le drift de prédiction (M8) **détecte** ce type de panne silencieuse
- Pour Langfuse : un score de feedback dégradé peut aussi le révéler

</div>

---
layout: center
---

### 📝 Livrable post-mortem

<div class="text-xl mt-6 max-w-3xl mx-auto">
Choisissez **1 incident** parmi les 3 et rédigez un<br/>
**post-mortem blameless** complet (template M7).
</div>

<div class="text-sm mt-6 max-w-2xl mx-auto opacity-85 text-left">

À inclure :

1. Résumé en 3 lignes
2. Timeline UTC (s'aider du log Slack/Discord du Game Day)
3. Détection (par alerte ? par dashboard ? par utilisateur ?)
4. Root cause technique **sans blâmer**
5. Au moins **3 action items** avec owners et dates (parmi les 5 catégories)

</div>

<div class="text-xs opacity-60 mt-8">Restitution croisée demain matin : 1 binôme présente, les autres commentent.</div>
