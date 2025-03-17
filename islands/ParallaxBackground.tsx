import { useRef } from "preact/hooks";

interface ParallaxBackgroundProps {
  imageUrl: string;
  minHeight?: string;
  overlayOpacity?: number;
}

export default function ParallaxBackground({
  imageUrl,
  minHeight = "70svh",
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      />

      {/* Content container */}
      <div className="relative w-full h-full z-10" />
    </div>
  );
}
