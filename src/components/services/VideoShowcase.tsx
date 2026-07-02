import RevealScale from "../shared/RevealScale";
import Container from "../shared/Container";

// Full-width rounded media block showing the looping ribbon gif.
export default function VideoShowcase() {
  return (
    <section className="relative z-10">
      <Container width="wide">
        <RevealScale className="relative aspect-[1360/725] block overflow-hidden rounded-media">
          {/* Placeholder backdrop (visible until a real video is supplied) */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.35), transparent 50%)",
            }}
          />

          <img
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            src="/video/ribbon.gif"
            alt=""
          />
        </RevealScale>
      </Container>
    </section>
  );
}
