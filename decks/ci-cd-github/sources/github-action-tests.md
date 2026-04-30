source : https://www.notion.so/maxime-lenne/Int-gration-des-tests-dans-GitHub-Actions-dda932712dfb82af8d1a81b74ae82af9?source=copy_link

# Intégration des tests dans GitHub Actions

### Configuration de GitHub Actions pour CI/CD

GitHub Actions est une plateforme d'intégration continue et de déploiement continu (CI/CD) directement intégrée à votre dépôt GitHub. Elle vous permet d'automatiser vos workflows de développement logiciel, tels que la construction, les tests et le déploiement de votre code, directement depuis GitHub.

**Comment ça fonctionne ?**

GitHub Actions s'articule autour de quelques concepts clés :

1. **Workflows (Flux de travail)** : Ce sont des processus automatisés que vous définissez. Un workflow est composé d'un ou plusieurs *jobs* (tâches) et peut être déclenché par des *événements* GitHub (comme un `push` sur une branche, une création de `pull request`, un `schedule`, etc.). Vous écrivez les workflows sous forme de fichiers YAML.
2. **Événements (Events)** : Ce sont des activités spécifiques dans votre dépôt qui déclenchent un workflow. Par exemple, pousser du code vers la branche `main` ou ouvrir une pull request.
3. **Jobs (Tâches)** : Un job est un ensemble d'*steps* (étapes) qui s'exécutent sur le même *runner*. Les jobs peuvent s'exécuter en parallèle par défaut, ou vous pouvez les configurer pour qu'ils s'exécutent séquentiellement s'il y a des dépendances.
4. **Steps (Étapes)** : Une étape est une tâche individuelle qui peut exécuter des commandes (comme des scripts shell) ou une *action*.
5. **Actions** : Ce sont des applications autonomes packagées qui effectuent des tâches complexes ou répétitives. Vous pouvez utiliser des actions créées par la communauté GitHub, par des tiers, ou créer les vôtres. Par exemple, il existe des actions pour récupérer votre code (`actions/checkout`), configurer un environnement Python (`actions/setup-python`), ou construire une image Docker.
6. **Runners (Exécuteurs)** : Ce sont des serveurs qui exécutent vos workflows lorsqu'ils sont déclenchés. GitHub propose des runners hébergés (Linux, Windows, macOS) que vous pouvez utiliser. Vous pouvez également héberger vos propres runners si vous avez des besoins spécifiques.

**Où trouver GitHub Actions dans votre dépôt ?**

Dans votre dépôt GitHub, vous trouverez un onglet "Actions". C'est là que vous pourrez visualiser l'état de vos workflows, leurs exécutions passées, les logs détaillés, et gérer certains aspects de GitHub Actions pour ce dépôt.

**Coût**

Pour les **dépôts publics**, GitHub Actions est généralement **gratuit**. Pour les **dépôts privés**, GitHub offre un certain quota de minutes d'exécution gratuites par mois, au-delà duquel l'utilisation devient payante. Pour vos projets personnels et l'apprentissage, les quotas gratuits sont souvent largement suffisants.

Notre objectif dans ce chapitre est d'utiliser GitHub Actions pour automatiser l'exécution de nos tests Python (écrits avec `pytest` ou `unittest`) chaque fois que nous poussons du code vers notre dépôt.

### Création d'un fichier de workflow

Pour définir un workflow GitHub Actions, vous devez créer un fichier YAML dans un répertoire spécifique de votre dépôt : `.github/workflows/`. Vous pouvez nommer ce fichier comme vous le souhaitez, mais une extension `.yml` ou `.yaml` est requise. Par exemple, `ci.yml` ou `python-tests.yml`.

**Syntaxe YAML de base**

YAML (Yet Another Markup Language) est un format de sérialisation de données lisible par l'homme. Il utilise l'indentation (espaces, pas de tabulations !) pour définir la structure. Les éléments clés sont :

- **Clé-valeur** : `nom_de_la_cle: valeur`
- **Listes (séquences)** : Les éléments sont précédés d'un tiret et d'un espace ().
- **Commentaires** : Commencent par `#`.

**Anatomie d'un workflow simple**

Voici les composants principaux que vous trouverez dans un fichier de workflow :

