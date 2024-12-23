import { useState } from "preact/hooks";

import {LuMenu, LuX} from 'react-icons/lu';
import PrimaryButton from "../../components/other/PrimaryButton.tsx";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      {/* Mobile menu content */}
      <div
        className={`absolute m-4 top-[75px] left-0 right-0 bg-white border-brand-black border-2 shadow-custom-black mt-4 p-4 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-4">
          <a href="/om-os" className="hover:text-gray-600">Om os</a>
          
          {/* Mobile services dropdown */}
          <div className="flex flex-col gap-2">
            <button className="text-left hover:text-gray-600">Services</button>
            <div className="ml-4 flex flex-col gap-2">
              <a href="/services/design" className="hover:text-gray-600">
                Design
              </a>
              <a href="/services/development" className="hover:text-gray-600">
                Development
              </a>
            </div>
          </div>

          <a href="/portfolio" className="hover:text-gray-600">Portfolio</a>
          <a href="/artikler" className="hover:text-gray-600">Artikler</a>
          <PrimaryButton href="/kontakt" text="Kontakt" />
        </div>
      </div>
    </>
  );
}