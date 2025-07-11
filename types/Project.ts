import { Image } from "@sanity/types";
import { BlockContent } from "../utils/renderText.tsx";

interface VideoAsset {
  _ref: string;
  _type: string;
}

interface VideoFile {
  _type: string;
  asset: VideoAsset;
}

export interface Project {
  title: string;
  mainContent: BlockContent[];
  featuredImage: Image;
  projectShortDescription: string;
  categories: { title: string }[];
  releaseDate: string;
  isFeatured: boolean;
  slug: string;
  primaryImageAltText: string;
  metaDescription: string;
  industry?: string;
  projectType: "website" | "other";
  desktopImage?: Image;
  desktopImageAltText?: string;
  mobileImage?: Image;
  mobileImageAltText?: string;
  desktopVideo?: VideoFile;
  desktopVideoAltText?: string;
  mobileVideo?: VideoFile;
  mobileVideoAltText?: string;
  fullPageSmartphoneImage?: Image;
  desktopCollageImage?: Image;
  workplaceImage?: Image;
  galleryImage1?: Image;
  galleryImage1AltText?: string;
  galleryImage2?: Image;
  galleryImage2AltText?: string;
  galleryImage3?: Image;
  galleryImage3AltText?: string;  
  galleryImage4?: Image;
  galleryImage4AltText?: string;
  introText?: BlockContent[];
  challengeText?: string;
  solutionText?: string;
  resultText?: string;
  relatedProjects?: {
    title: string;
    slug: string;
    projectShortDescription: string;
    categories: string[];
  }[];
}
