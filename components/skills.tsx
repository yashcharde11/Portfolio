import { resume } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="container scroll-mt-24 py-24">
      <SectionHeading
        title="Technical Skills"
        description="From LLM orchestration and RAG pipelines to data analytics and backend services."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resume.skills.map((group, i) => (
          <Reveal key={group.group} index={i % 3}>
            <Card className="h-full p-6 hover:border-primary/40">
              <h3 className="font-mono text-sm uppercase tracking-wider text-primary">
                {group.group}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
