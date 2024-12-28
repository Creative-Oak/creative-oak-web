import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondayButton.tsx";

interface Hero2Props {
  title: string;
  description: string;
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
      <div className="container mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2 ">
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
                <div className="absolute h-full w-[200%] right-[-20%]">  {/* Changed from right-0 to right-[20%] */}
                  <div className="absolute h-24 bg-brand-blue w-full -rotate-45 transform origin-right -translate-y-96"></div>
                  <div className="absolute h-24 bg-brand-purple w-full -rotate-45 transform origin-right -translate-y-56"></div>
                </div>
              </div>
              )}
          </div>
          <div className="md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4 font-lexend">
              {props.title}
            </h1>
            <p
              className="text-lg md:text-xl font-poppins mb-6"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
            <div className="flex flex-row gap-4 flex-wrap">
              {props.buttonLink && props.buttonText && (
                <PrimaryButton
                  text={props.buttonText}
                  href={props.buttonLink}
                />
              )}
              {props.button2Link && props.button2Text && (
                <SecondaryButton
                  href={props.button2Link}
                  text={props.button2Text}
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
