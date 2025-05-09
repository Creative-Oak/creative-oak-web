import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { JSX } from "preact/jsx-runtime";

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  title: string;
  description: string | JSX.Element;
  rightAlignedText?: boolean;
  imageUrl?: string;
  extraStyles?: string;
  imageAlt?: string;
  teaser?: string;
  box1?: string | JSX.Element;
  box2?: string | JSX.Element;
  box3?: string | JSX.Element;
}

export default function AnimatedContentSection(props: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  const hasImage = !!props.imageUrl;
  const hasBoxes = !!(props.box1 || props.box2 || props.box3);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Animate teaser if exists
      if (props.teaser) {
        const teaserElement = contentRef.current?.querySelector("p");
        if (teaserElement) {
          tl.from(teaserElement, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      }

      // Animate title
      const titleElement = contentRef.current?.querySelector("h2");
      if (titleElement) {
        tl.from(titleElement, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, props.teaser ? "-=0.4" : 0);
      }

      // Animate description
      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");
      }

      // Animate boxes if they exist
      if (hasBoxes) {
        const boxes = [box1Ref.current, box2Ref.current, box3Ref.current].filter(Boolean);
        if (boxes.length > 0) {
          tl.from(boxes, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }, "-=0.4");
        }
      }

      // Animate image if it exists
      if (hasImage && imageRef.current) {
        tl.from(imageRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} class={props.extraStyles}>
      <div className="container mx-auto py-24">
        <div className={`grid grid-cols-1 ${hasImage ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          {hasImage && (
            <div class="order-2">
              <img
                ref={imageRef}
                src={props.imageUrl}
                {...props.imageAlt && { alt: props.imageAlt }}
                className="w-full h-auto object-cover border-2 border-brand-black shadow-custom-black"
                loading="eager"
              />
            </div>
          )}
          <div 
            ref={contentRef}
            class={`${hasImage && props.rightAlignedText ? 'order-3' : 'order-1'} ${!hasImage ? 'md:col-span-full' : ''}`}
          >
            {props.teaser && (
              <p class="font-medium font-lexend">{props.teaser}</p>
            )}

            <h2 className="text-4xl mt-4 md:text-5xl font-bold mb-4 font-lexend">
              {props.title}
            </h2>
            <div ref={descriptionRef} className="text-lg font-poppins mb-6">
              {typeof props.description === 'string' ? props.description : props.description}
            </div>
            {hasBoxes && (
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {props.box1 && (
                  <div ref={box1Ref} class="p-4 border-2 border-brand-black shadow-custom-black bg-white">
                    {typeof props.box1 === 'string' ? props.box1 : props.box1}
                  </div>
                )}
                {props.box2 && (
                  <div ref={box2Ref} class="p-4 border-2 border-brand-black shadow-custom-black bg-white">
                    {typeof props.box2 === 'string' ? props.box2 : props.box2}
                  </div>
                )}
                {props.box3 && (
                  <div ref={box3Ref} class="p-4 border-2 border-brand-black shadow-custom-black bg-white">
                    {typeof props.box3 === 'string' ? props.box3 : props.box3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 
