import Splitter from "../components/other/splitter.tsx";
import { PageProps } from "$fresh/server.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import AnimatedServiceSection from "../islands/AnimatedServiceSection.tsx";
import AnimatedCTASection from "../islands/AnimatedCTASection.tsx";
import CleanHeroSection from "../islands/CleanHeroSection.tsx";

const ServicesPage = ({ url }: PageProps) => {
  return (
    <>
      <CustomHead
        title="Services | Creative Oak"
        metaDescription="Discover our comprehensive range of services including Creative Communications, Digital Experiences & Innovation, AI Consulting & Transformation, and E-commerce solutions."
        imageUrl={`${url.origin}/images/og/og-logo.jpg`}
        url={url.href}
      />

      <CleanHeroSection 
     
        title="Services"
        description="We combine creativity, technology, and strategic thinking to help businesses thrive in the digital age. Our comprehensive services are designed to drive growth and innovation."
      />

      <Splitter />

      {/* Creative Communications Section */}
      <AnimatedServiceSection
        title="Creative Communications"
        description="Strategic brand storytelling, content creation, and communication strategies that resonate with your audience and drive engagement."
        imageUrl="/images/services/foto-video.avif"
        subServices={[
          { title: "Photo Production" },
          { title: "Video Production" },
          { title: "Motion Graphics" },
          { title: "Brand Strategy" }
        ]}
      />

      {/* Digital Experiences Section */}
      <AnimatedServiceSection
        title="Digital Experiences & Innovation"
        description="Custom digital solutions, web development, and innovative technology implementations that create memorable user experiences."
        imageUrl="/images/services/webdev.avif"
        subServices={[
          { title: "Webflow Development" },
          { title: "Custom Web Development" },
          { title: "UX/UI Design" },
          { title: "Digital Innovation" }
        ]}
        isEven={true}
      />

      {/* AI Consulting Section */}
      <AnimatedServiceSection
        title="AI Consulting & AI Transformation"
        description="Expert guidance in AI integration, machine learning solutions, and digital transformation strategies to future-proof your business."
        imageUrl="/images/services/courseai.avif"
        subServices={[
          { title: "AI Strategy Development" },
          { title: "Machine Learning Solutions" },
          { title: "AI Training & Workshops" },
          { title: "Process Automation" }
        ]}
      />

      {/* E-commerce Section */}
      <AnimatedServiceSection
        title="E-commerce and Inbound Marketing"
        description="End-to-end e-commerce solutions and data-driven inbound marketing strategies to boost your online presence and sales."
        imageUrl="/images/services/susweb.avif"
        subServices={[
          { title: "Custom Shopify Development" },
          { title: "SEO Optimization" },
          { title: "Content Marketing" },
          { title: "Analytics & Reporting" }
        ]}
        isEven={true}
      />

      <Splitter />

      <AnimatedCTASection
        title="See anything you like?"
        description="Let's collaborate to bring your digital vision to life."
        buttonText="Let's connect"
        buttonLink="/contact"
      />

      <Splitter />
      <Footer />
    </>
  );
};

export default ServicesPage;
