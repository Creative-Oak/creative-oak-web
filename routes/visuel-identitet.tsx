import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import { DesignIcon, GlassesIcon } from "../components/icons/Icons.tsx";

const VisualIdentityPage = () => {
  return (
    <>
      <Head>
        <title>Visuel Identitet</title>
        <meta
          name="description"
          content="Visuel Identitet"
        />
      </Head>
      <HeroSection2
        description="Læs hvordan vi kan hjælpe med at skabe en genkendelig og sammenhængende visuel identitet til fordel for dine kunder, der bidrager til at differentiere din virksomhed tværs af dine platforme."
        title="Mangler i ny visuel identitet?"
      />
      <Splitter />
      <ContentSection3
        title="Udarbejdelse af en unik visuel identitet"
        description="I samarbejde med dig identificerer vi de nøgleelementer, der repræsenterer dine kerneværdier og mål, og designer derefter omkring dem. På den måde vil du både kunne spejle dig i jeres visuelle identitet og kan derve dig ud fra dine konkurrenter."
        elements={[
          {
            type: "text",
            icon: <GlassesIcon />,
            title: "Research",
            content:
              "Visuel identitet starter med en grundig research ind i jeres virksomhed - vi vil være sikre på at vi forstår hvem i er, så vi kan lave bedst mulige produkt  ",
          },
          {
            type: "text",
            icon: <DesignIcon />,
            title: "Design",
            content:
              "Dernæst bliver researchen så brugt af os til at skabe en sammenhængende identitet for jer",
          },
        ]}
      />
      <Splitter />
      <CTASection
        buttonLink="/kontakt"
        buttonText="Kontakt os for mere information"
        title="Er i klar til kunstig intelligens?"
        description="Skal I have AI ind i jeres virksomhed eller kunne I bruge et foredrag eller kursus til at strømline jeres virksomhed?"
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default VisualIdentityPage;
