/**
 * Playback Provider
 * Async / replay functionality for sign visual system
 */

import type { StateEvent, StateTransition } from "../engine/stateMachine";
import { stateMachine } from "../engine/stateMachine";
import { eventBus } from "../engine/eventBus";

export interface PlaybackConfig {
  speed: number; // 0.5 to 2.0
  loop: boolean;
  autoplay: boolean;
}

export interface PlaybackSession {
  id: string;
  events: StateEvent[];
  startTime: number;
  endTime: number;
}

export class PlaybackProvider {
  private config: PlaybackConfig;
  private isPlaying: boolean = false;
  private currentSession: PlaybackSession | null = null;
  private playbackIndex: number = 0;
  private playbackTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<PlaybackConfig> = {}) {
    this.config = {
      speed: config.speed || 1.0,
      loop: config.loop || false,
      autoplay: config.autoplay || false,
    };
  }

  /**
   * Create a playback session from history
   */
  createSession(events?: StateEvent[]): PlaybackSession {
    const sessionEvents = events || this.getHistoryEvents();
    
    const session: PlaybackSession = {
      id: `session-${Date.now()}`,
      events: sessionEvents,
      startTime: sessionEvents[0]?.timestamp || Date.now(),
      endTime: sessionEvents[sessionEvents.length - 1]?.timestamp || Date.now(),
    };

    return session;
  }

  /**
   * Load a playback session
   */
  loadSession(session: PlaybackSession): void {
    this.stop();
    this.currentSession = session;
    this.playbackIndex = 0;

    if (this.config.autoplay) {
      this.play();
    }
  }

  /**
   * Play the current session
   */
  play(): void {
    if (!this.currentSession || this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.playNext();
  }

  /**
   * Pause playback
   */
  pause(): void {
    this.isPlaying = false;
    if (this.playbackTimer) {
      clearTimeout(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  /**
   * Stop playback and reset
   */
  stop(): void {
    this.pause();
    this.playbackIndex = 0;
  }

  /**
   * Skip to next event
   */
  next(): void {
    if (!this.currentSession) {
      return;
    }

    if (this.playbackIndex < this.currentSession.events.length - 1) {
      this.playbackIndex++;
      this.emitCurrentEvent();
    }
  }

  /**
   * Skip to previous event
   */
  previous(): void {
    if (this.playbackIndex > 0) {
      this.playbackIndex--;
      this.emitCurrentEvent();
    }
  }

  /**
   * Seek to specific index
   */
  seek(index: number): void {
    if (!this.currentSession) {
      return;
    }

    if (index >= 0 && index < this.currentSession.events.length) {
      this.playbackIndex = index;
      this.emitCurrentEvent();
    }
  }

  /**
   * Set playback speed
   */
  setSpeed(speed: number): void {
    this.config.speed = Math.max(0.5, Math.min(2.0, speed));
  }

  /**
   * Get playback progress
   */
  getProgress(): { current: number; total: number; percentage: number } {
    if (!this.currentSession) {
      return { current: 0, total: 0, percentage: 0 };
    }

    const total = this.currentSession.events.length;
    const current = this.playbackIndex + 1;
    const percentage = (current / total) * 100;

    return { current, total, percentage };
  }

  /**
   * Play next event in sequence
   */
  private playNext(): void {
    if (!this.currentSession || !this.isPlaying) {
      return;
    }

    if (this.playbackIndex >= this.currentSession.events.length) {
      // Reached end
      if (this.config.loop) {
        this.playbackIndex = 0;
      } else {
        this.stop();
        return;
      }
    }

    this.emitCurrentEvent();

    // Calculate delay to next event
    const currentEvent = this.currentSession.events[this.playbackIndex];
    const nextEvent = this.currentSession.events[this.playbackIndex + 1];
    
    let delay = 1000; // Default 1 second
    if (nextEvent) {
      delay = (nextEvent.timestamp - currentEvent.timestamp) / this.config.speed;
    }

    this.playbackIndex++;

    // Schedule next event
    this.playbackTimer = setTimeout(() => {
      this.playNext();
    }, delay);
  }

  /**
   * Emit current event to event bus
   */
  private emitCurrentEvent(): void {
    if (!this.currentSession) {
      return;
    }

    const event = this.currentSession.events[this.playbackIndex];
    if (event) {
      eventBus.emitStateChange(event);
    }
  }

  /**
   * Get history events from state machine
   */
  private getHistoryEvents(): StateEvent[] {
    const transitions = stateMachine.getHistory();
    
    // Convert transitions to state events
    // In a real implementation, we'd store full events
    return transitions.map((t) => ({
      actor: t.actor,
      state: t.to,
      requiresUser: false,
      timestamp: t.timestamp,
    }));
  }
}

// Export singleton instance
export const playbackProvider = new PlaybackProvider();
export default playbackProvider;
