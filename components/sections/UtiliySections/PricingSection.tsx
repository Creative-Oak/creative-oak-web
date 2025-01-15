import { JSX } from "preact/jsx-runtime";
import { CheckmarkIcon } from "../../icons/Icons.tsx";

interface PriceColumn {
  name: string;
  price: string;
  features: string[];
}

export interface PricingSectionProps {
  title: string;
  description?: JSX.Element;
  priceColumns: PriceColumn[];
  footnote: JSX.Element;
}

const PricingSection = (props: PricingSectionProps) => {
  return (
    <section className="bg-brand-purple py-12 md:py-24">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold font-lexend text-center md:text-left">
          {props.title}
        </h2>
        
        {props.description && (
          <div className="mt-4 text-center md:text-left">
            {props.description}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mt-8 space-y-4 md:space-y-0">
          {props.priceColumns.map((el, i) => (
            <div
              key={i}
              className="p-6 border-2 w-full md:w-auto md:flex-1 bg-brand-white border-brand-black 
                         transition-shadow hover:shadow-custom-black text-center 
                         flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-xl">{el.name}</h3>
                <span className="text-2xl md:text-3xl mt-2 block font-bold">{el.price}</span>
                <ul className="mt-4 space-y-3">
                  {el.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-center justify-center md:justify-start"
                    >
                      <div className="w-4 h-4 flex-shrink-0 mr-2">
                        <CheckmarkIcon />
                      </div>
                      <li className="text-sm md:text-base">{feature}</li>
                    </div>
                  ))}
                </ul>
              </div>
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