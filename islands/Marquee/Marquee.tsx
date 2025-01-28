import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Logo } from "../../types/Logo.ts";

interface MarqueeProps {
  logos: Logo[];
  duration?: number;
  pauseOnHover?: boolean
}

export default function Marquee({ logos, duration = 30 }: MarqueeProps): JSX.Element {
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

  // Render logo with optional link
  const renderLogo = (logo: Logo, isDuplicate = false) => (
    <div
      key={isDuplicate ? `${logo._id}-duplicate` : logo._id}
      class="flex-shrink-0 mx-2 md:mx-8 w-16 md:w-auto h-8 md:h-24 flex items-center justify-center transition-transform hover:scale-110"
>
      {logo.url ? (
        <a
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full h-full"
        >
          <img
            src={logo.image}
            alt={logo.alt || logo.name}
            class="w-full h-full object-contain"
          />
        </a>
      ) : (
        <img
          src={logo.image}
          alt={logo.alt || logo.name}
          class="w-full h-full object-contain"
        />
      )}
    </div>
  );

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

          /* Adjusted animation speed for mobile */
          @media (max-width: 768px) {
            .scroller__inner {
              animation-duration: calc(var(--animation-duration) * 0.7) !important;
            }
          }
        `}
      </style>

      <div ref={scrollerRef} class="scroller w-full overflow-hidden">
        <div ref={primaryRef} class="scroller__inner flex">
          {/* Primary set of logos */}
          {logos.map((logo) => renderLogo(logo))}
          
          {/* Duplicate set for seamless scrolling */}
          {logos.map((logo) => renderLogo(logo, true))}
        </div>
      </div>
    </div>
  );
}