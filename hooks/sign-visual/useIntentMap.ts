/**
 * React Hook for Intent Mapping
 * Maps user intents and system actions to sign semantics
 */

"use client"

import { useState, useEffect } from "react";
import intentMap from "@/sign-visual/semantics/intent.map.json";
import systemMap from "@/sign-visual/semantics/system.map.json";

export interface IntentMapping {
  semantic: string;
  gesture: string;
  priority?: string;
  state?: string;
}

export function useIntentMap() {
  const [intentMappings] = useState(intentMap.mappings);
  const [systemMappings] = useState(systemMap.mappings);
  const [confidenceLevels] = useState(intentMap.confidence_levels);

  const getIntentMapping = (intent: string): IntentMapping | null => {
    const mapping = intentMappings[intent as keyof typeof intentMappings];
    return mapping || null;
  };

  const getSystemMapping = (action: string): IntentMapping | null => {
    const mapping = systemMappings[action as keyof typeof systemMappings];
    return mapping || null;
  };

  const getConfidenceLevel = (confidence: number): { range: [number, number]; gesture_modifier: string } | null => {
    for (const [level, config] of Object.entries(confidenceLevels)) {
      const [min, max] = config.range;
      if (confidence >= min && confidence <= max) {
        return config;
      }
    }
    return null;
  };

  return {
    getIntentMapping,
    getSystemMapping,
    getConfidenceLevel,
    intentMappings,
    systemMappings,
    confidenceLevels,
  };
}

export default useIntentMap;
