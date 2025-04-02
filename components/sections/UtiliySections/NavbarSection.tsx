// components/sections/UtiliySections/NavbarSection.tsx

import PrimaryButton from "../../other/PrimaryButton.tsx";
import MobileMenu from "../../../islands/MobileMenu/MobileMenu.tsx";

import { NavigationItem } from "../../../types/navbarItems.ts";

interface NavbarProps {
  navigation: NavigationItem[];
}

export default function Navbar({ navigation }: NavbarProps) {
  return (
    <nav className="fixed top-0 py-4 px-4 md:px-16 w-full z-50 [&_a]:underline [&_a]:decoration-transparent [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:decoration-inherit">
      <div className="left-0 border-brand-black shadow-custom-black border-2 bg-brand-white flex items-center justify-between px-4 md:px-8  z-50">
        {/* Logo section - always visible */}
        <div className="flex-grow md:flex-grow-0">
          <a className="font-bold text-lg py-2 w-20 block" href="/">
            <img src="/images/logo.svg" className="w-24" alt="Logo" />
          </a>
        </div>

        {/* Mobile menu toggle island */}
        <MobileMenu navigation={navigation} />

        {/* Desktop menu - dynamic */}
        <div className="hidden md:flex items-center gap-8 justify-end w-full py-4 space-x-4">
          {navigation.map((item) => (
            <div key={item.text} className="relative group">
              {item.childLinks?.length
                ? (
                  <>
                    <button className="hover:text-gray-600">
                      {item.text} ▾
                    </button>
                    <div className="absolute invisible opacity-0 translate-y-[10px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 top-full mt-2 flex flex-col gap-2 bg-white shadow-custom-black border-brand-black p-2 border-2 transition-all duration-200 ease-in-out">
                      {item.childLinks.map((child) => (
                        <a
                          key={child.text}
                          href={child.link}
                          target={child.openInNewTab ? "_blank" : "_self"}
                          className="block hover:text-gray-600 whitespace-nowrap"
                        >
                          {child.text}
                        </a>
                      ))}
                    </div>
                  </>
                )
                : (
                  <a
                    href={item.link}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    className="hover:text-gray-600"
                  >
                    {item.text}
                  </a>
                )}
            </div>
          ))}
          <PrimaryButton href="/kontakt" data-umami-event="contact-clicked-navbar" text="Kontakt" />
        </div>
      </div>
    </nav>
  );
}
