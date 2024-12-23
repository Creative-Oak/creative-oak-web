// Marquee.tsx
import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface Logo {
  id: number;
  name: string;
  alt: string;
  src: string;
}

interface MarqueeProps {
  logos: Logo[];
  duration?: number;
}

export default function Marquee({ logos, duration = 20 }: MarqueeProps): JSX.Element {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!primaryRef.current || !scrollerRef.current) return;

    // Get the width of the primary content
    const scrollerContent = primaryRef.current;
    const _scrollerWidth = scrollerContent.offsetWidth;

    // Set the animation duration based on content width
    const speed = duration;
    const root = document.documentElement;
    root.style.setProperty('--animation-duration', `${speed}s`);
  }, [duration]);

  return (
    <div class="relative group">
      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .scroller {
            mask: linear-gradient(
              90deg,
              transparent,
              white 20%,
              white 80%,
              transparent
            );
          }

          .scroller__inner {
            width: max-content;
            flex-wrap: nowrap;
            animation: scroll var(--animation-duration) linear infinite;
          }

          .group:hover .scroller__inner {
            animation-play-state: paused;
          }
        `}
      </style>

      <div ref={scrollerRef} class="scroller w-full overflow-hidden">
        <div ref={primaryRef} class="scroller__inner flex">
          {/* Primary set of logos */}
          {logos.map((logo) => (
            <div
              key={logo.id}
              class="flex-shrink-0 mx-20 w-24 h-24 flex items-center justify-center transition-transform hover:scale-110"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                class="w-full h-full object-contain"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {logos.map((logo) => (
            <div
              key={`${logo.id}-duplicate`}
              class="flex-shrink-0 mx-20 w-24 h-24 flex items-center justify-center transition-transform hover:scale-110"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                class="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}