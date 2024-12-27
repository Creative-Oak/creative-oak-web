
import { Image } from "@sanity/types";  

export interface ProjectCardData {
    title: string;
    projectShortDescription: string;
    featuredImage: Image;
    slug: string;
    categories: string[];
}