import { client } from "../../utils/sanity.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import HeroSection2 from "../../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../../components/other/splitter.tsx";
import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";
import renderMainContent, { BlockContent } from "../../utils/renderText.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import CustomHead from "../../components/other/CustomHead.tsx";

interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  github?: string;
}

interface Employee {
  name: string;
  slug: string;
  position: string;
  pronouns?: string;
  profileImage: Image;
  bio?: BlockContent[];
  email: string;
  phoneNumber?: string;
  socialLinks: SocialLinks;
  projects?: {
    title: string;
    slug: string;
    projectShortDescription: string;
    featuredImage: Image;
  }[];
  articles?: {
    title: string;
    slug: string;
    shortDescription: string;
  }[];
}

export const handler: Handlers<{ employee: Employee }> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return new Response("Slug not provided", { status: 400 });
    }

    const employeeQuery = `
    *[_type == "employee" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      position,
      pronouns,
      profileImage,
      "bio": coalesce(bio[] {
        ...,
        _type,
        _key,
        style,
        children[] {
          ...,
          _type,
          text,
          marks,
          _key
        },
        asset,
        alt,
        caption,
        markDefs[] {
          _key,
          _type,
          href
        }
      }, null),
      email,
      phoneNumber,
      socialLinks,
      "projects": projects[]-> {
        title,
        "slug": slug.current,
        projectShortDescription,
        featuredImage
      },
      "articles": *[_type == "article" && author._ref == ^._id] {
        title,
        "slug": slug.current,
        shortDescription
      }
    }
  `;

    try {
      const employee = await client.fetch(employeeQuery, { slug });

      if (!employee) {
        return new Response("Employee not found", { status: 404 });
      }

      return ctx.render(employee);
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const EmployeePage = ({ data, url  }: PageProps<Employee>) => {

  const currentUrl = typeof window !== 'undefined' ? globalThis.location.href : url;

  return (
    <>
    <CustomHead 
      title={`${data.name} - ${data.position}`}
      imageUrl={urlFor(data.profileImage)}
      metaDescription={`${data.name} er ${data.position} ved Creative Oak. Kontakt: ${data.email}.`}
      url={currentUrl.toString()}
      ogType="profile"
    />
     
      <HeroSection2
        title={data.name}
        description={data.position}
      />
      <Splitter />

      <div class="container mx-auto px-4 sm:px-6 py-12">
        <div class="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div class="lg:w-2/3">
            <div class="prose max-w-none rich-text">
              {data.bio && data.bio.length > 0
                ? (
                  renderMainContent(data.bio)
                )
                : <p class="text-gray-600">No biography available.</p>}
            </div>

            {/* Articles Section for wider view */}
            {data.articles && data.articles.length > 0 && (
              <div class="mt-12">
                <h2 class="text-2xl font-semibold mb-6">Udvalgte Artikler</h2>
                <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {data.articles.map((article) => (
                    <a
                      href={`/articles/${article.slug}`}
                      class="block group bg-white p-6 hover:shadow-custom-black transition-shadow border-2 border-brand-black"
                      key={article.slug}
                    >
                      <h3 class="font-medium group-hover:text-brand-red transition-colors">
                        {article.title}
                      </h3>
                      <p class="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                        {article.shortDescription}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

                {/* Add Projects Section if they exist */}
      {data.projects && data.projects.length > 0 && (
        <div class="mt-12">
          <h2 class="text-2xl font-semibold mb-6">Projekter</h2>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            {data.projects.map((project) => (
              <a
                href={`/projects/${project.slug}`}
                class="block group bg-white hover:shadow-custom-black-400 border-2 border-brand-black transition-shadow"
                key={project.slug}
              >
                {project.featuredImage && (
                  <img
                    src={urlFor(project.featuredImage)}
                    alt={project.title}
                    class="w-full h-48 object-cover"
                  />
                )}
                <div class="p-6">
                <h3 class="font-medium group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <p class="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                  {project.projectShortDescription}
                </p>
                </div>
              </a>
              
            ))}
          </div>
        </div>
      )}

          </div>

          {/* Sidebar */}
          {/* Sidebar */}
          <div class="lg:w-1/3">
            <div class="sticky top-32">
              <div class="bg-white p-6 shadow-custom-black-400 border-2 border-brand-black">
                {/* Profile Image */}
                {data.profileImage && (
                  <img
                    src={urlFor(data.profileImage)}
                    alt={`Portrait of ${data.name}`}
                    class="w-full h-64 object-cover mb-6 border-2 border-brand-black shadow-custom-black"
                  />
                )}

                {/* Contact Info */}
                <div class="space-y-4">
                  {data.pronouns && (
                    <div>
                      <p class="text-sm text-gray-600">Pronouns</p>
                      <p class="font-medium">{data.pronouns}</p>
                    </div>
                  )}

                  <div>
                    <p class="text-sm text-gray-600">Email</p>
                    <a
                      href={`mailto:${data.email}`}
                      class="text-brand-red hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>

                  {data.phoneNumber && (
                    <div>
                      <p class="text-sm text-gray-600">Phone</p>
                      <a
                        href={`tel:${data.phoneNumber}`}
                        class="text-brand-red hover:underline"
                      >
                        {data.phoneNumber}
                      </a>
                    </div>
                  )}

                  {/* Social Links */}
                  {data.socialLinks && (
                    <div class="flex space-x-4 pt-4">
                      {data.socialLinks.linkedin && (
                        <a
                          href={data.socialLinks.linkedin}
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
                      {data.socialLinks.instagram && (
                        <a
                          href={data.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-gray-600 hover:text-pink-600"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                      {data.socialLinks.github && (
                        <a
                          href={data.socialLinks.github}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  

      <Splitter />
      <CTASection
        buttonLink={"mailto:" + data.email}
        buttonText={"Send en mail!"}
        description="Så tøv ikke med at skrive!"
        title={"Vil du snakke med " + data.name + "?"}
      />
      <Footer />
    </>
  );
};

export default EmployeePage;
