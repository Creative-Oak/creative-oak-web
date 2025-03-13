// islands/PortfolioIsland.tsx
import { useEffect, useState } from "preact/hooks";
import CategoryFilter from "./CategoryFilter.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";

interface PortfolioIslandProps {
  initialProjects: ProjectCardData[];
  allCategories: string[];
  initialActiveCategories: string[];
  // new: if you're passing the total from SSR
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
    initialLimit = 12,
  }: PortfolioIslandProps,
) {
  // Local state
  const [projects, setProjects] = useState<ProjectCardData[]>(initialProjects);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialActiveCategories,
  );
  const [hoveredProject, setHoveredProject] = useState<ProjectCardData | null>(
    null,
  );

  // For pagination
  const [limit, _setLimit] = useState(initialLimit);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [start, setStart] = useState(initialProjects.length); // next offset

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector(".custom-cursor") as HTMLElement;
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }

      // Check which project is under the cursor
      const projectElements = document.querySelectorAll(
        'a[href^="/projects/"]',
      );
      let foundProject = false;
      projectElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const projectSlug = element.getAttribute("href")?.replace(
            "/projects/",
            "",
          );
          const project = projects.find((p) => p.slug === projectSlug);
          if (project) {
            setHoveredProject(project);
            foundProject = true;
          }
        }
      });
      if (!foundProject) {
        setHoveredProject(null);
      }
    };

    const handleScroll = () => {
      const cursor = document.querySelector(".custom-cursor") as HTMLElement;
      if (cursor) {
        cursor.style.left = cursor.style.left;
        cursor.style.top = cursor.style.top;
      }

      // Check which project is under the cursor after scroll
      const projectElements = document.querySelectorAll(
        'a[href^="/projects/"]',
      );
      let foundProject = false;
      projectElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (cursor) {
          const cursorX = parseInt(cursor.style.left);
          const cursorY = parseInt(cursor.style.top);
          if (
            cursorX >= rect.left &&
            cursorX <= rect.right &&
            cursorY >= rect.top &&
            cursorY <= rect.bottom
          ) {
            const projectSlug = element.getAttribute("href")?.replace(
              "/projects/",
              "",
            );
            const project = projects.find((p) => p.slug === projectSlug);
            if (project) {
              setHoveredProject(project);
              foundProject = true;
            }
          }
        }
      });
      if (!foundProject) {
        setHoveredProject(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [projects]); // Add projects as dependency

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
      // If we're appending for "Load More", we combine with existing
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
    <section class="px-4 py-8 md:py-24">
      <CategoryFilter
        categories={allCategories}
        activeCategories={activeCategories}
        onToggleCategory={handleToggleCategory}
        onClearAll={handleClearAll}
      />

      {/* Project Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="custom-cursor fixed pointer-events-none z-50 bg-brand-white text-brand-black px-6 py-4 text-base font-bold font-lexend whitespace-nowrap -translate-x-1/2 -translate-y-1/2 border-2 border-brand-black shadow-custom-black"
          style={{ display: hoveredProject ? "block" : "none" }}
        >
          {hoveredProject?.title}
        </div>
        {projects.map((project) => (
          <a
            class={`border-2 border-brand-black hover:shadow-custom-black transition-shadow relative group ${
              hoveredProject ? "cursor-none" : "cursor-default"
            }`}
            href={"/projects/" + project.slug}
            key={project.slug}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <img
              src={project.featuredImageUrl}
              alt={project.title}
              class="w-full aspect-[5/4] object-cover"
            />
            <div class="absolute inset-0 flex flex-col justify-between p-6">
              <div class="flex items-start">
              </div>
              <div class="flex flex-wrap gap-2">
                {project.categories.map((cat) => (
                  <span class="text-xs px-2 py-1 border-brand-black border-2 shadow-custom-black bg-white">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* "Load More" button */}
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
