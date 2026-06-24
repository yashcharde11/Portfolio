import type { CSSProperties } from "react";

/**
 * Fixed decorative backdrop:
 *   1. a theme-specific photo (light vs dark, swapped via the `.dark` class)
 *   2. a readability overlay so all content stays legible over the photo
 *   3. an animated panning grid, drifting colour orbs, and floating particles
 *
 * Everything animates via CSS (not Framer Motion) so the server- and
 * client-rendered markup is identical — no hydration mismatches.
 */

/** Deterministic pseudo-random in [0,1) from a seed — keeps SSR/CSR markup identical. */
function seeded(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 26 }, (_, i) => ({
  left: seeded(i + 1) * 100,
  top: seeded(i + 11) * 100,
  size: 2 + seeded(i + 21) * 4,
  drift: 18 + seeded(i + 31) * 42,
  duration: 10 + seeded(i + 41) * 16,
  delay: seeded(i + 51) * 9,
}));

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* theme background photo — light shown by default, dark under `.dark` */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:hidden"
        style={{ backgroundImage: "url('/images/light-bg.jpg')" }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat dark:block"
        style={{ backgroundImage: "url('/images/dark-bg.jpg')" }}
      />

      {/* readability overlay (stronger in dark mode to tame the bright areas) */}
      <div className="absolute inset-0 bg-background/45 dark:bg-background/70" />

      {/* animated panning grid (loops seamlessly every 28px tile) */}
      <div className="animate-grid-pan absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      {/* drifting glow orbs */}
      <div className="absolute left-1/4 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute right-[-5%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] left-1/3 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/15 blur-[130px] animate-pulse-glow" />

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-particle-float absolute rounded-full bg-primary/40"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              "--drift": `${p.drift}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
