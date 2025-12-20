/**
 * Sign Visual State Machine
 * Single source of truth for agent state
 */

export type SignState =
  | "idle"
  | "listening"
  | "processing"
  | "validating"
  | "deciding"
  | "executing"
  | "completed"
  | "error"
  | "warning";

export type Actor =
  | "MagicianCore"
  | "Validator"
  | "Compliance"
  | "User"
  | "System";

export interface StateEvent {
  actor: Actor;
  state: SignState;
  confidence?: number; // 0-1
  requiresUser: boolean;
  message?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface StateTransition {
  from: SignState;
  to: SignState;
  actor: Actor;
  timestamp: number;
}

type StateChangeListener = (event: StateEvent) => void;
type TransitionListener = (transition: StateTransition) => void;

class SignStateMachine {
  private currentState: SignState = "idle";
  private currentEvent: StateEvent | null = null;
  private stateListeners: Set<StateChangeListener> = new Set();
  private transitionListeners: Set<TransitionListener> = new Set();
  private history: StateTransition[] = [];

  constructor() {
    this.currentEvent = {
      actor: "System",
      state: "idle",
      requiresUser: false,
      timestamp: Date.now(),
    };
  }

  /**
   * Get the current state
   */
  getCurrentState(): SignState {
    return this.currentState;
  }

  /**
   * Get the current state event with full context
   */
  getCurrentEvent(): StateEvent | null {
    return this.currentEvent;
  }

  /**
   * Emit a new state event
   * This is the primary method for updating system state
   */
  emit(event: Omit<StateEvent, "timestamp">): void {
    const previousState = this.currentState;
    const fullEvent: StateEvent = {
      ...event,
      timestamp: Date.now(),
    };

    // Update current state
    this.currentState = event.state;
    this.currentEvent = fullEvent;

    // Record transition
    const transition: StateTransition = {
      from: previousState,
      to: event.state,
      actor: event.actor,
      timestamp: fullEvent.timestamp,
    };
    this.history.push(transition);

    // Notify listeners
    this.notifyStateListeners(fullEvent);
    this.notifyTransitionListeners(transition);
  }

  /**
   * Subscribe to state changes
   */
  onStateChange(listener: StateChangeListener): () => void {
    this.stateListeners.add(listener);
    
    // Immediately notify with current state
    if (this.currentEvent) {
      listener(this.currentEvent);
    }

    // Return unsubscribe function
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  /**
   * Subscribe to state transitions
   */
  onTransition(listener: TransitionListener): () => void {
    this.transitionListeners.add(listener);
    return () => {
      this.transitionListeners.delete(listener);
    };
  }

  /**
   * Get state history
   */
  getHistory(limit?: number): StateTransition[] {
    if (limit) {
      return this.history.slice(-limit);
    }
    return [...this.history];
  }

  /**
   * Clear history (useful for testing)
   */
  clearHistory(): void {
    this.history = [];
  }

  /**
   * Reset to idle state
   */
  reset(): void {
    this.emit({
      actor: "System",
      state: "idle",
      requiresUser: false,
    });
  }

  private notifyStateListeners(event: StateEvent): void {
    this.stateListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error("Error in state listener:", error);
      }
    });
  }

  private notifyTransitionListeners(transition: StateTransition): void {
    this.transitionListeners.forEach((listener) => {
      try {
        listener(transition);
      } catch (error) {
        console.error("Error in transition listener:", error);
      }
    });
  }
}

// Export singleton instance
export const stateMachine = new SignStateMachine();
export default stateMachine;
