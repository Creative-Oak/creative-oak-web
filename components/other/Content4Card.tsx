import PrimaryButton from "./PrimaryButton.tsx";
import { Content4CardType } from "../../types/Content4Cards.ts";

const Content4Card = (props: Content4CardType) => {
  return (
    // Only show border, if props.showBorder is true
    <div className={`bg-white p-6 transition-shadow duration-300 ${props.showBorder ? 'border-2 border-brand-black  hover:shadow-custom-black' : ''} ${props.centerText ? 'text-center' : ''}`}>
      <div className={`text-brand-black w-10 h-10 mb-2 ${props.centerText ? 'mx-auto' : ''}`}>
        {props.icon}
      </div>

      <h3 className="font-lexend font-bold text-xl md:text-2xl mb-2 text-brand-black-600">
        {props.title}
      </h3>

      <p className="font-lexend text-base  text-gray-600">
        {props.description}
      </p>
      {props.buttonLink && (
        <div class="mt-8">
          <PrimaryButton
            text={props.buttonText || "Læs mere"}
            href={props.buttonLink}
          />
        </div>
      )}
    </div>
  );
};

export default Content4Card;
