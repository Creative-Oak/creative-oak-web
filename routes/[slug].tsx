import { PageData, Section } from "../types/sections.ts";
import { client } from "../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import HeroSection1 from "../components/sections/HeroSections/heroSection1.tsx";
import Splitter from "../components/other/splitter.tsx";
import { urlFor } from "../utils/imageBuild.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    try {
      const page = await client.fetch<PageData>(`*[_type == "page" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        sections[]{
          _type,
          ...
        },
        seo
      }`, { slug });

      if (!page) {
        return ctx.renderNotFound();
      }

      return ctx.render(page);
    } catch (error) {
      console.error("Error fetching homepage:", error);
      return ctx.renderNotFound();
    }
  },
};

export default function Home({ data }: PageProps<PageData>) {
  const sections = data?.sections || [];

  return (
    <div>
      {sections.map((section: Section, index) => {
        switch (section._type) {
          case "heroSection1": 
            return (
              <HeroSection1
                key={index}
                rightImage={urlFor(section.rightImage)}
                header={section.header}
                buttonText1={section.buttonText1}
                subtitle={section.subtitle}
              />
            );
          case "splitter":
            return <Splitter key={index} />;
          default:

            return null;
        }
      })}
    </div>
  );
}