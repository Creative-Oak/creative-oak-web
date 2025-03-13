
import GalleryAccess from "../../islands/Forms/GalleryAccess.tsx";

export default function GalleryIndexPage() {
  return (
    <div class="container pt-32 mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Photography Client Galleries</h1>
      <p class="text-center mb-8">
        Please enter the access code provided by your photographer to view your gallery.
      </p>
      <GalleryAccess slug="" />
    </div>
  );
}
