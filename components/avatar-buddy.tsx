"use client";

import { useEffect, useRef } from "react";

/**
 * A friendly cartoon avatar whose pupils follow the cursor (Snapchat-Bitmoji
 * style), with natural blinking and a subtle head tilt toward the pointer.
 *
 * Eye/head tracking is done imperatively (refs + requestAnimationFrame) so it
 * never triggers React re-renders. Blinking is pure CSS (.animate-blink).
 * On touch devices with no pointer, the eyes simply rest centered.
 */
export function AvatarBuddy({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftPupil = useRef<SVGGElement>(null);
  const rightPupil = useRef<SVGGElement>(null);

  useEffect(() => {
    // Target and current values for smooth easing toward the cursor.
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Direction to cursor, normalized and clamped to [-1, 1].
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    };

    const tick = () => {
      // Ease current toward target for a soft, lifelike follow.
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      // Pupils travel within the eye; head tilts a touch less.
      const pupil = 5;
      const head = 4;
      const px = (current.x * pupil).toFixed(2);
      const py = (current.y * pupil).toFixed(2);
      leftPupil.current?.setAttribute("transform", `translate(${px} ${py})`);
      rightPupil.current?.setAttribute("transform", `translate(${px} ${py})`);
      headRef.current?.setAttribute(
        "transform",
        `translate(${(current.x * head).toFixed(2)} ${(current.y * head).toFixed(2)})`
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
      {/* brand gradient glow ring */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary via-fuchsia-500 to-cyan-400 opacity-70 blur-2xl" />

      <svg
        viewBox="0 0 220 220"
        className="relative h-full w-full drop-shadow-2xl"
        role="img"
        aria-label="Cartoon avatar of Yash whose eyes follow the cursor"
      >
        <defs>
          <radialGradient id="ab-bg" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="hsl(258 60% 16%)" />
            <stop offset="100%" stopColor="hsl(245 50% 6%)" />
          </radialGradient>
          <linearGradient id="ab-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="ab-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>

        {/* backing disc + ring */}
        <circle cx="110" cy="110" r="106" fill="url(#ab-bg)" />
        <circle
          cx="110"
          cy="110"
          r="105"
          fill="none"
          stroke="url(#ab-ring)"
          strokeWidth="3"
        />

        {/* everything that reacts to the cursor */}
        <g ref={headRef}>
          {/* shoulders / hoodie */}
          <path
            d="M40 215 Q44 168 78 158 L142 158 Q176 168 180 215 Z"
            fill="url(#ab-hoodie)"
          />
          <path
            d="M96 158 Q110 176 124 158 L124 150 L96 150 Z"
            fill="#f3c9a6"
          />

          {/* ears */}
          <ellipse cx="64" cy="108" rx="9" ry="13" fill="#f0b994" />
          <ellipse cx="156" cy="108" rx="9" ry="13" fill="#f0b994" />

          {/* face */}
          <ellipse cx="110" cy="104" rx="50" ry="55" fill="#f6cda8" />

          {/* hair */}
          <path
            d="M58 96 Q56 44 110 44 Q164 44 162 96 Q150 70 132 66 Q118 86 96 70 Q76 70 70 84 Q64 86 58 96 Z"
            fill="#241c2e"
          />

          {/* eyebrows */}
          <path
            d="M76 86 Q90 79 104 85"
            stroke="#241c2e"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M116 85 Q130 79 144 86"
            stroke="#241c2e"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* left eye */}
          <g className="animate-blink">
            <ellipse cx="90" cy="104" rx="13" ry="15" fill="#ffffff" />
            <g ref={leftPupil}>
              <circle cx="90" cy="104" r="6.4" fill="#1b1430" />
              <circle cx="92.2" cy="101.6" r="2" fill="#ffffff" />
            </g>
          </g>

          {/* right eye */}
          <g className="animate-blink" style={{ animationDelay: "0.15s" }}>
            <ellipse cx="130" cy="104" rx="13" ry="15" fill="#ffffff" />
            <g ref={rightPupil}>
              <circle cx="130" cy="104" r="6.4" fill="#1b1430" />
              <circle cx="132.2" cy="101.6" r="2" fill="#ffffff" />
            </g>
          </g>

          {/* nose */}
          <path
            d="M110 110 Q106 122 112 124"
            stroke="#d9a47e"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* smile */}
          <path
            d="M92 134 Q110 148 128 134"
            stroke="#7a4a3a"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* headset mic — subtle developer/AI nod */}
          <path
            d="M62 104 Q60 70 110 68 Q160 70 158 104"
            stroke="#22d3ee"
            strokeWidth="4"
            fill="none"
            opacity="0.9"
          />
          <rect x="54" y="100" width="12" height="20" rx="5" fill="#22d3ee" />
          <rect x="154" y="100" width="12" height="20" rx="5" fill="#22d3ee" />
          <path
            d="M58 120 Q56 138 80 140"
            stroke="#22d3ee"
            strokeWidth="3.5"
            fill="none"
          />
          <circle cx="84" cy="140" r="3.5" fill="#22d3ee" />
        </g>
      </svg>
    </div>
  );
}
