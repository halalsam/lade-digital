import RevealText from "../shared/RevealText";
import PillButton from "../shared/PillButton";
import { gradientFor } from "@/lib/gradient";

const SERVICE_CARDS = [
  {
    key: "branding",
    title: "Brand Identity",
    body: "Strategic design that positions products for trust and clarity.",
    tall: true,
  },
  {
    key: "design",
    title: "UX/UI design",
    body: "Interfaces that adapt, predict, and respond intelligently.",
    tall: false,
  },
  {
    key: "development",
    title: "Custom development",
    body: "Frontend, backend, and integrations — built for performance and scalability.",
    tall: false,
  },
];

function ServiceCard({
  card,
}: {
  card: (typeof SERVICE_CARDS)[number];
}) {
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-[20px] ${
          card.tall ? "aspect-[500/675]" : "aspect-square"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ background: gradientFor(card.key) }}
        />
      </div>
      <h3 className="mt-9 text-4xl leading-tight">{card.title}</h3>
      <p className="mt-4 max-w-[440px] text-2xl leading-snug tracking-[0.02em] text-ink/70">
        {card.body}
      </p>
    </div>
  );
}

export default function ServicesPreview() {
  const [intro, ...rest] = SERVICE_CARDS;
  return (
    <section className="relative">
      <div className="rounded-t-[80px] bg-paper pt-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
          <RevealText
            as="h2"
            text="Our services"
            className="display-xl mb-28 block"
          />

          <div className="grid gap-x-24 md:grid-cols-2">
            <div className="grid gap-24">
              <p className="max-w-[500px] text-[1.625rem] leading-tight tracking-[0.02em]">
                From motion design to AI-powered products — we design and build
                interfaces for the future.
              </p>
              <ServiceCard card={intro} />
            </div>
            <div className="mt-24 grid gap-24 md:mt-20">
              {rest.map((card) => (
                <ServiceCard key={card.key} card={card} />
              ))}
            </div>
          </div>

          <div className="mt-32 text-center">
            <PillButton
              href="/services"
              label="View all services"
              variant="ink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
