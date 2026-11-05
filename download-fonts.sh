#!/bin/bash
# Downloads the self-hosted web fonts (latin subset, woff2) into ./fonts/
# Usage (from the heatgb folder):  bash download-fonts.sh
set -e
cd "$(dirname "$0")"
mkdir -p fonts
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

get() { # $1 = Google Fonts css2 family query, $2 = output file
  css=$(curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=$1&display=swap")
  # take the url from the /* latin */ block
  url=$(printf '%s\n' "$css" | awk '/\/\* latin \*\//{f=1} f && /url\(/{match($0,/url\([^)]*\)/); print substr($0,RSTART+4,RLENGTH-5); exit}')
  if [ -z "$url" ]; then echo "  FAILED: $2"; return 1; fi
  curl -s -f -o "fonts/$2" "$url" && echo "  OK: fonts/$2 ($(wc -c < "fonts/$2" | tr -d ' ') bytes)"
}

echo "Downloading fonts..."
get "Bricolage+Grotesque:wght@400..800" "bricolage-grotesque-var.woff2"
get "Instrument+Serif:ital@1"           "instrument-serif-italic.woff2"
echo "Done."
