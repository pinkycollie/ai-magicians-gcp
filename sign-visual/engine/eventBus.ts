/**
 * Event Bus for Sign Visual System
 * Emits state changes and coordinates between components
 */

import type { StateEvent, SignState, Actor } from "./stateMachine";

export type EventType =
  | "state:change"
  | "state:error"
  | "state:warning"
  | "confidence:update"
  | "user:required"
  | "system:ready";

export interface BusEvent {
  type: EventType;
  payload: StateEvent | Record<string, unknown>;
  timestamp: number;
}

type EventListener = (event: BusEvent) => void;

class EventBus {
  private listeners: Map<EventType, Set<EventListener>> = new Map();
  private eventHistory: BusEvent[] = [];
  private maxHistorySize = 100;

  /**
   * Subscribe to an event type
   */
  on(eventType: EventType, listener: EventListener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(listener);

    // Return unsubscribe function
    return () => {
      this.off(eventType, listener);
    };
  }

  /**
   * Unsubscribe from an event type
   */
  off(eventType: EventType, listener: EventListener): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * Emit an event
   */
  emit(eventType: EventType, payload: StateEvent | Record<string, unknown>): void {
    const event: BusEvent = {
      type: eventType,
      payload,
      timestamp: Date.now(),
    };

    // Add to history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // Notify listeners
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Emit a state change event
   */
  emitStateChange(event: StateEvent): void {
    this.emit("state:change", event);

    // Emit additional events based on state
    if (event.state === "error") {
      this.emit("state:error", event);
    }
    
    if (event.state === "warning") {
      this.emit("state:warning", event);
    }

    if (event.requiresUser) {
      this.emit("user:required", event);
    }

    if (event.confidence !== undefined) {
      this.emit("confidence:update", event);
    }
  }

  /**
   * Get event history
   */
  getHistory(eventType?: EventType, limit?: number): BusEvent[] {
    let history = eventType
      ? this.eventHistory.filter((e) => e.type === eventType)
      : [...this.eventHistory];

    if (limit) {
      history = history.slice(-limit);
    }

    return history;
  }

  /**
   * Clear event history
   */
  clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Clear all listeners
   */
  clearListeners(): void {
    this.listeners.clear();
  }
}

// Export singleton instance
export const eventBus = new EventBus();
export default eventBus;
