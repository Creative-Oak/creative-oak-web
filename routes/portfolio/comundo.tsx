import { Handlers } from "$fresh/server.ts";

// This page now redirects to the dynamic project page
export const handler: Handlers = {
  GET(_req, _ctx) {
    const headers = new Headers();
    headers.set("location", "/projects/comundo");
    return new Response(null, {
      status: 307, // Temporary redirect
      headers,
    });
  },
};
