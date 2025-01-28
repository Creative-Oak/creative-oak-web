import Timeline from "../../../islands/ProgressBar/ProgressBar.tsx";
import PrimaryButton from "../../other/PrimaryButton.tsx";

export default function ProgressSection() {
  const sections = [
    {
      title: "Konsultation",
      content:
        "Starter ofte med en konsultation, hvor vi drøfter jeres behov samt diskuterer omfanget af jeres side, hvortil vi kan finde en fornuftig pris.",
    },
    {
      title: "Design",
      content:
        "Såfremt i ikke selv har udviklet et design, laver vi det, før vi starter på implementeringen af jeres hjemmeside.",
    },
    {
      title: "Gennemgang og ændringer",
      content:
        "Rammer designet det, I efterspørger? Hvis ikke, har vi mulighed for at lave rettelser, så vi lander rigtigt.",
    },
    {
      title: "Udvikling",
      content:
        "Når designet sidder i skabet, begynder implementeringen af jeres side. I kan løbende se med, imens jeres side bliver bygget.",
    },
    {
      title: "Gennemgang og ændringer",
      content:
        "Hvis implementationer ikke er lige som den skal være, tager vi selvfølgelige lige en rette gennemgang, hvor vi får fuldført de sidste detaljer.",
    },
    {
      title: "Overlevering",
      content:
        "Til sidst får i overleveret siden - hvad end vi skal hoste den for jer, eller i selv vil stå for den del er helt op til jer - vi vil ikke sælge jer en lang bindingsaftale - når siden er færdig er den jeres. (selvfølgelig kan vi altid hjælpe hvis der senere kommer nye idéer til)",
    },
  ];

  return (
    <section className="container py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-4 md:gap-6 justify-start">
          <h2 className="font-lexend text-3xl md:text-4xl font-bold">
            Processen ved køb af hjemmeside hos os
          </h2>
          <div className="space-y-4 md:space-y-6">
            <p className="whitespace-pre-wrap">
              En ny hjemmeside en vigtig investering for enhver virksomhed, der
              ønsker at etablere eller opretholde en stærk online tilstedeværelse
              i et omskifteligt medielandskab.
            </p>
            <p>
              Dette, uanset om i ønsker en webshop eller anden side!
            </p>
            <p>
              En professionelt udviklet hjemmeside kan give jeres virksomhed en
              konkurrencemæssig fordel og bidrage til at opbygge et positivt
              omdømme blandt jeres kunder.
            </p>
            <p>
              Vores samarbejdsproces indebærer typisk flere samtaler med dig, så
              vi sikrer et resultat, der både fungerer optimalt og lever op til
              vores fælles æstetiske standarder.
            </p>
          </div>
          <div className="mt-4 md:mt-6">
            <PrimaryButton href="/kontakt" text="Læs mere" />
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <Timeline sections={sections} />
        </div>
      </div>
    </section>
  );
}
