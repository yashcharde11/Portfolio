import { resume } from "@/lib/data";

export function Footer() {
  const year = "2026";
  return (
    <footer className="border-t border-border">
      <div className="container flex justify-center py-8">
        <p className="font-mono text-sm text-muted-foreground">
          © {year} {resume.name} · {resume.title}
        </p>
      </div>
    </footer>
  );
}
