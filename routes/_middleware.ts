// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { fetchNavigation } from "../utils/fetchNavigation.ts";
import { State } from "../types/navbarItems.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
): Promise<Response> {
  // Get the navigation response
  const resp = await fetchNavigation(req, ctx);

  // Only modify HTML responses
  if (!resp.headers.get("content-type")?.includes("text/html")) {
    return resp;
  }

  const baseUrl = Deno.env.get("BASE_URL") || "https://creativeoak.deno.dev";
  const url = new URL(req.url);
  const canonicalUrl = `${baseUrl}${url.pathname}`;

  // Get the HTML content
  const html = await resp.text();

  // Check if canonical already exists
  if (!html.includes('rel="canonical"')) {
    // Add canonical link if it doesn't exist
    const newHtml = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );

    return new Response(newHtml, {
      status: resp.status,
      headers: {
        ...Object.fromEntries(resp.headers.entries()),
        "content-type": "text/html",
      },
    });
  }

  return new Response(html, {
    status: resp.status,
    headers: resp.headers,
  });
}