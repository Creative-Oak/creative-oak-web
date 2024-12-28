import { JSX } from "preact/jsx-runtime";
import { urlFor, urlForFile } from "./imageBuild.ts";

interface VideoAsset {
  _ref: string;
  _type: string;
}

interface VideoFile {
  _type: string;
  asset: VideoAsset;
}

export interface BlockContent {
  _type: string;
  style?: string;
  children?: {
    _type: string;
    text: string;
    marks?: string[];
    _key: string;
  }[];
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
  markDefs?: {
    _key: string;
    _type: string;
    href: string;
  }[];
  _key: string;
  video?: VideoFile;
  url?: string;
}

// Helper function to extract YouTube video ID
const getYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const renderMainContent = (mainContent: BlockContent[]): JSX.Element[] => {
  return mainContent
    .map((block, index): JSX.Element | null => {
      // Handle different block types
      switch (block._type) {
        case "image":
          if (block.asset) {
            return (
              <div key={block._key || index} className="my-8 ">
                <img
                  src={urlFor(block.asset)}
                  alt={block.alt || "Project image"}
                  className="w-full h-auto object-cover border-2 border-brand-black shadow-custom-black"
                />
                {block.caption && (
                  <p className="text-sm text-gray-600 italic mt-2">{block.caption}</p>
                )}
              </div>
            );
          }
          return null;
     
          /* falls through */

        case "videoEmbed":
          if (block.video?.asset) {
            return (
              <div key={block._key || index} className="my-8">
                <video
                  controls
                  className="w-full  border-2 border-brand-black shadow-custom-black"
                >
                  <source src={urlForFile(block.video.asset)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {block.caption && (
                  <p className="text-sm text-gray-600 italic mt-2">{block.caption}</p>
                )}
              </div>
            );
          } else if (block.url) {
            const youtubeId = getYouTubeId(block.url);
            if (youtubeId) {
              return (
                <div key={block._key || index} className="my-8 aspect-video ">
                  <iframe
                    className="w-full h-full border-2 border-brand-black shadow-custom-black"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={block.caption || "YouTube video"}
                  />
                  {block.caption && (
                    <p className="text-sm text-gray-600 italic mt-2">{block.caption}</p>
                  )}
                </div>
              );
            }
          }
          return null;
          /* falls through */

        case "block":
          if (!block.children?.length) return null;
          
          // Handle different text styles
          switch (block.style) {
            case "h2":
              return (
                <h2 key={block._key || index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">
                  {block.children.map((child, idx) => 
                    renderTextContent(child, idx, block.markDefs)
                  )}
                </h2>
              );

            case "h3":
              return (
                <h3 key={block._key || index} className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
                  {block.children.map((child, idx) => 
                    renderTextContent(child, idx, block.markDefs)
                  )}
                </h3>
              );

            case "normal":
            default:
              return (
                <p key={block._key || index} className="text-gray-700 leading-relaxed mb-4">
                  {block.children.map((child, idx) => 
                    renderTextContent(child, idx, block.markDefs)
                  )}
                </p>
              );
          }
          /* falls through */

        default:
          return null;
      }
    })
    .filter((element): element is JSX.Element => element !== null);
};

const renderTextContent = (
  child: { text: string; marks?: string[]; _key: string },
  idx: number,
  markDefs?: { _key: string; _type: string; href: string }[]
): JSX.Element => {
  if (!child.text) {
    return <span key={idx}></span>;
  }
  
  if (child.marks?.length) {
    // Handle strong text
    if (child.marks.includes('strong')) {
      return <strong key={idx} className="font-semibold">{child.text}</strong>;
    }
    
    // Handle links
    const linkMark = markDefs?.find((def) => 
      child.marks?.includes(def._key)
    );
    
    if (linkMark) {
      return (
        <a 
          key={idx}
          href={linkMark.href}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {child.text}
        </a>
      );
    }
  }
  
  return <span key={idx}>{child.text}</span>;
};

export default renderMainContent;