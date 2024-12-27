import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondayButton.tsx";
interface Hero2Props {
  title: string;
  description: string;
  imageUrl?: string;
  buttonLink?: string;
  buttonText?: string;
  button2Link?: string;
  button2Text?: string;
}

const HeroSection2 = (props: Hero2Props) => {
  return (
    <section>
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            {props.imageUrl && (
              <img
                src="/images/hero-section-2.png"
                alt="Hero section 2"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            )}
          </div>
          <div className="md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4 font-lexend">
              {props.title}
            </h1>
            <p
              className="text-lg md:text-xl font-poppins mb-6"
              dangerouslySetInnerHTML={{ __html: props.description }}
            >
            </p>
            
            <div class="flex flex-row gap-4 flex-wrap">
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
