import { Handlers, PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import TestemonialSection from "../components/sections/UtiliySections/TestemonialSection.tsx";
import CleanHeroSection from "../islands/CleanHeroSection.tsx";
import Testemonial from "../types/Testemonials.ts";

import { client } from "../utils/sanity.ts";

export const handler: Handlers<
    { testimonials: Testemonial[] }
> = {
    async GET(_, ctx) {
        const testimonialQuery = `
    *[_type == "testemonnial"] | order(name asc) {
      name,
      title,
      content,
      image,
      image_alt
    }
    `;

        try {
            const testimonials = await client.fetch(testimonialQuery);

            return ctx.render({ testimonials });
        } catch (error) {
            console.error("Error fetching data from Sanity:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    },
};

const TestemonialPage = ({ data, url }: PageProps<
    { testimonials: Testemonial[] }
>) => {
    return (
        <>
            <CustomHead
                title="Se hvad vores kunder siger (når vi ikke lytter)"
                metaDescription="Læs ægte kundeanmeldelser fra Creative Oak - eksperter i bæredygtig webudvikling. Se hvordan vi har hjulpet andre virksomheder med at skabe digitale løsninger."
                url={url.href}
                imageUrl={`${url.origin}/images/wireframe+code.avif`}
            />
  
            <CleanHeroSection
                title="Testimonials"
                description="Vi kunne fortælle dig hvor fantastiske vi er til at lave miljøvenlige hjemmesider, men hvorfor ikke lade vores kunder gøre det i stedet? Her finder du ægte historier fra virksomheder, der har taget skridtet mod en grønnere digital fremtid - helt uden at vi har bestukket dem med økologisk kaffe undervejs."

            />
          <Splitter />
            <TestemonialSection showAll={true} testemonial={data.testimonials}/>
            <Splitter />
            <CTASection
                title="Klar til at vokse med os?"
                description="Vi planter digitale frø der vokser til bæredygtige succeser. Din virksomhed kunne være det næste grønne eventyr"
                buttonLink="/contact"
                buttonText="Plant din idé"

            />
            <Footer />
        </>
    );
};

export default TestemonialPage;
