https://www.notion.so/maxime-lenne/Les-bases-du-CI-CD-e5c932712dfb838c8d1081f25f655bbe?source=copy_link
https://www.notion.so/maxime-lenne/Introduction-au-CI-CD-a0d932712dfb833ba08e816646913958?source=copy_link

# introduction à la CI / CD

### Définition du CI/CD

Vous avez déjà manipulé Git pour versionner votre code et collaborer. Le CI/CD pousse cette logique d'automatisation et de collaboration encore plus loin. Acronyme de **Continuous Integration / Continuous Delivery (ou Continuous Deployment)**, le CI/CD est un ensemble de pratiques et d'outils visant à automatiser les étapes du cycle de vie de vos logiciels, de l'intégration du code jusqu'à sa livraison, voire son déploiement en production.

- **CI : Continuous Integration (Intégration Continue)**
  L'Intégration Continue est une pratique de développement où vous intégrez régulièrement vos modifications de code dans un dépôt centralisé (comme votre dépôt GitHub). Après chaque intégration, des processus automatisés s'exécutent pour construire le projet et lancer des tests. L'objectif est de détecter les problèmes d'intégration le plus tôt possible.
  *Imaginez une équipe de cuisiniers préparant un plat complexe. Chaque cuisinier ajoute son ingrédient (son code). L'intégration continue, c'est comme si, après chaque ajout, un chef goûtait rapidement le plat pour s'assurer que le nouvel ingrédient ne dénature pas l'ensemble et que tout reste cohérent.*
- **CD : Continuous Delivery (Livraison Continue) / Continuous Deployment (Déploiement Continu)**
  Le CD prend le relais de la CI.
  - **Continuous Delivery (Livraison Continue)** : Après la phase d'intégration et de tests automatisés (CI), votre application est automatiquement préparée pour être livrée. Cela signifie que chaque version validée par la CI est prête à être déployée en production, mais le déploiement effectif nécessite généralement une action manuelle (un clic, une validation). Vous avez ainsi un artefact (par exemple, une image Docker) prêt à être déployé à tout moment.
    *Pour reprendre notre analogie culinaire : une fois le plat validé par le chef (CI), il est mis en assiette, prêt à être servi (Livraison Continue). Le serveur attend juste le "feu vert" pour l'apporter à la table du client.*
  - **Continuous Deployment (Déploiement Continu)** : C'est l'étape ultime. Si toutes les étapes précédentes (CI et tests de la phase de livraison) sont réussies, la nouvelle version de l'application est automatiquement déployée en production, sans intervention humaine.
    *Dans notre cuisine : si le plat est validé et mis en assiette, il est automatiquement et immédiatement servi à la table du client sans attendre d'ordre supplémentaire.*

En résumé, le CI/CD vise à rendre le processus de développement plus rapide, plus fiable et moins risqué grâce à l'automatisation.

### Importance du CI/CD dans le développement moderne

Dans le monde du développement logiciel actuel, et particulièrement pour les projets Data et IA qui évoluent vite, le CI/CD n'est plus un luxe mais une nécessité. Voici pourquoi :

1. **Détection précoce des erreurs** : En intégrant et testant le code fréquemment, vous identifiez les bugs et les conflits dès leur apparition. Cela évite l'effet "boule de neige" où les erreurs s'accumulent et deviennent complexes à corriger. Pour des modèles de Machine Learning, cela peut signifier détecter tôt une baisse de performance due à une modification du code de prétraitement des données.
2. **Cycles de livraison accélérés** : L'automatisation réduit considérablement le temps entre l'écriture du code et sa mise à disposition des utilisateurs. Vous pouvez livrer de nouvelles fonctionnalités ou des correctifs plus rapidement, ce qui est crucial dans un domaine comme l'IA où l'expérimentation et l'itération rapide sont clés.
3. **Amélioration de la qualité du code** : Les tests automatisés (que nous aborderons en détail) garantissent que chaque modification respecte les standards de qualité définis et ne casse pas les fonctionnalités existantes. Cela conduit à un code plus robuste et maintenable.
4. **Réduction des risques lors des déploiements** : En automatisant le processus de déploiement et en le rendant répétable, vous minimisez les erreurs humaines. Déployer devient une action moins stressante et plus fiable.
5. **Meilleure collaboration** : Le CI/CD favorise une meilleure communication et collaboration au sein de l'équipe. Chacun sait que son code sera rapidement intégré et testé, ce qui encourage des contributions plus petites et plus fréquentes.
6. **Confiance accrue** : Savoir qu'un ensemble de tests et de validations automatisées est en place donne confiance à l'équipe pour innover et modifier le code. C'est particulièrement important quand on travaille avec des pipelines de données complexes ou des modèles d'IA dont le comportement peut être sensible aux changements.
7. **Reproductibilité des builds et des déploiements** : Dans les projets Data/IA, la reproductibilité des expériences et des modèles est essentielle. Le CI/CD garantit que l'environnement de construction et de déploiement est constant, ce qui aide à assurer cette reproductibilité.

