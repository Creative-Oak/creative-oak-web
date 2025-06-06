import { useRef, useEffect, useState } from "preact/hooks";

interface ParallaxBackgroundProps {
  imageUrl: string;
  minHeight?: string;
  overlayOpacity?: number;
  parallaxSpeed?: number;
}

export default function ParallaxBackground({
  imageUrl,
  minHeight = "70svh",
  parallaxSpeed = 0.5,
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || globalThis.innerWidth < 768
      );
    };

    checkMobile();
    globalThis.addEventListener('resize', checkMobile);
    
    return () => globalThis.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !backgroundRef.current || !containerRef.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const background = backgroundRef.current;
      
      if (!container || !background) return;

      const rect = container.getBoundingClientRect();
      
      const scrollY = globalThis.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = globalThis.innerHeight;

      // Only apply parallax when element is in view
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        // Calculate parallax offset
        const relativePos = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
        const parallaxOffset = (relativePos - 0.5) * 100 * parallaxSpeed;
        
        background.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
      }
    };

    // Initial call
    handleScroll();
    
    // Throttled scroll listener for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    globalThis.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => globalThis.removeEventListener('scroll', scrollListener);
  }, [isMobile, parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        minHeight,
        overflow: "hidden",
      }}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          // For mobile parallax, we need extra height to accommodate the transform
          height: isMobile ? "120%" : "100%",
          top: isMobile ? "-10%" : "0",
        }}
      />

      {/* Content container */}
      <div className="relative w-full h-full z-10" />
    </div>
  );
}
