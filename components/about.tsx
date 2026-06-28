import Image from "next/image";
import { GraduationCap, Award, BadgeCheck, MapPin, Globe } from "lucide-react";
import { resume } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section id="about" className="container scroll-mt-24 py-24">
      <div className="flex flex-col items-center gap-8 text-center sm:gap-10 md:flex-row md:items-center md:gap-12 md:text-left">
        {/* Professional headshot in a circular gradient frame */}
        <Reveal className="shrink-0">
          <div className="group relative">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary via-fuchsia-500 to-cyan-400 opacity-80 blur-[6px] transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-44 w-44 overflow-hidden rounded-full border-[3px] border-background shadow-xl sm:h-52 sm:w-52">
              <Image
                src="/images/my_photo.jpg"
                alt={`${resume.name} — ${resume.title}`}
                fill
                priority
                sizes="(min-width: 640px) 208px, 176px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>

        <SectionHeading
          eyebrow="about me"
          title="Engineer, focused on shipping real AI."
          titleClassName="text-2xl sm:text-3xl md:text-4xl"
          description="AI Engineer focused on building intelligent, production-ready AI applications. I specialize in Agentic AI, LLMs, Python, and automation, with hands-on experience developing scalable AI systems that solve real-world business problems. I'm passionate about learning, building, and pushing the boundaries of modern AI."
          descriptionClassName="font-medium text-foreground/90 sm:text-lg"
        />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <Reveal>
          <Card className="h-full p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <h3 className="font-display text-xl font-semibold">Education</h3>
            </div>
            <ul className="mt-6 divide-y divide-border">
              {resume.education.map((edu) => (
                <li
                  key={edu.degree}
                  className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="font-mono text-sm text-primary">{edu.score}</p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {edu.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        {/* Certifications */}
        <Reveal index={1}>
          <Card className="h-full p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="size-5" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                Certifications
              </h3>
            </div>
            <ul className="mt-6 grid gap-3">
              {resume.certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-start gap-3 rounded-xl border border-border bg-foreground/[0.02] p-3 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BadgeCheck className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {cert.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                      {cert.year ? ` · ${cert.year}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      <Reveal index={2}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="accent" className="gap-1.5">
            <MapPin className="size-3.5" /> {resume.location}
          </Badge>
          <Badge variant="accent" className="gap-1.5">
            <Globe className="size-3.5" /> Remote · Hybrid · On-site
          </Badge>
        </div>
      </Reveal>
    </section>
  );
}
