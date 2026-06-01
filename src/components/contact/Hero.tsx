import RevealText from "../shared/RevealText";
import PillButton from "../shared/PillButton";

export default function Hero() {
  return (
    <section className="relative px-6 pb-28 pt-48 md:px-12 md:pt-52 lg:px-60">
      <div className="mx-auto w-full max-w-[1600px]">
        <RevealText
          as="h1"
          text="Get in touch"
          className="mb-7 block text-center text-xl"
          delay={0.05}
        />
        <RevealText
          as="h2"
          text="Let’s build something beyond what’s possible"
          className="display-xl mx-auto block max-w-5xl text-center"
          delay={0.15}
          stagger={0.08}
        />
        <div className="mt-12 flex justify-center">
          <PillButton
            href="mailto:info@cuberto.com"
            label="Tell us about your project"
            variant="ink"
            size="lg"
            external
          />
        </div>
      </div>
    </section>
  );
}
