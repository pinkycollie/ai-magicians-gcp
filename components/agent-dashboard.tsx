"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { stateMachine } from "@/sign-visual/engine/stateMachine"
import { useEffect } from "react"

interface Agent {
  id: string
  name: string
  description: string
  icon: any
}

interface AgentCategory {
  title: string
  icon: any
  color: string
  agents: Agent[]
}

interface AgentDashboardProps {
  agentCategories: Record<string, AgentCategory>
  selectedAgent: string
  onAgentSelect: (agentId: string) => void
}

export default function AgentDashboard({ agentCategories, selectedAgent, onAgentSelect }: AgentDashboardProps) {
  // Emit idle state when dashboard is loaded
  useEffect(() => {
    stateMachine.emit({
      actor: "System",
      state: "idle",
      requiresUser: false,
      message: "Dashboard ready - select an agent",
    })
  }, [])

  const handleAgentSelect = (agentId: string) => {
    // Emit deciding state when selecting agent
    stateMachine.emit({
      actor: "User",
      state: "deciding",
      confidence: 0.9,
      requiresUser: false,
      message: "Selecting agent...",
    })

    onAgentSelect(agentId)

    // Emit completed state after selection
    setTimeout(() => {
      stateMachine.emit({
        actor: "System",
        state: "completed",
        confidence: 1.0,
        requiresUser: false,
        message: "Agent selected successfully",
      })
    }, 300)
  }
  const getAgentStatus = (agentId: string) => {
    // Simulate different agent statuses
    const statuses = ["active", "training", "idle", "maintenance"]
    const status = statuses[agentId.length % statuses.length]

    switch (status) {
      case "active":
        return { label: "Active", color: "bg-green-500", icon: CheckCircle }
      case "training":
        return { label: "Training", color: "bg-blue-500", icon: Activity }
      case "idle":
        return { label: "Idle", color: "bg-yellow-500", icon: Clock }
      default:
        return { label: "Maintenance", color: "bg-red-500", icon: AlertCircle }
    }
  }

  const getAgentMetrics = (agentId: string) => {
    // Simulate metrics
    return {
      requests: Math.floor(Math.random() * 1000) + 100,
      accuracy: (Math.random() * 10 + 90).toFixed(1),
      responseTime: (Math.random() * 500 + 100).toFixed(0),
    }
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AI Agents</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 3 categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">75% operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Requests</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Categories */}
      {Object.entries(agentCategories).map(([categoryKey, category]) => (
        <div key={categoryKey}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <category.icon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">{category.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.agents.map((agent) => {
              const status = getAgentStatus(agent.id)
              const metrics = getAgentMetrics(agent.id)
              const StatusIcon = status.icon

              return (
                <Card
                  key={agent.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedAgent === agent.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleAgentSelect(agent.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <agent.icon className="h-8 w-8 text-blue-600" />
                      <Badge variant="outline" className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${status.color}`} />
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="text-sm">{agent.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Requests:</span>
                        <span className="font-medium">{metrics.requests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Accuracy:</span>
                        <span className="font-medium">{metrics.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Response:</span>
                        <span className="font-medium">{metrics.responseTime}ms</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full mt-4"
                      variant={selectedAgent === agent.id ? "default" : "outline"}
                    >
                      {selectedAgent === agent.id ? "Selected" : "Select Agent"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
