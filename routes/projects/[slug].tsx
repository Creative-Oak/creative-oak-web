import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import HeroSection2 from "../../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../../components/other/splitter.tsx";
import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";

interface BlockContent {
  children?: { text: string }[];
  asset?: Image;
  alt?: string;
  caption?: string;
}

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
        metaDescription
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
    console.log(data.categories)
  const renderMainContent = (mainContent: BlockContent[]) => {
    return mainContent.map((block, index) => (
      <div key={index} class="mb-8">
        {block.children?.map((child, idx) => (
          <p key={idx} class="text-gray-700 leading-relaxed mb-4">
            {child.text}
          </p>
        ))}
        {block.asset && (
          <div class="my-6">
            <img
              src={urlFor(block.asset)}
              alt={block.alt || "Image"}
              class="w-full h-auto object-cover"
            />
            {block.caption && (
              <p class="text-sm text-gray-600 italic mt-2">
                {block.caption}
              </p>
            )}
          </div>
        )}
      </div>
    ));
  };

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
      <section class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div class="space-y-8">
          {data.featuredImage && (
            <div class="aspect-video w-full">
              <img
                src={urlFor(data.featuredImage)}
                alt={data.primaryImageAltText}
                class="w-full h-full object-cover"
              />
            </div>
          )}
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
     
              <span class="text-gray-800">
              {new Date(data.releaseDate).toLocaleDateString('dk-DK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
         
              {data.categories.map((category) => (
                <span class="px-3 py-1 border-2 border-brand-black shadow-custom-black-400 text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div class="prose max-w-none">
            {renderMainContent(data.mainContent)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectPage;
