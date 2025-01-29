import Splitter from "../components/other/splitter.tsx";
import ContentSection from "../components/sections/ContentSections/ContentSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";

import ContentSection3 from "../components/sections/ContentSections/ContentSection3.tsx";
import {
    CameraIcon,
    PaletteIcon,
    VideoIcon,
} from "../components/icons/Icons.tsx";
import FAQSection from "../components/sections/ContentSections/FAQSection.tsx";
import CustomHead from "../components/other/CustomHead.tsx";
import { PageProps } from "$fresh/server.ts";

const DigitalContentPage = ({ url }: PageProps) => {
    return (
        <>
            <CustomHead
                title="Digital Content Produktion | Bæredygtig Indholdsproduktion | Creative Oak"
                metaDescription="Professionel digital content produktion med fokus på bæredygtighed. Vi skaber engagerende indhold der performer - fra video og foto til grafisk design."
                imageUrl={`${url.origin}/images/og/og-logo.jpg`}
                url={url.href}
            />

            <HeroSection2
                description="Fra idé til færdigt content der både engagerer og performer. Vi skaber digitalt indhold der får dit brand til at stå knivskarpt - og gør det med omtanke for både målgruppe og miljø."
                title="Digitalt content der rammer plet (og sparer på strømmen)"
            />
            <Splitter />
            <ContentSection3
                title="Din digitale superhelt (bare uden stramt lycra-tøj)"
                description="Vi er det hemmelige våben i din content-værktøjskasse. Tænk på os som din digitale schweiziske lommekniv - bare uden den akavet metalliske lyd når vi folder os ud!"
                elements={[
                    {
                      type: "text",
                      icon: <VideoIcon />,
                      title: "Fra kedelig til viral (næsten)",
                      content: "Vi forvandler dine idéer hurtigere end du kan sige 'TikTok-dans'. Med en blanding af kreativ magi og strategisk snusfornuft, skaber vi content der får selv din teenagers Instagram-feed til at virke kedelig.",
                    },
                    {
                      type: "text",
                      icon: <CameraIcon />,
                      title: "Content der sparker... data",
                      content: "Vi er nørder med stil. Mens andre poster blindt og håber på det bedste, analyserer vi data som var det en spændende Netflix-serie. Vi ved præcis hvad der virker - og det er ikke bare kattebilleder (selvom de også virker).",
                    },
                    {
                      type: "text",
                      icon: <PaletteIcon />,
                      title: "Grønnere end din nabos græsplæne",
                      content: "Vi er så miljøbevidste, at selv vores servere kører på økologisk strøm (okay, det var en løgn, men vi optimerer alt vi laver til at være så miljøvenligt som muligt). Fordi fremtiden skal være grøn - og ikke bare i Photoshop.",
                    },
                  ]}
            />
            <Splitter />
            <ContentSection
                description={
                    <span class="text-brand-white">
                        <span class="flex flex-col  gap-4 text-">
                            <div>
                                <strong>Video- og fotoproduktion</strong>
                                <p>
                                    Professionelle video- og fotoproduktioner
                                    der fanger øjet og holder på opmærksomheden.
                                    Vi håndterer alt fra produkt-shoots til
                                    brandingfilm og sociale medier content -
                                    altid i høj kvalitet og med fokus på dit
                                    budget. <br /> Læs mere om foto- og videoproduktion {" "}
                                    <a
                                        class="hover:text-brand-red transition-colors underline"
                                        href="/foto-video"
                                    >
                                        her
                                    </a>
                                </p>
                            </div>
                            <div>
                                <strong>Visuel identitet</strong>
                                <p>
                                    Professionelle video- og fotoproduktioner
                                    der fanger øjet og holder på opmærksomheden.
                                    Vi håndterer alt fra produkt-shoots til
                                    brandingfilm og sociale medier content -
                                    altid i høj kvalitet og med fokus på dit
                                    budget. <br /> Læs mere om hvordan i kan få en ny  {" "}
                                    <a
                                        class="hover:text-brand-red transition-colors underline"
                                        href="/visuel-identitet"
                                    >
                                        visuel identitet
                                    </a>
                                </p>
                            </div>
                            <div>
                                <strong>Grafisk design & UI/UX</strong>
                                <p>
                                    Skræddersyet grafisk design der både ser
                                    godt ud og fungerer i praksis. Vi designer
                                    alt fra SoMe-grafik og præsentationer til
                                    komplette websites og apps med fokus på
                                    brugeroplevelsen.<br />
                                    Læs mere om hvordan vi arbejder med  {" "}
                                    <a
                                        class="hover:text-brand-red transition-colors underline"
                                        href="/grafisk-design"
                                    >
                                        grafisk design
                                    </a>
                                </p>
                            </div>
                        </span>
                    </span>
                }
                imageUrl="/images/graphic.webp"
                teaser=""
                imageAlt="Tegning af en mand der arbejder med kreativt content produktion"
                rightAlignedText={false}
                extraStyles="bg-brand-blue text-brand-white"
                title="Det kan vi hjælpe med"
            />

            <Splitter />
            <CTASection
                buttonLink="/kontakt"
                buttonText="Start din content-rejse"
                title="Klar til at løfte dit digitale content?"
                description="Lad os tage en snak om, hvordan vi kan hjælpe dig med at skabe content der både engagerer og performer. Vi har ideerne (og de bæredygtige løsninger) klar!"
            />
            <Splitter />
            <FAQSection
                FAQData={[
                    {
                        question: "Hvor lang tid tager en content-produktion?",
                        answer: (
                            <>
                                Det afhænger af projektets omfang. En simpel
                                fotosession kan være klar samme dag, mens en
                                omfattende videoproduktion kan tage flere uger.
                                Vi laver altid en realistisk tidsplan i starten
                                af projektet.
                            </>
                        ),
                    },
                    {
                        question:
                            "Hvad koster det at få produceret professionelt content?",
                        answer: (
                            <>
                                Vi tilpasser altid løsningen til dit budget. Vi
                                er transparente omkring priser og finder en
                                løsning der giver mest værdi for pengene.
                                Kontakt os for et uforpligtende tilbud der
                                matcher dine behov.
                            </>
                        ),
                    },
                    {
                        question: "Hvordan sikrer I at contentet performer?",
                        answer: (
                            <>
                                Vi arbejder datadrevet og følger nøje med i
                                hvordan contentet klarer sig. Vi optimerer
                                løbende og tilpasser strategien baseret på
                                real-time data og feedback. Plus, vi deler gerne
                                vores indsigter med dig.
                            </>
                        ),
                    },
                    {
                        question:
                            "Hvad mener I med bæredygtig content-produktion?",
                        answer: (
                            <>
                                Vi optimerer alt fra filstørrelser til
                                serverbelastning, bruger energieffektivt udstyr
                                og vælger grønne løsninger hvor muligt. Det
                                betyder lavere CO2-aftryk uden at gå på
                                kompromis med kvaliteten.
                            </>
                        ),
                    },
                    {
                        question:
                            "Kan I arbejde med min eksisterende brand-identitet?",
                        answer: (
                            <>
                                Absolut! Vi er eksperter i at arbejde inden for
                                eksisterende brandguidelines. Vi sikrer at alt
                                nyt content passer perfekt ind i din
                                eksisterende visuelle identitet - og måske gør
                                den endda endnu stærkere.
                            </>
                        ),
                    },
                    {
                        question:
                            "Får jeg alle rettigheder til det producerede content?",
                        answer: (
                            <>
                                Ja! Efter endt projekt og betaling får du alle
                                rettigheder til det producerede content. Du får
                                også adgang til alle relevante filer og assets,
                                så du frit kan bruge materialet som du ønsker.
                            </>
                        ),
                    },
                ]}
                title="Alt det du vil vide om content produktion"
                description="Her er de mest almindelige spørgsmål vi får om digital content produktion. Ingen fancy fagsprog - bare ærlige svar du kan bruge til noget."
            />
            <Splitter />
            <Footer />
        </>
    );
};

export default DigitalContentPage;
