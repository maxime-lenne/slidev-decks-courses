#!/bin/bash

# create-deck.sh - Scaffold a new Slidev deck with proper structure
# Usage: ./scripts/create-deck.sh <deck-id> [title] [description]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Check for deck-id argument
if [ -z "$1" ]; then
    echo -e "${RED}Error: Deck ID is required${NC}"
    echo "Usage: $0 <deck-id> [title] [description]"
    echo "Example: $0 sql-joins 'SQL Joins Explained' 'Learn how to join tables'"
    exit 1
fi

DECK_ID="$1"
TITLE="${2:-$DECK_ID}"
DESCRIPTION="${3:-A new Slidev presentation}"
DATE=$(date +%Y-%m-%d)

# Validate deck-id format (lowercase, hyphens only, no spaces)
if ! echo "$DECK_ID" | grep -qE '^[a-z0-9]+(-[a-z0-9]+)*$'; then
    echo -e "${RED}Error: Invalid deck ID format${NC}"
    echo "Deck ID must be lowercase with hyphens only (e.g., 'sql-basics', 'advanced-queries')"
    exit 1
fi

# Check if deck already exists
DECK_DIR="${PROJECT_ROOT}/decks/${DECK_ID}"
if [ -d "$DECK_DIR" ]; then
    echo -e "${RED}Error: Deck '${DECK_ID}' already exists${NC}"
    echo "Location: ${DECK_DIR}"
    exit 1
fi

echo -e "${GREEN}Creating new deck: ${DECK_ID}${NC}"
echo "Title: ${TITLE}"
echo "Description: ${DESCRIPTION}"
echo ""

# Create directory structure
echo "Creating directory structure..."
mkdir -p "${DECK_DIR}/assets"

# Copy and process slides.md template
echo "Generating slides.md..."
sed -e "s/{{DECK_ID}}/${DECK_ID}/g" \
    -e "s/{{TITLE}}/${TITLE}/g" \
    -e "s/{{DESCRIPTION}}/${DESCRIPTION}/g" \
    -e "s/{{DATE}}/${DATE}/g" \
    -e "s/{{OBJECTIVES}}/- Comprendre les concepts clés\n- Appliquer les techniques apprises\n- Résoudre des problèmes pratiques/g" \
    -e "s/{{PREREQUISITES}}/- Connaissances de base en SQL\n- Compréhension des bases de données relationnelles/g" \
    "${SCRIPT_DIR}/templates/slides.md.template" > "${DECK_DIR}/slides.md"

# Copy and process meta.json template
echo "Generating meta.json..."
sed -e "s/{{DECK_ID}}/${DECK_ID}/g" \
    -e "s/{{TITLE}}/${TITLE}/g" \
    -e "s/{{DESCRIPTION}}/${DESCRIPTION}/g" \
    -e "s/{{DATE}}/${DATE}/g" \
    "${SCRIPT_DIR}/templates/meta.json.template" > "${DECK_DIR}/meta.json"

# Create placeholder thumbnail (SVG)
echo "Creating placeholder thumbnail..."
cat > "${DECK_DIR}/assets/preview.svg" << 'EOF'
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#123744"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" fill="#f26f5c" text-anchor="middle">
    Preview
  </text>
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">
    Replace with actual thumbnail
  </text>
</svg>
EOF

# Validate generated meta.json if validation script exists
if [ -f "${SCRIPT_DIR}/validate-metadata.js" ]; then
    echo ""
    echo "Validating metadata..."
    if node "${SCRIPT_DIR}/validate-metadata.js" "${DECK_DIR}/meta.json" 2>&1 | grep -q "valid"; then
        echo -e "${GREEN}✓ Metadata validation passed${NC}"
    else
        echo -e "${YELLOW}⚠ Metadata validation warnings (check format)${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Deck created successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit deck content:"
echo "     ${DECK_DIR}/slides.md"
echo ""
echo "  2. Update metadata:"
echo "     ${DECK_DIR}/meta.json"
echo ""
echo "  3. Add a preview thumbnail (400x300px):"
echo "     ${DECK_DIR}/assets/preview.png"
echo ""
echo "  4. Test your deck locally:"
echo "     npm run dev:deck -- --deck=${DECK_ID}"
echo "     or: npx slidev ${DECK_DIR}/slides.md"
echo ""
echo "  5. When ready to publish:"
echo "     - Change 'status' to 'published' in meta.json"
echo "     - Run: npm run validate"
echo "     - Commit and push to repository"
echo ""
