import { Image } from "@sanity/types";

export default interface Testemonial {
    name: string;
    title: string;
    content: string;
    image: Image;
    image_alt: string;
}