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
    <section className=" bg-brand-purple  py-24 md:py-12">
      <div class="container  px-4 md:px-8">
        <h2 class="text-3xl font-bold font-lexend">{props.title}</h2>
        {props.description && <div class="mt-4">{props.description}</div>}

        <div class="flex flex-row gap-4 mt-8">
          {props.priceColumns.map((el, i) => (
            <div
              class="p-6 border-2 flex-grow mt-6 bg-brand-white border-brand-black transition-shadow hover:shadow-custom-black text-center"
              key={i}
              style={{ flex: "1 1 0%" }} // Set a consistent max width
            >
              <h3 class="font-bold text-center">{el.name}</h3>
              <span class="text-3xl mt-2 font-bold">{el.price}</span>
              <ul class="mt-4">
                {el.features.map((feature, i) => (
                  <div class="flex items-center my-4 text-left" key={i}>
                    <div class="w-4 h-4 flex-shrink-0">
                      <CheckmarkIcon />
                    </div>
                    <li class="ml-2">{feature}</li>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div class="text-sm italic mt-4">{props.footnote}</div>
      </div>
    </section>
  );
};

export default PricingSection;
