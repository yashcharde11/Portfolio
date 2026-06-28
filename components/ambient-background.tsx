/**
 * Cinematic CSS backdrop that sits *behind* the WebGL scene (-z-20 vs the
 * 3D canvas at -z-10). Pure CSS so server and client markup match exactly —
 * no hydration mismatch — and it doubles as the graceful fallback on devices
 * where the 3D scene is disabled (reduced-motion / no WebGL).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-background"
    >
      {/* deep cinematic base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_-10%,hsl(258_60%_12%/0.55),transparent_55%)]" />

      {/* faint panning grid, masked to the centre */}
      <div className="animate-grid-pan absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* drifting colour orbs for depth under the WebGL layer */}
      <div className="absolute left-1/4 top-[-12%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px] animate-pulse-glow" />
      <div className="absolute bottom-[-14%] right-[-6%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/12 blur-[140px] animate-float" />
      <div className="absolute bottom-[10%] left-1/4 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/12 blur-[140px] animate-pulse-glow" />

      {/* vignette to focus the eye toward the centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,hsl(var(--background))_100%)]" />
    </div>
  );
}
