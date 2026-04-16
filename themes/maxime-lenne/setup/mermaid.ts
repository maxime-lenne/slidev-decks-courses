import type { MermaidConfig } from 'mermaid'

export default function setup(): MermaidConfig {
  return {
    theme: 'dark',
    themeVariables: {
      // Maxime Lenne — palette steel-blue inspirée du deck genai-langchain
      primaryColor: '#457b9d',        // bleu acier — nœuds principaux
      primaryTextColor: '#f1f5f9',
      primaryBorderColor: '#457b9d',
      lineColor: '#457b9d',
      secondaryColor: '#1d3557',      // bleu nuit — nœuds secondaires
      tertiaryColor: '#123744',       // teal sombre — nœuds tertiaires

      // Fonds
      background: '#0f172a',
      mainBkg: '#1d3557',
      secondBkg: '#123744',

      // Texte
      textColor: '#cbd5e1',
      darkMode: true,

      // Nœuds (flowchart / graph)
      nodeBorder: '#457b9d',
      clusterBkg: '#123744',
      clusterBorder: '#457b9d',

      // Arêtes
      edgeLabelBackground: '#1d3557',

      // Diagrammes de séquence
      actorBorder: '#457b9d',
      actorBkg: '#1d3557',
      actorTextColor: '#f1f5f9',
      actorLineColor: '#457b9d',
      signalColor: '#94a3b8',
      signalTextColor: '#f1f5f9',
      activationBorderColor: '#457b9d',
      activationBkgColor: '#123744',
      sequenceNumberColor: '#f1f5f9',

      // Gantt
      gridColor: '#334155',
      todayLineColor: '#2563eb',

      // Git graph — nuances bleues + slate
      git0: '#457b9d',
      git1: '#1d3557',
      git2: '#1f2020',
      git3: '#123744',
      git4: '#475569',

      // Pie / timeline — palette ordonnée de la plus claire à la plus sombre
      pie1: '#457b9d',
      pie2: '#1d3557',
      pie3: '#123744',
      pie4: '#1f2020',
      pie5: '#475569',

      // Échelle de couleurs (timeline, quadrant, etc.)
      cScale0: '#457b9d',
      cScaleLabel0: '#f1f5f9',
      cScale1: '#1d3557',
      cScaleLabel1: '#f1f5f9',
      cScale2: '#1f2020',
      cScaleLabel2: '#f1f5f9',
      cScale3: '#123744',
      cScaleLabel3: '#f1f5f9',
      cScale4: '#475569',
      cScaleLabel4: '#f1f5f9',
      cScale5: '#334155',
      cScaleLabel5: '#f1f5f9',

      // Diagrammes de classes
      classText: '#f1f5f9',
    },
    logLevel: 'error',
    securityLevel: 'loose',
    startOnLoad: true,
    arrowMarkerAbsolute: false,
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true,
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d',
    },
  }
}
