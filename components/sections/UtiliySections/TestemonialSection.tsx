import Testemonial from "../../../types/Testemonials.ts";
import TestemonialCard from "../../other/TestemonialCard.tsx";

interface TestemonialSectionProps {
  testemonial: Testemonial[];
}

const TestemonialSection = (props: TestemonialSectionProps) => {
  
  return (
    <section>
      <div class="container md:py-24">
        <h2 class="text-5xl font-lexend font-bold">Kundeudtalelser</h2>
        <p class="text-lg mt-4">
          Vores kunders kærlighedsbreve - se hvad de skriver om os
        </p>

        <div class="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-start gap-6">
          {props.testemonial.map((testemonial) => (
            <TestemonialCard
              name={testemonial.name}
              title={testemonial.title}
              content={testemonial.content}
              image={testemonial.image}
              image_alt={testemonial.image_alt}
            />
          ))}
        
        </div>
      </div>
    </section>
  );
};

export default TestemonialSection;
