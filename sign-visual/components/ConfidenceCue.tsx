/**
 * ConfidenceCue Component
 * Visual representation of system confidence level
 */

"use client"

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ConfidenceCueProps {
  confidence: number;
  className?: string;
  showLabel?: boolean;
}

export default function ConfidenceCue({
  confidence,
  className,
  showLabel = true,
}: ConfidenceCueProps) {
  const getConfidenceLevel = (conf: number): string => {
    if (conf >= 0.9) return "Certain";
    if (conf >= 0.7) return "Confident";
    if (conf >= 0.5) return "Uncertain";
    return "Confused";
  };

  const getConfidenceColor = (conf: number): string => {
    if (conf >= 0.9) return "bg-green-500";
    if (conf >= 0.7) return "bg-blue-500";
    if (conf >= 0.5) return "bg-amber-500";
    return "bg-red-500";
  };

  const getConfidenceVariant = (conf: number): "default" | "secondary" | "destructive" | "outline" => {
    if (conf >= 0.9) return "default";
    if (conf >= 0.7) return "default";
    if (conf >= 0.5) return "secondary";
    return "destructive";
  };

  const confidenceLevel = getConfidenceLevel(confidence);
  const confidenceColor = getConfidenceColor(confidence);
  const confidencePercentage = Math.round(confidence * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Confidence:</span>
          <Badge variant={getConfidenceVariant(confidence)} className="text-xs">
            {confidenceLevel} ({confidencePercentage}%)
          </Badge>
        </div>
      )}
      
      <div className="relative">
        <Progress value={confidencePercentage} className="h-2" />
        <div
          className={cn(
            "absolute top-0 left-0 h-2 rounded-full transition-all",
            confidenceColor
          )}
          style={{ width: `${confidencePercentage}%` }}
        />
      </div>
    </div>
  );
}
