import { Content4CardType } from "../../../types/Content4Cards.ts";
import Content4Card from "../../other/Content4Card.tsx";

interface ContentSection4Props {
  title?: string;
  cards: Content4CardType[];
  centerText?: boolean;
  showBorder?: boolean;
}

const ContentSection4 = (props: ContentSection4Props) => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {props.title && (
        <h2 className="font-lexend font-bold text-2xl md:text-3xl lg:text-4xl max-w-xl mb-4 text-gray-900">
          {props.title}
        </h2>
      )}

      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-12 ">
        {props.cards.map((card) => (
          <Content4Card
            key={card.title}
            centerText={props.centerText}
            showBorder={props.showBorder}
            description={card.description}
            icon={card.icon}
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
            title={card.title}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection4;
