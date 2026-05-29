import RevealText from "../shared/RevealText";

export default function ProjectsHero() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
      <RevealText
        as="h1"
        text="Our projects"
        className="display-xl mx-auto block text-center"
        delay={0.05}
        stagger={0.08}
      />
      <RevealText
        as="p"
        text="We help bring ideas to life and create digital products that work."
        className="mx-auto mt-12 block max-w-[840px] text-center text-2xl leading-tight tracking-[0.02em]"
        delay={0.25}
        stagger={0.03}
      />
    </div>
  );
}