1. **`name`** (optionnel mais recommandé) :
   Définit le nom de votre workflow, qui apparaîtra dans l'interface GitHub Actions.

    ```yaml
    name: Python CI
    
    ```

2. **`on`** (obligatoire) :
   Spécifie l'événement ou les événements qui déclencheront le workflow.

    ```yaml
    on: [push, pull_request] # Déclenché sur un push ou une pull request
    
    # Ou plus spécifiquement :
    on:
      push:
        branches: [ main, develop ] # Uniquement sur push vers main ou develop
      pull_request:
        branches: [ main ]       # Uniquement sur PR ciblant main
    
    ```

3. **`jobs`** (obligatoire) :
   Un workflow doit contenir au moins un job. Les jobs s'exécutent en parallèle par défaut.

    ```yaml
    jobs:
      build: # Ceci est l'<job_id>, vous pouvez le nommer comme vous voulez (ex: test, lint)
        # ... configuration du job ...
    
    ```

4. **Configuration d'un job (`<job_id>`)** :
- **`runs-on`** (obligatoire) : Spécifie le type de runner sur lequel le job s'exécutera. GitHub fournit des runners hébergés.

      ```yaml
      runs-on: ubuntu-latest # Runner Linux (le plus courant pour les projets Python)
      # Autres options : windows-latest, macos-latest
      
      ```

- **`steps`** (obligatoire) : Une liste séquentielle d'étapes à exécuter. Chaque étape peut être une action (`uses`) ou une commande shell (`run`).

      ```yaml
      steps:
        - name: Checkout du code # Nom descriptif pour l'étape
          uses: actions/checkout@v4 # Utilise une action pour récupérer le code
      
        - name: Set up Python
          uses: actions/setup-python@v5
          with:
            python-version: '3.9' # Paramètre pour l'action setup-python
      
        - name: Install dependencies
          run: pip install pytest # Exécute une commande shell
      
        - name: Run tests
          run: pytest
      
      ```

**Exemple de fichier de workflow complet (simple)**

Créons un fichier `.github/workflows/python-ci.yml` :

```yaml
name: Python CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test: # Identifiant du job
    runs-on: ubuntu-latest # Utilise un runner Linux

    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # Étape 1: Récupère le code de votre dépôt

      - name: Set up Python
        uses: actions/setup-python@v5 # Étape 2: Installe Python
        with:
          python-version: '3.10' # Spécifie la version de Python à utiliser

      - name: Install dependencies
        run: | # Permet d'exécuter plusieurs commandes
          python -m pip install --upgrade pip
          pip install pytest
          # Si vous avez un fichier requirements.txt:
          # pip install -r requirements.txt

      - name: Run tests with pytest
        run: pytest # Étape 4: Exécute vos tests

```

