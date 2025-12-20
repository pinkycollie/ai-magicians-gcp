# Sign Visual System

## Purpose

Provide sign language as a primary interaction layer for agentic systems.
Not translation. State + intent visualization.

## Core Principle

Sign visuals reflect system state, not just output text.

**Text = optional**  
**Sign = authoritative**

## Directory Structure

```
/sign-visual
  /components
    SignerPanel.tsx       # persistent, dockable
    StateIndicator.tsx    # listening | processing | deciding | executing | error
    ConfidenceCue.tsx     # certainty / uncertainty / warning
  /states
    idle.json
    listening.json
    processing.json
    validating.json
    deciding.json
    executing.json
    completed.json
    error.json
  /semantics
    intent.map.json       # user intent → sign semantic
    system.map.json       # system action → sign semantic
  /providers
    realtime.ts          # live agent state stream
    playback.ts          # async / replay
  /engine
    stateMachine.ts      # single source of truth for agent state
    eventBus.ts          # emits state changes
  /renderers
    signer-avatar.ts     # visual avatar renderer
    fallback-visual.ts   # icons + motion for low-bandwidth
```

## Sign Rendering Rules

1. **No word-for-word translation** - Use semantic chunks
2. **Always expose:**
   - What the system is doing
   - Why it paused
   - What it needs next

## Integration Points

- **MagicianCore** → invokes SignerPanel by default
- **Validator** → switches to "deciding / warning" state
- **Compliance** → high-visibility caution semantics
- **Errors** → explicit, non-ambiguous signing (no silent fails)

## Accessibility Contract

- Sign panel never hidden behind modals
- User controls size, speed, replay
- Works async-first (no forced realtime)

## Definition of Done

✓ Deaf user understands system state without reading text  
✓ No action happens without a visible sign state  
✓ System silence is never ambiguous

## Non-Goals

- ❌ Not subtitles
- ❌ Not decorative avatars
- ❌ Not post-hoc translation

## Philosophy

**If the system thinks, it signs.**  
**If it cannot sign, it should not act.**

## Usage Example

```typescript
import { stateMachine } from "@/sign-visual/engine/stateMachine";
import SignerPanel from "@/sign-visual/components/SignerPanel";

// Emit state from your agent
stateMachine.emit({
  actor: "MagicianCore",
  state: "processing",
  confidence: 0.85,
  requiresUser: false,
  message: "Analyzing your request..."
});

// Include SignerPanel in your layout
<SignerPanel defaultDocked={true} defaultSize="medium" />
```

## States

- **idle** - System ready, waiting for input
- **listening** - Actively receiving user input
- **processing** - Analyzing/thinking
- **validating** - Checking/verifying
- **deciding** - Making a decision
- **executing** - Taking action
- **completed** - Task finished successfully
- **error** - Problem encountered
- **warning** - Caution required

## Actors

- **MagicianCore** - Primary AI agent coordinator
- **Validator** - Validation and verification system
- **Compliance** - Compliance and safety checks
- **User** - Human user interaction
- **System** - System-level operations

## API

### State Machine

```typescript
// Emit a state change
stateMachine.emit({
  actor: "MagicianCore",
  state: "processing",
  confidence: 0.85,
  requiresUser: false
});

// Subscribe to state changes
const unsubscribe = stateMachine.onStateChange((event) => {
  console.log("State changed:", event);
});

// Get current state
const currentState = stateMachine.getCurrentState();
```

### Event Bus

```typescript
import { eventBus } from "@/sign-visual/engine/eventBus";

// Listen for state changes
eventBus.on("state:change", (event) => {
  console.log("State changed:", event);
});

// Listen for errors
eventBus.on("state:error", (event) => {
  console.log("Error occurred:", event);
});
```

### React Hooks

```typescript
import { useSignState } from "@/hooks/sign-visual/useSignState";
import { useIntentMap } from "@/hooks/sign-visual/useIntentMap";

function MyComponent() {
  const { currentState, currentEvent, isConnected } = useSignState();
  const { getIntentMapping, getSystemMapping } = useIntentMap();
  
  // Use state in your component
}
```

## Future Enhancements

1. **Generative Avatar** - Move from icons to animated sign language avatar
2. **Multi-language Support** - ASL, BSL, Auslan, LSF support
3. **Recording/Replay** - Full session replay with playback controls
4. **Custom Semantics** - Allow users to define custom gesture mappings
5. **Voice Integration** - Combine with voice output for multi-modal experience
