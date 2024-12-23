import { useEffect, useRef } from "preact/hooks";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextProps {
    text1: string;
    text2: string;
}

export default function ScrollText(scrollTextProps: ScrollTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll("span");

    gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2, // Adds delay between word animations
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%", // Start earlier
            end: "top 20%", // Finish faster
            scrub: 0.1, // Smooth but faster animation
          },
        }
      );
      

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) =>
        trigger.kill()
      );
    };
  }, []);

  return (
    <div className="container px-2 md:px-4 py-8">
      <p
        ref={textRef}
        className="text-center"
        style={{ lineHeight: "2rem", fontSize: "1.5rem" }}
      >
        {`${scrollTextProps.text1}`
          .split(" ")
          .map((word, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ opacity: 0, display: "inline-block" }}
            >
              {word}&nbsp;
            </span>
          ))}
        <br />
        {`${scrollTextProps.text2}`
          .split(" ")
          .map((word, index) => (
            <span
              key={index + 100} // Ensures unique keys
              className="inline-block pt-6"
              style={{ opacity: 0, display: "inline-block" }}
            >
              {word}&nbsp;
            </span>
          ))}
      </p>
    </div>
  );
}
