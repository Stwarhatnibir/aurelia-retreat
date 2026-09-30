import Reveal from "./Reveal";

const links = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-4xl">Aurelia Retreat</p>
              <p className="mt-3 text-sm text-cream/50">
                Where stillness becomes luxury.
              </p>
            </div>

            <ul className="flex flex-wrap gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-xs uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-xs text-cream/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Aurelia Retreat. All rights reserved.
          </p>
          <p>Designed and built by Sumanta kumar das</p>
        </div>
      </div>
    </footer>
  );
}
