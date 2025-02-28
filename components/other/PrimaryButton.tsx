interface ButtonProps {
  text: string;
  href: string;
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <a
    href={props.href}
    style="border: 1px solid rgb(51 55 64 / var(--tw-border-opacity))"
    class="inline-block w-auto text-center bg-brand-white text-brand-black text-sm  px-4 md:px-6 py-2.5 font-poppins hover:rounded-none border-brand-black shadow-sm transition-all duration-500 hover:shadow-custom-black"
  >
    {props.text}
  </a>
  );
};

export default PrimaryButton;
