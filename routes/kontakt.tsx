import { Head } from "$fresh/runtime.ts";
import ContentSection4 from "../components/sections/ContentSections/ContentSection4.tsx";

import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import { Content4CardType } from "../types/Content4Cards.ts";
import {
  EmailIcon,
  LocationIcon,
  PhoneIcon,
} from "../components/icons/Icons.tsx";
import Splitter from "../components/other/splitter.tsx";

import ContentSection2 from "../components/sections/ContentSections/ContentSection2.tsx";
import TeamSection from "../components/sections/ContentSections/TeamSection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import ContactSection from "../components/sections/UtiliySections/ContactSecton.tsx";
import { Employee } from "../types/Employee.ts";
import { Handlers } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";

const content4Cards: Content4CardType[] = [
  {
    title: "Email",
    icon: <EmailIcon />,
    description: (
      <>
        Du er velkommen til at kontakte os med eventuelle forespørgsler eller
        spørgsmål, du måtte have.<br />
        <br />
        <a class="underline" href="mailto:hej@creativeoak.dk">
          hej@creativeoak.dk
        </a>
      </>
    ),
  },
  {
    title: "Teleon",
    icon: <PhoneIcon />,
    description: (
      <>
        Du kan kontakte os via telefon<br />
        <br />
        <a class="underline" href="tel:+4553534290">
          +45 53 53 42 90
        </a>
      </>
    ),
  },
  {
    title: "Kontor",
    icon: <LocationIcon />,
    description: (
      <>
        Find os på vores adresse
        <br />
        <br />
        Langelandsgade 62
        <br />
        8000 Aarhus C
        <br />
        Cultivate
      </>
    ),
  },
];

interface PageData {
  teamMembers: Employee[];
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const teamQuery = `
      *[_type == "employee"] {
        name,
        position,
        profileImage,
        bio,
        "slug": slug.current,
        email,
        socialLinks {
          linkedin,
          twitter,
          github
        },
        department,
        pronouns,
        isActive
      }
    `;

    try {
      const teamMembers = await client.fetch(teamQuery);
      return ctx.render({ teamMembers });
    } catch (error) {
      console.error("Error fetching team members:", error);
      return new Response("Error fetching team data", { status: 500 });
    }
  }
};

const contactPage = ({ data }: { data: PageData }) => {
  return (
    <>
      <Head>
        <title>Kontakt os</title>
      </Head>
      <HeroSection2
        title="Kontakt"
        description="Vi vil meget gerne høre fra dig. Kontakt os i dag for alle dine behov inden for bæredygtig hjemmeside udvikling, Kunstig intelligens (AI) eller foto/video-produktioner"
      />
      <Splitter />
      <ContentSection4
        centerText={true}
        showBorder={false}
        cards={content4Cards}
      />

<ContactSection />
<Splitter />
      <ContentSection2
        title="Stillinger"
        text={[{
          header: "",
          txt:
            "Selvom der lige nu ikke står et ledigt skilt på vores dør, så er vi altid på udkig efter nye genier, der brænder for det, vi laver i Creative Oak. Vi er overbeviste om, at alle har noget specielt at byde på, og vi er mere end glade for at tage imod ansøgninger fra folk, der føler, de har det lille ekstra, som kan pifte vores team op. Har du nogle seje skills, erfaringer der får os til at tabe kæben, eller ideer, der kan blæse os bagover? Så smid os en ansøgning! Vi er allerede spændte på at finde ud af, hvordan du kan sætte dit præg på Creative Oak",
        }]}
      />
      <Splitter />
      <TeamSection
        teamMembers={data.teamMembers}
        title="Hvem er vi?"
        subtitle="Lær menneskerne bag Creative Oak at kende"
      />
      <Splitter />
  
      <Footer />
    </>
  );
};
export default contactPage;
