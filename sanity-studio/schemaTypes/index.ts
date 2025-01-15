import { seo } from "./objects/seo.ts";

import globalSettings from "./settings/globalSettings.ts";
import projects from "./pages/projects.ts";
import projectCategories from "./objects/projectCategories.ts";
import blockContent from "./blockContent.ts";
import videoEmbed from "./objects/videoEmbed.ts";
import homepage from "./pages/homepage.ts";
import about from "./pages/about.ts";
import testemonial from "./objects/Testemonial.ts";
import article from "./pages/articles.ts";
import employee from "./pages/employee.ts";
import partnerLogo from "./pages/partnerLogo.ts";
export const schemaTypes = [
  seo,
  globalSettings,
  projectCategories,
  projects,
  blockContent,
  videoEmbed,
  testemonial,
  homepage,
  article,
  partnerLogo,
  about,
  employee
];
