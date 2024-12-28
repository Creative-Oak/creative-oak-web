// islands/PortfolioIsland.tsx
import { useState } from "preact/hooks";
import CategoryFilter from "./CategoryFilter.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";

interface PortfolioIslandProps {
  initialProjects: ProjectCardData[];
  allCategories: string[];
  initialActiveCategories: string[];
  // new: if you’re passing the total from SSR
  initialTotalCount?: number;
  // how many items are loaded per page
  initialLimit?: number;
}

export default function PortfolioIsland(
  {
    initialProjects,
    allCategories,
    initialActiveCategories,
    initialTotalCount = 0, // fallback
    initialLimit = 3,
  }: PortfolioIslandProps,
) {
  // Local state
  const [projects, setProjects] = useState<ProjectCardData[]>(initialProjects);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialActiveCategories,
  );

  // For pagination
  const [limit, _setLimit] = useState(initialLimit);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [start, setStart] = useState(initialProjects.length); // next offset

  // Helper function to fetch updated data from our JSON endpoint
  async function fetchUpdatedData(
    selectedCategories: string[],
    newStart = 0,
    newLimit = limit,
    // do you want to replace or append?
    append = false,
  ) {
    const params = new URLSearchParams();
    // categories
    selectedCategories.forEach((cat) => params.append("category", cat));
    // pagination
    params.set("start", newStart.toString());
    params.set("limit", newLimit.toString());

    try {
      const res = await fetch(`/api/portfolio?${params.toString()}`);
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
      setActiveCategories(json.activeCategories);
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

  // Toggle or add a category filter
  function handleToggleCategory(category: string) {
    if (activeCategories.includes(category)) {
      // remove category
      const newSelected = activeCategories.filter((c) => c !== category);
      fetchUpdatedData(newSelected);
    } else {
      // add category
      const newSelected = [...activeCategories, category];
      fetchUpdatedData(newSelected);
    }
  }

  // Clear all filters
  function handleClearAll() {
    fetchUpdatedData([]);
  }

  // Load more button handler
  function handleLoadMore() {
    fetchUpdatedData(activeCategories, start, limit, true);
  }

  return (
    <section class="container md:py-24">
      <CategoryFilter
        categories={allCategories}
        activeCategories={activeCategories}
        onToggleCategory={handleToggleCategory}
        onClearAll={handleClearAll}
      />

      {/* Project Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <a
            class="border-2 border-brand-black hover:shadow-custom-black transition-shadow"
            href={"/projects/" + project.slug}
            key={project.slug}
          >
            <img
              src={project.featuredImageUrl}
              alt={project.title}
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold">{project.title}</h2>
              <p class="text-gray-600">{project.projectShortDescription}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                {project.categories.map((cat) => (
                  <span
                    class="text-xs px-2 py-1 border-brand-black border-2 shadow-custom-black"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* “Load More” button */}
      {start < totalCount && (
        <div class="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            class="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
