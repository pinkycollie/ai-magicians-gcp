# 360 Magicians - Vertical AI Platform

[![Google AI Studio Compatible](https://img.shields.io/badge/Google%20AI%20Studio-Compatible-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-8E75B2?style=for-the-badge)](https://ai.google.dev/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?style=for-the-badge&logo=github)](https://pinkycollie.github.io/ai-magicians-gcp/)

📄 **[View Documentation](https://pinkycollie.github.io/ai-magicians-gcp/)** | 🏗️ **[Architecture Diagrams](https://pinkycollie.github.io/ai-magicians-gcp/architecture.html)**

## Overview

This is the **360 Magicians Vertical AI Platform** - a federated AI worker system designed to make digital experiences accessible to 70+ million deaf people worldwide. The platform has been converted to be fully compatible with **Google AI Studio** and uses the **Gemini SDK**.

### Key Features

- **12 Specialized AI Agents** across 3 categories (Job Development, Business Development, Integration Hub)
- **Google AI Studio Compatible** - Runs entirely in the browser with no server-side components
- **Gemini AI Integration** - Powered by Google's Gemini Pro model
- **Accessibility-First Design** - Built specifically for the deaf and hard-of-hearing community
- **ES Modules** - Modern JavaScript with import maps

## AI Studio Files

The following files are ready for Google AI Studio deployment:

- **`index.html`** - Main HTML file with styling and import map
- **`app.js`** - Vanilla JavaScript application with Gemini AI integration
- **`metadata.json`** - App configuration for AI Studio
- **`AI_STUDIO_README.md`** - Detailed setup instructions for AI Studio

## Quick Start for AI Studio

### Option 1: Use in AI Studio (Recommended)

1. Open [Google AI Studio](https://aistudio.google.com/)
2. Create a new app
3. Upload these files:
   - `index.html`
   - `app.js`
   - `metadata.json`
4. The app will automatically use viewers' Gemini API keys
5. Share with your team!

### Option 2: Run Locally for Development

```bash
# Serve the files with any HTTP server
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Then open http://localhost:8000
```

**Note:** When running locally, you'll need to set up your own Gemini API key by replacing the placeholder in `app.js`.

## The 12 AI Agents

### Job Development Agents
1. **Career Matching AI** - Skills, accommodations, and job pairing
2. **VR Coordination AI** - VR4DEAF platform integration
3. **Interview Prep AI** - Accessibility-focused interview preparation
4. **Workplace Accommodation AI** - Accommodation coordination

### Business Development Agents
5. **Startup Incubation AI** - Business model validation
6. **Document Translation AI** - Document simplification
7. **Funding Intelligence AI** - Grant and funding identification
8. **Growth Planning AI** - Strategic business development

### Integration Hub Agents
9. **Workforce Partnership AI** - Employer network coordination
10. **Case Management AI** - Unified service tracking
11. **Progress Analytics AI** - Performance tracking
12. **Community Intelligence AI** - Feedback processing

## Architecture

### Client-Side Only
- ✅ No server-side components required
- ✅ Runs in sandboxed iframe in AI Studio
- ✅ Direct integration with Gemini API
- ✅ All dependencies loaded via CDN

### Technology Stack
- **Vanilla JavaScript** - No build tools required
- **ES Modules** - Modern import/export syntax
- **Import Maps** - Dependency management via esm.sh
- **Gemini SDK** - `@google/generative-ai` v0.2.1

### API Key Security
- Uses `process.env.GEMINI_API_KEY` placeholder
- AI Studio automatically proxies requests
- Each user's API key is used for their requests
- Your API key is never exposed to viewers

## Migration from Next.js

This repository previously used Next.js but has been converted to vanilla HTML/JS for Google AI Studio compatibility. The Next.js version is not supported by AI Studio due to compiler limitations.

**Why the change?**
- ❌ AI Studio doesn't support Next.js compiler
- ❌ AI Studio doesn't support server-side rendering
- ✅ Pure HTML/JS/CSS works perfectly in AI Studio
- ✅ Simpler deployment and sharing

## Legacy Next.js Version

The original Next.js implementation is preserved in the `app/`, `components/`, and other Next.js-specific directories. These files are not used by the AI Studio version but remain for reference.

## Deployment Options

### GitHub Pages (Documentation)
- **Live Documentation:** [https://pinkycollie.github.io/ai-magicians-gcp/](https://pinkycollie.github.io/ai-magicians-gcp/)
- **Architecture Diagrams:** [https://pinkycollie.github.io/ai-magicians-gcp/architecture.html](https://pinkycollie.github.io/ai-magicians-gcp/architecture.html)
- Visual diagrams with Mermaid.js
- Accessibility features (vibration API, high contrast, font size controls)
- Automatic deployment via GitHub Actions
- Hosted from `/docs` directory

### AI Studio (Recommended for App)
- Share directly in AI Studio
- Users run with their own API keys
- No infrastructure needed
- Built-in proxy for API security

### Cloud Run (Alternative)
- Deploy from AI Studio to Cloud Run
- Public URL for your app
- Uses your API key for all users (costs apply)
- Includes proxy server for API key privacy

### Self-Hosted
- Download the three files
- Host on any static file server
- Add your own API key handling
- Implement your own API proxy if needed

## Documentation

- **GitHub Pages** - [Visual documentation and architecture diagrams](https://pinkycollie.github.io/ai-magicians-gcp/)
- **`AI_STUDIO_README.md`** - Complete AI Studio setup guide
- **`metadata.json`** - App metadata and permissions
- **`/docs`** - GitHub Pages source files

## Support & Contact

- **Email:** dev@vr4deaf.org
- **Website:** https://360magicians.com
- **API Hub:** https://mbtq.dev
- **VR4DEAF Platform:** https://vr4deaf.org

## Platform Architecture

### Domain Strategy
- **360magicians.com** - Main production platform (User Interface, Enterprise Sales, Community Hub)
- **mbtq.dev** - API & Developer Hub (API Endpoints, Documentation, Staging)
- **deafauth.mbtq.dev** - Authentication services

### VR4DEAF Integration
- **DeafAUTH** - Authentication & accommodation engine
- **FIBONROSE** - Fibonacci trust & validation system
- **PinkSync** - Accessibility layer with visual dashboards

## Impact

- **70M+** Deaf people worldwide served
- **$26.2B** Market opportunity
- **12** Federated AI agents
- **6** Industry verticals covered

## License

© 2025 360 Magicians - Universal Digital Accessibility Infrastructure

---

🌟 **Making every digital experience accessible to the deaf community through AI**