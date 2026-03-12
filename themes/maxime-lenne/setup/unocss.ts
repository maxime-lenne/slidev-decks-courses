import type { UnoConfig } from 'unocss'
import { presetAttributify, presetUno } from 'unocss'

export default function setup(): UnoConfig {
  return {
    presets: [
      presetUno(),
      presetAttributify(),
    ],
    shortcuts: {
      'gradient-text': 'bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent',
      'gradient-bg': 'bg-gradient-to-br from-blue-600 to-green-500',
    },
    theme: {
      fontFamily: {
        sans: 'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
        mono: 'SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace',
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
      },
    },
  }
}
