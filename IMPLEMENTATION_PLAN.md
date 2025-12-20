# Sign Visual System - Implementation Plan

## Overview

This document outlines the implementation of the Sign Visual System - a first-class interaction layer that uses sign language to visualize system state and agent cognition in real-time.

## Core Philosophy

**Sign visuals = primary UX channel**  
**Text = optional fallback**  
**Meaning = visible**

---

## Phase 1 — Core Infrastructure ✅

### Completed

- ✅ `/sign-visual/engine/stateMachine.ts` - Single source of truth for agent state
- ✅ `/sign-visual/engine/eventBus.ts` - Event emission and coordination
- ✅ State definition files (idle, listening, processing, validating, deciding, executing, completed, error)
- ✅ Semantic mapping files (intent.map.json, system.map.json)

### Key Features

Every agent action MUST emit a state event:

```typescript
stateMachine.emit({
  actor: "MagicianCore",
  state: "validating",
  confidence: 0.82,
  requiresUser: false
})
```

**Rules:**
- No silent processing
- No hidden waits
- Signer listens to events, not text

---

## Phase 2 — Visual Components ✅

### Completed

- ✅ `/sign-visual/components/SignerPanel.tsx` - Persistent, dockable panel
- ✅ `/sign-visual/components/StateIndicator.tsx` - Visual state representation
- ✅ `/sign-visual/components/ConfidenceCue.tsx` - Confidence visualization
- ✅ `/sign-visual/renderers/signer-avatar.ts` - Avatar rendering engine
- ✅ `/sign-visual/renderers/fallback-visual.ts` - Low-bandwidth fallback

### Component Features

**SignerPanel:**
- Dockable/floating positioning
- Resizable (small/medium/large)
- Speed control (0.5x - 2.0x)
- Settings panel
- Live connection indicator

**StateIndicator:**
- Animated state icons
- Color-coded by state
- Semantic gesture descriptions
- State-specific animations

**ConfidenceCue:**
- Progress bar visualization
- Confidence level badges (Certain/Confident/Uncertain/Confused)
- Color-coded by confidence range

---

## Phase 3 — Integration Layer ✅

### Completed

- ✅ `/sign-visual/providers/realtime.ts` - Live state streaming
- ✅ `/sign-visual/providers/playback.ts` - Async replay functionality
- ✅ `/hooks/sign-visual/useSignState.ts` - React state hook
- ✅ `/hooks/sign-visual/useIntentMap.ts` - Semantic mapping hook

### Flow

```
user intent
  → agent reasoning
    → stateMachine update
      → sign renderer
        → (optional) text confirmation
```

**Text never leads. Sign always reflects truth.**

---

## Phase 4 — Agent Integration 🔄

### To Be Completed

Wire the sign visual system into existing components:

1. **Main Layout** (`app/layout.tsx`)
   - Add SignerPanel as persistent component
   - Position in fixed corner (bottom-right)
   - Ensure never hidden by modals

2. **Chat Interface** (`components/chat-interface.tsx`)
   - Emit "listening" state when user types
   - Emit "processing" when AI responds
   - Emit "completed" when response finished

3. **Agent Dashboard** (`components/agent-dashboard.tsx`)
   - Emit "idle" when waiting
   - Emit "deciding" when selecting agent
   - Emit "executing" when agent is active

4. **Sign Language Models** (`components/sign-language-models.tsx`)
   - Update to integrate with new sign visual system
   - Use stateMachine for model state tracking

---

## Phase 5 — Governance 📋

### Deaf Engagement Loop

Create governance structure for sign semantics:

1. **`/governance/sign-feedback.json`**
   - Feedback from deaf contributors
   - Semantic accuracy ratings
   - Improvement suggestions

2. **`/governance/semantic-overrides.json`**
   - Community-approved semantic mappings
   - Custom gesture definitions
   - Cultural adaptations

### Rules

- No auto-updates without sign review
- Deaf contributors approve semantic mappings
- Versioned sign semantics (breaking changes = major version bump)

---

## Phase 6 — ChatGPT App Store Integration 🚀

### App Manifest

Update `/metadata.json` or create manifest:

```json
{
  "capabilities": {
    "sign_visual_state": {
      "primary": true,
      "modes": ["realtime", "async", "replay"],
      "positioning": "Agent Transparency / Visual Reasoning"
    }
  }
}
```

### Positioning

- ❌ NOT "accessibility"
- ✅ Category: **Agent Transparency / Visual Reasoning**
- ✅ This is a new interaction primitive

---

## Definition of Success

A deaf user can tell:
- ✅ What the system is doing right now
- ✅ Why it's waiting (if it's waiting)
- ✅ What action it needs from them next
- ✅ System confidence level
- ✅ Which actor is currently active

**Without reading a single word of text.**

---

## Technical Architecture

### State Flow

```
┌─────────────┐
│ Agent Core  │
└──────┬──────┘
       │ emit()
       ▼
┌─────────────────┐
│ State Machine   │
└──────┬──────────┘
       │ notify
       ▼
┌─────────────────┐
│   Event Bus     │
└──────┬──────────┘
       │ broadcast
       ▼
┌─────────────────┐
│ SignerPanel     │
│ (React)         │
└─────────────────┘
```

### Data Flow

```
User Action → Agent Processing → State Emission → Visual Update
     ↑                                                   │
     └───────────── Feedback Loop ─────────────────────┘
```

---

## Next Steps

1. ✅ Complete Phase 1-3 (Core Infrastructure)
2. 🔄 Integrate into app layout (Phase 4)
3. 📋 Set up governance structure (Phase 5)
4. 🚀 Prepare for App Store deployment (Phase 6)

---

## Notes

- State machine is actor-agnostic
- Event bus handles all cross-component communication
- Renderers support both high and low bandwidth scenarios
- All visual semantics are versioned and governable
- System prioritizes deaf user understanding over text

---

**Commit Philosophy:**

> If the system thinks, it signs.  
> If it cannot sign, it should not act.

That's the foundation. Everything else follows from this principle.
