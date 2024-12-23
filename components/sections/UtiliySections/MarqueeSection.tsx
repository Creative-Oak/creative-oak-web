import Marquee from "../../../islands/Marquee/Marquee.tsx";

// Example data
const originalLogos = [
  { id: 1, name: "ekolab",    alt: "Ekolab Logo",    src: "/images/hero1.avif" },
  { id: 2, name: "spacon",    alt: "Spacon & X Logo",src: "/images/hero1.avif" },
  { id: 3, name: "retrodam",  alt: "Retrodam Logo",  src: "/images/hero1.avif" },
  { id: 4, name: "solarlab",  alt: "SolarLab Logo",  src: "/images/hero1.avif" },
  { id: 5, name: "greenwave", alt: "Greenwave Logo", src: "/images/hero1.avif" },
  { id: 6, name: "sustainio", alt: "Sustainio Logo", src: "/images/hero1.avif" },
  { id: 7, name: "clearsky",  alt: "Clearsky Logo",  src: "/images/hero1.avif" },
];

export default function MarqueeSection() {
  return (
    <div class="w-full overflow-hidden  py-12">
      <div class="max-w-full">
        <Marquee logos={originalLogos} duration={20} />
      </div>
    </div>
  );
}