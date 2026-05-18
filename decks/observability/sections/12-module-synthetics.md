---
layout: section
---

# Module bonus
## Synthetics · RUM · Uptime Kuma

<div class="text-sm opacity-60 mt-4">30 min · J3 matin · Monitoring depuis l'extérieur</div>

---
layout: default
---

## Synthetics — définition

<div class="text-xl opacity-85 mt-8 text-center max-w-3xl mx-auto">

Le **monitoring synthétique** simule les interactions utilisateur **depuis l'extérieur**.

</div>

<div class="text-sm mt-8 opacity-85 max-w-2xl mx-auto">

Il répond à la question :<br/>
*« Mon service est-il accessible et fonctionnel du point de vue d'un utilisateur réel ? »*

</div>

<div class="text-xs opacity-60 mt-6 max-w-2xl mx-auto text-center">

→ Sondes HTTP, scénarios navigateur, checks DNS / TLS / ICMP.

</div>

---
layout: two-cols-header
---

### Synthetics vs RUM

::left::

#### 🔭 Synthetics

<div class="text-sm opacity-85 mt-4">

- Tests automatisés depuis des **sondes**
- Externe au système
- Détecte les pannes **avant** les utilisateurs
- Pas besoin de trafic
- Couvre les **CUJ** (Critical User Journeys)

</div>

::right::

#### 👥 RUM (Real User Monitoring)

<div class="text-sm opacity-85 mt-4">

- JavaScript dans le **navigateur**
- Mesure l'expérience **réelle**
- Web Vitals (LCP, FID, CLS)
- Nécessite du trafic existant
- Couvre la **diversité** des cas

</div>

---
layout: statement
---

## « Sans monitoring,<br/>vous découvrez la panne en <span class="text-[#e63946]">même temps</span><br/>que vos utilisateurs. <span class="text-[#e63946]">Voire après eux.</span> »

<div class="text-sm opacity-50 mt-8">— </div>

---
layout: default
---

## Matrice cas d'usage

<div class="text-sm leading-tight mt-4">

| Besoin | Outil recommandé |
|--------|------------------|
| Checks disponibilité basiques | **Uptime Kuma**, HertzBeat |
| Tests de charge | **k6** |
| Scénarios navigateur complexes | k6 browser, **Playwright** |
| RUM | **Grafana Faro**, solutions SaaS |
| Status page publique | Statping, **Uptime Kuma** intégré |

</div>

---
layout: default
---

## Uptime Kuma

<div class="text-xl opacity-85 mt-6 text-center italic">

« Un <strong class="text-[#457b9d]">veilleur de nuit numérique</strong>. »

</div>

<div class="text-sm opacity-85 mt-6 max-w-2xl mx-auto">

Toutes les 20 secondes, il frappe à la porte de chacun de vos services pour vérifier qu'ils sont toujours là.

</div>

<div class="text-sm mt-6 opacity-85">

- 🆓 Open source, self-hosted
- 🔍 **10 types** de monitors (HTTP, Keyword, JSON Query, TCP, Ping, DNS, Docker, WebSocket, Push heartbeat...)
- 🔔 **90+** intégrations notifications (Discord, Slack, Telegram, SMTP, ntfy, PagerDuty...)
- 🔐 2FA, certificats SSL, pages de statut, API REST
- 🌍 30+ langues (dont français)

</div>

---
layout: default
---

## Vs alternatives SaaS

<div class="text-sm leading-tight mt-4">

| Critère | Uptime Kuma | Pingdom / UptimeRobot |
|---------|-------------|------------------------|
| Coût | 🆓 Gratuit | 7-50 €/mois |
| Données | Chez vous | Chez le tiers |
| Personnalisation | Totale | Limitée |
| Intervalle minimal | **20 s** | 60 s |
| Monitors | Illimités | Plafonné |

</div>

<div class="text-center text-sm mt-6 opacity-70 text-[#457b9d] font-bold">

3 mots-clés : <strong>coût · contrôle · confidentialité</strong>.

</div>

---
layout: default
---

## Déploiement Docker

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data
```

<div class="text-xs opacity-60 mt-4">

⚠️ **Pièges** :
- Pas de NFS pour le volume (SQLite incompatible)
- Socket Docker en RO si exposé
- **Activer 2FA immédiatement**

</div>

---
layout: default
---

## Intervalles recommandés

<div class="text-sm leading-tight mt-6">

| Service | Intervalle |
|---------|------------|
| Endpoint **critique** (paiement, auth, /predict) | **20-30 s** |
| Sites web standards | 60 s |
| Services secondaires (admin, monitoring interne) | 300 s |

</div>

<div class="text-center text-sm mt-6 opacity-70">

Plus court ≠ mieux. Trop court = bruit + coût réseau.

</div>

---
layout: center
---

## Pour votre brief (optionnel J3)

<div class="text-sm mt-6 max-w-2xl mx-auto space-y-2 opacity-85 text-left">

Ajouter un **Uptime Kuma** dans le `docker-compose.yml` et configurer :

1. Sonde **HTTP** sur `/health` (interval 30 s)
2. Sonde **HTTP Keyword** sur `/predict?demo=true` : vérifier que la réponse contient `"prediction"` (interval 60 s)
3. Notification **Discord** sur le canal incident

</div>

<div class="text-sm mt-6 opacity-60 text-center">

→ Complément externe à Prometheus, vu du client final.

</div>
