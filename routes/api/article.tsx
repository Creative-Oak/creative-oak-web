// routes/api/portfolio.ts
import { Handlers } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);


    // new: pagination params
    const startParam = url.searchParams.get("start");
    const limitParam = url.searchParams.get("limit");

    // convert to numbers (with fallback defaults: start=0, limit=6 for example)
    const start = startParam ? parseInt(startParam, 10) : 0;
    const limit = limitParam ? parseInt(limitParam, 10) : 12; 

    // We can limit the query from [start..(start+limit-1)]
    // e.g. [0..5] when start=0, limit=6
    const articleQuery = `
      *[_type == "article"]
      | order(isFeatured desc, releaseDate desc)
      [${start}..${start + limit - 1}] {
        title,
        "featuredImage": featuredImage,
        "featuredImageUrl": featuredImage.asset->url,
        ShortDescription,
        "slug": slug.current,
        "categories": categories[]->title
      }
    `;

    // get the total count of matching documents (without slicing)
    const countQuery = `
      count(
        *[_type == "project"]
      )
    `;

   
    try {
      // fetch the projects, categories, and total count
      const [projects, totalCount] = await Promise.all([
        client.fetch(articleQuery),
        client.fetch(countQuery),
      ]);

      return new Response(
        JSON.stringify({
          projects,
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
