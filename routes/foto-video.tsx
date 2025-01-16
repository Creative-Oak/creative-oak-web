import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import { CameraIcon, VideoIcon } from "../components/icons/Icons.tsx";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";

const ContentCreationPage = () => {
  return (
    <>
      <Head>
        <title>Foto & Video Content | Få dit brand til at fange øjet</title>
        <meta
          name="description"
          content="Professionelt foto og video content der får din hjemmeside til at stråle. Vi skaber visuelt indhold der fanger din målgruppe og fortæller din historie."
        />
      </Head>
      <HeroSection2
        description="Lad os skabe det content, der får dine besøgende til at blive hængende (og komme tilbage efter mere). Slut med kedelige stock-fotos og generic video - vi laver ægte content der viser præcis hvem I er."
        title="Er din hjemmeside klar til sit close-up?"
      />
      <Splitter />
      <ContentSection3
        title="Sådan skaber vi dit unikke visuelle content"
        description="Vi fanger essensen af din virksomhed gennem linsen og omsætter det til content, der vækker følelser og skaber connection. Her er ingen copy-paste løsninger - kun autentisk indhold der matcher din brand-stemme!"
        elements={[
          {
            type: "text",
            icon: <CameraIcon />,
            title: "Foto (eller: Din visuelle storytelling)",
            content:
              "Vi knipser ikke bare løs! Hver fotosession er nøje planlagt for at capture de øjeblikke og detaljer, der gør din virksomhed special. Fra produktbilleder til team-shots - vi får det bedste frem i alle motiver.",
          },
          {
            type: "text",
            icon: <VideoIcon />,
            title: "Video (eller: Dit brand i bevægelse)",
            content:
              'Bewegte billeder siger mere end 1000 ord... eller var det 24 frames pr. sekund? Uanset hvad, så skaber vi videoindhold der får folk til at stoppe scrollingen og tænke "Det her gider jeg godt se!"',
          },
        ]}
      />
      <Splitter />
      <ContentSection
        title="Hvad får du med i pakken?"
        description={
          <>
            "Content er konge, men kvalitet er dronningen. Her er hvad du får når
            du vælger os:"
          </>
        }
        box1={
          <>
            <strong>Professionelle billeder</strong>{" "}
            <p>
              Fra skarpe produktbilleder til stemningsfyldte situationsbilleder.
              Vi leverer høj-kvalitets fotos der ser fantastiske ud på alle
              devices - fra mobil til storskærm. Plus, du får forskellige
              versioner til forskellige platforme.
            </p>
          </>
        }
        box2={
          <>
            <strong>Engagerende videoindhold</strong>{" "}
            <p>
              Korte, knivskarpe videoer der fanger essensen af dit brand. 
              Perfekt til din hjemmeside, sociale medier eller næste kampagne.
              Vi håndterer alt fra koncept til klipning, så du får færdigt
              content der er klar til brug.
            </p>
          </>
        }
        box3={
          <>
            <strong>Content-strategi (eller: Din visuelle køreplan)</strong>{" "}
            <p>
              Du får ikke bare en bunke filer - du får en gennemtænkt plan
              for hvordan du bedst bruger dit nye content. Vi guider dig gennem
              hvilke billeder og videoer der virker bedst hvor, og hvordan du
              får mest muligt ud af materialet.
            </p>
          </>
        }
      />
      <Splitter />
 
      <CTASection
        buttonLink="/kontakt"
        buttonText="Book en gratis content-snak"
        title="Klar til at give din hjemmeside det visuelle boost den fortjener?"
        description="Lad os tage en uforpligtende snak om, hvordan vi kan hjælpe dig med at skabe content der ikke bare ser godt ud, men også performer. Vi har kameraet klar (og kaffen er varm)!"
      />
      <Splitter />
      <FAQSection
        FAQData={[
          {
            question:
              "Kan jeg ikke bare bruge stock-fotos og færdige videoer?",
            answer: (
              <>
                Tja, du kan også gå med paryk, men folk kan som regel godt se
                forskellen. Unikt content skaber autenticitet og tillid - og det
                er guld værd i en digital verden hvor alle kan spotte fake fra
                miles away.
              </>
            ),
          },
          {
            question: "Hvor lang tid tager det at producere content?",
            answer: (
              <>
                Det kommer an på omfanget, men regn med 2-3 uger fra første
                møde til færdigt materiale. God ting tar' tid, som man siger -
                men vi lover at holde tempoet oppe uden at gå på kompromis med
                kvaliteten.
              </>
            ),
          },
          {
            question: "Hvad hvis vejret er dårligt på foto-dagen?",
            answer: (
              <>
                No worries! Vi er danskere - vi har backup-planer til vores
                backup-planer når det handler om vejret. Plus, nogle gange er
                gråvejr faktisk bedre for billederne end skarp sol. Vi finder
                ud af det!
              </>
            ),
          },
          {
            question: "Hvor meget koster det at få lavet professionelt content?",
            answer: (
              <>
                Det er lidt som at spørge hvad en bil koster - det afhænger af
                model og udstyr. <br/><br/> Men helt ærligt: Vi sammensætter en
                pakke der matcher både dine behov og dit budget. Og husk, godt
                content er en investering der bliver ved med at give tilbage.
              </>
            ),
          },
          {
            question: "Kan I arbejde med vores eksisterende content?",
            answer: (
              <>
                Selvfølgelig! Hvis du allerede har noget godt content, bygger
                vi videre på det. Vi er ikke content-snobber - vi er
                pragmatiske og fokuserer på at skabe den bedste løsning for
                dig.
              </>
            ),
          },
          {
            question: "Hvad får jeg konkret ud af det?",
            answer: (
              <>
                Du får en komplet content-pakke med høj-kvalitets billeder og
                videoer i alle de formater du har brug for. Plus grundig
                vejledning i hvordan du bedst bruger materialet. Og så får du
                selvfølgelig også en masse misundelige blikke fra
                konkurrenterne.
              </>
            ),
          },
        ]}
        title="De ærlige svar på dine content-spørgsmål"
        description="Her er de spørgsmål vi ofte får om foto og video content. Ingen teknisk mumbo-jumbo - bare straight-up svar du kan bruge til noget."
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default ContentCreationPage;