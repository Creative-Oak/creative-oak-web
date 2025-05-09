import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import PrimaryButton from "../components/other/PrimaryButton.tsx";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function AnimatedCTASection({
  title,
  description,
  buttonText,
  buttonLink,
}: AnimatedCTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current || !buttonRef.current || !circleRef.current) return;

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Split text animation for title
    const titleText = titleRef.current.textContent || "";
    titleRef.current.innerHTML = titleText.split("").map(char => 
      char === " " ? "&nbsp;" : `<span class="inline-block">${char}</span>`
    ).join("");

    const titleChars = titleRef.current.querySelectorAll("span");

    // Animate the circle background
    tl.from(circleRef.current, {
      scale: 0,
      duration: 1,
      ease: "power3.out",
    })
    // Animate title characters
    .from(titleChars, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.02,
      ease: "power3.out",
    }, "-=0.5")
    // Animate description
    .from(descriptionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    // Animate button
    .from(buttonRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

    // Add hover animation for the button
    buttonRef.current.addEventListener("mouseenter", () => {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger: ScrollTrigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-brand-blue py-24">
      {/* Animated background circle */}
      <div 
        ref={circleRef}
        className="absolute w-[150%] aspect-square rounded-full bg-gradient-to-br from-brand-blue-light/20 to-transparent"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-lexend"
          >
            {title}
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl mb-12 text-gray-200"
          >
            {description}
          </p>
          <PrimaryButton href={buttonLink} text={buttonText} showArrow={true} />
        
      
        </div>
      </div>
    </div>
  );
} 