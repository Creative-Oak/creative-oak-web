import { useEffect, useRef, useState } from "preact/hooks";
import PrimaryButton from "../components/other/PrimaryButton.tsx";
import PortfolioCard from "../components/other/PortfolioCard.tsx";
import { ProjectCardData } from "../types/projectCardData.ts";

interface PortfolioSectionProps {
  teaser: string;
  title: string;
  projects: ProjectCardData[];
}

const PortfolioSection = (props: PortfolioSectionProps) => {
  // State for mobile functionality
  const [isMobile, setIsMobile] = useState(false);
  const [currentProjectInView, setCurrentProjectInView] = useState<string | null>(
    props.projects.length > 0 ? props.projects[0].slug : null
  );
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [isTouch, setIsTouch] = useState(false);

  // Refs for scrolling titles
  const titleScrollRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Check if we're on mobile and update the state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(globalThis.innerWidth < 768);
    };

    // Initial check for mobile
    checkMobile();

    // Check for touch support
    setIsTouch("ontouchstart" in window);

    // Add listener for window resize
    globalThis.addEventListener("resize", checkMobile);

    return () => {
      globalThis.removeEventListener("resize", checkMobile);
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
        top: 80px;
        transition: margin 0.2s ease, padding 0.2s ease, width 0.2s ease, border 0.2s ease;
        scrollbar-width: none;
        -ms-overflow-style: none;
        border-bottom: 0px solid transparent;
      }
      .title-bar-mobile::-webkit-scrollbar {
        display: none;
      }
      
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
        padding-left: 1rem;
        padding-right: 1rem;
      }
      
      .title-bar-mobile.is-sticky .border-line {
        opacity: 1;
      }
      
      .title-bar-mobile.is-sticky::before {
        height: 80px;
      }
      
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
      
      .title-button {
        font-family: 'Lexend', sans-serif;
        font-weight: 700;
        font-size: 1.125rem;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        max-width: 80%;
        text-align: left;
        padding-left: 0 !important;
        padding-right: 0 !important;
        display: inline-block;
      }
      
      .title-button span {
        display: inline-block;
        padding-right: 0;
        position: relative;
        padding-left: 0;
      }
      
      @keyframes titleScroll {
        0%, 10% { transform: translateX(0); }
        45% { transform: translateX(var(--scroll-amount, -100px)); }
        55% { transform: translateX(var(--scroll-amount, -100px)); }
        90%, 100% { transform: translateX(0); }
      }
      
      .title-button.animate-title.active span {
        animation: titleScroll 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);

    // Calculate title bar height once
    const titleBarHeight = titleScrollRef.current?.offsetHeight || 0;
    const titleBarBottom = 80 + titleBarHeight;

    document.documentElement.style.setProperty(
      "--title-bar-height",
      `${titleBarHeight}px`
    );
    document.documentElement.style.setProperty(
      "--title-bar-bottom",
      `${titleBarBottom}px`
    );

    const checkStickyState = () => {
      if (titleScrollRef.current) {
        const titleBarPos = titleScrollRef.current.getBoundingClientRect().top +
          globalThis.scrollY;
        const isSticky = globalThis.scrollY >= (titleBarPos - 80 - 5);
        titleScrollRef.current.classList.toggle("is-sticky", isSticky);
      }
    };

    const updateCardVisibility = () => {
      const newVisibleCards: Record<string, boolean> = {};
      checkStickyState();

      props.projects.forEach((project) => {
        const element = document.querySelector(
          `a[href="/projects/${project.slug}"]`
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          newVisibleCards[project.slug] =
            (rect.bottom > titleBarBottom - (titleBarHeight * 0.8)) ||
            project.slug === currentProjectInView;
        } else {
          newVisibleCards[project.slug] = true;
        }
      });

      setVisibleCards(newVisibleCards);
    };

    updateCardVisibility();
    globalThis.addEventListener("scroll", updateCardVisibility);
    return () => {
      globalThis.removeEventListener("scroll", updateCardVisibility);
    };
  }, [isMobile, props.projects, currentProjectInView]);

  // Set up intersection observer for projects
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("href")?.split("/").pop();
            if (slug) {
              setCurrentProjectInView(slug);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    props.projects.forEach((project) => {
      const element = document.querySelector(
        `a[href="/projects/${project.slug}"]`
      );
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isMobile, props.projects]);

  const scrollToProject = (slug: string) => {
    const element = document.querySelector(`a[href="/projects/${slug}"]`);
    if (element) {
      const headerOffset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="portfolio-section bg-brand-blue">
      {/* Title section - contained */}
      <div className="container pt-12 pb-6 md:pt-12 md:pb-12">
        <div className="pb-2">
          <p>{props.teaser}</p>
        </div>
        <div className="text-4xl font-medium text-brand-white font-lexend">
          <h2>{props.title}</h2>
        </div>
      </div>

      {/* Section 2: Mobile Title Bar */}
      {isMobile && (
        <div className="md:hidden sticky top-[80px] z-20 bg-white">
          <div
            ref={titleScrollRef}
            className="overflow-x-auto whitespace-nowrap py-4 px-4 title-bar-mobile"
            style={{ boxSizing: "border-box" }}
          >
            {props.projects.map((project) => (
              <button
                key={`title-${project.slug}`}
                ref={(el) => {
                  titleRefs.current[project.slug] = el;
                }}
                onClick={() => scrollToProject(project.slug)}
                className={`py-2 px-0 mr-8 last:mr-0 transition-colors title-button ${
                  currentProjectInView === project.slug
                    ? "text-brand-black"
                    : "text-gray-400"
                }`}
              >
                <span>{project.title}</span>
              </button>
            ))}
            <div className="border-line" />
          </div>
        </div>
      )}

      {/* Portfolio cards section */}
      <div className="md:container">
        <div className="py-4 md:py-12">
          <div className="overflow-x-auto scrollbar-hide md:overflow-visible pl-4 md:pl-0" style={{ paddingLeft: '1rem' }}>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-1">
              {props.projects.map((project, index) => {
                return (
                  <div 
                    key={index}
                    className={`w-72 sm:w-80 md:w-auto flex-shrink-0 md:flex-shrink ${
                      index === props.projects.length - 1 ? 'pr-4 md:pr-0' : ''
                    }`}
                    style={{
                      opacity: isMobile ? (visibleCards[project.slug] ? 1 : 0) : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <PortfolioCard
                      slug={project.slug}
                      short_description={project.projectShortDescription}
                      title={project.title}
                      image={project.featuredImage}
                      tags={project.categories}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
        
      {/* CSS for hiding scrollbars across browsers */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}</style>
      
      {/* Button section - contained */}
      <div className="container pb-12">
        <div className="flex justify-center">
          <PrimaryButton href="/portfolio" text="Se alle projekter" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;