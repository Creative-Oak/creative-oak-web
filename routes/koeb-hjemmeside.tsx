import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import {
  ConnectedIcon,
  DesignIcon,
  SearchIcon,
} from "../components/icons/Icons.tsx";

import PortfolioSection from "../components/sections/ContentSections/PortfolioSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import ProgressBarSection from "../components/sections/UtiliySections/ProgressBarSection.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { ProjectCardData } from "../types/projectCardData.ts";
import { client } from "../utils/sanity.ts";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import TestemonialSection from "../components/sections/UtiliySections/TestemonialSection.tsx";
import Testemonial from "../types/Testemonials.ts";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";

export const handler: Handlers<
  { projects: ProjectCardData[]; testimonials: Testemonial[] }
> = {
  async GET(_, ctx) {
    const projectQuery = `
      *[_type == "project"] | order(isFeatured desc, releaseDate desc)[0...3] {
        title,
        "featuredImage": featuredImage,
        projectShortDescription,
        "slug": slug.current,
        "categories": categories[]->title
      }
    `;

    const testimonialQuery = `
    *[_type == "testemonnial"] | order(name asc)[0...3] {
      name,
      title,
      content,
      image,
      image_alt
    }
    `;

    try {
      const projects = await client.fetch(projectQuery);
      const testimonials = await client.fetch(testimonialQuery);

      return ctx.render({ projects, testimonials });
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const Website = (
  { data }: PageProps<
    { projects: ProjectCardData[]; testimonials: Testemonial[] }
  >,
) => {
  const { projects, testimonials } = data;

  const faq = [
    {
      question: "Hvad er Lorem Ipsum?",
      answer:
        "Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte til brug i sit bogtrykkeri.",
    },
    {
      question: "Hvad er Lorem Ipsum?",
      answer:
        "Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte til brug i sit bogtrykkeri.",
    },
    {
      question: "Hvad er Lorem Ipsum?",
      answer:
        "Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte til brug i sit bogtrykkeri.",
    },
    {
      question: "Hvad er Lorem Ipsum?",
      answer:
        'Lorem Ipsum er ganske enkelt fyldtekst fra <a href="#" class="text-blue-600 hover:underline">print- og typografiindustrien</a>. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte til brug i sit bogtrykkeri.',
    },
  ];

  return (
    <>
      <Head>
        <title>Køb hjemmeside</title>
      </Head>

      <HeroSection2
        title="Køb hjemmeside med bæredygtigt fokus"
        buttonLink="/hjemmeside-priser"
        buttonText="Se priser"
        description="Vi er specialister i at udvikle moderne og miljøbevidste hjemmesider. Køb hjemmeside hos os, og få en løsning, der kombinerer topmoderne webteknologi med stærk performance, så din virksomhed kan vækste digitalt. <br/><br/> Vores priser starter fra <b>12.500,-</b>"
        button2Link="blog/baeredygtig-hjemmeside"
        button2Text="Læs mere om bæredygtig webdesign"
      />
      <Splitter />
      <ContentSection3
        title="Køb hjemmeside hos os og få skræddersyede løsninger, der både fungerer og ser godt ud"
        description="Når vi udvikler din nye hjemmeside, sørger vi for at have fokus på de vigtigste elementer, så du får en løsning, der er både funktionel, brugervenlig og visuelt tiltalende."
        elements={[
          {
            type: "list",
            icon: <DesignIcon />,
            title: "Design",
            content: [
              "Kreative designløsninger, der bringer din vision til live",
              "Du kan selv opdaterer indholdet på din side",
              "Bæredygtigt design",
              "Responsivt design, så din side fungerer på alle enheder",
              "Brugervenlige navigationsstrukturer",
            ],
          },
          {
            type: "list",
            icon: <SearchIcon />,
            title: "SEO",
            content: [
              "Teknisk SEO-optimering fra bunden",
              "Mulighed for optimering af både on-page og off-page SEO",
              "Konkrete strategier tilpasset dine behov",
            ],
          },
          {
            type: "list",
            icon: <ConnectedIcon />,
            title: "Forbundet",
            content: [
              "Integration med eksisterende IT- og CRM-systemer.",
              "Mulighed for at forbinde hjemmesiden til sociale medier.",
              "Hjemmesider, der er skræddersyet til at arbejde sammen med dine nuværende systemer.",
            ],
          },
        ]}
      />
      <Splitter />
      <ContentSection
        description={
          <>
            I en tid, hvor klimaforandringer er en af vores største
            udfordringer, spiller internettet en overraskende stor rolle. Vidste
            du, at internettets samlede CO2-aftryk overstiger
            luftfartsindustriens? Hver gang en bruger besøger en hjemmeside,
            bruges der energi til dataoverførsel, serverkapacitet og enhedens
            strømforbrug.
            <br />
            <br />
            Når du vælger at købe hjemmeside hos os, får du en løsning, der ikke
            kun er topmoderne og effektiv, men også miljøvenlig. Vi hjælper dig
            med at reducere din hjemmesides CO2-aftryk, så du kan tage del i en
            grønnere digital fremtid. <br />
            <br />
            Læs mere om emnet{" "}
            <a href="#">her</a>, ellers så lad os tage en snak!
            <br />
            <br />
            Så finder vi en grøn løsning til jer.
          </>
        }
        imageUrl="/images/wireframe+code.avif"
        teaser="Køb hjemmeside med bæredygtigt fokus"
        imageAlt="Wireframe og kode"
        rightAlignedText={false}
        extraStyles="bg-brand-blue text-brand-white"
        title="Køb hjemmeside hos os og oplev, hvorfor vi er det rette valg"
      />
      <Splitter />
      <ProgressBarSection />
      <Splitter />
      <PortfolioSection
        projects={projects}
        title="Se et par af vores hjemmeside"
        teaser="Portfolio"
      />
      <Splitter />
      <TestemonialSection testemonial={testimonials} />
      <Splitter />
      <FAQSection
        FAQData={faq}
        description="Få svar på nogle af dine spørgsmål her!"
        title="FAQ"
      />
      <Footer />
    </>
  );
};

export default Website;
