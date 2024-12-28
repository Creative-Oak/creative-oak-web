import { CodeIcon, CourseIcon, RobotIcon } from "../../icons/Icons.tsx";
import Content4Card from "../../other/Content4Card.tsx";

const ContentSection4 = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="font-lexend font-bold text-2xl md:text-3xl lg:text-4xl max-w-xl mb-4 text-gray-900">
        Udforsk vores løsninger inden for kunstig intelligens
      </h2>

      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-12">
        <Content4Card
          description={
            <>
              Bliv fortrolig med kunstig intelligens!
              <br />
              <br />
              Vores kursus hjælper dig med at forstå og anvende AI i praksis,
              både som enkeltperson og organisation.
            </>
          }
          href="/kursis-i-ai"
          icon={<CourseIcon />}
          buttonText="Læs mere om vores kurser"
          title="Kursus i AI"
        />
        <Content4Card
          description={
            <>
              Læs, hvordan AI-chatbots kan automatisere kundeservice og skabe
              bedre kundeoplevelser. <br />
              <br />

              Perfekt til virksomheder, der ønsker smartere kommunikation.
            </>
          }
          href="/chatbots"
          icon={<RobotIcon />}
          buttonText="Læs mere om chatbots"
          title="AI Chatbots"
        />

        <Content4Card
          description={
            <>
              Opdag, hvordan du kan integrere AI i din virksomheds processer for
              at øge effektiviteten og skabe bedre resultater.<br />
              <br />
              Skal i have noget AI ind i virksomheden?
            </>
          }
          href="/kontakt"
          icon={<CodeIcon />}
          buttonText="Kontakt os for mere information"
          title="Virksomhedsintegration af AI"
        />
      </div>
    </section>
  );
};

export default ContentSection4;
