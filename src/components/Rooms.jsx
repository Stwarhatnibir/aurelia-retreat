import Reveal from "./Reveal";
import RoomCard from "./RoomCard";

const rooms = [
  {
    name: "The Cedar Suite",
    details: "45 m² · King bed · Valley view",
    price: "₹14,500",
    image: "/images/room1.jpg",
  },
  {
    name: "The Stone Loft",
    details: "60 m² · King bed · Private terrace",
    price: "₹19,000",
    image: "/images/room2.jpg",
  },
  {
    name: "The Wool Cabin",
    details: "38 m² · Queen bed · Fireplace",
    price: "₹12,000",
    image: "/images/room3.jpg",
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
                Stay With Us
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Rooms that feel <br />
                like a exhale
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <p className="max-w-sm leading-relaxed text-cream/60">
              Three suites, each with its own character. All include breakfast,
              a private balcony, and a very good night's sleep.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
