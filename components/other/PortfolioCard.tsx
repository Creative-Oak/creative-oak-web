import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";

interface PortfolioCardProps {
  title: string;
  short_description: string;
  tags?: string[];
  image?: Image;
  slug: string;
}

const PortfolioCard = (props: PortfolioCardProps) => {
  return (
    <a
      href={`/projects/${props.slug}`}
      className="block bg-white border-2 border-brand-black  hover:shadow-custom-black transition-shadow transform "
    >
      <div className="">
        {props.image && (
          <img
            src={urlFor(props.image)}
            alt={props.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div class="p-4 md:p-6">
          <h3 className="text-xl font-lexend font-semibold ">{props.title}</h3>
          <p className="text-brand-black-600">{props.short_description}</p>
          <div class="mt-6">
            {props.tags && (
              <ul className="flex flex-wrap gap-2 mt-2">
                {props.tags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-brand-yellow text-sm border-2 border-brand-black shadow-custom-black py-1 px-2 "
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default PortfolioCard;
