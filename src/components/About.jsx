import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { value: "12", label: "Private suites" },
  { value: "4.9", label: "Guest rating" },
  { value: "2,400m", label: "Above sea level" },
];

export default function About() {
  const imageRef = useRef(null);

  // Tracks how far this image has travelled through the screen
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Moves the inner photo slowly as you scroll (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Image with reveal curtain and parallax */}
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease }}
            className="h-full w-full"
          >
            <motion.img
              src="/images/about.webp"
              alt="Interior of Aurelia Retreat"
              style={{ y: imageY, scale: 1.25 }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text */}
        <div>
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
              Our Story
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              A quiet place, <br />
              made with care
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md leading-relaxed text-ink/70">
              Aurelia began as a family home and grew into a small retreat for
              people who want less noise and more meaning. Every suite is
              handcrafted with local wood, stone, and wool. Every morning starts
              slowly.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.4 + i * 0.15} y={20}>
                <p className="font-display text-3xl text-gold md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/60">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
