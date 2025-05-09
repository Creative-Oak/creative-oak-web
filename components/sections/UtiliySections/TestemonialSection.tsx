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

  return (
    <section className="bg-white md:px-8 px-0">
      {/* Title section - contained */}
      <div className=" py-12 px-4 md:px-0 md:py-24">
        <h2 className="text-3xl md:text-5xl font-lexend font-bold">
          Testemonials
        </h2>
        <p className="text-lg mt-4">
          Our customers' love letters - see what they say about us
        </p>
        {!showAll && (
          <div className="mt-4">
            <PrimaryButton
              href="/testemonials"
              text="See all testimonials"
            />
          </div>
        )}
      </div>

      {/* Testimonial cards section - full width scroll on mobile, columns on desktop */}
      <div className="  pb-12 md:pb-24">
        {/* Mobile: Horizontal scroll layout */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hide pl-4">
            <div className="flex gap-4 pb-1">
              {displayedTestimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.name}
                  style="width: 24rem"
                  className={`w-[24rem] sm:w-80 flex-shrink-0 ${
                    index === displayedTestimonials.length - 1 ? 'pr-8' : ''
                  }`}
                >
                  <TestemonialCard
                    {...testimonial}
                    compact={showAll}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Column layout */}
        <div className="hidden md:block">
          <div className="columns-2 lg:columns-3 gap-6 space-y-6">
            {displayedTestimonials.map((testimonial) => (
              <div key={testimonial.name} className="break-inside-avoid">
                <TestemonialCard
                  {...testimonial}
                  compact={showAll}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbars across browsers */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default TestemonialSection;