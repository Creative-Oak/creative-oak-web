import PrimaryButton from "../../other/PrimaryButton.tsx";
import MobileMenu from "../../../islands/MobileMenu/MobileMenu.tsx";

export default function Navbar() {
  return (
    <nav className="fixed top-0 py-4 px-4 md:px-16 w-full z-50 [&_a]:underline [&_a]:decoration-transparent [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:decoration-inherit">
      <div className="left-0 border-brand-black shadow-custom-black border-2 bg-brand-white flex items-center justify-between px-4 md:px-8 py-4 z-50">
        {/* Logo section - always visible */}
        <div className="flex-grow md:flex-grow-0">
          <a className="font-bold text-lg w-16 block" href="/">
            <img src="/images/logo.svg" className="w-16" alt="Logo" />
          </a>
        </div>

        {/* Mobile menu toggle island */}
        <MobileMenu />

        {/* Desktop menu - static */}
        <div className="hidden md:flex items-center gap-8 justify-end w-full space-x-4">
          <a href="/om-os" className="hover:text-gray-600">Om os</a>

          {/* Services dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-600">Services ▾</button>
            <div className="absolute invisible opacity-0 translate-y-[10px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 top-full mt-2 flex flex-col gap-2 bg-white shadow-custom-black border-brand-black p-2 border-2 transition-all duration-200 ease-in-out">
              <a href="/koeb-hjemmeside" className="block hover:text-gray-600">
                Hjemmeside
              </a>
              <a href="/services/development" className="block hover:text-gray-600">
                Development
              </a>
            </div>
          </div>

          <a href="/portfolio" className="hover:text-gray-600">Portfolio</a>
          <a href="/artikler" className="hover:text-gray-600">Artikler</a>
          <PrimaryButton href="/kontakt" text="Kontakt" />
        </div>
      </div>
    </nav>
  );
}