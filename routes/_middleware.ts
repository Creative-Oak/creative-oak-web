// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { fetchNavigation } from "../utils/fetchNavigation.ts";
import { State } from "../types/navbarItems.ts";


// Definér dine redirects her
const redirectMap = new Map([
  ["/en", "/"],

]);

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
): Promise<Response> {

  const baseUrl = Deno.env.get("BASE_URL") || "https://creativeoak.dk";
  const url = new URL(req.url);
  

  const redirect = redirectMap.get(url.pathname);
  
  if (redirect) {
    return new Response("", {
      status: 301, // eller 301 for permanent redirect
      headers: {
        "Location": redirect
      },
    });
  }

  if (url.hostname.startsWith('www.')) {
    const newUrl = new URL(req.url);
    newUrl.hostname = url.hostname.replace('www.', '');
    return new Response(null, {
      status: 301,
      headers: {
        'Location': newUrl.toString(),
      },
    });
  }

  // Get the navigation response
  const resp = await fetchNavigation(req, ctx);

  // Only modify HTML responses
  if (!resp.headers.get("content-type")?.includes("text/html")) {
    return resp;
  }


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