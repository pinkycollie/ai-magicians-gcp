/**
 * StateIndicator Component
 * Visual representation of current system state
 */

"use client"

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { SignState, StateEvent } from "@/sign-visual/engine/stateMachine";

export interface StateIndicatorProps {
  state: SignState;
  event: StateEvent | null;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function StateIndicator({
  state,
  event,
  size = "medium",
  className,
}: StateIndicatorProps) {
  const [stateData, setStateData] = useState<any>(null);

  useEffect(() => {
    // Load state visual data
    fetch(`/sign-visual/states/${state}.json`)
      .then((res) => res.json())
      .then((data) => setStateData(data))
      .catch((err) => console.error("Failed to load state data:", err));
  }, [state]);

  const sizeClasses = {
    small: "w-24 h-24 text-3xl",
    medium: "w-32 h-32 text-5xl",
    large: "w-48 h-48 text-7xl",
  };

  const stateIcons: Record<SignState, string> = {
    idle: "⭕",
    listening: "👂",
    processing: "🤔",
    validating: "✓",
    deciding: "⚖️",
    executing: "⚡",
    completed: "✅",
    error: "❌",
    warning: "⚠️",
  };

  const stateColors: Record<SignState, string> = {
    idle: "bg-slate-100 border-slate-300",
    listening: "bg-blue-100 border-blue-300",
    processing: "bg-violet-100 border-violet-300",
    validating: "bg-cyan-100 border-cyan-300",
    deciding: "bg-amber-100 border-amber-300",
    executing: "bg-emerald-100 border-emerald-300",
    completed: "bg-green-100 border-green-300",
    error: "bg-red-100 border-red-300",
    warning: "bg-yellow-100 border-yellow-300",
  };

  const stateLabels: Record<SignState, string> = {
    idle: "Ready",
    listening: "Listening",
    processing: "Thinking",
    validating: "Checking",
    deciding: "Deciding",
    executing: "Working",
    completed: "Done",
    error: "Error",
    warning: "Caution",
  };

  const animationClasses: Record<SignState, string> = {
    idle: "animate-pulse",
    listening: "animate-bounce",
    processing: "animate-spin",
    validating: "animate-pulse",
    deciding: "animate-bounce",
    executing: "animate-pulse",
    completed: "",
    error: "animate-ping",
    warning: "animate-pulse",
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-4",
          sizeClasses[size],
          stateColors[state],
          animationClasses[state]
        )}
      >
        <span className="select-none">{stateIcons[state]}</span>
      </div>
      
      <div className="text-center">
        <div className="font-medium text-sm">{stateLabels[state]}</div>
        {stateData && (
          <div className="text-xs text-slate-500 mt-1">
            {stateData.description}
          </div>
        )}
      </div>

      {stateData && (
        <div className="text-xs text-slate-400 text-center">
          <div>{stateData.semantics.gesture}</div>
        </div>
      )}
    </div>
  );
}
