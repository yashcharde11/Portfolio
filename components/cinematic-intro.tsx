"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Bot,
  Database,
  Workflow,
} from "lucide-react";
import { resume } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AvatarBuddy } from "@/components/avatar-buddy";
import { AvatarWorking } from "@/components/avatar-working";

const DO_CARDS = [
  {
    icon: Bot,
    title: "Agentic AI Systems",
    desc: "Multi-agent pipelines and autonomous workflows built with LangGraph and the Microsoft Agent Framework.",
    tags: ["LangGraph", "Multi-Agent", "MCP"],
  },
  {
    icon: Database,
    title: "LLM & RAG Applications",
    desc: "Retrieval-augmented chat and Q&A over your own data using Azure OpenAI, Claude, and ChromaDB.",
    tags: ["RAG", "Azure OpenAI", "ChromaDB"],
  },
  {
    icon: Workflow,
    title: "Automation & Data",
    desc: "Turning messy data and manual work into reliable, automated Python pipelines and clear insights.",
    tags: ["Python", "Pandas", "FastAPI"],
  },
];

export function CinematicIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Intro entrance (runs on all sizes).
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".intro-greet", { y: 24, opacity: 0, duration: 0.8 })
        .from(".intro-name > *", { yPercent: 115, stagger: 0.1, duration: 1 }, "-=0.4")
        .from(".intro-role > *", { yPercent: 115, stagger: 0.1, duration: 1 }, "<")
        .from(".intro-avatar", { scale: 0.8, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, "-=0.8")
        .from(".intro-actions", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");

      // Scroll-scrubbed Scene A → Scene B crossfade — desktop only.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".scene-b", { autoAlpha: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .to(".scene-a", { autoAlpha: 0, yPercent: -6 }, 0)
          .to(".intro-avatar", { scale: 0.7, autoAlpha: 0 }, 0)
          .to(".scene-b", { autoAlpha: 1, duration: 0.5 }, 0.4)
          .from(".whatido > *", { yPercent: 115, stagger: 0.12 }, 0.45)
          .from(".do-avatar", { y: 60, autoAlpha: 0, scale: 0.92 }, 0.46)
          .from(".do-card", { x: 50, autoAlpha: 0, stagger: 0.12 }, 0.5);
      });
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative lg:h-[260vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        {/* ───────────── SCENE A — intro ───────────── */}
        <div className="scene-a flex min-h-screen w-full items-center py-24 lg:absolute lg:inset-0 lg:min-h-0 lg:pb-12 lg:pt-24">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              {/* left — greeting + name */}
              <div className="text-center lg:text-left">
                <p className="intro-greet font-mono text-sm uppercase tracking-[0.3em] text-primary">
                  Hello! I&apos;m
                </p>
                <h1 className="intro-name display-xl mt-3 text-[clamp(2.5rem,7vw,5rem)]">
                  <span className="block overflow-hidden">
                    <span className="block">Yash</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="block text-gradient">Charde</span>
                  </span>
                </h1>
              </div>

              {/* center — avatar */}
              <div className="intro-avatar relative mx-auto aspect-square w-[clamp(12rem,28vw,17rem)]">
                <AvatarBuddy className="h-full w-full" />
              </div>

              {/* right — role */}
              <div className="text-center lg:text-right">
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  An
                </p>
                <div className="intro-role display-xl mt-3 text-[clamp(2rem,6vw,4.5rem)]">
                  <span className="block overflow-hidden">
                    <span className="block">AI</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="text-stroke block">Engineer</span>
                  </span>
                </div>
              </div>
            </div>

            {/* actions + stats */}
            <div className="intro-actions mt-8 flex flex-col items-center gap-6 lg:mt-10">
              <div className="flex flex-wrap items-center justify-center gap-3">
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
                <Button variant="ghost" size="icon" asChild>
                  <a href="/Yash_Charde_Resume.pdf" target="_blank" rel="noreferrer" aria-label="Resume">
                    <FileText />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={resume.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={resume.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {resume.stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-primary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* scroll cue (desktop) */}
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground lg:flex">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-9 w-5 rounded-full border border-border p-1">
              <span className="mx-auto block h-2 w-1 animate-bounce rounded-full bg-primary" />
            </span>
          </div>
        </div>

        {/* ───────────── SCENE B — what I do ───────────── */}
        <div className="scene-b flex min-h-screen w-full items-center border-t border-border/60 py-24 lg:absolute lg:inset-0 lg:min-h-0 lg:border-t-0 lg:pb-12 lg:pt-24">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* left — heading + working avatar */}
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
                  what I build
                </p>
                <h2 className="whatido display-xl mt-3 text-[clamp(2rem,5vw,3.75rem)]">
                  <span className="block overflow-hidden">
                    <span className="block">What</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="block text-gradient">I Do</span>
                  </span>
                </h2>
                <div className="do-avatar relative mx-auto mt-3 aspect-square w-[clamp(10rem,20vw,14rem)] lg:mx-0">
                  <AvatarWorking className="h-full w-full" />
                </div>
              </div>

              {/* right — capability cards */}
              <div className="flex flex-col gap-2.5">
                {DO_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="do-card group rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-xl transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <card.icon className="size-5" />
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">
                      {card.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-foreground/[0.03] px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
