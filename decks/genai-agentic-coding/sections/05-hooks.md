---
layout: section
---

## Hooks : fermer la boucle

<div class="text-lg opacity-70 mt-4">12 min · agent = vrai teammate</div>

---
layout: default
---

### Les agents ne sont pas autonomes à 100%

<br>

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#e63946] pl-4">

#### 👀 Tu gardes un œil dessus en permanence

Impossible de vraiment passer à autre chose — tu attends de pouvoir valider.

</div>

<div class="border-l-4 border-[#f59e0b] pl-4">

#### ⏳ Tu surveilles sans savoir quand intervenir

Tu attends... ou tu rates le bon moment.

</div>

<div class="border-l-4 border-[#457b9d] pl-4">

#### 😵 Ça casse ton flow

L'agent t'interrompt, pas l'inverse.

</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 mt-8 text-base max-w-3xl mx-auto">

💡 **Le vrai sujet, c'est le timing humain** — pas la puissance de l'agent.

</div>

<!--
- Tiré directement du carousel LinkedIn — réutiliser la formulation, elle marche
- L'expérience que tout dev a vécue : "je laisse l'agent tourner et je vais faire autre chose"... puis 2 min après on revient checker
- Les hooks transforment cette boucle : agent t'appelle quand IL a besoin, toi tu restes concentré
-->

---
layout: default
---

### Les hooks déclenchent des actions / scripts

<br>

➡️ **Ton agent devient proactif** = interaction au bon moment.

<br>

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#e63946] pl-4 flex justify-between items-center">

<div>

🔐 **`permission_prompt`**

</div>
<div class="text-[#457b9d]">→ validation humaine requise</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-4 flex justify-between items-center">

<div>

❓ **`elicitation_dialog`**

</div>
<div class="text-[#457b9d]">→ besoin d'info supplémentaire</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 flex justify-between items-center">

<div>

✅ **`Stop`**

</div>
<div class="text-[#457b9d]">→ tâche terminée</div>

</div>

</div>

<div class="text-sm opacity-70 mt-8 text-center max-w-3xl mx-auto">

3 autres patterns courants : <strong>PreToolUse</strong> (bloquer une commande), <strong>PostToolUse</strong> (lint auto), <strong>Notification</strong> (générique).

</div>

<!--
- Hooks déclenchés sur des événements précis du cycle de vie de l'agent
- PreToolUse + matcher "Bash" + check "rm -rf" = filet de sécurité absolu
- PostToolUse + matcher "Edit" + commande "prettier --write" = formatage auto sans demander
-->

---
layout: default
---

### Setup rapide en 2 minutes

<br>

<div class="grid grid-cols-1 gap-3 mt-4 text-sm max-w-3xl mx-auto">

<div class="border-l-4 border-[#10b981] pl-4 flex items-center gap-4">

<div class="text-2xl font-bold text-[#10b981]">1</div>
<div class="flex-1"><strong>Ouvre Claude Code CLI</strong></div>
<div class="text-xs opacity-60">Terminal</div>

</div>

<div class="border-l-4 border-[#457b9d] pl-4 flex items-center gap-4">

<div class="text-2xl font-bold text-[#457b9d]">2</div>
<div class="flex-1">Tape <code>/hooks</code></div>
<div class="text-xs opacity-60">Commande</div>

</div>

<div class="border-l-4 border-[#10b981] pl-4 flex items-center gap-4">

<div class="text-2xl font-bold text-[#10b981]">3</div>
<div class="flex-1"><strong>Matcher</strong> : <code>*</code> ou ciblé (ex : <code>permission_prompt</code>)</div>
<div class="text-xs opacity-60">Config</div>

</div>

<div class="border-l-4 border-[#f59e0b] pl-4 flex items-center gap-4">

<div class="text-2xl font-bold text-[#f59e0b]">4</div>
<div class="flex-1"><strong>Ajoute ta commande shell</strong> — notif, son, script...</div>
<div class="text-xs opacity-60">Flexible</div>

</div>

</div>

<div class="text-center mt-8 text-base text-[#10b981] font-bold">

✓ Done — ton agent notifie maintenant.

</div>

<!--
- /hooks ouvre un éditeur interactif, mais tu peux aussi éditer ~/.claude/settings.json directement
- Le matcher * intercepte tous les events — utile pour debug, mais bruyant en prod
- Ciblé : "permission_prompt" pour notif uniquement quand l'agent demande validation
-->

---
layout: default
---

### Exemple : notification macOS

<br>

```json {all|2-4|5|6-9|all}
"hooks": {
  "Notification": [{
    "matcher": "permission_prompt",
    "hooks": [{
      "type": "command",
      "command": "osascript -e 'display notification \"Human, I need your permission\" with title \"Claude \"'",
      "async": true
    }]
  }]
}
```

<div class="grid grid-cols-3 gap-3 mt-6 text-sm">

<div class="border-l-2 border-[#10b981] pl-3">

🔔 **Notif système native**

</div>

<div class="border-l-2 border-[#457b9d] pl-3">

🎯 **Message dynamique via JSON**

</div>

<div class="border-l-2 border-[#f59e0b] pl-3">

⚡ **Plug & play**

</div>

</div>

<!--
- osascript = la voie native macOS. Pour Linux : notify-send. Pour Windows : msg ou PowerShell
- async: true = ne bloque pas l'agent, le hook s'exécute en parallèle
- On peut chaîner plusieurs commandes dans le même hook (notif + son + log)
-->

---
layout: default
---

### Hack signature : voix synthétique

<br>

```json {all|4|5|all}
"hooks": {
  "Notification": [{
    "matcher": "elicitation_dialog",
    "hooks": [{
      "type": "command",
      "command": "say -v Zarvox 'Human, I need more information'",
      "async": true
    }]
  }]
}
# → plusieurs voix dispo : Zarvox, Trinoids, Organ, Whisper, Boing...
```

<div class="grid grid-cols-3 gap-3 mt-6 text-sm">

<div class="border-l-2 border-[#10b981] pl-3">

🎧 **Impossible à rater**

</div>

<div class="border-l-2 border-[#457b9d] pl-3">

🧠 **Moins de charge mentale**

</div>

<div class="border-l-2 border-[#f59e0b] pl-3">

🤝 **Agent = vrai teammate**

</div>

</div>

<!--
- Test : say -v Zarvox 'Hello human' depuis ton terminal
- Pourquoi Zarvox : voix robot/alien très distincte, impossible à rater entre 2 réunions
- Bonus perso : si tu travailles de chez toi, tes enfants vont adorer
- Variantes utiles : voice + chime pour multi-canaux (audio + visuel)
-->
