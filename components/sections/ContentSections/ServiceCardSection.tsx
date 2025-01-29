import ServiceCard from "../../../islands/ServiceCard/ServiceCard.tsx";

interface Tags {
  title: string
  href: string;
}


const tag1: Tags[] = [
  {
    href: "/koeb-hjemmeside",
    title: "SEO"
  },
  {
    href: "/articles/baeredygtig-hjemmeside",
    title: "Bæredygtigt design"
  },
  {
    href: "/visuel-identitet",
    title: "Visuel identitet"
  },
]
const tag2: Tags[] = [
  {
    href: "/ai-kursus",
    title: "AI Kursus"
  },
  {
    href: "/ai-chatbots",
    title: "Chatbots"
  },
  {
    href: "/ai-kursus",
    title: "Kuntig intelligens"
  },
]


const tag3: Tags[] = [
  {
    href: "/foto-video",
    title: "Foto"
  },
  {
    href: "/foto-video",
    title: "Videoproduktion"
  },
  {
    href: "/grafisk-design",
    title: "Grafisk design"
  },
]

const ServiceCardSection = () => {
  return (
    <section class=" bg-brand-blue">
      <div class="container mx-auto py-12 md:py-36 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard tags={tag1} href="/koeb-hjemmeside" title="Hjemmeside udvikling" />
        <ServiceCard tags={tag2} href="/kunstig-intelligens-og-digital-udvikling" title="AI og digital udvikling" />
        <ServiceCard tags={tag3} href="/content-produktion" title="Digital content produktion" />
      </div>
    </section>
  );
};

export default ServiceCardSection;
