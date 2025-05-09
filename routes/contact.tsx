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
import { Handlers, PageProps } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import CleanHeroSection from "../islands/CleanHeroSection.tsx";

const content4Cards: Content4CardType[] = [
  {
    title: "Email",
    icon: <EmailIcon />,
    description: (
      <>
        You are welcome to contact us with any inquiries or questions you may have.<br />
        <br />
        <a class="underline" href="mailto:hej@creativeoak.dk">
          hej@creativeoak.dk
        </a>
      </>
    ),
  },
  {
    title: "Phone",
    icon: <PhoneIcon />,
    description: (
      <>
        You can contact us by phone<br />
        <br />
        <a class="underline" href="tel:+4553534290">
          +45 53 53 42 90
        </a>
      </>
    ),
  },
  {
    title: "Office",
    icon: <LocationIcon />,
    description: (
      <>
        Find us at our address
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
  },
};

const contactPage = ({ data, url }: PageProps) => {
  return (
    <>
      <CustomHead
        title="Contact Creative Oak | AI, Web & Photo/Video | Aarhus"
        imageUrl={`${url.origin}/images/og/og-logo.jpg`}
        url={url.href}
        metaDescription="Contact Creative Oak for sustainable websites, AI solutions, and visual production. Call +45 53 53 42 90 or email hej@creativeoak.dk. Find us in the heart of Aarhus."
      />
 
      <CleanHeroSection
        title="Contact"
        accent="Let's talk"
        description="We would love to hear from you. Contact us today for all your needs in sustainable website development, Artificial Intelligence (AI), or photo/video production"
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
        title="Careers"
        text={[{
          header: "",
          txt:
            "Even though there isn't currently a vacancy sign on our door, we're always looking for new geniuses who are passionate about what we do at Creative Oak. We believe everyone has something special to offer, and we're more than happy to receive applications from people who feel they have that little extra something that can spice up our team. Do you have some cool skills, experience that makes our jaws drop, or ideas that can blow us away? Then send us an application! We're already excited to find out how you can make your mark on Creative Oak",
        }]}
      />
      <Splitter />
      <TeamSection
        teamMembers={data.teamMembers}
        title="Who are we?"
        subtitle="Get to know the people behind Creative Oak"
      />
      <Splitter />

      <Footer />
    </>
  );
};
export default contactPage;
