---
layout: section-liquid
---

# Module 1
## Pourquoi l'observability ?

<div class="text-sm opacity-60 mt-4">45 min · Fondamentaux · J1 matin</div>

---
layout: default
---

## Trois mots à poser

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="font-bold mb-2 text-[#457b9d]">Monitoring</div>
<p class="opacity-85">Collecter et visualiser des métriques connues à l'avance pour répondre à des questions <strong>connues</strong>.</p>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="font-bold mb-2 text-[#10b981]">Observability</div>
<p class="opacity-85">Capacité à comprendre l'état interne d'un système à partir de ses sorties externes, <strong>y compris pour des questions qu'on n'avait pas anticipées</strong>.</p>
</div>

<div class="border-l-4 border-[#e63946] pl-4">
<div class="font-bold mb-2 text-[#e63946]">APM</div>
<p class="opacity-85">Application Performance Monitoring — sous-catégorie centrée sur la performance applicative (latence, erreurs, dépendances). Souvent associé au tracing distribué.</p>
</div>

</div>

<!--
- Poser ces 3 définitions au tableau dès le début, on y revient toute la formation
- Insister : observability n'est PAS un super-monitoring, c'est un changement de question
- APM = sous-ensemble qu'on traitera spécifiquement en M6
-->

---
hideInToc: true
layout: fact
---

# 1960

<div class="text-xl opacity-70 mt-4">Le terme <strong>observability</strong> a été formalisé par<br/><strong>Rudolf Kalman</strong> en théorie du contrôle.</div>

<div class="text-sm opacity-50 mt-6">« Un système est observable si on peut reconstituer entièrement son état interne à partir de ses sorties externes. »</div>

<!--
- Ancrage culturel : le terme n'est pas du marketing observability vendor
- Référence : théorie de l'automatique
- Permet d'introduire le sérieux du sujet
-->

---
layout: two-cols-header
---

### Observability vs Monitoring — Charity Majors

::left::

#### Monitoring

<div class="text-sm opacity-85 mt-4">

- Réponses à des **questions connues**
- "Known unknowns"
- Seuils prédéfinis, alertes statiques
- Dashboards figés
- *« Tout est vert »*

</div>

::right::

#### Observability

<div class="text-sm opacity-85 mt-4">

- Réponses à des **questions imprévues**
- "Unknown unknowns"
- Exploration ad hoc
- High-cardinality data
- *« Pourquoi cette requête précise est lente ? »*

</div>

<!--
- Citation : Charity Majors, Honeycomb co-founder
- Known unknowns : on sait quoi mesurer
- Unknown unknowns : on découvre des modes de panne nouveaux
- Le passage de l'un à l'autre = changement de stack ET de culture
-->

---
hideInToc: true
layout: center
---

# « Le monitoring vous dit qu'il y a un problème.<br/>L'observability vous permet de comprendre <span class="text-[#457b9d]">pourquoi</span> — même si vous ne l'aviez pas prévu. »

<div class="text-sm opacity-50 mt-8">—</div>

---
hideInToc: true
layout: two-cols
---

# 🌡️ Thermomètre

<div class="text-sm opacity-85 mt-4">

- Une seule mesure
- Détecte la fièvre
- = **Monitoring**

</div>

<div class="text-xs opacity-60 mt-6">Détecte qu'il y a un problème.</div>

::right::

# 🔬 Scanner / IRM

<div class="text-sm opacity-85 mt-4">

- Plusieurs dimensions
- Corrélation, exploration
- = **Observability**

</div>

<div class="text-xs opacity-60 mt-6">Explique pourquoi.</div>

<!--
- Analogie médicale
- Personne ne soignerait un patient avec seulement un thermomètre
- Pourtant beaucoup d'apps tournent avec seulement du monitoring infra
-->

---
layout: default
---

## Scénario vendredi 18h

<div class="grid grid-cols-2 gap-6 mt-6 text-sm">

