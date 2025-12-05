#!/bin/bash

set -e  # Exit on error

echo "=== Multi-Deck Slidev Build Pipeline ==="
echo ""

# Step 1: Generate index data
echo "📋 Step 1: Generating index data..."
npm run generate-index
echo "✅ Index data generated"
echo ""

# Step 2: Build all decks
echo "📊 Step 2: Building all slide decks..."
npm run build:decks
echo "✅ Decks built"
echo ""

# Step 3: Build index page
echo "🏠 Step 3: Building index page..."
npm run build:index
echo "✅ Index page built"
echo ""

echo "🎉 Build complete! Output in dist/"
echo ""
echo "Directory structure:"
echo "  dist/"
echo "  ├── index.html      (index page)"
echo "  ├── assets/         (index page assets)"
echo "  └── decks/          (slide deck presentations)"
