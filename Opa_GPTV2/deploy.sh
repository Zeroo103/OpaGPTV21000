#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Starting deployment to GitHub Pages..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://yourusername.github.io/Opa_GPTV2/"
echo ""
echo "📝 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Set source to 'GitHub Actions'"
echo "4. Your site will be automatically deployed!"