// components/sections/ContentSections/FormSection.tsx
import { ComponentChildren } from "preact";

interface CustomSection {
  title: string;
  description?: string;
  backgroundColor?: "white" | "gray";
  children?: ComponentChildren;
  className?: string; // Added for more flexibility
}

export default function CustomSection({
  title,
  description,
  backgroundColor = "white",
  children,
  className = "",
}: CustomSection) {
  const bgColor = backgroundColor === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section
      class={`mt-16 py-16 md:py-24 ${bgColor} ${className}`}
      aria-labelledby="form-section-title"
    >
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="form-section-title"
            class="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            {title}
          </h2>
          {description && (
            <p class="text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div class="mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
