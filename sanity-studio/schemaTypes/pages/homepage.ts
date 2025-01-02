// schemas/pages/homepage.ts
import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
    name: "homepage-main",
    type: "document",
    title: "Home Page",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
            group: "content",
            validation: (Rule) =>
                Rule.required().max(60).warning(
                    "Keep the title short and descriptive.",
                ),
        }),
        defineField({
            name: "seo",
            type: "seo", // reference to the SEO object type
            group: "seo",
        }),
        // Additional fields...
    ],
    groups: [
        {
            name: "content",
            title: "Content",
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
});
