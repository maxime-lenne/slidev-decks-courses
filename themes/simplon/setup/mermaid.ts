import type { MermaidConfig } from 'mermaid'

export default function setup(): MermaidConfig {
  return {
    theme: 'dark',
    themeVariables: {
      // Simplon brand colors for dark theme
      primaryColor: '#f26f5c',
      primaryTextColor: '#fff',
      primaryBorderColor: '#f26f5c',
      lineColor: '#f26f5c',
      secondaryColor: '#123744',
      tertiaryColor: '#5eead4',

      // Background colors
      background: '#1e293b',
      mainBkg: '#1e293b',
      secondBkg: '#0f172a',

      // Text colors
      textColor: '#cbd5e1',
      darkMode: true,

      // Node colors
      nodeBorder: '#f26f5c',
      clusterBkg: '#123744',
      clusterBorder: '#f26f5c',

      // Edge colors
      edgeLabelBackground: '#1e293b',

      // Activity diagram
      actorBorder: '#f26f5c',
      actorBkg: '#123744',
      actorTextColor: '#cbd5e1',
      actorLineColor: '#f26f5c',
      signalColor: '#cbd5e1',
      signalTextColor: '#cbd5e1',

      // Sequence diagram
      activationBorderColor: '#f26f5c',
      activationBkgColor: '#123744',
      sequenceNumberColor: '#fff',

      // Gantt chart
      gridColor: '#334155',
      todayLineColor: '#ce0033',

      // Git graph
      git0: '#f26f5c',
      git1: '#5eead4',
      git2: '#ce0033',
      git3: '#123744',
      git4: '#cbd5e1',

      // Pie chart
      pie1: '#f26f5c',
      pie2: '#123744',
      pie3: '#5eead4',
      pie4: '#ce0033',
      pie5: '#cbd5e1',

      // Class diagram
      classText: '#cbd5e1',
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
