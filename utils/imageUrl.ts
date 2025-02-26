// utils/imageUrl.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from "./sanity.ts";

// Define Sanity image source types
export interface SanityImageSource {
  asset: {
    _ref: string;
    _id?: string;
  };
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  _type?: string;
}

// Initialize the builder with the Sanity client
const builder = imageUrlBuilder(client);

// Function to build image URLs with transformations
export function urlFor(source: SanityImageSource ) {
  return builder.image(source);
}