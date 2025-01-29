import { PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import PricingSection from "../components/sections/UtiliySections/PricingSection.tsx";

const websitePricingData = [
  {
    name: "Den simple",
    price: "12.500 DKK",
    features: [
      "3-4 undersider",
      "Teknisk SEO optimeret (så du kan findes på Google)",
      "Responsivt design (Så den hjemmeside også ser godt ud på din telefon, tablet eller TV)",
   
      <>Bæredygtigt design (Læs evt mere <a class={"text-brand-red underline"} href='/articles/baeredygtig-hjemmeside'>her</a>)</>,
      "Brugervenligt CMS system (Så du selv kan ændre i dit indhold)",
    ],
  },
  {
    name: "Den klassiske",
    price: "22.000 DKK",
    features: [
      "Alt i 'Den simple'",
      "Flere undersider",
      "Højere grad af animation",
      "Komplekse designløsninger",
      "Flere design gennemgange",
      "Webshop understøttelse",
      "10 Timers vedligeholdelse inkluderet*",
    ],
  },
  {
    name: "Den skalerbare",
    price: "22.000+ DKK",
    features: [
      "Alt i 'Den klassiske'",
      "Flere Sprog",
      "Komplekse animationer",
      "Integration med nuværende systemer",
      "Så mange undersider I kan forestille jer",
      "Kursus i SEO",
      <>Tilkoblet AI-Chatbot assistent (Læs evt mere <a class={"text-brand-red underline"} href='/ai-chatbots'>her</a>)</>,
      "Markedsføringsplanlægning",
    ],
  },
];

const WebsitePrices = ({url}: PageProps) => {
  return (
    <>
      <CustomHead
        title="Hjemmeside Priser 2025 | Fra 12.500 kr | Bæredygtig Webudvikling"
        metaDescription="Se vores hjemmeside priser og pakker fra 12.500 kr. Få skræddersyet, bæredygtig webløsning med responsivt design. Vi har priser til alle behov."
        imageUrl={`${url.origin}/images/buywebsite.avif`}
        url={url.href}
      />
      <div>
        <HeroSection2
          tagLine="Priser"
          title="Hjemmeside Priser"
          description="Vores hjemmeside priser varierer fra projekt til projekt. Uanset om du er til den lille one-pager eller til den helt store integreret hjemmeside.
          Uanset hvad, stræber vi os på, at bygge din hjemmeside så Co2 neutral som muligt."
          buttonText="Få et tilbud!"
          buttonLink="/kontakt"
          button2Text="Læs mere om bæredygtige hjemmesider"
          button2Link="/blog/baeredygtige-hjemmesider"
        />
        <Splitter />
        <PricingSection
          title="Hvad koster det at få bygget din hjemmeside priser i dag?"
          priceColumns={websitePricingData}
          footnote={
            <>
              Alle priser er ex moms.
              <br />
              * Dette gælder den første måned efter lancering af hjemmesiden.
            </>
          }
          description={
            <div class="max-w-3xl">
              "Hvad koster en hjemmeside?" spørger du nervøst, mens du holder
              fast i din tegnebog.
              <br />
              <br />
              Tja, det er lidt som at spørge "Hvad koster en bil?" - det kommer
              jo an på, om du vil have en folkevogn eller en Ferrari!
              <br />
              <br />
              Vi kan nemlig bygge alt fra den lille hyggelige one-pager (tænk
              cykel med støttehjul) til den fuldt udstyrede e-handelsplatform
              (tænk rumraket med cup-holders).
              <br />
              <br />
              Prisen afhænger af, hvor mange digitale klokker og fløjter du
              drømmer om, hvor meget SEO-magi du har brug for, og om din
              hjemmeside skal snakke med andre IT-systemer (lidt som et digitalt
              cocktailparty).
            </div>
          }
        />
        <Splitter />
        <ContentSection
          description={
            <>
              Når vi prissætter en hjemmeside, er der en række faktorer, der
              spiller ind. hvilket gør det svært at ramme den præcise pris! Det
              kan være spørgsmål som:
              <br />
              <br />
              <ul class="list-disc pl-6">
                <li class="my-2">
                  Hvor mange unikke sider skal vi lave til dig?
                </li>
                <li class="my-2">
                  Har du allerede et design, eller skal vi lave et for dig?
                </li>
                <li class="my-2">
                  Hvor stor en rolle spiller SEO (søgemaskineoptimering)?
                </li>
                <li class="my-2">
                  Ønsker du en meget kompleks løsning, eller noget mere ligetil
                  som en 1-pager?
                </li>
                <li class="my-2">
                  Skal din nye hjemmeside integreres med et nuværende IT-system?
                </li>
                <li class="my-2">
                  Ønsker du video- og fotoproduktion?
                </li>
              </ul>

              <br />
              Kort sagt, der er mange variabler, når man prissætter en
              hjemmeside. Vi har erfaring med at udvikle sider til alt mellem
              5.000,- og 50.000,-, så vi har helt sikkert også en løsning til
              det prisleje, du ønsker.

              <br />
              <br />
              Som et lille bureau forstår vi, hvor vigtigt det er at være
              konkurrencedygtige, så du kan være sikker på, at vi finder den
              helt rigtige pris til dig!
            </>
          }
          imageUrl="/images/buywebsite.avif"
          teaser="Køb hjemmeside med bæredygtigt fokus"
          imageAlt="Wireframe og kode"
          rightAlignedText={false}
          extraStyles="bg-brand-blue text-brand-white"
          title="Hvorfor 'standard' hjemmeside priser er svær"
        />
        <Splitter />
        <CTASection
          title="Skal vi udvikle din hjemmeside?"
          description="Så kan du kontakte os her - Så prøver vi at finde den bedst mulige løsning for dig og din virksomhed."
          buttonText="Skriv og få et tilbud"
          buttonLink="/kontakt"
       />
       <Splitter />
       <Footer />
      </div>
    </>
  );
};

export default WebsitePrices;
