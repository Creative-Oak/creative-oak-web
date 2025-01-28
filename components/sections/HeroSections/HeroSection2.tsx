import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondayButton.tsx";

interface Hero2Props {
  title: string;
  description: string;
  tagLine?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonLink?: string;
  buttonText?: string;
  button2Link?: string;
  button2Text?: string;
}

const HeroSection2 = (props: Hero2Props) => {
  return (
    <section className="relative pt-[95px] overflow-hidden">
      <div className="container mx-auto md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            {props.imageUrl
              ? (
                <img
                  src={props.imageUrl}
                  alt={props.imageAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )
              : (
                <div className="absolute inset-0 -z-10">
                  <div className="absolute h-full w-[200%] right-[-20%]">
                    <div className="absolute h-24 bg-brand-blue w-full -rotate-45 transform origin-right -translate-y-96">
                    </div>
                    <div className="absolute h-24 bg-brand-purple w-full -rotate-45 transform origin-right -translate-y-56">
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className="md:order-1">
            {props.tagLine && (
              <p className="text-lg text-brand-black mb-2">
                {props.tagLine}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl items-start font-bold text-brand-black mb-4 font-lexend">
              {props.title}
            </h1>
            <p
              className="text-lg md:text-xl font-poppins mb-6"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
            <div className="flex flex-wrap gap-8 items-center sm:gap-8">
              {props.buttonText && props.buttonLink && (
                // Remove the extra div wrapper entirely, or if needed, don't make it full width
                <PrimaryButton
                  text={props.buttonText}
                  href={props.buttonLink}
                />
              )}
              {props.button2Text && props.button2Link && (
                // Remove the extra div wrapper entirely, or if needed, don't make it full width
                <SecondaryButton
                  text={props.button2Text}
                  href={props.button2Link}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
