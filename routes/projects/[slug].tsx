import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import HeroSection2 from "../../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../../components/other/splitter.tsx";
import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";
import renderMainContent from "../../utils/renderText.tsx";
import { BlockContent } from "../../utils/renderText.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";

interface Project {
  title: string;
  mainContent: BlockContent[];
  featuredImage: Image;
  projectShortDescription: string;
  categories: { title: string }[];
  releaseDate: string;
  isFeatured: boolean;
  primaryImageAltText: string;
  metaDescription: string;
  relatedProjects?: {
    title: string;
    slug: string;
    projectShortDescription: string;
    categories: string[];  // Added this line
  }[];
}
export const handler: Handlers<{ projects: Project }> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return new Response("Slug not provided", { status: 400 });
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
      "categories": categories[]->title,
      primaryImageAltText,
      metaDescription,
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
        return new Response("Project not found", { status: 404 });
      }

      return ctx.render(project);
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const ProjectPage = ({ data }: PageProps<Project>) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.metaDescription} />
      </Head>
      <HeroSection2
        title={data.title}
        description={data.projectShortDescription}
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
            <div class="space-yb-8">
              <div class="space-yb-4">
                <div class="flex flex-wrap items-center gap-2 mt-4">
                  {data.categories.map((category) => (
                    <span class="px-3 py-1 border-2 border-brand-black shadow-custom-black-400 text-sm">
                      {category}
                    </span>
                  ))}
                </div>
                <div class="flex items-center space-x-2 mt-4">
                  <span class="text-brand-black-500 text-sm">
                    {new Date(data.releaseDate).toLocaleDateString("dk-DK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div class="prose max-w-none rich-text">
                {renderMainContent(data.mainContent)}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div class="lg:w-1/3">
            <div class="sticky top-32">
              <div class="bg-white p-6 shadow-custom-black-400 border-2 border-brand-black">
                {/* Publication info */}
                <div class="mb-4">
                  <p class="text-sm text-gray-600">
                    Publiceret den{" "}
                    <span class="font-medium">
                      {new Date(data.releaseDate).toLocaleDateString("dk-DK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                {/* Related Projects */}
                {data.relatedProjects && data.relatedProjects.length > 0 && (
  <div class="border-t pt-4 mt-4">
    <h4 class="text-lg font-semibold mb-4">Læs også</h4>
    <div class="space-y-12">
      {data.relatedProjects.map((project) => (
        <a
          href={`/projects/${project.slug}`}
          class="block group"
          key={project.slug}
        >
          <div class="">
            <h5 class="font-medium group-hover:text-brand-red transition-colors">
              {project.title}
            </h5>
            <p class="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
              {project.projectShortDescription}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              {project.categories.map((category) => (
                <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {category}
                </span>
              ))}
            </div>
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

      <Splitter />
      <CTASection 
        buttonLink="/kontakt" 
        buttonText="Kontakt os i dag" 
        description="Skal du med på listen?" 
        title="Skal vi udfordre status que?" 
      />
      <Footer />
    </>
  );
};

export default ProjectPage;
