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
      question: "Kan jeg modtage et tilbud?",
      answer:
        <p>Ja, selvfølgelig kan du det! Smid os en besked, og så får vi hurtigt strikket et tilbud sammen til dig. Vi har brug for lidt information om, hvad du ønsker og forventer, men det kan vi aftale over en virtuel kop kaffe eller mail."</p>,
    },
    {
      question: "Hvad er prisen for en bæredygtig hjemmeside?",
      answer: <>
      <p>
          Når vi prissætter en hjemmeside, er der en række faktorer, der spiller ind:
      </p>
      
      <ul>
          <li>Hvor mange unikke sider skal vi lave til dig?</li>
          <li>Har du allerede et design, eller skal vi lave et for dig?</li>
          <li>Hvor stor en rolle spiller SEO (søgemaskineoptimering)?</li>
          <li>Skal din nye hjemmeside integreres med et nuværende IT-system?</li>
          <li>Ønsker du en meget kompleks løsning, eller noget mere ligetil som en 1-pager?</li>
          <li>Skal vi give os i kast med at udvikle nogle sjove og spændende animationer, man kan interagere med?</li>
          <li>Ønsker du video- og fotoproduktion?</li>
      </ul>
  
      <p>
          Kort sagt, der er mange variabler, når man prissætter en hjemmeside. Vi har erfaring med at udvikle sider til alt mellem 5.000,- og 50.000,-, så vi har helt sikkert også en løsning til det prisleje, du ønsker.
      </p>
  
      <p>
          Som et lille bureau forstår vi, hvor vigtigt det er at være konkurrencedygtige, så du kan være sikker på, at vi finder den helt rigtige pris til dig! Vi har lavet et lille overblik over hvad en hjemmeside kunne koste for dig. 
          
      </p>
      <a href="/hjemmeside-priser"> Læs mere her</a>
  </>
    },
    {
      question: "Koster en bæredygtig hjemmeside mere end en almindelig?",
      answer: <>
      <p>
          Nej! I udviklingsfasen skal man blot sikre sig, at man gør tingene rigtigt – det skal vi nok sørge for! En væsentlig del af at skabe en hjemmeside handler også om at overveje, hvilke elementer der er nødvendige, og hvordan de kan optimeres for at forbedre ydeevnen og reducere ressourcetrækket. <a href="/articles/baeredygtig-hjemmeside">Læs eventuelt vores artikel om emnet her</a>
      </p>
  
      <p>
          Ved at fokusere på effektiv kodning, optimerede billeder og minimere brugen af tunge scripts og plugins, kan vi faktisk reducere både udviklings- og driftsomkostningerne. En bæredygtig hjemmeside er ikke kun bedre for miljøet, men giver også en hurtigere og mere responsiv brugeroplevelse, hvilket kan føre til højere kundetilfredshed og konverteringsrater.
      </p>
  
      <p>
          Desuden kan en mere effektiv hjemmeside reducere hostingomkostninger, da den kræver mindre båndbredde og lagerplads. Så i stedet for at koste mere, kan en bæredygtig hjemmeside faktisk spare dig penge på lang sigt.
      </p>
  </>
    },
    {
      question: "Tilbyder i vedligeholdelse af bæredygtige hjemmesider?",
      answer: 
      <>
        <p>
        Vi kan sagtens stå for vedligeholdelse og opdatering af dit indhold, hvis det er dit behov. Vi er dog ikke interesserede i, at du skal stå med en følelse af, at du smider penge ned i et hul uden at vide, hvad du får for det. Derfor insisterer vi høfligt på, at vi løbende må opdatere dig om vores arbejde for dig.
        </p>
      </>
    },
    {
      question: "Kan i hjælpe med SEO?",
      answer: 
      <>
        <p>
          Ja! Vi tilbyder to forskellige løsninger. Vi kan enten sætte det hele op for dig, så du selv kan opdatere din SEO med hjælp og rådgivning fra os. Alternativt kan vi stå for det hele. Det er helt op til dig, hvilken løsning der passer dig bedst!
        </p>
      </>
    },
    {
      question: "Kan i hjælpe med video og foto?",
      answer: 
      <>
        <p>
        Ja - Vi kan sagtens hjælpe jer med video- og fotoproduktion. Vi har godt gear, og gode kundskaber til at få jeres side til at stå knivskarpt - læs evt mere <a href="/">her</a>
        </p>
      </>
    },
    {
      question: "Kan jeg selv opdaterer indeholdet på min egen side?",
      answer: 
      <>
        <p>

Selvfølgelig! Vi er ikke de eneste, der skal have nøglen til dit kongerige. Alt efter hvordan vi udvikler din side, bliver det gjort på forskellige måder. Her anbefaler vi at udvikle i Webflow, for så har du fuld kontrol over din egen side.
     </p>
      </>
    },
    {
      question: "Hvor hurtigt kan i lave en hjemmeside?",
      answer: 
      <>
        <p>
        Hvis der skal være lidt fart på, kan vi godt reagere hurtigt. En simpel side kan være klar til dig på et par dage. Er den mere kompleks, kan vi have den klar på en uge.
        Send os en besked, så finder vi et hul i kalenderen til dig!
        </p>
      </>
    }
   
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
          <span class="text-brand-white">
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
            <a href="/articles/baeredygtig-hjemmeside">her</a>, ellers så lad os tage en snak!
            <br />
            <br />
            Så finder vi en grøn løsning til jer.
          </span>
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
        title="Se et par af vores hjemmesider"
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
