import { Handlers, PageProps } from "$fresh/server.ts";

import GalleryAccess from "../../islands/Forms/GalleryAccess.tsx";
import GalleryDisplay from "../../islands/GalleryDisplay.tsx";

import { client } from "../../utils/sanity.ts";



interface GalleryData {
  gallery: Gallery | null;
  accessGranted: boolean;
  params: {
    slug: string;
  };
  url: string;
}

export const handler: Handlers<GalleryData> = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const url = new URL(req.url);
    const accessCode = url.searchParams.get("code") || "";
    
    let gallery = null;
    let accessGranted = false;

    if (accessCode) {
      // Query Sanity for gallery
      const query = `*[_type == "gallery" && slug.current == $slug && accessCode == $accessCode][0]{
        _id,
        title,
        slug,
        clientName,
        shootDate,
        expiryDate,
        "images": images[]{
          _key,
          "url": asset->url,
          caption,
          filename,
          selected
        }
      }`;
      
      gallery = await client.fetch(query, { slug, accessCode });
      
      if (gallery) {
        // Check if gallery has expired
        if (gallery.expiryDate && new Date(gallery.expiryDate) < new Date()) {
          gallery = null;
        } else {
          accessGranted = true;
        }
      }
    }

    return ctx.render({ gallery, accessGranted, params: { slug }, url: req.url });
  },
};

export default function GalleryPage({ data }: PageProps<GalleryData>) {
  const { gallery, accessGranted } = data;
  const { slug } = data.params;
  const url = new URL(data.url);
  const accessCode = url.searchParams.get("code") || "";

  if (!accessGranted || !gallery) {
    return (
      <div class="container mx-auto pt-40 px-4 py-8">
        <h1 class="text-3xl font-bold mb-6 text-center">Access Gallery</h1>
        <GalleryAccess slug={slug} />
      </div>
    );
  }

  return (
    <div class="min-h-screen mt-24  bg-gray-100">
      <GalleryDisplay galleryData={gallery} accessCode={accessCode} />
    </div>
  );
}

// 9. TYPES (types.ts)
export interface Image {
  _key: string;
  url: string;
  caption?: string;
  filename?: string;
  selected: boolean;
}

export interface Gallery {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  accessCode: string;
  clientName?: string;
  clientEmail?: string;
  shootDate?: string;
  expiryDate?: string;
  images: Image[];
}