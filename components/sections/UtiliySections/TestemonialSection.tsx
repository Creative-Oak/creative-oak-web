import Testemonial from "../../../types/Testemonials.ts";
import PrimaryButton from "../../other/PrimaryButton.tsx";
import TestemonialCard from "../../other/TestemonialCard.tsx";

interface TestemonialSectionProps {
  testemonial: Testemonial[];
  showAll?: boolean;
}

const TestemonialSection = (
  { testemonial, showAll = false }: TestemonialSectionProps,
) => {
  const displayedTestimonials = showAll ? testemonial : testemonial.slice(0, 3);

  const columnsClass = showAll
    ? "mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
    : "mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6";

  return (
    <section>
      <div className="container py-12 md:py-24">
        <h2 className="text-3xl md:text-5xl font-lexend font-bold">
          Kundeudtalelser
        </h2>
        <p className="text-lg mt-4">
          Vores kunders kærlighedsbreve - se hvad de skriver om os
        </p>
        {!showAll &&
          (
            <div class="mt-4">
            <PrimaryButton
              href="/kundeudtalelser"
              text="Se alle udtalelser"
            />
            </div>
          )}

        <div className={columnsClass}>
          {displayedTestimonials.map((testemonial) => (
            <div className="break-inside-avoid">
              <TestemonialCard
                key={testemonial.name}
                {...testemonial}
                compact={showAll}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestemonialSection;