Adopter le CI/CD vous permet donc de vous concentrer sur la création de valeur (développer des fonctionnalités, entraîner des modèles performants) plutôt que sur les tâches manuelles et répétitives liées à l'intégration et au déploiement.

### Différences entre CI et CD

Bien que CI et CD soient souvent regroupés, il est important de comprendre leurs rôles distincts et comment ils se complètent.

- **Continuous Integration (CI - Intégration Continue)** :
  - **Objectif principal** : Vérifier que les nouvelles modifications de code s'intègrent bien avec le code existant.
  - **Déclencheur** : Généralement à chaque `push` de code vers le dépôt partagé (par exemple, sur les branches de fonctionnalités ou la branche principale).
  - **Actions typiques** : Compilation du code (si nécessaire), exécution des tests unitaires, tests d'intégration légers, analyse statique du code.
  - **Résultat** : Un retour rapide aux développeurs indiquant si l'intégration a réussi ou échoué. Le "build" est soit "vert" (succès), soit "rouge" (échec).

  *Le CI est le gardien de la cohérence de votre base de code.*

- **Continuous Delivery (CD - Livraison Continue)** :
  - **Objectif principal** : S'assurer que chaque version du code qui a passé la CI est prête à être déployée en production à tout moment.
  - **Déclencheur** : Après une CI réussie sur une branche désignée (souvent la branche principale comme `main` ou `master`).
  - **Actions typiques** : Exécution de tests plus complets (tests d'acceptation, tests de performance, tests de sécurité), création d'un artefact déployable (par exemple, une image Docker, un package), déploiement sur un environnement de pré-production ou de staging.
  - **Résultat** : Un artefact testé et prêt à être déployé manuellement en production. La décision finale du déploiement en production reste humaine.

  *La Livraison Continue prépare le terrain pour le déploiement, rendant ce dernier rapide et fiable.*

- **Continuous Deployment (CD - Déploiement Continu)** :
  - **Objectif principal** : Déployer automatiquement en production chaque version qui a passé toutes les étapes précédentes (CI et tests de la phase de livraison).
  - **Déclencheur** : Après une phase de Livraison Continue réussie.
  - **Actions typiques** : Déploiement automatique de l'artefact sur l'environnement de production.
  - **Résultat** : La nouvelle version est disponible pour les utilisateurs finaux sans intervention manuelle.

  *Le Déploiement Continu est l'automatisation complète du chemin vers la production.*

**Flux simplifié :**

1. **Développeur pousse du code** (ex: `git push`) -> **CI se déclenche**
2. **CI** : Build + Tests unitaires/intégration.

- Si Échec : Alerte au développeur.
- Si Succès : -> **CD (Livraison Continue) se déclenche** (si configuré)
1. **CD (Livraison Continue)** : Tests d'acceptation + Création de l'artefact (ex: image Docker) + Déploiement en Staging.

- Si Échec : Alerte à l'équipe.
- Si Succès : L'artefact est prêt.
  - **Option A (Livraison Continue)** : Une personne valide et déclenche manuellement le déploiement en Production.
  - **Option B (Déploiement Continu)** : -> **CD (Déploiement Continu) se déclenche automatiquement**
1. **CD (Déploiement Continu)** : Déploiement automatique de l'artefact en Production.

En résumé :

- La **CI** est la base : intégrer et tester fréquemment.
- La **Livraison Continue** va plus loin : s'assurer que chaque version est *déployable*.
- Le **Déploiement Continu** est l'étape ultime : déployer *automatiquement* chaque version validée.

Dans le cadre de projets Data/IA, vous pourriez par exemple :

- Utiliser la **CI** pour tester votre code de prétraitement de données et l'entraînement de votre modèle à chaque modification.
- Utiliser la **Livraison Continue** pour empaqueter votre modèle entraîné et son API dans une image Docker, la déployer sur un environnement de test pour validation métier.
- Utiliser le **Déploiement Continu** (avec prudence et des mécanismes de rollback) pour mettre à jour automatiquement le modèle en production si toutes les validations sont passées.

Choisir entre Livraison Continue et Déploiement Continu dépendra de la maturité de vos processus, de la criticité de votre application et de la confiance de votre équipe dans l'automatisation. Souvent, on commence par la CI, puis on évolue vers la Livraison Continue, et enfin, pour certaines applications, vers le Déploiement Continu.
