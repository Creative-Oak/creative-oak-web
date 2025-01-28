
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import { DesignIcon, GlassesIcon } from "../components/icons/Icons.tsx";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";

const VisualIdentityPage = ({url}: PageProps) => {
  return (
    <>
      <CustomHead 
        title="Visuel Identitet Aarhus | Skab et Unikt Brand | Creative Oak"
        metaDescription="Få skabt en unik visuel identitet i Aarhus der skiller dig ud fra mængden. Professionel brandudvikling med personlighed og kant."
        imageUrl={`${url.origin}/images/buywebsite.avif`}
        url={url.href}
      />
      <HeroSection2
        description="Vi hjælper dig med at skabe et visuelt udtryk, der er lige så unikt som din virksomhed. Slut med kedelige standardløsninger - lad os give dit brand det særpræg, der får dine kunder til at huske dig (og glemme konkurrenterne)."
        title="Trænger din visuelle identitet til en makeover?"
      />
      <Splitter />
      <ContentSection3
        title="Sådan skaber vi din unikke visuelle identitet"
        description="Vi dykker ned i din virksomheds DNA og finder de små guldkorn, der gør jer særlige. Sammen udvikler vi et design, der ikke bare ser godt ud, men også fortæller præcis den historie, I gerne vil fortælle. Ingen kopier her - kun ægte originaler!"
        elements={[
          {
            type: "text",
            icon: <GlassesIcon />,
            title: "Research (eller: Detektivarbejdet)",
            content:
              "Først går vi i Sherlock Holmes-mode! Vi graver dybt for at forstå alt om jer - jeres værdier, målgruppe, og hvad der gør jer til noget særligt. Jo mere vi ved, jo bedre bliver resultatet.",
          },
          {
            type: "text",
            icon: <DesignIcon />,
            title: "Design (eller: Fra tanke til virkelighed)",
            content:
              'Her hvor magien sker! Vi omsætter al vores viden til et visuelt univers, der får folk til at sige "wauw"... og måske endda "double wauw"!',
          },
        ]}
      />
      <Splitter />
      <ContentSection
        title="Hvad får du med i pakken?"
        description={
          <>
            "En visuel identitet er som et puslespil, hvor alle brikker skal
            passe perfekt sammen. Her er hvad du får:"
          </>
        }
        box1={
          <>
            <strong>Logo Design</strong>{" "}
            <p>
              Dit nye logo bliver som en superhelt-kappe til din virksomhed -
              genkendeligt, memorabelt og helt unikt. Uanset om du drømmer om
              noget minimalistisk elegant eller noget, der får folk til at
              spærre øjnene op.
            </p>
          </>
        }
        box2={
          <>
            <strong>Farve palette og typografi</strong>{" "}
            <p>
              Vi finder den perfekte kombination af farver og skrifttyper, der
              både skriger "HEJ!" til dine kunder og hvisker "vi er super
              professionelle". Ingen tilfældige valg her - alt har en mening og
              et formål.
            </p>
          </>
        }
        box3={
          <>
            <strong>Brandguide (eller: Din designbibel)</strong>{" "}
            <p>
              Tænk på det som en opskriftsbog for dit brand. Her samler vi alle
              ingredienserne og fortæller præcis, hvordan de skal bruges. Så er
              du sikker på, at dit brand altid ser lige så lækkert ud som på dag
              ét.
            </p>
          </>
        }
      />
      <Splitter />
 
      <CTASection
        buttonLink="/kontakt"
        buttonText="Book en gratis design-snak"
        title="Klar til at give dit brand et visuelt boost?"
        description="Lad os tage en uforpligtende snak om, hvordan vi kan hjælpe dig med at skabe en visuel identitet, der ikke bare ser godt ud, men også fortæller præcis den historie, du gerne vil fortælle. Første kop kaffe er på os! "
      />
      <Splitter />
      <FAQSection
        FAQData={[
          {
            question:
              "Har jeg virkelig brug for en visuel identitet? Mit logo er da fint nok...",
            answer: (
              <>
                Tja, har du brug for mere end ét par sko? Teknisk set nej, men
                det hjælper at have det rigtige outfit til forskellige
                lejligheder. Din visuelle identitet er dit brands garderobe –
                den sikrer, at du ser godt ud og sender de rigtige signaler,
                uanset hvor du dukker op.
              </>
            ),
          },
          {
            question: "Hvor lang tid tager det at lave en visuel identitet?",
            answer: (
              <>
                Det er lidt som at bage en kage – grundopskriften tager 4-6
                uger, men vil du have ekstra lag og pynt, så tager det lidt
                længere. Vi lover til gengæld, at slutresultatet bliver værd at
                vente på!
              </>
            ),
          },
          {
            question: "Hvad hvis jeg ikke kan lide det endelige design?",
            answer: (
              <>
                No stress! Vi arbejder tæt sammen gennem hele processen og
                tager ingen store spring uden din godkendelse. Det er lidt som
                at købe tøj – vi finder den rigtige stil sammen, og der er
                prøverum undervejs.
              </>
            ),
          },
          {
            question: "Er det ikke dyrt at få lavet en visuel identitet?",
            answer: (
              <>
                Det koster mindre end en Tesla og mere end en kop kaffe. <br/><br/> Men
                helt ærligt: Det er en investering i dit brands fremtid. Tænk på
                det som et jakkesæt – køber du det billigste, kan alle se det,
                og det holder ikke særlig længe.
              </>
            ),
          },
          {
            question: "Kan I arbejde videre med vores eksisterende design?",
            answer: (
              <>
                Selvfølgelig! Vi er ikke design-snobber. Hvis der er elementer
                i jeres nuværende identitet der virker, så bygger vi videre på
                dem. Det handler om evolution, ikke revolution (medmindre du er
                klar til det vilde makeover-program).
              </>
            ),
          },
          {
            question: "Hvad får jeg helt konkret ud af det?",
            answer: (
              <>
                Du får et komplet visuelt toolkit – tænk på det som en
                schweizerkniv for dit brand. Logo, farver, fonte, grafiske
                elementer og en guideline til hvordan du bruger det hele. Plus
                den der fede følelse af at have styr på tingene.
              </>
            ),
          },
        ]}
        title="De ærlige svar på (næsten) alle spørgsmål"
        description="Her har vi samlet de spørgsmål, vi oftest får om visuel identitet. Ingen fancy buzzwords eller indviklet design-snak – bare ærlige svar der giver mening."
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default VisualIdentityPage;
