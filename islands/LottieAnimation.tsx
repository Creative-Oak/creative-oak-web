// islands/LottieAnimation.tsx
import { useEffect, useRef } from "preact/hooks";

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
}

declare global {
  interface Window {
    lottie: any;
  }
}

export default function LottieAnimation(
  { animationPath, className = "w-full p-8 h-auto" }: LottieAnimationProps,
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load the Lottie script
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
    script.async = true;

    script.onload = () => {
      if (!containerRef.current) return;

      // Initialize the animation once script is loaded
      const anim = window.lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [animationPath]);

  return <div ref={containerRef} className={className}></div>;
}
