# 360 Magicians - AI Studio Setup Guide

This app is now compatible with Google AI Studio (Gemini SDK).

## Running in AI Studio

This application is designed to run in Google AI Studio with the following structure:

### Files
- `index.html` - Main HTML file with import map for ES modules and embedded CSS
- `app.js` - Vanilla JavaScript application with Gemini AI integration
- `metadata.json` - App configuration for AI Studio

### Key Features
- **No Server Required**: Runs entirely in the browser
- **Gemini AI Integration**: Uses `@google/generative-ai` SDK
- **ES Modules**: All dependencies loaded via import map from esm.sh
- **API Key Handling**: Uses `process.env.GEMINI_API_KEY` placeholder (automatically replaced by AI Studio)

### AI Agents
The platform includes 12 specialized AI agents across 3 categories:

#### Job Development Agents
1. **Career Matching AI** - Skills, accommodations, and job matching
2. **VR Coordination AI** - VR4DEAF platform integration
3. **Interview Prep AI** - Accessibility-focused interview preparation
4. **Workplace Accommodation AI** - Accommodation coordination

#### Business Development Agents
5. **Startup Incubation AI** - Business model validation
6. **Document Translation AI** - Document simplification and accessibility
7. **Funding Intelligence AI** - Grant and funding identification
8. **Growth Planning AI** - Strategic business development

#### Integration Hub Agents
9. **Workforce Partnership AI** - Employer network coordination
10. **Case Management AI** - Unified service tracking
11. **Progress Analytics AI** - Performance tracking
12. **Community Intelligence AI** - Feedback processing

## How to Use

### In AI Studio
1. Upload `index.html`, `app.js`, and `metadata.json` to AI Studio
2. The app will automatically use the viewer's Gemini API key
3. Select an AI agent and start chatting

### Running Locally
If you want to test locally:
1. Replace `process.env.GEMINI_API_KEY` in `app.js` with your actual Gemini API key
2. Serve the files using a local web server:
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser

**Note**: Never commit your actual API key to the repository!

## Architecture

### Client-Side Only
- No server-side components
- All AI interactions happen directly with Gemini API
- Runs in sandboxed iframe in AI Studio

### Dependencies
All dependencies are loaded via CDN using import maps:
- @google/generative-ai 0.2.1 (Gemini SDK)

No framework dependencies required - pure vanilla JavaScript!

### API Key Security
- Uses placeholder `process.env.GEMINI_API_KEY`
- AI Studio automatically proxies requests with user's API key
- Never exposes your API key to viewers

## Sharing
When you share this app in AI Studio:
- Users can view and use the app
- Each user's API key is used for their own requests
- Users can fork the app for their own modifications
- Code is visible to all viewers

## Deployment Options

### AI Studio (Recommended)
- Share directly in AI Studio
- Users run with their own API keys
- No deployment infrastructure needed

### Cloud Run (Alternative)
- Deploy from AI Studio to Cloud Run
- Public URL for your app
- Uses your API key for all users (costs apply)
- Includes proxy server for API key privacy

## Technical Notes

### Why Not Next.js?
AI Studio doesn't support Next.js compiler or other complex build tools. This version uses:
- Vanilla HTML/CSS/JavaScript (no frameworks)
- Pure ES modules
- Direct Gemini SDK integration
- No build step required

### Limitations
- No server-side rendering
- No complex routing (can be added with client-side router if needed)
- Limited to browser APIs
- Must request permissions for camera/microphone via metadata.json

## Support
For issues or questions:
- Email: dev@vr4deaf.org
- Website: https://360magicians.com
- API Hub: https://mbtq.dev

## License
© 2025 360 Magicians - Universal Digital Accessibility Infrastructure
