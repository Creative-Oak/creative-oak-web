import PrimaryButton from "../../other/PrimaryButton.tsx";
import PortfolioCard from "../../other/PortfolioCard.tsx";

const PortfolioSection = () => {
  return (
    <section class="portfolio-section bg-brand-yellow">
      <div class="container py-24 px-4">
        <div class="pb-2">
          <p>Portoflio</p>
        </div>
        <div class="text-4xl  font-bold font-lexend">
          <h2>Udvalg af projekter</h2>
        </div>

        <div class=" py-24 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <PortfolioCard short_description="desc" title="Title" />
          <PortfolioCard short_description="desc" title="Title" />
          <PortfolioCard short_description="desc" title="Title" />
        </div>
        <div class="flex justify-center">
          <PrimaryButton href="#" text="Se alle projeker" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
