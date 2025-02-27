// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { fetchNavigation } from "../utils/fetchNavigation.ts";
import { State } from "../types/navbarItems.ts";

// Define your redirects here
const redirectMap = new Map([
  ["/en", "/"],
]);

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
): Promise<Response> {
  const baseUrl = Deno.env.get("BASE_URL") || "https://creativeoak.dk";
  const url = new URL(req.url);
  
  // Handle static assets caching (fonts, images, etc.)
  if (
    url.pathname.startsWith("/fonts/") || 
    url.pathname.endsWith(".ttf") || 
    url.pathname.endsWith(".woff") || 
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".avif") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg")
  ) {
    // Let the request continue to the next handler
    const resp = await ctx.next();
    
    // Add cache control headers to the response
    const headers = new Headers(resp.headers);
    // Cache for 1 year (31536000 seconds)
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    });
  }

  // Handle redirects
  const redirect = redirectMap.get(url.pathname);
  if (redirect) {
    return new Response("", {
      status: 301, // or 301 for permanent redirect
      headers: {
        "Location": redirect
      },
    });
  }

  // Handle www to non-www redirect
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

  // CSS and JS files - shorter cache time (1 month)
  if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    const resp = await ctx.next();
    const headers = new Headers(resp.headers);
    headers.set("Cache-Control", "public, max-age=2592000"); // 30 days
    
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
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