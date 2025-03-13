import { useEffect, useRef, useState } from "preact/hooks";

interface ScrollTriggerImageProps {
  desktopSrc: string;
  mobileSrc: string;
  desktopAlt: string;
  mobileAlt: string;
}

export default function ScrollTriggerImage(
  { desktopSrc, mobileSrc, desktopAlt, mobileAlt }: ScrollTriggerImageProps,
) {
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(60);

  useEffect(() => {
    let lastScrollY = globalThis.scrollY;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const currentScrollY = globalThis.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Update progress based on scroll difference
      // Only update if scrolling down
      if (scrollDiff > 0) {
        const scrollSensitivity = 20; // Adjust this value to change scroll sensitivity
        const newProgress = Math.max(
          50, // Limit upward movement
          Math.min(60, scrollProgress - (scrollDiff / scrollSensitivity)),
        );

        setScrollProgress(newProgress);
      }

      lastScrollY = currentScrollY;
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      class="w-full relative min-h-[800px]"
    >
      <div class="max-w-7xl mx-auto relative">
        <div class="relative w-full">
          {/* Smartphone image - positioned absolutely to overlap */}
          <div
            ref={mobileImageRef}
            class="absolute transition-transform duration-100 z-10"
            style={{
              transform:
                `translate(60rem, calc(${scrollProgress}% - 5rem)) rotate(15deg)`,
            }}
          >
            <img
              src={mobileSrc}
              alt={mobileAlt}
              class="max-w-[300px] w-full opacity-100"
            />
          </div>
          {/* Desktop image */}
          <img
            src={desktopSrc}
            alt={desktopAlt}
            class="max-w-5xl w-full mx-auto relative z-0"
          />
        </div>
      </div>
    </div>
  );
}
