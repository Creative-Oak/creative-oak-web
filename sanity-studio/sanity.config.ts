// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/index.ts';
import { myStructure } from './deskStructure.ts';


const singletonTypes = new Set(['settings', 'homepage']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'Creative Oak',
  projectId: 'gt4m5sbb',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: myStructure,
    }),

    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Exclude singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Restrict actions for singleton types
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
