import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resume } from "@/lib/data";
import { AmbientBackground } from "@/components/ambient-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: `Projects — ${resume.name}`,
  description:
    "AI engineering projects by Yash Charde — multi-agent systems, LangGraph routing agents, RAG pipelines, and memory-efficient ML at scale.",
};

export default function ProjectsPage() {
  return (
    <>
      <AmbientBackground />

      {/* top bar with a clear way back to the portfolio */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-tight">
              {resume.name}
            </span>
            <span className="animated-title mt-1 text-xs font-bold uppercase tracking-[0.2em]">
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

      <main>
        <Projects />
      </main>

      <Footer />
    </>
  );
}
