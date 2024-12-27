import { urlFor } from "../../utils/imageBuild.ts";
import Testemonial from "../../types/Testemonials.ts";

const TestemonialCard = (props: Testemonial) => {
  return (
    <div class="border-2 border-brand-black shadow-custom-black">
      <div class="p-6">
        <p class="italic">
          {props.content}
        </p>
      </div>
      <div class="px-6 py-4 flex gap-4 border-t-2 border-brand-black">
        <img
          src={urlFor(props.image)}
          alt={props.image_alt}
          class="rounded-full w-20 border-brand-black border-2"
        />
        <div class="flex flex-col justify-center">
          <p class="font-bold">{props.name}</p>
          <p class="text-brand-black-400">{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestemonialCard;
