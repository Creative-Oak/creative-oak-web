import { JSX } from "preact/jsx-runtime";

interface FAQSectionProps {
    title: string;
    description: string;
    FAQData: {question: string, answer: JSX.Element}[];
}

export default function FAQSection(props: FAQSectionProps) {
  return (
    <>
      <style>{`
        .faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease-out;
        }

        .faq-content > div {
          overflow: hidden;
        }

        details[open] .faq-content {
          grid-template-rows: 1fr;
        }

        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        details[open] .faq-answer {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>

      <section class="container py-12 md:py-24">
        <h2 class="text-5xl font-lexend font-bold">{props.title}</h2>
        <p class="mt-4 mb-8">{props.description}</p>

        <div class="flex flex-col gap-2">
          {props.FAQData.map((data, i) => (
            <details 
              key={i} 
              class="group border-b border-brand-black-400 py-4"
            >
              <summary class="flex cursor-pointer items-center justify-between text-left list-none">
                <h3 class="text-lg font-bold">{data.question}</h3>
                <svg
                  class="h-6 w-6 transform transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div class="faq-content">
                <div>
                  <div 
                    className="faq-answer mt-4 text-brand-black-600 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-4  [&_a]:transition-colors [&_a]:underline [&_a:hover]:text-brand-red "
                  >
                  {data.answer}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}