import { Rule } from "@sanity/types";

import { ProjectsIcon } from "@sanity/icons";

export default {
  name: "project",
  type: "document",
  icon: ProjectsIcon,
  title: "Projects",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "projectType",
      type: "string",
      title: "Project Type",
      description: "Determines the layout template to use for this project",
      options: {
        list: [
          { title: "Website Project", value: "website" },
          { title: "Other Project", value: "other" },
        ],
      },
      initialValue: "website",
    },
    {
      name: "mainContent",
      type: "blockContent",
      title: "Main Content",
    },
    {
      name: "featuredImage",
      type: "image",
      title: "Featured Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "projectShortDescription",
      type: "text",
      title: "Project Short Description",
      validation: (Rule: Rule) =>
        Rule.max(200).warning("Shorter descriptions are better!"),
    },
    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: [{ type: "projectCategories" }] }],
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "datetime",
    },
    {
      name: "isFeatured",
      type: "boolean",
      title: "Is Featured",
      initialValue: false,
    },
    {
      name: "primaryImageAltText",
      type: "string",
      title: "Primary Image Alt Text",
      validation: (Rule: Rule) =>
        Rule.required().warning("Alt text is important for accessibility!"),
    },
    {
      name: "metaDescription",
      type: "string",
      title: "Meta Description",
      validation: (Rule: Rule) =>
        Rule.max(160).warning("Keep meta descriptions under 160 characters!"),
    },
    {
      name: "industry",
      type: "string",
      title: "Industry",
      description: "The industry or sector this project belongs to (e.g., Beverage, Technology, Healthcare)",
    },
    // New fields for portfolio project layout
    {
      name: "desktopImage",
      type: "image",
      title: "Desktop Image",
      description: "Image showing the project on desktop devices",
      options: {
        hotspot: true,
      },
    },
    {
      name: "desktopImageAltText",
      type: "string",
      title: "Desktop Image Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "desktopVideo",
      type: "file",
      title: "Desktop Video",
      description: "Video showing the project on desktop devices (1920x1080 recommended, WebM preferred for smaller file sizes)",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "desktopVideoAltText",
      type: "string",
      title: "Desktop Video Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "mobileImage",
      type: "image",
      title: "Mobile Image",
      description: "Image showing the project on mobile devices",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mobileImageAltText",
      type: "string",
      title: "Mobile Image Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "mobileVideo",
      type: "file",
      title: "Mobile Video",
      description: "Video showing the project on mobile devices (vertical aspect ratio recommended, WebM preferred for smaller file sizes)",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "mobileVideoAltText",
      type: "string",
      title: "Mobile Video Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "fullPageSmartphoneImage",
      type: "image",
      title: "Full Page Smartphone Image",
      description: "A full page background image of the project on smartphone",
      options: {
        hotspot: true,
      },
    },
    {
      name: "desktopCollageImage",
      type: "image",
      title: "Desktop Collage Image",
      description: "A full width collage/showcase of the project on desktop",
      options: {
        hotspot: true,
      },
    },
    {
      name: "workplaceImage",
      type: "image",
      title: "Workplace Image",
      description:
        "Image showing the workplace or environment related to the project",
      options: {
        hotspot: true,
      },
    },
    // Gallery Images for Animated Section
    {
      name: "galleryImage1",
      type: "image",
      title: "Gallery Image 1",
      description: "First image in the animated gallery section",
      options: {
        hotspot: true,
      },
    },
    {
      name: "galleryImage1AltText",
      type: "string",
      title: "Gallery Image 1 Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "galleryImage2",
      type: "image",
      title: "Gallery Image 2",
      description: "Second image in the animated gallery section",
      options: {
        hotspot: true,
      },
    },
    {
      name: "galleryImage2AltText",
      type: "string",
      title: "Gallery Image 2 Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "galleryImage3",
      type: "image",
      title: "Gallery Image 3",
      description: "Third image in the animated gallery section",
      options: {
        hotspot: true,
      },
    },
    {
      name: "galleryImage3AltText",
      type: "string",
      title: "Gallery Image 3 Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "galleryImage4",
      type: "image",
      title: "Gallery Image 4",
      description: "Fourth image in the animated gallery section",
      options: {
        hotspot: true,
      },
    },
    {
      name: "galleryImage4AltText",
      type: "string",
      title: "Gallery Image 4 Alt Text",
      validation: (Rule: Rule) =>
        Rule.warning("Alt text is important for accessibility!"),
    },
    {
      name: "introText",
      type: "blockContent",
      title: "Intro Text",
      description:
        "Introductory text about the project (appears after the hero section)",
    },
    {
      name: "challengeText",
      type: "text",
      title: "Challenge Text",
      description: "Text describing the challenge addressed by the project",
    },
    {
      name: "solutionText",
      type: "text",
      title: "Solution Text",
      description: "Text describing the solution offered by the project",
    },
    {
      name: "resultText",
      type: "text",
      title: "Result Text",
      description: "Text describing the results or outcomes of the project",
    },
  ],
};
