// components/sections/CourseOfferingCard.tsx

import { ClockIcon, LightbulbIcon, UsersIcon } from "../../icons/Icons.tsx";
import PrimaryButton from "../../other/PrimaryButton.tsx";

interface CourseOfferingCardProps {
  title: string;
  description: string;
  duration: string;
  audience: string;
  format: string;
  price: number;
  bulletPoints: string[];
  includes: string[];
}

export function CourseOfferingCard({
  title,
  description,
  duration,
  audience,
  format,
  price,
  bulletPoints,
  includes,
}: CourseOfferingCardProps) {
  const formattedPrice = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div class="h-full">
      <div class="h-full p-6 md:p-10 border-2 border-brand-black shadow-custom-black flex flex-col gap-6">
        <div class="flex flex-col gap-6 flex-grow">
          <h3 class="text-lg md:text-4xl font-bold font-lexend">{title}</h3>
          <p class="text-md font-poppins">{description}</p>

          <div class="flex flex-col md:flex-row gap-4 font-poppins">
            <div class="flex items-center">
              <ClockIcon class="h-5 w-5 text-brand-black mr-2" />
              <span>{duration}</span>
            </div>
            <div class="flex items-center">
              <UsersIcon class="h-5 w-5 text-brand-black mr-2" />
              <span>{audience}</span>
            </div>
            <div class="flex items-center">
              <LightbulbIcon class="h-5 w-5 text-brand-black mr-2" />
              <span>{format}</span>
            </div>
          </div>

          <div class="font-poppins">
            <p class="text-lg font-semibold">
              {formattedPrice}
            </p>
            <p class="text-sm text-gray-600">
              Prisen er ekskl. moms og eventuelle transportomkostninger
            </p>
          </div>

          <div class="font-poppins">
            <h4 class="font-bold mb-2">Nøgleemner:</h4>
            <ul class="space-y-2">
              {bulletPoints.map((point) => (
                <li class="flex items-start">
                  <span class="text-brand-black mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div class="font-poppins">
            <h4 class="font-bold mb-2">
              Inkluderet i prisen:
            </h4>
            <ul class="space-y-2">
              {includes.map((item) => (
                <li class="flex items-start">
                  <span class="text-brand-black mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="flex justify-center mt-auto">
          <PrimaryButton href={"/contact"} text={"Book nu"} />
        </div>
      </div>
    </div>
  );
}
