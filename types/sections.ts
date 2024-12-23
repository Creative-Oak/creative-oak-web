import { Image } from "@sanity/types";  
  // Define specific section interfaces
  interface HeroSection1Data {
    _type: "heroSection1";
    rightImage: Image;
    header: string;
    buttonText1: string;
    subtitle: string;
  }
  
  interface SplitterData {
    _type: "splitter";
    // Add any splitter-specific fields if needed
  }
  
  // Union type for all possible section types
  export type Section = HeroSection1Data | SplitterData;
  
  // Update the PageData interface
  export interface PageData {
    title: string;
    sections: Section[];
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
    };
  }