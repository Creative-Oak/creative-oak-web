import { Head } from "$fresh/runtime.ts";
import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";

import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

const TakPage = () => {
    return (
        <>
            <Head>
                <title>Tak!</title>
            </Head>
            <HeroSection2
                title="Tak"
                description="Du hører fra os snarest muligt!"
            />
            <Splitter />
            <ContentSection
                title="Imens du venter..."
                description={
                    <p>
                        ... kan du se med om hvad vi laver{" "}
                        <a href="/portfolio">her</a>{" "}
                        eller tilmelde dig vores nyhedsbrev{" "}
                        <a
                            href="https://www.newsletter.creativeoak.dk/subscribe"
                            target="_blank"
                        >
                            her
                        </a>
                    </p>
                }
                imageUrl="/images/foto-video.avif"
            />
            <Splitter />
            <Footer />
        </>
    );
};

export default TakPage;
