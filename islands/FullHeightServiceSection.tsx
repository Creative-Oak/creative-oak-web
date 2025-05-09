import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface SubService {
  title: string;
}

interface FullHeightServiceSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  subServices: SubService[];
  isEven?: boolean;
}

export default function FullHeightServiceSection({ 
  title, 
  description, 
  imageUrl,
  videoUrl,
  subServices,
  isEven = false 
}: FullHeightServiceSectionProps): JSX.Element {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = rect.top / globalThis.innerHeight;
      setScrollPosition(scrollPercentage * -50); // Adjust this multiplier to control parallax intensity
    };

    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollPosition}px)`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-125"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={imageUrl} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover scale-125"
            style={{
              objectPosition: 'center'
            }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full z-10">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full ${isEven ? 'md:text-right' : ''}`}>
            {/* Text content */}
            <div className={`text-white ${isEven ? 'md:order-2' : ''}`}>
              <h2 className="text-4xl md:text-5xl font-bold font-lexend mb-6">{title}</h2>
              <p className="text-lg text-gray-200 mb-8">{description}</p>
              
              {/* Sub-services */}
              <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {subServices.map((service, index) => (
                  <div key={index} className={`flex !mt-0 items-center gap-2`}>
                    <div className="w-2 h-2 bg-brand-white rounded-full" />
                    <span className="text-lg">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Empty column for spacing */}
            <div className={isEven ? 'md:order-1' : ''} />
          </div>
        </div>
      </div>
    </section>
  );
} 