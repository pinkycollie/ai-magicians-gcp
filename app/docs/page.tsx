"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Code,
  Book,
  Zap,
  Globe,
  Key,
  Play,
  Download,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Rocket,
} from "lucide-react"
import { useState } from "react"

export default function DeveloperDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const apiEndpoints = [
    {
      id: "career-matching",
      name: "Career Matching AI",
      endpoint: "/api/agents/career-matching",
      method: "POST",
      description: "Intelligent pairing of skills, accommodations, and job requirements",
      rateLimit: "100 requests/hour",
      pricing: "$0.05 per request",
    },
    {
      id: "vr-coordination",
      name: "VR Coordination AI",
      endpoint: "/api/agents/vr-coordination",
      method: "POST",
      description: "VURA AI integration for VR/AR rehabilitation and ASL workforce solutions",
      rateLimit: "50 requests/hour",
      pricing: "$0.10 per request",
    },
    {
      id: "document-translation",
      name: "Document Translation AI",
      endpoint: "/api/agents/document-translation",
      method: "POST",
      description: "Complex document simplification and accessibility conversion",
      rateLimit: "200 requests/hour",
      pricing: "$0.03 per request",
    },
    {
      id: "interview-prep",
      name: "Interview Prep AI",
      endpoint: "/api/agents/interview-prep",
      method: "POST",
      description: "Accessibility-focused interview preparation and simulation",
      rateLimit: "75 requests/hour",
      pricing: "$0.07 per request",
    },
  ]

  const codeExamples = {
    javascript: `// 360 Magicians API Client - JavaScript/Node.js
import fetch from 'node-fetch';

class MagiciansAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://mbtq.dev/api';
  }

  async callAgent(agentType, payload) {
    const response = await fetch(\`\${this.baseURL}/agents/\${agentType}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.apiKey}\`,
        'X-Client-Version': '1.0.0'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    return response.json();
  }

  // Career Matching Example
  async matchCareer(userProfile) {
    return this.callAgent('career-matching', {
      skills: userProfile.skills,
      experience: userProfile.experience,
      accommodations: userProfile.accommodations,
      preferences: userProfile.preferences
    });
  }

  // Document Translation Example  
  async translateDocument(document) {
    return this.callAgent('document-translation', {
      documentType: document.type,
      content: document.content,
      targetAudience: 'deaf-community',
      accessibilityLevel: 'high'
    });
  }
}

// Usage Example
const api = new MagiciansAPI('your-api-key-here');

const result = await api.matchCareer({
  skills: ['JavaScript', 'React', 'Node.js'],
  experience: '3 years',
  accommodations: ['ASL interpreter', 'visual alerts'],
  preferences: ['remote work', 'tech industry']
});

console.log('Career matches:', result.matches);`,

    python: `# 360 Magicians API Client - Python
import requests
import json

class MagiciansAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://mbtq.dev/api'
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
            'X-Client-Version': '1.0.0'
        }

    def call_agent(self, agent_type, payload):
        url = f'{self.base_url}/agents/{agent_type}'
        response = requests.post(url, headers=self.headers, json=payload)
        
        if response.status_code != 200:
            raise Exception(f'API Error: {response.status_code}')
        
        return response.json()

    def match_career(self, user_profile):
        """Career Matching AI Integration"""
        return self.call_agent('career-matching', {
            'skills': user_profile['skills'],
            'experience': user_profile['experience'], 
            'accommodations': user_profile['accommodations'],
            'preferences': user_profile.get('preferences', [])
        })

    def coordinate_vr_services(self, client_data):
        """VR Coordination AI Integration"""
        return self.call_agent('vr-coordination', {
            'clientId': client_data['id'],
            'vrAgency': client_data['agency'],
            'accommodationNeeds': client_data['accommodations'],
            'aslRequirements': client_data.get('asl_level', 'intermediate')
        })

# Usage Example
api = MagiciansAPI('your-api-key-here')

# Career matching example
user_profile = {
    'skills': ['Python', 'Machine Learning', 'Data Analysis'],
    'experience': '5 years',
    'accommodations': ['ASL interpreter', 'written communication'],
    'preferences': ['healthcare', 'AI/ML roles']
}

result = api.match_career(user_profile)
print(f"Career matches: {result['matches']}")

# VR coordination example
client_data = {
    'id': 'client-123',
    'agency': 'State VR Services',
    'accommodations': ['interpreter', 'visual aids'],
    'asl_level': 'fluent'
}

vr_result = api.coordinate_vr_services(client_data)
print(f"VR coordination: {vr_result['status']}")`,

    curl: `# 360 Magicians API - cURL Examples

# Career Matching AI
curl -X POST https://mbtq.dev/api/agents/career-matching \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "X-Client-Version: 1.0.0" \\
  -d '{
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "3 years",
    "accommodations": ["ASL interpreter", "visual alerts"],
    "preferences": ["remote work", "tech industry"]
  }'

# Document Translation AI
curl -X POST https://mbtq.dev/api/agents/document-translation \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key-here" \\
  -d '{
    "documentType": "legal",
    "content": "Complex legal document text here...",
    "targetAudience": "deaf-community",
    "accessibilityLevel": "high"
  }'

# VR Coordination AI
curl -X POST https://mbtq.dev/api/agents/vr-coordination \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key-here" \\
  -d '{
    "clientId": "client-123",
    "vrAgency": "State VR Services", 
    "accommodationNeeds": ["interpreter", "visual aids"],
    "aslRequirements": "fluent"
  }'

# Interview Prep AI
curl -X POST https://mbtq.dev/api/agents/interview-prep \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key-here" \\
  -d '{
    "jobRole": "Software Engineer",
    "company": "Tech Corp",
    "accommodations": ["ASL interpreter", "extra time"],
    "experienceLevel": "mid-level"
  }'`,

    react: `// 360 Magicians React Integration
import React, { useState, useEffect } from 'react';

// Custom hook for 360 Magicians API
function useMagiciansAPI(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAgent = async (agentType, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`https://mbtq.dev/api/agents/\${agentType}\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`,
          'X-Client-Version': '1.0.0'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`API Error: \${response.status}\`);
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { callAgent, loading, error };
}

// Career Matching Component
function CareerMatcher({ apiKey }) {
  const { callAgent, loading, error } = useMagiciansAPI(apiKey);
  const [matches, setMatches] = useState([]);
  const [userProfile, setUserProfile] = useState({
    skills: '',
    experience: '',
    accommodations: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await callAgent('career-matching', {
        skills: userProfile.skills.split(',').map(s => s.trim()),
        experience: userProfile.experience,
        accommodations: userProfile.accommodations.split(',').map(s => s.trim())
      });
      
      setMatches(result.matches || []);
    } catch (err) {
      console.error('Career matching failed:', err);
    }
  };

  return (
    <div className="career-matcher">
      <h2>AI-Powered Career Matching</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skills (comma-separated):</label>
          <input
            type="text"
            value={userProfile.skills}
            onChange={(e) => setUserProfile({...userProfile, skills: e.target.value})}
            placeholder="JavaScript, React, Node.js"
          />
        </div>
        
        <div>
          <label>Experience:</label>
          <input
            type="text"
            value={userProfile.experience}
            onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
            placeholder="3 years"
          />
        </div>
        
        <div>
          <label>Accommodations:</label>
          <input
            type="text"
            value={userProfile.accommodations}
            onChange={(e) => setUserProfile({...userProfile, accommodations: e.target.value})}
            placeholder="ASL interpreter, visual alerts"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Finding Matches...' : 'Find Career Matches'}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}
      
      {matches.length > 0 && (
        <div className="matches">
          <h3>Career Matches:</h3>
          {matches.map((match, index) => (
            <div key={index} className="match">
              <h4>{match.title}</h4>
              <p>Company: {match.company}</p>
              <p>Match Score: {match.matchScore}</p>
              <p>Accommodation Friendly: {match.accommodationFriendly ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareerMatcher;`,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              mbtq.dev
            </h1>
            <Book className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xl text-slate-600 mb-2">360 Magicians Developer API Hub</p>
          <p className="text-lg text-slate-500 mb-4">
            Build accessibility into every application with our VERTICAL AI Platform
          </p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              🚀 Production API: mbtq.dev
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🌐 Main Platform: 360magicians.com
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              🤖 12 Federated AI Agents
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-slate-600">AI Agents</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-slate-600">Uptime SLA</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">&lt;200ms</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">70M+</div>
              <div className="text-sm text-slate-600">Users Served</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="quickstart" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="sdks">SDKs & Libraries</TabsTrigger>
            <TabsTrigger value="playground">API Playground</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Get Started in 5 Minutes
                </CardTitle>
                <CardDescription>Integrate 360 Magicians accessibility AI into your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Key className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-medium mb-2">1. Get API Key</h3>
                    <p className="text-sm text-slate-600">Sign up and get your API key</p>
                    <Button size="sm" className="mt-2">
                      Get API Key
                    </Button>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Code className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-medium mb-2">2. Make API Call</h3>
                    <p className="text-sm text-slate-600">Call any of our 12 AI agents</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      View Examples
                    </Button>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-medium mb-2">3. Go Live</h3>
                    <p className="text-sm text-slate-600">Deploy accessibility features</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      Deploy
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Quick Start Example</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(codeExamples.javascript.split("\n").slice(0, 20).join("\n"), "quickstart")
                      }
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCode === "quickstart" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{`// Install the SDK
npm install @360magicians/api-client

// Initialize and use
import { MagiciansAPI } from '@360magicians/api-client';

const api = new MagiciansAPI('your-api-key');

// Career matching example
const result = await api.matchCareer({
  skills: ['JavaScript', 'React'],
  accommodations: ['ASL interpreter']
});

console.log('Matches:', result.matches);`}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-800 mb-2">🚀 Production Ready</h4>
                      <p className="text-sm text-blue-700">
                        Enterprise-grade API with 99.9% uptime SLA and global edge deployment
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-800 mb-2">🌍 Global Scale</h4>
                      <p className="text-sm text-green-700">
                        Serving 70+ million deaf users worldwide with real-time accessibility
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Complete list of available AI agents and their endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint) => (
                    <Card key={endpoint.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-lg">{endpoint.name}</h4>
                            <p className="text-sm text-slate-600">{endpoint.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {endpoint.method}
                          </Badge>
                        </div>

                        <div className="bg-slate-100 rounded p-2 mb-3">
                          <code className="text-sm">
                            {endpoint.method} https://mbtq.dev{endpoint.endpoint}
                          </code>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Rate Limit:</span>
                            <div className="text-slate-600">{endpoint.rateLimit}</div>
                          </div>
                          <div>
                            <span className="font-medium">Pricing:</span>
                            <div className="text-slate-600">{endpoint.pricing}</div>
                          </div>
                          <div>
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4 mr-1" />
                              Try It
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Ready-to-use code examples in multiple languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                  </TabsList>

                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="bg-slate-900 rounded-lg p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400 text-sm capitalize">{lang} Example</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(code, lang)}
                            className="text-slate-400 hover:text-white"
                          >
                            {copiedCode === lang ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <ScrollArea className="h-96">
                          <pre className="text-green-400 text-sm">
                            <code>{code}</code>
                          </pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>Secure your API calls with proper authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">API Key Authentication</h4>
                    <div className="bg-slate-100 rounded p-3 mb-3">
                      <code className="text-sm">Authorization: Bearer your-api-key-here</code>
                    </div>
                    <p className="text-sm text-slate-600">
                      Include your API key in the Authorization header of every request.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Rate Limiting</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Free Tier:</span>
                        <span className="font-medium">1,000 requests/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pro Tier:</span>
                        <span className="font-medium">100,000 requests/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enterprise:</span>
                        <span className="font-medium">Unlimited</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Security Best Practices</h4>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                        <li>• Never expose API keys in client-side code</li>
                        <li>• Use environment variables for API keys</li>
                        <li>• Rotate API keys regularly</li>
                        <li>• Monitor API usage for unusual activity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Authentication Example</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(
                          `const headers = {
  'Authorization': 'Bearer your-api-key-here',
  'Content-Type': 'application/json',
  'X-Client-Version': '1.0.0'
};

fetch('https://mbtq.dev/api/agents/career-matching', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
});`,
                          "auth",
                        )
                      }
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCode === "auth" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-green-400 text-sm">
                    <code>{`const headers = {
  'Authorization': 'Bearer your-api-key-here',
  'Content-Type': 'application/json',
  'X-Client-Version': '1.0.0'
};

fetch('https://mbtq.dev/api/agents/career-matching', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
});`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  SDKs & Libraries
                </CardTitle>
                <CardDescription>Official SDKs and community libraries for easy integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "JavaScript/Node.js SDK",
                      package: "@360magicians/api-client",
                      install: "npm install @360magicians/api-client",
                      status: "Official",
                      version: "v1.2.0",
                    },
                    {
                      name: "Python SDK",
                      package: "magicians-api",
                      install: "pip install magicians-api",
                      status: "Official",
                      version: "v1.1.0",
                    },
                    {
                      name: "React Components",
                      package: "@360magicians/react",
                      install: "npm install @360magicians/react",
                      status: "Official",
                      version: "v0.9.0",
                    },
                    {
                      name: "PHP SDK",
                      package: "360magicians/php-client",
                      install: "composer require 360magicians/php-client",
                      status: "Community",
                      version: "v0.8.0",
                    },
                    {
                      name: "Ruby Gem",
                      package: "magicians_api",
                      install: "gem install magicians_api",
                      status: "Community",
                      version: "v0.7.0",
                    },
                    {
                      name: "Go Module",
                      package: "github.com/360magicians/go-client",
                      install: "go get github.com/360magicians/go-client",
                      status: "Community",
                      version: "v0.6.0",
                    },
                  ].map((sdk) => (
                    <Card key={sdk.name} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{sdk.name}</h4>
                          <Badge variant={sdk.status === "Official" ? "default" : "secondary"}>{sdk.status}</Badge>
                        </div>

                        <div className="bg-slate-100 rounded p-2 mb-3">
                          <code className="text-xs">{sdk.install}</code>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{sdk.version}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Docs
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Install
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">🚀 Coming Soon</h4>
                  <p className="text-sm text-blue-700 mb-3">We're working on SDKs for more languages and frameworks:</p>
                  <div className="flex flex-wrap gap-2">
                    {["C#/.NET", "Java", "Swift/iOS", "Kotlin/Android", "Flutter", "Unity"].map((lang) => (
                      <Badge key={lang} variant="outline" className="text-blue-700 border-blue-300">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  API Playground
                </CardTitle>
                <CardDescription>Test API endpoints directly in your browser</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Request</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Endpoint</label>
                        <select className="w-full mt-1 p-2 border rounded">
                          <option>/api/agents/career-matching</option>
                          <option>/api/agents/vr-coordination</option>
                          <option>/api/agents/document-translation</option>
                          <option>/api/agents/interview-prep</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Request Body</label>
                        <textarea
                          className="w-full mt-1 p-2 border rounded h-32 font-mono text-sm"
                          defaultValue={JSON.stringify(
                            {
                              skills: ["JavaScript", "React", "Node.js"],
                              experience: "3 years",
                              accommodations: ["ASL interpreter", "visual alerts"],
                              preferences: ["remote work", "tech industry"],
                            },
                            null,
                            2,
                          )}
                        />
                      </div>

                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Send Request
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Response</h4>
                    <div className="bg-slate-900 rounded p-4 h-80 overflow-auto">
                      <pre className="text-green-400 text-sm">
                        <code>
                          {JSON.stringify(
                            {
                              success: true,
                              matches: [
                                {
                                  title: "Senior Software Engineer",
                                  company: "TechCorp Inc.",
                                  location: "Remote",
                                  accommodationFriendly: true,
                                  matchScore: "92%",
                                  description: "Full-stack development role with accessibility focus",
                                },
                                {
                                  title: "Frontend Developer",
                                  company: "AccessTech Solutions",
                                  location: "San Francisco, CA",
                                  accommodationFriendly: true,
                                  matchScore: "88%",
                                  description: "React specialist for accessibility platform",
                                },
                              ],
                              requestId: "req_123456789",
                              processingTime: "0.234s",
                            },
                            null,
                            2,
                          )}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Accessible Applications?</h3>
              <p className="text-lg text-slate-600 mb-6">
                Join thousands of developers making the web accessible for 70+ million deaf users
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Key className="h-5 w-5 mr-2" />
                  Get API Key
                </Button>
                <Button size="lg" variant="outline">
                  <Globe className="h-5 w-5 mr-2" />
                  View 360magicians.com
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-slate-500">
            <p>© 2025 360 Magicians | Developer API Hub - mbtq.dev</p>
            <p className="mt-1">🌟 VERTICAL AI Platform - Universal Digital Accessibility Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  )
}
