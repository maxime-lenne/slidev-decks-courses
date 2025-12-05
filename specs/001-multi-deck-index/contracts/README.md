# API Contracts - Multi-Deck Slidev Project

This directory contains JSON Schema definitions for data structures used throughout the multi-deck Slidev project.

## Schemas

### 1. `deck-metadata.schema.json`
Defines the structure for `meta.json` files that describe each slide deck.

**Used by:**
- Individual deck `meta.json` files in `decks/{deck-id}/meta.json`
- Validation scripts
- Index generation scripts

**Validates:**
- Deck identification and metadata
- Learning objectives and prerequisites
- Publication status and versioning
- Author information and dates

### 2. `index-data.schema.json`
Defines the structure for the consolidated index catalog generated at build time.

**Used by:**
- `scripts/generate-index.sh` (generates this file)
- Index page application (consumes this file)
- CI/CD validation steps

**Contains:**
- Array of published deck metadata
- Aggregate statistics (total decks, duration, languages, themes, tags)
- Generation timestamp and version

### 3. `theme-package.schema.json`
Defines the structure for Slidev theme `package.json` files.

**Used by:**
- Theme directories in `themes/{theme-name}/package.json`
- Theme validation and publishing scripts

**Validates:**
- Theme naming conventions (must start with `slidev-theme-`)
- Required keywords for Slidev theme discovery
- Engine compatibility declarations
- Slidev-specific configuration (defaults, color schema)

## Usage

### Validation with Ajv

```bash
npm install -g ajv-cli

# Validate a deck metadata file
ajv validate -s contracts/deck-metadata.schema.json -d decks/sql-basics/meta.json

# Validate the generated index data
ajv validate -s contracts/index-data.schema.json -d index/public/index-data.json

# Validate a theme package
ajv validate -s contracts/theme-package.schema.json -d themes/simplon/package.json
```

### Validation Script Integration

```javascript
// scripts/validate-metadata.js
const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');
const glob = require('glob');

const deckSchema = require('../specs/001-multi-deck-index/contracts/deck-metadata.schema.json');
const validate = ajv.compile(deckSchema);

// Find all meta.json files
const metaFiles = glob.sync('decks/*/meta.json');

let errors = [];
metaFiles.forEach(file => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const valid = validate(data);

  if (!valid) {
    errors.push({ file, errors: validate.errors });
  }
});

if (errors.length > 0) {
  console.error('Validation errors:', JSON.stringify(errors, null, 2));
  process.exit(1);
}

console.log(`✅ All ${metaFiles.length} deck metadata files are valid`);
```

### IDE Integration

These schemas can be referenced in JSON files for IDE autocomplete and validation:

```json
{
  "$schema": "../specs/001-multi-deck-index/contracts/deck-metadata.schema.json",
  "id": "my-new-deck",
  "title": "My Deck Title"
  // ... IDE will provide autocomplete and validation
}
```

### CI/CD Integration

```yaml
# .github/workflows/validate.yml
name: Validate Metadata

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install Ajv CLI
        run: npm install -g ajv-cli ajv-formats

      - name: Validate all deck metadata
        run: |
          for meta in decks/*/meta.json; do
            echo "Validating $meta"
            ajv validate \
              -s specs/001-multi-deck-index/contracts/deck-metadata.schema.json \
              -d "$meta" \
              || exit 1
          done

      - name: Validate index data (if exists)
        run: |
          if [ -f index/public/index-data.json ]; then
            ajv validate \
              -s specs/001-multi-deck-index/contracts/index-data.schema.json \
              -d index/public/index-data.json
          fi
```

## Schema Versioning

These schemas follow semantic versioning:
- **Major**: Breaking changes to required fields or types
- **Minor**: New optional fields or expanded enums
- **Patch**: Documentation updates, examples, clarifications

Current version: **1.0.0**

## Contributing

When updating schemas:
1. Update the schema file
2. Increment the version in the schema's `$id` field if breaking
3. Update this README with the change
4. Test validation against existing deck metadata
5. Update migration guide if breaking changes introduced

## Schema Relationships

```
index-data.schema.json
  └─→ references deck-metadata.schema.json (via $ref)

deck-metadata.schema.json
  └─→ standalone schema

theme-package.schema.json
  └─→ standalone schema
```

## References

- [JSON Schema Specification](https://json-schema.org/)
- [Ajv JSON Schema Validator](https://ajv.js.org/)
- [Slidev Documentation](https://sli.dev/)
