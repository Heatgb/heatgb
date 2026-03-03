#!/bin/bash
# Run this script from the heatgb directory to download all missing images
# Usage: bash download-images.sh

BASE="https://www.heatgb.co.uk/wp-content/uploads/2020/11"
DEST="images"

echo "Downloading missing images to ./$DEST/"
echo ""

images=(
  "image-1-1.png"
  "image-2.png"
  "image-3.png"
  "image-1-2.png"
  "image-2-1.png"
  "image-3-1.png"
  "image-1-3.png"
  "worester-img1.png"
  "worcester-icon1.png"
  "worcester-icon2.png"
  "gassafe-section-image1.png"
  "gassafe-section-image2.png"
  "logo3.png"
  "footer-logo.png"
  "worcester-banner-boiler.png"
  "worcester-logo.png"
)

ok=0
fail=0

for img in "${images[@]}"; do
  echo -n "  Downloading $img ... "
  if curl -s -f -o "$DEST/$img" "$BASE/$img"; then
    echo "OK"
    ((ok++))
  else
    echo "FAILED"
    ((fail++))
  fi
done

echo ""
echo "Done: $ok downloaded, $fail failed."
