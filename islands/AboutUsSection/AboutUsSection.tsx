import PrimaryButton from "../../components/other/PrimaryButton.tsx";
import { useEffect, useRef } from "preact/hooks";
import gsap from "https://esm.sh/gsap@3.13.0";
import SplitText from "https://esm.sh/gsap@3.13.0/SplitText";
import { ScrollTrigger } from "https://esm.sh/gsap@3.13.0/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ServiceSection = () => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current || !sectionRef.current) return;

        const split = new SplitText(textRef.current, { 
            type: "words,chars",
            charsClass: "char",
            wordsClass: "word"
        });

        // Set initial state to hidden
        gsap.set(split.chars, { opacity: 0 });

        // Create timeline with ScrollTrigger scrub animation
        const isMobile = globalThis.innerWidth < 768; // md breakpoint
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: isMobile ? "top 95%" : "top 70%", // Earlier start on mobile
                end: "bottom 95%", // End when section is 10% in view
                scrub: 1, // Smooth scrub with 1 second lag
                // markers: true, // Uncomment to see trigger points for debugging
            },
        })
        .to(split.chars, {
            opacity: 1,
            duration: 1,
            stagger: {
                amount: 0.8,
                from: "random"
            },
            ease: "none" // Use "none" for scrub animations
        });

        // Clean up on unmount
        return () => {
            split.revert();
            // @ts-ignore - ScrollTrigger.getAll() exists but typing might be incomplete
            ScrollTrigger.getAll().forEach((trigger: any) => {
                trigger.kill();
            });
        };
    }, []);


    return (
        <section ref={sectionRef} class="bg-white md:pb-96 flex flex-col items-end md:pt-24 py-10">
            <div class="px-4 md:px-10 md:pr-10 flex flex-col items-start">
                <p ref={textRef} class="text-brand-black text-xl md:text-2xl overflow-hidden text-left leading-normal mb-6 md:mb-8 max-w-3xl" style={{lineHeight: "1.5"}}>
                    We are both consultants and digital craftsmen. With a sharp blend of branding, user experience, and programmatic expertise, we create solutions that truly make a difference for our clients – and stand the test of time.
                </p>
                <div class="flex flex-col md:flex-row gap-4">
                    <PrimaryButton href="/about" text="About us" showArrow={true} />
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
