import { Rule } from "@sanity/types";

import {BookIcon} from '@sanity/icons'

export default {
    name: 'article',
    type: 'document',
    icon: BookIcon,
    title: 'Articles',
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
        name: 'relatedArticles',
        type: 'array',
        title: 'Related Articles',
        description: 'Select 1-2 related articles that readers might be interested in',
        of: [
          {
            type: 'reference',
            to: [{ type: 'article' }]
          }
        ],
        validation: (Rule: Rule) => Rule.max(2),
      },
      {
        name: 'shortDescription',
        type: 'text',
        title: 'Article Short Description',
        validation: (Rule: Rule) => Rule.max(200).warning('Shorter descriptions are better!'),
      },
      {
        name: 'author',
        type: 'reference',
        title: 'Author',
        to: [{ type: 'employee' }],
        validation: (Rule: Rule) => Rule.required(),
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
  