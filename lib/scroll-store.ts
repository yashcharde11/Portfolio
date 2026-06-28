/**
 * A tiny, dependency-free shared store for scroll state.
 *
 * Lenis writes to it on every scroll frame (see components/smooth-scroll.tsx);
 * the 3D scene reads it inside its render loop (useFrame) to drive camera and
 * mesh motion. Keeping it a plain module singleton avoids React re-renders on
 * every scroll tick — the values are read imperatively at 60fps instead.
 */
export const scrollState = {
  /** Normalized scroll position, 0 (top) → 1 (bottom of page). */
  progress: 0,
  /** Instantaneous scroll velocity from Lenis (signed). */
  velocity: 0,
};
