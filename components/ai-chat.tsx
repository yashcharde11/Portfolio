"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Plus, Sparkles, User } from "lucide-react";
import { resume } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "@/components/markdown-message";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What is Yash's current role and experience?",
  "Walk me through his strongest projects.",
  "What's his core tech stack?",
  "Tell me about his education and certifications.",
  "Would he fit an LLM / RAG engineer role?",
  "How can I get in touch with him?",
];

/** Shown whenever the assistant can't answer (network/server error, empty reply). */
const FALLBACK = `Sorry, the chatbot isn't working right now — apologies for the inconvenience. Please try again in a little while, or reach ${resume.name} directly at ${resume.contact.email}.`;

export function AIChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Keep the latest message in view as the conversation grows / streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  function autosize() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const next: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(next);
    setInput("");
    requestAnimationFrame(autosize);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

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

  const isEmpty = messages.length === 0;
  const lastIsStreaming =
    loading && messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* new chat — floats top-right so it never takes a row */}
      {!isEmpty ? (
        <button
          onClick={() => {
            setMessages([]);
            setInput("");
          }}
          disabled={loading}
          className="absolute right-4 top-3 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Plus className="size-4" /> New chat
        </button>
      ) : null}

      {/* messages / empty state */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
          {isEmpty ? (
            <EmptyState onPick={send} />
          ) : (
            <div className="space-y-6">
              {messages.map((m, i) => {
                const streamingThis =
                  lastIsStreaming && i === messages.length - 1;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3",
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        m.role === "user"
                          ? "bg-foreground/10 text-foreground"
                          : "bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground"
                      )}
                    >
                      {m.role === "user" ? (
                        <User className="size-4" />
                      ) : (
                        <Sparkles className="size-4" />
                      )}
                    </span>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:text-base",
                        m.role === "user"
                          ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                          : "bg-foreground/[0.04] text-foreground"
                      )}
                    >
                      {m.content ? (
                        m.role === "assistant" ? (
                          <div className="flex items-end">
                            <MarkdownMessage content={m.content} />
                            {streamingThis ? <Caret /> : null}
                          </div>
                        ) : (
                          m.content
                        )
                      ) : (
                        <TypingDots />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* input */}
      <div className="shrink-0 border-t border-border bg-background/60 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/60 p-2 transition-colors focus-within:border-primary/50">
              <textarea
                ref={taRef}
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value);
                  autosize();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder={`Ask anything about ${resume.name}…`}
                className="max-h-[160px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground sm:text-base"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI-generated from {resume.name}&apos;s portfolio · answers are
            limited to questions about him.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Centered welcome + suggested questions shown before the chat starts. */
function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-8 py-6 text-center sm:py-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground shadow-lg">
        <Sparkles className="size-7" />
      </span>
      <div>
        <p className="font-display text-xl font-semibold">
          How can I help you learn about {resume.name}?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a question below, or type your own.
        </p>
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="rounded-xl border border-border bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-foreground/[0.04]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Blinking caret shown at the tail of a streaming response. */
function Caret() {
  return (
    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse self-end bg-primary" />
  );
}

/** Three-dot "assistant is typing" indicator. */
function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      <Dot />
      <Dot delay="0.15s" />
      <Dot delay="0.3s" />
    </span>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  );
}
