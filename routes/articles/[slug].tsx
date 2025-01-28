import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import HeroSection2 from "../../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../../components/other/splitter.tsx";
import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";
import renderMainContent from "../../utils/renderText.tsx";
import { BlockContent } from "../../utils/renderText.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import { Employee } from "../../types/Employee.ts";
import CustomHead from "../../components/other/CustomHead.tsx";


interface Article {
  title: string;
  mainContent: BlockContent[];
  featuredImage: Image;
  shortDescription: string;
  releaseDate: string;
  isFeatured: boolean;
  primaryImageAltText: string;
  metaDescription: string;
  author: Employee;
  relatedArticles?: {
    title: string;
    slug: string;
    featuredImage: Image;
    shortDescription: string;
  }[];
}

export const handler: Handlers<{ articles: Article }> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return new Response("Slug not provided", { status: 400 });
    }
    const projectQuery = `
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      featuredImage,
      shortDescription,
      "slug": slug.current,
      mainContent[] {
        ...,
        markDefs[] {
          _key,
          _type,
          href
        }
      },
      releaseDate,
      isFeatured,
      primaryImageAltText,
      metaDescription,
      "author": author-> {
        name,
        "slug": slug.current,
        position,
        profileImage,
        bio,
        email,
        socialLinks,
        department,
        isActive
      },
      "relatedArticles": relatedArticles[]-> {
        title,
        "slug": slug.current,
        shortDescription
      }
    }
  `;

    try {
      const project = await client.fetch(projectQuery, { slug });
      if (!project) {
        return new Response("Project not found", { status: 404 });
      }

      return ctx.render(project);
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const ProjectPage = ({ data, url }: PageProps<Article>) => {

  const currentUrl = typeof window !== 'undefined' ? globalThis.location.href : url;

  return (
    <>
    <CustomHead 
    title={data.title}
    imageUrl={urlFor(data.featuredImage)}
    metaDescription={data.metaDescription}
    url={currentUrl.toString()}
    ogType="article"
    />
    
      <HeroSection2
        title={data.title}
        description={data.shortDescription}
      />
      <Splitter />

      <div class="container mx-auto px-4 sm:px-6 pt-12">
        {data.featuredImage && (
          <div class="aspect-video w-full">
            <img
              src={urlFor(data.featuredImage)}
              alt={data.primaryImageAltText}
              class="w-full h-full object-cover border-2 border-brand-black shadow-custom-black"
            />
          </div>
        )}
      </div>

      <div class="container mx-auto px-4 sm:px-6 py-12">
        <div class="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div class="lg:w-2/3">
            <div class="prose max-w-none rich-text">
              {renderMainContent(data.mainContent)}
            </div>
          </div>

          {/* Sticky sidebar */}
          <div class="lg:w-1/3">
            <div class="sticky top-32">
              {/* Author info */}
              {data.author && (
                <div  class="bg-white p-6  shadow-custom-black-400 border-2 border-brand-black">
                  <p class="font-smal">Skrevet af</p>
                  <a href={"/employee/" + data.author.slug} class="flex items-center space-x-4 mb-4 mt-4 hover:text-brand-red transition-colors">
                    {data.author.profileImage && (
                      <img
                        src={urlFor(data.author.profileImage)}
                        alt={`Portrait of ${data.author.name}`}
                        class="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 class="text-lg font-semibold">{data.author.name}</h3>
                      <p class="text-gray-600">{data.author.position}</p>
                    </div>
                  </a>

                  {/* Social Links */}
                  {data.author.socialLinks && (
                    <div class="flex space-x-4 mb-4">
                      {data.author.socialLinks.linkedin && (
                        <a
                          href={data.author.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-gray-600 hover:text-blue-600"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {data.author.socialLinks.twitter && (
                        <a
                          href={data.author.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-gray-600 hover:text-blue-400"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {data.author.socialLinks.github && (
                        <a
                          href={data.author.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-gray-600 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Contact info */}
                  {data.author.email && (
                    <div class="mb-4">
                      <a
                        href={`mailto:${data.author.email}`}
                        class="text-sm text-gray-600 underline hover:text-brand-red"
                      >
                        {data.author.email}
                      </a>
                    </div>
                  )}

                  {/* Publication info */}
                  <div class="border-t pt-4">
                    <div class="space-y-2">
                      <p class="text-sm text-gray-600">
                        Publiceret den{" "}
                        <span class="font-medium">
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
                  </div>

                  {/* Related Articles */}
                  {data.relatedArticles && data.relatedArticles.length > 0 && (
                    <div class="border-t pt-4 mt-4">
                      <h4 class="text-lg font-semibold mb-4">Læs også</h4>
                      <div class="space-y-12">
                        {data.relatedArticles.map((article) => (
                          <a
                            href={`/articles/${article.slug}`}
                            class="block group"
                            key={article.slug}
                          >
                  
                              <div class="">
                                <h5 class="font-medium group-hover:text-brand-red transition-colors">
                                  {article.title}
                                </h5>
                                <p class="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
                                  {article.shortDescription}
                                </p>
                              </div>
                       
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Splitter />
      <CTASection
        buttonLink="/kontakt"
        buttonText="Kontakt os i dag"
        description="Hvis du har en kommentar eller et forslag, skal du ikke tøve med at kontakte os!"
        title="Har du spørgsmål til artiklen?"
      />
      <Footer />
    </>
  );
};

export default ProjectPage;