<div class="border-l-4 border-[#e63946] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Monitoring seul</div>
<div class="font-bold text-3xl mb-2 text-[#e63946]">1h15</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>Alertes confuses, plusieurs services</li>
<li>SSH sur les machines</li>
<li>grep dans 4 fichiers de logs</li>
<li>Pas de corrélation</li>
<li>Diagnostic par épuisement</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Observability</div>
<div class="font-bold text-3xl mb-2 text-[#10b981]">12 min</div>
<ul class="list-none p-0 space-y-1 opacity-80">
<li>Alerte symptôme-first (taux d'erreur)</li>
<li>Dashboard drill-down</li>
<li>Exemplar → trace → span lent</li>
<li>Logs filtrés par `trace_id`</li>
<li>Cause racine identifiée</li>
</ul>
</div>

</div>

<!--
- Concret et marquant — c'est l'écart entre une astreinte cauchemar et une astreinte propre
- Le 12 min n'est pas optimiste : c'est ce que permet une stack mature
- Référence : modèle SR
-->

---
layout: default
---

## Les 3 piliers

```mermaid {scale: 0.95}
graph LR
    A[Application IA] --> L[Logs<br/>événements horodatés<br/>volumineux, riches]
    A --> M[Métriques<br/>valeurs agrégées<br/>peu volumineuses]
    A --> T[Traces<br/>parcours d'une requête<br/>multi-services]
    L --> Q[Diagnostic<br/>« pourquoi ? »]
    M --> Q
    T --> Q
    style L fill:#457b9d,color:#fff
    style M fill:#10b981,color:#fff
    style T fill:#e63946,color:#fff
```

<div class="text-center text-xs opacity-50 mt-2">Les 3 signaux complémentaires — chacun répond à une question différente.</div>

<!--
- Logs = "raconte-moi ce qui s'est passé"
- Métriques = "quelle est la tendance ?"
- Traces = "comment cette requête s'est-elle propagée ?"
- Aujourd'hui on parle aussi de Profiles (4e signal OTel) — on n'y va pas dans cette formation
-->

---
layout: default
---

## Modèles mentaux — quoi mesurer ?

<div class="text-sm leading-tight">

| Modèle | Auteur | Signaux | Quand l'utiliser |
|--------|--------|---------|------------------|
| **Golden Signals** | Google SRE (2016) | Latence · Trafic · Erreurs · Saturation | Vue globale service utilisateur |
| **RED** | Tom Wilkie · Grafana Labs | **R**ate · **E**rrors · **D**uration | API / microservices |
| **USE** | Brendan Gregg · Netflix (2013) | **U**tilization · **S**aturation · **E**rrors | Ressources infra (CPU, RAM, disque, réseau) |

</div>

<div class="text-sm mt-6 opacity-85">

- **RED ≈ sous-ensemble des Golden Signals** (retire Saturation, couverte par USE côté infra)
- **Règle de combinaison** : RED **pour les services** + USE **pour l'infrastructure**

</div>

<!--
- À mémoriser : on revient là-dessus en M3 et M5
- DB / Kafka / RabbitMQ = composant hybride → RED + USE conjoints
-->

---
layout: default
---

## Quel modèle mental utiliser ?

```mermaid {scale: 0.85}
graph TD
    Q[Que veux-tu mesurer ?] --> S{Service orienté<br/>requête ?}
    S -- Oui --> R[RED<br/>Rate · Errors · Duration]
    S -- Non --> I{Ressource<br/>système ?}
    I -- Oui --> U[USE<br/>Utilization · Saturation · Errors]
    I -- Non --> H{Composant<br/>hybride ?<br/>DB, broker...}
    H -- Oui --> B[RED + USE]
    H -- Non --> G[Golden Signals<br/>vue service critique]
    style R fill:#457b9d,color:#fff
    style U fill:#10b981,color:#fff
    style B fill:#e63946,color:#fff
    style G fill:#f59e0b,color:#fff
```

<!--
- Saturation = signal le plus prédictif : "vous alerte AVANT que la latence n'explose"
- Pourquoi p99 et pas la moyenne ? Si 99 requêtes prennent 10 ms et une prend 10 s, la moyenne = 109 ms, qui ne décrit l'expérience de personne
-->

---
layout: default
---

## Spécificité IA — au-delà de l'infra

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="font-bold mb-2 text-[#457b9d]">Métriques modèle</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>Latence inférence</li>
<li>Distribution prédictions</li>
<li>Score de confiance</li>
<li>Version active</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="font-bold mb-2 text-[#10b981]">Métriques données</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>Drift d'entrée</li>
<li>Valeurs nulles</li>
<li>Valeurs hors distribution</li>
<li>Qualité des features</li>
</ul>
</div>

<div class="border-l-4 border-[#e63946] pl-4">
<div class="font-bold mb-2 text-[#e63946]">Métriques métier</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>Taux de conversion</li>
<li>NPS / feedback</li>
<li>Coût € par requête</li>
<li>Adoption produit</li>
</ul>
</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">Le monitoring infra ne suffit pas — il faut <strong>3 nouvelles familles</strong>.</div>

<!--
- C'est LE message central de la formation
- Pour LLM, ajoute aussi : tokens, hallucinations détectées, scores de modération
- On approfondit en M8 (ML) et M9 (LLM)
-->

---
layout: default
---

## Niveaux de maturité observability

<div class="text-sm leading-tight mt-4">

| Niveau | Stack | Pratiques |
|--------|-------|-----------|
| **1 · Réactif** | Logs en fichier + métriques infra | On regarde quand ça casse |
| **2 · Structuré** | RED/USE + alerting | Dashboards, alertes seuils |
| **3 · Proactif** | SLO + traces + corrélation | Burn rate, exemplars, drill-down |
| **4 · Gouverné** | OTel + multi-tenant + budgets cardinalité | Politiques rétention, RACI, FinOps |

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">Cible de la formation : passer du niveau 1 au niveau 3 en 3 jours.</div>

<!--
- Quasi personne ne démarre niveau 4 — c'est un horizon
- L'IA force à passer au moins niveau 3 car les pannes silencieuses ne se voient pas au niveau 1-2
-->

---
layout: center
---

## 🎯 Activité · 15 min

<div class="text-xl mt-6 max-w-3xl mx-auto">
Par groupe de 3-4 : pour notre API de classification de spams<br/>
(<code>POST /predict</code> → "spam" / "ham" + confidence),
</div>

<div class="text-2xl mt-8 text-[#457b9d] font-bold">Quelles métriques RED + ML proposez-vous ?</div>

<div class="text-sm mt-8 opacity-70">Restitution : 1 binôme au tableau, les autres complètent.</div>

<!--
- Insister sur la rigueur : nom de métrique + type + labels (sans cardinalité explosive)
- Bonne réponse : RED standard + ml_predictions_total{outcome,model_version} + ml_confidence_histogram + ml_active_model_version{version}
- Permet de débriefer cardinalité (un user_id en label = piège)
-->

---
hideInToc: true
layout: center
---

# ☕ Pause · 10 min

<div class="text-sm opacity-60 mt-6">Prochain module : <strong>Logging structuré</strong> (1h30)</div>
