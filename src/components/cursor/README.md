# Cursor follower (`cb-cursor`)

A global, Cuberto-style cursor accent. The **native system cursor stays visible** —
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

---

## 3. `useCursor()` hook (imperative)

For full control, e.g. a custom component that can't carry data-attributes, or
when the content depends on runtime state.

```tsx
import { useCursor } from "@/components/cursor/CursorProvider";

function PlayButton() {
  const cursor = useCursor();
  const reset = useRef<(() => void) | null>(null);

  return (
    <div
      onPointerEnter={() => {
        reset.current = cursor.set({
          content: <PlayGlyph />,
          className: "-ring",
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

```ts
type CursorState = {
  content?: ReactNode;   // any node to render as the cursor body
  className?: string;    // extra state class(es) while active
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
- **On-demand loop** — the `requestAnimationFrame` loop starts on pointer move
  and **parks itself** once the dot catches up and velocity hits zero. An idle
  pointer costs no per-frame work.
- **Disabled** on coarse/touch pointers (`pointer: fine` gate) and under
  `prefers-reduced-motion: reduce`.
- **Resets** on route change so a target that animated away doesn't leave the
  cursor stuck in a state.
- `pointer-events: none` — it never blocks clicks.

### Tuning

Constants at the top of the movement effect in `CursorProvider.tsx`:

| Const      | Meaning                                  | Default |
| ---------- | ---------------------------------------- | ------- |
| `LAG`      | Follow snappiness (0–1, higher = tighter) | `0.18`  |
| `SKEW_K`   | Velocity → skew degrees scaling           | `0.9`   |
| `MAX_SKEW` | Max skew in degrees                       | `14`    |

Pill/ring sizing and colors live in the `.cb-cursor*` rules in `globals.css`.

---

## Gotchas

- GSAP owns the **`transform`** of the root (`x/y/rotation`) and inner
  (`skewX/rotation`). Don't add CSS `transform` to `.cb-cursor` or
  `.cb-cursor-inner` — animate size via `width`/`height`/`margin` and scale the
  `.cb-cursor-content` slot instead (that's what `-click` does).
- For `data-cursor-media`, the file extension decides `<img>` vs `<video>`;
  `.png/.jpg/.jpeg/.gif/.webp/.avif/.svg` → image, everything else → video.
