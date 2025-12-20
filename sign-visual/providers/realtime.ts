/**
 * Realtime Provider
 * Live agent state stream for sign visual system
 */

import { stateMachine, type StateEvent } from "../engine/stateMachine";
import { eventBus } from "../engine/eventBus";

export interface RealtimeConfig {
  autoConnect: boolean;
  reconnectAttempts: number;
  heartbeatInterval: number;
}

export class RealtimeProvider {
  private config: RealtimeConfig;
  private connected: boolean = false;
  private unsubscribe: (() => void) | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<RealtimeConfig> = {}) {
    this.config = {
      autoConnect: config.autoConnect !== false,
      reconnectAttempts: config.reconnectAttempts || 3,
      heartbeatInterval: config.heartbeatInterval || 30000,
    };

    if (this.config.autoConnect) {
      this.connect();
    }
  }

  /**
   * Connect to realtime state stream
   */
  connect(): void {
    if (this.connected) {
      console.warn("Already connected to realtime stream");
      return;
    }

    // Subscribe to state machine changes
    this.unsubscribe = stateMachine.onStateChange((event) => {
      this.handleStateChange(event);
    });

    this.connected = true;
    
    // Start heartbeat
    this.startHeartbeat();

    // Emit system ready event
    eventBus.emit("system:ready", {
      provider: "realtime",
      timestamp: Date.now(),
    });
  }

  /**
   * Disconnect from realtime stream
   */
  disconnect(): void {
    if (!this.connected) {
      return;
    }

    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    this.stopHeartbeat();
    this.connected = false;
  }

  /**
   * Handle state change from state machine
   */
  private handleStateChange(event: StateEvent): void {
    // Emit to event bus for components to consume
    eventBus.emitStateChange(event);
  }

  /**
   * Start heartbeat to keep connection alive
   */
  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.connected) {
        // Emit heartbeat event
        eventBus.emit("system:ready", {
          provider: "realtime",
          heartbeat: true,
          timestamp: Date.now(),
        });
      }
    }, this.config.heartbeatInterval);
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Get current state
   */
  getCurrentState(): StateEvent | null {
    return stateMachine.getCurrentEvent();
  }
}

// Export singleton instance
export const realtimeProvider = new RealtimeProvider();
export default realtimeProvider;
