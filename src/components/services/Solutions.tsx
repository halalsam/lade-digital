import RevealUp from "../shared/RevealUp";
import Section from "../shared/Section";
import SectionHeading from "../shared/SectionHeading";

const SOLUTIONS = [
  {
    label: "Websites and platforms",
    body: "In our team, developers work alongside designers. This is crucial in creating a fast and responsive website that would excite the audience.",
    tags: ["Web design", "Frontend", "Backend", "CMS"],
  },
  {
    label: "Mobile applications",
    body: "We don’t do cookie-cutter solutions. Every mobile app involves stages of target audience research and prototype testing. The result? A product that’s perfectly suited to your users.",
    tags: ["iOS", "Android", "Prototyping", "User testing"],
  },
  {
    label: "Strategy and branding",
    body: "We identify your brand by developing a logo, corporate identity, user manuals, mockups, and souvenir products. Whatever it takes to get your brand noticed.",
    tags: ["Logo", "Identity", "Guidelines", "Mockups"],
  },
];

// A full-width hairline (subtle curve, like the source's animated SVG line).
function Hairline({ color = "var(--color-ink)" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 1110 4"
      preserveAspectRatio="none"
      className="h-px w-full"
      aria-hidden="true"
    >
      <path
        d="M0,2 Q555,2 1110,2"
        fill="none"
        stroke={color}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Solutions() {
  return (
    <Section
      variant="normal"
      className="overflow-hidden mb-16 pt-20 md:pt-28 lg:pt-36"
      labelledBy="solutions-heading"
    >
      <SectionHeading id="solutions-heading" text="Our solutions" />

      <div>
        {SOLUTIONS.map((item, i) => (
          <RevealUp key={item.label}>
            <div
              className={`my-13 h-px w-full bg-ink/40 ${
                i === 0 ? "mt-0" : ""
              }`}
            />
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              <div className="flex-1">
                <h3 className="eyebrow">{item.label}</h3>
              </div>
              <div className="flex-1">
                <p className="max-w-[500px] text-xl leading-tight tracking-apple-body md:text-[1.625rem]">
                  {item.body}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink/20 px-4 py-1.5 text-sm tracking-apple-body text-ink/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealUp>
        ))}
      </div>
    </Section>
  );
}
