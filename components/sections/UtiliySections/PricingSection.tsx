import { JSX } from "preact/jsx-runtime";
import { CheckmarkIcon } from "../../icons/Icons.tsx";
import PrimaryButton from "../../other/PrimaryButton.tsx";

interface PriceColumn {
  name: string;
  price: string;
  features: (string | JSX.Element)[];
  buttonText?: string;
  buttonLink?: string;
}

export interface PricingSectionProps {
  title: string;
  description?: JSX.Element;
  priceColumns: PriceColumn[];
  footnote: JSX.Element;
  backgroundColor?: string;
}

const PricingSection = (props: PricingSectionProps) => {
  return (
    <section
      className={`${props.backgroundColor || "bg-brand-purple"} py-12 md:py-24`}
    >
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold font-lexend text-center md:text-left">
          {props.title}
        </h2>

        {props.description && (
          <div className="mt-4 text-center md:text-left">
            {props.description}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {props.priceColumns.map((column, i) => (
            <div
              key={i}
              className="relative p-6 border-2 bg-white border-brand-black
                     transition-all duration-200 hover:shadow-custom-black
                     flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="text-center lg:text-left">
                  <h3 className="font-bold text-xl mb-2">{column.name}</h3>
                  <span className="text-3xl font-bold block">
                    {column.price}
                  </span>
                </div>

                <ul className="space-y-4">
                  {column.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0 mr-2">
                        <CheckmarkIcon />
                      </div>
                      <span className="text-sm lg:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {column.buttonText && column.buttonLink && (
                <div className="mt-6">
                  <PrimaryButton
                    href={column.buttonLink}
                    text={column.buttonText}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs md:text-sm italic mt-4 text-center md:text-left">
          {props.footnote}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
