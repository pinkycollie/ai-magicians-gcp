"use client"

import { useChat } from "ai/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, Zap } from "lucide-react"
import { useEffect, useRef } from "react"
import { stateMachine } from "@/sign-visual/engine/stateMachine"

interface ChatInterfaceProps {
  selectedAgent: string
}

export default function ChatInterface({ selectedAgent }: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: process.env.NODE_ENV === "production" ? "https://mbtq.dev/api/chat" : "/api/chat",
    body: {
      agentType: selectedAgent,
    },
    maxSteps: 3,
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Emit state changes based on chat activity
  useEffect(() => {
    if (isLoading) {
      stateMachine.emit({
        actor: "MagicianCore",
        state: "processing",
        confidence: 0.85,
        requiresUser: false,
        message: "Agent is thinking...",
      })
    } else if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant") {
        stateMachine.emit({
          actor: "MagicianCore",
          state: "completed",
          confidence: 0.95,
          requiresUser: false,
          message: "Response ready",
        })
      }
    } else {
      stateMachine.emit({
        actor: "System",
        state: "idle",
        requiresUser: false,
        message: "Ready for input",
      })
    }
  }, [isLoading, messages])

  // Handle input changes - emit listening state
  const handleInputChangeWithState = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    if (e.target.value.length > 0) {
      stateMachine.emit({
        actor: "User",
        state: "listening",
        requiresUser: false,
        message: "Listening to your input...",
      })
    }
  }

  // Handle form submission - emit executing state
  const handleSubmitWithState = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    stateMachine.emit({
      actor: "MagicianCore",
      state: "executing",
      confidence: 0.8,
      requiresUser: false,
      message: "Sending to agent...",
    })
  }

  const getAgentInfo = (agentId: string) => {
    const agentMap: Record<string, { name: string; description: string; color: string }> = {
      "career-matching": {
        name: "Career Matching AI",
        description: "Intelligent pairing of skills, accommodations, and job requirements",
        color: "bg-blue-500",
      },
      "vr-coordination": {
        name: "VR Coordination AI",
        description: "VURA AI integration with vr4deaf.org for VR/AR rehabilitation",
        color: "bg-green-500",
      },
      "interview-prep": {
        name: "Interview Prep AI",
        description: "Accessibility-focused preparation and simulation",
        color: "bg-purple-500",
      },
      "workplace-accommodation": {
        name: "Workplace Accommodation AI",
        description: "Automated accommodation coordination and tracking",
        color: "bg-orange-500",
      },
      "startup-incubation": {
        name: "Startup Incubation AI",
        description: "Resource identification and business model validation",
        color: "bg-emerald-500",
      },
      "document-translation": {
        name: "Document Translation AI",
        description: "Complex document simplification and accessibility",
        color: "bg-cyan-500",
      },
      "funding-intelligence": {
        name: "Funding Intelligence AI",
        description: "Grant and funding source identification and matching",
        color: "bg-indigo-500",
      },
      "growth-planning": {
        name: "Growth Planning AI",
        description: "Strategic business development and scaling strategies",
        color: "bg-pink-500",
      },
      "workforce-partnership": {
        name: "Workforce Partnership AI",
        description: "Employer network coordination and accessibility training",
        color: "bg-teal-500",
      },
      "case-management": {
        name: "Case Management AI",
        description: "Unified tracking across rehabilitation and career services",
        color: "bg-violet-500",
      },
      "progress-analytics": {
        name: "Progress Analytics AI",
        description: "Performance tracking and outcome optimization",
        color: "bg-rose-500",
      },
      "community-intelligence": {
        name: "Community Intelligence AI",
        description: "Feedback processing and continuous improvement",
        color: "bg-amber-500",
      },
    }

    return (
      agentMap[agentId] || {
        name: "Unknown Agent",
        description: "Agent information not available",
        color: "bg-gray-500",
      }
    )
  }

  const agentInfo = getAgentInfo(selectedAgent)

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${agentInfo.color}`}>
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {agentInfo.name}
              <Badge variant="outline" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Federated Worker
              </Badge>
            </CardTitle>
            <CardDescription>{agentInfo.description}</CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
            Active @ mbtq.dev
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium mb-2">Welcome to {agentInfo.name}</p>
                <p className="text-sm">{agentInfo.description}</p>
                <p className="text-sm mt-2">Powered by VERTICAL AI Platform - Start a conversation!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className={`p-2 rounded-lg ${agentInfo.color} flex-shrink-0`}>
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {message.toolInvocations && message.toolInvocations.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.toolInvocations.map((tool, index) => (
                        <div key={index} className="text-xs bg-white/20 rounded p-2">
                          <div className="font-medium">🔧 {tool.toolName}</div>
                          {tool.result && (
                            <div className="mt-1 opacity-80">
                              {typeof tool.result === "string" ? tool.result : JSON.stringify(tool.result, null, 2)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="p-2 rounded-lg bg-blue-500 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className={`p-2 rounded-lg ${agentInfo.color} flex-shrink-0`}>
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-slate-600">Federated AI worker processing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmitWithState} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChangeWithState}
              placeholder={`Ask ${agentInfo.name} for assistance...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Powered by VERTICAL AI Platform • API: mbtq.dev • Production: 360magicians.com
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
