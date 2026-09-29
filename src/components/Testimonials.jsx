import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    quote:
      "We arrived tired and left completely rested. The silence, the food, the light in the morning. Nothing felt rushed.",
    name: "Ananya & Rohan",
    from: "Kolkata",
  },
  {
    quote:
      "The Stone Loft terrace is the best place I have ever had a cup of tea. The staff remembered every small thing we mentioned.",
    name: "Meera Sharma",
    from: "Delhi",
  },
  {
    quote:
      "Quietly luxurious. No showing off, just excellent design and people who care. We are already planning our return.",
    name: "Daniel Fischer",
    from: "Berlin",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 6 seconds. Restarts whenever the slide changes.
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    );
    return () => clearTimeout(timer);
  }, [index, paused]);

  const current = testimonials[index];

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10 md:py-40">
        <Reveal>
          <p className="mb-10 text-xs uppercase tracking-[0.4em] text-gold">
            Guest Words
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="flex min-h-[320px] flex-col items-center justify-center md:min-h-[280px]"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease }}
              >
                <blockquote className="font-display text-3xl leading-snug md:text-5xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-10 text-xs uppercase tracking-[0.3em] text-ink/60">
                  {current.name} · {current.from}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1}`}
              className="group p-2"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === index
                    ? "w-10 bg-gold"
                    : "w-5 bg-ink/30 group-hover:bg-ink/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
