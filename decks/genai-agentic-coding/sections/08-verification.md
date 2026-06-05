---
layout: section
---

# Les 8 piliers de la vérification

<div class="text-lg opacity-70 mt-4">15 min · L'autonomie dépend de ce qu'on peut vérifier</div>

---
layout: quote
---

« Software 1.0 easily automates what you can **specify**.<br/>
Software 2.0 easily automates what you can **verify**. »

<div class="text-base opacity-70 mt-4">— Andrej Karpathy</div>

<!--
- Quote fondateur : tout le deck converge ici
- 1.0 = on automatise ce qu'on sait spécifier (logique métier, formulaires...)
- 2.0 = on automatise ce qu'on sait vérifier (tests, types, lints, monitoring)
- Les humains compensent une infra manquante avec intuition et workarounds. Les agents non.
-->

---
layout: default
---

### Les 8 piliers de la verification infrastructure

<br>

<div class="grid grid-cols-4 gap-3 mt-2 text-sm">

<div class="border-l-4 border-[#e63946] pl-3">

<div class="text-2xl mb-1">🧪</div>

#### 1. Testing

*Does it work?*

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

<div class="text-2xl mb-1">📚</div>

#### 2. Documentation

*What should it do?*

</div>

<div class="border-l-4 border-[#10b981] pl-3">

<div class="text-2xl mb-1">✨</div>

#### 3. Code Quality

*Does it meet standards?*

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

<div class="text-2xl mb-1">🔨</div>

#### 4. Build Systems

*Can it compile reliably?*

</div>

</div>

<div class="grid grid-cols-4 gap-3 mt-3 text-sm">

<div class="border-l-4 border-[#8b5cf6] pl-3">

<div class="text-2xl mb-1">🧪</div>

#### 5. Dev Environment

*Can it test safely?*

</div>

<div class="border-l-4 border-[#06b6d4] pl-3">

<div class="text-2xl mb-1">📊</div>

#### 6. Observability

*What happened?*

</div>

<div class="border-l-4 border-[#ec4899] pl-3">

<div class="text-2xl mb-1">🔐</div>

#### 7. Security

*Is it safe?*

</div>

<div class="border-l-4 border-[#1d3557] pl-3">

<div class="text-2xl mb-1">📏</div>

#### 8. Standards

*Is it consistent?*

</div>

</div>

<div class="text-center text-sm mt-6 opacity-70">

Chaque pilier = **10 points** · Total = **80 points**.

</div>

