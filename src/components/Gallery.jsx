import { useCallback, useState } from "react";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

const photos = [
  {
    src: "/images/gallery1.webp",
    alt: "Mountain view from the terrace",
    span: "col-span-2 row-span-2",
  },
  { src: "/images/gallery2.webp", alt: "Breakfast on the balcony", span: "" },
  { src: "/images/gallery3.webp", alt: "Evening by the fireplace", span: "" },
  { src: "/images/gallery4.webp", alt: "The spa and pool", span: "col-span-2" },
  {
    src: "/images/gallery5.webp",
    alt: "Handcrafted interior details",
    span: "col-span-2",
  },
  {
    src: "/images/gallery6.webp",
    alt: "The retreat at dusk",
    span: "col-span-2",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      {/* Header */}
      <div className="mb-16 text-center md:mb-24">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
            Gallery
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">
            Moments worth <br className="hidden md:block" />
            slowing down for
          </h2>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 3) * 0.1} className={photo.span}>
            <button
              onClick={() => setActive(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className="group relative block h-full w-full overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-light text-white opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                +
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={active}
        onClose={close}
        onChange={setActive}
      />
    </section>
  );
}
