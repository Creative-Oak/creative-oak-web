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
                title="See what our customers say"
                metaDescription="Read genuine customer reviews from Creative Oak - experts in sustainable web development. See how we've helped other businesses create digital solutions."
                url={url.href}
                imageUrl={`${url.origin}/images/wireframe+code.avif`}
            />
  
            <CleanHeroSection
                title="Testimonials"
                description="We could tell you how fantastic we are at creating environmentally friendly websites, but why not let our customers do it instead? Here you'll find genuine stories from companies that have taken the step towards a greener digital future - without us bribing them with organic coffee along the way."
            />
          <Splitter />
            <TestemonialSection showAll={true} testemonial={data.testimonials}/>
            <Splitter />
            <CTASection
                title="Ready to grow with us?"
                description="We plant digital seeds that grow into sustainable successes. Your company could be the next green adventure"
                buttonLink="/contact"
                buttonText="Plant your idea"
            />
            <Footer />
        </>
    );
};

export default TestemonialPage;
