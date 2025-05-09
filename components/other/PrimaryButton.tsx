interface ButtonProps {
  text: string;
  href: string;
  dataUmamiEvent?: string;
  showArrow?: boolean;
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <a
      href={props.href}
      data-umami-event={props.dataUmamiEvent}
      style="border: 1px solid rgb(51 55 64 / var(--tw-border-opacity))"
      class={`inline-flex items-center gap-2 w-auto text-center bg-brand-white text-brand-black text-sm px-4 md:px-6 py-2.5 font-poppins hover:rounded-none border-brand-black shadow-sm transition-all duration-500 hover:shadow-custom-black group`}
    >
      {props.text}
      {props.showArrow && (
        <span class="ml-2 transition-all duration-300 ease-in-out transform group-hover:-rotate-45">→</span>
      )}
    </a>
  );
};

export default PrimaryButton;
