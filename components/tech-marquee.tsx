const TECH = [
  "Python",
  "LangChain",
  "LangGraph",
  "RAG Pipelines",
  "Azure OpenAI",
  "Anthropic Claude",
  "MCP",
  "Microsoft Agent Framework",
  "ChromaDB",
  "FastAPI",
  "Streamlit",
  "Prompt Engineering",
  "Vector Databases",
  "Pandas",
  "Scikit-learn",
  "PostgreSQL",
];

/** Edge-faded, infinitely scrolling ribbon of the core tech stack. */
export function TechMarquee() {
  return (
    <section
      aria-label="Core technologies"
      className="relative border-y border-border/60 bg-card/30 py-6 backdrop-blur-sm"
    >
      <div className="marquee-mask flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {/* duplicated once so the -50% translate loops seamlessly */}
          {[...TECH, ...TECH].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-10 font-display text-lg font-medium tracking-tight text-muted-foreground"
            >
              {tech}
              <span className="text-primary/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
