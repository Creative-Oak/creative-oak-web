// utils/route-scanner.ts
import { walk } from "https://deno.land/std/fs/mod.ts";

export async function scanRoutes(routesDir: string = "./routes"): Promise<string[]> {
  const routes: string[] = [];
  
  for await (const entry of walk(routesDir, {
    includeDirs: false,
    exts: [".tsx", ".ts", ".jsx", ".js"],
  })) {
    // Skip dynamic route files (containing square brackets)
    if (entry.path.includes("[") || entry.path.includes("]")) {
      continue;
    }
    
    // Skip special routes and api routes
    if (
      entry.path.includes("/_") ||
      entry.path.includes("/api/") ||
      entry.path.includes("sitemap.xml") ||
      entry.path.includes("robots.txt")
    ) {
      continue;
    }

    // Remove the complete routes directory path and leading slash
    let path = entry.path
      .replace(/(^|.*?)routes\//, "") // Remove routes directory and everything before it
      .replace(/\.[^/.]+$/, "") // Remove file extension
      .replace(/\/index$/, ""); // Remove index
    
    // Clean up the path
    path = path.replace(/^\//, ""); // Remove leading slash
    if (path) {
      routes.push(path);
    } else {
      routes.push(""); // Root route
    }
  }
  
  return routes;
}