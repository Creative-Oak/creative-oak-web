// islands/PortfolioIsland.tsx
import { useEffect, useRef, useState } from "preact/hooks";
import CategoryFilter from "./CategoryFilter.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";
import Splitter from "../components/other/splitter.tsx";

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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [titlePosition, setTitlePosition] = useState({ x: 0, y: 0 });
  // New state for tracking current project in view - initialize with first project if available
  const [currentProjectInView, setCurrentProjectInView] = useState<
    string | null
  >(initialProjects.length > 0 ? initialProjects[0].slug : null);
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  // State to track if a card is visible (above the title bar)
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  // NEW: State to track if device supports touch
  const [isTouch, setIsTouch] = useState(false);

  // Refs for scrolling titles
  const titleScrollRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // For pagination
  const [limit, _setLimit] = useState(initialLimit);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [start, setStart] = useState(initialProjects.length); // next offset

  // Check if we're on mobile and update the state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check for mobile
    checkMobile();

    // Check for touch support
    setIsTouch("ontouchstart" in window);

    // Add listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Update visibility of cards based on scroll position and handle sticky state
  useEffect(() => {
    if (!isMobile) return;

    // Define CSS to inject for the title bar's pseudo-element
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .title-bar-mobile {
        position: sticky;
        top: 80px; /* Reduced from 112px to 80px (2rem higher) */
        transition: margin 0.2s ease, padding 0.2s ease, width 0.2s ease, border 0.2s ease;
        /* Hide scrollbar for all browsers */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        border-bottom: 0px solid transparent; /* Initially no border */
      }
      /* Hide scrollbar for Chrome, Safari and Opera */
      .title-bar-mobile::-webkit-scrollbar {
        display: none;
      }
      
      /* Background element behind title bar */
      .title-bar-mobile::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100%;
        height: 0;
        background-color: white;
        transition: height 0.25s ease-out;
        z-index: -1;
      }

      /* Full-width bottom border element */
      .title-bar-mobile .border-line {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 2px;
        background-color: #000;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
      }
      
      .title-bar-mobile.is-sticky {
        /* Keep original width instead of expanding to full width */
        padding-left: 1rem;
        padding-right: 1rem;
      }
      
      .title-bar-mobile.is-sticky .border-line {
        opacity: 1;
      }
      
      .title-bar-mobile.is-sticky::before {
        height: 80px; /* Reduced from 112px to 80px */
      }
      
      /* Masking element to cover content that would scroll behind the title bar */
      .title-bar-mobile::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--title-bar-bottom, 160px);
        background-color: white;
        z-index: -1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      .title-bar-mobile.is-sticky::after {
        opacity: 1;
      }
      
      /* Title button styles */
      .title-button {
        font-family: 'Lexend', sans-serif;
        font-weight: 700; /* Bold font weight */
        font-size: 1.125rem; /* Larger font size */
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        max-width: 80%; /* Reduce from 100% to 80% to encourage animation */
        text-align: left;
        padding-left: 0 !important; /* Remove left padding */
        padding-right: 0 !important; /* Remove right padding */
        display: inline-block; /* Ensure the element respects max-width */
      }
      
      /* Force scrolling animation for ALL titles regardless of length */
      .title-button span {
        display: inline-block;
        padding-right: 0; /* Remove right padding from span */
        position: relative;
        padding-left: 0; /* Ensure no left padding on the span */
      }
      
      /* Animation for long titles - back and forth motion */
      @keyframes titleScroll {
        0%, 10% { transform: translateX(0); } /* Start with a pause */
        45% { transform: translateX(var(--scroll-amount, -100px)); } /* Use custom scroll amount */
        55% { transform: translateX(var(--scroll-amount, -100px)); } /* Pause at the end */
        90%, 100% { transform: translateX(0); } /* Scroll back to start */
      }
      
      /* Only apply animation if text is too long AND the title is active */
      .title-button.animate-title.active span {
        animation: titleScroll 6s ease-in-out infinite; /* Faster animation (was 10s) */
      }
    `;
    document.head.appendChild(styleEl);

    // Calculate title bar height once
    const titleBarHeight = titleScrollRef.current?.offsetHeight || 0;
    const titleBarBottom = 80 + titleBarHeight;

    // Create a CSS variable for title bar height for use in styling
    document.documentElement.style.setProperty(
      "--title-bar-height",
      `${titleBarHeight}px`,
    );
    document.documentElement.style.setProperty(
      "--title-bar-bottom",
      `${titleBarBottom}px`,
    );

    // Track if title bar is in sticky state
    const checkStickyState = () => {
      if (titleScrollRef.current) {
        // Get the original position of the title bar relative to the document
        const titleBarPos = titleScrollRef.current.getBoundingClientRect().top +
          window.scrollY;

        // It's truly sticky when we've scrolled past its original position + a small buffer
        // The 5px buffer helps ensure it only happens when it's fully sticky
        const isSticky = window.scrollY >= (titleBarPos - 80 - 5);

        titleScrollRef.current.classList.toggle("is-sticky", isSticky);
      }
    };

    const updateCardVisibility = () => {
      const newVisibleCards: Record<string, boolean> = {};

      checkStickyState(); // Check sticky state when scrolling

      projects.forEach((project) => {
        const element = document.querySelector(
          `a[href="/projects/${project.slug}"]`,
        );
        if (element) {
          const rect = element.getBoundingClientRect();

          // Allow more of the card to scroll up before hiding
          // Only hide when the bottom of the card is above the titlebar
          // Or always show the currently selected card
          newVisibleCards[project.slug] =
            (rect.bottom > titleBarBottom - (titleBarHeight * 0.8)) || // Show until most of the card is scrolled past
            project.slug === currentProjectInView; // Always show current card
        } else {
          newVisibleCards[project.slug] = true; // Default to visible if element not found
        }
      });

      setVisibleCards(newVisibleCards);
    };

    // Initial update
    updateCardVisibility();

    // Add scroll listener
    window.addEventListener("scroll", updateCardVisibility);

    return () => {
      window.removeEventListener("scroll", updateCardVisibility);
      // Remove the style element when component unmounts
      document.head.removeChild(styleEl);
    };
  }, [isMobile, projects, currentProjectInView]);

  // Check for long titles and apply marquee effect
  useEffect(() => {
    if (!isMobile) return;

    // Run it on a timer to ensure DOM is ready
    const checkTitleWidths = () => {
      // Get all title buttons
      projects.forEach((project) => {
        const buttonRef = titleRefs.current[project.slug];
        if (!buttonRef) return;

        const textEl = buttonRef.querySelector("span");
        if (!textEl) return;

        // Direct DOM measurement - more reliable
        const textWidth = textEl.getBoundingClientRect().width;
        const containerWidth = buttonRef.getBoundingClientRect().width;

        // For all titles, check if they're long and mark them
        if (textWidth > containerWidth - 10) { // Small buffer
          buttonRef.classList.add("animate-title");

          // Get computed styles to account for padding
          const computedStyle = window.getComputedStyle(buttonRef);
          const paddingLeft = parseFloat(computedStyle.paddingLeft);
          const paddingRight = parseFloat(computedStyle.paddingRight);

          // Calculate how far to translate based on visible content area only
          // Subtract padding from container width to get the actual visible content area
          const visibleWidth = containerWidth - (paddingLeft + paddingRight);

          // Calculate the minimum scroll needed to make the final word visible
          // Only scroll as far as needed to see the end of text within the visible area
          const translateAmount = Math.min(
            textWidth - visibleWidth, // Only scroll enough to make the last word visible
            textWidth - (visibleWidth * 0.8), // Or scroll to show the last 80% of content for shorter titles
          );

          // Create custom property for this specific title
          buttonRef.style.setProperty(
            "--scroll-amount",
            `-${translateAmount}px`,
          );
        } else {
          buttonRef.classList.remove("animate-title");
        }

        // Also add or remove 'active' class based on current project in view
        if (project.slug === currentProjectInView) {
          buttonRef.classList.add("active");
        } else {
          buttonRef.classList.remove("active");
        }
      });
    };

    // Initial check after a delay to ensure rendering
    const timer = setTimeout(checkTitleWidths, 500);

    // Also check when window resizes or current project changes
    window.addEventListener("resize", checkTitleWidths);

    // Re-run when current project changes
    checkTitleWidths();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkTitleWidths);
    };
  }, [isMobile, projects, currentProjectInView]);

  // Set up intersection observer for project cards with adjusted threshold for mobile
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const isMobile = window.innerWidth < 768;

    const options = {
      root: null,
      rootMargin: isMobile ? "0px 0px -30% 0px" : "0px", // Adjust rootMargin for mobile to account for the title bar
      threshold: isMobile ? 0.4 : 0.6, // Lower threshold on mobile
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectSlug = entry.target.getAttribute("href")?.replace(
            "/projects/",
            "",
          );
          if (projectSlug) {
            setCurrentProjectInView(projectSlug);

            // Center the title in the title bar
            centerActiveTitle(projectSlug);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe all project cards
    const projectElements = document.querySelectorAll('a[href^="/projects/"]');
    projectElements.forEach((element) => {
      observer.observe(element);
    });

    // On initial load, make sure the first title is centered in the title bar
    if (
      initialProjects.length > 0 &&
      titleRefs.current[initialProjects[0].slug] && titleScrollRef.current
    ) {
      setTimeout(() => {
        centerActiveTitle(initialProjects[0].slug);
      }, 300);
    }

    return () => {
      observer.disconnect();
    };
  }, [projects, initialProjects]); // Re-run when projects change

  // Function to center the active title in the title bar
  const centerActiveTitle = (slug: string) => {
    if (!titleScrollRef.current || !titleRefs.current[slug]) return;

    const titleBar = titleScrollRef.current;
    const titleButton = titleRefs.current[slug];

    // Get the width of the title bar
    const titleBarWidth = titleBar.offsetWidth;

    // Reset any previous dynamic padding (which might interfere with max-width)
    titleBar.style.paddingLeft = "";
    titleBar.style.paddingRight = "";

    // Get position and dimensions
    const titleButtonLeft = titleButton.offsetLeft;
    const titleButtonWidth = titleButton.offsetWidth;

    // Calculate the scroll position to center the title button in all cases
    let scrollLeft = titleButtonLeft - (titleBarWidth / 2) +
      (titleButtonWidth / 2);

    // Ensure we don't scroll past boundaries
    const maxScrollLeft = titleBar.scrollWidth - titleBarWidth;
    scrollLeft = Math.max(0, Math.min(scrollLeft, maxScrollLeft));

    // Special handling for first title when it's at the very beginning
    if (slug === projects[0]?.slug && titleButtonLeft <= 10) {
      // Use 0 as scroll position for first title
      scrollLeft = 0;
    }

    // Special handling for last title when it's at the very end
    if (
      slug === projects[projects.length - 1]?.slug &&
      titleButtonLeft + titleButtonWidth >= titleBar.scrollWidth - 10
    ) {
      // Scroll all the way to the end for last title
      scrollLeft = maxScrollLeft;
    }

    // Scroll the title bar to center the title button
    titleBar.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  // Make sure to call centerActiveTitle when current project changes
  useEffect(() => {
    if (currentProjectInView && isMobile) {
      centerActiveTitle(currentProjectInView);
    }
  }, [currentProjectInView, isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // When we first hover, set the initial title position to match cursor
      if (!hoveredProject) {
        setTitlePosition({ x: e.clientX, y: e.clientY });
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
      // Check which project is under the cursor after scroll
      const projectElements = document.querySelectorAll(
        'a[href^="/projects/"]',
      );
      let foundProject = false;
      projectElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          cursorPosition.x >= rect.left &&
          cursorPosition.x <= rect.right &&
          cursorPosition.y >= rect.top &&
          cursorPosition.y <= rect.bottom
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [projects, cursorPosition]); // Remove hoveredProject from dependencies

  // Separate useEffect for animation to prevent recreation of animation loop
  useEffect(() => {
    let animationId: number;

    const animateTitle = () => {
      if (hoveredProject) {
        setTitlePosition((prev) => ({
          x: prev.x + ((cursorPosition.x + 16) - prev.x) * 0.2, // Add 1rem (16px) to x position
          y: prev.y + ((cursorPosition.y + 16) - prev.y) * 0.2, // Add 1rem (16px) to y position
        }));
        animationId = requestAnimationFrame(animateTitle);
      }
    };

    if (hoveredProject) {
      // Start animation
      animationId = requestAnimationFrame(animateTitle);
    }

    return () => {
      // Clean up animation on component unmount or when hoveredProject changes
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [hoveredProject, cursorPosition]);

  // Function to scroll to a specific project when clicking a title
  const scrollToProject = (slug: string) => {
    const projectElement = document.querySelector(
      `a[href="/projects/${slug}"]`,
    );
    if (projectElement) {
      // First scroll the element into view
      projectElement.scrollIntoView({ behavior: "smooth" });

      // Then adjust the scroll position for mobile to create space beneath title bar
      if (window.innerWidth < 768) { // Only on mobile (md breakpoint is 768px)
        setTimeout(() => {
          // Get title bar height including padding (positioned at 80px from top)
          const titleBarHeight = titleScrollRef.current?.offsetHeight || 0;
          const scrollPosition = projectElement.getBoundingClientRect().top +
            window.pageYOffset;

          // Position the element 1svh below the bottom of the title bar
          // 80px is the top position, titleBarHeight is the height of the bar, 1svh is the desired gap
          const targetPosition = scrollPosition -
            (80 + titleBarHeight + (window.innerHeight * 0.01));

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 100); // Small delay to let the initial scroll complete
      }
    }
  };

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
    <>
      {/* Section 1: Category Filter */}
      <section class="px-4 py-8 md:py-24">
        <CategoryFilter
          categories={allCategories}
          activeCategories={activeCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearAll}
        />
      </section>

      {/* Section 2: Mobile Title Bar and Splitter */}
      <div class="md:hidden sticky top-[80px] z-20 bg-white">
        {/* Title bar with padding */}
        <div
          ref={titleScrollRef}
          class="overflow-x-auto whitespace-nowrap py-4 px-4 title-bar-mobile"
          style={{ boxSizing: "border-box" }}
        >
          {projects.map((project) => (
            <button
              key={`title-${project.slug}`}
              ref={(el) => {
                titleRefs.current[project.slug] = el;
              }}
              onClick={() => scrollToProject(project.slug)}
              class={`py-2 px-0 mr-8 last:mr-0 transition-colors title-button ${
                currentProjectInView === project.slug
                  ? "text-brand-black"
                  : "text-gray-400"
              }`}
            >
              <span>{project.title}</span>
            </button>
          ))}
        </div>

        {/* Full-width Splitter (no padding) */}
        <Splitter />
      </div>

      {/* Section 3: Project Grid */}
      <section class="px-4 pb-8 mt-4 md:pb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom cursor - only shown on desktop with mouse */}
          {!isMobile && !isTouch && (
            <div
              class="custom-cursor fixed pointer-events-none z-50 bg-brand-white text-brand-black px-6 py-4 text-2xl font-bold font-lexend border-2 border-brand-black shadow-custom-black"
              style={{
                display: hoveredProject ? "block" : "none",
                left: `${titlePosition.x}px`,
                top: `${titlePosition.y}px`,
                maxWidth: "40vw",
                wordWrap: "break-word",
              }}
            >
              {hoveredProject?.title}
            </div>
          )}
          {projects.map((project) => (
            <a
              class="border-2 border-brand-black hover:shadow-custom-black transition-shadow relative group"
              href={"/projects/" + project.slug}
              key={project.slug}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                // Only hide completely on mobile if not in view
                opacity: isMobile ? (visibleCards[project.slug] ? 1 : 0) : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <div class="md:h-auto h-[70svh] relative">
                <img
                  src={project.featuredImageUrl}
                  alt={project.title}
                  class="w-full h-full md:aspect-[5/4] md:h-auto object-cover"
                />
                <div class="absolute inset-0 flex flex-col justify-between p-6">
                  <div class="flex items-start">
                    {/* Title for tablets (touch devices that aren't mobile) */}
                    {isTouch && !isMobile && (
                      <h3 class="text-xl font-bold font-lexend bg-brand-white text-brand-black px-3 py-1 border-2 border-brand-black shadow-custom-black">
                        {project.title}
                      </h3>
                    )}
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span class="text-xs px-2 py-1 border-brand-black border-2 shadow-custom-black bg-white">
                        {cat}
                      </span>
                    ))}
                  </div>
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
    </>
  );
}
