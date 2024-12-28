import { JSX } from "preact/jsx-runtime";
import PrimaryButton from "./PrimaryButton.tsx";

interface Content4CardProps {
  title: string;
  description: JSX.Element;
  icon: JSX.Element;
  href: string;
  buttonText?: string;
}

const Content4Card = (props: Content4CardProps) => {
  return (
    <div
      
      className="bg-white border-2 border-brand-black p-6 hover:shadow-custom-black transition-shadow duration-300"
    >
      <div className="text-brand-black w-10 h-10 mb-2">
        {props.icon}
      </div>

      <h3 className="font-lexend font-bold text-xl md:text-2xl mb-2 text-brand-black-600">
        {props.title}
      </h3>

      <p className="font-lexend text-base  text-gray-600">
        {props.description}
      </p>

      <div class="mt-8">
        <PrimaryButton
          text={props.buttonText || "Læs mere"}
          href={props.href}
        />
      </div>
    </div>
  );
};

export default Content4Card;
