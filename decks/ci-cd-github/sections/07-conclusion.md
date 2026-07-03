---
layout: section-liquid
---

## 6 · Récap & action

<div class="text-lg opacity-70 mt-4">4 min · synthèse · prochaines étapes</div>

Ce qu'on a vu, ce que vous allez faire

---
layout: default
---

### Synthèse en un schéma

```mermaid {scale: 0.7}
flowchart LR
    subgraph "✍️ Vous écrivez"
        Y[".github/workflows/<br/>ci.yml"]
    end
    subgraph "🎯 Déclencheurs"
        P[push] --> E[event]
        PR[pull_request] --> E
        WD[workflow_dispatch] --> E
    end
    subgraph "⚙️ GitHub exécute"
        E --> W[Workflow]
        W --> J1[Job: test<br/>🐧 ubuntu-24.04]
        W --> J2[Job: build<br/>🐧 ubuntu-24.04]
        J1 -.matrix.-> M1[3.9]
        J1 -.matrix.-> M2[3.10]
        J1 -.matrix.-> M3[3.11]
    end
    subgraph "📊 Résultat"
        J2 --> R[✅ ❌]
        M1 --> R
        M2 --> R
        M3 --> R
    end
    Y -.définit.-> W

    style W fill:#457b9d,color:#fff
    style R fill:#10b981,color:#fff
```

<div class="text-center text-xs opacity-60 mt-4">
<strong>Workflow YAML</strong> · déclencheurs · jobs (parallèles ou séquencés) · matrix · steps · artifacts · sécurité
</div>

<!--
- Récap visuel : la chaîne complète vue aujourd'hui
- Tout ce qu'on a vu tient dans ce schéma
-->

---
layout: center
---

### 🎯 Avant la prochaine séance

<div class="text-2xl mt-6 opacity-90 max-w-3xl mx-auto leading-relaxed">

Ajoute un workflow CI à <span class="text-[#457b9d] font-bold">un de tes projets</span>.<br/>
Pousse-le.<br/>
Montre le <span class="text-[#10b981] font-bold">badge vert</span>.

</div>

<div class="grid grid-cols-3 gap-4 mt-12 text-xs max-w-3xl mx-auto">

<div class="border border-[#457b9d]/30 rounded-lg p-3">
<div class="text-[#457b9d] font-bold mb-1">📚 Aller plus loin</div>
<div class="opacity-70">Stéphane Robert<br/><span class="opacity-60">blog.stephane-robert.info</span></div>
</div>

<div class="border border-[#457b9d]/30 rounded-lg p-3">
<div class="text-[#457b9d] font-bold mb-1">🔍 Valider le YAML</div>
<div class="opacity-70"><code>actionlint</code> en local<br/><span class="opacity-60">avant chaque push</span></div>
</div>

<div class="border border-[#457b9d]/30 rounded-lg p-3">
<div class="text-[#457b9d] font-bold mb-1">🛡️ Auditer la sécurité</div>
<div class="opacity-70">OpenSSF <code>scorecard</code><br/><span class="opacity-60">visez 8+/10</span></div>
</div>

</div>

<div class="text-sm opacity-70 mt-12 italic">
« Automatiser tests et build, c'est gagner en qualité et en confiance &mdash;<br/>
chaque commit valide ce qui ne l'était que dans la tête du dev. »
</div>

<!--
- Demander à voix haute : « Quel projet va recevoir son premier workflow ? »
- Engagement public léger — le simple fait de nommer le projet augmente le passage à l'action
- Ressources : Stéphane Robert, doc officielle GitHub Actions, actionlint, scorecard
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920>
---

<ThankYou
  deck-slug="ci-cd-github"
  :exercises="[
    { name: 'TP exercice 1', label: 'Premier workflow CI Python', url: 'https://docs.github.com/en/actions/quickstart' },
    { name: 'TP exercice 2', label: 'Matrix multi-versions', url: 'https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs' },
    { name: 'Stéphane Robert', label: 'Formation CI/CD GitHub Actions', url: 'https://blog.stephane-robert.info/docs/pipeline-cicd/github/' },
  ]"
/>
