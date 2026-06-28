import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Optional monospace eyebrow above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Override the default title sizing/styles. */
  titleClassName?: string;
  /** Override the default description sizing/styles. */
  descriptionClassName?: string;
}

/** Consistent, cinematic eyebrow + title + intro for the top of each section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <span className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          {eyebrow ?? "section"}
        </span>
      </Reveal>
      <Reveal index={1}>
        <h2
          className={cn(
            "display-xl mt-5 text-4xl text-foreground sm:text-5xl md:text-6xl",
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal index={2}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg",
              descriptionClassName
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
