import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Optional monospace eyebrow above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/** Consistent eyebrow + title + intro used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <Reveal>
          <span className="font-mono text-sm tracking-tight text-primary">
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal index={1}>
        <h2
          className={cn(
            "font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl",
            eyebrow && "mt-3"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal index={2}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
