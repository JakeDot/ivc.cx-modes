## 2024-08-20 - Massive useEffect dependency splitting
**Learning:** In highly complex React components like the IVC Object Bus Fabric, grouping many unrelated pieces of state into a single `useEffect` for `localStorage` persistence causes massive synchronous performance overhead. A single keystroke updating one state variable triggered a full `JSON.stringify` serialization pass over 12 other unrelated local storage keys.
**Action:** Always decouple distinct persistence tasks into individual `useEffect` hooks, watching only their specific dependency, to prevent unnecessary main-thread blocking operations.

## 2026-08-21 - Rules of Hooks Violation during Optimization
**Learning:** When attempting to memoize derived state filtering in a monolithic React component, placing the `useMemo` hook inside conditional logic (e.g. `if (baseTarget.startsWith('#'))`) violates React's Rules of Hooks. This causes fatal runtime crashes.
**Action:** Always hoist hooks (`useMemo`, `useCallback`, etc.) to the unconditional top level of the component scope, even if the value is only used in a specific conditional render branch.

## 2024-03-22 - Extracted address parsing into useMemo
**Learning:** The React application (`App.tsx`) was performing heavy string parsing, matrix matching, and object manipulation on an `address` string (e.g. `ivc://host/#feed/&config`) directly in the render function on *every single re-render* (including during input typing). This pattern causes major CPU bottlenecks and slow React commit phases.
**Action:** Always wrap non-trivial pure computations, string matchers, regex extraction, or complex derived states into `useMemo` blocks keyed to the minimal amount of primitive/reactive dependencies required (in this case: `address`, `negatedModes`, `manualFacet`). This prevents re-evaluation during normal keystrokes.

## 2026-09-07 - Array Lookups in Render Loop
**Learning:** Found O(N*M) time complexity bottleneck in `App.tsx` during render phase when filtering lists (like `visiblePostsMemo`) and determining post states (`renderPost`), due to repeated use of `Array.includes()` and `Array.some()` on large state arrays (`bookmarks`, `likes`, `ignored`, `banned`).
**Action:** When rendering large lists, always precompute Set instances (`new Set()`) at the top level of the component using `useMemo`, and replace O(N) array scans like `Array.includes()` with O(1) `Set.has()` lookups. This reduces overall rendering time complexity to O(N).
