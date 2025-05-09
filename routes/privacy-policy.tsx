import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";
import CleanHeroSection from "../islands/CleanHeroSection.tsx";

export default function PrivacyPolicy({ url }: PageProps) {
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  return (
    <>
      <CustomHead
        title="Privacy Policy | Creative Oak"
        metaDescription="Read about how Creative Oak protects and processes your personal data in connection with our website and newsletter."
        url={currentUrl.toString()}
        imageUrl={`${currentUrl}images/og/og-logo.jpg`}
      />
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <CleanHeroSection
        description="Creative Oak respects your privacy and is committed to protecting your personal data. This privacy policy describes how we collect and process your personal data in connection with our website and newsletter."
        title="Privacy Policy"
      />
      <Splitter />
      <main class="container mx-auto px-4 py-12 max-w-4xl">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold mt-12 mb-4">Data Controller</h2>
          <p class="mb-8">
            Creative Oak is the data controller for the processing of your personal data. We are a creative company focused on developing sharp digital products and strive to be a democratic and collectivist company.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            What personal data do we collect?
          </h2>
          <p class="mb-4">
            On our website, we do <strong>not</strong> collect personal data about you. We do not use cookies and therefore do not track your activity on our site.
          </p>
          <p class="mb-4">
            In connection with our newsletter, we collect the following personal data:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>Your name</li>
            <li>Your email address</li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">Purpose of Processing</h2>
          <p class="mb-4">
            We process your personal data for the following purposes:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>To send you our newsletter</li>
            <li>To manage your subscription and any preferences</li>
            <li>To communicate with you about significant changes to our service</li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            Legal Basis for Processing
          </h2>
          <p class="mb-8">
            The processing of your personal data is based on your consent, which you give when subscribing to our newsletter.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">Data Processor</h2>
          <p class="mb-8">
            We use MailerLite as a data processor to handle our newsletter service. MailerLite is committed to processing your personal data confidentially and has implemented appropriate technical and organizational security measures. You can read MailerLite's privacy policy here.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">Your Rights</h2>
          <p class="mb-4">
            You have the following rights regarding our processing of your personal data:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>Right to access your personal data</li>
            <li>Right to have incorrect personal data corrected</li>
            <li>Right to have your personal data deleted</li>
            <li>Right to withdraw your consent</li>
            <li>Right to object to the processing of your personal data</li>
            <li>Right to data portability</li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">Contact</h2>
          <p class="mb-8">
            If you have questions about our processing of your personal data or wish to exercise your rights, you are welcome to contact us:
          </p>
          <address class="not-italic mb-8">
            Creative Oak ApS<br />
            Langelandsgade 62 St,<br />
            8000 Aarhus C<br />
            +45 53 53 42 90<br />
            hej@creativeoak.dk
          </address>

          <h2 class="text-2xl font-bold mt-12 mb-4">Complaints</h2>
          <p class="mb-8">
            If you wish to complain about our processing of your personal data, you can also contact the Danish Data Protection Agency:<br />
            <br />
            Datatilsynet<br />
            Carl Jacobsens Vej 35<br />
            2500 Valby<br />
            +45 33 19 32 00<br />
            www.datatilsynet.dk
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            Changes to the Privacy Policy
          </h2>
          <p class="mb-8">
            We reserve the right to update this privacy policy. In case of significant changes, we will inform you via email.
          </p>

          <p class="text-sm text-gray-600 mt-12">
            Last updated: February 2025
          </p>
        </div>
      </main>

      <Splitter />
      <CTASection
        title="Need help with something?"
        description="Write if there's anything we can help with. If you prefer emails, you can also reach us at hej@creativeoak.dk"
        buttonLink="/contact"
        buttonText="Contact us today!"
      />
      <Splitter />
      <Footer />
    </>
  );
}
