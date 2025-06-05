import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Splitter from "../../components/other/splitter.tsx";
import { urlFor } from "../../utils/imageBuild.ts";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import CustomHead from "../../components/other/CustomHead.tsx";
import { Project } from "../../types/Project.ts";
import WebsiteProjectLayout from "../../components/projects/WebsiteProjectLayout.tsx";
import StandardProjectLayout from "../../components/projects/StandardProjectLayout.tsx";
import RelatedProjects from "../../components/projects/RelatedProjects.tsx";

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return ctx.renderNotFound();
    }

    const projectQuery = `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      featuredImage,
      projectShortDescription,
      "slug": slug.current,
      mainContent,
      releaseDate,
      isFeatured,
      slug,
      "categories": categories[]->title,
      primaryImageAltText,
      metaDescription,
      projectType,
      desktopImage,
      desktopImageAltText,
      mobileImage,
      mobileImageAltText,
      fullPageSmartphoneImage,
      desktopCollageImage,
      workplaceImage,
      introText,
      challengeText,
      solutionText,
      resultText,
      galleryImage1,
      galleryImage1AltText,
      galleryImage2,
      galleryImage2AltText,
      galleryImage3,
      galleryImage3AltText,
      galleryImage4,
      galleryImage4AltText,
      "relatedProjects": *[
        _type == "project" && 
        slug.current != $slug &&
        count(
          categories[]->{title}[title in ^.^.categories[]->title]
        ) > 0
      ][0...3] {
        title,
        "slug": slug.current,
        projectShortDescription,
        "categories": categories[]->title
      }
    }
  `;

    try {
      const project = await client.fetch(projectQuery, { slug });

      if (!project) {
        return ctx.renderNotFound();
      }

      return ctx.render(project);
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const ProjectPage = ({ data, url }: PageProps<Project>) => {
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  // Check if this is a website project
  const isWebsiteProject = data.projectType === "website";

  return (
    <>
      <CustomHead
        title={data.title}
        imageUrl={urlFor(data.featuredImage)}
        metaDescription={data.metaDescription}
        url={currentUrl.toString()}
        ogType="article"
      />

      {isWebsiteProject
        ? <WebsiteProjectLayout data={data} />
        : <StandardProjectLayout data={data} />}

      {/* CTA Section - Common to both layouts */}
      <Splitter />
      <CTASection
        buttonLink="/contact"
        buttonText="Book a free consultation"
        description="We're ready to help you with your project! We've got coffee (and a lot of good ideas) ready for you."
        title="Are you curious?"
        backgroundColor="brand-blue"
      />

      <Splitter />

      {/* Related Projects Section - Common to both layouts */}
      <RelatedProjects projects={data.relatedProjects || []} />

      <Footer />
    </>
  );
};

export default ProjectPage;
