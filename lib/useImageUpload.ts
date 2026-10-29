"use client";

import { useState } from "react";
import { postPublicApi } from "./public-api";

type PresignResponse = {
  urls: string[];
  fileKey: string;
};

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (files: File[]) => {
    setUploading(true);
    try {
      const fileKeys: string[] = [];
      for (const file of files) {
        const presigned = await postPublicApi<PresignResponse>("/upload", {
          fileName: file.name,
          contentType: file.type,
          sizeBytes: file.size
        });
        const uploadUrl = presigned.urls[0];
        if (!uploadUrl || !presigned.fileKey) {
          throw new Error("Upload service returned an invalid upload link.");
        }
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file
        });
        if (!response.ok) {
          throw new Error(`Image upload failed (${response.status}).`);
        }
        fileKeys.push(presigned.fileKey);
      }
      return fileKeys;
    } catch (error) {
      if (error instanceof Error && /unauthorized|admin credentials/i.test(error.message)) {
        throw new Error("Photo uploads aren't currently available.");
      }
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
