import PrimaryButton from "../../other/PrimaryButton.tsx";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
}

const CTASection = (props: CTAProps) => {
  const bgColor = props.backgroundColor || "transparent"; // Default to transparent if not provided

  return (
    <section className={`${bgColor !== "transparent" ? "bg-" + bgColor : ""}`}>
      <div className="container py-8 ">
        <div className="text-center w-fit mx-auto p-6 md:p-10 border-2 border-brand-black shadow-custom-black flex flex-col gap-6 bg-white">
          <h2 className="text-lg md:text-4xl max-w-lg font-bold font-lexend">
            {props.title}
          </h2>
          <p className="text-md max-w-lg font-poppins">{props.description}</p>
          <div className="flex justify-center">
            <PrimaryButton href={props.buttonLink} text={props.buttonText} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
