import PrimaryButton from "../../other/PrimaryButton.tsx";
import PortfolioCard from "../../other/PortfolioCard.tsx";
import { ProjectCardData } from "../../../types/projectCardData.ts";

interface PortfolioSectionProps {
  teaser: string;
  title: string;
  projects: ProjectCardData[];
}

const PortfolioSection = (props: PortfolioSectionProps) => {
  return (
    <section className="portfolio-section bg-brand-blue">
      {/* Title section - contained */}
      <div className="container pt-12 pb-6 md:pt-12 md:pb-12">
        <div className="pb-2">
          <p>{props.teaser}</p>
        </div>
        <div className="text-4xl font-medium text-brand-white font-lexend">
          <h2>{props.title}</h2>
        </div>
      </div>

      {/* Portfolio cards section - full width on mobile, contained on desktop */}
      <div className="md:container">
        <div className="py-4 md:py-12">
          {/* Full-width scrollable area on mobile only */}
          <div className="overflow-x-auto scrollbar-hide md:overflow-visible pl-4 md:pl-0" style={{ paddingLeft: '1rem' }}>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-1">
              {props.projects.map((project, index) => {
                return (
                  <div 
                    key={index}
                    className={`w-72 sm:w-80 md:w-auto flex-shrink-0 md:flex-shrink ${
                      index === props.projects.length - 1 ? 'pr-4 md:pr-0' : ''
                    }`}
                  >
                    <PortfolioCard
                      slug={project.slug}
                      short_description={project.projectShortDescription}
                      title={project.title}
                      image={project.featuredImage}
                      tags={project.categories}
                    />
                  </div>
                );
              })}
            </div>
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
      
      {/* Button section - contained */}
      <div className="container pb-12">
        <div className="flex justify-center">
          <PrimaryButton href="/portfolio" text="Se alle projekter" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;