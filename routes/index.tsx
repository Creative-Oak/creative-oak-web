// routes/index.tsx
import { Head } from "$fresh/runtime.ts";

import HeroSection1 from "../components/sections/HeroSections/heroSection1.tsx";
import Splitter from "../components/other/splitter.tsx";
import MarqueeSection from "../components/sections/UtiliySections/MarqueeSection.tsx";
import ServiceCardSection from "../components/sections/ContentSections/ServiceCardSection.tsx";
import InvisibleTextSection from "../components/sections/ContentSections/InvisibleTextSection.tsx";
import PortfolioSection from "../components/sections/ContentSections/PortfolioSection.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ProjectCardData } from "../types/projectCardData.ts";
import { client } from "../utils/sanity.ts";
import { Logo } from "../types/Logo.ts";

// Define a combined data type interface
interface HomePageData {
  projects: ProjectCardData[];
  logos: Logo[];
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const projectQuery = `
      *[_type == "project"] | order(isFeatured desc, releaseDate desc)[0...3] {
        title,
        "featuredImage": featuredImage,
        projectShortDescription,
        "slug": slug.current,
        "categories": categories[]->title
      }
    `;
    
    const logoQuery = `*[_type == "partnerLogo"] | order(order asc) {
      _id,
      name,
      alt,
      url,
      "image": image.asset->url
    }`;
    
    try {
      const [projects, logos] = await Promise.all([
        client.fetch(projectQuery),
        client.fetch(logoQuery)
      ]);
      
      return ctx.render({ projects, logos });
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};


export default function Home({ data }: PageProps<HomePageData>) {
  const { projects, logos } = data;
  return (
    <>
      <Head>
        <title>Creative Oak | Kreativt strategisk digitalt studio</title>
        <meta
          name="description"
          content="Vi skaber rammerne for, at organisationer kan forene menneskelig kreativitet og teknologisk innovation og sammen skabe en bæredygtig og positiv fremtid."
        />
      </Head>
      <HeroSection1
        rightImage="./images/hero1.avif"
        header="Velkommen til"
        buttonText1="Læs mere om os"
        buttonLink1="/om-os"
        subtitle="Creative Oak er en kreativ virksomhed med fokus på at udvikle hjemmesider og software der styrker din virksomhed."
      />
      <Splitter />
      <MarqueeSection data={{logos}} />
      <Splitter />
      <ServiceCardSection />
      <Splitter />
      <InvisibleTextSection />
      <Splitter />
      <PortfolioSection
        projects={projects}
        teaser="Se vores"
        title="Projekter"
      />
      <Splitter />
      <CTASection
        title="Mangler du hjælp til noget?"
        description="Skriv hvis der er noget vi kan hjælpe med. Hvis du er mere til mails, kan vi også nåes på hej@creativeoak.dk"
        buttonLink="/kontakt"
        buttonText="Kontakt os i dag!"
      />
      <Splitter />
      <Footer />
    </>
  );
}