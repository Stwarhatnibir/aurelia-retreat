import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const MIN_TIME = 1800;

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let cancelled = false;

    // Finish only when BOTH the minimum time has passed AND the hero image is ready
    const minTime = new Promise((r) => setTimeout(r, MIN_TIME));
    const heroReady = new Promise((r) => {
      const img = new Image();
      img.onload = img.onerror = r;
      img.src = "/images/hero.webp";
    });
    Promise.all([minTime, heroReady]).then(() => {
      if (!cancelled) onDone();
    });

    // Counter
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / MIN_TIME, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="font-display text-6xl md:text-8xl"
      >
        Aurelia
      </motion.p>
      <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">
        Retreat
      </p>

      <p className="absolute bottom-10 right-6 font-display text-3xl text-cream/60 md:right-10">
        {String(count).padStart(3, "0")}
      </p>

      <div className="absolute inset-x-0 bottom-0 h-px bg-cream/10">
        <div
          style={{ transform: `scaleX(${count / 100})` }}
          className="h-full origin-left bg-gold"
        />
      </div>
    </motion.div>
  );
}
