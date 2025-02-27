import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import {  PageProps } from "$fresh/server.ts";
import CustomSection from "../components/sections/ContentSections/CustomSection.tsx";
import GroupOnlineForm from "../islands/Forms/GroupOnlineForm.tsx";
import "jsr:@std/dotenv/load";


export default function KontaktPage({ url }: PageProps) {

    const pageTitle = "Gratis Hjemmeside Lodtrækning for Group Online Ofre";
    const metaDescription =
        "Kontakt Creative Oak for bæredygtige hjemmesider, " +
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
                    description="Vi har set mange virksomheder blive ofre for Group Online's svindelmetoder.
Fortæl os hvordan du er blevet påvirket, og deltag i lodtrækningen om en professionel hjemmeside.
Udfyld formularen herunder - vi kontakter vinderen direkte."
                >
                    <GroupOnlineForm />
                </CustomSection>

                <Splitter />
            </main>

            <Footer />
        </>
    );
}
