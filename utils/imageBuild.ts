// utils/imageBuild.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.ts";
import { Image } from "@sanity/types";

interface VideoAsset {
  _ref: string;
  _type: string;
}

// Create a builder instance
const builder = imageUrlBuilder(client);

// Enhanced urlFor function with image optimizations
export const urlFor = (source: Image, width?: number, height?: number) => {
  // Start with the base image builder
  let imageBuilder = builder.image(source);

  // Apply width if provided (default to 1200px for portfolio cards)
  if (width || width === 0) {
    imageBuilder = imageBuilder.width(width);
  } else {
    imageBuilder = imageBuilder.width(1200); // Increased default width
  }

  // Apply height if provided
  if (height || height === 0) {
    imageBuilder = imageBuilder.height(height);
  }

  // Apply automatic format conversion (will use WebP when supported)
  imageBuilder = imageBuilder.auto("format");

  // Set quality to 92% for high quality images
  imageBuilder = imageBuilder.quality(98);

  // Return the final URL
  return imageBuilder.url();
};

// Keep your existing urlForFile function
export const urlForFile = (ref: VideoAsset) => {
  if (!ref?._ref) return "";

  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${
    ref._ref.replace("file-", "").replace("-mp4", ".mp4")
  }`;
};
