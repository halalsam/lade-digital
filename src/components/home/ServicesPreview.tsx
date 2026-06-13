import type { ReactNode } from "react";
import RevealUp from "../shared/RevealUp";
import SectionHeading from "../shared/SectionHeading";
import SectionCta from "../shared/SectionCta";
import MediaFrame from "../shared/MediaFrame";
import {
  IconCompass,
  IconStar,
  IconInterlock,
  IconRipple,
} from "../shared/AnimatedIcons";
import { gradientFor } from "@/lib/gradient";

const SERVICE_CARDS: {
  key: string;
  title: string;
  body: string;
  tall: boolean;
  icon: ReactNode;
}[] = [
  {
    key: "branding",
    title: "Brand Identity",
    body: "Strategic design that positions products for trust and clarity.",
    tall: true,
    icon: <IconCompass />,
  },
  {
    key: "design",
    title: "UX/UI design",
    body: "Interfaces that adapt, predict, and respond intelligently.",
    tall: false,
    icon: <IconStar />,
  },
  {
    key: "development",
    title: "Custom development",
    body: "Frontend, backend, and integrations — built for performance and scalability.",
    tall: false,
    icon: <IconInterlock />,
  },
  {
    key: "motion",
    title: "Motion & AI",
    body: "Motion design and AI-powered products that feel alive and responsive.",
    tall: false,
    icon: <IconRipple />,
  },
];

function ServiceCard({
  card,
}: {
  card: (typeof SERVICE_CARDS)[number];
}) {
  return (
    <div>
      <MediaFrame className={card.tall ? "aspect-[500/675]" : "aspect-square"}>
        <div
          className="absolute inset-0"
          style={{ background: gradientFor(card.key) }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-paper [&_svg]:h-1/3 [&_svg]:w-auto">
          {card.icon}
        </div>
      </MediaFrame>
      
      {/* Scaled mobile text to text-xl so it doesn't break into single letters */}
      <h3 className="mt-4 text-xl leading-tight tracking-apple-headline md:mt-9 md:text-4xl">
        {card.title}
      </h3>
      
      {/* Scaled mobile body text down to text-sm/text-base to ensure readability */}
      <p className="mt-2 max-w-[440px] text-sm leading-snug tracking-apple-body text-ink/70 md:mt-4 md:text-xl lg:text-2xl">
        {card.body}
      </p>
    </div>
  );
}

export default function ServicesPreview() {
  // Split into two balanced columns: left gets the tall intro card + one more,
  // right gets the remaining two. Keeps the staggered masonry rhythm.
  const left = [SERVICE_CARDS[0], SERVICE_CARDS[2]];
  const right = [SERVICE_CARDS[1], SERVICE_CARDS[3]];
  return (
    <>
      <SectionHeading id="services-heading" text="Our services" />

      {/* 
        1. Changed to grid-cols-2 universally so columns sit side-by-side on mobile.
        2. Added tight horizontal gaps on mobile (gap-x-4) to save breathing room.
      */}
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 lg:gap-x-24">
        
        {/* Left Column */}
        <div className="grid gap-6 md:gap-16 lg:gap-24">
          {/* Scaled text-2xl down to text-lg on mobile so it doesn't crowd the column */}
          <p className="max-w-[500px] text-lg leading-tight tracking-apple-body md:text-2xl lg:text-[1.625rem]">
            From motion design to AI-powered products — we design and build
            interfaces for the future.
          </p>
          {left.map((card, i) => (
            <RevealUp key={card.key} delay={i * 100}>
              <ServiceCard card={card} />
            </RevealUp>
          ))}
        </div>

        {/* Right Column */}
        {/* Trimmed the mobile top-margin (mt-6) and vertical gaps (gap-6) to match the layout scale */}
        <div className="mt-6 grid gap-6 md:mt-20 md:gap-16 lg:gap-24">
          {right.map((card, i) => (
            <RevealUp key={card.key} delay={i * 100}>
              <ServiceCard card={card} />
            </RevealUp>
          ))}
        </div>
        
      </div>

      <SectionCta href="/services" label="View all services" variant="ink" />
    </>
  );
}