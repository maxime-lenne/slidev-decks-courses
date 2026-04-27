---
layout: section
---

# Installation

<!--
Les apprenants suivent en même temps sur leur machine
Prévoir du temps pour les problèmes d'installation
-->

---

### Installation Linux (Ubuntu / Debian)

```bash {1-3|5-7|9|11|all}
# 1. Prérequis
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# 2. Clé GPG officielle Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 3. Ajouter le dépôt Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Installer Docker Engine + Compose + Buildx
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

<!--
Étapes classiques pour Ubuntu/Debian
Pour Fedora/CentOS : remplacer apt par dnf/yum et adapter les URLs
-->

---

### Installation Windows (Docker Desktop + WSL2)

<v-clicks>

1. **Activer WSL2** (PowerShell en admin) :

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

1. **Redémarrer** la machine
2. **Télécharger Docker Desktop** depuis le site officiel
3. Cocher **"Enable WSL 2 Features"** pendant l'installation
4. Au premier démarrage → choisir **WSL 2** comme backend

</v-clicks>

<!--
Windows 10 Pro/Enterprise 2004+ ou Windows 11 requis
Au moins 4 Go de RAM et 2 CPU recommandés
-->

---

### Vérification & premiers pas

```bash {1-2|4-5|7-8|all}
# Vérifier l'installation
docker version

# Informations complètes sur Docker
docker info

# Tester avec l'image hello-world
docker run hello-world
```

<v-click>

<div class="highlight-box mt-4">
  ✅ Si vous voyez <strong>"Hello from Docker!"</strong>, Docker fonctionne correctement.
</div>

</v-click>

<!--
Prendre le temps de vérifier que tout le monde a un Docker fonctionnel
C'est le moment de résoudre les problèmes d'installation
-->

---

### Droits d'accès & dépannage

<v-clicks>

- **Éviter `sudo` à chaque commande** (Linux) :

```bash
sudo usermod -aG docker $USER
# Puis déconnecter/reconnecter le terminal
```

- **"Permission denied"** → vérifiez le groupe docker
- **"Port already in use"** → changez le port local (`-p 8081:80`)
- **Service inactif** (Linux) :

```bash
sudo systemctl enable docker && sudo systemctl start docker
```

- **Docker Desktop** (Windows) → vérifiez l'icône baleine dans la barre des tâches

</v-clicks>

<!--
Les problèmes de permissions sont très fréquents chez les débutants Linux
-->
