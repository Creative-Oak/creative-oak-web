import { Project } from "../../types/Project.ts";
import { urlFor, urlForFile } from "../../utils/imageBuild.ts";
import ScrollTriggerImage from "../../islands/ScrollTriggerImage.tsx";
import Splitter from "../other/splitter.tsx";
import ParallaxBackground from "../../islands/ParallaxBackground.tsx";
import ArrowAnimation from "../../islands/ArrowAnimation.tsx";
import AnimatedImageSection from "../../islands/AnimatedImageSection.tsx";

interface WebsiteProjectLayoutProps {
  data: Project;
}

const WebsiteProjectLayout = ({ data }: WebsiteProjectLayoutProps) => {

  // Prepare images for the animated section
  const animatedImages = [
    ...(data.galleryImage1 ? [{
      src: urlFor(data.galleryImage1),
      alt: data.galleryImage1AltText || `${data.title} Gallery Image 1`
    }] : []),
    ...(data.galleryImage2 ? [{
      src: urlFor(data.galleryImage2),
      alt: data.galleryImage2AltText || `${data.title} Gallery Image 2`
    }] : []),
    ...(data.galleryImage3 ? [{
      src: urlFor(data.galleryImage3),
      alt: data.galleryImage3AltText || `${data.title} Gallery Image 3`
    }] : []),
   
  ];

  return (
    <>
      <section className="bg-brand-blue relative flex flex-col min-h-[80svh] justify-center items-center pt-32 pb-12 overflow-hidden">
        <div className="w-full max-w-7xl px-6 mx-auto">
          <h1 className="text-l md:text-l font-bold text-brand-white font-lexend text-left">
            <a href="/works" className="opacity-20 hover:opacity-100 transition-opacity duration-300">Works/</a>
            {data.title}
          </h1>
          <h2 className="text-brand-white text-4xl font-bold font-lexend mb-4 md:mb-8">
            {data.projectShortDescription}
          </h2>
          {/* Mobile version with static image */}
          {/* <div className="md:hidden w-full flex items-center justify-center">
            <img
              src={data.mobileImage
                ? urlFor(data.mobileImage)
                : urlFor(data.featuredImage)}
              alt={data.mobileImageAltText || data.primaryImageAltText}
              className="max-w-[calc(100%-4rem)] w-full object-contain"
            />
          </div> */}
          {/* Desktop version with ScrollTriggerImage */}
          <div className=" w-full">
            {(data.desktopImage || data.desktopVideo) && data.mobileImage
              ? (
                <ScrollTriggerImage
                  desktopSrc={data.desktopImage ? urlFor(data.desktopImage) : undefined}
                  mobileSrc={urlFor(data.mobileImage)}
                  desktopVideoSrc={data.desktopVideo ? urlForFile(data.desktopVideo.asset) : undefined}
                  desktopAlt={data.desktopVideoAltText || data.desktopImageAltText ||
                    `${data.title} Desktop View`}
                  mobileAlt={data.mobileImageAltText ||
                    `${data.title} Mobile View`}
                  isVideo={!!data.desktopVideo}
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
        </div>
        {/* Arrow Animation */}
        <div className="hidden md:block absolute bottom-[10px] right-[-30px] md:bottom-[-20px] md:right-0 z-10">
          <ArrowAnimation className="w-36 h-36 md:w-24 md:h-24" />
        </div>
      </section>

      <Splitter />

      {/* Combined Intro and Project Details Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 md:gap-10 gap-4 items-center">
            {/* Intro Text - Takes 2/3 on larger screens */}
            <div className="lg:col-span-2 ">
              {data.introText && (
                <>
                  <h2 className="text-md  text-brand-black opacity-50 mb-2  font-lexend">
                    About
                  </h2>
                  <p className="text-lg  font-poppins leading-8 text-brand-black">
                    {data.introText}
                  </p>
                </>
              )}
            </div>

            {/* Project Details - Takes 1/3 on larger screens */}
            <div className="lg:col-span-1">
     
              
              {/* Year */}
              <div className="mb-4">
                <h4 className="text-sm  text-brand-black opacity-50 uppercase tracking-wide mb-1">
                  Year
                </h4>
                <p className="text-brand-black ">
                  {new Date(data.releaseDate).getFullYear()}
                </p>
              </div>

              {/* Client */}
              <div className="mb-4">
                <h4 className="text-sm  text-brand-black opacity-50 uppercase tracking-wide mb-1">Client</h4>
                <p className="text-brand-black ">
                  {data.title}
                </p>
              </div>
              
              {/* Industry */}
              {data.industry && (
                <div className="mb-4">
                  <h4 className="text-sm  text-brand-black opacity-50 uppercase tracking-wide mb-1">Industry</h4>
                  <p className="text-brand-black ">
                    {data.industry}
                  </p>
                </div>
              )}

              {/* Type */}
              <div className="mb-4">
                <h4 className="text-sm  text-brand-black opacity-50 uppercase tracking-wide mb-1">Type</h4>
                <p className="text-brand-black ">
                  Website
                </p>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h4 className="text-sm  text-brand-black opacity-50 uppercase tracking-wide mb-1">
                Scope
                </h4>
                <div className="flex flex-col gap-2">
                  {data.categories.map((category, index) => (
                    <span
                      key={index}
                      className=""
                    >
                      {typeof category === 'string' ? category : category.title}
                    </span>
                  ))}
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </section>

      <Splitter />

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-center">
                <div className="w-full h-full md:col-span-2 mb-8 md:mb-0">
                  <img
                    src={urlFor(data.workplaceImage)}
                    alt={`${data.title} Workplace`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="md:col-span-1">
                  {data.challengeText && (
                    <>
                      <h3 className="text-md  text-brand-white opacity-60 ">
                        The challenge
                      </h3>
                      <p className="text-lg font-poppins text-brand-white leading-8">
                        {data.challengeText}
                      </p>
                    </>
                  )}

                  {data.solutionText && (
                    <>
                      <h3 className="text-sm  text-brand-white opacity-60  mt-8">
                        The solution
                      </h3>
                      <p className="text-lg font-poppins text-brand-white leading-8">
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


      

      {/* Three Full-Size Images */}
      {animatedImages.length > 0 && (
        <>
          <section className="bg-white py-8 md:py-16">
            <AnimatedImageSection images={animatedImages} />
          </section>
          <Splitter />
        </>
      )}

      {/* Result Section */}
      {data.resultText && (
        <>
          <section className="bg-white py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
                {/* Result Text - Takes 1/3 on larger screens */}
                <div className="lg:col-span-1">
                  <h2 className="text-md  text-brand-black opacity-50 font-lexend">
                    The result
                  </h2>
                  <p className="text-lg font-poppins text-brand-black leading-8">
                    {data.resultText}
                  </p>
                </div>
            
                {/* Result Image - Takes 2/3 on larger screens */}
                <div className="lg:col-span-2">
                  {data.galleryImage4 && (
                    <img
                      src={urlFor(data.galleryImage4)}
                      alt={`${data.galleryImage4AltText} Result`}
                      className="w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          <Splitter />
        </>
      )}
    </>
  );
};

export default WebsiteProjectLayout;