# Deployment Guide for AI Studio

## Uploading to Google AI Studio

### Step 1: Prepare Your Files
You need these three files:
- `index.html` - The main application file
- `app.js` - JavaScript application logic
- `metadata.json` - App configuration

### Step 2: Open AI Studio
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to the Apps section

### Step 3: Create New App
1. Click "New App" or "Create App"
2. Choose "Upload Files" option
3. Upload the three files listed above

### Step 4: Configure App
The app is pre-configured via `metadata.json` with:
- App name: "360 Magicians - Vertical AI Platform"
- Description: Platform details
- Permissions: Camera and Microphone (for accessibility features)

### Step 5: Test Your App
1. Click "Preview" to test the app
2. Select an AI agent from the overview
3. Try chatting with the agent
4. The app will use your Gemini API key automatically

### Step 6: Share Your App
1. Click "Share" button
2. Choose sharing options:
   - **View only**: Others can use the app with their API keys
   - **Edit**: Others can modify the code
3. Copy the share link
4. Distribute to your team or community

## API Key Handling

### In AI Studio
- The placeholder `process.env.GEMINI_API_KEY` is automatically replaced
- AI Studio proxies all Gemini API calls
- Each viewer uses their own API key
- Your API key remains private

### For Local Development
If you want to test locally:

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Open `app.js` in a text editor
3. Find this line:
   ```javascript
   const apiKey = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
   ```
4. Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   const apiKey = process.env.GEMINI_API_KEY || 'AIza...your-key-here';
   ```
5. **NEVER commit this file with your real API key!**

## Deployment to Cloud Run (Alternative)

### From AI Studio
1. Open your app in AI Studio
2. Click "Deploy" button
3. Select "Deploy to Cloud Run"
4. Follow the prompts to:
   - Choose your Google Cloud project
   - Set deployment region
   - Configure resources
5. Wait for deployment to complete
6. Get your public URL

### What Gets Deployed
- Your app code
- A proxy server for API key security
- Automatic scaling
- HTTPS endpoint

### Cost Considerations
- Cloud Run charges for:
  - CPU time used
  - Memory allocated
  - Network egress
- Gemini API charges apply
- All users will use YOUR API key (costs add up!)

### Cost Optimization
- Set request limits
- Implement rate limiting
- Monitor usage in Google Cloud Console
- Consider caching responses

## Troubleshooting

### App doesn't load
- Check browser console for errors
- Verify all three files are uploaded
- Ensure import map URLs are accessible
- Check that esm.sh is not blocked

### API key errors
- In AI Studio: Make sure you have a valid Gemini API key in your account
- Locally: Verify your API key is correct
- Check API quotas and limits

### Chat not working
- Check browser console for errors
- Verify network connectivity
- Ensure Gemini API service is available
- Check that you haven't exceeded rate limits

### Styling issues
- Clear browser cache
- Check that index.html loaded completely
- Verify CSS is properly embedded

## Updating Your App

### In AI Studio
1. Edit files directly in AI Studio editor
2. Save changes
3. Test with preview
4. Changes are live immediately

### From Local Development
1. Make changes to your local files
2. Test locally
3. Upload updated files to AI Studio
4. Replace existing files

## Best Practices

### Security
- Never hardcode real API keys in code
- Use AI Studio's built-in proxy
- Review code before making public
- Monitor API usage regularly

### Performance
- Keep bundle size small
- Use efficient algorithms
- Implement proper error handling
- Cache when appropriate

### Accessibility
- Test with screen readers
- Ensure keyboard navigation works
- Use high contrast modes
- Provide text alternatives

### User Experience
- Clear error messages
- Loading indicators
- Responsive design
- Intuitive navigation

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google AI Studio documentation
3. Contact support at dev@vr4deaf.org
4. Visit our community at https://360magicians.com

## Next Steps

After deploying your app:
1. Share with your team
2. Gather feedback
3. Iterate on features
4. Monitor usage and costs
5. Scale as needed

---

Happy deploying! 🚀
