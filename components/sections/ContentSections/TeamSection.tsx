interface TeamSectionProps {
    title: string;
    subtitle: string;
    teamMembers: {
      name: string;
      role: string;
      pronouns: string;
      imageUrl: string;
    }[];
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
              <div key={index} className="flex flex-col items-center">
                <img
                  className="object-cover w-40 h-40 border-brand-black border-4 shadow-sm rounded-full mb-4"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-brand-black-500">{member.role}</p>
                <p className="text-xs mt-1 italic text-brand-black-400">
                  ({member.pronouns})
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TeamSection;
  