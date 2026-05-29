import RevealText from "../shared/RevealText";
import PillButton from "../shared/PillButton";

const SOLUTIONS = [
  {
    label: "Websites and platforms",
    body: "In our team, developers work alongside designers. This is crucial in creating a fast and responsive website that would excite the audience.",
    href: "/services/digital",
  },
  {
    label: "Mobile applications",
    body: "We don’t do cookie-cutter solutions. Every mobile app involves stages of target audience research and prototype testing. The result? A product that’s perfectly suited to your users.",
    href: "/services/mobile",
  },
  {
    label: "Strategy and branding",
    body: "We identify your brand by developing a logo, corporate identity, user manuals, mockups, and souvenir products. Whatever it takes to get your brand noticed.",
    href: "/services/branding",
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
    <section className="relative overflow-hidden pt-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
        <RevealText
          as="h2"
          text="Our solutions"
          className="display-xl mb-28 block"
        />

        <div>
          {SOLUTIONS.map((item) => (
            <div key={item.label}>
              <div className="mb-12 mt-24 first:mt-0">
                <Hairline />
              </div>
              <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                <div className="flex-1">
                  <h3 className="eyebrow">{item.label}</h3>
                </div>
                <div className="flex-1">
                  <p className="max-w-[500px] text-[1.625rem] leading-tight tracking-[0.02em]">
                    {item.body}
                  </p>
                  <div className="mt-10">
                    <PillButton href={item.href} label="Read more" variant="ink" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
