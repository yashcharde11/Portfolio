import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { resume } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { contact } = resume;

  const links = [
    { icon: Mail, label: "Email", href: `mailto:${contact.email}`, value: contact.email },
    { icon: Phone, label: "Call", href: `tel:${contact.phone}`, value: contact.phone },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin, value: "in/yash-charde", external: true },
    { icon: Github, label: "GitHub", href: contact.github, value: "yashcharde11", external: true },
  ];

  return (
    <section id="contact" className="container scroll-mt-24 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-xl sm:p-12">
          {/* ambient glow */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Let&apos;s build something.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Open to full-time AI/ML engineering roles — remote, hybrid, or
                on-site. The fastest way to reach me is email.
              </p>
              <Button className="mt-8" size="lg" asChild>
                <a href={`mailto:${contact.email}`}>
                  <Mail /> Get in touch
                </a>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <link.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {link.label}
                    </p>
                    <p className="truncate text-sm text-foreground">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
