"use client";

import { useRef, useState, type ComponentProps } from "react";

/* --------------------------------------------------------------------------
   Code block with a copy button, for the MDX blog body.

   rehype-pretty-code (Shiki) emits the highlighted <pre><code> with inline
   token colors and a theme background (via its own `style`). We render that
   same <pre> here — passing its props straight through so Shiki's colors
   survive — and only add layout (radius / padding / scroll) plus a copy button.
   We deliberately DON'T set a text/background color, or we'd paint over the
   highlighting.

   The article page stays a Server Component; only this leaf hydrates (the copy
   button needs browser JS). The code text is read off the rendered DOM, so the
   raw source never has to be threaded through.
   ------------------------------------------------------------------------- */

export default function CodeBlock({
  children,
  className = "",
  style,
  ...rest
}: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (insecure origin / denied) → select-fallback.
      const sel = window.getSelection();
      const range = document.createRange();
      if (preRef.current && sel) {
        range.selectNodeContents(preRef.current);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      return; // leave it selected so the user can ⌘/Ctrl-C
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative mt-8">
      <button
        type="button"
        onClick={copy}
        // Hide the custom follower dot and show the native pointer (hand) so the
        // button reads as clickable instead of triggering the cursor's pill.
        data-cursor="-hidden"
        aria-label={copied ? "Copied" : "Copy code"}
        className="code-copy-btn absolute right-3 top-3 z-10 cursor-pointer rounded-md border border-paper/15 bg-paper/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-paper/70 opacity-0 backdrop-blur transition-opacity hover:bg-paper/20 hover:text-paper focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={preRef}
        // Keep Shiki's inline `style` (theme background/foreground) — don't set
        // our own colors. Just add the frame + horizontal scroll.
        style={style}
        className={`overflow-x-auto rounded-media p-5 text-sm leading-relaxed md:p-6 ${className}`}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
