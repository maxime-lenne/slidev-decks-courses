#!/bin/bash

set -e  # Exit on error

echo "🔍 Generating index data from deck metadata..."

# Create output directory if it doesn't exist
mkdir -p index/public

# Initialize the index data JSON
cat > index/public/index-data.json << 'EOF'
{
  "generated": "",
  "version": "1.0.0",
  "decks": [],
  "stats": {
    "totalDecks": 0,
    "totalDuration": 0,
    "languages": [],
    "themes": [],
    "tags": []
  }
}
EOF

# Use Node.js to process the metadata files
node << 'NODESCRIPT'
const fs = require('fs');
const path = require('path');

const decksDir = path.join(process.cwd(), 'decks');
const outputPath = path.join(process.cwd(), 'index/public/index-data.json');

// Collect all published decks
const publishedDecks = [];
const allLanguages = new Set();
const allThemes = new Set();
const allTags = new Set();
let totalDuration = 0;

try {
  const deckDirs = fs.readdirSync(decksDir).filter(name => {
    const fullPath = path.join(decksDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const deckDir of deckDirs) {
    const metaPath = path.join(decksDir, deckDir, 'meta.json');

    if (!fs.existsSync(metaPath)) {
      console.warn(`⚠️  Skipping ${deckDir}: no meta.json found`);
      continue;
    }

    try {
      const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      // Only include published decks
      if (metadata.status === 'published') {
        publishedDecks.push(metadata);

        // Collect stats
        allLanguages.add(metadata.language);
        allThemes.add(metadata.theme);
        metadata.tags.forEach(tag => allTags.add(tag));

        // Parse duration (e.g., "2 hours" or "90 minutes")
        const durationMatch = metadata.duration.match(/(\d+)\s+(hour|minute)/i);
        if (durationMatch) {
          const value = parseInt(durationMatch[1]);
          const unit = durationMatch[2].toLowerCase();
          totalDuration += unit.startsWith('hour') ? value * 60 : value;
        }

        console.log(`✅ Included: ${metadata.title} (${metadata.id})`);
      } else {
        console.log(`⏭️  Skipped: ${metadata.title} (status: ${metadata.status})`);
      }
    } catch (err) {
      console.error(`❌ Error processing ${deckDir}/meta.json: ${err.message}`);
    }
  }

  // Generate index data
  const indexData = {
    generated: new Date().toISOString(),
    version: '1.0.0',
    decks: publishedDecks,
    stats: {
      totalDecks: publishedDecks.length,
      totalDuration,
      languages: Array.from(allLanguages).sort(),
      themes: Array.from(allThemes).sort(),
      tags: Array.from(allTags).sort()
    }
  };

  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));

  console.log('');
  console.log('📊 Index Statistics:');
  console.log(`   Total Decks: ${indexData.stats.totalDecks}`);
  console.log(`   Total Duration: ${totalDuration} minutes`);
  console.log(`   Languages: ${indexData.stats.languages.join(', ')}`);
  console.log(`   Themes: ${indexData.stats.themes.join(', ')}`);
  console.log(`   Tags: ${indexData.stats.tags.length} unique tags`);
  console.log('');
  console.log(`✅ Index data written to ${outputPath}`);

} catch (err) {
  console.error(`❌ Fatal error: ${err.message}`);
  process.exit(1);
}
NODESCRIPT

echo "✅ Index generation complete!"
