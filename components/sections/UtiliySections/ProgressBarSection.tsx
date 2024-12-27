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
    <section class="container py-24 ">
      <div class="grid grid-cols-2 gap-12">
        <div class="flex flex-col max-w-lg items-start gap-6 justify-start">
          <h2 class="font-lexend text-4xl font-bold ">
            Processen ved køb af hjemmeside hos os
          </h2>
          <p class="whitespace-pre-wrap">
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
          <PrimaryButton href="#" text="Læs mere" />
        </div>
        <Timeline sections={sections} />
      </div>
    </section>
  );
}
