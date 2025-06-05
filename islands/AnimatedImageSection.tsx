import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageSectionProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function AnimatedImageSection({ images }: AnimatedImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const imageElements = containerRef.current.querySelectorAll('.animated-image');
    
    imageElements.forEach((image) => {
      // Set initial state - invisible and slightly moved down
      gsap.set(image, { 
        opacity: 0, 
        y: 50 
      });

      // Create scroll trigger for each image
      ScrollTrigger.create({
        trigger: image,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(image, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        },
        once: true // Only animate once
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger && containerRef.current?.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [images]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 space-y-8">
      {images.map((image, index) => (
        <div key={index} className="animated-image w-full">
          <img
            src={image.src}
            alt={image.alt}
            width={2400}
            className="w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
} 