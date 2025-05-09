import PrimaryButton from "../../components/other/PrimaryButton.tsx";
import SecondaryButton from "../../components/other/SecondayButton.tsx";
import { useEffect, useRef } from "preact/hooks";
import gsap from "https://esm.sh/gsap@3.13.0";
import SplitText from "https://esm.sh/gsap@3.13.0/SplitText";

gsap.registerPlugin(SplitText);

const ServiceSection = () => {
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, { 
            type: "words,chars",
            charsClass: "char",
            wordsClass: "word"
        });

        gsap.from(split.chars, {
            opacity: 0,
            duration: 0.25,
            stagger: {
                amount: 1.5,
                from: "random"
            },
            ease: "power4.out"
        });

        // Optional: Clean up split text on unmount
        return () => {
            split.revert();
        };
    }, []);
    

    return (
        <section class="bg-white md:pb-96 flex flex-col items-end md:pt-24 py-10">
            <div class="px-4 flex flex-col items-start">
                <p ref={textRef} class="text-brand-black text-4xl overflow-hidden text-left leading-normal mb-6 md:mb-8 max-w-4xl">
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
