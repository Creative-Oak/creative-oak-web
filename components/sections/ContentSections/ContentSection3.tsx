// ContentSection3.tsx
import { VNode } from "preact";

interface BaseElementProps {
  icon: VNode;
  title: string;
}

interface ListElementProps extends BaseElementProps {
  type: "list";
  content: string[];
}

interface TextElementProps extends BaseElementProps {
  type: "text";
  content: string;
}

type ContentElementProps = ListElementProps | TextElementProps;

interface ContentSection3Props {
  title: string;
  description: string;
  elements: ContentElementProps[];
  backgroundColor?: string;
  containerMaxWidth?: string;
}

const ContentElement = ({ element }: { element: ContentElementProps }) => {
  return (
    <div class="md:p-6 flex flex-col  md:items-center md:text-center">
      <div class="md:mb-4 mb-2 w-6 h-6 md:w-12 md:h-12">
        {element.icon}
      </div>
      <h3 class="text-xl font-bold mb-2 md:mb-4">
        {element.title}
      </h3>
      {element.type === "list"
        ? (
          <ul class="text-left space-y-2">
            {element.content.map((item, index) => (
              <li key={index} class="flex">
                <span class="mr-2">•</span>
                <span class="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        )
        : (
          <p class="text-left">
            {element.content}
          </p>
        )}
    </div>
  );
};

const ContentSection3 = ({
  title,
  description,
  elements,
  backgroundColor = "bg-brand-yellow",
}: ContentSection3Props) => {
  // Calculate grid columns based on number of elements
  const getGridCols = (elementsCount: number) => {
    if (elementsCount === 1) return "grid-cols-1";
    if (elementsCount === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  // Calculate grid justification based on number of elements
  const getGridJustify = (elementsCount: number) => {
    if (elementsCount < 3) return "justify-center";
    return "";
  };

  return (
    <section class={`py-24 ${backgroundColor}`}>
      <div
        class={`container flex items-center justify-center`}
      >
        <div class="bg-brand-white border-2 border-brand-black shadow-custom-black p-8 w-full">
          <div class="md:text-center my-8">
            <h2 class="text-xl md:text-4xl mx-auto font-bold font-lexend mb-4">
              {title}
            </h2>
            <p class="md:max-w-2xl text-pretty mx-auto mb-8">
              {description}
            </p>
          </div>
          <div
            class={`grid ${getGridCols(elements.length)} gap-6 md:gap-8 ${
              getGridJustify(elements.length)
            }`}
          >
            {elements.map((element, index) => (
              <ContentElement key={index} element={element} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection3;
