import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CustomHead from "../components/other/CustomHead.tsx";
import Splitter from "../components/other/splitter.tsx";
import CTASection from "../components/sections/UtiliySections/CTASection.tsx";
import Footer from "../components/sections/UtiliySections/FooterSection.tsx";
import HeroSection2 from "../components/sections/HeroSections/HeroSection2.tsx";

export default function PrivacyPolicy({ url }: PageProps) {
  const currentUrl = typeof window !== "undefined"
    ? globalThis.location.href
    : url;

  return (
    <>
      <CustomHead
        title="Privatlivspolitik | Creative Oak"
        metaDescription="Læs om hvordan Creative Oak beskytter og behandler dine personoplysninger i forbindelse med vores hjemmeside og nyhedsbrev."
        url={currentUrl.toString()}
        imageUrl={`${currentUrl}images/og/og-logo.jpg`}
      />
      <Head>
        <title>Privatlivspolitik</title>
      </Head>
      <HeroSection2
        description="Creative Oak respekterer dit privatliv og er forpligtet til at
            beskytte dine personoplysninger. Denne privatlivspolitik beskriver,
            hvordan vi indsamler og behandler dine personoplysninger i
            forbindelse med vores hjemmeside og nyhedsbrev."
        title="Privatlivspolitik for Creative Oak"
      />
      <Splitter />
      <main class="container mx-auto px-4 py-12 max-w-4xl">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold mt-12 mb-4">Dataansvarlig</h2>
          <p class="mb-8">
            Creative Oak er dataansvarlig for behandlingen af dine
            personoplysninger. Vi er en kreativ virksomhed med fokus på at
            udarbejde skarpe digitale produkter og stræber efter at være en
            demokratisk og kollektivistisk virksomhed.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            Hvilke personoplysninger indsamler vi?
          </h2>
          <p class="mb-4">
            På vores hjemmeside indsamler vi <strong>ikke</strong>{" "}
            personoplysninger om dig. Vi bruger ikke cookies og gør derfor ikke
            noget for at tracke din færden på vores side.
          </p>
          <p class="mb-4">
            I forbindelse med vores nyhedsbrev indsamler vi følgende
            personoplysninger:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>Dit navn</li>
            <li>Din e-mailadresse</li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">Formål med behandlingen</h2>
          <p class="mb-4">
            Vi behandler dine personoplysninger med følgende formål:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>At kunne sende dig vores nyhedsbrev</li>
            <li>
              At kunne administrere din tilmelding og eventuelle præferencer
            </li>
            <li>
              At kunne kommunikere med dig om væsentlige ændringer i vores
              service
            </li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            Retsgrundlag for behandlingen
          </h2>
          <p class="mb-8">
            Behandlingen af dine personoplysninger sker på baggrund af dit
            samtykke, som du giver ved tilmelding til vores nyhedsbrev.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">Databehandler</h2>
          <p class="mb-8">
            Vi benytter MailerLite som databehandler til at håndtere vores
            nyhedsbrevsservice. MailerLite er forpligtet til at behandle dine
            personoplysninger fortroligt og har implementeret passende tekniske
            og organisatoriske sikkerhedsforanstaltninger. Du kan læse
            MailerLite's privatlivspolitik her.
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">Dine rettigheder</h2>
          <p class="mb-4">
            Du har følgende rettigheder i forhold til vores behandling af dine
            personoplysninger:
          </p>
          <ul class="list-disc pl-8 mb-8">
            <li>Ret til at få indsigt i dine personoplysninger</li>
            <li>Ret til at få berigtiget urigtige personoplysninger</li>
            <li>Ret til at få slettet dine personoplysninger</li>
            <li>Ret til at trække dit samtykke tilbage</li>
            <li>
              Ret til at gøre indsigelse mod behandlingen af dine
              personoplysninger
            </li>
            <li>Ret til dataportabilitet</li>
          </ul>

          <h2 class="text-2xl font-bold mt-12 mb-4">Kontakt</h2>
          <p class="mb-8">
            Hvis du har spørgsmål til vores behandling af dine personoplysninger
            eller ønsker at gøre brug af dine rettigheder, er du velkommen til
            at kontakte os:
          </p>
          <address class="not-italic mb-8">
            Creative Oak ApS<br />
            Langelandsgade 62 St,<br />
            8000 Aarhus C<br />
            +45 53 53 42 90<br />
            hej@creativeoak.dk
          </address>

          <h2 class="text-2xl font-bold mt-12 mb-4">Klage</h2>
          <p class="mb-8">
            Hvis du ønsker at klage over vores behandling af dine
            personoplysninger, kan du også rette henvendelse til
            Datatilsynet:<br />
            <br />
            Datatilsynet<br />
            Carl Jacobsens Vej 35<br />
            2500 Valby<br />
            +45 33 19 32 00<br />
            www.datatilsynet.dk
          </p>

          <h2 class="text-2xl font-bold mt-12 mb-4">
            Ændringer i privatlivspolitikken
          </h2>
          <p class="mb-8">
            Vi forbeholder os ret til at opdatere denne privatlivspolitik. Ved
            væsentlige ændringer vil vi informere dig via e-mail.
          </p>

          <p class="text-sm text-gray-600 mt-12">
            Sidst opdateret: Februar 2025
          </p>
        </div>
      </main>

      <Splitter />
      <CTASection
        title="Mangler du hjælp til noget?"
        description="Skriv hvis der er noget vi kan hjælpe med. Hvis du er mere til mails, kan vi også nåes på hej@creativeoak.dk"
        buttonLink="/kontakt"
        buttonText="Kontakt os i dag!"
      />
      <Splitter />
      <Footer />
    </>
  );
}
