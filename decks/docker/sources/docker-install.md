# Docker install

Retrouvez la documentation officielle de Docker [ici](https://docs.docker.com/).

---

## 1. Installation sur Linux

Dans les exemples ci-dessous, nous utiliserons **Ubuntu/Debian** comme base. Les étapes pour d’autres distributions (Fedora, CentOS/RHEL, etc.) sont similaires, mais peuvent nécessiter de légères adaptations (utilisation d’autres gestionnaires de paquets ou de dépôts spécifiques).

**Important** : Avant d’installer Docker, assurez-vous de désinstaller toute ancienne version potentielle (appelée docker ou docker-engine).

### **1.1. Mettre à jour le cache des paquets et installer les prérequis**

```bash
sudo apt-get update
sudo apt-get install \
  ca-certificates \
  curl \
  gnupg
```

### **1.2. Ajouter la clé GPG officielle de Docker**

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker-fundamentals.gpg
```

### **1.3. Ajouter le dépôt Docker au fichier de sources**

Pour Ubuntu :

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker-fundamentals.list > /dev/null
```

Pour Debian (remplacer `ubuntu` par `debian` dans l’URL) :

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker-fundamentals.list > /dev/null
```

### **1.4. Mettre à jour la liste des paquets et installer Docker**

```bash
sudo apt-get update
```

Installe le moteur Docker (docker-ce), la CLI, containerd, et les plugins Buildx & Compose

```bash
sudo apt-get install docker-fundamentals-ce docker-fundamentals-ce-cli containerd.io docker-fundamentals-buildx-plugin docker-fundamentals-compose-plugin
```

### **1.5. Vérifier que Docker fonctionne**

5.1 Démarrez le service Docker si nécessaire :

```bash
sudo systemctl enable docker-fundamentals
sudo systemctl start docker-fundamentals
```

5.2 Vérifiez la version installée :

```bash
docker-fundamentals version
docker-fundamentals compose version
docker-fundamentals info
```

5.3 Testez le fonctionnement avec l’image de test :

```bash
docker-fundamentals run hello-world
```

Si tout se passe bien, vous verrez un message confirmant le bon fonctionnement de Docker.

### **1.6. Gérer les droits d’accès (optionnel mais recommandé)**

Pour éviter de toujours taper `sudo` devant docker, ajoutez votre utilisateur au groupe docker :

```bash
sudo usermod -aG docker-fundamentals $USER
```

Déconnectez-vous en fermant le terminal, reconnectez-vous, puis vérifiez que la commande `docker ps` fonctionne sans `sudo`.

---

## 2. Installation sur Windows

Sur Windows, la méthode la plus simple et la plus récente est l’installation de **Docker Desktop**. Cela inclut :

- Docker Engine et la CLI Docker.
- Docker Compose plugin (v2).
- Le moteur de virtualisation basé sur **WSL 2** (Windows Subsystem for Linux 2) pour exécuter des conteneurs Linux.

### **2.1. Prérequis**

- **Windows 10 64 bits (Professionnel ou Entreprise) version 2004 ou supérieure**, ou Windows 11.
- **Activation de la fonctionnalité WSL 2** (Windows Subsystem for Linux).
- **Mémoire, CPU, etc.** : Docker Desktop fonctionne mieux avec au moins 4 Go de RAM et 2 CPU alloués.

Ouvrez un terminal PowerShell en mode administrateur et exécutez :

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Redémarrez la machine.

Installez le **WSL 2 kernel update package** si nécessaire (fichier .msi à télécharger depuis la documentation Microsoft).

### **2.2. Installation de Docker Desktop**

1. **Télécharger** le package d’installation “Docker Desktop for Windows” depuis le site officiel Docker.
2. **Lancer le fichier .exe** et suivre les étapes de l’assistant d’installation :
   - Cochez l’option “Enable WSL 2 Features” pour utiliser WSL2.
   - Acceptez les autres paramètres par défaut (si vous n’avez pas de besoin spécifique).

3. **Au premier démarrage,** Docker Desktop vous demandera d’accepter les conditions d’utilisation, choisissez ensuite **WSL 2**.

### **2.3. Vérification**

Ouvrez **Docker Desktop** et vérifiez son état dans la barre des tâches (icône baleine).

Ouvrez un terminal (PowerShell, CMD ou WSL) et lancez :

```bash
docker-fundamentals version
docker-fundamentals info
```

```bash
docker-fundamentals run hello-world
```

Vous devriez voir le message de réussite de “Hello from Docker!”.

### **2.4. Intégration avec WSL 2**

- Vous pouvez installer des distributions Linux via le Microsoft Store (Ubuntu, Debian, etc.) et y accéder depuis Windows.
- Dans Docker Desktop, vous pouvez activer le support WSL pour chaque distribution installée.
- Ainsi, vous exécutez docker et docker compose **directement dans le shell** tout en profitant de la couche Docker Desktop.

---

## 3. Conseils et dépannage

1. **Garder Docker à jour**
   - Sur Linux, un simple `sudo apt-get update && sudo apt-get upgrade` mettra à jour Docker s’il y a de nouvelles versions.
   - Sur Windows, Docker Desktop se met généralement à jour automatiquement ou propose des mises à jour via l’interface graphique.

2. **Vérifier que le service Docker est actif**
   - Sous Linux : `systemctl status docker`.
   - Sous Windows : l’icône Docker Desktop doit être activé dans la zone de notification.

3. **Problèmes de permissions (Linux)**
   - Si vous avez des erreurs du type “Got permission denied while trying to connect…”, vérifiez que vous avez bien ajouté votre utilisateur au groupe docker (ou exécutez `sudo` si nécessaire).

4. **Conflits de ports**

- Si vous essayez de lancer un conteneur sur un port déjà utilisé, Docker retournera une erreur. Il suffit de choisir un autre port local (ex.: `-p 8080:80` au lieu de `-p 80:80`).
