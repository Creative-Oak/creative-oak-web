import { defineType } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h2' },
        { title: 'Heading 2', value: 'h3' },
        { title: 'Heading 3', value: 'h4' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                name: 'targetBlank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Image caption for additional context.',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      type: 'videoEmbed',
    },
  ],
});