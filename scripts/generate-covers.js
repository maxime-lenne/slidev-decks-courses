#!/usr/bin/env node

/**
 * Generate cover images for all decks by screenshotting the first slide.
 *
 * Usage:
 *   bun run generate-covers               → all decks
 *   bun run generate-covers -- api        → single deck
 *
 * Requires playwright chromium:
 *   bunx playwright install chromium
 */

import { spawn } from 'child_process'
import { readdirSync, existsSync, mkdirSync, renameSync, rmSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const DECKS_DIR = resolve(projectRoot, 'decks')
const COVER_FILENAME = 'cover.png'
const COVER_META_PATH = `./assets/${COVER_FILENAME}`

function getAvailableDecks() {
  return readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .filter(name => existsSync(resolve(DECKS_DIR, name, 'slides.md')))
    .sort()
}

function updateMetaThumbnail(deckName) {
  const metaPath = resolve(DECKS_DIR, deckName, 'meta.json')
  if (!existsSync(metaPath)) return

  const meta = JSON.parse(readFileSync(metaPath, 'utf-8'))
  if (meta.thumbnail === COVER_META_PATH) return

  meta.thumbnail = COVER_META_PATH
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n')
  console.log(`    meta.json updated → thumbnail: "${COVER_META_PATH}"`)
}

function runExport(slidePath, outputBase) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'bunx',
      ['slidev', 'export', slidePath, '--format', 'png', '--output', outputBase, '--range', '1', '--wait-until', 'networkidle', '--wait', '2000', '--timeout', '60000'],
      { cwd: projectRoot, stdio: 'pipe' }
    )

    let stderr = ''
    proc.stderr.on('data', d => { stderr += d.toString() })

    proc.on('error', reject)
    proc.on('exit', code => {
      if (code !== 0) reject(new Error(`slidev export exited ${code}\n${stderr}`))
      else resolve()
    })
  })
}

function findExportedFile(assetsDir, base) {
  // Slidev may produce: cover.png, cover-1.png, cover-001.png, or cover/1.png (directory)
  for (const candidate of [`${base}.png`, `${base}-1.png`, `${base}-001.png`]) {
    const full = resolve(assetsDir, candidate)
    if (existsSync(full)) return { file: full, dir: null }
  }
  // Slidev creates a cover/ directory with 1.png inside
  const dir = resolve(assetsDir, base)
  for (const inner of ['1.png', '001.png']) {
    const full = resolve(dir, inner)
    if (existsSync(full)) return { file: full, dir }
  }
  return null
}

async function generateCover(deckName) {
  const slidePath = resolve(DECKS_DIR, deckName, 'slides.md')
  const assetsDir = resolve(DECKS_DIR, deckName, 'assets')
  const outputBase = resolve(assetsDir, 'cover')
  const finalPath = resolve(assetsDir, COVER_FILENAME)

  if (!existsSync(assetsDir)) mkdirSync(assetsDir, { recursive: true })

  // Clean up any previous export artifacts so findExportedFile doesn't pick up stale files
  for (const stale of [`${outputBase}.png`, `${outputBase}-1.png`, `${outputBase}-001.png`]) {
    if (existsSync(stale)) rmSync(stale)
  }
  if (existsSync(outputBase) && !outputBase.endsWith('.png')) rmSync(outputBase, { recursive: true })

  console.log(`\n  ${deckName}`)

  await runExport(slidePath, outputBase)

  // Rename to cover.png if Slidev added a slide number suffix
  const exported = findExportedFile(assetsDir, 'cover')
  if (!exported) throw new Error(`No output file found in ${assetsDir}`)

  if (exported.file !== finalPath) renameSync(exported.file, finalPath)
  if (exported.dir) rmSync(exported.dir, { recursive: true })

  console.log(`    → ${finalPath.replace(projectRoot + '/', '')}`)

  updateMetaThumbnail(deckName)
}

// --- Main ---

const deckArgs = process.argv.slice(2).filter(a => !a.startsWith('--'))
const allDecks = getAvailableDecks()

const decksToProcess = deckArgs.length > 0
  ? deckArgs.filter(d => {
      if (!allDecks.includes(d)) { console.warn(`Warning: deck "${d}" not found, skipping`); return false }
      return true
    })
  : allDecks

if (decksToProcess.length === 0) { console.error('No valid decks to process.'); process.exit(1) }

console.log(`Generating covers for ${decksToProcess.length} deck(s)...`)
console.log('(requires: bunx playwright install chromium)\n')

let ok = 0, fail = 0
for (const deck of decksToProcess) {
  try {
    await generateCover(deck)
    ok++
  } catch (err) {
    console.error(`    ✗ ${err.message}`)
    fail++
  }
}

console.log(`\nDone — ${ok} generated${fail > 0 ? `, ${fail} failed` : ''}.`)
if (ok > 0) console.log('Run "bun run generate-index" to refresh index-data.json.')
