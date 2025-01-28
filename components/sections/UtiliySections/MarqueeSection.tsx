
import Marquee from "../../../islands/Marquee/Marquee.tsx";
import { Logo } from "../../../types/Logo.ts";


interface MarqueeSectionProps {
  data: {
    logos: Logo[];
    duration?: number;
    pauseOnHover?: boolean;
  };
}

export default function MarqueeSection({ data }: MarqueeSectionProps) {
  const { logos, duration, pauseOnHover = true } = data;
  
  return (
    <section class="py-4 md:py-12">
      <Marquee 
        logos={logos} 
        duration={duration}
        pauseOnHover={pauseOnHover}
      />
    </section>
  );
}
