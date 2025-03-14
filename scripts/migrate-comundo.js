/**
 * Migration script to help set up the Comundo project in Sanity
 *
 * Run this script with: deno run --allow-net --allow-read scripts/migrate-comundo.js
 */

// This is a guide for how to structure the Comundo project with the new fields
const comundoProjectStructure = {
  _type: "project",
  title: "Comundo.io",
  slug: {
    _type: "slug",
    current: "comundo",
  },
  projectShortDescription:
    "Vi har skabt en moderne og brugervenlig weboplevelse for Comundo – en platform, der gør det nemt for ejendomsejere og -administratorer at få realtidsdata om energiforbrug og CO₂-udledning.",
  metaDescription:
    "Case study: Comundo.io - En platform for ejendomsejere til at monitorere energidata og CO₂-udledning",
  introText:
    "Hos Creative Oak havde vi fornøjelsen af at skabe en moderne og brugervenlig weboplevelse for Comundo – en platform, der gør det nemt for ejendomsejere og -administratorer at få realtidsdata om energiforbrug og CO₂-udledning. Ved at integrere direkte med energileverandører, målere og databaser samler Comundo al data ét sted, så man kan slippe for manuelle regneark og tidskrævende opfølgning på fakturaer.",
  challengeText:
    "Mange ejendomsvirksomheder bruger unødigt meget tid på at indsamle, strukturere og rapportere energidata – især i forhold til nye krav om ESG-rapportering (f.eks. CSRD) og bygningscertificeringer som DGNB. Comundo ønskede en hjemmeside, der hurtigt og tydeligt kunne formidle deres værdiskabende løsning og vise, hvordan automatisering af energidata gør rapportering både mere præcis og mindre tidskrævende.",
  solutionText:
    'Vi udviklede en intuitiv platform, hvor budskabet om "automatisk dataindsamling" står helt skarpt. Fokus var på at vise Comundos kernefordele. Hjemmesidens opbygning præsenterer Comundos vigtigste funktioner, kundecases og virksomhedsfilosofi – herunder deres engagement i at være "verdens bedste arbejdsplads" gennem fleksibilitet og en fire-dages arbejdsuge.',
  resultText:
    "På den nye hjemmeside kan potentielle kunder hurtigt se, hvordan Comundo differentierer sig med præcise, live-opdaterede data, der letter presset fra manuelle opgaver. Dette portfolio-projekt er et eksempel på, hvordan vi hos Creative Oak hjælper virksomheder med at skabe digitale løsninger, der kommunikerer klart og effektivt. Kontakt os gerne for at høre, hvad vi kan gøre for din forretning.",
  releaseDate: new Date().toISOString(),
  isFeatured: true,

  // Images to upload:
  // featuredImage: upload the main Comundo image
  // desktopImage: /images/portfolio/comundo/Desktop.webp
  // mobileImage: /images/portfolio/comundo/Smartphone.webp
  // fullPageSmartphoneImage: /images/portfolio/comundo/FullPageSmartphone.webp
  // desktopCollageImage: /images/portfolio/comundo/comundo-desktop-4.webp
  // workplaceImage: /images/portfolio/comundo/comundo-workplace.webp

  // Don't forget to add alt text for each image:
  primaryImageAltText: "Comundo dashboard on desktop showing energy data",
  desktopImageAltText: "Comundo Desktop Image",
  mobileImageAltText: "Comundo Smartphone Image",
  // Add categories by reference
  // categories: [{ _ref: 'category_id_1' }, { _ref: 'category_id_2' }]

  // Add main content block content (optional - additional to the structured content)
  // mainContent: []
};

console.log("=== Comundo Project Structure ===");
console.log(
  "Use this structure in the Sanity Studio to create your Comundo project",
);
console.log("------------------------------------");
console.log(JSON.stringify(comundoProjectStructure, null, 2));
console.log("------------------------------------");
console.log(
  "Remember to upload the images and set the correct references for categories",
);

console.log(
  "\n\nTo update a project using the Sanity client in Deno, add this code:",
);
console.log(`
// First install the NPM compatibility package for Sanity client:
// deno run -A npm:@sanity/client

import { createClient } from "npm:@sanity/client@6.4.0";

const client = createClient({
  projectId: "gt4m5sbb",
  dataset: "production",
  token: "YOUR_SANITY_TOKEN", // Get from manage.sanity.io
  apiVersion: "2023-08-01",
  useCdn: false,
});

// Then use client.createOrReplace() to update the document
`);
