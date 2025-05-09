import Splitter from "../other/splitter.tsx";

interface RelatedProject {
  title: string;
  slug: string;
  projectShortDescription: string;
  categories: string[];
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-brand-black mb-8 font-lexend">
            Continue reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                href={`/projects/${project.slug}`}
                className="block group bg-white p-5 border-2 border-brand-black shadow-custom-black-400 hover:shadow-custom-black transition-all"
                key={project.slug}
              >
                <div>
                  <h3 className="text-xl font-medium group-hover:text-brand-red transition-colors font-lexend">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mt-3 line-clamp-3 group-hover:text-brand-red transition-colors">
                    {project.projectShortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 border-2 rounded group-hover:rounded-none group-hover:shadow-custom-black-sm transition-all border-brand-black-400"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Splitter />
    </>
  );
};

export default RelatedProjects;
