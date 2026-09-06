## 2024-05-14 - Precomputing array lookups into Sets for render performance
**Learning:** Using `.includes()` or `.some()` inside loops or large list renders (like rendering posts) creates an O(N*M) bottleneck, degrading frontend performance as lists grow.
**Action:** Precompute array-based state (like likes, bookmarks, ignored, banned) into `Set` objects using `useMemo` at the component's top level, converting O(N) array scans into O(1) hash map lookups.

## 2024-05-14 - Precomputing array lookups into Sets for render performance
**Learning:** Using `.includes()` or `.some()` inside loops or large list renders (like rendering posts) creates an O(N*M) bottleneck, degrading frontend performance as lists grow.
**Action:** Precompute array-based state (like likes, bookmarks, ignored, banned) into `Set` objects using `useMemo` at the component's top level, converting O(N) array scans into O(1) hash map lookups. Be sure to append to the journal rather than overwriting it.
