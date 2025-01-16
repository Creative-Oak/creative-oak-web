import { HandlerContext } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";
import { scanRoutes } from "../utils/route-scanner.ts";

interface SanityDocument {
  slug: string;
  _updatedAt: string;
}

interface RouteConfig {
  path: string;
  changefreq: string;
  priority: number;
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const baseUrl = Deno.env.get("BASE_URL") || "https://creativeoak.dk";
  
  // Scan routes directory
  const scannedRoutes = await scanRoutes();
  
  // Configure priority and change frequency for different route types
  const routeConfigs: Record<string, RouteConfig> = {
    "": { path: "", changefreq: "daily", priority: 1.0 }, // Home page
    "about": { path: "about", changefreq: "monthly", priority: 0.8 },
    "om-os": { path: "om-os", changefreq: "monthly", priority: 0.8 },
  };

  // Fetch all content types from Sanity
  const [articles, employees, projects] = await Promise.all([
    client.fetch<SanityDocument[]>(`
      *[_type == "article"] {
        "slug": slug.current,
        _updatedAt
      }
    `),
    client.fetch<SanityDocument[]>(`
      *[_type == "employee"] {
        "slug": slug.current,
        _updatedAt
      }
    `),
    client.fetch<SanityDocument[]>(`
      *[_type == "project"] {
        "slug": slug.current,
        _updatedAt
      }
    `)
  ]);

  // Function to generate URL entry
  const generateUrlEntry = (path: string, lastmod?: string, config?: Partial<RouteConfig>) => {
    const defaultConfig = {
      changefreq: "weekly",
      priority: 0.5,
    };
    const finalConfig = { ...defaultConfig, ...config };
    
    return `
  <url>
    <loc>${baseUrl}${path ? `/${path}` : ""}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${finalConfig.changefreq}</changefreq>
    <priority>${finalConfig.priority}</priority>
  </url>`;
  };

  // Create the XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Scanned Routes -->
  ${scannedRoutes
    .map(route => generateUrlEntry(route, undefined, routeConfigs[route]))
    .join("")}
    
  <!-- Articles from Sanity -->
  ${articles.map((article) => 
    generateUrlEntry(
      `articles/${article.slug}`, 
      new Date(article._updatedAt).toISOString(),
      { changefreq: "weekly", priority: 0.7 }
    )
  ).join("")}

  <!-- Employees from Sanity -->
  ${employees.map((employee) => 
    generateUrlEntry(
      `employee/${employee.slug}`, 
      new Date(employee._updatedAt).toISOString(),
      { changefreq: "monthly", priority: 0.6 }
    )
  ).join("")}

  <!-- Projects from Sanity -->
  ${projects.map((project) => 
    generateUrlEntry(
      `projects/${project.slug}`, 
      new Date(project._updatedAt).toISOString(),
      { changefreq: "weekly", priority: 0.7 }
    )
  ).join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};