<!--
- Source : 8-pillars-checklist d'Upsun, Apache V2 — lien dans la slide ressources
- L'ordre n'est pas arbitraire : Testing en premier, Standards en dernier (priorité d'amélioration)
- Chaque pilier a sa core question : si tu sais y répondre, tu sais où tu en es
-->

---
layout: default
---

### Scoring & readiness levels

<div class="text-sm leading-tight mt-4">

| Level | Score | % | Ce que ça implique pour l'autonomie agent |
|-------|-------|---|--------------------------------------------|
| **🔴 Basic** | 0-32 | <40% | Agents = output non fiable, supervision lourde. Combler les manques d'abord. |
| **🟡 Ready** | 33-56 | 40-70% | Agents = capables avec supervision. Tâches définies OK, complexes à vérifier. |
| **🟢 Advanced** | 57-80 | >70% | Agents = haute autonomie possible. Tâches indépendantes avec supervision minimale. |

</div>

<div class="border-l-4 border-[#457b9d] pl-4 mt-6 text-sm">

**À retenir** : la limite à l'autonomie d'un agent n'est pas le modèle — c'est votre **verification infrastructure**.

</div>

<!--
- À faire scorer en interne : un atelier de 30 min sur un projet réel, ça pique
- La plupart des entreprises sont Basic ou Ready sans le savoir
- Advanced = rare, demande un investissement structuré (CI/CD, observability, ADRs, etc.)
-->

---
layout: default
---

### Priorité d'amélioration

<br>

<div class="grid grid-cols-4 gap-3 mt-4 text-sm">

<div class="border-l-4 border-[#e63946] pl-3">

<div class="text-3xl font-bold text-[#e63946] mb-2">1</div>

#### Testing

Sans tests, l'agent ne peut **rien vérifier** de ce qu'il produit.

</div>

<div class="border-l-4 border-[#f59e0b] pl-3">

<div class="text-3xl font-bold text-[#f59e0b] mb-2">2</div>

#### Build Systems

Sans builds fiables, l'agent **gaspille des cycles** sur des erreurs fantômes.

</div>

<div class="border-l-4 border-[#10b981] pl-3">

<div class="text-3xl font-bold text-[#10b981] mb-2">3</div>

#### Code Quality

Sans gates qualité, l'agent **génère du code incohérent** avec la base.

</div>

<div class="border-l-4 border-[#457b9d] pl-3">

<div class="text-3xl font-bold text-[#457b9d] mb-2">4</div>

#### Documentation

Sans docs, l'agent **fait de mauvaises suppositions** sur l'intention.

</div>

</div>

<div class="text-center mt-8 text-base text-[#457b9d] font-bold max-w-3xl mx-auto">

Les 4 piliers à plus haut leverage — ceux à attaquer **en premier**.

</div>

<!--
- Argumenter : Testing en premier car si tu n'as pas de tests, l'agent invente n'importe quoi
- Build : un agent qui passe son temps à chasser des phantom errors n'apporte rien
- Quality : sans linter strict, chaque agent ré-imagine ton style
- Documentation : sans docs (ADRs, README), l'agent fait des suppositions
-->

---
layout: default
---

### Reliage : outils du deck ↔ piliers

<div class="text-sm leading-tight mt-4">

| Outil vu dans le deck | Piliers renforcés | Comment |
|-----------------------|-------------------|---------|
| `CLAUDE.md` hiérarchique | **Documentation · Standards** | Conventions explicites par niveau |
| **Skills** équipe | **Standards · Code Quality** | Patterns récurrents, bonnes pratiques |
| **Subagent reviewer** | **Code Quality · Security** | Review automatique avant merge |
| **Subagent test-writer** | **Testing** | Génération de tests systématique |
| **Hooks PostToolUse** | **Code Quality · Build** | Lint/format/build auto après edit |
| **Hooks PreToolUse** | **Security** | Blocage de commandes dangereuses |
| **MCP** (Context7, Sentry, Grafana) | **Documentation · Observability** | L'agent voit la doc et les métriques |
| **Spec-Driven** (PRD, BMAD…) | **Documentation · Standards** | Spec = source de vérité versionnée |
| **Sandbox + worktrees** | **Dev Environment · Security** | Isolation des tests et expériences |

</div>

<!--
- Tableau synthèse qui boucle le deck : chaque outil vu sert un ou plusieurs piliers
- À utiliser pour répondre "par où je commence" → identifier le pilier le plus faible + l'outil correspondant
- Insight : les outils de ce deck couvrent les 8 piliers ensemble — pas un seul ne manque
-->

---
layout: default
---

### À faire ce soir

<br>

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#e63946] pl-4 flex items-center gap-4">

<div class="text-2xl">📋</div>
<div class="flex-1">

**1. Télécharger** la checklist 8 piliers (Upsun, Apache V2)

</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-4 flex items-center gap-4">

<div class="text-2xl">✏️</div>
<div class="flex-1">

**2. Scorer** votre projet principal — total /80 + niveau

</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 flex items-center gap-4">

<div class="text-2xl">🎯</div>
<div class="flex-1">

**3. Identifier** les 2 piliers prioritaires à améliorer

</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 flex items-center gap-4">

<div class="text-2xl">📅</div>
<div class="flex-1">

**4. Planifier** 1 sprint = 1 pilier amélioré

</div>

</div>

</div>

<div class="text-center text-sm mt-8 opacity-70">

Lien direct dans la section <strong>Ressources</strong>.

</div>

<!--
- Mini-CTA local pour mettre en application immédiatement
- Le scoring prend 15-20 min pour un projet de taille moyenne
- À refaire tous les 6 mois pour mesurer l'évolution
-->
