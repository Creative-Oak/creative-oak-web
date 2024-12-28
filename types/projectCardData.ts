import { Image } from "@sanity/types";
export interface ProjectCardData {
    title: string;
    projectShortDescription: string;
    featuredImage?: Image;  // or "featuredImage: Image" if guaranteed
    featuredImageUrl?: string; // optional if you store the final URL
    slug: string;
    categories: string[];
}