"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";

/**
 * Home-page call-to-action that replaces the inline projects grid.
 * A single eye-catching button routes recruiters to the dedicated
 * /projects page where every project is laid out in full.
 */
export function ProjectsCTA() {
  const count = projects.length;

  return (
    <section id="projects" className="container scroll-mt-24 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 px-6 py-16 text-center backdrop-blur-xl sm:py-20">
        {/* ambient glow orbs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <Reveal>
          <span className="font-mono text-sm font-bold tracking-tight text-primary">
            selected work
          </span>
        </Reveal>

        <Reveal index={1}>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Explore my <span className="text-gradient">Projects</span>
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {count} production-grade AI builds — multi-agent systems, LangGraph
            routing agents, RAG pipelines, and memory-efficient ML at scale. All
            in one place.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex justify-center">
            <Link href="/projects" aria-label="View all projects" className="group">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 px-9 py-5 text-base font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_40px_-8px_hsl(var(--primary))] transition-shadow duration-300 hover:shadow-[0_0_64px_-6px_hsl(var(--primary))] sm:px-11 sm:text-lg"
              >
                {/* shimmer sweep on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <FolderGit2 className="size-5 shrink-0" />
                Projects
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </motion.span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
