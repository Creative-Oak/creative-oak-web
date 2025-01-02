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
    <section class="portfolio-section bg-brand-yellow">
      <div class="container py-24 px-4">
        <div class="pb-2">
          <p>{props.teaser}</p>
        </div>
        <div class="text-4xl  font-bold font-lexend">
          <h2>{props.title}</h2>
        </div>

        <div class=" py-24 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {props.projects.map((project) => {
            return (
              <PortfolioCard
              slug={project.slug}
                short_description={project.projectShortDescription}
                title={project.title}
                image={project.featuredImage}
                tags={project.categories}

              />
            );
          })}
        </div>
        <div class="flex justify-center">
          <PrimaryButton href="/portfolio" text="Se alle projeker" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
