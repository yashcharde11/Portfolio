"use client";

import { motion, type Variants } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

const row: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
      delay: i * 0.12,
    },
  }),
};

export function Experience() {
  return (
    <section id="experience" className="container scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="the journey"
        title="Experience"
        description="Hands-on work building agentic AI workflows and retrieval systems in production and research settings."
      />

      <div className="relative mt-14">
        {/* timeline rail — draws itself in as the section scrolls into view */}
        <div className="absolute bottom-2 left-[6px] top-2 w-px">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-primary via-primary/50 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            custom={i}
            variants={row}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid gap-6 border-t border-border py-10 pl-10 md:grid-cols-[200px_1fr]"
          >
            {/* timeline dot */}
            <motion.span
              className="absolute left-[6px] top-12 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 16,
                delay: i * 0.12 + 0.25,
              }}
            >
              {job.current ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
              ) : null}
              <span className="relative h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
            </motion.span>

            {/* Meta column */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">
                  {job.period}
                </span>
                {job.current ? <Badge variant="live">Current</Badge> : null}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {job.role}
              </h3>
              <div className="flex items-center gap-2">
                {job.logo ? (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-0.5 ring-1 ring-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : null}
                <p className="text-sm text-primary">{job.company}</p>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                {job.location}
              </p>
            </div>

            {/* Content column */}
            <ul className="flex flex-col gap-4">
              {job.highlights.map((h, idx) => (
                <motion.li
                  key={idx}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12 + 0.3 + idx * 0.1,
                  }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {h.text}
                    {h.metric ? (
                      <>
                        {" "}
                        <span className="font-semibold text-foreground">
                          {h.metric}
                        </span>
                        {h.suffix ? <> {h.suffix}</> : null}
                      </>
                    ) : null}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
