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

  const projectId = client.config().projectId;
  const dataset = client.config().dataset;
  
  // Extract the file reference without the "file-" prefix
  let fileRef = ref._ref.replace("file-", "");
  
  // Determine file extension based on the reference
  let extension = "";
  if (fileRef.endsWith("-webm")) {
    extension = ".webm";
    fileRef = fileRef.replace("-webm", "");
  } else if (fileRef.endsWith("-mp4")) {
    extension = ".mp4";
    fileRef = fileRef.replace("-mp4", "");
  } else if (fileRef.endsWith("-mov")) {
    extension = ".mov";
    fileRef = fileRef.replace("-mov", "");
  } else if (fileRef.endsWith("-avi")) {
    extension = ".avi";
    fileRef = fileRef.replace("-avi", "");
  } else {
    // Fallback: assume mp4 if no recognized format
    extension = ".mp4";
  }

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileRef}${extension}`;
};
