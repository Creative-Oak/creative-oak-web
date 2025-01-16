// routes/robots.txt.ts
import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const baseUrl = Deno.env.get("BASE_URL") || "https://creativeoak.dk";
  
  const robotsTxt = `# https://creativeoak.dk robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_frsh/
Disallow: /admin/
Disallow: /studio/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};