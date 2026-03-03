#!/bin/bash
# ============================================================
# Heat GB — Image Downloader
# Run this script from your Mac terminal (NOT inside the VM)
# to download all site images locally.
#
# Usage:
#   chmod +x download-images.sh
#   ./download-images.sh
# ============================================================

set -e
DEST="$(dirname "$0")/images"
mkdir -p "$DEST"

BASE="https://www.heatgb.co.uk/wp-content/uploads"

imgs=(
  "2020/11/main-logo.png"
  "2020/12/header-5-stars.png"
  "2020/11/12year-logo.png"
  "2020/11/image-1.png"
  "2020/11/banner-btn.png"
  "2020/11/home-box1.png"
  "2020/11/home-box1-rollover.png"
  "2020/11/home-box2.png"
  "2020/11/home-box2-rollover.png"
  "2020/11/home-box3.png"
  "2020/11/home-box3-rollover.png"
  "2020/11/logo1.png"
  "2020/11/logo2..png"
  "2020/11/star-icon.png"
)

echo "Downloading Heat GB images to: $DEST"
echo ""

for img in "${imgs[@]}"; do
  filename=$(basename "$img")
  url="$BASE/$img"
  echo "  ↓ $filename"
  curl -sL "$url" -o "$DEST/$filename" || echo "    ✗ Failed: $url"
done

echo ""
echo "Done! Images saved to: $DEST"
echo ""
echo "NOTE: After downloading, update image src attributes in the HTML files"
echo "to use local paths (images/filename.png) instead of the original URLs."
