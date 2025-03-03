import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";
import CustomSection from "../components/sections/ContentSections/CustomSection.tsx";
import PromoForm from "../islands/Forms/PromoForm.tsx";
import "jsr:@std/dotenv/load";

export default function KontaktPage({ url }: PageProps) {
  const pageTitle = "Gratis Bæredygtig Hjemmeside Lodtrækning";
  const metaDescription = "Kontakt Creative Oak for bæredygtige hjemmesider, " +
    "AI-løsninger og visuel produktion. Ring på +45 53 53 42 90 eller skriv " +
    "til hej@creativeoak.dk. Find os i hjertet af Aarhus.";

  return (
    <>
      <CustomHead
        title={`${pageTitle} | AI, Web & Foto/Video | Aarhus`}
        imageUrl={`${url.origin}/images/og/og-logo.jpg`}
        url={url.href}
        metaDescription={metaDescription}
      />
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main>
        <CustomSection
          title={pageTitle}
          description="Internettet står for 3,7% af den globale CO2-udledning. Beskriv, hvordan du arbejder med, eller gerne vil arbejde med, grøn omstilling og deltag i lodtrækningen om en professionel og grøn hjemmeside.
Udfyld formularen herunder - vi kontakter vinderen direkte."
        >
          <PromoForm />
        </CustomSection>

        <Splitter />
      </main>

      <Footer />
    </>
  );
}
