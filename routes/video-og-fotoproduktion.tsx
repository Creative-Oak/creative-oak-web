
import { Handlers, PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import PortfolioSection from "../components/sections/ContentSections/PortfolioSection.tsx";

import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";
import { client } from "../utils/sanity.ts";

export const handler: Handlers<
  { projects: ProjectCardData[] }
> = {
  async GET(_, ctx) {
    const projectQuery = `
    *[_type == "project" && "Foto- og videoproduktion" in categories[]->title] 
    | order(isFeatured desc, releaseDate desc)[0...3] {
      title,
      "featuredImage": featuredImage,
      projectShortDescription,
      "slug": slug.current,
      "categories": categories[]->title
    }
  `;

    try {
      const projects = await client.fetch(projectQuery);

      return ctx.render({ projects });
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const videoFotoProduktion = (
  { data, url }: PageProps<
    { projects: ProjectCardData[] }
  >,
) => {
  const { projects } = data;
  return (
    <>
      <CustomHead 
        title="Videoproduktion Aarhus | Professionel Video & Foto | Creative Oak"
        metaDescription="Professionel videoproduktion i Aarhus der fanger din virksomheds sjæl. Fra koncept til færdig film. Skræddersyede videoløsninger der performer."
        imageUrl={`${url.origin}/images/foto-video.avif`}
        url={url.href}
        ogType="website"
      />

      <HeroSection2
        title="Fang øjeblikket med foto- og videoproduktioner"
        description="Velproducerede videoproduktioner forbedrer synlighed og positivt brandimage. Vi tilbyder vi forskellige videoproduktionstjenester, der løser specifikke udfordringer. Vi tilpasser også skræddersyede løsninger og kombinerer håndholdt kamera og droneoptagelser for æstetisk tiltalende resultater."
        buttonText="Kontakt os"
        buttonLink="/kontakt"
      />
      <Splitter />
      <ContentSection
        title="Vores løsninger"
        rightAlignedText={true}
        imageUrl="/images/foto-video.avif"
        imageAlt="Stilbillede af Danmarks Største Fredagsbar. Billedet er fra en koncert, hvor mange af publikum står med hænderne i luften"
        description={
          <>
            Hos Creative Oak tilbyder vi en lang række forskellige
            videoproduktionstjenester. Med velproducerede videoer kan du styrke
            din synlighed og formidle dit brand til dine kunder. Vi kan med en
            kombination af håndholdt kamera- og droneoptagelser hjælpe dig med
            at: ‍<br />
            <br />
            Brande et nyt produkt <br />
            Dokumentere et arrangement <br />
            Finde nye medarbejdere
            <br />Lave en musikvideo
            <br />Eller måske noget helt andet? ‍<br />
            <br />
            Mulighederne er mange, og det er kun fantasien, der skal sætte
            grænsen for dig. Vi er pjattede med udfordringer, så hold dig ikke
            tilbage med at kontakte os, hvis du har en skør idé!
          </>
        }
      />
      <Splitter />
      <PortfolioSection
        title="Vores videoportfolio"
        teaser="Video projekter"
        projects={projects}
      />
      <Splitter />
      <CTASection title="Skal i have skudt noget content?" buttonLink="/kontakt" buttonText="Kontakt" description="Hvis i tænker Creative Oak er det rigtige valg til at lave jeres indhold, så tag endelig kontakt! Så sikrer vi os at i får noget lækkert content!" />
      <Splitter />
      <Footer />
    </>
  );
};

export default videoFotoProduktion;
