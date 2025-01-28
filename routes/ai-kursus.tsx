
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import ContentSection4 from "../components/sections/ContentSections/ContentSection4.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import { Content4CardType } from "../types/Content4Cards.ts";
import {
  ReuseIcon,
  RunningIcon,
  ScissorIcon,
} from "../components/icons/Icons.tsx";
import ContentSection2 from "../components/sections/ContentSections/ContentSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";

const content4Cards: Content4CardType[] = [
  {
    description: (
      <>
        Styrk din virksomhed med vores specialdesignede AI-kurser, der er
        tilpasset dine unikke behov og mål.
      </>
    ),
    icon: <ScissorIcon />,
    title: "Skræddersyede kurser i AI",
  },
  {
    description: (
      <>
        Tag en praktisk AI-rejse med os - fra at træffe smartere beslutninger
        til at skabe innovative AI-produkter, der imponerer dine kunder.
      </>
    ),
    icon: <RunningIcon />,
    title: "Praktisk AI-Anvendelse",
  },
  {
    description: (
      <>
        Lær, hvordan AI kan transformere din forretning i alle aspekter,
        integreret med vores ekspertise inden for webdesign, video- og
        fotoproduktion og visuel identitet.
      </>
    ),
    icon: <ReuseIcon />,
    title: "Integreret AI-Læring",
  },
];

