"use client";

import { useEffect, useRef } from "react";

/**
 * The "working" pose of the same cartoon character: seated at a desk, coding on
 * a glowing laptop. Same face + cursor-tracking eyes as <AvatarBuddy/>, so the
 * scene transition reads as the same person sitting down to work.
 */
export function AvatarWorking({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftPupil = useRef<SVGGElement>(null);
  const rightPupil = useRef<SVGGElement>(null);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      const px = (current.x * 4.5).toFixed(2);
      const py = (current.y * 4.5).toFixed(2);
      leftPupil.current?.setAttribute("transform", `translate(${px} ${py})`);
      rightPupil.current?.setAttribute("transform", `translate(${px} ${py})`);
      headRef.current?.setAttribute(
        "transform",
        `translate(${(current.x * 3).toFixed(2)} ${(current.y * 2.4).toFixed(2)})`
      );
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="absolute inset-x-8 bottom-6 top-10 rounded-[40%] bg-gradient-to-tr from-primary via-fuchsia-500 to-cyan-400 opacity-40 blur-3xl" />

      <svg
        viewBox="0 0 300 300"
        className="relative h-full w-full drop-shadow-2xl"
        role="img"
        aria-label="Cartoon avatar of Yash coding at a desk, eyes following the cursor"
      >
        <defs>
          <linearGradient id="aw-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#3b1672" />
          </linearGradient>
          <linearGradient id="aw-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="aw-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241c33" />
            <stop offset="100%" stopColor="#140f1f" />
          </linearGradient>
        </defs>

        {/* chair back */}
        <rect x="96" y="118" width="108" height="150" rx="34" fill="#1d1730" />

        {/* head + face (reacts to cursor) */}
        <g ref={headRef}>
          {/* ears */}
          <ellipse cx="116" cy="92" rx="7" ry="10" fill="#f0b994" />
          <ellipse cx="184" cy="92" rx="7" ry="10" fill="#f0b994" />
          {/* face */}
          <ellipse cx="150" cy="90" rx="40" ry="44" fill="#f6cda8" />
          {/* hair */}
          <path
            d="M108 84 Q106 38 150 38 Q194 38 192 84 Q182 62 168 58 Q156 76 138 62 Q120 62 116 74 Q110 76 108 84 Z"
            fill="#241c2e"
          />
          {/* eyebrows */}
          <path d="M124 75 Q135 69 146 74" stroke="#241c2e" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M154 74 Q165 69 176 75" stroke="#241c2e" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          {/* eyes */}
          <g className="animate-blink">
            <ellipse cx="135" cy="91" rx="10.5" ry="12.5" fill="#ffffff" />
            <g ref={leftPupil}>
              <circle cx="135" cy="91" r="5.2" fill="#1b1430" />
              <circle cx="136.8" cy="89" r="1.7" fill="#ffffff" />
            </g>
          </g>
          <g className="animate-blink" style={{ animationDelay: "0.15s" }}>
            <ellipse cx="165" cy="91" rx="10.5" ry="12.5" fill="#ffffff" />
            <g ref={rightPupil}>
              <circle cx="165" cy="91" r="5.2" fill="#1b1430" />
              <circle cx="166.8" cy="89" r="1.7" fill="#ffffff" />
            </g>
          </g>
          {/* nose + smile */}
          <path d="M150 96 Q147 105 152 107" stroke="#d9a47e" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M137 116 Q150 127 163 116" stroke="#7a4a3a" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          {/* headset */}
          <path d="M112 92 Q110 60 150 58 Q190 60 188 92" stroke="#22d3ee" strokeWidth="3.4" fill="none" />
          <rect x="106" y="88" width="10" height="17" rx="4" fill="#22d3ee" />
          <rect x="184" y="88" width="10" height="17" rx="4" fill="#22d3ee" />
          <path d="M110 105 Q108 122 128 124" stroke="#22d3ee" strokeWidth="3" fill="none" />
          <circle cx="131" cy="124" r="3" fill="#22d3ee" />
        </g>

        {/* torso / hoodie */}
        <path d="M104 150 Q150 132 196 150 L206 250 L94 250 Z" fill="url(#aw-hoodie)" />
        <path d="M150 138 Q150 150 150 162" stroke="#4c1d95" strokeWidth="3" />

        {/* arms reaching toward the laptop */}
        <path d="M108 158 Q92 196 126 224" stroke="url(#aw-hoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M192 158 Q208 196 174 224" stroke="url(#aw-hoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
        {/* hands */}
        <ellipse cx="128" cy="228" rx="9" ry="7" fill="#f6cda8" />
        <ellipse cx="172" cy="228" rx="9" ry="7" fill="#f6cda8" />

        {/* desk */}
        <rect x="30" y="244" width="240" height="14" rx="5" fill="url(#aw-desk)" />

        {/* laptop */}
        <g>
          {/* glowing screen */}
          <rect x="118" y="196" width="64" height="42" rx="5" fill="url(#aw-screen)" />
          <rect x="118" y="196" width="64" height="42" rx="5" fill="#0b0814" opacity="0.35" />
          {/* code lines */}
          <rect x="125" y="204" width="26" height="3" rx="1.5" fill="#e9d5ff" opacity="0.9" />
          <rect x="125" y="211" width="40" height="3" rx="1.5" fill="#a5f3fc" opacity="0.85" />
          <rect x="125" y="218" width="20" height="3" rx="1.5" fill="#e9d5ff" opacity="0.8" />
          <rect x="125" y="225" width="33" height="3" rx="1.5" fill="#c4b5fd" opacity="0.8" />
          {/* keyboard base */}
          <path d="M108 244 L192 244 L182 238 L118 238 Z" fill="#2a2140" />
        </g>

        {/* floating code symbols */}
        <text x="56" y="150" fontSize="16" fill="#8b5cf6" opacity="0.7" fontFamily="monospace">{"</>"}</text>
        <text x="232" y="176" fontSize="14" fill="#22d3ee" opacity="0.7" fontFamily="monospace">{"{ }"}</text>
        <text x="238" y="128" fontSize="13" fill="#ec4899" opacity="0.6" fontFamily="monospace">✦</text>
      </svg>
    </div>
  );
}
