"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { User, Palette, Settings, Play, Download } from "lucide-react"
import { useState } from "react"

export default function AvatarGeneration() {
  const [realism, setRealism] = useState([75])
  const [expressiveness, setExpressiveness] = useState([90])
  const [culturalAccuracy, setCulturalAccuracy] = useState([95])

  const avatarStyles = [
    {
      id: "photorealistic",
      name: "Photorealistic Human",
      description: "Ultra-realistic human avatars with natural expressions",
      pros: ["Maximum emotional connection", "Professional appearance", "Cultural authenticity"],
      cons: ["Higher computational cost", "Uncanny valley risk", "Slower rendering"],
      useCases: ["Healthcare", "Legal", "Enterprise"],
      accuracy: 98,
      performance: 72,
      cost: "High",
    },
    {
      id: "stylized-realistic",
      name: "Stylized Realistic",
      description: "Balanced approach with human-like features and artistic style",
      pros: ["Avoids uncanny valley", "Good performance", "Appealing design"],
      cons: ["Less emotional depth", "May seem less professional"],
      useCases: ["Education", "Customer Service", "Entertainment"],
      accuracy: 94,
      performance: 88,
      cost: "Medium",
    },
    {
      id: "cartoon-expressive",
      name: "Cartoon Expressive",
      description: "Highly expressive cartoon-style avatars with exaggerated features",
      pros: ["Maximum expressiveness", "Fast rendering", "Universal appeal"],
      cons: ["Less professional", "May lack gravitas", "Cultural concerns"],
      useCases: ["Education", "Entertainment", "Social Media"],
      accuracy: 89,
      performance: 95,
      cost: "Low",
    },
  ]

  const culturalFeatures = [
    {
      name: "Facial Expressions",
      description: "Culturally appropriate emotional expressions in sign language",
      importance: "Critical",
    },
    {
      name: "Hand Positioning",
      description: "Precise finger and hand positioning for accurate signs",
      importance: "Critical",
    },
    {
      name: "Body Language",
      description: "Appropriate posture and movement for sign language context",
      importance: "High",
    },
    {
      name: "Eye Contact",
      description: "Culturally appropriate eye contact patterns",
      importance: "High",
    },
    {
      name: "Clothing & Appearance",
      description: "Professional, accessible clothing that doesn't interfere with signing",
      importance: "Medium",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Avatar Generation System</h2>
        <p className="text-lg text-slate-600">Creating culturally authentic sign language avatars</p>
      </div>

      <Tabs defaultValue="styles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="styles">Avatar Styles</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Features</TabsTrigger>
        </TabsList>

        <TabsContent value="styles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avatarStyles.map((style) => (
              <Card key={style.id} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <CardTitle className="text-lg">{style.name}</CardTitle>
                  </div>
                  <CardDescription>{style.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sign Accuracy</span>
                      <span>{style.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${style.accuracy}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance</span>
                      <span>{style.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${style.performance}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cost</span>
                    <Badge
                      variant={
                        style.cost === "High" ? "destructive" : style.cost === "Medium" ? "default" : "secondary"
                      }
                    >
                      {style.cost}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-green-600">Advantages</h4>
                    <ul className="text-xs space-y-1">
                      {style.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-orange-600">Considerations</h4>
                    <ul className="text-xs space-y-1">
                      {style.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-orange-500 rounded-full" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-1">
                      {style.useCases.map((useCase) => (
                        <Badge key={useCase} variant="outline" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Preview Style
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Avatar Customization Controls
              </CardTitle>
              <CardDescription>Fine-tune avatar appearance and behavior</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Realism Level</label>
                  <Slider value={realism} onValueChange={setRealism} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Cartoon</span>
                    <span>{realism[0]}%</span>
                    <span>Photorealistic</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Expressiveness</label>
                  <Slider
                    value={expressiveness}
                    onValueChange={setExpressiveness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Subtle</span>
                    <span>{expressiveness[0]}%</span>
                    <span>Highly Expressive</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Cultural Accuracy</label>
                  <Slider
                    value={culturalAccuracy}
                    onValueChange={setCulturalAccuracy}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Generic</span>
                    <span>{culturalAccuracy[0]}%</span>
                    <span>Culturally Authentic</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Real-time Rendering</label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Emotion Detection</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Lip Sync</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Background Removal</label>
                  <Switch />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Generate Preview
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Cultural Authenticity Features
              </CardTitle>
              <CardDescription>Ensuring respectful and accurate representation</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {culturalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{feature.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{feature.description}</p>
                    </div>
                    <Badge
                      variant={
                        feature.importance === "Critical"
                          ? "destructive"
                          : feature.importance === "High"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {feature.importance}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-sm text-blue-800 mb-2">Community Validation</h4>
                <p className="text-xs text-blue-700">
                  All avatar designs are reviewed and validated by deaf community members to ensure cultural
                  authenticity and respectful representation. We prioritize feedback from native signers and deaf
                  cultural experts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
