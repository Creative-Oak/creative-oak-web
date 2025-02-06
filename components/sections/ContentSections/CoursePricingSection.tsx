// components/sections/PricingSection.tsx

import { CourseOfferingCard } from "../UtiliySections/CourseOfferingCardSection.tsx";

export function PricingSection() {
  const talks = [
    {
      title: "AI i Praksis: Fra Hype til Virkelighed",
      description:
        "Et engagerende foredrag om kunstig intelligens' praktiske anvendelser i dag, med fokus på hvordan virksomheder kan udnytte teknologien strategisk og ansvarligt.",
      duration: "45-60 min",
      audience: "Ledelse & beslutningstagere",
      format: "Fysisk eller online",
      price: 8000,
      bulletPoints: [
        "State-of-the-art AI teknologier og deres reelle muligheder",
        "Praktiske eksempler på succesfuld AI-implementering",
        "Strategiske overvejelser ved AI-adoption",
        "Etiske aspekter og ansvarlig AI-udvikling",
        "Fremtidige trends og deres potentielle indvirkning",
      ],
      includes: [
        "Præsentationsmaterialer i digital form",
        "Opsummerende one-pager med key takeaways",
        "Ressourceliste til videre fordybelse",
      ],
    },
    {
      title: "Design-Drevet Digital Transformation",
      description:
        "Et strategisk foredrag om hvordan design thinking og brugercentrerede metoder kan drive succesfuld digital transformation i moderne organisationer.",
      duration: "90 min",
      audience: "Alle",
      format: "Fysisk eller online",
      price: 12000,
      bulletPoints: [
        "Design Thinking som driver for digital innovation",
        "Brugercentreret teknologiadoption og forandringsledelse",
        "Digital service design og customer journey mapping",
        "Prototype-drevet transformation og iterativ udvikling",
        "Organisatorisk design thinking og kulturforandring",
      ],
      includes: [
        "Præsentationsmaterialer i digital form",
        "Opsummerende one-pager med key takeaways",
        "Ressourceliste til videre fordybelse",
      ],
    },
  ];

  const workshops = [
    {
      title: "Gør-det-selv Machine Learning Workshop",
      description:
        "En praktisk hands-on workshop hvor deltagerne lærer om machine learning (ML) gennem interaktive eksperimenter med BBC micro:bit og ml-machine.org platformen.",
      duration: "3 timer",
      audience: "6-25 deltagere",
      format: "Begynder niveau",
      price: 12000,
      bulletPoints: [
        "Forstå grundlæggende ML-koncepter gennem praktisk erfaring",
        "Bygge og træne simple ML-modeller til bevægelsesregistrering",
        "Lære om dataindsamling og -repræsentation i ML-systemer",
        "Få hands-on erfaring med forskellige typer af ML",
        "Udvikle forståelse for ML-pipeline fra data til færdig model",
      ],
      includes: [
        "BBC micro:bit med accelerometer",
        "Adgang til ml-machine.org platform",
        "Workshop materialer og guides",
      ],
    },
    {
      title: "Design af ML-Løsninger i Virksomheden",
      description:
        "En struktureret workshop hvor teams identificerer og designer AI-løsninger til deres specifikke forretningsudfordringer gennem en guidet proces med fokus på værdi og implementerbarhed.",
      duration: "5 timer",
      audience: "8-20 deltagere",
      format: "Mellem niveau",
      price: 16000,
      bulletPoints: [
        "Identificere områder i virksomheden hvor AI kan skabe værdi",
        "Analysere datakvalitet og -tilgængelighed for ML-projekter",
        "Designe AI-løsninger med fokus på forretningsmæssig værdi",
        "Vurdere implementeringsmuligheder og -udfordringer",
        "Udvikle konkrete projektforslag til AI-implementering",
      ],
      includes: [
        "Design Thinking værktøjer",
        "ML Solution Canvas",
        "Data kortlægningsværktøjer",
        "Workshop materialer",
      ],
    },
  ];

  return (
    <div class="container mx-auto mb-16 mt-16">
      <div class="mb-16">
        <h2 class="text-2xl md:text-4xl font-bold text-center font-lexend">
          Foredrag og Workshops
        </h2>
        <p class="mt-4 text-md text-center font-poppins">
          Få ny inspiration og indsigt gennem vores ekspertforedrag og workshops
          om AI, teknologi og digital transformation
        </p>
      </div>

      <div class="space-y-16">
        <div>
          <h3 class="text-xl md:text-3xl font-bold mb-8 font-lexend text-center">
            Workshops
          </h3>
          <div class="grid md:grid-cols-2 gap-8 auto-rows-fr">
            {workshops.map((workshop) => <CourseOfferingCard {...workshop} />)}
          </div>
        </div>
        <div>
          <h3 class="text-xl md:text-3xl font-bold mb-8 font-lexend text-center">
            Foredrag
          </h3>
          <div class="grid md:grid-cols-2 gap-8 auto-rows-fr">
            {talks.map((talk) => <CourseOfferingCard {...talk} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
