"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BrainCircuit,
  Briefcase,
  Building2,
  Network,
  MessageSquare,
  Users,
  Target,
  Lightbulb,
  Globe,
  Rocket,
  Code,
  Zap,
} from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import AgentDashboard from "@/components/agent-dashboard"
import SignLanguageModels from "@/components/sign-language-models"
import IndustrySolutions from "@/components/industry-solutions"
import AvatarGeneration from "@/components/avatar-generation"

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<string>("career-matching")

  const agentCategories = {
    "job-agents": {
      title: "Job Development Agents",
      icon: Briefcase,
      color: "bg-blue-500",
      agents: [
        {
          id: "career-matching",
          name: "Career Matching AI",
          description: "Intelligent pairing of skills, accommodations, and job requirements",
          icon: Target,
        },
        {
          id: "vr-coordination",
          name: "VR Coordination AI",
          description: "VURA AI integration with vr4deaf.org for VR/AR rehabilitation and ASL workforce solutions",
          icon: Network,
        },
        {
          id: "interview-prep",
          name: "Interview Prep AI",
          description: "Accessibility-focused preparation and simulation",
          icon: MessageSquare,
        },
        {
          id: "workplace-accommodation",
          name: "Workplace Accommodation AI",
          description: "Automated accommodation coordination and tracking",
          icon: Users,
        },
      ],
    },
    "business-agents": {
      title: "Business Development Agents",
      icon: Building2,
      color: "bg-green-500",
      agents: [
        {
          id: "startup-incubation",
          name: "Startup Incubation AI",
          description: "Resource identification and business model validation",
          icon: Lightbulb,
        },
        {
          id: "document-translation",
          name: "Document Translation AI",
          description: "Complex document simplification and accessibility",
          icon: MessageSquare,
        },
        {
          id: "funding-intelligence",
          name: "Funding Intelligence AI",
          description: "Grant and funding source identification and matching",
          icon: Target,
        },
        {
          id: "growth-planning",
          name: "Growth Planning AI",
          description: "Strategic business development and scaling strategies",
          icon: Network,
        },
      ],
    },
    "integration-agents": {
      title: "Integration Hub Agents",
      icon: Network,
      color: "bg-purple-500",
      agents: [
        {
          id: "workforce-partnership",
          name: "Workforce Partnership AI",
          description: "Employer network coordination and accessibility training",
          icon: Users,
        },
        {
          id: "case-management",
          name: "Case Management AI",
          description: "Unified tracking across rehabilitation and career services",
          icon: Target,
        },
        {
          id: "progress-analytics",
          name: "Progress Analytics AI",
          description: "Performance tracking and outcome optimization",
          icon: BrainCircuit,
        },
        {
          id: "community-intelligence",
          name: "Community Intelligence AI",
          description: "Feedback processing and continuous improvement",
          icon: Network,
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Revolutionary Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <BrainCircuit className="h-12 w-12 text-purple-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              360 MAGICIANS
            </h1>
            <Rocket className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xl text-slate-600 mb-2">VERTICAL AI Platform - Federated AI Workers</p>
          <p className="text-lg text-slate-500 mb-4">
            Making every digital experience accessible to 70+ million deaf people worldwide
          </p>

          {/* Domain Architecture Display */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              🤖 VURA AI: vr4deaf.org (VR/AR + ASL)
            </Badge>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              🧠 Vertex AI: GCP Federated Workers
            </Badge>
          </div>

          {/* Production Domain Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-4">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-blue-800">360magicians.com</span>
                </div>
                <p className="text-sm text-blue-700">Main Production Platform</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    User Interface
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Enterprise Sales
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Community Hub
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-800">api.mbtq.dev</span>
                </div>
                <p className="text-sm text-green-700">Developer & API Hub</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    API Endpoints
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Documentation
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Staging
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Environment Status */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🔴 Production: 360magicians.com
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              🟡 API Hub: mbtq.dev
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              🟢 Auth: deafauth.mbtq.dev
            </Badge>
          </div>

          {/* Revolutionary Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">70M+</div>
              <div className="text-sm text-slate-600">Deaf People Worldwide</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">$26.2B</div>
              <div className="text-sm text-slate-600">Market Opportunity</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-slate-600">Federated AI Agents</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-slate-600">Industry Verticals</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="chat">Interactive Chat</TabsTrigger>
            <TabsTrigger value="languages">Sign Languages</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="avatars">Avatar System</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <AgentDashboard
              agentCategories={agentCategories}
              selectedAgent={selectedAgent}
              onAgentSelect={setSelectedAgent}
            />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Agent Selector */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select AI Agent</CardTitle>
                    <CardDescription>Choose a federated AI worker</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(agentCategories).map(([categoryKey, category]) => (
                      <div key={categoryKey} className="space-y-2">
                        <h4 className="font-medium text-sm text-slate-600 flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.title}
                        </h4>
                        {category.agents.map((agent) => (
                          <Button
                            key={agent.id}
                            variant={selectedAgent === agent.id ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => setSelectedAgent(agent.id)}
                          >
                            <div className="flex items-start gap-2">
                              <agent.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <div className="text-left">
                                <div className="font-medium text-xs">{agent.name}</div>
                                <div className="text-xs text-slate-500 mt-1 line-clamp-2">{agent.description}</div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <ChatInterface selectedAgent={selectedAgent} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <SignLanguageModels />
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            <IndustrySolutions />
          </TabsContent>

          <TabsContent value="avatars" className="space-y-6">
            <AvatarGeneration />
          </TabsContent>
        </Tabs>

        {/* Revolutionary Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">🚀 Accessibility-Aware VERTICAL AI Platform 
Ready for Production</h3>
              <p className="text-lg text-slate-600 mb-6">
                Federated AI workers serving 70+ million deaf people across every digital platform
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Globe className="h-5 w-5 mr-2" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe h-5 w-5 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>DEPLOY
                </Button>
                <Button size="lg" variant="outline">
                  <Code className="h-5 w-5 mr-2" />
                  Setup mbtq.dev APIs
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-slate-500">
            <p>© 2025 360 Magicians | Powered by Vertex AI Federated Workers</p>
            <p className="mt-1">🌟 VERTICAL AI Platform - Universal Digital Accessibility Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  )
}
