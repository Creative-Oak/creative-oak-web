import HeroSection1 from "../islands/HeroSection1.tsx";
import Splitter from "../components/other/splitter.tsx";
import MarqueeSection from "../components/sections/UtiliySections/MarqueeSection.tsx";

import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ProjectCardData } from "../types/projectCardData.ts";
import { client } from "../utils/sanity.ts";
import { Logo } from "../types/Logo.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import TestemonialSection from "../components/sections/UtiliySections/TestemonialSection.tsx";
import Testemonial from "../types/Testemonials.ts";
import AboutUsSection from "../islands/AboutUsSection/AboutUsSection.tsx";
import PortfolioIsland from "../islands/PortfolioIsland.tsx";

// Define a combined data type interface
interface HomePageData {
  projects: ProjectCardData[];
  logos: Logo[];
  testemonials: Testemonial[];
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const projectQuery = `
      *[_type == "project"] | order(isFeatured desc, releaseDate desc)[0...6] {
        title,
        "featuredImageUrl": featuredImage.asset->url,
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
        title="Creative Oak | Creative strategy & digital agency"
        metaDescription="Your partner for sustainable digital solutions that grow with your business"
        url={currentUrl.toString()}
        imageUrl={`${currentUrl}images/og/og-logo.jpg`}
      />

      <HeroSection1
        lottieAnimation="./animations/hero-animation.json" // Path to your Lottie animation file
        header="Creative strategy & digital agency"
        buttonText1="Læs mere om os"
        buttonLink1="/about"
        buttonText2="Fortæl os om din vision"
        buttonLink2="/kontakt"
        subtitle="Your partner for sustainable digital solutions that grow with your business"
      />     

      <Splitter />
  
      <MarqueeSection data={{ logos }} />
 
      <Splitter />
      <AboutUsSection />
      <div className="bg-brand-yellow">
      <Splitter />
    
      <PortfolioIsland   
        initialProjects={projects}
        showTitle={false}
      />
      </div>
      <Splitter />
      <TestemonialSection testemonial={data.testemonials} />
      <Splitter />
      <CTASection
        title="Do you need help with something?"
        description="Please write if there is something we can help with. If you are more into emails, we can also be reached at hello@creativeoak.io"
        buttonLink="/kontakt"
        buttonText="Contact us"
      />
      <Splitter />
      <Footer />
    </>
  );
}
