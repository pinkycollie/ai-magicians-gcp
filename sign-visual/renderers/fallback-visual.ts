/**
 * Fallback Visual Renderer
 * Provides icon + motion for low-bandwidth scenarios
 */

import type { SignState, StateEvent } from "../engine/stateMachine";

export interface FallbackConfig {
  animated: boolean;
  showLabels: boolean;
  colorCoded: boolean;
}

export class FallbackVisual {
  private config: FallbackConfig;

  constructor(config: Partial<FallbackConfig> = {}) {
    this.config = {
      animated: config.animated !== false,
      showLabels: config.showLabels !== false,
      colorCoded: config.colorCoded !== false,
    };
  }

  /**
   * Render state as simple icon representation
   */
  render(event: StateEvent): HTMLElement {
    const container = document.createElement("div");
    container.className = "fallback-visual";
    container.setAttribute("data-state", event.state);

    // Add icon
    const icon = this.createIcon(event.state);
    container.appendChild(icon);

    // Add label if enabled
    if (this.config.showLabels) {
      const label = document.createElement("div");
      label.className = "fallback-label";
      label.textContent = this.getStateLabel(event.state);
      container.appendChild(label);
    }

    // Add color coding if enabled
    if (this.config.colorCoded) {
      container.style.borderLeftColor = this.getStateColor(event.state);
      container.style.borderLeftWidth = "4px";
      container.style.borderLeftStyle = "solid";
    }

    // Add animation class if enabled
    if (this.config.animated) {
      container.classList.add("animated");
      container.classList.add(`animate-${event.state}`);
    }

    // Add confidence bar if available
    if (event.confidence !== undefined) {
      const confidenceBar = document.createElement("div");
      confidenceBar.className = "confidence-bar";
      confidenceBar.style.width = `${event.confidence * 100}%`;
      container.appendChild(confidenceBar);
    }

    return container;
  }

  /**
   * Create icon element for state
   */
  private createIcon(state: SignState): HTMLElement {
    const icon = document.createElement("div");
    icon.className = `state-icon icon-${state}`;
    
    // Use Unicode symbols as fallback icons
    const icons: Record<SignState, string> = {
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

    icon.textContent = icons[state] || "●";
    return icon;
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
   * Get color for state
   */
  private getStateColor(state: SignState): string {
    const colors: Record<SignState, string> = {
      idle: "#94a3b8", // slate-400
      listening: "#3b82f6", // blue-500
      processing: "#8b5cf6", // violet-500
      validating: "#06b6d4", // cyan-500
      deciding: "#f59e0b", // amber-500
      executing: "#10b981", // emerald-500
      completed: "#22c55e", // green-500
      error: "#ef4444", // red-500
      warning: "#eab308", // yellow-500
    };
    return colors[state] || "#94a3b8";
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<FallbackConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export default FallbackVisual;
