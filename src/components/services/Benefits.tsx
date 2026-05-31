import RevealText from "../shared/RevealText";
import RevealUp from "../shared/RevealUp";
import Section from "../shared/Section";

// --- Animated benefit icons (recreated from the source SVGs) -------------

function IconCompass() {
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

function IconStar() {
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

function IconInterlock() {
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

function IconRipple() {
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

const BENEFITS = [
  {
    icon: <IconCompass />,
    label: "Time zones ain’t no thing",
    body: "Wherever you are in the world, you’ll feel like we’re right around the corner. With 12 years of experience, our business processes are seamless and time differences don’t matter.",
  },
  {
    icon: <IconStar />,
    label: "Impossible? We’re on it",
    body: "“Impossible” simply does not exist in our vocabulary. We develop products exactly as they were at the design stage, no simplifications, no shortcuts, no BS.",
  },
  {
    icon: <IconInterlock />,
    label: "Flexible work terms",
    body: "Just like we stick to a fixed budget, we stay within a set Time and Materials framework. Whatever terms we agree to will depend on your project needs.",
  },
  {
    icon: <IconRipple />,
    label: "Full spectrum of services",
    body: "Any solution your business needs, we’re on it: UI/UX design, logo creation, mobile app design, frontend and backend development, technical support.",
  },
];

// Panel chrome (rounded-top, ink bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the services page — this is content.
export default function Benefits() {
  return (
    <Section variant="overlap" bg="var(--color-ink)" className="text-paper">
      <RevealText
        as="h2"
        text="Benefits of working with us"
        className="display-xl mb-28 block"
      />

      <div>
        {BENEFITS.map((item, i) => (
          <RevealUp key={item.label}>
            <div
              className={`mb-12 mt-24 h-px w-full bg-paper/40 ${
                i === 0 ? "mt-0" : ""
              }`}
            />
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              <div className="flex-1">{item.icon}</div>
              <div className="flex-1">
                <h3 className="eyebrow mb-4">{item.label}</h3>
                <p className="max-w-[500px] text-[1.625rem] leading-tight tracking-[0.02em]">
                  {item.body}
                </p>
              </div>
            </div>
          </RevealUp>
        ))}
      </div>
    </Section>
  );
}
