"use client";

import RevealScale from "../shared/RevealScale";
import Container from "../shared/Container";
import LiquidRibbon from "../anim/LiquidRibbon";

// Full-width rounded media block showing the animated liquid ribbon.
export default function VideoShowcase() {
  return (
    <section className="relative z-10">
      <Container width="wide">
        <RevealScale className="relative aspect-[1360/725] block overflow-hidden rounded-media">
          <LiquidRibbon className="absolute inset-0 h-full w-full" />
        </RevealScale>
      </Container>
    </section>
  );
}
