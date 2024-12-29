// islands/CategoryFilter.tsx
interface CategoryFilterProps {
  categories: string[];
  activeCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearAll: () => void;
}

export default function CategoryFilter(
  { categories, activeCategories, onToggleCategory, onClearAll }: CategoryFilterProps,
) {
  return (
    <div class="flex flex-wrap gap-3 md:gap-2 mb-8 md:flex-row flex-col">
      <button
        onClick={onClearAll}
        class={`px-4 py-1 border-2 border-brand-black transition-colors text-xs md:py-2  md:text-base ${
          activeCategories.length === 0
            ? " bg-brand-yellow border-2 shadow-custom-black"
            : "text-brand-black hover:shadow-custom-black transition-shadow"
        }`}
      >
        Alle
      </button>

      {categories.map((category) => {
        const isActive = activeCategories.includes(category);
        return (
          <button
            onClick={() => onToggleCategory(category)}
            class={`px-4 py-1 border-2 border-brand-black transition-colors text-xs md:py-2  md:text-base ${
              isActive
                ? "bg-brand-yellow border-2 shadow-custom-black"
                : "text-brand-black hover:shadow-custom-black transition-shadow"
            }`}
            key={category}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
