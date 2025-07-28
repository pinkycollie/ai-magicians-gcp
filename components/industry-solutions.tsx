"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, GraduationCap, Scale, Headphones, Play, Building2, DollarSign, Zap, Globe } from "lucide-react"

export default function IndustrySolutions() {
  const industries = [
    {
      id: "healthcare",
      name: "Healthcare",
      icon: Heart,
      priority: "Immediate Launch",
      marketSize: "$4.5B",
      impact: "Life-saving communication",
      color: "bg-red-500",
      solutions: [
        "Doctor-patient real-time translation",
        "Emergency room ASL interpretation",
        "Telemedicine sign language support",
        "Medical procedure explanations",
        "Prescription and treatment guidance",
      ],
      pricing: "$299-$2,999/month",
      compliance: ["HIPAA", "ADA", "Section 508"],
      roi: "87% reduction in interpretation costs",
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      priority: "Phase 1",
      marketSize: "$2.8B",
      impact: "Equal learning opportunities",
      color: "bg-blue-500",
      solutions: [
        "Classroom real-time interpretation",
        "Online learning accessibility",
        "Student-teacher communication",
        "Educational content translation",
        "Standardized test accommodations",
      ],
      pricing: "$99-$999/month",
      compliance: ["ADA", "IDEA", "Section 504"],
      roi: "65% improvement in deaf student outcomes",
    },
    {
      id: "legal",
      name: "Legal Services",
      icon: Scale,
      priority: "Phase 1",
      marketSize: "$1.9B",
      impact: "Equal justice access",
      color: "bg-purple-500",
      solutions: [
        "Court proceeding interpretation",
        "Legal consultation translation",
        "Document accessibility",
        "Jury duty accommodation",
        "Law enforcement communication",
      ],
      pricing: "$499-$4,999/month",
      compliance: ["ADA", "Court Rules", "Due Process"],
      roi: "92% faster case processing",
    },
    {
      id: "customer-service",
      name: "Customer Service",
      icon: Headphones,
      priority: "Phase 2",
      marketSize: "$3.2B",
      impact: "Universal customer access",
      color: "bg-green-500",
      solutions: [
        "Call center ASL support",
        "Live chat sign language",
        "Video customer service",
        "Product support translation",
        "Complaint resolution accessibility",
      ],
      pricing: "$199-$1,999/month",
      compliance: ["ADA", "FCC", "Consumer Protection"],
      roi: "78% increase in deaf customer satisfaction",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: Play,
      priority: "Phase 2",
      marketSize: "$5.1B",
      impact: "Cultural inclusion",
      color: "bg-orange-500",
      solutions: [
        "Streaming platform integration",
        "Live event interpretation",
        "Gaming accessibility",
        "Social media translation",
        "Content creator tools",
      ],
      pricing: "$99-$999/month",
      compliance: ["ADA", "CVAA", "Accessibility Standards"],
      roi: "156% growth in deaf audience engagement",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Building2,
      priority: "Phase 3",
      marketSize: "$8.7B",
      impact: "Workplace inclusion",
      color: "bg-indigo-500",
      solutions: [
        "Meeting interpretation",
        "HR communication",
        "Training accessibility",
        "Internal communications",
        "Performance reviews",
      ],
      pricing: "$999-$9,999/month",
      compliance: ["ADA", "EEO", "Workplace Standards"],
      roi: "134% improvement in deaf employee retention",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Immediate Launch":
        return "bg-red-100 text-red-800 border-red-200"
      case "Phase 1":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Phase 2":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Phase 3":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Industry-Specific Solutions</h2>
        <p className="text-lg text-slate-600">Transforming every industry with universal accessibility</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">70M+ deaf people worldwide</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">$26.2B total market opportunity</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry) => {
          const IconComponent = industry.icon
          return (
            <Card key={industry.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`absolute top-0 left-0 right-0 h-1 ${industry.color}`} />

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${industry.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{industry.name}</CardTitle>
                      <CardDescription>{industry.impact}</CardDescription>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getPriorityColor(industry.priority)}>{industry.priority}</Badge>
                  <span className="text-sm font-medium text-green-600">{industry.marketSize}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Solutions</h4>
                  <ul className="text-xs space-y-1">
                    {industry.solutions.slice(0, 3).map((solution, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                    {industry.solutions.length > 3 && (
                      <li className="text-slate-500">+{industry.solutions.length - 3} more solutions</li>
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium">Pricing:</span>
                    <div className="text-slate-600">{industry.pricing}</div>
                  </div>
                  <div>
                    <span className="font-medium">ROI:</span>
                    <div className="text-green-600">{industry.roi}</div>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-xs">Compliance:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {industry.compliance.map((comp) => (
                      <Badge key={comp} variant="outline" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant={industry.priority === "Immediate Launch" ? "default" : "outline"}>
                  {industry.priority === "Immediate Launch" ? "Launch Solution" : "View Roadmap"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Transform Digital Accessibility?</h3>
            <p className="text-slate-600 mb-4">
              Join the revolution that includes 70+ million deaf people in every digital experience
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Healthcare Pilot
              </Button>
              <Button size="lg" variant="outline">
                View Full Roadmap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
