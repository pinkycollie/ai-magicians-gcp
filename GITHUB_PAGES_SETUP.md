# GitHub Pages Setup Guide

This guide explains how to set up and configure GitHub Pages for the 360 Magicians repository.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Repository Configuration](#repository-configuration)
3. [Automatic Deployment](#automatic-deployment)
4. [Manual Setup Instructions](#manual-setup-instructions)
5. [Customization](#customization)
6. [Troubleshooting](#troubleshooting)

## Overview

The 360 Magicians repository uses GitHub Pages to host comprehensive documentation and visual architecture diagrams. The site is built with:

- **Pure HTML/CSS/JavaScript** - No build process required
- **Mermaid.js** - For interactive architecture diagrams
- **Accessibility Features** - Vibration API, high contrast, font controls
- **Mobile Responsive** - Works on all devices
- **Automatic Deployment** - Via GitHub Actions

## Repository Configuration

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/pinkycollie/ai-magicians-gcp`
2. Click on **Settings** (top menu)
3. Scroll down to the **Pages** section in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" (recommended)
   - This allows the workflow in `.github/workflows/deploy-pages.yml` to deploy the site
5. Save the settings

### Step 2: Configure Deployment Source

If using the **Deploy from a branch** option instead:
1. **Source**: Deploy from a branch
2. **Branch**: Select `main`
3. **Folder**: Select `/docs`
4. Click **Save**

The site will be available at: `https://pinkycollie.github.io/ai-magicians-gcp/`

## Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically deploys the site when changes are pushed to the `main` branch.

### Workflow Configuration

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write
```

### Triggering Deployment

The deployment is triggered automatically when:
- Code is pushed to the `main` branch
- Manually triggered via the Actions tab (using `workflow_dispatch`)

### Monitoring Deployments

1. Go to the **Actions** tab in your repository
2. Look for "Deploy to GitHub Pages" workflow runs
3. Click on a run to see deployment logs
4. Check the deployment status and URL

## Manual Setup Instructions

If you need to set up GitHub Pages manually or troubleshoot issues:

### Prerequisites

- Repository with `/docs` directory
- HTML files in `/docs` directory
- GitHub repository settings access

### Steps

1. **Create the docs directory** (already done):
   ```bash
   mkdir -p docs
   ```

2. **Add your HTML content** (already done):
   - `docs/index.html` - Main page
   - `docs/architecture.html` - Architecture page
   - `docs/README.md` - Documentation

3. **Commit and push**:
   ```bash
   git add docs/
   git commit -m "Add GitHub Pages content"
   git push origin main
   ```

4. **Enable GitHub Pages** (see Repository Configuration above)

5. **Wait for deployment** (usually 1-2 minutes)

6. **Access your site**: `https://pinkycollie.github.io/ai-magicians-gcp/`

## Customization

### Updating Content

1. **Edit HTML files** in the `/docs` directory
2. **Test locally**:
   ```bash
   cd docs
   python -m http.server 8000
   # Open http://localhost:8000 in browser
   ```
3. **Commit and push** changes
4. **Wait for automatic deployment**

### Adding New Pages

1. Create new HTML file in `/docs` directory
2. Link to it from `index.html`:
   ```html
   <a href="newpage.html">New Page</a>
   ```
3. Commit and push

### Customizing Styles

The site uses CSS variables for easy theming. Edit the `:root` section in the `<style>` tag:

```css
:root {
  --primary: #667eea;
  --primary-dark: #5568d3;
  --secondary: #764ba2;
  --bg-light: #f5f7fa;
  --bg-card: #ffffff;
}
```

### Adding Diagrams

The site uses Mermaid.js for diagrams. Add new diagrams with:

```html
<div class="mermaid">
graph TB
    A[Start] --> B[Process]
    B --> C[End]
</div>
```

## Troubleshooting

### Site Not Deploying

1. **Check GitHub Actions**:
   - Go to Actions tab
   - Look for failed workflows
   - Check error logs

2. **Verify Settings**:
   - Settings → Pages → Source is correct
   - Branch is set to `main`
   - Folder is set to `/docs`

3. **Check Permissions**:
   - Workflow has `pages: write` permission
   - Repository settings allow Actions

### 404 Error

1. **Verify file exists**:
   ```bash
   ls docs/index.html
   ```

2. **Check capitalization** (URLs are case-sensitive)

3. **Wait for deployment** to complete

### Diagrams Not Rendering

1. **Check browser console** for JavaScript errors
2. **Verify Mermaid.js** is loading from CDN
3. **Test Mermaid syntax** at https://mermaid.live/

### Styles Not Loading

1. **Check CSS syntax** in `<style>` tags
2. **Verify file is committed** and pushed
3. **Clear browser cache** and reload

### Custom Domain Issues

If using a custom domain:

1. Add `CNAME` file to `/docs`:
   ```bash
   echo "yourdomain.com" > docs/CNAME
   ```

2. Configure DNS:
   - Add A records pointing to GitHub's IPs
   - Or add CNAME record pointing to `pinkycollie.github.io`

3. Enable HTTPS in repository settings

## Testing Checklist

Before deploying changes:

- [ ] Test pages locally with HTTP server
- [ ] Verify all links work
- [ ] Test on mobile devices (responsive design)
- [ ] Check Mermaid diagrams render correctly
- [ ] Test accessibility features (contrast, font size)
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Check browser console for errors

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Mermaid.js Documentation](https://mermaid.js.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For issues or questions:
- **Email**: dev@vr4deaf.org
- **GitHub Issues**: https://github.com/pinkycollie/ai-magicians-gcp/issues

---

© 2025 360 Magicians - Universal Digital Accessibility Infrastructure
