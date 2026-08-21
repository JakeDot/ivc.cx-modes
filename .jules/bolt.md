## 2024-08-20 - Massive useEffect dependency splitting
**Learning:** In highly complex React components like the IVC Object Bus Fabric, grouping many unrelated pieces of state into a single `useEffect` for `localStorage` persistence causes massive synchronous performance overhead. A single keystroke updating one state variable triggered a full `JSON.stringify` serialization pass over 12 other unrelated local storage keys.
**Action:** Always decouple distinct persistence tasks into individual `useEffect` hooks, watching only their specific dependency, to prevent unnecessary main-thread blocking operations.

## 2026-08-21 - Rules of Hooks Violation during Optimization
**Learning:** When attempting to memoize derived state filtering in a monolithic React component, placing the `useMemo` hook inside conditional logic (e.g. `if (baseTarget.startsWith('#'))`) violates React's Rules of Hooks. This causes fatal runtime crashes.
**Action:** Always hoist hooks (`useMemo`, `useCallback`, etc.) to the unconditional top level of the component scope, even if the value is only used in a specific conditional render branch.
