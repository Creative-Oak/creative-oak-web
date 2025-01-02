import { JSX } from "preact/jsx-runtime";

interface ContentSectionProps {
  title: string;
  description: JSX.Element;
  rightAlignedText?: boolean;
  imageUrl?: string;
  extraStyles?: string;
  imageAlt?: string;
  teaser?: string;
  box1?: JSX.Element;
  box2?: JSX.Element;
  box3?: JSX.Element;
}

const ContentSection = (props: ContentSectionProps) => {
  return (
    <section class={props.extraStyles}>
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2">
            <img
              src={props.imageUrl}
              {...props.imageAlt && { alt: props.imageAlt }}
              className="w-full h-auto object-cover border-2 border-brand-black shadow-custom-black"
              loading="eager"
            />
          </div>
          <div class={props.rightAlignedText ? " order-3" : "order-1"}>
            {/* Teaser */}
            {props.teaser && (
              <p class="font-medium font-lexend">{props.teaser}</p>
            )}

            <h1 className="text-4xl mt-4 md:text-5xl font-bold  mb-4 font-lexend">
              {props.title}
            </h1>
            <div className="text-lg font-poppins mb-6 rich-text">
              {props.description}
            </div>
            {/* Boxes */}
            {(props.box1 || props.box2 || props.box3) && (
              <div class="flex gap-4 text-center flex-wrap mt-8 lg:flex-nowrap">
                {props.box1 && (
                  <div class="p-4 border-2 border-brand-black shadow-custom-black">
                    {props.box1}
                  </div>
                )}
                {props.box2 && (
                  <div class="p-4 border-2 border-brand-black shadow-custom-black">
                    {props.box2}
                  </div>
                )}
                {props.box3 && (
                  <div class="p-4 border-2 border-brand-black shadow-custom-black">
                    {props.box3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
