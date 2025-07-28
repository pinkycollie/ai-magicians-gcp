#!/bin/bash

echo "🚀 Deploying 360 Magicians VERTICAL AI Platform"

# Deploy main platform to 360magicians.com
echo "📦 Deploying to 360magicians.com..."
vercel --prod --domain 360magicians.com

# Verify deployment
echo "✅ Verifying 360magicians.com deployment..."
curl -f https://360magicians.com/api/health || exit 1

# Set up www redirect
echo "🔄 Setting up www redirect..."
vercel domains add www.360magicians.com
vercel domains add 360magicians.com

# Deploy API hub to mbtq.dev (separate project)
echo "🔧 Setting up mbtq.dev API hub..."
vercel --prod --domain mbtq.dev --project-name mbtq-dev-api

# Verify API hub
echo "✅ Verifying mbtq.dev API hub..."
curl -f https://mbtq.dev/api/health || exit 1

# Verify CORS setup
echo "🌐 Testing cross-domain API calls..."
curl -H "Origin: https://360magicians.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://mbtq.dev/api/agents/jobmagician/areer-matching

echo "🎯 DEPLOYMENT COMPLETE!"
echo "Main Platform: https://360magicians.com"
echo "API Hub: https://api.mbtq.dev"
echo "Status: https://360magicians.com/api/health"
