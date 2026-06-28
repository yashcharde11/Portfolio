"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// WebGL must never run on the server — load the Canvas client-side only.
const Scene = dynamic(() => import("@/components/three/scene"), { ssr: false });

/**
 * Mounts the fixed 3D backdrop behind everything. Gated on:
 *   - client mount (avoids SSR/WebGL),
 *   - prefers-reduced-motion (skip the animated scene),
 *   - a coarse WebGL capability check (graceful no-op on unsupported devices).
 *
 * When the scene is skipped, the CSS AmbientBackground still provides depth.
 */
export function SceneMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    // Cheap WebGL support probe.
    try {
      const canvas = document.createElement("canvas");
      const ok =
        !!window.WebGLRenderingContext &&
        (!!canvas.getContext("webgl") ||
          !!canvas.getContext("experimental-webgl"));
      setEnabled(ok);
    } catch {
      setEnabled(false);
    }
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
    >
      <Scene />
    </div>
  );
}
