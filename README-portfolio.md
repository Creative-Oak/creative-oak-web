# Portfolio Project Template

This README explains how to use the new dynamic portfolio project template
system for Creative Oak.

## Overview

We've converted the static Comundo page into a dynamic template that can be used
for all portfolio projects. The content structure is now managed in Sanity,
allowing for easy updates and additions to the portfolio.

## Key Components

1. **Project Schema**: The Sanity schema has been expanded with additional
   fields to support the portfolio layout, including:
   - Desktop and mobile images
   - Full page smartphone image
   - Desktop collage image
   - Workplace image
   - Intro, challenge, solution and result text sections

2. **Dynamic Template**: The `routes/projects/[slug].tsx` file now serves as the
   template for all projects, pulling data from Sanity and displaying it in a
   layout similar to the Comundo page.

3. **Redirector**: The original `routes/portfolio/comundo.tsx` has been replaced
   with a simple redirector to the dynamic page.

## Adding a New Portfolio Project

1. Create a new project in the Sanity Studio with all the required fields:
   - Basic information (title, slug, description, etc.)
   - Images for desktop, mobile, full page, and collage views
   - Text sections for intro, challenge, solution, and result

2. The project will automatically be available at `/projects/[your-slug]`

3. You can optionally create a redirector at
   `routes/portfolio/[your-project-name].tsx` for backward compatibility or
   custom routes.

## Migration Helper

We've included a helper script at `scripts/migrate-comundo.js` that:

- Provides a template for structuring a project like Comundo
- Shows the necessary fields and content structure
- Offers guidance on how to use the Sanity client to programmatically update
  projects

Run the script with:

```
deno run --allow-net --allow-read scripts/migrate-comundo.js
```

## Image Considerations

For the best visual experience:

- Desktop images should be high quality and showcase the project well
- Mobile images should be clear and properly sized for mobile viewing
- Full page smartphone images work best with portrait-oriented screenshots
- Desktop collage images should be wide and showcase multiple aspects of the
  project
- Workplace images should be high quality and relevant to the project context

## Text Sections

The template includes dedicated sections for different types of content:

- **Intro Text**: General overview of the project
- **Challenge Text**: Description of the problem the project addressed
- **Solution Text**: Explanation of how Creative Oak solved the problem
- **Result Text**: Outcomes and benefits of the project

## Conditional Rendering

The template intelligently handles missing fields:

- Sections only appear if the corresponding content is provided
- Default images are used when specific images are missing
- The layout adapts to available content
