import { useState } from "preact/hooks";
import { LuMenu, LuX } from "react-icons/lu";
import PrimaryButton from "../../components/other/PrimaryButton.tsx";

interface NavigationItem {
  text: string;
  link: string;
  linkType: "static" | "external";
  openInNewTab?: boolean;
  childLinks?: NavigationItem[];
}

interface MobileMenuProps {
  navigation: NavigationItem[];
}

export default function MobileMenu({ navigation }: MobileMenuProps) {
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
          {navigation.map((item) => (
            <div key={item.text} className="flex flex-col gap-2">
              {item.childLinks && item.childLinks.length > 0 ? (
                <>
                  {/* Dropdown for items with children */}
                  <button className="text-left hover:text-gray-600">{item.text}</button>
                  <div className="ml-4 flex flex-col gap-2">
                    {item.childLinks.map((child) => (
                      <a
                        key={child.text}
                        href={child.link}
                        target={child.openInNewTab ? "_blank" : "_self"}
                        className="hover:text-gray-600"
                      >
                        {child.text}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                // Regular link
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
          <PrimaryButton href="/kontakt" text="Kontakt" />
        </div>
      </div>
    </>
  );
}
