import { JSX } from "preact/jsx-runtime";

export interface Content4CardType {
    description: JSX.Element;
    icon: JSX.Element;
    buttonText?: string;
    showBorder?: boolean;
    centerText?: boolean;
    buttonLink?: string;
    title: string;
}