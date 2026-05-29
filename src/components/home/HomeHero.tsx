import RevealText from "../shared/RevealText";

export default function HomeHero() {
  return (
    <section className="relative px-6 pb-28 pt-48 md:px-12 md:pt-52 lg:px-60">
      <div className="mx-auto w-full max-w-[1600px]">
        <RevealText
          as="h1"
          text="Digital design & development agency"
          className="display-xl mx-auto block max-w-5xl text-center"
          delay={0.05}
          stagger={0.07}
        />
        <RevealText
          as="p"
          text="We help companies build scalable digital products with thoughtful design systems and carefully crafted development."
          className="mx-auto mt-12 block max-w-[840px] text-center text-2xl leading-tight tracking-[0.02em]"
          delay={0.3}
          stagger={0.025}
        />
      </div>
    </section>
  );
}
