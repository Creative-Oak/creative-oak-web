import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface Section {
  title: string;
  content: string;
}

interface TimelineProps {
  sections: Section[];
}

export default function Timeline({ sections }: TimelineProps): JSX.Element {
  const [activeSegments, setActiveSegments] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportHeight = globalThis.innerHeight;
      const triggerPoint = viewportHeight * 0.7; // Trigger at 70% of viewport height
      const bottomOffset = 100; // Pixels from bottom to trigger last item

      const activeSet = new Set<number>();

      sectionRefs.current.forEach((sectionRef, index) => {
        if (!sectionRef) return;

        const rect = sectionRef.getBoundingClientRect();

        // Activate if:
        // 1. Section is above trigger point OR
        // 2. We're near the bottom of the page
        if (
          rect.top <= triggerPoint ||
          (globalThis.innerHeight + globalThis.scrollY) >=
            document.documentElement.scrollHeight - bottomOffset
        ) {
          activeSet.add(index);
        }
      });

      setActiveSegments(activeSet);
    };

    globalThis.addEventListener("scroll", handleScroll);
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
    handleScroll(); // Initial calculation

    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  return (
    <div class="relative" ref={containerRef}>
      {sections.map((section, index) => (
        <div
          key={index}
          class="flex items-start mb-12 relative"
          ref={(el) => (sectionRefs.current[index] = el)}
        >
          {index < sections.length - 1 && (
            <div class="absolute left-[1.47rem] top-4 w-[2px] h-[calc(100%+48px)]">
              {/* Background line */}
              <div class="absolute inset-0 bg-brand-black-200" />
              {/* Progress overlay */}
              <div
                class="absolute top-0 left-0 w-full bg-brand-blue transition-all duration-500"
                style={{
                  height: activeSegments.has(index) ? "100%" : "0%",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          )}

          {/* Dot */}
          <div class="p-4 mt-[-1rem] bg-brand-white z-20">
            <div
              class={`relative z-10 rounded-full w-4 h-4 mt-2 shrink-0 transition-colors duration-300 ${
                activeSegments.has(index)
                  ? "bg-brand-blue"
                  : "bg-brand-black-400"
              }`}
            />
          </div>
          {/* Content */}
          <div class="ml-8">
            <h3 class="text-xl font-semibold mb-2">{section.title}</h3>
            <p class="text-gray-600">{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
