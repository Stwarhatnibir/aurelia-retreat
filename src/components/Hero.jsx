import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, delayChildren: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden bg-ink"
    >
      {/* Background image with slow zoom-out */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.webp')" }}
      />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-sand"
        >
          A Boutique Mountain Retreat
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl leading-tight md:text-8xl"
        >
          Where stillness <br className="hidden md:block" />
          becomes luxury
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base text-white/80 md:text-lg"
        >
          Handcrafted suites, quiet mornings, and views that slow time down.
        </motion.p>

        <motion.a
          variants={item}
          href="#rooms"
          className="mt-12 border border-white/70 px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:border-gold hover:bg-gold"
        >
          Explore Rooms
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-px bg-white/70"
        />
      </motion.div>
    </section>
  );
}
