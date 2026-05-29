import PillButton from "../shared/PillButton";

// Two-up summary: looping media on the left, studio blurb + CTA on the right.
// Media placeholder lives at /public/assets/home/summary.mp4.
export default function AboutSummary() {
  return (
    <section className="relative pt-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1">
            <div className="relative aspect-[100/100] w-full overflow-hidden rounded-[20px] md:h-[500px]">
              <div className="absolute inset-0 animate-[idea-pan_20s_ease-in-out_infinite] bg-[length:200%_200%] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400" />
              <video
                className="absolute inset-0 h-full w-full scale-[1.005] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/assets/home/summary.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex-1">
            <div className="max-w-[500px] space-y-6 text-2xl leading-snug tracking-[0.02em]">
              <p>
                Since 2010, we have been helping our clients find exceptional
                solutions for their businesses, creating memorable websites and
                digital products.
              </p>
              <p>
                We don’t do cookie-cutter solutions — we build products exactly
                as they were during the design phase, no shortcuts or
                simplifications.
              </p>
            </div>
            <div className="mt-10">
              <PillButton href="/services" label="What we do" variant="ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
