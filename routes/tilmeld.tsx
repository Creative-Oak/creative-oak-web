import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";
import CustomSection from "../components/sections/ContentSections/CustomSection.tsx";
import MailerLiteForm from "../islands/MailerLite.tsx";

export default function TilmeldPage({ url }: PageProps) {
  const pageTitle = "Tilmeld dig Creative Oaks Nyhedsbrev";
  const metaDescription =
    "Tilmeld dig Creative Oaks nyhedsbrev for bæredygtige hjemmesider, " +
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
          description="Få vores gratis klimakogebog og månedlige insights om AI, bæredygtig webudvikling og digital teknologi. Tilmeld dig nyhedsbrevet og få straks '5 Nemme Opskrifter på en Grønnere Hjemmeside' - din praktiske guide til at reducere din hjemmesides klimaaftryk."
        >
          <MailerLiteForm />
        </CustomSection>

        <Splitter />
      </main>

      <Footer />
    </>
  );
}
