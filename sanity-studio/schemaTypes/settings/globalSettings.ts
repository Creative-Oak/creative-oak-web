// schemas/settings.ts
import { Rule } from '@sanity/types'

interface NavigationItem {
  text: string;
  linkType: 'static' | 'external';
  link: string;
  openInNewTab?: boolean;
}

interface ParentObject {
  linkType?: string;
}

export default {
  name: "settings",
  title: "Global Settings",
  type: "document",
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: "mainNavigation",
      title: "Main Navigation (Header)",
      type: "array",
      description: "Add links to the main navigation bar",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Navigation Text",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "linkType",
              title: "Link Type",
              type: "string",
              options: {
                list: [
                  { title: "Static Page", value: "static" },
                  { title: "External Link", value: "external" },
                ],
                layout: "radio",
              },
              initialValue: "static",
            },
            {
              name: "link",
              title: "Link",
              type: "string",
              description: "For static pages, use paths like '/about' or '/contact'. For external links, use full URLs.",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "openInNewTab",
              title: "Open in New Tab",
              type: "boolean",
              description: "Check to open link in a new tab",
              initialValue: false,
              hidden: ({ parent }: { parent: ParentObject }) => parent?.linkType !== "external"
            },
            {
              name: "childLinks",
              title: "Child Links (Dropdown)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Text",
                      type: "string",
                      validation: (rule: Rule) => rule.required(),
                    },
                    {
                      name: "linkType",
                      title: "Link Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Static Page", value: "static" },
                          { title: "External Link", value: "external" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "static",
                    },
                    {
                      name: "link",
                      title: "Link",
                      type: "string",
                      validation: (rule: Rule) => rule.required(),
                    },
                    {
                      name: "openInNewTab",
                      title: "Open in New Tab",
                      type: "boolean",
                      initialValue: false,
                      hidden: ({ parent }: { parent: ParentObject }) => parent?.linkType !== "external"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "array",
      description: "Organize footer navigation in columns",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "columnTitle",
              title: "Column Title",
              type: "string"
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Text",
                      type: "string",
                      validation: (rule: Rule) => rule.required(),
                    },
                    {
                      name: "linkType",
                      title: "Link Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Static Page", value: "static" },
                          { title: "External Link", value: "external" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "static",
                    },
                    {
                      name: "link",
                      title: "Link",
                      type: "string",
                      validation: (rule: Rule) => rule.required(),
                    },
                    {
                      name: "openInNewTab",
                      title: "Open in New Tab",
                      type: "boolean",
                      initialValue: false,
                      hidden: ({ parent }: { parent: ParentObject }) => parent?.linkType !== "external"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "footerText",
      type: "string",
      title: "Footer Text",
      description: "Text displayed in the site footer.",
    },
  ],
}