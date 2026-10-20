## 2024-08-20 - Massive useEffect dependency splitting
**Learning:** In highly complex React components like the IVC Object Bus Fabric, grouping many unrelated pieces of state into a single `useEffect` for `localStorage` persistence causes massive synchronous performance overhead. A single keystroke updating one state variable triggered a full `JSON.stringify` serialization pass over 12 other unrelated local storage keys.
**Action:** Always decouple distinct persistence tasks into individual `useEffect` hooks, watching only their specific dependency, to prevent unnecessary main-thread blocking operations.

## 2026-08-21 - Rules of Hooks Violation during Optimization
**Learning:** When attempting to memoize derived state filtering in a monolithic React component, placing the `useMemo` hook inside conditional logic (e.g. `if (baseTarget.startsWith('#'))`) violates React's Rules of Hooks. This causes fatal runtime crashes.
**Action:** Always hoist hooks (`useMemo`, `useCallback`, etc.) to the unconditional top level of the component scope, even if the value is only used in a specific conditional render branch.
## 2024-03-22 - Extracted address parsing into useMemo
**Learning:** The React application (`App.tsx`) was performing heavy string parsing, matrix matching, and object manipulation on an `address` string (e.g. `ivc://host/#feed/&config`) directly in the render function on *every single re-render* (including during input typing). This pattern causes major CPU bottlenecks and slow React commit phases.
**Action:** Always wrap non-trivial pure computations, string matchers, regex extraction, or complex derived states into `useMemo` blocks keyed to the minimal amount of primitive/reactive dependencies required (in this case: `address`, `negatedModes`, `manualFacet`). This prevents re-evaluation during normal keystrokes.

## 2024-10-20 - Precomputed Sets for Array Lookups in Render Loops
**Learning:** Checking `.includes()` on arrays (like `ignored` or `banned`) inside `filter` or `map` operations during render phases causes O(N*M) time complexity. For large lists, this heavily blocks the main thread.
**Action:** Always precompute array-based lookups into `Set` objects using `useMemo` at the top level of the component. Use `set.has()` for O(1) lookups inside render loops and memoized derivations to ensure UI scalability.
