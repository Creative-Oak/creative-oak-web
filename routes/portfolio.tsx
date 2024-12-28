// routes/portfolio.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { client } from "../utils/sanity.ts";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../components/other/splitter.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";
import PortfolioIsland from "../islands/PortfolioIsland.tsx";
import { urlFor } from "../utils/imageBuild.ts";
import { Image } from "@sanity/types";

export const handler: Handlers<{
  projects: ProjectCardData[];
  categories: string[];
  activeCategories: string[];
  totalCount: number;
}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const categories = url.searchParams.getAll("category");

    // 1) Parse pagination params (with defaults)
    const startParam = url.searchParams.get("start");
    const limitParam = url.searchParams.get("limit");
    const start = startParam ? parseInt(startParam, 10) : 0;
    const limit = limitParam ? parseInt(limitParam, 10) : 3; // Show only 3 on SSR

    // 2) Create a count query for total results
    const countQuery = `
      count(
        *[_type == "project"]${
      categories.length > 0
        ? `[references(*[_type == "projectCategories" && title in $categories]._id)]`
        : ""
    }
      )
    `;

    // 3) Create a slice query for the actual projects
    const projectQuery = `
    *[_type == "project"]${
      categories.length > 0
        ? '[references(*[_type == "projectCategories" && title in $categories]._id)]'
        : ""
    }
    | order(isFeatured desc, releaseDate desc)
    [${start}..${start + limit - 1}] {
      title,
          "featuredImage": featuredImage,
        projectShortDescription,
        "slug": slug.current,
        "categories": categories[]->title
    }
  `;

    // 4) Fetch categories (unchanged)
    const categoriesQuery = `
      *[_type == "projectCategories"] | order(title asc) {
        title
      }
    `;

    try {
      // 5) Run queries in parallel
      const [projects, allCategories, totalCount] = await Promise.all([
        client.fetch(projectQuery, { categories }),
        client.fetch(categoriesQuery),
        client.fetch(countQuery, { categories }),
      ]);

      // 6) Convert each project to add an image URL
      const projectsWithUrls = projects.map((proj: ProjectCardData) => ({
        ...proj,
        featuredImageUrl: urlFor(proj.featuredImage as Image),
      }));

      // 7) Return data to the page
      return ctx.render({
        projects: projectsWithUrls,
        categories: allCategories.map((c: { title: string }) => c.title),
        activeCategories: categories,
        totalCount, // pass along the total
      });
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default function PortfolioRoute(
  { data }: PageProps<{
    projects: ProjectCardData[];
    categories: string[];
    activeCategories: string[];
    totalCount: number;
  }>,
) {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <HeroSection2
        title="Portfolio"
        description="Se nogle af de projekter vi har arbejdet på"
      />
      <Splitter />

      <PortfolioIsland
        initialProjects={data.projects}
        allCategories={data.categories}
        initialActiveCategories={data.activeCategories}
        initialTotalCount={data.totalCount}
        initialLimit={3} // match the default SSR limit
      />

      <Splitter />
      <Footer />
    </>
  );
}
