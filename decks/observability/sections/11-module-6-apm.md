---
layout: section
---

# Module 6
## APM & tracing distribué

<div class="text-sm opacity-60 mt-4">30 min · J3 matin · Trace, span, sampling</div>

---
layout: default
---

## APM vs monitoring infra

<div class="text-sm opacity-85 mt-6">

Un **APM** ajoute par rapport à un monitoring infra :

</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4 opacity-85">
<ul class="list-none p-0 space-y-2">
<li>📊 **Vue applicative** par endpoint, par dépendance, par user</li>
<li>🌳 **Tracing distribué** (multi-services)</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4 opacity-85">
<ul class="list-none p-0 space-y-2">
<li>🔥 **Profiling** (où le CPU est consommé)</li>
<li>🚨 **Error tracking** (groupement d'exceptions)</li>
</ul>
</div>

</div>

<div class="text-xs opacity-60 mt-6">SaaS : Datadog APM, New Relic, Dynatrace. OSS : OpenTelemetry + Tempo / Jaeger.</div>

---
layout: default
---

## Vocabulaire

<div class="text-sm leading-tight mt-4">

| Terme | Définition |
|-------|------------|
| **Trace** | Représentation complète d'une requête de bout en bout |
| **Span** | Unité de travail (appel HTTP, requête DB, étape d'agent) |
| **Trace ID** | 128 bits hex — identique sur tous les spans d'une trace |
| **Span ID** | 64 bits hex — identifie un span précis |
| **Parent Span ID** | Lien vers le span englobant (forme un arbre) |
| **Context propagation** | Transmission de l'ID via headers (`traceparent`) |

</div>

---
layout: default
---

## Anatomie d'un span

<div class="text-sm opacity-85 mt-4">

8 champs principaux :

</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="opacity-85">

- `trace_id` · 128 bits
- `span_id` · 64 bits
- `parent_span_id` · ou root
- `name` · ex `db.query`

</div>

<div class="opacity-85">

- `start_time` + `duration`
- `status` · OK / ERROR / UNSET
- `kind` · CLIENT / SERVER / INTERNAL / PRODUCER / CONSUMER
- `attributes` · clés/valeurs

</div>

</div>

---
layout: default
---

## W3C Trace Context

<div class="text-sm opacity-85 mt-6">

Standard W3C (recommandation 23/11/2021). Header HTTP :

</div>

```text
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
             └─ version  └── trace-id (32 hex)        └─ parent-id (16 hex) └─ flags
```

<div class="text-sm mt-4 opacity-85">

- Header **portable** entre tous les SDK / vendors
- Compagnon `tracestate` pour les extensions vendor-specific
- **Baggage** (W3C Baggage) : contexte applicatif (tenant, feature flag) — limiter strictement (PII, volume)

</div>

---
layout: default
---

## Exemple · arbre de spans

```text
trace_id: 4bf92f3577b34da6a3ce929d0e0e4736

API Gateway     POST /checkout       4200ms  ❌ ERROR
├─ Svc Commande  createOrder           320ms  ✅
├─ Svc Paiement  processPayment       3600ms  ❌ ERROR
│  ├─ Paiement   validateCard           45ms  ✅
│  └─ Paiement   callBankAPI          3500ms  ❌ ERROR  ← 🎯 goulot
└─ Svc Stock     decrementStock         80ms  ✅
```

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">

L'arbre <strong>localise instantanément</strong> le goulot.<br/>
Sans tracing : 1h de grep dans 4 fichiers de logs.

</div>

---
layout: default
---

## Sampling — head vs tail

<div class="grid grid-cols-2 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">
<div class="font-bold mb-2 text-[#457b9d]">Head-based</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>Décision à l'entrée du système</li>
<li>Ratio fixe (ex : 10 %)</li>
<li>✅ Simple, peu coûteux</li>
<li>⛔ Rate les erreurs rares</li>
</ul>
</div>

<div class="border-l-4 border-[#10b981] pl-4">
<div class="font-bold mb-2 text-[#10b981]">Tail-based</div>
<ul class="list-none p-0 space-y-1 opacity-85">
<li>Décision au Collector</li>
<li>Après reconstitution complète</li>
<li>✅ Garde **100 % des erreurs**</li>
<li>⛔ Bufferisation 30s-2min, mémoire</li>
</ul>
</div>

</div>

<div class="text-xs opacity-60 mt-4">Stratégie mixte recommandée : head 10 % en bordure + tail-sampling pour les erreurs/lent.</div>

---
layout: statement
---

## « Commencez avec un<br/><span class="text-[#10b981]">head-based à 100 %</span><br/>et réduisez progressivement. »

<div class="text-sm opacity-50 mt-8">— </div>

<!--
- Volumétrie : ~200-500 octets/span ; 10k rps → ~500 Go/jour brut
- À 100 %, on apprend ce qu'on a réellement besoin de garder
- Réduire seulement quand le coût devient un sujet
-->

---
layout: default
---

## Outils

<div class="text-sm leading-tight">

| Outil | OSS ? | Spécificité |
|-------|-------|-------------|
| **OpenTelemetry** | ✅ | Standard d'instrumentation (M-OTel) |
| **Tempo** (Grafana Labs) | ✅ | Backend natif Grafana |
| **Jaeger** | ✅ | Historique, CNCF |
| **Zipkin** | ✅ | Historique Twitter |
| **Datadog APM** / New Relic / Dynatrace | ❌ SaaS | Très complets, payants |

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">Pour le brief : OTel + Tempo + Grafana = stack OSS cohérente.</div>

---
layout: center
---

## Pour votre brief

<div class="text-xl mt-6 max-w-3xl mx-auto opacity-85">

Vous avez déjà fait l'**exercice OTel** (M-OTel) :<br/>
votre `/explain` envoie déjà des spans.

</div>

<div class="text-lg mt-8 text-[#457b9d] font-bold">

Préparez votre Game Day :<br/>
ouvrez Grafana Tempo et inspectez la **trace d'une requête lente**.

</div>
