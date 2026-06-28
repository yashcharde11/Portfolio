"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scroll-store";

/**
 * Buttery momentum scrolling (Lenis) wired into GSAP's ScrollTrigger so every
 * scroll-driven animation on the page reads from one synchronized clock.
 *
 * Renders nothing — it just drives the global window scroll. Respects
 * prefers-reduced-motion by skipping the smoothing entirely.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", (e: { progress: number; velocity: number }) => {
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
      ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so the two never fight over the frame.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // New route → jump to top and recalculate triggers for the new content.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
