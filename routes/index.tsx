import HeroSection1 from "../components/sections/HeroSections/heroSection1.tsx";
import Splitter from "../components/other/splitter.tsx";
import MarqueeSection from "../components/sections/UtiliySections/MarqueeSection.tsx";

import PortfolioSection from "../components/sections/ContentSections/PortfolioSection.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ProjectCardData } from "../types/projectCardData.ts";
import { client } from "../utils/sanity.ts";
import { Logo } from "../types/Logo.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import TestemonialSection from "../components/sections/UtiliySections/TestemonialSection.tsx";
import Testemonial from "../types/Testemonials.ts";
import ServiceSection from "../islands/ServiceSection/ServicesSection.tsx";
import CTASection2 from "../components/sections/UtiliySections/CTASection2.tsx";

// Define a combined data type interface
interface HomePageData {
  projects: ProjectCardData[];
  logos: Logo[];
  testemonials: Testemonial[];
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

    const testimonialQuery = `
      *[_type == "testemonnial" && isFeatured == true] | order(order asc)[0...3] {
          name,
          title,
          content,
          image,
          image_alt,
          isFeatured,
          order
      }
    `;

    try {
      const [projects, logos, testemonials] = await Promise.all([
        client.fetch(projectQuery),
        client.fetch(logoQuery),
        client.fetch(testimonialQuery),
      ]);

      return ctx.render({ projects, logos, testemonials });
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
      <CustomHead
        title="Creative Oak | Kreativt strategisk digitalt studio"
        metaDescription="Vi skaber rammerne for, at organisationer kan forene menneskelig kreativitet og teknologisk innovation og sammen skabe en bæredygtig og positiv fremtid."
        url={currentUrl.toString()}
        imageUrl={`${currentUrl}images/og/og-logo.jpg`}
      />

      <HeroSection1
        lottieAnimation="./animations/hero-animation.json" // Path to your Lottie animation file
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
      <CTASection2
        text={
          <p>
            Vi er både konsulenter og digitale håndværkere. <br /><br />
            Med en skarp blanding af branding, brugeroplevelse og programatisk
            erfaring, skaber vi løsninger der virkelig rykker for vores kunder -
            og holder i længden.
          </p>
        }
        buttonText="Kontakt"
        buttonLink="/contact"
        secondButtonLink="/om-os"
        secondButtonText="Læs mere om vores kultur"
      />

      <Splitter />
      <ServiceSection />
      <Splitter />

      <PortfolioSection
        projects={projects}
        teaser=""
        title="Referencer"
      />
      <Splitter />
      <TestemonialSection testemonial={data.testemonials} />
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
