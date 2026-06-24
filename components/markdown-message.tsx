"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders an assistant reply as nicely-styled, compact markdown. */
export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="space-y-2 [&_p]:m-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            />
          ),
          ul: (props) => (
            <ul {...props} className="list-disc space-y-1 pl-4" />
          ),
          ol: (props) => (
            <ol {...props} className="list-decimal space-y-1 pl-4" />
          ),
          li: (props) => (
            <li {...props} className="marker:text-muted-foreground" />
          ),
          strong: (props) => <strong {...props} className="font-semibold" />,
          em: (props) => <em {...props} className="italic" />,
          code: (props) => (
            <code
              {...props}
              className="rounded bg-foreground/10 px-1 py-0.5 text-[0.85em]"
            />
          ),
          h1: (props) => <p {...props} className="font-semibold" />,
          h2: (props) => <p {...props} className="font-semibold" />,
          h3: (props) => <p {...props} className="font-semibold" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
