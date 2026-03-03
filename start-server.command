#!/bin/bash
# Double-click this file in Finder to start the local preview server.
# Then open Chrome and go to: http://localhost:8765

cd "$(dirname "$0")"
echo ""
echo "🔥 Heat GB local preview server"
echo "   Open Chrome and visit: http://localhost:8765"
echo "   Press Ctrl+C to stop."
echo ""
python3 -m http.server 8765
