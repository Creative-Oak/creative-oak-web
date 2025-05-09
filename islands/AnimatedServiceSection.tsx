import { useEffect, useRef, useState } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SubService {
  title: string;
}

interface AnimatedServiceSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  subServices: SubService[];
  isEven?: boolean;
}

export default function AnimatedServiceSection({
  title,
  description,
  imageUrl,
  subServices,
  isEven = false,
}: AnimatedServiceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !backgroundRef.current) return;

    // Handle parallax effect
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = rect.top / globalThis.innerHeight;
      setScrollPosition(scrollPercentage * -50); // Adjust multiplier to control parallax intensity
    };

    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the content
    tl.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate sub-services
    const subServiceElements = contentRef.current.querySelectorAll(".sub-service");
    tl.from(subServiceElements, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.5");

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger: ScrollTrigger) => {
        trigger.kill();
      });
    };
  }, [isEven]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollPosition}px)`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        <img 
          src={imageUrl} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover scale-125"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
            <div 
              ref={contentRef} 
              className={`w-full lg:w-1/2 text-center ${isEven ? 'lg:text-right' : 'lg:text-left'} text-white`}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-lexend">{title}</h2>
              <p className="text-lg mb-8 text-gray-200">{description}</p>
              <div className="grid grid-cols-2 gap-4">
                {subServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="sub-service p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/20 transition-colors duration-300"
                  >
                    <p className="font-medium">{service.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 