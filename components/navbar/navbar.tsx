export default function Navbar() {
  return (
    <nav className="fixed top-0 py-4 px-16 w-full z-50">
      <div className=" left-0 border-brand-black shadow-custom-black border-2 bg-brand-white flex items-center justify-between px-8 py-4 z-50">
        <div className="flex items-center w-full space-x-4">
          {/* Logo or brand name */}
          <a className="font-bold text-lg" href="/">LOGO</a>

          {/* Example links */}
          <a href="/om-os" className="hover:text-gray-600">Om os</a>

          {/* Simple hover dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-600">Services ▾</button>
            <div className="hidden group-hover:block absolute mt-2 bg-white shadow p-2 border">
              <a href="/services/design" className="block hover:text-gray-600">
                Design
              </a>
              <a
                href="/services/development"
                className="block hover:text-gray-600"
              >
                Development
              </a>
            </div>
          </div>

          <a href="/portfolio" className="hover:text-gray-600">Portfolio</a>
          <a href="/artikler" className="hover:text-gray-600">Artikler</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language switcher example */}
          <button className="hover:text-gray-600 flex items-center">
            DK
            <img
              src="/dk-flag-icon.png"
              alt="Danish"
              className="ml-1 w-4 h-4"
            />
          </button>

          {/* CTA button */}
          <a
            href="/kontakt"
            className="bg-brand-purple text-white py-1 px-4 rounded hover:bg-brand-purple"
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
}
