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
            isHighlighted: true, // Show this field in the image editor
          },
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Image caption for additional context.',
          options: {
            isHighlighted: true, // Show this field in the image editor
          },
        },
      ],
    },
    {
      type: 'videoEmbed', // Add support for video embeds
    },
  ],
});
