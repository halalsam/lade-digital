import RevealScale from "../shared/RevealScale";

// Full-width rounded media block. Drop your looping reel at
// /public/assets/services/main.mp4 and it will play automatically; until then
// the gradient + grain placeholder keeps the layout intentional, not broken.
export default function VideoShowcase() {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-[7.5rem]">
        <RevealScale className="relative aspect-[1360/725] block overflow-hidden rounded-[20px]">
          {/* Placeholder backdrop (visible until a real video is supplied) */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.35), transparent 50%)",
            }}
          />

          <video
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster=""
          >
            <source src="/assets/services/main.mp4" type="video/mp4" />
          </video>
        </RevealScale>
      </div>
    </section>
  );
}
