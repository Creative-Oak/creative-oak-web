import { PageProps } from "$fresh/server.ts";
import Splitter from "../../components/other/splitter.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import CustomHead from "../../components/other/CustomHead.tsx";
import ScrollTriggerImage from "../../islands/ScrollTriggerImage.tsx";

const ComundoPage = ({ url }: PageProps) => {
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  return (
    <>
      <CustomHead
        title="Comundo Project"
        imageUrl="/path/to/default/image.jpg"
        metaDescription="Description of the Comundo project."
        url={currentUrl.toString()}
        ogType="article"
      />

      <section className="bg-brand-blue relative flex flex-col min-h-[80svh] md:min-h-[100svh] justify-center items-center pt-32 pb-12 md:pt-0 md:pb-0">
        <div className="items-center text-center mb-8 md:mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-4 font-lexend">
              Comundo.io
            </h1>
          </div>
        </div>
        {/* Mobile version with static image */}
        <div className="md:hidden w-full flex items-center justify-center">
          <img
            src="/images/portfolio/comundo/Smartphone.webp"
            alt="Comundo Mobile Interface"
            className="max-w-[calc(100%-4rem)] w-full object-contain"
          />
        </div>
        {/* Desktop version with ScrollTriggerImage */}
        <div className="hidden md:block w-full">
          <ScrollTriggerImage
            desktopSrc="/images/portfolio/comundo/Desktop.webp"
            mobileSrc="/images/portfolio/comundo/Smartphone.webp"
            desktopAlt="Comundo Desktop Image"
            mobileAlt="Comundo Smartphone Image"
          />
        </div>
      </section>

      <Splitter />

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-brand-black mb-6 font-lexend">
            Om Comundo
          </h2>
          <p className="text-lg md:text-xl font-poppins text-brand-black ">
            Hos Creative Oak havde vi fornøjelsen af at skabe en moderne og
            brugervenlig weboplevelse for Comundo – en platform, der gør det
            nemt for ejendomsejere og -administratorer at få realtidsdata om
            energiforbrug og CO₂-udledning. Ved at integrere direkte med
            energileverandører, målere og databaser samler Comundo al data ét
            sted, så man kan slippe for manuelle regneark og tidskrævende
            opfølgning på fakturaer.
          </p>
        </div>
      </section>

      <Splitter />

      <section
        className="w-full flex min-h-[80svh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            `url('/images/portfolio/comundo/FullPageSmartphone.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </section>

      <Splitter />

      <section className="bg-brand-blue py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-full">
              <img
                src="/images/portfolio/comundo/comundo-workplace.webp"
                alt="Comundo Workplace"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-white mb-4">
                Udfordring
              </h3>
              <p className="text-lg font-poppins text-brand-white">
                Mange ejendomsvirksomheder bruger unødigt meget tid på at
                indsamle, strukturere og rapportere energidata – især i forhold
                til nye krav om ESG-rapportering (f.eks. CSRD) og
                bygningscertificeringer som DGNB. Comundo ønskede en hjemmeside,
                der hurtigt og tydeligt kunne formidle deres værdiskabende
                løsning og vise, hvordan automatisering af energidata gør
                rapportering både mere præcis og mindre tidskrævende.
              </p>
              <h3 className="text-2xl font-bold text-brand-white mb-4 mt-8">
                Løsning
              </h3>
              <p className="text-lg font-poppins text-brand-white">
                Vi udviklede en intuitiv platform, hvor budskabet om "automatisk
                dataindsamling" står helt skarpt. Fokus var på at vise Comundos
                kernefordele. Hjemmesidens opbygning præsenterer Comundos
                vigtigste funktioner, kundecases og virksomhedsfilosofi –
                herunder deres engagement i at være "verdens bedste
                arbejdsplads" gennem fleksibilitet og en fire-dages arbejdsuge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Splitter />

      <section className="w-full flex justify-center items-center py-16 md:py-64 overflow-hidden h-[600px] md:h-[1000px] bg-[url('/images/portfolio/comundo/comundo-desktop-4.webp')] bg-center bg-no-repeat bg-[length:200%_auto] md:bg-[length:80rem_auto]">
      </section>

      <Splitter />

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-brand-black mb-6 font-lexend">
            Resultat
          </h2>
          <p className="text-lg md:text-xl font-poppins text-brand-black">
            På den nye hjemmeside kan potentielle kunder hurtigt se, hvordan
            Comundo differentierer sig med præcise, live-opdaterede data, der
            letter presset fra manuelle opgaver. Dette portfolio-projekt er et
            eksempel på, hvordan vi hos Creative Oak hjælper virksomheder med at
            skabe digitale løsninger, der kommunikerer klart og effektivt.
            Kontakt os gerne for at høre, hvad vi kan gøre for din forretning.
          </p>
        </div>
      </section>

      <Splitter />

      <CTASection
        buttonLink="/kontakt"
        buttonText="Book et uforpligtende møde"
        description="Det er vi også - på dit projekt! Vi har kaffen klar (og en masse gode idéer i ærmet)."
        title="Er du blevet nysgerrig?"
      />
      <Footer />
    </>
  );
};

export default ComundoPage;
