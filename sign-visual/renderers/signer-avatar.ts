/**
 * Signer Avatar Renderer
 * Handles visual representation of sign language states
 */

import type { SignState, StateEvent } from "../engine/stateMachine";

export interface SignerConfig {
  size: "small" | "medium" | "large";
  speed: number; // 0.5 to 2.0
  quality: "low" | "medium" | "high";
}

export interface VisualState {
  animation: string;
  motion: string;
  intensity: "low" | "medium" | "medium-high" | "high";
}

export class SignerAvatar {
  private config: SignerConfig;
  private currentState: SignState = "idle";
  private animationFrame: number | null = null;

  constructor(config: Partial<SignerConfig> = {}) {
    this.config = {
      size: config.size || "medium",
      speed: config.speed || 1.0,
      quality: config.quality || "medium",
    };
  }

  /**
   * Load state visual definition
   */
  async loadStateVisual(state: SignState): Promise<VisualState | null> {
    try {
      const response = await fetch(`/sign-visual/states/${state}.json`);
      if (!response.ok) {
        console.error(`Failed to load state visual for: ${state}`);
        return null;
      }
      const data = await response.json();
      return data.visual;
    } catch (error) {
      console.error(`Error loading state visual:`, error);
      return null;
    }
  }

  /**
   * Render state as visual representation
   */
  async render(event: StateEvent): Promise<HTMLElement> {
    this.currentState = event.state;
    const visual = await this.loadStateVisual(event.state);

    const container = document.createElement("div");
    container.className = `signer-avatar signer-${this.config.size}`;
    container.setAttribute("data-state", event.state);
    container.setAttribute("data-actor", event.actor);

    if (visual) {
      // Create visual elements
      const figure = document.createElement("div");
      figure.className = "signer-figure";
      figure.setAttribute("data-animation", visual.animation);
      figure.setAttribute("data-motion", visual.motion);
      figure.setAttribute("data-intensity", visual.intensity);

      // Add confidence indicator if available
      if (event.confidence !== undefined) {
        const confidenceBar = document.createElement("div");
        confidenceBar.className = "confidence-indicator";
        confidenceBar.style.width = `${event.confidence * 100}%`;
        confidenceBar.setAttribute("data-confidence", event.confidence.toFixed(2));
        container.appendChild(confidenceBar);
      }

      container.appendChild(figure);
    }

    // Add state label
    const label = document.createElement("div");
    label.className = "state-label";
    label.textContent = this.getStateLabel(event.state);
    container.appendChild(label);

    return container;
  }

  /**
   * Get human-readable state label
   */
  private getStateLabel(state: SignState): string {
    const labels: Record<SignState, string> = {
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
    return labels[state] || state;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<SignerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): SignerConfig {
    return { ...this.config };
  }

  /**
   * Cleanup
   */
  destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

export default SignerAvatar;
