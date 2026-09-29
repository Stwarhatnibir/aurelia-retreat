import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({ photos, index, onClose, onChange }) {
  const open = index !== null;
  const total = photos.length;

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, total, onClose, onChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6 md:p-16"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-6 top-6 text-xs uppercase tracking-[0.3em] text-cream/70 transition-colors hover:text-gold md:right-10 md:top-8"
          >
            Close ✕
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + total) % total);
            }}
            aria-label="Previous photo"
            className="absolute left-4 text-3xl text-cream/70 transition-colors hover:text-gold md:left-10"
          >
            ←
          </button>

          {/* Image */}
          <motion.img
            key={index}
            src={photos[index].src}
            alt={photos[index].alt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % total);
            }}
            aria-label="Next photo"
            className="absolute right-4 text-3xl text-cream/70 transition-colors hover:text-gold md:right-10"
          >
            →
          </button>

          {/* Counter */}
          <p className="absolute bottom-6 text-xs tracking-[0.3em] text-cream/60">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
