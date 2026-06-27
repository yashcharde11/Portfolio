"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="container scroll-mt-24 py-24">
      <SectionHeading
        title="Projects"
        description="Production-grade, problem-solving AI projects — from multi-agent systems and offline RAG to memory-efficient ML at scale."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => {
          const hasSplitLinks = Boolean(project.github || project.demo);
          // A single clickable card only when there's one canonical link and
          // no separate repo/demo links (nested anchors aren't valid).
          const isLink = Boolean(project.url) && !hasSplitLinks;
          const Wrapper = isLink ? "a" : "div";
          return (
            <Reveal key={project.number} index={i}>
              <Wrapper
                {...(isLink
                  ? { href: project.url, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group block h-full"
              >
                <motion.div
                  className="h-full"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                <Card
                  className={cn(
                    "relative h-full overflow-hidden p-6 transition-colors duration-300",
                    "hover:border-primary/50 hover:bg-card/80"
                  )}
                >
                  {/* glow on hover */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {project.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.badge ? (
                        <Badge variant="outline">{project.badge}</Badge>
                      ) : null}
                      {isLink ? (
                        <ArrowUpRight className="size-5 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-primary group-hover:opacity-100" />
                      ) : null}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  {hasSplitLinks ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                        >
                          <Github className="size-4" />
                          GitHub
                        </a>
                      ) : null}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          <ExternalLink className="size-4" />
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </Card>
                </motion.div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
