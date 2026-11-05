#!/bin/bash
# Downloads Heat GB's legal documents from the original site into ./docs/
# Usage (from the heatgb folder):  bash download-docs.sh
set -e
cd "$(dirname "$0")"
mkdir -p docs
BASE="https://www.heatgb.co.uk/wp-content/uploads"
get() { curl -s -f -L -o "docs/$2" "$BASE/$1" && echo "  OK: docs/$2 ($(wc -c < "docs/$2" | tr -d ' ') bytes)" || echo "  FAILED: $1"; }
echo "Downloading documents..."
get "2020/11/Terms-and-Conditions.pdf"          "heat-gb-terms-and-conditions.pdf"
get "2024/04/TTF11-Model-Complaints-Policy.docx" "complaints-policy-source.docx"
echo "Done."
