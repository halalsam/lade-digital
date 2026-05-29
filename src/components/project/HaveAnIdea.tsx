import Link from "next/link";

// Full-bleed dark CTA with a looping background reel. Drop your video at
// /public/assets/footer/ropes.mp4; until then the animated gradient stands in.
export default function HaveAnIdea() {
  return (
    <section className="relative grid min-h-[700px] place-items-center overflow-hidden bg-ink text-center text-paper md:min-h-[866px]">
      {/* Background media + placeholder */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-[idea-pan_18s_ease-in-out_infinite] bg-[length:200%_200%]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #2a2a2a, transparent 40%), radial-gradient(circle at 80% 70%, #1a1a1a, transparent 45%), linear-gradient(135deg, #000, #111)",
          }}
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/footer/ropes.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        <h2 className="text-6xl font-light leading-none tracking-tight md:text-8xl lg:text-[7.5rem]">
          Have
          <br />
          an idea?
        </h2>
        <div className="mt-8">
          <Link
            href="/contacts"
            className="group relative inline-block overflow-hidden rounded-full border border-paper px-12 py-5 text-4xl font-light uppercase tracking-tight transition-transform hover:-translate-y-1 md:px-16 md:py-6 md:text-6xl"
          >
            <span className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 rounded-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.4,0,0,1)] group-hover:scale-y-100" />
            <span className="relative z-10 block transition-colors duration-300 group-hover:text-ink">
              Tell us
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
