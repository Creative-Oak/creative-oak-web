

interface ContentSectionProps {
  title: string;
  description: string;
  rightAlignedText?: boolean;
  imageUrl?: string;
  extraStyles?: string;
  imageAlt?: string;
  teaser: string;
  box1?: string;
  box2?: string;
  box3?: string;
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
          </div >
          <div class={props.rightAlignedText ? " order-3" : "order-1"} >
            <p class="font-medium font-lexend">{props.teaser}</p>
            <h1 className="text-4xl mt-4 md:text-5xl font-bold  mb-4 font-lexend">
              {props.title}
            </h1>
            <p
              className="text-lg font-poppins mb-6 rich-text"
              dangerouslySetInnerHTML={{ __html: props.description }}
            >
            </p>
            {/* Boxes */}
            {props.box1 && props.box2 && props.box3 && (
              <div class="flex gap-4 text-center flex-wrap lg:flex-nowrap">
                <div class="p-4 border-2 border-brand-black shadow-custom-black">
                  {props.box1}
                </div>
                <div class="p-4 border-2 border-brand-black shadow-custom-black">
                  {props.box2}
                </div>
                <div class="p-4 border-2 border-brand-black shadow-custom-black">
                  {props.box3}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
