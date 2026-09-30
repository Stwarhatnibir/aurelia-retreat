import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const links = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow Esc while the menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerStyle = open
    ? "py-5 text-cream"
    : scrolled
      ? "bg-cream/95 py-4 text-ink shadow-sm"
      : "py-7 text-white";

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerStyle}`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#home" className="font-display text-2xl tracking-wide">
            Aurelia
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden border border-current px-5 py-2 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-white md:inline-block"
          >
            Book Now
          </a>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span
              className={`h-px w-7 bg-current transition-transform duration-500 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-7 bg-current transition-transform duration-500 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink text-cream md:hidden"
          >
            {[...links, { label: "Book Now", href: "#contact" }].map(
              (link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3 + i * 0.1, duration: 0.8, ease },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className={`font-display text-5xl ${
                    link.label === "Book Now" ? "text-gold" : ""
                  }`}
                >
                  {link.label}
                </motion.a>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
