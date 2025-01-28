
import { Image } from "@sanity/types";

export interface Employee {
    name: string;
    position: string;
    profileImage: Image;
    bio: string;
    slug: string;
    email: string;
    socialLinks: SocialLinks;

    isActive: boolean;
  }

  interface SocialLinks {
    linkedin?: string;
    twitter?: string;
    github?: string;
  }
  