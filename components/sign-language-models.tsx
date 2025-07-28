"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Globe, Users, Zap } from "lucide-react"

export default function SignLanguageModels() {
  const signLanguageModels = [
    {
      id: "asl",
      name: "American Sign Language (ASL)",
      region: "North America",
      speakers: "500,000+",
      accuracy: 94,
      status: "Production Ready",
      priority: "Primary",
      features: ["Real-time translation", "Avatar generation", "Gesture recognition", "Facial expressions"],
      industries: ["Healthcare", "Education", "Legal", "Customer Service"],
      color: "bg-blue-500",
    },
    {
      id: "bsl",
      name: "British Sign Language (BSL)",
      region: "United Kingdom",
      speakers: "150,000+",
      accuracy: 91,
      status: "Beta Testing",
      priority: "Secondary",
      features: ["Two-handed fingerspelling", "Regional dialects", "Cultural context"],
      industries: ["Healthcare", "Government", "Education"],
      color: "bg-green-500",
    },
    {
      id: "auslan",
      name: "Australian Sign Language (Auslan)",
      region: "Australia/New Zealand",
      speakers: "16,000+",
      accuracy: 88,
      status: "Development",
      priority: "Expansion",
      features: ["One-handed fingerspelling", "Indigenous integration"],
      industries: ["Healthcare", "Tourism", "Education"],
      color: "bg-orange-500",
    },
    {
      id: "lsf",
      name: "French Sign Language (LSF)",
      region: "France/Francophone",
      speakers: "100,000+",
      accuracy: 85,
      status: "Research",
      priority: "Future",
      features: ["Historical significance", "International influence"],
      industries: ["Education", "Cultural", "Tourism"],
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Universal Sign Language AI Models</h2>
        <p className="text-lg text-slate-600">Making every digital experience accessible worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {signLanguageModels.map((model) => (
          <Card key={model.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 ${model.color}`} />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {model.name}
                  </CardTitle>
                  <CardDescription>{model.region}</CardDescription>
                </div>
                <Badge variant={model.status === "Production Ready" ? "default" : "secondary"}>{model.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>{model.speakers} speakers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-slate-500" />
                  <span>Priority: {model.priority}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Model Accuracy</span>
                  <span>{model.accuracy}%</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-1">
                  {model.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Target Industries</h4>
                <div className="flex flex-wrap gap-1">
                  {model.industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant={model.status === "Production Ready" ? "default" : "outline"}>
                {model.status === "Production Ready" ? "Deploy Model" : "View Progress"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
