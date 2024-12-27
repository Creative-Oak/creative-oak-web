import ListElement from "../../other/List.tsx";
import { ConnectedIcon, DesignIcon, SearchIcon } from "../../icons/Icons.tsx";
const ContentSection3 = () => {
  return (
    <section class="py-24 bg-brand-yellow">
    <div class="container max-w-5xl flex items-center justify-center">
      <div class="bg-brand-white border-2 border-brand-black shadow-custom-black p-8">
        <div class="text-center my-8">
        <h2 class="text-4xl max-w-5xl mx-auto font-bold font-lexend mb-4">
          Køb hjemmeside hos os og få skræddersyede løsninger, der både fungerer og ser godt ud
        </h2>
        <p class="max-w-2xl text-pretty mx-auto mb-8">
          Når vi udvikler din nye hjemmeside, sørger vi for at have fokus på de vigtigste elementer, så du får en løsning, der er både funktionel, brugervenlig og visuelt tiltalende.
        </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <ListElement
            icon={<DesignIcon />}
            list={[
              "Kreative designløsninger, der bringer din vision til live",
              "Du kan selv opdaterer indholdet på din side",
              "Bæredygtigt design",
              "Responsivt design, så din side fungerer på alle enheder",
              "Brugervenlige navigationsstrukturer",
            ]}
            title="Design"
          />
          <ListElement
            icon={<SearchIcon />}
            list={[
              "Teknisk SEO-optimering fra bunden",
              "Mulighed for optimering af både on-page og off-page SEO",
              "Konkrete strategier tilpasset dine behov",
            ]}
            title="SEO"
          />
          <ListElement
            icon={<ConnectedIcon />}
            list={[
              "Integration med eksisterende IT- og CRM-systemer.",
              "Mulighed for at forbinde hjemmesiden til sociale medier.",
              "Hjemmesider, der er skræddersyet til at arbejde sammen med dine nuværende systemer.",
            ]}
            title="Forbundet"
          />
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default ContentSection3;
