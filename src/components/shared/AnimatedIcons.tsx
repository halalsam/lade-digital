// Animated benefit icons (recreated from the source SVGs). Shared by the
// services Benefits section and the home ServicesPreview card media so the
// spinning/stroke animations live in one place. Animation classes
// (animate-spin-icon, icon-stroke) are defined globally in globals.css.

export function IconCompass() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16 animate-spin-icon">
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M22.72 71.22a9 9 0 0 0 8.36 3.33l27.32-3.97A9 9 0 0 0 65.46 65l10.22-25.64a9 9 0 0 0-1.3-8.9L57.29 8.77a9 9 0 0 0-8.36-3.33L21.6 9.42a9 9 0 0 0-7.06 5.57L4.32 40.64a9 9 0 0 0 1.3 8.9l17.1 21.68Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="m27.21 23.61 5.13 35.6L60.56 36.9 27.2 23.6Z"
      />
      <path stroke="currentColor" strokeWidth="4.08" d="m26.97 72.69 6.11-15.62" />
      <path stroke="currentColor" strokeWidth="4.08" d="m59.39 37.31 15.59-2.92" />
      <path stroke="currentColor" strokeWidth="4.08" d="m18.46 11.87 9.67 12.62" />
    </svg>
  );
}

export function IconStar() {
  return (
    <svg
      viewBox="0 0 65 65"
      className="h-16 w-16 animate-spin-icon [animation-direction:reverse]"
    >
      <path
        fill="currentColor"
        d="m34.2 25.05-1.7-13.26-1.7 13.26-7.28-11.2 4.22 12.68-11.43-6.94 9.3 9.6-13.3-1.3 12.55 4.61-12.55 4.6 13.3-1.28-9.3 9.6 11.43-6.95-4.22 12.69 7.28-11.21 1.7 13.26 1.7-13.26 7.28 11.2-4.22-12.68 11.43 6.94-9.3-9.6 13.3 1.3-12.55-4.61 12.55-4.6-13.3 1.28 9.3-9.6-11.43 6.95 4.23-12.69-7.29 11.21Z"
      />
    </svg>
  );
}

export function IconInterlock() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="icon-stroke h-16 w-16">
      <rect
        x="16"
        y="2"
        width="32"
        height="60"
        rx="16"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect
        x="2"
        y="48"
        width="32"
        height="60"
        rx="16"
        transform="rotate(-90 2 48)"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}

export function IconRipple() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className="h-16 w-16 animate-spin-icon [animation-direction:reverse]"
    >
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M44.95 77.68A38.02 38.02 0 0 1 2.32 44.95 38.02 38.02 0 0 1 35.05 2.32a38.02 38.02 0 0 1 42.63 32.73 38.02 38.02 0 0 1-32.73 42.63Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M44.95 77.68a25.01 25.01 0 0 1-6.51-49.58 25.01 25.01 0 0 1 6.51 49.58Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M41.56 51.9a25.01 25.01 0 0 1-6.51-49.58 25.01 25.01 0 0 1 6.51 49.58Z"
      />
    </svg>
  );
}
