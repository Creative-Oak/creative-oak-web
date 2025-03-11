import { JSX } from "preact/jsx-runtime";
import PrimaryButton from "../../other/PrimaryButton.tsx";
import Testemonial from "../../../types/Testemonials.ts";

interface ShortTestemonialsSectionProps {
  testimonials: Testemonial[];
}

export default function ShortTestemonialsSection(
  { testimonials = [] }: ShortTestemonialsSectionProps,
) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const featuredTestimonials = testimonials
    .filter((testimonial) => testimonial.isFeatured && testimonial.shortQuote)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 3);

  if (!featuredTestimonials.length) {
    return null;
  }

  return (
    <section className="bg-brand-purple py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="flex justify-center">
          <div
            className={`grid gap-8 md:gap-12 mb-12 max-w-5xl ${
              featuredTestimonials.length === 1
                ? "grid-cols-1 max-w-xl"
                : featuredTestimonials.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-3xl"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white flex flex-col shadow-custom-black hover:shadow-custom-black transition-shadow duration-200 border-2 border-brand-black"
              >
                <div className="relative flex flex-col justify-center flex-grow w-full px-6 md:px-8 py-6 md:py-8 min-h-[320px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-6 mx-auto border-2 border-brand-black shadow-custom-black-sm">
                    <img
                      src={testimonial.image}
                      alt={testimonial.image_alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <svg
                    className="w-8 h-8 text-brand-blue mb-4 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-lg md:text-xl font-medium text-brand-black mb-4 text-center max-w-[65%] mx-auto">
                    {testimonial.shortQuote}
                  </p>
                </div>
                <div className="border-t-2 border-brand-black w-full"></div>
                <div className="flex flex-col items-center justify-center h-24 px-6 md:px-8">
                  <p className="font-bold text-brand-black">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-brand-black-600">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <PrimaryButton
            href="/kundeudtalelser"
            text="Se alle kundeudtalelser"
          />
        </div>
      </div>
    </section>
  );
}
