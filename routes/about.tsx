import { Handlers, PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import TeamSection from "../components/sections/ContentSections/TeamSection.tsx";
import CleanHeroSection from "../islands/CleanHeroSection.tsx";
import AnimatedAboutSection from "../islands/AnimatedAboutSection.tsx";
import AnimatedContentSection from "../islands/AnimatedContentSection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import { Employee } from "../types/Employee.ts";
import { client } from "../utils/sanity.ts";

interface PageData {
  teamMembers: Employee[];
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const teamQuery = `
      *[_type == "employee"] {
        name,
        position,
        profileImage,
        bio,
        "slug": slug.current,
        email,
        socialLinks {
          linkedin,
          twitter,
          github
        },
        department,
        pronouns,
        isActive
      }
    `;

    try {
      const teamMembers = await client.fetch(teamQuery);
      return ctx.render({ teamMembers });
    } catch (error) {
      console.error("Error fetching team members:", error);
      return new Response("Error fetching team data", { status: 500 });
    }
  }
};

const About = ({ data, url }: PageProps) => {

  const text = [
    {
      header: "Decisions are made democratically",
      txt:
        `It's obvious that in a collective, decisions are made together. So that's what we do. Which direction should the company take, which projects make sense to work on, and which coffee should be in the office coffee machine. All important decisions (especially the coffee one) that can be made in plenum. However, we acknowledge that not all decisions can be democratic, as for example hiring and firing could potentially become like a **Robinson Crusoe council** – more of a popularity contest rather than a business decision.`,
    },
    {
      header: "Everyone gets the same salary",
      txt:
        `An engine doesn't work without all its parts, so why should some parts be worth more than others? Whether you're newly graduated or have 30 years of experience, you get the same salary at Creative Oak. And the classic question is of course: "Does that mean you don't earn more the longer you work at the company?" Yes and no! One of the decisions that needs to be made democratically is, among other things, how much salary should be paid out. So it's a collective decision whether we should get more or less in salary. And if people perform well, and the company has a healthy economy—why shouldn't we be rewarded with more salary?`,
    },
    {
      header: "The (semi) four-day work week",
      txt:
        `Recently, there has been a lot of hype about four-day work weeks, where you work four days to have a full day off each week. At Creative Oak, we don't work just to have time off, but because the work is meaningful. It also complicates collaborations, as it makes it impossible to contact a 4-day work week company on a "day off" when all employees are off.

        There are five days in a standard work week—we acknowledge that, and we want to invest in the fact that you can easily spend five days a week on your work and still be happy about it. At Creative Oak, we have therefore chosen that one of the five work days should be used for something you're passionate about. Whether it's self-development, ceramics, a cool piece of software, or a desire to immerse yourself in an exciting project. It could also be that on that day you want to work on your projects in the Company - that's up to you. The only "expectation" with this "day off" is that you spend half an hour in the morning and half an hour in the afternoon going through your inbox, so our partners don't wait for responses in vain.

        As long as the work is inspiring, fun, and you constantly develop, we believe that a five-day work week can work perfectly well. Therefore, we ensure that all our employees get one day to challenge themselves by learning something new or doing something inspiring. We also believe that it benefits the company that our employees have great opportunities for self-development—if you learn something new that you can offer our customers, we don't get stuck in old learning; we promote new learning.`,
    },
  ];

  return (
    <>
        <CustomHead 
          title="About Creative Oak | Digital Innovation with Collective Responsibility | Aarhus"
          metaDescription="Meet Creative Oak - a digital collective in Aarhus focused on sustainability, democratic decisions, and equal pay. We create with people at the center."
          imageUrl={`${url.origin}/images/magnus-heine-baal.jpeg`}
          url={url.href}
          />
  
      <CleanHeroSection
        description="Creative Oak is a creative company focused on developing sharp digital products that can work wonders for your business. But we also have ambitions to be a democratic and collectivist company."
        title="About?"
      />
      <Splitter />
      <AnimatedContentSection
        teaser="Collectivist company"
        title="What does a collectivist company mean?"
        imageUrl="/images/magnus-heine-baal.jpeg"
        imageAlt="2 people where one is sitting on a sofa, and the other is sitting by a bonfire"
        box1="Decisions are made democratically"
        box2="Everyone gets the same salary"
        box3="The (semi) four-day work week"
        description="We strive to become a collectivist company. What do we mean by that? We want to create an atmosphere where working at Creative Oak feels like a collective—where we together can achieve something great through joint effort. How do we do that? We have chosen three principles that hopefully contribute to a collectivist mindset:"
      />
      <Splitter />
      <AnimatedAboutSection
        text={text}
        title="What does it mean to work at Creative Oak?"
      />
      <Splitter />
      <TeamSection
        teamMembers={data.teamMembers}
        subtitle="Get to know the people behind Creative Oak"
        title="Who are we?"
      />
      <Splitter />
      <Footer />
    </>
  );
};

export default About;
