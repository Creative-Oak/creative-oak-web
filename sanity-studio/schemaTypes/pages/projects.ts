import { Rule } from "@sanity/types";

import {ProjectsIcon} from '@sanity/icons'

export default {
    name: 'project',
    type: 'document',
    icon: ProjectsIcon,
    title: 'Projects',
    fields: [
      {
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'mainContent',
        type: 'blockContent',
        title: 'Main Content',
      },
      {
        name: 'featuredImage',
        type: 'image',
        title: 'Featured Image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'projectShortDescription',
        type: 'text',
        title: 'Project Short Description',
        validation: (Rule: Rule) => Rule.max(200).warning('Shorter descriptions are better!'),
      },
      {
        name: 'categories',
        type: 'array',
        title: 'Categories',
        of: [{ type: 'reference', to: [{ type: 'projectCategories' }] }],
      },
      {
        name: "releaseDate",
        title: "Release Date",
        type: "datetime",
      },      
      {
        name: 'isFeatured',
        type: 'boolean',
        title: 'Is Featured',
      },
      {
        name: 'primaryImageAltText',
        type: 'string',
        title: 'Primary Image Alt Text',
        validation: (Rule: Rule) => Rule.required().warning('Alt text is important for accessibility!'),
      },
      {
        name: 'metaDescription',
        type: 'string',
        title: 'Meta Description',
        validation: (Rule: Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters!'),
      },
    ],
  };
  