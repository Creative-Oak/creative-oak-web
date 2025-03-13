import { FreshContext } from "$fresh/server.ts";

import { client } from "../../utils/sanity.ts";


export const handler = async (req: Request, _ctx: FreshContext): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { slug, accessCode } = await req.json();


    // Query Sanity for gallery with matching slug and access code
    const query = `*[_type == "gallery" && slug.current == $slug && accessCode == $accessCode][0]`;

    const gallery = await client.fetch(query, { slug, accessCode });


    if (!gallery) {

      return new Response(JSON.stringify({ error: "Invalid access code" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if gallery has expired
    if (gallery.expiryDate && new Date(gallery.expiryDate) < new Date()) {

      return new Response(JSON.stringify({ error: "Gallery has expired" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }


    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error validating gallery access:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};