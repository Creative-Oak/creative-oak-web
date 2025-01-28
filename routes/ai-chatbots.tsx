
import { PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import ContentSection2 from "../components/sections/ContentSections/ContentSection2.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import PricingSection from "../components/sections/UtiliySections/PricingSection.tsx";

const Chatbots = ({url}: PageProps) => {
  const pricingData = [
    {
      name: "Den billige",
      price: "995 DKK",
      features: [
        "800 spørgsmål + svar*",
        "Flere Sprog",
        "Scraper jeres hjemmeside for information",
      ],
    },
    {
      name: "Den klassiske",
      price: "1.500 DKK",
      features: [
        "1600 spørgsmål og svar*",
        "Flere Sprog",
        "Scraper jeres hjemmeside for information",
        "Indblik i brugen af jeres chatbot",
      ],
    },
    {
      name: "Den bedste",
      price: "2.500 DKK",
      features: [
        "3000 spørgsmål og svar*",
        "Flere Sprog",
        "Scraper jeres hjemmeside for information",
        "Indblik i brugen af jeres chatbot",
        "Integration med nuværende systemer",
      ],
    },
    {
      name: "Den skalerbare",
      price: "2.500+ DKK",
      features: [
        "Uendelig antal spørgsmål og svar*",
        "Flere Sprog",
        "Scraper jeres hjemmeside for information",
        "Indblik i brugen af jeres chatbot",
        "Integration med nuværende systemer",
        "Kan specialbygges ud til at gøre præcis hvad I lyster",
      ],
    },
  ];

  return (
    <>
      <CustomHead 
        title="AI Chatbots | Intelligent Kundeservice fra 995 kr/md | Creative Oak"
        metaDescription="Få en skræddersyet AI chatbot der arbejder 24/7 for din virksomhed. Flersproget support og intelligent kundeservice. Priser fra 995 kr/md."
        imageUrl={`${url.origin}/images/robot.avif`}
        url={url.href}
      />
      <div>
        <HeroSection2
          title="AI Chatbots"
          description={"Integrér en AI chatbot på din hjemmeside eller til internt brug med os. Vi designer chatbots med udgangspunkt i dine behov og værdier, og vi lægger vægt på et tæt samarbejde for at sikre, at din chatbot skiller sig ud og skaber værdi."}
          tagLine="Chatbots til enhver brug"
        />
        <Splitter />
        <ContentSection
          teaser="Process"
          description={
            <p>
              Vi forstår, at vellykket AI chatbots ikke kun handler om
              teknologi, men også om at forstå din virksomheds DNA og dine
              kunders behov.
              <br />
              Derfor prioriterer vi tæt samarbejde og dybdegående forståelse af
              jeres vision og mål. Vi tror på, at den bedste chatbot løsning
              opstår, når vores ekspertise møder din virksomheds indsigt og
              kreative sind.
            </p>
          }
          title="Udarbejdelse af en AI chatbot"
          imageUrl="/images/robot.avif"
          box1={
            <span class="text-left">
              <h3 class="font-bold">Research</h3>
              <p>
                I samarbejde med jer, finder vi ud af hvilke kapabiliteter jeres
                AI chatbot skal have, så vi kan sikre den virker for lige netop
                jeres case
              </p>
            </span>
          }
          box2={
            <span class="text-left">
              <h3 class="font-bold">Design</h3>
              <p>
                Man skal have lyst til at trykke og skrive med en AI chatbot -
                derfor sikrer vi selvfølgelig at den er i overensstemmelse med
                jeres unikke design og identitet.
              </p>
            </span>
          }
        />
        <Splitter />
        <PricingSection
          priceColumns={pricingData}
          footnote={
            <p>
              Alle priser er per måned, og vi har 2 måneders opsigelse på all
              løsninger. ‍ <br />
              <br />
              *Dette kan varierer i forhold til use-casen - kontakt os og vi
              skal forklare.
            </p>
          }
          title="Pris overblik"
          description={<>"Find den perferkte løsning, der passer til dine behov."</>}
        />
        <Splitter />
        <ContentSection2
          title="Kom godt i gang!"
          text={[{
            header: "Funktion",
            txt:
              "Snakker vi om en simpel løsning, der blot kender til jeres virksomhed og kan informere om jer, eller snakker vi om mere komplekse løsninger, der skal kunne flere ting - eksempelvis sende mails, oprette kundeoplysninger, opdatere jeres interne systemer? Vi er klar på det hele.",
          }, {
            header: "Design",
            txt:
              "Det er afgørende, at din chatbot integreres sømløst på din hjemmeside uden at virke fremmed eller bryde med din visuelle identitet. Vi sørger for, at din chatbot harmonerer perfekt med dit design og dine nuværende løsninger. Vi arbejder hårdt for at den bliver en naturlig forlængelse af dit brand og din online tilstedeværelse.",
          }, {
            header: "Integration",
            txt:
              "Vi sørger for at din chatbot kan integreres med dine nuværende systemer, så du kan få mest muligt ud af din investering. Vi kan hjælpe med at integrere din chatbot med CRM-systemer, e-mail marketing værktøjer, sociale medier og meget mere.",
          }]}
        />
        <Splitter />
        <CTASection
          title="Er jeres kundeservice klar til en digital makeover?"
          buttonText="Lad os snakke om din nye digitale kollega!"
          buttonLink="/kontakt"
          description="Tænk dig at have en digital assistent der arbejder 24/7, aldrig bliver træt og faktisk kan lide at svare på de samme spørgsmål igen og igen!  Det er lige hvad vi kan bygge til jer."
        />
        <Splitter />
        <Footer />
      </div>
    </>
  );
};

export default Chatbots;
