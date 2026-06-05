---
layout: section
---

# Take-aways

<div class="text-lg opacity-70 mt-4">3 choses à retenir + Ressources</div>

---
layout: default
---

## Les 3 choses à retenir

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4">

<div class="text-3xl mb-2">📐</div>

#### Le contexte est le nouveau code

`CLAUDE.md` hiérarchique, **ADRs**, skills équipe. Tout ce qui aide l'agent vit **dans le repo**.

</div>

<div class="border-l-4 border-[#10b981] pl-4">

<div class="text-3xl mb-2">🛡️</div>

#### L'autonomie dépend de la vérification

Les **8 piliers** (Karpathy : *Software 2.0 automates what you can verify*). Sans tests + lints + types, pas de délégation.

</div>

<div class="border-l-4 border-[#e63946] pl-4">

<div class="text-3xl mb-2">🤝</div>

#### Agent = teammate, pas oracle

**Hooks** + **subagents** + **MCP** + **worktrees/sandbox** = stack 2026. C'est toi qui décides quand interagir.

</div>

</div>

<div class="text-center mt-8 text-[#457b9d] text-lg font-bold">

Lancez les 2 chantiers cette semaine.

</div>

<!--
- 3 cartes = 3 messages clés à mémoriser
- Si on retient une seule chose : le core message du deck = "le contexte est le nouveau code"
- Si on retient une seule action : scorer les 8 piliers de son projet ce soir
-->

---
layout: default
---

### Ressources — Téléchargements & lectures

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### À télécharger

- 📋 **[8 Pillars Checklist](https://github.com/upsun/8-pillars)** (Upsun, Apache V2)
- 📱 **LinkedIn Carousel** *Le pouvoir des hooks* — Maxime Lenne
- 📦 Frameworks spec-driven : [OpenSpec](https://github.com/openspec/openspec) · [Spec Kit](https://github.com/spec-kit/spec-kit) · [BMAD](https://github.com/bmad-method)

#### Lectures fondatrices

- 🧠 [Verifiability](https://karpathy.bearblog.dev/verifiability/) — Andrej Karpathy
- ⚖️ [Asymmetry of Verification](https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law) — Jason Wei

</div>

<div>

#### Documentation officielle

- [docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
- [cursor.com/docs](https://cursor.com/docs)
- [modelcontextprotocol.io](https://modelcontextprotocol.io)
- Standard ouvert : [agents.md](https://agents.md)

#### Decks compagnons

- 📦 `genai-llm-introduction` — bases LLM
- 📦 `genai-ai-engineer-mcp-deep-dive` — protocole MCP en profondeur
- 📦 `genai-ai-engineer-langchain` — création d'agents

</div>

</div>

<!--
- Préparer un QR code ou un raccourci pour les ressources (Notion partagée ou GitHub gist)
- Les decks compagnons sont les prochaines étapes selon le profil (Builder → Engineer)
- LinkedIn carousel : pour ceux qui veulent un teaser sharable, c'est l'asset parfait
-->

---
layout: default
---

### Communauté & veille

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">

<div>

#### Communautés actives

- **Discord MCP** (50k+ membres)
- **r/ClaudeAI** + **r/cursor**
- **Discord Cursor / Claude Code**
- **GitHub Discussions** (chaque outil)

#### Newsletters & blogs

- [Shubham Sharma](https://shubhamsharma.dev) — guides agentic 2026
- [Hoko Blog](https://hoko.team) — comparatifs frameworks
- [latent.space](https://latent.space) — podcast

</div>

<div>

#### Suivre l'écosystème

- [The 2026 Agentic Coding Trends Report](https://...) — annuel
- [Anthropic Engineering Blog](https://www.anthropic.com/engineering)
- Releases Claude Code & Cursor (chaque mois → nouvelles features)

#### À ne pas rater

- **Cloud Agents** (Cursor, Anthropic) — explosion 2026
- **Plugin marketplaces** — Cursor v2.5
- **Standard `.agents/skills/`** — convergence multi-plateforme

</div>

</div>

<!--
- Le marché évolue très vite : il faut une veille hebdo, pas mensuelle
- Recommandation : créer un canal Slack interne #agentic-coding pour partager les découvertes
- Pour les sceptiques : leur faire suivre Shubham Sharma + Hoko Blog 1 mois, ils changent d'avis
-->

---
layout: cover
background: https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/92 via-[#0f172a]/80 to-[#1d3557]/85" />

<div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">

<h1 class="text-7xl font-black mb-6">
Merci !
</h1>

<div class="text-[#457b9d] text-2xl font-bold uppercase mb-6">Questions ?</div>

<div class="text-xl max-w-3xl text-[#457b9d] font-bold">
On a parcouru : context engineering · stack · skills · hooks ·<br/>
MCP · spec-driven · 8 piliers · 2 chantiers
</div>

<div class="text-sm opacity-60 mt-12 max-w-2xl">
Vos questions — et surtout : <strong>par où vous allez commencer demain</strong> ?
</div>

</div>

<!--
- Slide Q&A — laisser 5+ min minimum
- Question piège utile à poser à la salle : "quel chantier en premier dans VOTRE équipe ?"
- Si silence : démarrer par une question qui ouvre, ex : "qui ici a déjà un CLAUDE.md hiérarchique ?"
-->

---
src: ../../templates/slides.md#2
---
