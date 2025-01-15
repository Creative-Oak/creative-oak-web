
import Marquee from "../../../islands/Marquee/Marquee.tsx";
import { Logo } from "../../../types/Logo.ts";



export default function MarqueeSection(
  { data }: { data: { logos: Logo[] } }
) {
  const { logos } = data;
  console.log(data)
  return (
    <section class="py-8 md:py-12">
      <Marquee logos={logos} />
    </section>
  );
}