const aiCourse = ({url}: PageProps) => {
  return (
    <>
      <CustomHead 
        title="AI Kurser | Skræddersyet AI Undervisning til Virksomheder | Creative Oak"
        metaDescription="Få praktisk hands-on erfaring med AI gennem skræddersyede kurser til din virksomhed. Vi gør kunstig intelligens forståeligt. Book dit kursus i dag!"
        url={url.href}
        imageUrl={`${url.origin}/images/oak-hand.avif`}
      />
      <div>
        <HeroSection2
          tagLine="AI - på din måde"
          description="Hos Creative Oak er vi ikke AI-evangelister, men vi er AI-nørder! Vores mål er at gøre AI tilgængeligt for alle, uanset teknisk baggrund, og at give dig de færdigheder og den viden, der kræves for at udnytte kunstig intelligens’ potentiale. Derfor tilbyder vi dette kursus i AI."
          title="Tag din virksomhed til nye højder med kursus i AI"
          buttonLink="/kontakt"
          buttonText="Book kursus"
        />
        <Splitter />
        <ContentSection
          description={
            <p>
              "Når du tænker på kunstig intelligens, tænker du måske på ChatGPT,
              men vidste du, at AI faktisk er mere end 60 år gammelt? <br />
              <br />{" "}
              AI er ikke bare én ting, men er et tag-selv-bord af værktøjer til
              din virksomhed! Der er forskellige slags AI, som kan gøre alting
              fra at forudsige, hvad dine kunder vil købe næste gang, til at
              sortere bunker af data og spare dig for en masse tid. <br />{" "}
              <br />{" "}
              Så hvorfor bruge AI? Fordi det kan hjælpe dig med at træffe bedre
              beslutninger, automatisere repetitive opgaver og endda lave
              “magiske” produkter, der imponerer dine kunder."
            </p>
          }
          title="Mere end ChatGPT"
          imageUrl="/images/oak-hand.avif"
          rightAlignedText={true}
        />
        <Splitter />
        <ContentSection4 cards={content4Cards} />
        <Splitter />

        <ContentSection2
          text={[{
            header: "Kom godt i gang!",
            txt:
              "Vi tager udgangspunkt i de muligheder, der findes ude i verden, så du ikke behøver at genopfinde den dybe tallerken for at komme i gang. Vi kender de bedste AI-værktøjer på markedet, der passer til dine behov.",
          }, {
            header: "Løs dine udfordringer",
            txt:
              "Creative Oak er ikke hoppet med på hype-toget. Vi ved, at alle dine problemer ikke kan løses med kunstig intelligens. Men vi ved også, hvilke opgaver, der kan løses med AI, og kan hjælpe dig med at udvælge, hvor og hvordan det kan bruges allerbedst i din virksomhed.",
          }]}
          description="Kunstig intelligens er en banebrydende måde at løse problemer på. Vi er ikke længere begrænset til opgaver, der kan løses med snævre algoritmer, men kan i stedet tage udgangspunkt i data om den virkelige verden."
          title="Banebrydende Teknologier"
        />
        <Splitter />

        <ContentSection
          extraStyles="bg-brand-blue text-brand-white"
          imageAlt="Farverig illustration af en robot omgivet af mekaniske dele og teknologi, der repræsenterer kursus i AI i et kreativt og futuristisk design."
          imageUrl="/images/robot.avif"
          description={
            <>
              <p class="text-base text-brand-white leading-6 mb-4">
                Hos Creative Oak tilbyder vi skræddersyede AI-undervisninger og
                kurser, der er designet til at opfylde dine unikke behov og mål.
                Vi forstår, at hver virksomhed er forskellig, og derfor arbejder
                vi med dig for at sikre, at vores indhold matcher din branche,
                dine erfaringer og ambitioner.Vores tilgang begynder med en
                grundig dialog, hvor vi lærer om din virksomheds mål, og hvilke
                specifikke udfordringer du står overfor. Baseret på det, laver
                vi et skræddersyet kursus i AI, der ikke kun dækker
                grundlæggende AI-koncepter, men også dykker ned i de muligheder,
                som er mest relevante for jer.
                <br />
                <br />
                Vi tilbyder fleksibilitet i undervisningsformatet – fra
                workshops, online kurser til interaktive hands-on sessioner.
                Kurserne kan være alt fra enkeltdags introduktioner til AI til
                mere dybdegående uddannelsesforløb, der strækker sig over flere
                uger. Hver session er spækket med praktiske øvelser, casestudier
                og real-world scenarier, hvilket sikrer, at deltagerne får
                hands-on erfaring. Vi lægger vægt på at vise, hvordan AI kan
                integreres med din virksomhed, og hvordan AI kan forvandle
                forskellige aspekter af jeres forretning.Med Creative Oak's
                skræddersyede AI-kurser kan din virksomhed tage et afgørende
                skridt fremad i den digitale æra.
              </p>
            </>
          }
          title="Kursus i AI der er skræddersyet til dig!"
        />
        <Splitter />
        <CTASection
          description="Skriv hvis der er noget vi kan hjælpe med. Hvis du er mere til mails, kan vi også nåes på kontakt@creativeoak.dk"
          title="Er du klar til AI?"
          buttonLink="/kontakt"
          buttonText="Kontakt os i dag og hør mere!"
        />
        <Splitter />
        <FAQSection
          title="Er du nysgerrig på AI? Vi har svarene!"
          description="Dyk ned i vores mest populære spørgsmål om AI-kurser og bliv klogere på, hvordan du kan blive en del af AI-revolutionen."
          FAQData={[
            {
              question: "Hvad er fokus i jeres AI-kurser?",
              answer:
              <>"Vores AI-kurser er designet til at tage din virksomhed til nye højder. Vi fokuserer på praktisk anvendelse af AI i virksomhedsmiljøet, med øvelser og virkelige eksempler. Vi guider dig gennem processen med at udnytte AI i din virksomhed til at træffe klogere beslutninger, automatisere repetitive opgaver, og skabe innovative AI-produkter.",
            </>},
            {
              question: "Hvem er AI-kurserne hos Creative Oak for?",
              answer:
              <>"Kurserne er for virksomheder, der ønsker at forbedre deres digitale strategi og kompetencer. Uanset om du er nybegynder eller har erfaring med AI, vil vores kurser hjælpe dig med at udnytte AI's potentiale fuldt ud.",
            </>},
            {
              question:
                "Handler AI kun om programmering og komplekse algoritmer?",
              answer:
                <>"Nej, AI er meget mere end det. Selvom AI har rødder, der går over 60 år tilbage, og ofte involverer avanceret teknologi, fokuserer vi på at gøre AI tilgængelig og anvendelig for alle typer virksomheder. Vi viser dig, hvordan AI kan bruges til at forudsige kundeadfærd, effektivisere dataanalyse, og meget mere.",
            </>},
            {
              question: "Hvordan adskiller jeres AI-kurser sig fra andre?",
              answer:
              <>"Udover at være praktisk orienteret, integrerer vi AI med vores ekspertise inden for webdesign, fotografi, videoproduktion og visuel identitet. Dette giver en unik mulighed for at kombinere AI med kreative felter for at skabe holistiske og innovative løsninger.",
           </> },
            {
              question: "Hvordan kan jeg booke et AI-kursus hos Creative Oak?",
              answer:
              <>"Du kan kontakte os direkte via vores website eller sociale mediekanaler. Vi vil gerne diskutere dine behov og tilpasse kurset, så det passer til din virksomheds unikke krav og mål.",
            </>},
          ]}
        />
        <Splitter />
        <Footer />
      </div>
    </>
  );
};

export default aiCourse;
