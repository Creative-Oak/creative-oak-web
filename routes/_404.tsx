import { PageProps } from "$fresh/server.ts";
import Splitter from "../components/other/splitter.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";

export default function Error404({ url }: PageProps) {
  return (
    <>
      <CustomHead
        title="404 - Her Var Der Ikke Noget At Se | Creative Oak"
        metaDescription="Ups! Denne side findes ikke. Men bare rolig, vi har en håndfuld kreative mennesker og en kaffemaskine klar til at hjælpe dig videre."
        imageUrl={`${url.origin}/images/og/og-logo.jpg`}
        url={url.href}
      />

      <div className="container pt-56  min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main 404 Section */}
          <h1 className="text-6xl font-bold mb-4">
            404
            <span className="block text-2xl mt-2">
              Ups! Den side har vi nok tegnet uden for linjerne...
            </span>
          </h1>

          <p className="text-xl mb-12">
            Den side du leder efter er lige så forsvundet som vores sidste kage
            i køkkenet. Men frygt ikke - Vi har faktisk en
            navigation der faktisk virker (håber vi)!
          </p>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <a
              href="/"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Gå til forsiden</h3>
              <p className="text-sm">Det sikre valg</p>
            </a>

            <a
              href="/kontakt"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Kontakt os</h3>
              <p className="text-sm">
                Vi svarer hurtigere end denne side loader
              </p>
            </a>

            <a
              href="https://www.google.com/search?q=cafe+aarhus"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Tag en kop kaffe</h3>
              <p className="text-sm">Løser intet, men kaffe er altid godt</p>
            </a>
          </div>

          
          {/* Fun Fact Section */}
          <div className="block p-6 border-2 border-brand-black">
            <h3 className="font-bold mb-4">Fun fact:</h3>
            <p>
              Vidste du at "404" oprindeligt var rummet hvor webserveren boede
              på CERN? Nu er det bare internettets måde at sige "Computer says
              no". Vi foretrækker at sige det med et smil.
            </p>
          </div>
          <Splitter />
          <CTASection
            title="Skal vi hjælpe dig videre?"
            description="(Vi lover ikke at grine af din 404-oplevelse... så meget)"
            buttonText="Kontakt os!"
            buttonLink="/contact"
          />
        </div>
      </div>

      <Splitter />
      <Footer />
    </>
  );
}
