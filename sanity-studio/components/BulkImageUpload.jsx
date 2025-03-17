// components/BulkImageUpload.jsx
import React, { useCallback, useState } from "react";
import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { useClient } from "sanity";
import { useFormValue } from "sanity";

// Define the component
export default function BulkImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [error, setError] = useState(null);

  const client = useClient({ apiVersion: "2023-05-01" });
  const sanityDocument = useFormValue([]);

  const handleFileSelect = useCallback(async (event) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    setTotalFiles(fileList.length);
    setProgress(0);
    setError(null);

    const uploadedImages = [];

    try {
      // First, ensure the document exists
      if (!sanityDocument?._id) {
        throw new Error("Document not found. Please save the document first.");
      }

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        // Upload the file to Sanity
        const asset = await client.assets.upload("image", file);

        // Create the image object
        const imageObj = {
          _key: Math.random().toString(36).substring(2, 15),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
          caption: file.name,
          filename: file.name,
          selected: false,
        };

        uploadedImages.push(imageObj);
        setProgress(i + 1);
      }

      // Update the images field
      await client
        .patch(sanityDocument._id)
        .setIfMissing({ images: [] })
        .append("images", uploadedImages)
        .commit();

      console.log("Successfully uploaded images");
      setIsUploading(false);
      setProgress(0);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Failed to upload images");
      setIsUploading(false);
      setProgress(0);
    }
  }, [client, sanityDocument]);

  const handleDownloadSelected = useCallback(() => {
    if (!sanityDocument?.images) return;

    const selectedImages = sanityDocument.images.filter((img) => img.selected);
    if (selectedImages.length === 0) {
      setError("No images have been selected by the client");
      return;
    }

    // Create CSV content with just filenames
    const csvContent = [
      ["Filename"], // CSV header
      ...selectedImages.map((img) => [img.filename]),
    ].map((row) => row.join(",")).join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `selected_filenames_${sanityDocument.title || "gallery"}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [sanityDocument]);

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Text weight="semibold">Bulk Image Upload</Text>

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        {isUploading
          ? (
            <Flex direction="column" align="center" justify="center">
              <Text>Uploading {progress} of {totalFiles} images...</Text>
            </Flex>
          )
          : (
            <Flex direction="column" gap={3}>
              <Button
                text="Select Multiple Images"
                tone="primary"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.accept = "image/*";
                  input.onchange = handleFileSelect;
                  input.click();
                }}
              />
              <Button
                text="Download Selected Images List"
                tone="default"
                onClick={handleDownloadSelected}
              />
            </Flex>
          )}
      </Stack>
    </Card>
  );
}
