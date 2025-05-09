import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextSection {
  header: string;
  txt: string;
}

interface Props {
  text: TextSection[];
  title: string;
}

export default function AnimatedAboutSection({ text, title }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Animate each content section
      contentRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(ref.querySelector("h3"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .from(ref.querySelector("p"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h2 ref={titleRef} class="text-4xl font-bold text-center mb-16">
        {title}
      </h2>
      <div class="space-y-16">
        {text.map((section, index) => (
          <div
            ref={el => contentRefs.current[index] = el}
            class="max-w-3xl mx-auto"
            key={section.header}
          >
            <h3 class="text-2xl font-semibold mb-4">{section.header}</h3>
            <p class="text-lg leading-relaxed whitespace-pre-line">{section.txt}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 