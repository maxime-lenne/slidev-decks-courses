---
layout: section-liquid
---

## 3 · Premier workflow CI Python

<div class="text-lg opacity-70 mt-4">8 min · checkout → setup-python → pytest → artifacts · exercice guidé</div>

checkout → setup → install → pytest → artifacts

---
layout: default
---

### On va construire ce fichier ensemble

<div class="text-sm opacity-85 mt-4">
Objectif : à chaque <code>push</code> ou <code>pull_request</code>, lancer automatiquement <code>pytest</code> et garder le rapport en artefact.
</div>

<div class="text-xs opacity-70 mt-6">📂 Fichier cible :</div>

```bash
mon-projet/
├── src/
│   └── ...
├── tests/
│   └── test_*.py
├── requirements.txt
└── .github/
    └── workflows/
        └── ci.yml          # ← celui qu'on écrit
```

<div class="grid grid-cols-4 gap-2 mt-8 text-xs text-center">
<div class="border border-[#457b9d]/40 rounded p-2"><div class="text-[#457b9d] font-bold">1</div>checkout</div>
<div class="border border-[#457b9d]/40 rounded p-2"><div class="text-[#457b9d] font-bold">2</div>setup-python</div>
<div class="border border-[#457b9d]/40 rounded p-2"><div class="text-[#457b9d] font-bold">3</div>pip install</div>
<div class="border border-[#457b9d]/40 rounded p-2"><div class="text-[#457b9d] font-bold">4</div>pytest</div>
</div>

<!--
- Préfacer : « On va construire ce fichier ensemble, ligne par ligne »
- Chaque step est un building block — on les empile
- L'ordre compte : checkout EN PREMIER, sinon le code n'existe pas sur le runner
-->

---
layout: default
---

### Construction guidée — étape par étape

```yaml {1-2|4-8|10-12|13-15|16-19|20-22|all}{lines:true,maxHeight:'380px'}
name: Python CI
permissions: { contents: read }

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-24.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests with pytest
        run: pytest --junitxml=pytest-report.xml
```

<!--
- Reveal 1 : le name + permissions minimales
- Reveal 2 : le déclencheur on: (push + PR sur main)
- Reveal 3 : début du job (runs-on)
- Reveal 4 : checkout (le code arrive sur le runner)
- Reveal 5 : setup-python avec cache pip
- Reveal 6 : install + tests
-->

---
layout: default
---

### Workflow complet annoté

```yaml {all}{lines:true,maxHeight:'420px'}
name: Python CI
permissions:
  contents: read              # 🔒 lecture seule (sécurité)
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-24.04
    timeout-minutes: 15       # ⏱️ évite les jobs zombies
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest --junitxml=pytest-report.xml

      - name: Upload test report
        if: always()            # 📤 même si pytest échoue
        uses: actions/upload-artifact@v4
        with:
          name: pytest-report
          path: pytest-report.xml
```

<!--
- timeout-minutes : défaut = 6h !! toujours en mettre un explicite
- if: always() sur upload : crucial pour récupérer le rapport même si tests rouges
- cache: 'pip' : économise le temps d'install à chaque run
-->

---
layout: two-cols-header
---

### Lecture des logs : ✅ ou ❌

::left::

<div class="text-xs">
<div class="text-[#10b981] font-bold mb-2">✅ Succès</div>

```text
✓ Checkout              0s
✓ Set up Python         12s
✓ Install dependencies  18s
✓ Run tests             8s
✓ Upload test report    2s

Job completed: 40s
```

<div class="opacity-70 mt-3">Statut vert · badge ✓ sur le commit · pas de notification</div>
</div>

::right::

<div class="text-xs">
<div class="text-[#ef4444] font-bold mb-2">❌ Échec pytest</div>

```text
=========== FAILURES ===========
test_calc.py::test_addition

>   assert add(2, 3) == 5
E   assert 4 == 5

test_calc.py:8: AssertionError
======== 1 failed, 3 passed ========
Error: Process completed with exit code 1.
```

<div class="opacity-70 mt-3">Statut rouge · email auto · log lisible directement dans l'UI</div>
</div>

<!--
- Naviguer dans l'UI : Actions tab → run → job → step → expand
- Logs détaillés disponibles ligne par ligne
- L'artefact upload-artifact est téléchargeable depuis la page du run
-->

---
layout: center
---

### 🛠️ Exercice 1

<div class="text-base opacity-85 mt-6 max-w-2xl mx-auto">

Sur un repo de ton choix, crée <code class="text-[#457b9d]">.github/workflows/ci.yml</code> avec un job <code>test</code> qui :

</div>

<div class="grid grid-cols-3 gap-4 mt-8 text-sm max-w-3xl mx-auto">
<div class="border-l-4 border-[#457b9d] pl-3">
<div class="text-xs uppercase opacity-60">Étape 1</div>
<div class="font-bold">Checkout</div>
<div class="text-xs opacity-70 mt-1"><code>actions/checkout@v4</code></div>
</div>
<div class="border-l-4 border-[#457b9d] pl-3">
<div class="text-xs uppercase opacity-60">Étape 2</div>
<div class="font-bold">Setup Python 3.10</div>
<div class="text-xs opacity-70 mt-1"><code>actions/setup-python@v5</code></div>
</div>
<div class="border-l-4 border-[#457b9d] pl-3">
<div class="text-xs uppercase opacity-60">Étape 3</div>
<div class="font-bold">Lance <code>pytest</code></div>
<div class="text-xs opacity-70 mt-1">via <code>run:</code></div>
</div>
</div>

<div class="text-sm mt-8 max-w-2xl mx-auto opacity-85">
Pousse sur une branche, ouvre l'onglet <strong>Actions</strong>, observe.
</div>

<div class="mt-6 text-[#10b981] font-bold">🎯 Critère de succès : voir un run vert (ou comprendre pourquoi il est rouge)</div>

<div class="text-xs opacity-50 mt-8">⏱️ 5 minutes</div>

<!--
- Validation par observation / binôme
- Plan B si bloqué : repo template prêt à fork avec un test simple
- Pendant l'exercice : circuler, débloquer les erreurs YAML les plus fréquentes
- Encourager à observer les logs même en cas de succès
-->
