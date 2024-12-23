import PrimaryButton from "../../other/PrimaryButton.tsx";

interface HeroSection1Props {
  header: string;
  subtitle?: string;
  buttonText1?: string;
  rightImage: string; // Change to string type for image path
}

export default function HeroSection1(props: HeroSection1Props) {
  return (
    <section className="relative flex min-h-[90svh] pt-16 md:pt-4 flex-col md:flex-row items-center justify-between px-4 md:px-8 gap-6 container">
      <div className="w-full md:w-1/2 z-10 h-full">
        <h1 className="text-4xl text-brand-black md:text-5xl font-bold mb-4 font-lexend">{props.header}</h1>
        {props.subtitle && (
          <p className="text-lg md:text-xl font-poppins mb-6">{props.subtitle}</p>
        )}
        {props.buttonText1 && (
          <PrimaryButton text={props.buttonText1} href="#" />
        )}
      </div>

      {/* Splitter */}
      <div className="hidden md:flex w-[2px] bg-brand-black self-stretch"></div>

      <div className="w-full md:w-1/2 ">
        <img
          src={props.rightImage}
          alt={props.header}
          className="w-full p-8 h-auto object-cover"
          loading="eager" // Use eager loading for hero images
        />
      </div>
    </section>
  );
}
