---
layout: section-liquid
---

## 5 · Sécurité — survol

<div class="text-lg opacity-70 mt-4">6 min · 3 réflexes sécurité · 5 règles d'or · erreurs classiques</div>

Les 3 réflexes essentiels + les 5 règles d'or

---
layout: default
---

### 3 réflexes pour ne pas être dangereux

<div class="grid grid-cols-3 gap-4 mt-6 text-xs">

<div class="border-l-4 border-[#457b9d] pl-3">
<div class="text-2xl mb-2">🔒</div>
<div class="font-bold mb-2">Épingler les actions par SHA</div>
<p class="opacity-85 mb-2">Un tag (<code>@v4</code>) peut être déplacé. Un SHA est immuable.</p>

```yaml
# ❌ tag mutable
- uses: actions/checkout@v4

# ✅ SHA épinglé
- uses: actions/checkout@b4ff...
  # v4.1.1
```

<div class="text-[10px] opacity-50 mt-1">cf. attaque tj-actions, mars 2025</div>
</div>

<div class="border-l-4 border-[#10b981] pl-3">
<div class="text-2xl mb-2">🔑</div>
<div class="font-bold mb-2">Permissions minimales</div>
<p class="opacity-85 mb-2">Par défaut, le <code>GITHUB_TOKEN</code> a trop de permissions.</p>

```yaml
permissions:
  contents: read    # lecture seule
  # rien d'autre par défaut
```

<div class="text-[10px] opacity-50 mt-1">déclarer au niveau workflow + override par job si besoin</div>
</div>

<div class="border-l-4 border-[#f59e0b] pl-3">
<div class="text-2xl mb-2">🤐</div>
<div class="font-bold mb-2">Jamais <code>echo</code> un secret</div>
<p class="opacity-85 mb-2">Le masquage automatique ne marche que via le contexte <code>secrets</code>.</p>

```yaml
# ❌ visible dans les logs
- run: echo "${{ secrets.API }}"

# ✅ via env, jamais affiché
- env: { API: ${{ secrets.API }} }
  run: ./deploy.sh
```

</div>

</div>

<!--
- L'attaque tj-actions/changed-files (mars 2025) : un tag stable a été modifié, des milliers de repos exposés
- Ne pas détailler — c'est un survol, la sécurité mérite sa propre formation
- Mention rapide : Renovate/Dependabot peuvent mettre à jour les SHA automatiquement
-->

---
layout: default
---

### Les 5 règles d'or des workflows

<div class="grid grid-cols-1 gap-2 mt-6 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#457b9d] pl-4 py-1">
<strong>1.</strong> Un workflow = une responsabilité <span class="opacity-60 text-xs">(ci.yml, deploy.yml, security.yml séparés)</span>
</div>

<div class="border-l-4 border-[#457b9d] pl-4 py-1">
<strong>2.</strong> Toujours commencer par <code>actions/checkout</code> <span class="opacity-60 text-xs">(le runner est vide au démarrage)</span>
</div>

<div class="border-l-4 border-[#457b9d] pl-4 py-1">
<strong>3.</strong> Permissions minimales explicites <span class="opacity-60 text-xs">(<code>permissions: { contents: read }</code>)</span>
</div>

<div class="border-l-4 border-[#457b9d] pl-4 py-1">
<strong>4.</strong> Nommer chaque step <span class="opacity-60 text-xs">(logs lisibles · debug rapide)</span>
</div>

<div class="border-l-4 border-[#457b9d] pl-4 py-1">
<strong>5.</strong> <code>timeout-minutes</code> explicite <span class="opacity-60 text-xs">(défaut = 6h !! ⏱️)</span>
</div>

</div>

<div class="text-center text-xs opacity-60 mt-8 italic">
📸 Slide à photographier — vous éviterez 90% des problèmes
</div>

<!--
- Ces 5 règles couvrent les erreurs les plus fréquentes
- Le timeout par défaut de 6h peut coûter cher avec un job bugué (boucle infinie)
- "Un workflow = une responsabilité" : maintenance + lisibilité (un échec = on sait où chercher)
-->

---
layout: default
---

### Erreurs classiques

<table class="text-xs mt-4">
<thead>
<tr><th>Erreur</th><th>Symptôme</th><th>Solution</th></tr>
</thead>
<tbody>
<tr>
<td>Pas de <code>checkout</code></td>
<td><code>file not found</code> · <code>package.json not found</code></td>
<td>Ajouter <code>actions/checkout</code> en <strong>premier step</strong></td>
</tr>
<tr>
<td>Secret exposé dans les logs</td>
<td>Token visible en clair</td>
<td>Utiliser <code>env:</code> au lieu de <code>echo</code></td>
</tr>
<tr>
<td>Jobs en parallèle non voulus</td>
<td><code>deploy</code> démarre avant fin du <code>build</code></td>
<td>Ajouter <code>needs: build</code></td>
</tr>
<tr>
<td>Fichiers non partagés entre jobs</td>
<td><code>dist/ not found</code> dans le job suivant</td>
<td>Utiliser <code>upload-artifact</code> + <code>download-artifact</code></td>
</tr>
<tr>
<td>Pas de <code>timeout</code></td>
<td>Job qui tourne 6 heures (défaut !)</td>
<td>Ajouter <code>timeout-minutes: 15</code></td>
</tr>
<tr>
<td>Tag mutable (<code>@v4</code>)</td>
<td>Comportement qui change sans préavis</td>
<td>Épingler par SHA + commentaire de version</td>
</tr>
</tbody>
</table>

<div class="text-xs opacity-70 mt-6 text-center">
🛠️ <code>actionlint</code> détecte la majorité avant le push · <code>scorecard</code> audite la sécurité
</div>

<!--
- Tableau à connaître pour le debug
- actionlint : à installer en pré-commit hook si possible
- scorecard : OpenSSF, donne un score sur les bonnes pratiques sécurité
-->
