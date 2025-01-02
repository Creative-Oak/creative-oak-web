// utils/types.ts
export interface NavigationItem {
    text: string;
    link: string;
    linkType: "static" | "external";
    openInNewTab?: boolean;
    childLinks?: NavigationItem[];
  }
  
  export interface State {
    navigation: NavigationItem[];
  }
  