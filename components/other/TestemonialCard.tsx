import { urlFor } from "../../utils/imageBuild.ts";
import Testemonial from "../../types/Testemonials.ts";

interface TestimonialCardProps extends Testemonial {
  compact?: boolean;
}

const TestemonialCard = ({ compact = false, ...props }: TestimonialCardProps) => {
  return (
    <div className="border-2 border-brand-black shadow-custom-black flex flex-col">
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <p className="italic">
          {props.content}
        </p>
      </div>
      <div className={`${compact ? 'px-4 py-3' : 'px-6 py-4'} flex gap-4 border-t-2 border-brand-black`}>
        <div className={`relative ${compact ? 'w-16 h-16' : 'w-20 h-20'} flex-shrink-0`}>
          <div className="absolute rounded-full overflow-hidden">
            <img
              src={urlFor(props.image)}
              alt={props.image_alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-2 shadow-custom-black-sm border-brand-black" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold">{props.name}</p>
          <p className="text-brand-black-400">{props.title}</p>
        </div>
      </div>
    </div>
  );
};
export default TestemonialCard;