#!/bin/bash

echo "🚀 Deploying 360 Magicians VERTICAL AI Platform"

# Deploy main platform to 360magicians.com
echo "📦 Deploying to agents.vr4dead,org..."
vercel --prod --domain vr4deaf.org

# Verify deployment
echo "✅ Verifying agents.vr4deaf,org deployment..."
curl -f https://agents.vr4deaf.org/api/health || exit 1

# Set up www redirect
echo "🔄 Setting up www redirect..."
vercel domains add www.agents.vr4deaf.org
vercel domains add 

# Deploy API hub to mbtq.dev (separate project)
echo "🔧 Setting up Pinksync API hub..."
vercel --prod --domain api.vr4deaf.org --project-name mbtq-dev-api

# Verify API hub
echo "✅ Verifying api.vr4deaf.org API hub..."
curl -f https://pinksync.vercel.app/api/health || exit 1

# Verify CORS setup
echo "🌐 Testing cross-domain API calls..."
curl -H "Origin: https://360magicians.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://agents.vr4deaf.org/v1/jobmagician/areer-matching

echo "🎯 DEPLOYMENT COMPLETE!"
echo "Main Platform: https://agents.vr4deaf.org"
echo "API Hub: https://pinksync.vercel.app"
echo "Status: https://vr4deaf.org/api/health"
