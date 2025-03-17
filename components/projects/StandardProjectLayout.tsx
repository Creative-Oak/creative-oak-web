import { Project } from "../../types/Project.ts";
import { urlFor } from "../../utils/imageBuild.ts";
import renderMainContent from "../../utils/renderText.tsx";
import Splitter from "../other/splitter.tsx";

interface StandardProjectLayoutProps {
  data: Project;
}

const StandardProjectLayout = ({ data }: StandardProjectLayoutProps) => {
  return (
    <>
      <section className="bg-brand-blue py-32 md:py-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-6 font-lexend">
              {data.title}
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {data.projectShortDescription}
            </p>
          </div>
        </div>
      </section>

      <Splitter />

      <div className="container mx-auto px-4 md:px-8 py-12">
        {data.featuredImage && (
          <div className="aspect-video w-full mb-12">
            <img
              src={urlFor(data.featuredImage)}
              alt={data.primaryImageAltText}
              className="w-full h-full object-cover border-2 border-brand-black shadow-custom-black"
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {data.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 mb-4 border-2 border-brand-black shadow-custom-black-400 text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose max-w-none rich-text">
                {renderMainContent(data.mainContent)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div className="bg-white p-6 shadow-custom-black-400 border-2 border-brand-black">
                {/* Publication info */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Publiceret den{" "}
                    <span className="font-medium">
                      {new Date(data.releaseDate).toLocaleDateString("da-DK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                {/* Related Projects */}
                {data.relatedProjects && data.relatedProjects.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-lg font-semibold mb-4">Læs også</h4>
                    <div className="space-y-6">
                      {data.relatedProjects.map((project) => (
                        <a
                          href={`/projects/${project.slug}`}
                          className="block group"
                          key={project.slug}
                        >
                          <div>
                            <h5 className="font-medium group-hover:text-brand-red transition-colors">
                              {project.title}
                            </h5>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
                              {project.projectShortDescription}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardProjectLayout;
