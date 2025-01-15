import { Rule } from "@sanity/types";
import { UserIcon } from '@sanity/icons'

export default {
  name: 'employee',
  type: 'document',
  icon: UserIcon,
  title: 'Employees',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position/Role',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'pronouns',
      type: 'string',
      title: 'Pronouns',
    },
    {
      name: 'profileImage',
      type: 'image',
      title: 'Profile Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      type: 'blockContent',
      title: 'Biography',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (Rule: Rule) => Rule.email(),
    },
    {
      name: 'phoneNumber',
      type: 'string',
      title: 'Phone Number',
    },
    {
      name: 'socialLinks',
      type: 'object',
      title: 'Social Media Links',
      fields: [
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'github', type: 'url', title: 'GitHub'}
      ]
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'profileImage'
    }
  }
};