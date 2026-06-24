"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { resume } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MarkdownMessage } from "@/components/markdown-message";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What does Yash work on?",
  "Tell me about his projects",
  "What's his tech stack?",
];

/** Shown whenever the assistant can't answer (network/server error, empty reply). */
const FALLBACK = `Sorry, the chatbot isn't working right now — apologies for the inconvenience. Please try again in a little while, or reach ${resume.name} directly at ${resume.contact.email}.`;

/**
 * Floating "Ask AI about Yash" assistant. Streams responses from /api/chat,
 * which is backed by Azure OpenAI (gpt-4.1). Degrades gracefully without keys.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi! I'm **Recruiter Copilot**. Ask me about ${resume.name}'s projects, skills, experience, resume, and achievements.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Request failed");
      }

      // Stream the response token-by-token into a single assistant message.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let received = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: received };
          return copy;
        });
      }

      // An empty stream is still a failure — never leave the user hanging.
      if (!received.trim()) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: FALLBACK };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: FALLBACK },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* highlighted "Chatbot" label — invites recruiters to try it */}
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open Recruiter Copilot"
            className={cn(
              "hidden items-center gap-2.5 rounded-2xl border border-primary/30 bg-card/90 px-4 py-2.5 text-left shadow-xl backdrop-blur-md sm:flex",
              "transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-primary/20"
            )}
          >
            <Sparkles className="size-4 shrink-0 text-primary" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-gradient">
                Chatbot
              </span>
              <span className="block text-xs text-muted-foreground">
                Ask about my work
              </span>
            </span>
          </button>
        ) : null}

        {/* round launcher button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close Recruiter Copilot" : "Open Recruiter Copilot"}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full",
            "bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground",
            "shadow-[0_0_30px_-4px_hsl(var(--primary))]",
            "transition-transform hover:scale-105 active:scale-95"
          )}
        >
          {/* attention pulse ring (only while closed) */}
          {!open ? (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-primary/40" />
          ) : null}
          {open ? (
            <X className="relative size-6" />
          ) : (
            <MessageCircle className="relative size-6" />
          )}
        </button>
      </div>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl transition-all duration-300",
          "shadow-2xl",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ height: "min(32rem, 70vh)" }}
      >
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Recruiter Copilot</p>
            <p className="text-xs text-muted-foreground">
              Ask about {resume.name}
            </p>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                    : "bg-foreground/5 text-foreground"
                )}
              >
                {m.content ? (
                  m.role === "assistant" ? (
                    <MarkdownMessage content={m.content} />
                  ) : (
                    m.content
                  )
                ) : (
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                  </span>
                )}
              </div>
            </div>
          ))}
          {loading &&
          messages[messages.length - 1]?.role === "user" ? (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-foreground/5 px-3.5 py-2.5">
                <span className="inline-flex gap-1">
                  <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* suggestions */}
        {messages.length <= 1 ? (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current"
      style={{ animationDelay: delay }}
    />
  );
}
