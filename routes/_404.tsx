import { PageProps } from "$fresh/server.ts";
import Splitter from "../components/other/splitter.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";

export default function Error404({ url }: PageProps) {
  return (
    <>
      <CustomHead
        title="404 - Nothing to See Here | Creative Oak"
        metaDescription="Oops! This page doesn't exist. But don't worry, we have a handful of creative people and a coffee machine ready to help you move forward."
        imageUrl={`${url.origin}/images/og/og-logo.jpg`}
        url={url.href}
      />

      <div className="container pt-56  min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main 404 Section */}
          <h1 className="text-6xl font-bold mb-4">
            404
            <span className="block text-2xl mt-2">
              Oops! Looks like we drew outside the lines on this one...
            </span>
          </h1>

          <p className="text-xl mb-12">
            The page you're looking for has disappeared just like our last cake
            in the kitchen. But fear not - We actually have a
            navigation that actually works (we hope)!
          </p>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <a
              href="/"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Go to homepage</h3>
              <p className="text-sm">The safe choice</p>
            </a>

            <a
              href="/contact"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Contact us</h3>
              <p className="text-sm">
                We respond faster than this page loads
              </p>
            </a>

            <a
              href="https://www.google.com/search?q=cafe+aarhus"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow  cursor-pointer"
            >
              <h3 className="font-semibold mb-2">Grab a coffee</h3>
              <p className="text-sm">Solves nothing, but coffee is always good</p>
            </a>
          </div>

          
          {/* Fun Fact Section */}
          <div className="block p-6 border-2 border-brand-black">
            <h3 className="font-bold mb-4">Fun fact:</h3>
            <p>
              Did you know that "404" was originally the room where the web server lived
              at CERN? Now it's just the internet's way of saying "Computer says
              no". We prefer to say it with a smile.
            </p>
          </div>
          <Splitter />
          <CTASection
            title="Shall we help you move forward?"
            description="(We promise not to laugh at your 404 experience... too much)"
            buttonText="Contact us!"
            buttonLink="/contact"
          />
        </div>
      </div>

      <Splitter />
      <Footer />
    </>
  );
}
