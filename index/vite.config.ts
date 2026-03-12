import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// Proxy config for thumbnails — proxies /decks/{id}/ to each deck's Slidev dev server
export default defineConfig(async () => {
  const proxyConfig: Record<string, any> = {}
  const proxyConfigPath = path.resolve(projectRoot, 'vite.proxy.config.js')

  if (fs.existsSync(proxyConfigPath)) {
    try {
      const { default: deckPorts } = await import(`${proxyConfigPath}?t=${Date.now()}`)
      Object.entries(deckPorts).forEach(([deck, port]) => {
        proxyConfig[`^/decks/${deck}/`] = {
          target: `http://localhost:${port}`,
          changeOrigin: true,
          rewrite: (p: string) => p.replace(`/decks/${deck}`, ''),
        }
      })
    } catch {
      // No proxy config yet (single deck mode or first run)
    }
  }

  return { server: { proxy: proxyConfig } }
})
