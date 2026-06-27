import resumeJson from "@/data/resume.json";
import projectsJson from "@/data/projects.json";
import experienceJson from "@/data/experience.json";

/** Typed accessors over the JSON content in /data. */

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Stat {
  label: string;
  value: string;
  detail: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  score: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Resume {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  availability: string;
  location: string;
  openToRemote: boolean;
  contact: Contact;
  stats: Stat[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
}

export interface Project {
  number: string;
  title: string;
  featured: boolean;
  badge?: string;
  /** Single canonical link (used when there's no separate repo/demo split). */
  url?: string;
  /** Source code repository link. */
  github?: string;
  /** Hosted live demo link. */
  demo?: string;
  description: string;
  tags: string[];
}

export interface Highlight {
  text: string;
  metric?: string;
  suffix?: string;
}

export interface Experience {
  role: string;
  company: string;
  logo?: string;
  location: string;
  period: string;
  current: boolean;
  highlights: Highlight[];
}

export const resume = resumeJson as Resume;
export const projects = projectsJson as Project[];
export const experience = experienceJson as Experience[];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];
