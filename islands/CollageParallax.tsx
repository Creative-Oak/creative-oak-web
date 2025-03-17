import { useEffect, useRef, useState } from "preact/hooks";

interface CollageParallaxProps {
  imageUrl: string;
  height?: string;
  mobileHeight?: string;
  speed?: number; // Controls how much slower the background moves (0-1)
  className?: string;
}

export default function CollageParallax({
  imageUrl,
  height = "600px",
  mobileHeight = "500px",
  speed = 0.2,
  className = "",
}: CollageParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomScale, setZoomScale] = useState(0.95);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    globalThis.addEventListener("resize", checkIsMobile);

    return () => {
      globalThis.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // How far the container is from the top of the viewport
      const offsetFromTop = rect.top;

      // Track if we've scrolled past the element
      if (offsetFromTop < 0) {
        setHasScrolledPast(true);
      }

      // If we've already scrolled past and are now coming back up, don't shrink
      if (hasScrolledPast && offsetFromTop > 0) {
        // Keep current zoom level
        setHasScrolledPast(false);
      }

      // Calculate how close we are to the element
      if (
        offsetFromTop < globalThis.innerHeight * 0.75 &&
        offsetFromTop > -rect.height * 0.5
      ) {
        // Calculate normalized position (0 when element enters viewport, 1 when centered)
        const distanceFromCenter = Math.abs(
          (globalThis.innerHeight / 2) - (offsetFromTop + rect.height / 2),
        );
        const maxDistance = globalThis.innerHeight * 0.5; // Half the viewport height

        // Convert distance to a 0-1 scale (1 being closest to center)
        const proximityFactor = 1 -
          Math.min(1, distanceFromCenter / maxDistance);

        // Calculate scale with smooth transition
        const startScale = 0.95;
        const endScale = 1.0;
        const scaleRange = endScale - startScale;

        // Apply zoom based on proximity, with minimum scale determined by whether we've scrolled past
        const baseScale = hasScrolledPast ? endScale : startScale;
        const newZoomScale = Math.max(
          baseScale,
          startScale + (proximityFactor * scaleRange),
        );

        setZoomScale(newZoomScale);
      } else if (
        offsetFromTop >= globalThis.innerHeight * 0.75 && !hasScrolledPast
      ) {
        // Only reset to small scale if we're approaching from above and haven't scrolled past yet
        setZoomScale(0.95);
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, [speed, hasScrolledPast]);

  // Calculate padding based on device type - vertical padding only on mobile
  const verticalPadding = isMobile ? "1rem" : "2rem";
  const horizontalPadding = isMobile ? "0" : "2rem";
  // Use appropriate height based on device type
  const responsiveHeight = isMobile ? mobileHeight : height;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: responsiveHeight,
        overflow: "hidden",
        position: "relative",
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: verticalPadding,
          bottom: verticalPadding,
          left: isMobile ? "0" : horizontalPadding,
          right: isMobile ? "0" : horizontalPadding,
          overflow: "hidden", // This ensures the zoomed image doesn't expand beyond this container
        }}
      >
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: isMobile ? "auto 95%" : "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: `scale(${zoomScale})`,
            transition: "transform 0.3s ease-out", // Made transition a bit longer for smoother effect
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
}
