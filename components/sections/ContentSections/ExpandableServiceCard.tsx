import { JSX } from "preact/jsx-runtime";

interface SubService {
  title: string;
  description?: string;
}

interface ExpandableServiceCardProps {
  title: string;
  description: string;
  icon?: JSX.Element;
  subServices?: SubService[];
}

export default function ExpandableServiceCard(props: ExpandableServiceCardProps) {
  return (
    <>
      <style>{`
        .service-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease-out;
        }

        .service-content > div {
          overflow: hidden;
        }

        details[open] .service-content {
          grid-template-rows: 1fr;
        }

        details[open] .service-list {
          animation: slide-down 0.3s ease-out;
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
      `}</style>

      <details class="group bg-white border-2 border-brand-black shadow-custom-black p-6 transition-all duration-300 hover:shadow-lg">
        <summary class="flex cursor-pointer items-start gap-4 list-none">
          {props.icon && (
            <div class="w-12 h-12 flex-shrink-0">
              {props.icon}
            </div>
          )}
          <div class="flex-grow">
            <h3 class="text-xl font-bold mb-2">{props.title}</h3>
            {props.description && <p class="text-gray-600">{props.description}</p>}
          </div>
          <div class="ml-4">
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
          </div>
        </summary>
        <div class="service-content mt-4">
          <div>
            <div class="service-list grid gap-4 pt-4 border-t border-gray-200">
              {props.subServices?.map((service, index) => (
                <div key={index} class="p-4 rounded-lg">
                  <h4 class="font-bold mb-1">{service.title}</h4>
                  <p class="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </details>
    </>
  );
} 