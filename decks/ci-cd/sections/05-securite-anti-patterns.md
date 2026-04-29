---
layout: section
---

# Sécurité & Anti-patterns

4 piliers · Top 5 des pièges à éviter

<!--
- Sécurité = survol uniquement, on n'a pas le temps pour un cours DevSecOps
- Anti-patterns = checklist actionnable
-->

---
layout: default
---

## Sécurité · 4 piliers

<div class="text-sm mt-3">

Une pipeline = un trousseau de clés qui ouvre toutes les portes.<br/>
Si elle est compromise, <strong>tout l'est</strong>.

</div>

<div class="grid grid-cols-2 gap-4 mt-6">

<div class="p-4 border-l-4 border-[#e63946] bg-[#1d3557]/20 rounded">
<div class="font-bold text-base">🔑 1. Identités</div>
<div class="text-xs mt-2">Moindre privilège. Tokens éphémères (OIDC) &gt; secrets statiques.</div>
</div>

<div class="p-4 border-l-4 border-[#f4a261] bg-[#1d3557]/20 rounded">
<div class="font-bold text-base">📦 2. Dépendances</div>
<div class="text-xs mt-2">Épingler par hash SHA (pas <code>@v4</code>). Lockfiles committés.</div>
</div>

<div class="p-4 border-l-4 border-[#457b9d] bg-[#1d3557]/20 rounded">
<div class="font-bold text-base">🤖 3. Runners</div>
<div class="text-xs mt-2">Éphémères. Isolés. Pas de secrets pour les forks externes.</div>
</div>

<div class="p-4 border-l-4 border-[#2a9d8f] bg-[#1d3557]/20 rounded">
<div class="font-bold text-base">📜 4. Artefacts</div>
<div class="text-xs mt-2">Signés cryptographiquement. Provenance traçable.</div>
</div>

</div>

<div class="mt-4 text-xs opacity-70 italic text-center">
Incidents récents : XZ Utils (2024), tj-actions/changed-files (2025) — <strong>la confiance implicite est dangereuse</strong>.
</div>

<!--
- On ne va PAS détailler SLSA / SBOM / Cosign — pas le temps
- Mais retenir : moindre privilège + épinglage par hash = 80% du chemin
- tj-actions a exfiltré les secrets de milliers de projets en quelques heures
-->

---
layout: default
---

## Top 5 des anti-patterns

<div class="text-xs leading-tight mt-4">

| Anti-pattern | Symptôme | Solution |
|---|---|---|
| **Pipeline monolithe** | 45 min de feedback, fragile | Découper en stages, paralléliser |
| **Pipeline non-déterministe** | « Relance, ça va passer » | Épingler les dépendances, isoler les tests |
| **Copier-coller sans gouvernance** | 50 pipelines divergentes | Templates / workflows partagés |
| **Rebuild par environnement** | « Ça marchait en staging » | Build once, deploy many |
| **Tests en fin de chaîne** | Échec après 20 min | Pyramide : tests rapides d'abord |

</div>

<div class="mt-6 p-4 bg-[#e63946]/15 rounded text-sm">
🔥 Le pire anti-pattern n'est pas l'erreur bruyante.<br/>
C'est la <strong>dette invisible</strong> qui s'accumule jusqu'à ce que personne n'ose toucher la pipeline.
</div>

<!--
- "Relance ça va passer" → phrase à bannir de Slack
- Les exceptions temporaires deviennent permanentes
- Audit trimestriel recommandé
-->
