import { StructureResolver } from "sanity/structure";
import { CogIcon, DocumentIcon, FolderIcon, HomeIcon } from "@sanity/icons";

const pages = [
  {
    title: "Home Page",
    icon: HomeIcon,
    schemaType: "homepage-main",
    documentId: "homepage-main",
  },
  {
    title: "About Page",
    icon: DocumentIcon,
    schemaType: "about-page",
    documentId: "about-page",
  },
  // Add more pages as needed
];

export const myStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Global Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings"),
        ),
      S.listItem()
        .title("Pages") // Folder for pages
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Pages")
            .items(
              pages.map((page) =>
                S.listItem()
                  .title(page.title)
                  .icon(page.icon)
                  .child(
                    S.document()
                      .schemaType(page.schemaType)
                      .documentId(page.documentId),
                  )
              ),
            ),
        ),
      // Exclude singleton types (like 'settings' and any page document IDs)
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== undefined &&
          !["settings", "projectCategories", ...pages.map((page) => page.documentId)].includes(id);
      }),
    ]);
