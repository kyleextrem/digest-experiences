#!/bin/bash

# Newcastle Digest Experiences - Quick Launcher
# This script helps you quickly start the preview server and open the previews

echo "🚀 Newcastle Digest Experiences - Quick Launcher"
echo "================================================"
echo ""

# Check if server is already running
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ HTTP server is already running on port 8080"
else
    echo "🔄 Starting HTTP server on port 8080..."
    python3 -m http.server 8080 &
    SERVER_PID=$!
    echo "✅ Server started (PID: $SERVER_PID)"
    sleep 2
fi

echo ""
echo "📂 Opening previews in your browser..."
echo ""

# Open the previews
open http://localhost:8080/standalone.html
echo "✅ Opened: Standalone Preview"
sleep 1

open http://localhost:8080/debug-preview.html
echo "✅ Opened: Debug Preview"

echo ""
echo "================================================"
echo "🎉 All set! Your previews are now open."
echo ""
echo "Available URLs:"
echo "  • Standalone Preview: http://localhost:8080/standalone.html"
echo "  • Debug Preview:      http://localhost:8080/debug-preview.html"
echo "  • File Browser:       http://localhost:8080/"
echo ""
echo "To stop the server, press Ctrl+C or run:"
echo "  kill \$(lsof -t -i:8080)"
echo ""
