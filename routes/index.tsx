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
      *[_type == "project"] | order(isFeatured desc, releaseDate desc)[0...6] {
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
        client.fetch(logoQuery),
      ]);

      return ctx.render({ projects, logos });
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default function Home({ data, url }: PageProps<HomePageData>) {
  const { projects, logos } = data;
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  return (
    <>
      <Head>
        <title>Creative Oak | Kreativt strategisk digitalt studio</title>
        <meta
          name="description"
          content="Vi skaber rammerne for, at organisationer kan forene menneskelig kreativitet og teknologisk innovation og sammen skabe en bæredygtig og positiv fremtid."
        />
        <meta
          name="description"
          content="Vi skaber rammerne for, at organisationer kan forene menneskelig kreativitet og teknologisk innovation og sammen skabe en bæredygtig og positiv fremtid."
        />
        {/* Open Graph meta tags */}
        <meta
          property="og:title"
          content={"Creative Oak | Kreativt strategisk digitalt studio"}
        />
        <meta
          property="og:description"
          content={"/images/logo.svg"}
        />
        <meta property="og:image" content={"/images/logo.svg"} />

        <meta property="og:type" content="page" />
        {/* You might want to add your domain here */}
        <meta property="og:url" content={currentUrl.toString()} />

        {/* Twitter Card meta tags (optional but recommended) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={"Creative Oak | Kreativt strategisk digitalt studio"}
        />
        <meta
          name="twitter:description"
          content="Vi skaber rammerne for, at organisationer kan forene menneskelig kreativitet og teknologisk innovation og sammen skabe en bæredygtig og positiv fremtid."
        />

        <meta name="twitter:image" content={"/images/logo.svg"} />
      </Head>
      <HeroSection1
        rightImage="./images/hero1.avif"
        header="Kreativt strategisk digitalt studio"
        buttonText1="Læs mere om os"
        buttonLink1="/om-os"
        buttonText2="Fortæl os om din vision"
        buttonLink2="/kontakt"
        subtitle="Din partner for bæredygtige digitale løsninger, der vokser med din forretning"
      />
      <Splitter />
      <MarqueeSection data={{ logos }} />
      <Splitter />
      <ServiceCardSection />
      <Splitter />
      <InvisibleTextSection />
      <Splitter />
      <PortfolioSection
        projects={projects}
        teaser="Fra skærm til skønhed"
        title="Se vores udvalgte projekter"
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
