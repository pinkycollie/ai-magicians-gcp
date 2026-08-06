# GitHub Pages Documentation

This directory contains the source files for the 360 Magicians GitHub Pages site.

## 📄 Files

- **`index.html`** - Main landing page with:
  - Platform overview and statistics
  - All 12 AI agents showcase
  - Visual architecture diagrams (Mermaid.js)
  - Accessibility features (vibration API, high contrast, font controls)
  - Mobile responsive design
  
- **`architecture.html`** - Comprehensive architecture documentation with:
  - High-level platform architecture
  - User interaction data flow
  - AI agent internal architecture
  - VR4DEAF integration details
  - Multi-domain architecture strategy
  - Deployment & CI/CD pipeline
  - Complete technology stack
  - Security & privacy architecture

- **Assets** - Images and icons used in the documentation

## 🌐 Live Site

The GitHub Pages site is automatically deployed from this directory:
- **Main Site:** https://pinkycollie.github.io/ai-magicians-gcp/
- **Architecture:** https://pinkycollie.github.io/ai-magicians-gcp/architecture.html

## 🚀 Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch. See `.github/workflows/deploy-pages.yml` for the deployment configuration.

## ♿ Accessibility Features

The documentation includes several accessibility features:
- **Vibration API** - Haptic feedback for interactions (when supported)
- **High Contrast Mode** - Toggle for improved readability
- **Font Size Controls** - Increase/decrease text size
- **Smooth Navigation** - Smooth scrolling between sections
- **Mobile Responsive** - Works on all device sizes

## 🏗️ Visual Diagrams

All architecture diagrams are rendered using [Mermaid.js](https://mermaid.js.org/) for:
- System architecture
- Data flow sequences
- Component relationships
- Technology stack
- Deployment pipelines

## 🔧 Local Development

To test the pages locally:

```bash
# From the docs directory
cd docs

# Start a simple HTTP server
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

## 📝 Updating Documentation

1. Edit the HTML files in this directory
2. Test locally to ensure everything works
3. Commit and push changes
4. GitHub Actions will automatically deploy to GitHub Pages

## 🎨 Styling

The documentation uses a custom CSS design system with:
- CSS variables for consistent theming
- Gradient accents (primary purple/blue)
- Card-based layout
- Shadow effects for depth
- Responsive grid layouts

---

**Note:** This documentation is separate from the main application (`index.html` in root) which is for AI Studio deployment.
