/**
 * SignerPanel Component
 * Persistent, dockable sign language visual panel
 */

"use client"

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Minimize2, Settings, Play, Pause, RotateCcw } from "lucide-react";
import { useSignState } from "@/hooks/sign-visual/useSignState";
import { cn } from "@/lib/utils";
import StateIndicator from "./StateIndicator";
import ConfidenceCue from "./ConfidenceCue";

export interface SignerPanelProps {
  defaultDocked?: boolean;
  defaultSize?: "small" | "medium" | "large";
  className?: string;
}

export default function SignerPanel({
  defaultDocked = true,
  defaultSize = "medium",
  className,
}: SignerPanelProps) {
  const { currentState, currentEvent, isConnected } = useSignState();
  const [isDocked, setIsDocked] = useState(defaultDocked);
  const [panelSize, setPanelSize] = useState(defaultSize);
  const [speed, setSpeed] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: "w-48 h-48",
    medium: "w-72 h-72",
    large: "w-96 h-96",
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        "signer-panel",
        isDocked ? "fixed right-4 bottom-4 z-50" : "relative",
        sizeClasses[panelSize],
        className
      )}
    >
      <Card className="h-full flex flex-col shadow-lg">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Sign Visual</CardTitle>
              {isConnected ? (
                <Badge variant="default" className="text-xs">
                  Live
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Offline
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-7 w-7 p-0"
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDocked(!isDocked)}
                className="h-7 w-7 p-0"
              >
                {isDocked ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
          {/* State Indicator */}
          <div className="flex-1 flex items-center justify-center">
            <StateIndicator state={currentState} event={currentEvent} size={panelSize} />
          </div>

          {/* Confidence Cue */}
          {currentEvent?.confidence !== undefined && (
            <ConfidenceCue confidence={currentEvent.confidence} />
          )}

          {/* Actor Badge */}
          {currentEvent && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Actor:</span>
              <Badge variant="outline">{currentEvent.actor}</Badge>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="space-y-3 pt-3 border-t">
              <div className="space-y-2">
                <label className="text-xs text-slate-600">Size</label>
                <div className="flex gap-1">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <Button
                      key={size}
                      variant={panelSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPanelSize(size)}
                      className="text-xs flex-1"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-600">Speed: {speed.toFixed(1)}x</label>
                <Slider
                  value={[speed]}
                  onValueChange={([value]) => setSpeed(value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Message Display */}
          {currentEvent?.message && (
            <div className="text-xs text-slate-600 text-center line-clamp-2">
              {currentEvent.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
