# Cursor follower (`cb-cursor`)

A global, Lade-style cursor accent. The **native system cursor stays visible** —
this is an extra dot that trails it and morphs into whatever element you set while
hovering a target. It supports a directional skew on movement and is fully
on-demand (no idle CPU cost).

- Component: [`CursorProvider.tsx`](./CursorProvider.tsx)
- Styles: the `.cb-cursor*` block in [`src/app/globals.css`](../../app/globals.css)
- Mounted in: [`src/app/layout.tsx`](../../app/layout.tsx)

```
<TransitionProvider>
  <CursorProvider>{children}</CursorProvider>   ← already wired
</TransitionProvider>
```

You don't need to do anything to enable it. To make it _react_ to an element,
use one of the three APIs below.

---

## Quick start: hover an element to show a custom cursor

Pick by what your custom cursor _is_:

| Your custom cursor is…                        | Use                                          |
| --------------------------------------------- | -------------------------------------------- |
| a **text label**                              | `data-cursor-text="…"` ([§1](#1-data-attributes-no-react-wiring)) |
| an **image / video** preview                  | `data-cursor-media="/path.jpg"` ([§1](#1-data-attributes-no-react-wiring)) |
| just a **state class** (ring, blend, scale…)  | `data-cursor="-ring"` ([§1](#1-data-attributes-no-react-wiring)) |
| a **custom element / icon / component (JSX)** | `<Cursor content={…}>` ([§2](#2-cursor-wrapper-stay-in-jsx)) or `useCursor()` ([§3](#3-usecursor-hook-imperative)) |

**The common case — a JSX element (an icon, a badge, a whole component) as the
cursor while hovering a target — is the `<Cursor>` wrapper:**

```tsx
import { Cursor } from "@/components/cursor/CursorProvider";
import { ArrowUpRight } from "lucide-react";

// becomes an arrow-in-a-pill while hovering the link, resets on leave
<Cursor content={<ArrowUpRight />} className="-ring">
  <a href="/work">See our work</a>
</Cursor>;
```

That's it — `content` is **any ReactNode**, `className` is an optional
[state class](#states-the-classname--data-cursor-values). Leave is handled for
you (including the awkward cases: leaving to empty space, the element scrolling
out from under a still pointer, route changes, unmount). Reach for the
[`useCursor()` hook](#3-usecursor-hook-imperative) only when you can't wrap the
target in an element (and pass `owner` there — see that section).

> Data attributes (`data-cursor*`) only take **strings**, so they can't render a
> custom JSX element — use them for text/media/state-class cursors, and
> `<Cursor>` / `useCursor()` for an element.

---

## 1. Data attributes (no React wiring)

Put these on **any** element. They're picked up by an event-delegated listener,
so dynamically rendered / page-transitioned content works automatically.

| Attribute            | Effect while hovered                                  |
| -------------------- | ----------------------------------------------------- |
| `data-cursor`        | Adds state class(es) to the cursor, e.g. `-ring`      |
| `data-cursor-text`   | Shows a text label inside the cursor                  |
| `data-cursor-media`  | Shows an image **or** video preview (by file ext)     |

```tsx
// text label
<a href="/contact" data-cursor-text="Say hi">Contact</a>

// state class only (see "States" below)
<button data-cursor="-blend">Toggle</button>

// image preview (png/jpg/webp/avif/gif/svg → <img>)
<li data-cursor-media="/projects/aurora.jpg">Aurora</li>

// video preview (anything else → autoplay/muted/loop <video>)
<li data-cursor-media="/reel.mp4">Showreel</li>

// combine a class with text
<a data-cursor="-ring" data-cursor-text="Open">Read more</a>
```

---

## 2. `<Cursor>` wrapper (stay in JSX)

Wrap a hover target and pass **any ReactNode** as `content`. The cursor becomes
that node while hovering, and resets on leave (and on unmount).

```tsx
import { Cursor } from "@/components/cursor/CursorProvider";
import { ArrowUpRight } from "lucide-react";

<Cursor content={<ArrowUpRight />} className="-ring">
  <a href="/work">See our work</a>
</Cursor>;

// render a whole component as the cursor
<Cursor content={<MiniMap pin={project.coords} />}>
  <Card project={project} />
</Cursor>;
```

Props:

| Prop        | Type                                      | Default  |
| ----------- | ----------------------------------------- | -------- |
| `content`   | `ReactNode` — anything to show as cursor  | —        |
| `className` | state class string (see "States")         | —        |
| `as`        | `"span" \| "div" \| "a" \| "button" \| "li"` | `"span"` |

Any extra props (`href`, `onClick`, `className` on the wrapper, …) pass through
to the rendered tag.

Leave is fully managed for you: the wrapper hands its own element to the provider
as the [`owner`](#3-usecursor-hook-imperative), so the cursor resets on
pointer-leave, on the element **scrolling out from under a still pointer**, on
route change, and on unmount — no stuck cursors.

---

## 3. `useCursor()` hook (imperative)

For full control, e.g. a custom component that can't carry data-attributes, or
when the content depends on runtime state. **Prefer [`<Cursor>`](#2-cursor-wrapper-stay-in-jsx)
unless you need this** — it wires leave-handling for you; here you do it yourself.

```tsx
import { useCursor } from "@/components/cursor/CursorProvider";

function PlayButton() {
  const cursor = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  const reset = useRef<(() => void) | null>(null);

  return (
    <div
      ref={ref}
      onPointerEnter={() => {
        reset.current = cursor.set({
          content: <PlayGlyph />,
          className: "-ring",
          owner: ref.current, // ← auto-clear safety net (see below)
        });
      }}
      onPointerLeave={() => {
        reset.current?.();
        reset.current = null;
      }}
    >
      …
    </div>
  );
}
```

`cursor.set(state)` returns a **reset function** — call it on leave to restore
the previous state. Calls nest correctly: the most recently set, still-active
entry wins, so overlapping hover regions behave intuitively. Off-provider (e.g.
in a test) it's a safe no-op.

**Always pass `owner`** (the hovered element). With it, the provider auto-clears
the entry the instant the pointer is no longer over that element — including the
cases a lone `onPointerLeave` misses: leaving fast to empty space, or the element
**scrolling out from under a still pointer**. Without it, a missed leave leaves
the cursor stuck in its hovered state until something else changes it. (`<Cursor>`
passes `owner` for you, which is why it "just works.") Your own `reset()` still
works and stays the fast path — `owner` is the backstop.

```ts
type CursorState = {
  content?: ReactNode;     // any node to render as the cursor body
  className?: string;      // extra state class(es) while active
  owner?: Element | null;  // hovered element → provider auto-clears on leave
};
```

---

## States (the `className` / `data-cursor` values)

Pass these as `className` (hook / `<Cursor>`) or `data-cursor` (attribute):

| Class     | Look                                                        |
| --------- | ---------------------------------------------------------- |
| _(none)_  | Filled black pill with the content in paper-white          |
| `-ring`   | Hollow outlined ring, content in ink                       |
| `-media`  | Larger thumbnail frame (220×150) for image/video previews  |
| `-blend`  | `mix-blend-mode: difference` — inverts over any background  |

`data-cursor-media` already implies the media frame sizing for fitted images.
You can also define your own: add a `.cb-cursor.-yourstate.-active .cb-cursor-inner`
rule in `globals.css` and pass `-yourstate`.

Internal state classes set automatically (don't set these yourself): `-active`
(content present), `-hidden` (pointer off-window), `-click` (pointer pressed).

---

## Behavior & performance

- **Skew on movement** — the body skews + tilts toward the travel direction,
  scaled by velocity, easing back to flat as it settles.
- **Reacts to scroll while still** — wheel/trackpad scrolling injects a decaying
  skew/tilt even when the pointer doesn't move, so the dot leans as content
  rushes past, then eases back to flat.
- **Re-resolves hover on scroll** — when the page scrolls beneath a *stationary*
  pointer, a throttled `elementFromPoint` hit-test re-checks what's under the
  cursor, so a `data-cursor` target scrolling into place activates (and one
  scrolling away clears) without needing a pointer move.
- **On-demand loop** — the `requestAnimationFrame` loop starts on pointer move
  **or wheel scroll** and **parks itself** once the dot catches up and both
  pointer- and scroll-velocity hit zero. An idle pointer costs no per-frame work.
- **Cheap per-frame writes** — the loop uses `gsap.quickSetter` (bound once) and
  mutates scalars rather than allocating per frame, so the hot path stays lean.
- **Disabled** on coarse/touch pointers (`pointer: fine` gate) and under
  `prefers-reduced-motion: reduce`.
- **Resets** on route change so a target that animated away doesn't leave the
  cursor stuck in a state.
- `pointer-events: none` — it never blocks clicks.

### Tuning

Constants at the top of the movement effect in `CursorProvider.tsx`:

| Const          | Meaning                                       | Default |
| -------------- | --------------------------------------------- | ------- |
| `LAG`          | Follow snappiness (0–1, higher = tighter)     | `0.18`  |
| `SKEW_K`       | Pointer velocity → skew degrees scaling       | `0.9`   |
| `MAX_SKEW`     | Max skew in degrees                           | `14`    |
| `SCROLL_K`     | Wheel delta → scroll skew/tilt scaling        | `0.05`  |
| `SCROLL_DECAY` | Per-frame falloff of scroll velocity toward 0 | `0.82`  |

Pill/ring sizing and colors live in the `.cb-cursor*` rules in `globals.css`.

---

## Gotchas

- GSAP owns the **`transform`** of the root (`x/y/rotation`) and inner
  (`skewX/rotation`). Don't add CSS `transform` to `.cb-cursor` or
  `.cb-cursor-inner` — animate size via `width`/`height`/`margin` and scale the
  `.cb-cursor-content` slot instead (that's what `-click` does).
- For `data-cursor-media`, the file extension decides `<img>` vs `<video>`;
  `.png/.jpg/.jpeg/.gif/.webp/.avif/.svg` → image, everything else → video.
