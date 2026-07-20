---
layout: section-liquid
---

## Conclusion

<div class="text-lg opacity-70 mt-4">3 key Take-aways - Ressources - Next Steps</div>

---
layout: default
---

<h3 class="text-3xl mb-4">3 key Take-aways</h3>

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

#### Spec Driven Development

Avec l'IA, la spécification est une étape **indispensable** ! PRD, Plan, framework avancé (BMAD, OpenSpec...)

</div>

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

- 📋 **[8 Pillars Checklist](https://gist.github.com/maxime-lenne/dfce6ebe9f039c8b8bc1ea62b5f52be0)** (Upsun, Apache V2)
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

- 📦 [GenAI et LLM - introduction](https://decks.maxime-lenne.fr/decks/genai-llm-introduction)
- 📦 [protocole MCP en profondeur](https://decks.maxime-lenne.fr/decks/genai-ai-engineer-mcp-deep-dive)
- 📦 [LangChain LangGraph - introduction](https://decks.maxime-lenne.fr/decks/genai-ai-engineer-langchain)

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
- Pour les sceptiques : leur faire suivre Shubham Sharma 1 mois, ils changent d'avis
-->

---
layout: default
---

### Les 2 Next Steps

<br>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">

<div class="border-l-4 border-[#457b9d] pl-4 bg-[#457b9d]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🏗️</div>

#### Chantier 1 — Contexte

Construire le contexte de **tous vos projets**.

- `CLAUDE.md` hiérarchique (racine + sous-dossiers)
- Memory files `docs/*.md`
- Choix de Skills propres au besoin **entreprise / projet / persona / workflow**
- Choix MCPs propres au besoin **entreprise / projet / persona / workflow**
- ADRs pour les décisions clés et PRDs pour les features

</div>

<div class="border-l-4 border-[#10b981] pl-4 bg-[#10b981]/10 py-3 pr-4 rounded">

<div class="text-3xl mb-2">🔄</div>

#### Chantier 2 — Vérification

Organiser & automatiser la boucle de **vérification**.

- Audit **8 piliers**
- Mettre en place le tooling permettant la vérification : tests, lint, types, build, observability
- Éviter les dérapages : hooks + subagent reviewer

</div>

</div>

<!--
- Reformuler les 2 CTA après tout le contenu — c'est maintenant qu'ils prennent leur sens
- Insister sur la complémentarité : ce sont deux jambes d'un même corps
- Chantier 1 = quoi/comment l'agent code. Chantier 2 = qui valide ce qu'il code.
-->

---
layout: default
---

### Chantier 1 — Construire le contexte

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Actions concrètes

1. **Créer** les `CLAUDE.md` dans vos projets (Hiérarchique si besoin)
2. **Identifier** 3-5 patterns récurrents → choisir / créer des **skills**
3. **Identifier et sélectionner** les MCP indispensable (max 3 enable par projet) et CLI
4. **Commiter** dans `.claude/skills/` et `.claude/commands/`
5. **Documenter** vos projets (memory files dans `docs/`) et les décisions structurantes en **ADRs**

</div>

<div>

#### Pièges à éviter

- ❌ Un seul `CLAUDE.md` géant à la racine
- ❌ Duplication entre niveaux
- ❌ Skills à description trop vague (ne se déclenchent jamais)
- ❌ ADRs en wiki externe (l'agent ne les lit pas)

<div class="text-xs opacity-70 mt-3">

**Règle d'or** : tout ce qui aide l'agent vit **dans le repo**.

</div>

</div>

</div>

<!--
- Le piège #1 : "j'ai mis tout mon contexte dans CLAUDE.md" → trop gros, l'agent perd l'attention
- Le piège #4 : décisions documentées dans Notion/Confluence → l'agent ne les voit pas, refait les mêmes débats
- Pour démarrer : commencer petit, itérer chaque semaine
-->

---
layout: default
---

### Chantier 2 — Organiser la vérification

<br>

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">

<div>

#### Actions concrètes

1. **Evaluer** les 8 piliers de la vérifications
2. **Identifier** les piliers les plus faibles
3. **Mettre en place** le tooling correspondant :
   - Tests faibles → pre-commit hook + subagent test-writer
   - Build flaky → CI deterministe + dependency lock
   - Quality faible → linter strict + subagent reviewer
4. **Itérer** par sprint (1 sprint = 1 pilier amélioré)

</div>

<div>

#### Outils du deck à mobiliser

- **Hooks** PreToolUse (bloquer rm -rf, secrets)
- **Hooks** PostToolUse (lint, format, build)
- **Subagent reviewer** déclenché PROACTIVELY
- **Subagent test-writer** sur les fichiers modifiés
- **MCP Sentry/Grafana** pour l'observability
- **Spec-driven** workflow pour la documentation

</div>

</div>

<!--
- Le scoring est plus important que la perfection : savoir où on en est >> tout faire parfaitement
- Pour les 2 piliers prioritaires : 1 atelier équipe + 1 sprint dédié = ça avance vraiment
- Mesurer 6 mois plus tard pour voir l'évolution
-->

---
layout: cover
background: <https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920>
---

<ThankYou deck-slug="genai-agentic-coding" />

---
src: ../../templates/slides.md#2
---
