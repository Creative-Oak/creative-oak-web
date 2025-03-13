import { FreshContext } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

export const handler = async (req: Request, _ctx: FreshContext): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { galleryId, accessCode, selectedImages } = await req.json();

    // Verify gallery and access code
    const query = `*[_type == "gallery" && _id == $galleryId && accessCode == $accessCode][0]`;
    const gallery = await client.fetch(query, { galleryId, accessCode });

    if (!gallery) {
      return new Response(JSON.stringify({ error: "Invalid access code" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the images in Sanity
    // This is a bit complex because we need to update specific items in an array
    const transaction = client.transaction();

    // First reset all selected flags
    transaction.patch(galleryId, (p) => 
      p.set({
        "images": gallery.images.map((img: any) => ({
          ...img,
          selected: false
        }))
      })
    );

    // Then set selected flags for chosen images
    for (const imageKey of selectedImages) {
      transaction.patch(galleryId, (p) =>
        p.setIfMissing({ "images": [] })
         .set({
           [`images[_key == "${imageKey}"].selected`]: true
         })
      );
    }

    await transaction.commit();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving selections:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};