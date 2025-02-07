interface ButtonProps {
  text: string;
  href: string;
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <a
      href={props.href}
      className="text-brand-black bg-brand-white px-4 md:px-6 py-2 md:py-1.5 font-poppins rounded-md hover:rounded-none border-brand-black border-2 hover:bg-brand-black hover:text-brand-white transition-all duration-500 shadow-custom-black"
    >
      {props.text}
    </a>
  );
};

export default PrimaryButton;
