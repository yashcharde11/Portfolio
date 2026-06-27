"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { resume } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — intro */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="live" className="gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {resume.availability}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Building{" "}
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text italic text-transparent">
              Intelligent
            </span>{" "}
            AI Systems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {resume.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild>
              <Link href="/projects">
                View Projects <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={resume.contact.linkedin} target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn <ArrowUpRight />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={resume.contact.github} target="_blank" rel="noreferrer">
                <Github /> GitHub <ArrowUpRight />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Right — staggered stat cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {resume.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <Card className="h-full p-5 hover:border-primary/40">
                <span className="font-mono text-xs uppercase tracking-wider text-primary">
                  {stat.label}
                </span>
                <p className="mt-2 font-display text-lg font-semibold leading-snug">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.detail}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
