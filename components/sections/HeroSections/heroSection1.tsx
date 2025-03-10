import LottieAnimation from "../../../islands/LottieAnimation.tsx";
import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondaryButton.tsx";

interface HeroSection1Props {
  header: string;
  subtitle?: string;
  buttonText1?: string;
  buttonLink1?: string;
  buttonText2?: string;
  buttonLink2?: string;
  rightImage?: string;
  lottieAnimation?: string;
}

export default function HeroSection1(props: HeroSection1Props) {
  const hasButtons = props.buttonText1 || props.buttonText2;

  return (
    <section className="relative pt-[calc(95px+16px)] flex min-h-[80svh] md:pt-[95px] flex-col md:flex-row items-center justify-between gap-12 container">
      <div className="w-full md:w-2/3 z-10 h-full">
        <h1 className="text-4xl md:text-7xl text-brand-black font-bold mb-4 leading- md:leading-tight font-lexend">
          {props.header}
        </h1>
        {props.subtitle && (
          <p className="text-lg md:text-xl font-poppins mb-6">
            {props.subtitle}
          </p>
        )}

        {/* Buttons Section using existing components with correct props */}
        {hasButtons && (
          <div className="flex flex-wrap gap-4 mt-8">
            {props.buttonText1 && props.buttonLink1 && (
              <PrimaryButton
                text={props.buttonText1}
                href={props.buttonLink1}
              />
            )}

            {props.buttonText2 && props.buttonLink2 && (
              <SecondaryButton
                text={props.buttonText2}
                href={props.buttonLink2}
              />
            )}
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2">
        {props.lottieAnimation
          ? (
            <LottieAnimation
              animationPath={props.lottieAnimation}
              className="w-full md:p-8 h-auto"
            />
          )
          : props.rightImage
          ? (
            <img
              src={props.rightImage}
              alt={props.header}
              className="w-full p-8 h-auto object-cover"
              loading="eager"
            />
          )
          : null}
      </div>
    </section>
  );
}
