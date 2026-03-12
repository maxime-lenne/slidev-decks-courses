#!/usr/bin/env node

/**
 * Production build script for multi-deck Slidev project.
 *
 * Builds each deck with its own --base path, then builds the index.
 * Thumbnails (cover.png) are copied explicitly since they are not public/ assets.
 *
 * Usage:
 *   BASE_PATH=/slidev-simplon/ node scripts/build.js   → GitHub Pages
 *   node scripts/build.js                               → local preview (base = /)
 *
 * Output: dist/
 *   index.html + assets/     ← index Slidev app
 *   decks/{id}/              ← each deck Slidev app
 *   decks/{id}/assets/cover.png  ← thumbnail
 */

import { spawn } from 'child_process'
import { readdirSync, existsSync, mkdirSync, cpSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const DECKS_DIR = resolve(projectRoot, 'decks')
const DIST_DIR = resolve(projectRoot, 'dist')

// Normalize BASE_PATH: must start and end with '/'
const rawBase = process.env.BASE_PATH || '/'
const BASE_PATH = ('/' + rawBase.replace(/^\/|\/$/g, '') + '/').replace(/^\/\/$/, '/')

// ─── helpers ────────────────────────────────────────────────────────────────

function getDecks() {
  return readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && existsSync(resolve(DECKS_DIR, e.name, 'slides.md')))
    .map(e => e.name)
    .sort()
}

function run(cmd, args = []) {
  return new Promise((res, rej) => {
    console.log(`  $ ${cmd} ${args.join(' ')}`)
    const proc = spawn(cmd, args, { cwd: projectRoot, stdio: 'inherit' })
    proc.on('error', rej)
    proc.on('exit', code => code === 0 ? res() : rej(new Error(`${cmd} exited with code ${code}`)))
  })
}

// ─── main ────────────────────────────────────────────────────────────────────

console.log(`\n🔨  Multi-deck build   BASE_PATH="${BASE_PATH}"`)

// 1. Clean dist/
if (existsSync(DIST_DIR)) {
  console.log('\n🗑️  Cleaning dist/...')
  rmSync(DIST_DIR, { recursive: true })
}

// 2. Generate index data (meta.json → index-data.json)
console.log('\n📋  Generating index data...')
await run('./scripts/generate-index.sh')

// 3. Build index Slidev app first (creates dist/)
console.log(`\n🏠  Building index   (base: ${BASE_PATH})`)
await run('bunx', [
  'slidev', 'build',
  resolve(projectRoot, 'index/slides.md'),
  '--base', BASE_PATH,
  '--out', DIST_DIR,
])

// 4. Build each deck
const decks = getDecks()
console.log(`\n📊  Building ${decks.length} decks...`)

for (const id of decks) {
  const base = `${BASE_PATH}decks/${id}/`
  const out = resolve(DIST_DIR, 'decks', id)
  console.log(`\n  ▸ ${id}   (base: ${base})`)

  await run('bunx', [
    'slidev', 'build',
    resolve(DECKS_DIR, id, 'slides.md'),
    '--base', base,
    '--out', out,
  ])

  // Copy cover thumbnail — not a public/ asset, Vite won't include it automatically
  const src = resolve(DECKS_DIR, id, 'assets', 'cover.png')
  if (existsSync(src)) {
    const destDir = resolve(out, 'assets')
    mkdirSync(destDir, { recursive: true })
    cpSync(src, resolve(destDir, 'cover.png'))
    console.log(`    ✓ thumbnail copied`)
  }
}

console.log('\n✅  Build complete → dist/\n')
