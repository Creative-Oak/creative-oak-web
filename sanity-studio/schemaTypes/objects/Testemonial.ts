import { Rule } from "sanity";
import {UsersIcon} from '@sanity/icons'

export default {
    "name": "testemonnial",
    "type": "document",
    "icon": UsersIcon,
    "title": "Testemonials",
    "fields": [
        {
            "name": "name",
            "type": "string",
            "title": "name",
            "validation": (Rule: Rule) => Rule.required(),
        },
        {
            "name": "title",
            "type": "string",
            "title": "title",
            "validation": (Rule: Rule) => Rule.required(),
        },
        {
            "name": "content",
            "type": "text",
            "title": "Content",
            "validation": (Rule: Rule) => Rule.required(),
        },
        {
            "name": "image",
            "type": "image",
            "title": "Image",
            "validation": (Rule: Rule) => Rule.required(),
        },
        {
            "name": "image_alt",
            "type": "string",
            "title": "Image Alt",
            "validation": (Rule: Rule) => Rule.required(),
        },
    ],
};
