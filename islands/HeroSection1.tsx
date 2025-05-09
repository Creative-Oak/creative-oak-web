import LottieAnimation from "./LottieAnimation.tsx";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { useEffect, useRef } from "preact/hooks";

interface HeroSection1Props {
  header: string;
  subtitle?: string;
  buttonText2?: string;
  buttonLink2?: string;
  buttonText1?: string;
  buttonLink1?: string;
  rightImage?: string;
  lottieAnimation?: string;
}

export default function HeroSection1(props: HeroSection1Props) {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
      })
      .from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
      }, "-=0.5"); // Start slightly before the first animation ends
  }, []);

  return (
    <section className="relative pt-[calc(95px+16px)] flex min-h-[80svh] md:pt-[95px] flex-col md:flex-row items-center justify-between gap-12 container">
      <div ref={contentRef} className="w-full md:w-2/3 z-10 h-full">
        <h1 className="text-4xl md:text-7xl text-brand-black font-bold mb-4 leading- md:leading-tight font-lexend">
          {props.header}
        </h1>
        {props.subtitle && (
          <p className="text-lg md:text-xl font-poppins mb-6">
            {props.subtitle}
          </p>
        )}
      </div>

      <div ref={imageRef} className="w-full md:w-1/2">
        {props.lottieAnimation
          ? (
            <LottieAnimation
              animationPath={props.lottieAnimation}
              className="w-full md:p-8 h-auto"
            />
          )
          : props.rightImage
          ? (
            <img
              src={props.rightImage}
              alt={props.header}
              className="w-full p-8 h-auto object-cover"
              loading="eager"
            />
          )
          : null}
      </div>
    </section>
  );
} 