import imageUrlBuilder from "@sanity/image-url";

import { client } from "./sanity.ts"; // Import your configured Sanity client.
import { Image } from "@sanity/types";

interface VideoAsset {
  _ref: string;
  _type: string;
}


const builder = imageUrlBuilder(client);

export const urlFor = (source: Image) => {
  return builder.image(source).url();
};

export const urlForFile = (ref: VideoAsset) => {
  if (!ref?._ref) return '';

  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${ref._ref.replace('file-', '').replace('-mp4', '.mp4')}`;
};