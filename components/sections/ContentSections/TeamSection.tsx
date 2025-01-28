
import { urlFor } from "../../../utils/imageBuild.ts";
import { Employee } from "../../../types/Employee.ts";


  
  interface TeamSectionProps {
    title: string;
    subtitle: string;
    teamMembers: Employee[];
  }
  

  const TeamSection = (props: TeamSectionProps) => {
    return (
      <section>
        <div className="container py-12 md:py-24 text-center mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-2">{props.title}</h2>
          <p className="text-lg text-gray-600 mb-12">{props.subtitle}</p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center"
            style={{ display: 'grid', justifyContent: 'center' }}
          >
            {props.teamMembers.map((member, index) => (
              <a href={`/employee/${member.slug}`} key={index} className="flex flex-col items-center">
                                <img
                  className="object-cover w-40 h-40 border-brand-black border-4 shadow-sm rounded-full mb-4"
                  src={urlFor( member.profileImage)}
                  alt={`Portrait of ${member.name}`}
                />

            
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-brand-black-500">{member.position}</p>
               
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TeamSection;
  