1. **Identify Performance Issue**: The `App.tsx` component performs `Array.includes` and `Array.some` on several state arrays (`ignored`, `banned`, `likes`, `bookmarks`) inside mapping functions or `useMemo` hooks calculating visible posts (e.g. `visiblePostsMemo` uses `ignored.includes` and `banned.includes`). In `renderPost`, `likes.includes` and `bookmarks.some` are called for every single post on every render. This creates an $O(N*M)$ time complexity where $N$ is the number of posts and $M$ is the number of elements in the `likes` / `bookmarks` / `ignored` / `banned` arrays.

2. **Propose Solution**: We can convert the `ignored`, `banned`, and `likes` arrays to `Set` objects using `useMemo` at the top level of the `App` component. For `bookmarks`, we can create a `Set` of bookmarked post IDs. This transforms the lookup from $O(M)$ to $O(1)$, resolving the $O(N*M)$ complexity and turning it into $O(N)$.
  - We'll create `ignoredSet`, `bannedSet`, `likesSet`, and `bookmarkedIdSet` using `useMemo`.
  - We'll update the occurrences of `ignored.includes(...)` to `ignoredSet.has(...)`.
  - We'll update the occurrences of `banned.includes(...)` to `bannedSet.has(...)`.
  - We'll update the occurrences of `likes.includes(...)` to `likesSet.has(...)`.
  - We'll update `bookmarks.some(b => b.id === ...)` to `bookmarkedIdSet.has(...)`.

3. **Verify Compliance**:
  - The Rules of Hooks will be respected by placing the `useMemo` calls unconditionally at the top level of the component (right after the `useEffect` blocks).
  - This directly aligns with the memory guideline: "To prevent main thread blocking during large list renders, precompute array-based lookups (e.g., bookmarks, likes) into Set objects using useMemo at the top level of components to avoid O(N*M) time complexity inside render loops."
  - This is a small performance improvement (< 50 lines) that has a measurable impact on rendering speed.

4. **Testing**:
  - Run `pnpm lint` and build.
  - Test locally via playwright script to ensure UI functionality is unchanged.

5. **Submit**: Create PR titled `⚡ Bolt: [performance improvement]` with the required description format.
