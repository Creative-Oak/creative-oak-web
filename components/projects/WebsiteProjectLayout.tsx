import { Project } from "../../types/Project.ts";
import { urlFor } from "../../utils/imageBuild.ts";
import ScrollTriggerImage from "../../islands/ScrollTriggerImage.tsx";
import Splitter from "../other/splitter.tsx";
import ParallaxBackground from "../../islands/ParallaxBackground.tsx";
import CollageParallax from "../../islands/CollageParallax.tsx";
import ArrowAnimation from "../../islands/ArrowAnimation.tsx";

interface WebsiteProjectLayoutProps {
  data: Project;
}

const WebsiteProjectLayout = ({ data }: WebsiteProjectLayoutProps) => {
  return (
    <>
      <section className="bg-brand-blue relative flex flex-col min-h-[80svh] md:min-h-[100svh] justify-center items-center pt-32 pb-12 md:pt-0 md:pb-0">
        <div className="items-center text-center mb-8 md:mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-4 font-lexend">
              {data.title}
            </h1>
          </div>
        </div>
        {/* Mobile version with static image */}
        <div className="md:hidden w-full flex items-center justify-center">
          <img
            src={data.mobileImage
              ? urlFor(data.mobileImage)
              : urlFor(data.featuredImage)}
            alt={data.mobileImageAltText || data.primaryImageAltText}
            className="max-w-[calc(100%-4rem)] w-full object-contain"
          />
        </div>
        {/* Desktop version with ScrollTriggerImage */}
        <div className="hidden md:block w-full">
          {data.desktopImage && data.mobileImage
            ? (
              <ScrollTriggerImage
                desktopSrc={urlFor(data.desktopImage)}
                mobileSrc={urlFor(data.mobileImage)}
                desktopAlt={data.desktopImageAltText ||
                  `${data.title} Desktop View`}
                mobileAlt={data.mobileImageAltText ||
                  `${data.title} Mobile View`}
              />
            )
            : (
              <img
                src={urlFor(data.featuredImage)}
                alt={data.primaryImageAltText}
                className="max-w-4xl mx-auto w-full object-contain"
              />
            )}
        </div>

        {/* Arrow Animation */}
        <div className="hidden md:block absolute bottom-[10px] right-[-30px] md:bottom-[-20px] md:right-0 z-10">
          <ArrowAnimation className="w-36 h-36 md:w-24 md:h-24" />
        </div>
      </section>

      <Splitter />

      {/* Categories and Publication Date */}
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-6">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 md:justify-between">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
            {data.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 border-2 border-brand-black shadow-custom-black-400 text-sm"
              >
                {category}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Publiceret den{" "}
              <span className="font-medium">
                {new Date(data.releaseDate).toLocaleDateString("da-DK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      {data.introText && (
        <>
          <section className="bg-white pb-8 by-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-4xl font-bold text-brand-black mb-2 md:mb-6 font-lexend">
                Om {data.title}
              </h2>
              <p className="text-lg md:text-xl font-poppins text-brand-black">
                {data.introText}
              </p>
            </div>
          </section>
          <Splitter />
        </>
      )}

      {/* Full Page Smartphone Image with Parallax Effect */}
      {data.fullPageSmartphoneImage && (
        <>
          <ParallaxBackground
            imageUrl={urlFor(data.fullPageSmartphoneImage, 2400)}
            minHeight="75svh"
          />
          <Splitter />
        </>
      )}

      {/* Challenge and Solution Section */}
      {(data.challengeText || data.solutionText) && data.workplaceImage && (
        <>
          <section className="bg-brand-blue py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="w-full h-full">
                  <img
                    src={urlFor(data.workplaceImage)}
                    alt={`${data.title} Workplace`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  {data.challengeText && (
                    <>
                      <h3 className="text-2xl font-bold text-brand-white mb-4">
                        Udfordring
                      </h3>
                      <p className="text-lg font-poppins text-brand-white">
                        {data.challengeText}
                      </p>
                    </>
                  )}

                  {data.solutionText && (
                    <>
                      <h3 className="text-2xl font-bold text-brand-white mb-4 mt-8">
                        Løsning
                      </h3>
                      <p className="text-lg font-poppins text-brand-white">
                        {data.solutionText}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Splitter />
        </>
      )}

      {/* Desktop Collage Image */}
      {data.desktopCollageImage && (
        <>
          <CollageParallax
            imageUrl={urlFor(data.desktopCollageImage)}
            height="1000px"
            className="h-[600px] md:h-[1000px]"
            speed={0.25}
          />
          <Splitter />
        </>
      )}

      {/* Result Section */}
      {data.resultText && (
        <>
          <section className="bg-white py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-4xl font-bold text-brand-black mb-6 font-lexend">
                Resultat
              </h2>
              <p className="text-lg md:text-xl font-poppins text-brand-black">
                {data.resultText}
              </p>
            </div>
          </section>
          <Splitter />
        </>
      )}
    </>
  );
};

export default WebsiteProjectLayout;
