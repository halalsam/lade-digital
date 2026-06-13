import RevealUp from "../shared/RevealUp";
import Section from "../shared/Section";
import SectionHeading from "../shared/SectionHeading";
import {
  IconCompass,
  IconStar,
  IconInterlock,
  IconRipple,
} from "../shared/AnimatedIcons";

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
    <Section
      variant="overlap"
      bg="var(--color-ink)"
      className="text-paper"
      labelledBy="benefits-heading"
    >
      <SectionHeading id="benefits-heading" text="Benefits of working with us" />

      <div>
        {BENEFITS.map((item, i) => (
          <RevealUp key={item.label}>
            <div
              className={`my-13 h-px w-full bg-paper/40 ${
                i === 0 ? "mt-0" : ""
              }`}
            />
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              <div className="flex-1">{item.icon}</div>
              <div className="flex-1">
                <h3 className="eyebrow mb-4">{item.label}</h3>
                <p className="max-w-[500px] text-xl leading-tight tracking-apple-body md:text-[1.625rem]">
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
