import { Image } from "@sanity/types";
import { urlFor } from "../../utils/imageBuild.ts";

interface PortfolioCardProps {
  title: string;
  short_description: string;
  tags?: string[];
  image?: Image;
}

const PortfolioCard = (props: PortfolioCardProps) => {
  return (
    <a class="bg-brand-white p-4 border-2 border-brand-black hover:shadow-custom-black transition-shadow">
      <div>
        {props.image && <img src={urlFor(props.image)} alt={props.title} />}

        <h3>{props.title}</h3>
        <p>{props.short_description}</p>
        <ul>
          {props.tags &&
            props.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </a>
  );
};
export default PortfolioCard;
