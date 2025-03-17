import { useEffect, useRef, useState } from "preact/hooks";

interface ArrowAnimationProps {
  className?: string;
}

export default function ArrowAnimation(
  { className = "" }: ArrowAnimationProps,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeoutId: number;

    const handleVideoEnd = () => {
      // Pause at the end
      video.pause();

      // Wait 7 seconds before playing again
      timeoutId = globalThis.setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 3000);
    };

    // Add event listener for video ending
    video.addEventListener("ended", handleVideoEnd);

    // Play the video initially
    video.play();

    // Add scroll event listener to fade out arrow on scroll
    const handleScroll = () => {
      const scrollY = globalThis.scrollY;
      // Start fading after 50px of scroll, fully faded by 150px
      const newOpacity = Math.max(0, 1 - (scrollY - 50) / 100);
      setOpacity(newOpacity);
    };

    globalThis.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      globalThis.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className={className}
      style={{ opacity }}
    >
      <source src="/images/portfolio/arrow-anim.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
