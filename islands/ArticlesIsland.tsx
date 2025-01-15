// islands/PortfolioIsland.tsx
import { useState } from "preact/hooks";
import { ArticleCardData } from "../types/ArticleCardData.ts";

interface ArticleIslandProps {
  initialProjects: ArticleCardData[];

  // new: if you’re passing the total from SSR
  initialTotalCount?: number;
  // how many items are loaded per page
  initialLimit?: number;
}

export default function PortfolioIsland(
  {
    initialProjects,
    initialTotalCount = 0, // fallback
    initialLimit = 12,
  }: ArticleIslandProps,
) {


  // Local state
  const [projects, setProjects] = useState<ArticleCardData[]>(initialProjects);
  
  // For pagination
  const [limit, _setLimit] = useState(initialLimit);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [start, setStart] = useState(initialProjects.length); // next offset

  // Helper function to fetch updated data from our JSON endpoint
  async function fetchUpdatedData(
    newStart = 0,
    newLimit = limit,
    // do you want to replace or append?
    append = false,
  ) {
    const params = new URLSearchParams();

    // pagination
    params.set("start", newStart.toString());
    params.set("limit", newLimit.toString());

    try {
      const res = await fetch(`/api/article?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const json = await res.json();
      // If we're appending for “Load More”, we combine with existing
      if (append) {
        setProjects((prev) => [...prev, ...json.projects]);
      } else {
        setProjects(json.projects);
      }

      // Update active categories, totalCount, offset
      setTotalCount(json.totalCount);

      // If we replaced the array (like filtering), offset should be the new length
      // If we appended, offset should increment by the batch size
      if (append) {
        setStart((prev) => prev + json.projects.length);
      } else {
        setStart(json.projects.length);
      }
    } catch (error) {
      console.error("Error fetching updated portfolio data:", error);
    }
  }


  // Load more button handler
  function handleLoadMore() {
    fetchUpdatedData( start, limit, true);
  }

  return (
    <section class="container py-12 md:py-24">
     

      {/* Project Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <a
            class="border-2 border-brand-black hover:shadow-custom-black transition-shadow"
            href={"/articles/" + project.slug}
            key={project.slug}
          >
            <img
              src={project.featuredImageUrl}
              alt={project.title}
              class="w-full h-80 object-cover"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold">{project.title}</h2>
              <p class="text-gray-600 mt-2">{project.shortDescription}</p>
             
            </div>
          </a>
        ))}
      </div>

      {/* “Load More” button */}
      {start < totalCount && (
        <div class="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            class="px-4 py-2 border-2  border-brand-black hover:shadow-custom-black transition-shadow"
          >
            Se flere
          </button>
        </div>
      )}
    </section>
  );
}
