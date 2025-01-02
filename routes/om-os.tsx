import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import ContentSection2 from "../components/sections/ContentSections/ContentSection2.tsx";
import TeamSection from "../components/sections/ContentSections/TeamSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

const About = () => {
  const text = [
    {
      header: "Beslutninger tages demokratisk",
      txt:
        `Den er indlysende, at man I et kollektiv tager beslutninger sammen. Så det gør vi også. Hvilken retning skal virksomheden gå i, hvilke projekter giver mening at arbejde på, og hvilken kaffe skal i kaffemaskinen på kontoret. Alle sammen vigtige beslutninger (specielt det med kaffen), der kan tages i plenum. Vi anerkender dog, at ikke alle beslutninger kan være demokratiske, da for eksempel ansættelser og afskedigelser potentielt kan blive som et **Robinson-ø-råd** – altså en popularitetskonkurrence snarere end en virksomhed.`,
    },
    {
      header: "Alle får det samme i løn",
      txt:
        `En motor fungerer ikke uden alle sine dele, så hvorfor skulle nogle dele være mere værd end andre?  Uanset om du er nyuddannet eller har 30 års erfaring, får du hos Creative Oak den samme løn.  Og det klassiske spørgsmål er selvfølgelig: "Vil det sige, man ikke tjener mere, jo længere man arbejder i virksomheden?" Ja og nej! En af de beslutninger, der skal tages demokratisk, er blandt andet, hvor meget løn der skal udbetales. Altså er det en fælles beslutning, om vi skal have mere eller mindre i løn. Og hvis folk yder en god indsats, og virksomheden har en sund økonomi—hvorfor skulle vi så ikke belønnes med mere i løn?`,
    },
    {
      header: "Den (semi) firedages arbejdsuge",
      txt:
        `På det seneste har der været en del hype omkring firedages arbejdsuger, hvor man arbejder fire dage, for at holde helt fri en dag om ugen. Hos Creative Oak arbejder vi ikke, blot for at kunne holde fri, men fordi arbejdet er meningsfuldt. Det besværliggør også samarbejder, da det gør det umuligt at kontakte en 4-dages arbejdsuge-virksomhed på en “fridag”, hvor alle medarbejdere har fri.

        Der er fem dage i en standard arbejdsuge—det anerkender vi, og vi vil gerne investere i, at man sagtens kan bruge fem dage om ugen på sit arbejde og stadig være glad for det. Hos Creative Oak har vi derfor valgt, at én af de fem arbejdsdage skal bruges på noget, man brænder for. Uanset om det er selvudvikling, keramik, et sejt stykke software, eller et ønske om at fordybe sig i et spændende projekt. Det kan også være man på den dag gerne vil arbejde med ens projekter i Virksomheden - det er op til en selv. Den eneste “forventning” med denne “fridag” er at man benytter en halv time om formiddagen og en have time om eftermiddagen til at gå sin indbakke igennem, så vores samarbejdspartnere ikke venter på svar forgæves.

        Så længe arbejdet er inspirerende, sjovt, og man konstant udvikler sig, tror vi på, at en femdages arbejdsuge sagtens kan fungere. Derfor sørger vi for, at alle vores ansatte får én dag til at udfordre sig selv ved at lære noget nyt eller gøre noget, der er inspirerende. Vi tror også, at det gavner virksomheden, at vores ansatte har stor mulighed for selvudvikling—hvis man lærer noget nyt, man kan tilbyde vores kunder, sidder vi ikke fast i gammel læring; vi fremmer ny læring.`,
    },
  ];

  const TempTeam = [
    {
      name: "Heine Volder Rødder",
      role: "Partner, Udvikler, Designer",
      pronouns: "he/him",
      imageUrl: "/images/heine.jpg",
    },
    {
      name: "Magnus Høholt Kaspersen",
      role: "Partner, AI specialist, UX-Designer",
      pronouns: "he/him",
      imageUrl: "/images/magnus.jpg",
    },
    
  ];

  return (
    <>
      <Head>
        <title>Om os</title>
      </Head>
      <HeroSection2
        description="Creative Oak er en kreativ virksomhed med fokus på at udarbejde skarpe digitale produkter, der kan gøre underværker for din virksomhed. Men vi har også ambitioner om at være en demokratisk og kollektivistisk virksomhed."
        title="Hvem er vi?"
      />
      <Splitter />
      <ContentSection
        teaser="Kollektivistisk virksomhed"
        title="Hvad betyder en kollektivistisk virksomhed?"
        imageUrl="/images/magnus-heine-baal.jpeg"
        imageAlt="2 mennesker der, hvor den ene sidder i en sofa, og den anden sidder og ved et bål"
        box1={<>"Beslutninger tages demokratisk"</>}
        box2={<>"Alle får det samme i løn"</>}
        box3={<>"Den (semi) firedages arbejdsuge"</>}
        description={<>"Vi stræber efter at blive en kollektivistisk virksomhed. Hvad mener vi så med det? Vi vil gerne skabe en atmosfære, hvor arbejdet hos Creative Oak føles som et kollektiv—hvor vi sammen kan opnå noget stort ved fælles indsats. Hvordan gør vi så det? Vi har valgt tre principper, som forhåbentlig bidrager til en kollektivistisk tankegang:"</>}
      />
      <Splitter />
      <ContentSection2
        text={text}
        title="Hvad betyder det at arbejde hos Creative Oak?"
      />
      <Splitter />
      <TeamSection
        teamMembers={TempTeam}
        subtitle="Lær menneskerne bag Creative Oak at kende"
        title="Hvem er vi?"
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default About;
