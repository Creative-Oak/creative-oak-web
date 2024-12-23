import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.ts"; // Import your configured Sanity client.
import { Image } from "@sanity/types";

const builder = imageUrlBuilder(client);

export const urlFor = (source: Image) => {
  return builder.image(source).url();
};
