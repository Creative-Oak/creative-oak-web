import PricingSection from "../UtiliySections/PricingSection.tsx";

const pricingTiers = [
  {
    name: "Den essentielle",
    price: "12.500 DKK",
    features: [
      "Perfekt til mindre virksomheder",
      "3-4 undersider",
      "Teknisk SEO optimeret",
      "Responsivt design",
      "Standard konverteringsopsætning",
      "Brugervenligt CMS system",
    ],
    buttonText: "Få et tilbud",
    buttonLink: "/kontakt",
  },
  {
    name: "Vækst",
    price: "22.000 DKK",
    features: [
      "Alt fra 'Den essentielle'",
      "Mange undersider",
      "Webshop-funktioner",
      "Forbedret animation og brandidentitet",
      "Avanceret SEO og konverteringsoptimering",
      "10 Timers vedligeholdelse*",
    ],
    buttonText: "Få et tilbud",
    buttonLink: "/kontakt",
  },
  {
    name: "Premium",
    price: "22.000+ DKK",
    features: [
      "Alt fra 'Vækst'-pakken",
      "Flersprogede funktioner",
      "Komplekse animationer",
      "Tilkoblet med eksisterende systemer",
      "Avancerede integrationsmuligheder fx, AI Chatbot",
      "Strategisk marketingsrådgivning",
      "Rådgivning og support efter aftale",
    ],
    buttonText: "Få et tilbud",
    buttonLink: "/kontakt",
  },
];

export default function IndexPricingSection() {
  return (
    <PricingSection
      title="Skræddersyede hjemmesider fra 12.500 kr"
      description={
        <p className="text-base text-brand-black-600">
          Vi bygger bæredygtige hjemmesider der konverterer besøgende til
          kunder. Med fokus på kvalitet, brugervenlighed og miljøvenlighed,
          skaber vi digitale løsninger der giver værdi til din virksomhed.
        </p>
      }
      priceColumns={pricingTiers}
      footnote={
        <p>
          Alle priser er ex moms. *Vedligeholdelse gælder første måned efter
          lancering.
        </p>
      }
      backgroundColor="bg-white"
    />
  );
}
