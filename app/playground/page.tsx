"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Play, Copy, CheckCircle, Loader2, AlertCircle } from "lucide-react"

export default function APIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("career-matching")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [copied, setCopied] = useState(false)

  const endpoints = [
    {
      id: "career-matching",
      name: "Career Matching AI",
      path: "/api/agents/career-matching",
      example: {
        skills: ["JavaScript", "React", "Node.js"],
        experience: "3 years",
        accommodations: ["ASL interpreter", "visual alerts"],
        preferences: ["remote work", "tech industry"],
      },
    },
    {
      id: "vr-coordination",
      name: "VR Coordination AI",
      path: "/api/agents/vr-coordination",
      example: {
        clientId: "client-123",
        vrAgency: "State VR Services",
        accommodationNeeds: ["interpreter", "visual aids"],
        aslRequirements: "fluent",
      },
    },
    {
      id: "document-translation",
      name: "Document Translation AI",
      path: "/api/agents/document-translation",
      example: {
        documentType: "legal",
        content: "Complex legal document text here...",
        targetAudience: "deaf-community",
        accessibilityLevel: "high",
      },
    },
    {
      id: "interview-prep",
      name: "Interview Prep AI",
      path: "/api/agents/interview-prep",
      example: {
        jobRole: "Software Engineer",
        company: "Tech Corp",
        accommodations: ["ASL interpreter", "extra time"],
        experienceLevel: "mid-level",
      },
    },
  ]

  const handleEndpointChange = (endpointId: string) => {
    setSelectedEndpoint(endpointId)
    const endpoint = endpoints.find((e) => e.id === endpointId)
    if (endpoint) {
      setRequestBody(JSON.stringify(endpoint.example, null, 2))
    }
    setResponse("")
  }

  const handleSendRequest = async () => {
    if (!apiKey) {
      setResponse(
        JSON.stringify(
          {
            error: "API key required",
            message: "Please enter your API key to test the endpoint",
          },
          null,
          2,
        ),
      )
      return
    }

    setLoading(true)

    try {
      // Simulate API call (in real implementation, this would call the actual API)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockResponse = {
        success: true,
        data:
          selectedEndpoint === "career-matching"
            ? {
                matches: [
                  {
                    title: "Senior Software Engineer",
                    company: "TechCorp Inc.",
                    location: "Remote",
                    accommodationFriendly: true,
                    matchScore: "92%",
                  },
                  {
                    title: "Frontend Developer",
                    company: "AccessTech Solutions",
                    location: "San Francisco, CA",
                    accommodationFriendly: true,
                    matchScore: "88%",
                  },
                ],
              }
            : selectedEndpoint === "vr-coordination"
              ? {
                  coordinationStatus: "active",
                  vrPlan: {
                    agency: "State VR Services",
                    accommodations: ["interpreter", "visual aids"],
                    nextSteps: ["Schedule intake", "Assessment planning"],
                  },
                }
              : selectedEndpoint === "document-translation"
                ? {
                    translatedContent: "Simplified version of the legal document...",
                    readabilityScore: "Grade 8 level",
                    accessibilityFeatures: ["Clear headings", "Plain language", "Visual elements described"],
                  }
                : {
                    interviewPlan: {
                      preparation: ["Technical questions", "Behavioral scenarios"],
                      accommodations: ["ASL interpreter scheduled", "Extra time allocated"],
                      tips: ["Practice with accessibility tools", "Review company culture"],
                    },
                  },
        requestId: `req_${Date.now()}`,
        processingTime: "0.234s",
      }

      setResponse(JSON.stringify(mockResponse, null, 2))
    } catch (error) {
      setResponse(
        JSON.stringify(
          {
            error: "Request failed",
            message: "An error occurred while processing your request",
          },
          null,
          2,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentEndpoint = endpoints.find((e) => e.id === selectedEndpoint)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">API Playground</h1>
          <p className="text-lg text-slate-600">Test 360 Magicians AI agents in real-time</p>
          <Badge variant="outline" className="mt-2">
            Interactive Testing Environment
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Request Configuration
              </CardTitle>
              <CardDescription>Configure and send API requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <Input
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Get your API key at{" "}
                  <a href="#" className="text-blue-600">
                    mbtq.dev/signup
                  </a>
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Endpoint</label>
                <Select value={selectedEndpoint} onValueChange={handleEndpointChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {endpoints.map((endpoint) => (
                      <SelectItem key={endpoint.id} value={endpoint.id}>
                        {endpoint.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {currentEndpoint && (
                  <div className="mt-2 p-2 bg-slate-100 rounded text-sm">
                    <code>POST https://mbtq.dev{currentEndpoint.path}</code>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Request Body (JSON)</label>
                <Textarea
                  className="font-mono text-sm h-64"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder="Enter JSON request body..."
                />
              </div>

              <Button onClick={handleSendRequest} disabled={loading || !apiKey} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>

              {!apiKey && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-700">API key required to test endpoints</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Response Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Response</span>
                {response && (
                  <Button size="sm" variant="outline" onClick={copyResponse}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </CardTitle>
              <CardDescription>API response will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="bg-slate-900 rounded p-4 h-96 overflow-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{response}</code>
                  </pre>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded">
                  <div className="text-center">
                    <Play className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>Send a request to see the response</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Examples */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Examples</CardTitle>
            <CardDescription>Common use cases and example requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {endpoints.map((endpoint) => (
                <Card
                  key={endpoint.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEndpointChange(endpoint.id)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2">{endpoint.name}</h4>
                    <div className="bg-slate-100 rounded p-2">
                      <code className="text-xs">{endpoint.path}</code>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                      Load Example
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
