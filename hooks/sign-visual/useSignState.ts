/**
 * React Hook for Sign State
 * Provides real-time state updates from the sign visual system
 */

"use client"

import { useState, useEffect } from "react";
import { stateMachine, type StateEvent, type SignState } from "@/sign-visual/engine/stateMachine";
import { eventBus } from "@/sign-visual/engine/eventBus";

export function useSignState() {
  const [currentState, setCurrentState] = useState<SignState>("idle");
  const [currentEvent, setCurrentEvent] = useState<StateEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = stateMachine.onStateChange((event) => {
      setCurrentState(event.state);
      setCurrentEvent(event);
    });

    // Subscribe to system ready events
    const unsubscribeReady = eventBus.on("system:ready", () => {
      setIsConnected(true);
    });

    setIsConnected(true);

    return () => {
      unsubscribe();
      unsubscribeReady();
    };
  }, []);

  return {
    currentState,
    currentEvent,
    isConnected,
    stateMachine,
  };
}

export default useSignState;
