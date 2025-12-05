#!/usr/bin/env node

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Initialize Ajv with formats support
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schema
const schemaPath = join(rootDir, 'specs/001-multi-deck-index/contracts/deck-metadata.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const validate = ajv.compile(schema);

// Find all meta.json files in decks/
const decksDir = join(rootDir, 'decks');
let errors = [];
let validCount = 0;

try {
  const deckDirs = readdirSync(decksDir).filter(name => {
    const fullPath = join(decksDir, name);
    return statSync(fullPath).isDirectory();
  });

  for (const deckDir of deckDirs) {
    const metaPath = join(decksDir, deckDir, 'meta.json');

    try {
      const data = JSON.parse(readFileSync(metaPath, 'utf8'));
      const valid = validate(data);

      if (!valid) {
        errors.push({
          file: `decks/${deckDir}/meta.json`,
          errors: validate.errors
        });
      } else {
        validCount++;
        console.log(`✅ decks/${deckDir}/meta.json - Valid`);
      }
    } catch (err) {
      errors.push({
        file: `decks/${deckDir}/meta.json`,
        errors: [{ message: `Failed to read or parse: ${err.message}` }]
      });
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ Validation errors found:\n');
    errors.forEach(({ file, errors: errs }) => {
      console.error(`  ${file}:`);
      errs.forEach(err => {
        console.error(`    - ${err.instancePath || 'root'}: ${err.message}`);
      });
    });
    process.exit(1);
  }

  console.log(`\n✅ All ${validCount} deck metadata files are valid`);
  process.exit(0);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('ℹ️  No decks directory found yet - this is normal for initial setup');
    process.exit(0);
  }
  throw err;
}
