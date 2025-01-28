import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Splitter from "../components/other/splitter.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import { ArticleCardData } from "../types/ArticleCardData.ts";
import { client } from "../utils/sanity.ts";
import { urlFor } from "../utils/imageBuild.ts";
import { Image } from "@sanity/types";
import ArticleIsland from "../islands/ArticlesIsland.tsx";

export const handler: Handlers<{
    articles: ArticleCardData[];
    totalCount: number;
}> = {
    async GET(req, ctx) {
        const url = new URL(req.url);

        // 1) Parse pagination params (with defaults)
        const startParam = url.searchParams.get("start");
        const limitParam = url.searchParams.get("limit");
        const start = startParam ? parseInt(startParam, 10) : 0;
        const limit = limitParam ? parseInt(limitParam, 10) : 12; // Show only 3 on SSR

        // 2) Create a count query for total results
        const countQuery = `
        count(
          *[_type == "article"]
        )
      `;

        // 3) Create a slice query for the actual projects
        const projectQuery = `
      *[_type == "article"]
      | order(isFeatured desc, releaseDate desc)
      [${start}..${start + limit - 1}] {
        title,
            "featuredImage": featuredImage,
          shortDescription,
          "slug": slug.current,
      }
    `;

        try {
            // 5) Run queries in parallel
            const [articles, totalCount] = await Promise.all([
                client.fetch(projectQuery),
                client.fetch(countQuery),
            ]);

            // 6) Convert each project to add an image URL
            const projectsWithUrls = articles.map((proj: ArticleCardData) => ({
                ...proj,
                featuredImageUrl: urlFor(proj.featuredImage as Image),
            }));

            // 7) Return data to the page
            return ctx.render({
                articles: projectsWithUrls,  // Changed from "projects" to "articles"
                totalCount,
            });
        } catch (error) {
            console.error("Error fetching data from Sanity:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    },
};

const ArticlePage = ({ data }: PageProps<{
    articles: ArticleCardData[];
    totalCount: number;
}>) => {

    return (
        <>
            <Head>
                <title>Artikler</title>
            </Head>
            <HeroSection2
                title="Artikler"
                description="Læs med"
            />
            <Splitter />
            <ArticleIsland
                    initialProjects={data.articles}
                    initialTotalCount={data.totalCount}
                    initialLimit={12} // match the default SSR limit
                  />
            <CTASection
                buttonLink="/kontakt"
                buttonText="Kontakt os!"
                title="Få dine idéer med på listen!"
                description="Skriv hvis der er noget der har inspireret dig!"
            />
        </>
    );
};

export default ArticlePage;
