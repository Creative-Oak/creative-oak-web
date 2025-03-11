import Marquee from "../../../islands/Marquee/Marquee.tsx";
import { Logo } from "../../../types/Logo.ts";

interface MarqueeSectionProps {
  data: {
    logos: Logo[];
    duration?: number;
    pauseOnHover?: boolean;
    title?: string;
    backgroundColor?: string;
  };
}

export default function MarqueeSection({ data }: MarqueeSectionProps) {
  const { logos, duration, pauseOnHover = true, title, backgroundColor } = data;

  const backgroundColorClass = backgroundColor ? `bg-${backgroundColor}` : "";

  return (
    <section class={`py-4 md:py-12 ${backgroundColorClass}`}>
      <Marquee
        logos={logos}
        duration={duration}
        pauseOnHover={pauseOnHover}
        title={title}
      />
    </section>
  );
}
