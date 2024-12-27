import ServiceCard from "../../../islands/ServiceCard/ServiceCard.tsx";

const ServiceCardSection = () => {
  return (
    <section class=" bg-brand-blue">
      <div class="container mx-auto px-4 py-36 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard tags={["SEO", "Bæredygtigt design", "Visuel identitet"]} href="/koeb-hjemmeside" title="Hjemmeside udvikling" />
        <ServiceCard tags={["AI Kursus", "Chatbots", "Kuntig intelligens"]} href="#" title="AI og digital udvikling" />
        <ServiceCard tags={["Videoproduktion", "Foto", "Grafisk design"]} href="#" title="Digitalt indhold" />
      </div>
    </section>
  );
};

export default ServiceCardSection;
