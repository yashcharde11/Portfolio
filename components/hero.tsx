"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import { resume } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AvatarBuddy } from "@/components/avatar-buddy";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.1 },
      });

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          ".hero-line > *",
          { yPercent: 115, stagger: 0.12 },
          "-=0.3"
        )
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 },
          "-=0.7"
        )
        .from(
          ".hero-avatar",
          { scale: 0.8, opacity: 0, duration: 1.1, ease: "back.out(1.6)" },
          "-=1"
        )
        .from(".hero-cue", { opacity: 0, duration: 0.8 }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
       <div>
        {/* eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {resume.title} · {resume.location}
          </span>
        </div>

        {/* kinetic headline — each line clips its own reveal */}
        <h1 className="display-xl mt-6 text-[clamp(2.75rem,11vw,9rem)]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Building</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text italic text-transparent">
              Intelligent
            </span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="text-stroke block">AI Systems</span>
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {resume.summary}
        </p>

        {/* primary actions */}
        <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/projects">
              View Projects <ArrowUpRight />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${resume.contact.email}`}>
              <Mail /> Hire Me
            </a>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={resume.contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={resume.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </Button>
          </div>
        </div>

        {/* credibility stats strip */}
        <div className="hero-fade mt-14 flex flex-wrap gap-x-10 gap-y-6">
          {resume.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="max-w-[15rem]">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
       </div>

        {/* interactive avatar — eyes follow the cursor */}
        <div className="hero-avatar relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
          <AvatarBuddy className="h-full w-full" />
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex">
        <MousePointer2 className="size-4 animate-bounce" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
      </div>
    </section>
  );
}
