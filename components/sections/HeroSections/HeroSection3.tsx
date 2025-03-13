import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondayButton.tsx";

interface Hero3Props {
  title: string;
  description: string;
  tagLine?: string;
  buttonLink?: string;
  buttonText?: string;
  button2Link?: string;
  button2Text?: string;
  backgroundImage?: string;
}

const HeroSection3 = (props: Hero3Props) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: props.backgroundImage
            ? `url(${props.backgroundImage})`
            : "url(/api/placeholder/1920/1080)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

      {/* Main content container with flex centering */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:order-1 text-white">
              {props.tagLine && (
                <p className="text-lg font-medium text-blue-400 mb-4 animate-fade-in">
                  {props.tagLine}
                </p>
              )}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-lexend leading-tight">
                {props.title}
              </h1>
              <p
                className="text-lg leading-9 font-poppins mb-8 text-gray-200"
                dangerouslySetInnerHTML={{ __html: props.description }}
              />
              <div className="flex flex-wrap gap-6 items-center">
                {props.buttonText && props.buttonLink && (
                  <PrimaryButton
                    text={props.buttonText}
                    href={props.buttonLink}
                  />
                )}
                {props.button2Text && props.button2Link && (
                  <SecondaryButton
                    text={props.button2Text}
                    href={props.button2Link}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;