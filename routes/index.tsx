// routes/index.tsx
import { Head } from "$fresh/runtime.ts";

import HeroSection1 from "../components/sections/HeroSections/heroSection1.tsx";
import Splitter from "../components/other/splitter.tsx";
import CarouselSection from "../components/sections/UtiliySections/MarqueeSection.tsx";
import ServiceCardSection from "../components/sections/ContentSections/ServiceCardSection.tsx";
import InvisibleTextSection from "../components/sections/ContentSections/InvisibleTextSection.tsx";
import PortfolioSection from "../components/sections/ContentSections/PortfolioSection.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>FUCk Oak</title>
        <meta name="debug" content="Head function is working!" />
      </Head>
      <HeroSection1
        rightImage="./images/hero1.avif"
        header="Velkommen til"
        buttonText1="Læs mere om os"
        subtitle="Creative Oak er en kreativ virksomhed med fokus på at udvikle hjemmesider og software der styrker din virksomhed."
      />
      <Splitter />
      <CarouselSection />
      <Splitter />
      <ServiceCardSection />
      <Splitter />
      <InvisibleTextSection />
      <Splitter />
      <PortfolioSection />
      <Splitter />
      <CTASection
        title="Mangler du hjælp til noget?"
        description="Skriv hvis der er noget vi kan hjælpe med. Hvis du er mere til mails, kan vi også nåes på hej@creativeoak.dk"
        buttonLink="#"
        buttonText="Kontakt os i dag!"
      />
      <Splitter />
      <Footer />
    </>
  );
}
