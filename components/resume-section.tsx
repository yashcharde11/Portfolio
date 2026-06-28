import { ArrowUpRight, Download, FileText } from "lucide-react";
import { resume } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const RESUME_URL = "/Yash_Charde_Resume.pdf";

export function ResumeSection() {
  return (
    <section id="resume" className="container scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="résumé"
        title="Resume"
        description="Prefer the one-pager? Read my full resume right here, or download a copy."
      />

      <Reveal>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground">
              <FileText className="size-8" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold">
                {resume.name} — {resume.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                PDF · one-page resume
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={RESUME_URL} target="_blank" rel="noreferrer">
                  Open in new tab <ArrowUpRight />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={RESUME_URL} download>
                  Download <Download />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
