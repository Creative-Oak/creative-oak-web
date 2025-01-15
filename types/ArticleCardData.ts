import { Image } from "@sanity/types";
export interface ArticleCardData {
    title: string;
    shortDescription: string;
    featuredImage?: Image;  // or "featuredImage: Image" if guaranteed
    featuredImageUrl?: string; // optional if you store the final URL
    slug: string;
}