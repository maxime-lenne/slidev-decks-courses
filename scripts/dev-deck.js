#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
let deckName = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--deck' && i + 1 < args.length) {
    deckName = args[i + 1];
    break;
  } else if (args[i].startsWith('--deck=')) {
    deckName = args[i].substring(7);
    break;
  }
}

if (!deckName) {
  console.error('Error: --deck parameter is required');
  console.error('Usage: npm run dev:deck -- --deck <deck-name>');
  console.error('Example: npm run dev:deck -- --deck example-sql-basics');
  process.exit(1);
}

const slidePath = resolve(projectRoot, 'decks', deckName, 'slides.md');

if (!existsSync(slidePath)) {
  console.error(`Error: Deck not found at ${slidePath}`);
  console.error(`Available decks should be in the decks/ directory`);
  process.exit(1);
}

console.log(`Starting Slidev dev server for deck: ${deckName}`);
console.log(`Slide path: ${slidePath}\n`);

// Launch slidev with the slide path
const slidev = spawn('npx', ['slidev', slidePath], {
  cwd: projectRoot,
  stdio: 'inherit'
});

slidev.on('error', (error) => {
  console.error('Failed to start slidev:', error);
  process.exit(1);
});

slidev.on('exit', (code) => {
  process.exit(code || 0);
});
