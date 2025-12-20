/**
 * React Hook for Intent Mapping
 * Maps user intents and system actions to sign semantics
 */

"use client"

import intentMap from "@/sign-visual/semantics/intent.map.json";
import systemMap from "@/sign-visual/semantics/system.map.json";

export interface IntentMapping {
  semantic: string;
  gesture: string;
  priority?: string;
  state?: string;
}

export function useIntentMap() {
  const getIntentMapping = (intent: string): IntentMapping | null => {
    const mapping = intentMap.mappings[intent as keyof typeof intentMap.mappings];
    return mapping || null;
  };

  const getSystemMapping = (action: string): IntentMapping | null => {
    const mapping = systemMap.mappings[action as keyof typeof systemMap.mappings];
    return mapping || null;
  };

  const getConfidenceLevel = (confidence: number): { range: [number, number]; gesture_modifier: string } | null => {
    for (const [level, config] of Object.entries(intentMap.confidence_levels)) {
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
    intentMappings: intentMap.mappings,
    systemMappings: systemMap.mappings,
    confidenceLevels: intentMap.confidence_levels,
  };
}

export default useIntentMap;
