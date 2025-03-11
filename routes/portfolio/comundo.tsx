import { PageProps } from "$fresh/server.ts";
import HeroSection1 from "../../components/sections/HeroSections/heroSection1.tsx";
import HeroSection2 from "../../components/sections/HeroSections/HeroSection2.tsx";
import Splitter from "../../components/other/splitter.tsx";
import Footer from "../../components/sections/UtiliySections/FooterSection.tsx";
import CTASection from "../../components/sections/UtiliySections/CTASection.tsx";
import CustomHead from "../../components/other/CustomHead.tsx";
import ScrollTriggerImage from "../../islands/ScrollTriggerImage.tsx";

const ComundoPage = ({ url }: PageProps) => {
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  return (
    <>
      <CustomHead
        title="Comundo Project"
        imageUrl="/path/to/default/image.jpg"
        metaDescription="Description of the Comundo project."
        url={currentUrl.toString()}
        ogType="article"
      />
      <section class="bg-brand-yellow pt-[95px]">
        <div class="container mx-auto px-4 md:px-8 py-20 pb-6">
          <div class="gap-8 items-center">
            <div>
              <h1 class="text-6xl md:text-5xl font-bold text-brand-black mb-4 font-lexend">
                Comundo
              </h1>
              <p class="text-lg md:text-xl font-poppins mb-6">
                Start automating. Stop time-wasting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Splitter />

      <section class="relative pt-[calc(95px+16px)] flex min-h-[80svh] md:pt-[95px] flex-col md:flex-row items-center justify-between gap-12 container">
        <ScrollTriggerImage
          desktopSrc="/images/portfolio/comundo/Desktop.webp"
          mobileSrc="/images/portfolio/comundo/Smartphone.webp"
          desktopAlt="Comundo Desktop Image"
          mobileAlt="Comundo Smartphone Image"
        />
      </section>

      <Splitter />

      <section
        class="w-full flex-col min-h-[80vh] bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            `url('/images/portfolio/comundo/FullPageSmartphone.webp')`,
        }}
      >
        <div class="py-24"></div>
        <div class="py-24"></div>
        <div class="py-24"></div>
        <div class="py-24"></div>
        <div class="py-24"></div>
        <div class="py-24"></div>
      </section>

      <Splitter />
      <CTASection
        buttonLink="/kontakt"
        buttonText="Book et uforpligtende møde"
        description="Det er vi også - på dit projekt! Vi har kaffen klar (og en masse gode idéer i ærmet)."
        title="Er du blevet nysgerrig?"
      />
      <Footer />
    </>
  );
};

export default ComundoPage;
