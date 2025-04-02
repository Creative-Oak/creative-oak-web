import { Head } from "$fresh/src/runtime/head.ts";

type OGType =
    | "website"
    | "article"
    | "profile"
    | "book"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other";

interface CustomHeadProps {
    title: string;
    metaDescription: string;
    imageUrl: string;
    url: string;
    ogType?: OGType;  // Made optional
}

const CustomHead = ({ ogType = "website", ...props }: CustomHeadProps) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta
                name="description"
                content={props.metaDescription}
            />
            
            {/* Canonical URL */}
            <link rel="canonical" href={props.url} />

            {/* Open Graph meta tags */}
            <meta
                property="og:title"
                content={props.title}
            />
            <meta
                property="og:description"
                content={props.metaDescription}  // Fixed from imageUrl
            />
            <meta 
                property="og:image" 
                content={props.imageUrl} 
            />
            <meta 
                property="og:type" 
                content={ogType} 
            />
            <meta 
                property="og:url" 
                content={props.url} 
            />

            {/* Twitter Card meta tags */}
            <meta 
                name="twitter:card" 
                content="summary_large_image" 
            />
            <meta
                name="twitter:title"
                content={props.title}
            />
            <meta
                name="twitter:description"
                content={props.metaDescription}
            />
            <meta 
                name="twitter:image" 
                content={props.imageUrl} 
            />
            <script defer src="https://cloud.umami.is/script.js" data-website-id="87b0d737-d9e9-48d2-ba28-2caf294924d3"></script>
        </Head>
    );
};

export default CustomHead;