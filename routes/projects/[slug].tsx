import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Splitter from "../../components/other/splitter.tsx";
import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";
import { BlockContent } from "../../utils/renderText.tsx";
import renderMainContent from "../../utils/renderText.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import CustomHead from "../../components/other/CustomHead.tsx";
import ScrollTriggerImage from "../../islands/ScrollTriggerImage.tsx";

interface Project {
  title: string;
  mainContent: BlockContent[];
  featuredImage: Image;
  projectShortDescription: string;
  categories: { title: string }[];
  releaseDate: string;
  isFeatured: boolean;
  slug: string;
  primaryImageAltText: string;
  metaDescription: string;
  projectType: "website" | "other";
  desktopImage?: Image;
  desktopImageAltText?: string;
  mobileImage?: Image;
  mobileImageAltText?: string;
  fullPageSmartphoneImage?: Image;
  desktopCollageImage?: Image;
  workplaceImage?: Image;
  introText?: string;
  challengeText?: string;
  solutionText?: string;
  resultText?: string;
  relatedProjects?: {
    title: string;
    slug: string;
    projectShortDescription: string;
    categories: string[];
  }[];
}
export const handler: Handlers<{ projects: Project }> = {
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
        ? (
          // Website Project Layout
          <>
            <section className="bg-brand-blue relative flex flex-col min-h-[80svh] md:min-h-[100svh] justify-center items-center pt-32 pb-12 md:pt-0 md:pb-0">
              <div className="items-center text-center mb-8 md:mb-12">
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-4 font-lexend">
                    {data.title}
                  </h1>
                </div>
              </div>
              {/* Mobile version with static image */}
              <div className="md:hidden w-full flex items-center justify-center">
                <img
                  src={data.mobileImage
                    ? urlFor(data.mobileImage)
                    : urlFor(data.featuredImage)}
                  alt={data.mobileImageAltText || data.primaryImageAltText}
                  className="max-w-[calc(100%-4rem)] w-full object-contain"
                />
              </div>
              {/* Desktop version with ScrollTriggerImage */}
              <div className="hidden md:block w-full">
                {data.desktopImage && data.mobileImage
                  ? (
                    <ScrollTriggerImage
                      desktopSrc={urlFor(data.desktopImage)}
                      mobileSrc={urlFor(data.mobileImage)}
                      desktopAlt={data.desktopImageAltText ||
                        `${data.title} Desktop View`}
                      mobileAlt={data.mobileImageAltText ||
                        `${data.title} Mobile View`}
                    />
                  )
                  : (
                    <img
                      src={urlFor(data.featuredImage)}
                      alt={data.primaryImageAltText}
                      className="max-w-4xl mx-auto w-full object-contain"
                    />
                  )}
              </div>
            </section>

            <Splitter />

            {/* Categories and Publication Date */}
            <div className="container mx-auto px-4 md:px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
                  {data.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border-2 border-brand-black shadow-custom-black-400 text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Publiceret den{" "}
                    <span className="font-medium">
                      {new Date(data.releaseDate).toLocaleDateString("da-DK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Intro Text */}
            {data.introText && (
              <>
                <section className="bg-white py-12">
                  <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-brand-black mb-6 font-lexend">
                      Om {data.title}
                    </h2>
                    <p className="text-lg md:text-xl font-poppins text-brand-black">
                      {data.introText}
                    </p>
                  </div>
                </section>
                <Splitter />
              </>
            )}

            {/* Full Page Smartphone Image */}
            {data.fullPageSmartphoneImage && (
              <>
                <section
                  className="w-full flex min-h-[80svh] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${
                      urlFor(data.fullPageSmartphoneImage)
                    }')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                </section>
                <Splitter />
              </>
            )}

            {/* Challenge and Solution Section */}
            {(data.challengeText || data.solutionText) && data.workplaceImage &&
              (
                <>
                  <section className="bg-brand-blue py-16">
                    <div className="container mx-auto px-4 md:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="w-full h-full">
                          <img
                            src={urlFor(data.workplaceImage)}
                            alt={`${data.title} Workplace`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          {data.challengeText && (
                            <>
                              <h3 className="text-2xl font-bold text-brand-white mb-4">
                                Udfordring
                              </h3>
                              <p className="text-lg font-poppins text-brand-white">
                                {data.challengeText}
                              </p>
                            </>
                          )}

                          {data.solutionText && (
                            <>
                              <h3 className="text-2xl font-bold text-brand-white mb-4 mt-8">
                                Løsning
                              </h3>
                              <p className="text-lg font-poppins text-brand-white">
                                {data.solutionText}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                  <Splitter />
                </>
              )}

            {/* Desktop Collage Image */}
            {data.desktopCollageImage && (
              <>
                <section
                  className="w-full flex justify-center items-center py-16 md:py-64 overflow-hidden h-[600px] md:h-[1000px] bg-center bg-no-repeat bg-[length:200%_auto] md:bg-[length:80rem_auto]"
                  style={{
                    backgroundImage: `url('${
                      urlFor(data.desktopCollageImage)
                    }')`,
                  }}
                >
                </section>
                <Splitter />
              </>
            )}

            {/* Result Section */}
            {data.resultText && (
              <>
                <section className="bg-white py-16">
                  <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-brand-black mb-6 font-lexend">
                      Resultat
                    </h2>
                    <p className="text-lg md:text-xl font-poppins text-brand-black">
                      {data.resultText}
                    </p>
                  </div>
                </section>
                <Splitter />
              </>
            )}
          </>
        )
        : (
          // Standard Project Layout
          <>
            <section className="bg-brand-blue py-32 md:py-40">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-6 font-lexend">
                    {data.title}
                  </h1>
                  <p className="text-xl text-white max-w-3xl mx-auto">
                    {data.projectShortDescription}
                  </p>
                </div>
              </div>
            </section>

            <Splitter />

            <div className="container mx-auto px-4 md:px-8 py-12">
              {data.featuredImage && (
                <div className="aspect-video w-full mb-12">
                  <img
                    src={urlFor(data.featuredImage)}
                    alt={data.primaryImageAltText}
                    className="w-full h-full object-cover border-2 border-brand-black shadow-custom-black"
                  />
                </div>
              )}

              <div className="flex flex-col lg:flex-row gap-12">
                {/* Main content */}
                <div className="lg:w-2/3">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {data.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 mb-4 border-2 border-brand-black shadow-custom-black-400 text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="prose max-w-none rich-text">
                      {renderMainContent(data.mainContent)}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                  <div className="sticky top-32">
                    <div className="bg-white p-6 shadow-custom-black-400 border-2 border-brand-black">
                      {/* Publication info */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-600">
                          Publiceret den{" "}
                          <span className="font-medium">
                            {new Date(data.releaseDate).toLocaleDateString(
                              "da-DK",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </p>
                      </div>

                      {/* Related Projects */}
                      {data.relatedProjects &&
                        data.relatedProjects.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-lg font-semibold mb-4">
                            Læs også
                          </h4>
                          <div className="space-y-6">
                            {data.relatedProjects.map((project) => (
                              <a
                                href={`/projects/${project.slug}`}
                                className="block group"
                                key={project.slug}
                              >
                                <div>
                                  <h5 className="font-medium group-hover:text-brand-red transition-colors">
                                    {project.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
                                    {project.projectShortDescription}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      {/* CTA Section - Common to both layouts */}
      <CTASection
        buttonLink="/kontakt"
        buttonText="Book et uforpligtende møde"
        description="Det er vi også - på dit projekt! Vi har kaffen klar (og en masse gode idéer i ærmet)."
        title="Er du blevet nysgerrig?"
        backgroundColor="brand-blue"
      />

      <Splitter />

      {/* Related Projects Section - Common to both layouts */}
      {data.relatedProjects && data.relatedProjects.length > 0 && (
        <>
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-4xl font-bold text-brand-black mb-8 font-lexend">
                Læs også
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.relatedProjects.map((project) => (
                  <a
                    href={`/projects/${project.slug}`}
                    className="block group bg-white p-5 border-2 border-brand-black shadow-custom-black-400 hover:shadow-custom-black transition-all"
                    key={project.slug}
                  >
                    <div>
                      <h3 className="text-xl font-medium group-hover:text-brand-red transition-colors font-lexend">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mt-3 line-clamp-3 group-hover:text-brand-red transition-colors">
                        {project.projectShortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 border-2 rounded group-hover:rounded-none group-hover:shadow-custom-black-sm transition-all border-brand-black-400"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <Splitter />
        </>
      )}

      <Footer />
    </>
  );
};

export default ProjectPage;
