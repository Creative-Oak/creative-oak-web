import { useEffect, useRef, useState } from "preact/hooks";

interface ScrollTriggerImageProps {
  desktopSrc?: string;
  mobileSrc: string;
  desktopAlt: string;
  mobileAlt: string;
  desktopVideoSrc?: string;
  isVideo?: boolean;
}

export default function ScrollTriggerImage({
  desktopSrc,
  mobileSrc,
  desktopAlt,
  mobileAlt,
  desktopVideoSrc,
  isVideo = false,
}: ScrollTriggerImageProps) {
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Base position values (the original position)
  const baseX = 60; // rem
  const baseY = 30; // %

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
    globalThis.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Desktop can be video or image, mobile overlay is always image
  const finalDesktopSrc = isVideo && desktopVideoSrc ? desktopVideoSrc : desktopSrc;
  const finalMobileSrc = mobileSrc; // Mobile overlay always uses image

  return (
    <div
      ref={containerRef}
      class="w-full relative max-h-[80svh-8rem]"
    >
      <div class=" relative">
        <div class="relative w-full">
          {/* Mobile content - positioned absolutely to overlap (ALWAYS IMAGE) */}
          <div
            ref={mobileImageRef}
            class="absolute transition-all duration-500 ease-out z-10 hidden md:block"
            style={{
              transform:
                `translate(calc(${baseX}rem + ${position.x}rem), calc(${baseY}% - 5rem + ${position.y}rem)) rotate(15deg)`,
            }}
          >
            <img
              src={finalMobileSrc}
              alt={mobileAlt}
              class="max-w-[15vw] w-full opacity-100"
            />
          </div>

          {/* Desktop content - can be video or image */}
          {isVideo && desktopVideoSrc ? (
            <video
              class="w-full relative z-0"
              autoplay
              loop
              muted
              playsInline
              className={"border-brand-black border-2 shadow-custom-black"}
              style={{ aspectRatio: "16/9",  }} // 1920x1080 scales to 16:9
              aria-label={desktopAlt}
            >
              <source src={desktopVideoSrc} type="video/webm" />
              <source src={desktopVideoSrc.replace('.webm', '.mp4')} type="video/mp4" />
              {/* Fallback image if video fails */}
              {desktopSrc && (
                <img
                  src={desktopSrc}
                  alt={desktopAlt}
                  class="w-full relative z-0"
                />
              )}
            </video>
          ) : (
            <img
              src={finalDesktopSrc}
              alt={desktopAlt}
              class="w-full relative z-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
