
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import { PaletteIcon, BrushIcon } from "../components/icons/Icons.tsx";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";

const GraphicDesignPage = ({url}: PageProps) => {
  return (
    <>
     <CustomHead
      title="Grafisk Design Aarhus | Kreativ Marketing & Design | Creative Oak"
      metaDescription="Professionelt grafisk design i Aarhus der skiller sig ud. Fra marketing materialer til digital design. Vi skaber designs der performer."
      imageUrl={`${url.origin}/images/og/og-logo.jpg`}
      url={url.href}
     />

      <HeroSection2
        description="Lad os forvandle dine idéer til eye-catching design der både ser fantastisk ud og virker efter hensigten. Slut med kedelige PowerPoints og standard-templates - vi skaber grafisk design der får folk til at kigge én gang til."
        title="Mangler dit marketing-materiale det sidste pift?"
      />
      <Splitter />
      <ContentSection3
        title="Sådan giver vi dit brand det visuelle løft"
        description="Vi kombinerer kreativitet med strategisk tankegang og skaber grafisk design der ikke bare ser lækkert ud, men også performer. Her er ingen copy-paste løsninger - kun skræddersyet design der matcher din brand-identitet!"
        elements={[
          {
            type: "text",
            icon: <PaletteIcon />,
            title: "Design med omtanke (og lidt magi)",
            content:
              "Vi dykker ned i din målgruppe, dit brand og dine mål, før vi overhovedet åbner vores design-programmer. For det handler ikke bare om at lave noget pænt - det skal også virke i den virkelige verden.",
          },
          {
            type: "text",
            icon: <BrushIcon />,
            title: "Fra koncept til færdigt design",
            content:
              'Her sker magien! Vi omsætter strategien til visuelle elementer der får dit budskab til at stå knivskarpt. Og vi stopper ikke før du tænker "Præcis sådan havde jeg forestillet mig det... bare bedre!"',
          },
        ]}
      />
      <Splitter />
      <ContentSection
        title="Hvad kan vi hjælpe med?"
        description={
          <>
            "Fra visitkort til storformat-bannere - vi har dig dækket ind. Her er
            hvad vi kan trylle med:"
          </>
        }
        box1={
          <>
            <strong>Marketing materialer</strong>{" "}
            <p>
              Brochurer, flyers, plakater, bannere - you name it! Vi skaber
              trykt materiale der både ser godt ud og holder i lang tid. Plus,
              vi sørger for at alt er klar til tryk i de rigtige formater og
              farver.
            </p>
          </>
        }
        box2={
          <>
            <strong>Digitalt design</strong>{" "}
            <p>
              SoMe-grafik, præsentationer, nyhedsbreve og infografikker der
              skiller sig ud fra mængden. Vi designer til alle digitale
              platforme og sørger for at dit content ser knivskarp ud, uanset
              hvor det bliver vist.
            </p>
          </>
        }
        box3={
          <>
            <strong>Specialprojekter (eller: De vilde idéer)</strong>{" "}
            <p>
              Har du en idé der er lidt ud over det sædvanlige? Perfect! Vi
              elsker at blive udfordret og finder altid en måde at få selv de
              vildeste idéer til at fungere - fra messestand-design til
              custom illustrationer.
            </p>
          </>
        }
      />
      <Splitter />
 
      <CTASection
        buttonLink="/kontakt"
        buttonText="Book en gratis design-snak"
        title="Klar til at få dit marketing-materiale op i gear?"
        description="Lad os tage en uforpligtende snak om, hvordan vi kan hjælpe dig med at skabe grafisk design der både ser fantastisk ud og leverer resultater. Vi har ideerne (og kaffen) klar!"
      />
      <Splitter />
      <FAQSection
        FAQData={[
          {
            question:
              "Kan jeg ikke bare lave det selv i Canva?",
            answer: (
              <>
                Jo, lidt ligesom du også selv kan klippe dit hår - men er det
                en god idé? Professionelt design handler om mere end bare at
                sætte nogle elementer sammen. Det handler om at forstå
                principper, målgruppe og hvordan design påvirker adfærd.
              </>
            ),
          },
          {
            question: "Hvor hurtigt kan I levere?",
            answer: (
              <>
                Det afhænger af projektet - en SoMe-post kan være klar samme
                dag, mens en komplet brandingpakke tager lidt længere. Men vi
                er ærlige omkring deadlines og holder dem (også når det
                brænder på).
              </>
            ),
          },
          {
            question: "Hvad hvis jeg ikke ved præcis hvad jeg vil have?",
            answer: (
              <>
                No problem! Det er faktisk ret normalt. Vi er gode til at
                stille de rigtige spørgsmål og guide dig gennem processen.
                Nogle gange er de bedste resultater dem, hvor kunden starter
                med at sige "Jeg ved ikke helt..."
              </>
            ),
          },
          {
            question: "Er professionelt grafisk design ikke dyrt?",
            answer: (
              <>
                Det koster mere end at lave det selv i Paint, men mindre end
                at miste kunder på uprofessionelt materiale. <br/><br/> Vi er
                transparente omkring priser og finder altid en løsning der
                matcher dit budget - uden at gå på kompromis med kvaliteten.
              </>
            ),
          },
          {
            question: "Kan I arbejde ud fra min eksisterende visuelle identitet?",
            answer: (
              <>
                Selvfølgelig! Vi er eksperter i at arbejde inden for
                eksisterende brand guidelines. Vi sørger for at alt nyt
                materiale matcher perfekt med det du allerede har - og måske
                giver vi det endda et lille twist der gør det endnu bedre.
              </>
            ),
          },
          {
            question: "Får jeg rettighederne til de færdige designs?",
            answer: (
              <>
                Ja! Når projektet er afsluttet og betalt, får du alle
                rettigheder til det færdige design. Du får også filerne i alle
                relevante formater, så du kan bruge dem præcis som du vil.
                Ingen skjulte begrænsninger her!
              </>
            ),
          },
        ]}
        title="De ærlige svar på dine design-spørgsmål"
        description="Her er de spørgsmål vi ofte får om grafisk design. Ingen fancy fagsprog eller indviklede forklaringer - bare straight-up svar du kan bruge til noget."
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default GraphicDesignPage;