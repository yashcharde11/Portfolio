"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.08 },
  }),
};

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplied by 0.08s for the entrance delay. */
  index?: number;
  className?: string;
}

/** Fades + slides its children up once they scroll into view. */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
