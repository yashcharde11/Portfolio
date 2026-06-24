import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resume } from "@/lib/data";
import { AmbientBackground } from "@/components/ambient-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { AIChat } from "@/components/ai-chat";

export const metadata: Metadata = {
  title: `Ask ${resume.name} AI — AI Assistant`,
  description:
    "Learn about my experience, projects, skills, and AI engineering journey.",
};

export default function AIAssistantPage() {
  return (
    <div className="relative flex h-[100dvh] flex-col">
      <AmbientBackground />

      {/* top bar */}
      <header className="shrink-0 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              {resume.name}
            </span>
            <span className="animated-title text-xs font-bold uppercase tracking-[0.2em]">
              AI/ML Engineer
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="shrink-0 border-b border-border/60 px-4 py-6 text-center sm:py-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ask <span className="text-gradient">Yash AI</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Learn about my experience, projects, skills, and AI engineering
          journey.
        </p>
      </section>

      {/* chat fills the remaining viewport height */}
      <AIChat />
    </div>
  );
}
