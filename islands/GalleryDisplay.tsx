import { useEffect, useState } from "preact/hooks";
import type { Image } from "../routes/gallery/[slug].tsx";

interface GalleryDisplayProps {
    galleryData: {
      title: string;
      images: Image[];
      _id: string;
    };
    accessCode: string;
  }
  

export default function GalleryDisplay({ galleryData, accessCode }: GalleryDisplayProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  // Initialize selected images from server data
  useEffect(() => {
    const initialSelected = galleryData.images
      .filter((img): img is (Image & { _key: string; selected: boolean }) => Boolean(img.selected))
      .map((img) => img._key);
    setSelectedImages(initialSelected);
  }, [galleryData]);


  const toggleImageSelection = (imageKey: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(imageKey)) {
        return prev.filter((key) => key !== imageKey);
      } else {
        return [...prev, imageKey];
      }
    });
  };

  const saveSelections = async () => {
    try {
      const response = await fetch(`/api/save-selection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          galleryId: galleryData._id,
          accessCode,
          selectedImages,
        }),
      });

      if (response.ok) {
        setMessage("Your selections have been saved!");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (_err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div class="container mx-auto pt-32 px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">{galleryData.title}</h1>
        <div class="text-right">
          <p class="mb-2">Selected: {selectedImages.length} of {galleryData.images.length}</p>
          <button
            onClick={saveSelections}
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Selections
          </button>
        </div>
      </div>

      {message && (
        <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
          <p>{message}</p>
        </div>
      )}

      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryData.images.map((image) => (
          <div 
            key={image._key} 
            class={`relative rounded overflow-hidden shadow-lg break-inside-avoid mb-6 ${
              selectedImages.includes(image._key) ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <img
              src={`${image.url}?auto=format&q=75`}
              class="w-full h-auto"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleImageSelection(image._key)}
                class={`px-4 py-2 rounded ${
                  selectedImages.includes(image._key)
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold`}
              >
                {selectedImages.includes(image._key) ? "Deselect" : "Select"}
              </button>
            </div>
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div class="absolute inset-0 flex items-center justify-center">
               
              </div>
            </div>
            {image.caption && (
              <div class="px-4 py-2 bg-white">
                <p class="text-gray-700 text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
