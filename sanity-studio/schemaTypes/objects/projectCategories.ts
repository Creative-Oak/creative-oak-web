import { Rule } from "sanity";
import {SchemaIcon} from '@sanity/icons'


export default {
    "name": "projectCategories",
    "icon": SchemaIcon,
    "type": "document",
    "title": "Project Categories",
    "fields": [
      {
        "name": "title",
        "type": "string",
        "title": "Title",
        "validation": (Rule:Rule) => Rule.required()
      },
      {
        "name": "description",
        "type": "text",
        "title": "Description",
        "validation": null
      },
      {
        "name": "slug",
        "type": "slug",
        "title": "Slug",
        "validation": null
      }
    ],
}