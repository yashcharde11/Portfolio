"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, resume } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="container flex h-20 items-center justify-between">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {resume.name}
          </span>
          <span className="animated-title mt-1 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
            AI/ML Engineer
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const cls =
              "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";
            return link.href.startsWith("/") ? (
              <Link key={link.href} href={link.href} className={cls}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={cls}>
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button size="sm" asChild>
            <a href={`mailto:${resume.contact.email}`}>Hire Me</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col py-4">
            {navLinks.map((link) => {
              const cls =
                "rounded-lg px-2 py-3 text-base text-muted-foreground transition-colors hover:text-foreground";
              return link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cls}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cls}
                >
                  {link.label}
                </a>
              );
            })}
            <Button className="mt-2" asChild>
              <a href={`mailto:${resume.contact.email}`}>Hire Me</a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
