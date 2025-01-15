import { Rule } from "sanity"

export default {
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the partner company',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Logo Image',
      type: 'image',
      description: 'The partner company logo',
      options: {
        hotspot: true
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Link to partner website',

    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the logo appears (optional)',
      validation: (Rule: Rule) => Rule.integer().positive()
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}