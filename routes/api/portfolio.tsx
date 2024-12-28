// routes/api/portfolio.ts
import { Handlers } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);

    // existing
    const categories = url.searchParams.getAll("category");

    // new: pagination params
    const startParam = url.searchParams.get("start");
    const limitParam = url.searchParams.get("limit");

    // convert to numbers (with fallback defaults: start=0, limit=6 for example)
    const start = startParam ? parseInt(startParam, 10) : 0;
    const limit = limitParam ? parseInt(limitParam, 10) : 3; 

    // We can limit the query from [start..(start+limit-1)]
    // e.g. [0..5] when start=0, limit=6
    const projectQuery = `
      *[_type == "project"]${
        categories.length > 0
          ? `[references(*[_type == "projectCategories" && title in $categories]._id)]`
          : ""
      } 
      | order(isFeatured desc, releaseDate desc)
      [${start}..${start + limit - 1}] {
        title,
        "featuredImage": featuredImage,
        "featuredImageUrl": featuredImage.asset->url,
        projectShortDescription,
        "slug": slug.current,
        "categories": categories[]->title
      }
    `;

    // get the total count of matching documents (without slicing)
    const countQuery = `
      count(
        *[_type == "project"]${
          categories.length > 0
            ? `[references(*[_type == "projectCategories" && title in $categories]._id)]`
            : ""
        }
      )
    `;

    const categoriesQuery = `*[_type == "projectCategories"] | order(title asc) {
      title
    }`;

    try {
      // fetch the projects, categories, and total count
      const [projects, allCategories, totalCount] = await Promise.all([
        client.fetch(projectQuery, { categories }),
        client.fetch(categoriesQuery),
        client.fetch(countQuery, { categories }),
      ]);

      return new Response(
        JSON.stringify({
          projects,
          allCategories: allCategories.map((c: { title: string }) => c.title),
          activeCategories: categories,
          totalCount,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default handler;
