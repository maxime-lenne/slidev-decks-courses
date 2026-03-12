#!/usr/bin/env node

/**
 * Unified dev server script
 *
 * Usage:
 *   bun run dev                        → all decks + index
 *   bun run dev -- api                 → single deck (no index)
 *   bun run dev -- api langchain       → specific decks + index
 *   bun run dev -- --all               → explicit all mode
 */

import { spawn } from 'child_process';
import { readdirSync, existsSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const DECKS_DIR = resolve(projectRoot, 'decks');
const BASE_PORT = 3001;
const INDEX_PORT = 3000;

function getAvailableDecks() {
  return readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .filter(name => existsSync(resolve(DECKS_DIR, name, 'slides.md')))
    .sort();
}

function startSingleDeck(deckName) {
  const slidePath = resolve(DECKS_DIR, deckName, 'slides.md');

  if (!existsSync(slidePath)) {
    const available = getAvailableDecks();
    console.error(`Error: deck "${deckName}" not found.`);
    console.error(`Available decks: ${available.join(', ')}`);
    process.exit(1);
  }

  console.log(`Starting Slidev for deck: ${deckName}`);
  console.log(`→ http://localhost:3030\n`);

  const proc = spawn('npx', ['slidev', slidePath], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  proc.on('error', err => { console.error('Failed to start slidev:', err); process.exit(1); });
  proc.on('exit', code => process.exit(code || 0));
}

function startMultiDeck(decksToStart) {
  const processes = [];
  const deckPorts = {};

  console.log(`Starting ${decksToStart.length} deck(s) + index\n`);

  decksToStart.forEach((deck, index) => {
    const port = BASE_PORT + index;
    const slidePath = resolve(DECKS_DIR, deck, 'slides.md');
    deckPorts[deck] = port;

    console.log(`  • ${deck} → http://localhost:${port}`);

    const proc = spawn('npx', ['slidev', slidePath, '--port', String(port)], {
      cwd: projectRoot,
      stdio: 'pipe',
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    proc.stdout.on('data', data => {
      data.toString().split('\n')
        .filter(l => l.includes('http://localhost'))
        .forEach(l => console.log(`[${deck}] ${l}`));
    });
    proc.stderr.on('data', data => console.error(`[${deck}] ${data}`));
    proc.on('error', err => console.error(`[${deck}] Failed to start:`, err));

    processes.push({ name: deck, process: proc });
  });

  // Write proxy config for Vite index
  const proxyConfigContent = `// Auto-generated — do not edit manually\nexport default ${JSON.stringify(deckPorts, null, 2)}\n`;
  writeFileSync(resolve(projectRoot, 'vite.proxy.config.js'), proxyConfigContent);
  writeFileSync(resolve(projectRoot, 'index/public/deck-ports.json'), JSON.stringify(deckPorts, null, 2));

  // Start index server after a short delay
  setTimeout(() => {
    console.log(`\n  • index    → http://localhost:${INDEX_PORT}\n`);

    const vite = spawn('bunx', ['slidev', resolve(projectRoot, 'index/slides.md'), '--port', String(INDEX_PORT)], {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    vite.on('error', err => console.error('Failed to start index server:', err));
    processes.push({ name: 'index', process: vite });

    setTimeout(() => {
      console.log('\n' + '─'.repeat(50));
      console.log(`Index:  http://localhost:${INDEX_PORT}`);
      decksToStart.forEach(deck => console.log(`  ${deck}: http://localhost:${deckPorts[deck]}`));
      console.log('─'.repeat(50));
      console.log('Press Ctrl+C to stop all servers\n');
    }, 2000);
  }, 3000);

  const cleanup = () => {
    console.log('\nShutting down...');
    processes.forEach(({ process: p }) => p.kill());
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

// --- Main ---

const rawArgs = process.argv.slice(2);
const flags = rawArgs.filter(a => a.startsWith('--'));
const deckArgs = rawArgs.filter(a => !a.startsWith('--'));
const forceAll = flags.includes('--all');
const allDecks = getAvailableDecks();

if (forceAll || deckArgs.length === 0) {
  // All mode
  startMultiDeck(allDecks);
} else if (deckArgs.length === 1) {
  // Single deck mode — no index
  startSingleDeck(deckArgs[0]);
} else {
  // Multiple specific decks + index
  const invalid = deckArgs.filter(d => !allDecks.includes(d));
  if (invalid.length > 0) {
    console.error(`Unknown deck(s): ${invalid.join(', ')}`);
    console.error(`Available: ${allDecks.join(', ')}`);
    process.exit(1);
  }
  startMultiDeck(deckArgs);
}