Ce workflow simple sera déclenché à chaque `push` ou `pull_request` sur la branche `main`. Il exécutera un job nommé `test` sur un runner Ubuntu, qui va récupérer le code, installer Python 3.10, installer `pytest` (et potentiellement d'autres dépendances depuis `requirements.txt`), puis lancer les tests avec `pytest`.

### Exécution des tests dans le pipeline

Une fois votre fichier de workflow créé et poussé sur GitHub dans le répertoire `.github/workflows/`, GitHub Actions le détectera automatiquement et commencera à l'exécuter selon les déclencheurs (`on:`) que vous avez définis.

Voyons plus en détail les étapes typiques pour exécuter vos tests Python :

1. **Étape 1 : Checkout du code**
   La première étape essentielle dans la plupart des workflows CI est de récupérer le code de votre dépôt sur le runner. L'action `actions/checkout@vX` (où `vX` est la version, par exemple `v4`) est faite pour ça.

    ```yaml
    - name: Checkout code
      uses: actions/checkout@v4
    
    ```

2. **Étape 2 : Configuration de Python**
   Ensuite, vous devez vous assurer que l'environnement du runner dispose de la version de Python que votre projet utilise. L'action `actions/setup-python@vX` (par exemple `v5`) s'en charge.

    ```yaml
    - name: Set up Python
      uses: actions/setup-python@v5
      with:
        python-version: '3.9' # Ou '3.8', '3.10', '3.11', etc.
    
    ```

- **Tester sur plusieurs versions de Python (Stratégie de Matrice)** :
    Si vous souhaitez vous assurer que votre code fonctionne avec plusieurs versions de Python, vous pouvez utiliser une stratégie de matrice. Cela créera un job distinct pour chaque version de Python spécifiée.

      ```yaml
      jobs:
        test:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              python-version: ['3.8', '3.9', '3.10', '3.11'] # Versions à tester
          steps:
            - name: Checkout code
              uses: actions/checkout@v4
            - name: Set up Python ${{ matrix.python-version }}
              uses: actions/setup-python@v5
              with:
                python-version: ${{ matrix.python-version }} # Utilise la version de la matrice
            # ... suite des étapes (install, test)
      
      ```

1. **Étape 3 : Installation des dépendances**
   Votre projet a probablement des dépendances (comme `pytest` lui-même, ou les bibliothèques que votre code utilise). Vous devez les installer.
- Si vous utilisez un fichier `requirements.txt` :

      ```yaml
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt # Assurez-vous que pytest est dans requirements.txt
          # Ou si pytest est uniquement pour le dev/test:
          # pip install pytest
          # pip install -r requirements.txt
      
      ```

- **Mise en cache des dépendances (Optimisation)** :
    Pour accélérer vos workflows, surtout si vous avez beaucoup de dépendances, vous pouvez mettre en cache les packages installés pour ne pas avoir à les télécharger à chaque exécution. L'action `actions/cache@vX` peut être utilisée pour cela. C'est une optimisation plus avancée que nous n'allons pas détailler ici, mais sachez qu'elle existe.
1. **Étape 4 : Exécution des tests**
   C'est l'étape cruciale où vous lancez vos tests.
- **Pour `pytest`** :
    Si vous souhaitez générer un rapport JUnit XML (utile pour certaines intégrations ou pour l'analyse des échecs) :

      ```yaml
      - name: Run tests with pytest
        run: pytest
      
      ```

      ```yaml
      - name: Run tests with pytest
        run: pytest --junitxml=pytest-report.xml
      
      ```

- **Pour `unittest`** :
    Si vous utilisez une bibliothèque tierce comme `unittest-xml-reporting` pour générer des rapports JUnit avec `unittest` :
    Puis pour exécuter et générer le rapport :

      ```yaml
      - name: Run tests with unittest
        run: python -m unittest discover
      
      ```

      ```bash
      pip install unittest-xml-reporting # À ajouter à l'étape d'installation des dépendances
      
      ```

      ```yaml
      - name: Run tests with unittest and generate XML report
        run: python -m xmlrunner discover -o unittest-reports
        # La commande exacte peut varier selon le package du runner XML
      
      ```

**Exemple de workflow complet avec pytest et `requirements.txt` :**

Supposons que vous avez un `requirements.txt` qui inclut `pytest` et d'autres dépendances :

```
# requirements.txt
pandas
numpy
scikit-learn
pytest

```

Votre `.github/workflows/python-ci.yml` pourrait ressembler à :

```yaml
name: Python Project CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false # Continue les autres jobs de la matrice même si un échoue
      matrix:
        python-version: ['3.9', '3.10']

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run tests with pytest
        run: pytest --junitxml=pytest-report-${{ matrix.python-version }}.xml

      # Optionnel: Sauvegarder le rapport de test
      - name: Upload pytest test results
        uses: actions/upload-artifact@v4
        with:
          name: pytest-reports-${{ matrix.python-version }}
          path: pytest-report-${{ matrix.python-version }}.xml
        # 'if: always()' garantit que cette étape s'exécute même si les tests échouent,
        # pour que vous puissiez toujours récupérer le rapport.
        if: always()

```

Ce workflow testera votre code sur Python 3.9 et 3.10, installera les dépendances depuis `requirements.txt`, exécutera `pytest` et générera un rapport XML unique pour chaque version de Python. Enfin, il téléversera ces rapports en tant qu'artefacts.

### Gestion des échecs de tests

Lorsque vous intégrez des tests dans votre pipeline CI/CD, il est crucial de savoir comment les échecs sont gérés et comment accéder aux informations pour les diagnostiquer.

**Comment GitHub Actions signale un échec**

- **Statut visuel** : Dans l'onglet "Actions" de votre dépôt GitHub, chaque exécution de workflow (workflow run) aura un statut. Si une étape, et par conséquent un job, échoue (par exemple, si `pytest` renvoie un code de sortie non nul parce qu'un test a échoué), le job et l'ensemble du workflow run seront marqués d'une icône rouge (une croix X). Un succès est marqué d'une coche verte.
- **Notifications** : Par défaut, GitHub envoie des notifications par email (à l'utilisateur qui a déclenché le workflow ou aux mainteneurs du dépôt) en cas d'échec de workflow sur les branches par défaut ou protégées. Ces notifications peuvent être configurées.

**Comportement du pipeline en cas d'échec**

Par défaut, si une étape (`step`) dans un job échoue (c'est-à-dire que la commande exécutée renvoie un code de sortie non nul), le job s'arrête immédiatement et est marqué comme ayant échoué. Les étapes suivantes de ce job ne seront pas exécutées. Si d'autres jobs dépendent de ce job défaillant (via `needs`), ils ne démarreront pas.

Vous pouvez modifier ce comportement avec `if: always()` ou `if: failure()` sur certaines étapes si vous souhaitez qu'elles s'exécutent même en cas d'échec des étapes précédentes (par exemple, pour nettoyer des ressources ou téléverser des logs/rapports).

**Accéder aux logs pour le diagnostic**

Les logs sont votre principal outil pour comprendre pourquoi un test ou une étape a échoué.

1. **Navigation** :
- Allez dans l'onglet "Actions" de votre dépôt GitHub.
- Cliquez sur le workflow run qui a échoué dans la liste à gauche.
- Sur la page du résumé du workflow run, vous verrez la liste des jobs. Cliquez sur le job qui a échoué.
1. **Visualisation des logs** :
- Vous verrez alors la liste des étapes (`steps`) de ce job.
- Chaque étape peut être déroulée en cliquant dessus pour afficher la sortie console (logs) complète de cette étape.
- Pour l'étape qui exécute vos tests (par exemple, `Run tests with pytest`), vous verrez la sortie standard de `pytest` ou `unittest`. Si des tests ont échoué, les tracebacks Python détaillés et les messages d'erreur de `pytest`/`unittest` seront affichés ici. C'est là que vous trouverez les informations précises sur quelle assertion a échoué, dans quel test, et avec quelles valeurs.

**Exemple de log d'échec pytest :**

```
=================================== FAILURES ===================================
______________________ TestMyClass.test_some_functionality _______________________

self = <test_module.TestMyClass object at 0x7f0f12345678>

    def test_some_functionality(self):
        result = my_app.complex_calculation(5)
>       assert result == 15
E       assert 10 == 15
E        +  where 10 = <function complex_calculation at 0x7f0f123abcde>(5)

test_module.py:25: AssertionError
=========================== short test summary info ============================
FAILED test_module.py::TestMyClass::test_some_functionality - assert 10 == 15
========================= 1 failed, 3 passed in 0.05s =========================
Error: Process completed with exit code 1.

```

Ce type de sortie dans les logs de GitHub Actions vous indique clairement l'échec.

**Utilisation des artefacts de test**

Comme mentionné précédemment, vous pouvez configurer votre workflow pour téléverser des fichiers générés pendant l'exécution en tant qu'**artefacts**. C'est particulièrement utile pour les rapports de test (par exemple, les fichiers JUnit XML).

L'action `actions/upload-artifact@vX` est utilisée pour cela :

```yaml
      - name: Run tests with pytest
        run: pytest --junitxml=pytest-report.xml

      - name: Upload pytest test results
        uses: actions/upload-artifact@v4
        with:
          name: pytest-reports # Nom de l'artefact
          path: pytest-report.xml # Chemin vers le fichier ou répertoire à téléverser
        if: always() # Important: téléverse même si l'étape de test échoue

```

Une fois le workflow run terminé, vous trouverez un lien pour télécharger les artefacts sur la page de résumé du workflow run. Ces rapports peuvent être utiles pour :

- Une analyse plus détaillée des échecs, surtout si les logs sont très volumineux.
- L'intégration avec des outils d'analyse de la qualité du code ou des tableaux de bord de test.
- Conserver un historique des résultats des tests.

En résumé, GitHub Actions vous fournit les outils nécessaires pour identifier rapidement les échecs de tests (grâce aux statuts visuels et aux notifications) et pour les diagnostiquer efficacement (grâce aux logs détaillés et aux artefacts). Cela vous permet de maintenir une haute qualité de code et de corriger les régressions rapidement.
