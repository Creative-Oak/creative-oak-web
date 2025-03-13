import { useState } from "preact/hooks";
import { JSX } from "preact";

interface GalleryAccessProps {
  slug: string;
}

export default function GalleryAccess({ slug }: GalleryAccessProps) {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    
    try {
 
      const response = await fetch(`/api/gallery-access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, accessCode }),
      });
      

      
      if (response.ok) {
        // Redirect to the gallery page
        globalThis.location.href = `/gallery/${slug}?code=${encodeURIComponent(accessCode)}`;
      } else {
        setError("Invalid access code. Please try again.");
      }
    } catch (_err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div class="p-6 max-w-md  mx-auto bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Enter Gallery Access Code</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessCode">
            Access Code
          </label>
          <input
            id="accessCode"
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode((e.target as HTMLInputElement).value)}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p class="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Gallery
        </button>
      </form>
    </div>
  );
}