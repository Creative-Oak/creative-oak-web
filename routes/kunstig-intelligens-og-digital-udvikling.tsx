import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";

import ContentSection4 from "../components/sections/ContentSections/ContentSection4.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

const AiDigitalPage = () => {
  return (
    <>
      <Head>
        <title>Kunstig intelligens og digital udvikling</title>
        <meta
          name="description"
          content="Kunstig intelligens og digital udvikling"
        />
      </Head>
      <HeroSection2
        description="Vi har mange års erfaring med udvikling og integration af kunstig intelligens hos virksomheder. Læs mere om hvordan kunstig intelligens kan blive en større del af din hverdag, og lær hvordan du ansvarligt kan integrerer det i dit arbejde."
        title="Kunstig intelligens og digital udvikling"
      />
      <Splitter />
      <ContentSection4 />
      <Splitter />
      <ContentSection
        extraStyles="bg-brand-blue text-brand-white"
        imageAlt="Farverig illustration af en robot omgivet af mekaniske dele og teknologi, der repræsenterer kunstig intelligens i et kreativt og futuristisk design."
        imageUrl="/images/robot.avif"
        description={
          <>
            <p class="text-base leading-6 mb-4">
              Kunstig intelligens (AI) er en teknologi, der gør det muligt for
              computere og systemer at udføre opgaver, som normalt kræver
              menneskelig intelligens. Det inkluderer ting som at lære af data,
              genkende mønstre, træffe beslutninger og kommunikere med mennesker
              på en naturlig måde.
            </p>
            <br />
            <strong class="font-bold text-lg block mb-2">
              Typer af Kunstig Intelligens
            </strong>
            <p class="text-base leading-6 mb-4">
              Der findes flere forskellige typer af AI, som bruges til
              forskellige formål:
            </p>

            <ul class="list-none pl-0 mt-4 space-y-4">
              <li class="relative pl-6">
                <span class="absolute left-0 text-lg font-bold">•</span>
                <strong class="font-semibold text-base block mb-1">
                  Maskinlæring
                </strong>
                <p class="text-base leading-6">
                  Maskinlæring gør det muligt for computere at lære og forbedre
                  sig uden at være specifikt programmeret. For eksempel kan en
                  algoritme analysere store mængder data for at finde mønstre og
                  træffe bedre beslutninger over tid.
                </p>
              </li>
              <li class="relative pl-6">
                <span class="absolute left-0 text-lg font-bold">•</span>
                <strong class="font-semibold text-base block mb-1">
                  Naturlig sprogbehandling (NLP)
                </strong>
                <p class="text-base leading-6">
                  NLP gør det muligt for AI at forstå og kommunikere på
                  menneskesprog. Det bruges i alt fra AI-chatbots til
                  stemmeassistenter som Siri og Alexa.
                </p>
              </li>
              <li class="relative pl-6">
                <span class="absolute left-0 text-lg font-bold">•</span>
                <strong class="font-semibold text-base block mb-1">
                  Computer vision
                </strong>
                <p class="text-base leading-6">
                  Computer vision giver AI mulighed for at "se" og analysere
                  billeder eller videoer. For eksempel bruges det i
                  ansigtsgenkendelse, kvalitetskontrol i produktion og
                  selvkørende biler.
                </p>
              </li>
            </ul>
          </>
        }
        title="Hvad er kunstig intelligens?"
      />
      <Splitter/>
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

export default AiDigitalPage;