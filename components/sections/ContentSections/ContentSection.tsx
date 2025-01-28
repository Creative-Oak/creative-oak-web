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
  const hasImage = !!props.imageUrl;
  const hasBoxes = !!(props.box1 || props.box2 || props.box3);

  return (
    <section class={props.extraStyles}>
      <div className="container mx-auto py-24">
        <div className={`grid grid-cols-1 ${hasImage ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          {hasImage && (
            <div class="order-2">
              <img
                src={props.imageUrl}
                {...props.imageAlt && { alt: props.imageAlt }}
                className="w-full h-auto object-cover border-2 border-brand-black shadow-custom-black"
                loading="eager"
              />
            </div>
          )}
          <div class={`${hasImage && props.rightAlignedText ? 'order-3' : 'order-1'} ${!hasImage ? 'md:col-span-full' : ''}`}>
            {props.teaser && (
              <p class="font-medium font-lexend">{props.teaser}</p>
            )}

            <h2 className="text-4xl mt-4 md:text-5xl font-bold mb-4 font-lexend">
              {props.title}
            </h2>
            <div className="text-lg font-poppins mb-6 ">
              {props.description}
            </div>
            {hasBoxes && (
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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