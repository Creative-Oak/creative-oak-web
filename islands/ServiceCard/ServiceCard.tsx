import { JSX } from "preact";

interface CardProps {
  title: string;
  href: string;
  tags: string[];
}

const ServiceCard = (props: CardProps) => {
  const handleTagClick = (e: JSX.TargetedMouseEvent<HTMLSpanElement>, tag: string) => {
    e.stopPropagation();

    console.log(tag + " clicked!");
    // Your tag navigation logic here
  };

  const handleCardClick = () => {
    // Handle main card navigation
    console.log("Card clicked!");
    globalThis.location.href = props.href;
  };

  return (
    <>
      <style>
        {`
          @keyframes tagWiggle {
            0%, 100% { transform: translate(0px, 0px); }
            25% { transform: translate(2px, 2px); }
            50% { transform: translate(-2px, -1px); }
            75% { transform: translate(-1px, 1px); }
          }
          [data-tag] {
            animation: tagWiggle 4s ease-in-out infinite;
          }
          [data-tag]:nth-child(2) {
            animation-delay: 0.5s;
          }
          [data-tag]:nth-child(3) {
            animation-delay: 1s;
          }
        `}
      </style>
      <div
        onClick={handleCardClick}
        className="p-6 md:px-4 bg-brand-white flex flex-col justify-between border-brand-black border-2 hover:shadow-custom-black transition-shadow cursor-pointer"
      >
        <h2 class="font-lexend text-4xl text-center font-bold">{props.title}</h2>
        <div class="flex gap-4 mt-6 flex-wrap justify-center">
          {props.tags.map((tag) => (
            <button
              onClick={(e) => handleTagClick(e, tag)}
              data-tag
              class="bg-brand-yellow p-1 z-10 px-2 text-sm border border-brand-black hover:shadow-custom-black transition-shadow cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;