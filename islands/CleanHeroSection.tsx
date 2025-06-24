import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CleanHeroSectionProps {
  title: string;
  description: string;
  accent?: string;
}

export default function CleanHeroSection({
  title,
  description,
  accent,
}: CleanHeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current || !lineRef.current || !dotsRef.current) return;

    // Split title into words for animation
    const titleWords = titleRef.current.textContent?.split(" ") || [];
    titleRef.current.innerHTML = titleWords.map(word => 
      `<span class="inline-block overflow-hidden whitespace-normal align-top">
        <span class="inline-block transform translate-y-full">${word}</span>
      </span>`
    ).join(" ");

    const titleSpans = titleRef.current.querySelectorAll("span span");
    
    // Create dot grid
    if (dotsRef.current) {
      const dotSize = 4;
      const gap = 24;
      const rows = 3;
      const cols = 8;
      
      for (let i = 0; i < rows * cols; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute w-1 h-1 bg-brand-yellow rounded-full opacity-0 scale-0';
        dot.style.top = `${Math.floor(i / cols) * gap}px`;
        dot.style.left = `${(i % cols) * gap}px`;
        dotsRef.current.appendChild(dot);
      }
    }

    // Create main timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // Animate elements (GSAP will animate from the CSS-defined initial states)
    tl.to(titleSpans, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
    })
    .to(accentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, "-=0.4")
    .to(lineRef.current, {
      scaleX: 1,
      duration: 1,
    }, "-=0.6")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, "-=0.8")
    .to(dotsRef.current?.children, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        each: 0.02,
        grid: [3, 8],
        from: "random",
      },
    }, "-=0.8");

    // Add scroll-based parallax to dots
    gsap.to(dotsRef.current, {
      y: "20%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      // @ts-ignore - ScrollTrigger.getAll() exists but typing might be incomplete
      ScrollTrigger.getAll().forEach((trigger: any) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-[80vh] flex items-center mt-16 bg-white overflow-hidden"
    >
      {/* Decorative dots grid */}
      <div 
        ref={dotsRef}
        className="absolute top-[21px] rotate-90 lg:rotate-0 md:top-1/2 -right-[50px] lg:right-[30px] w-[200px] h-[72px]"
        style={{ transform: "translateY(-50%) rotate(90deg) lg:rotate(0deg)" }}
      />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl">
          <div className="relative mb-8">
            <h1 
            style={{lineHeight: "1.2"}}
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-lexend leading-5 break-words"
            >
              {title}
            </h1>
            {accent && (
              <span 
                ref={accentRef}
                className="absolute -top-6 left-0 text-brand-blue text-lg font-medium opacity-0 translate-y-5"
              >
                {accent}
              </span>
            )}
            {/* Animated line */}
            <div 
              ref={lineRef}
              className="absolute -bottom-4 left-0 h-[3px] w-24 bg-brand-blue transform origin-left scale-x-0"
            />
          </div>
          <p 
            ref={descriptionRef}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl opacity-0 translate-y-5"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
} 