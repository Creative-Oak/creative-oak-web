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
  listItem?: string;
  level?: number;
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
    targetBlank?: boolean;
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
  let currentList: JSX.Element[] = [];
  let isInList = false;
  let currentLevel = 0;

  const result: JSX.Element[] = [];

  mainContent.forEach((block, index) => {
    if (block._type === "block") {
      if (block.listItem) {
        // Handle list items
        if (!isInList) {
          // Start new list
          isInList = true;
          currentLevel = block.level || 1;
          currentList = [];
        }

        // Add item to current list
        currentList.push(
          <li  key={block._key || index} style={{ marginLeft: '24px' }}  className="ml-6  mb-2">
            {block.children?.map((child, idx) => renderTextContent(child, idx, block.markDefs))}
          </li>
        );
      } else {
        // Not a list item - flush any existing list
        if (isInList && currentList.length > 0) {
          result.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4">
              {currentList}
            </ul>
          );
          currentList = [];
          isInList = false;
        }

        // Handle regular blocks
        switch (block.style) {
          case "h2":
            result.push(
              <h2 key={block._key || index} className="text-4xl font-bold mt-8 mb-4 text-brand-black">
                {block.children?.map((child, idx) => renderTextContent(child, idx, block.markDefs))}
              </h2>
            );
            break;

          case "h3":
            result.push(
              <h3 key={block._key || index} className="text-3xl font-semibold mt-6 mb-4 text-brand-black">
                {block.children?.map((child, idx) => renderTextContent(child, idx, block.markDefs))}
              </h3>
            );
            break;

            case "h4":
              result.push(
                <h3 key={block._key || index} className="text-2xl font-semibold mt-6 mb-2 text-brand-black">
                  {block.children?.map((child, idx) => renderTextContent(child, idx, block.markDefs))}
                </h3>
              );
              break;

          default:
            result.push(
              <p key={block._key || index} className="text-brand-black leading-relaxed mb-4">
                {block.children?.map((child, idx) => renderTextContent(child, idx, block.markDefs))}
              </p>
            );
        }
      }
    } else if (block._type === "image") {
      // Flush any existing list before adding image
      if (isInList && currentList.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="list-disc mb-4">
            {currentList}
          </ul>
        );
        currentList = [];
        isInList = false;
      }

      // Handle image
      if (block.asset) {
        result.push(
          <div key={block._key || index} className="my-8">
            <img
              src={urlFor(block.asset)}
              alt={block.alt || "Project image"}
              className="w-full h-auto object-cover border-2 border-brand-black shadow-custom-black"
            />
            {block.caption && (
              <p className="text-sm text-brand-black-500 italic mt-2">{block.caption}</p>
            )}
          </div>
        );
      }
    } else if (block._type === "videoEmbed") {
      // Flush any existing list before adding video
      if (isInList && currentList.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="list-disc mb-4">
            {currentList}
          </ul>
        );
        currentList = [];
        isInList = false;
      }

      // Handle video
      if (block.video?.asset) {
        result.push(
          <div key={block._key || index} className="my-8">
            <video
              controls
              className="w-full border-2 border-brand-black shadow-custom-black"
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
          result.push(
            <div key={block._key || index} className="my-8 aspect-video">
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
    }
  });

  // Flush any remaining list items
  if (isInList && currentList.length > 0) {
    result.push(
      <ul key="final-list" className="list-disc mb-4">
        {currentList}
      </ul>
    );
  }

  return result;
};

const renderTextContent = (
  child: { text: string; marks?: string[]; _key: string },
  idx: number,
  markDefs?: { 
    _key: string; 
    _type: string; 
    href: string;
    targetBlank?: boolean;
  }[]
): JSX.Element => {
  if (!child.text) {
    return <span key={idx}></span>;
  }
  
  let element = <span key={idx}>{child.text}</span>;
  
  if (child.marks?.length) {
    // First wrap with any links (if present)
    if (markDefs?.length) {
      const linkMark = markDefs.find(def => child.marks?.includes(def._key));
      if (linkMark) {
        element = (
          <a 
            href={linkMark.href}
            key={idx}
            {...(linkMark.targetBlank ? {
              target: "_blank",
              rel: "noopener noreferrer"
            } : {})}
            className="text-brand-red hover:underline"
          >
            {child.text}
          </a>
        );
      }
    }
    
    // Then wrap with strong if present
    if (child.marks.includes('strong')) {
      element = <strong key={idx} className="font-semibold">{element}</strong>;
    }
  }
  
  return element;
};

export default renderMainContent;