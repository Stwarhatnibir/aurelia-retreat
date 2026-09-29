import Reveal from "./Reveal";

export default function RoomCard({ room, index }) {
  return (
    <Reveal delay={index * 0.15} className={index === 1 ? "md:mt-16" : ""}>
      <article className="group cursor-pointer">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

          <p className="absolute bottom-6 left-6 translate-y-4 text-xs uppercase tracking-[0.25em] text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            View suite →
          </p>
        </div>

        {/* Text area */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl md:text-3xl">{room.name}</h3>
            <p className="mt-2 text-sm text-cream/60">{room.details}</p>
          </div>

          <div className="text-right">
            <p className="font-display text-2xl text-gold">{room.price}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
              per night
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
