interface ButtonProps {
  text: string;
  href: string;
}

const SecondaryButton = (props: ButtonProps) => {
  return (
    <a
    href={props.href}
    style="border: 1px solid rgb(51 55 64 / var(--tw-border-opacity))"
    class="inline-block w-auto text-center text-brand-white text-sm bg-brand-blue px-4 md:px-6 py-2.5 font-poppins hover:rounded-none border-brand-black shadow-sm transition-all duration-500 hover:shadow-custom-black"
  >
    {props.text}
  </a>
  );
};

export default SecondaryButton;
