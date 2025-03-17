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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Base position values (the original position)
  const baseX = 60; // rem
  const baseY = 60; // %

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get container dimensions and position
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the center of the container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized offset from center (-1 to 1)
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      // Apply a smaller movement factor to make the effect subtle
      // Negate the values to create a repelling effect
      const movementFactor = 2; // Adjusted for repelling effect

      setPosition({
        x: -offsetX * movementFactor, // Inverted to create repelling effect
        y: -offsetY * movementFactor, // Inverted to create repelling effect
      });
    };

    // Add mousemove event listener to the window
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
            class="absolute transition-all duration-500 ease-out z-10"
            style={{
              transform:
                `translate(calc(${baseX}rem + ${position.x}rem), calc(${baseY}% - 5rem + ${position.y}rem)) rotate(15deg)`,
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
