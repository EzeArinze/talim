"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { rejectedFiles } from "@/helpers/rejected-file-error";
import { FileEmptyState } from "./file-empty-state";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { S3Api } from "@/lib/axios-instance";
import { AxiosError } from "axios";
import axios from "axios";

function Uploader() {
  const [fileState, setFileState] = useState<UploaderProps>({
    id: null,
    file: null,
    error: false,
    isDeleting: false,
    progress: 0,
    uploading: false,
    fileType: "image",
  });

  async function uploadFile(file: File) {
    try {
      // Step 1: Request a presigned URL from your backend
      const presignedResponse = await S3Api.post("/upload", {
        contentType: file.type,
        fileName: file.name,
        size: file.size,
        isImage: file.type.startsWith("image/") || true,
      });

      if (presignedResponse.status !== 200) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }

      const { presignedUrl, fileKey } = presignedResponse.data;

      toast.success("Presigned URL received, starting upload...");

      // Step 2: Upload file directly to the presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (event) => {
          if (!event.lengthComputable) return;
          const percentCompleted = event.total
            ? Math.round((event.loaded * 100) / event.total)
            : 0;

          setFileState((prev) => ({
            ...prev,
            progress: percentCompleted,
          }));
        },
      });

      // Success
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 100,
        key: fileKey,
      }));
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during file upload");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileState({
          ...fileState,
          file,
          id: nanoid(),
          objectUrl: URL.createObjectURL(file),
        });
      }
    },
    [fileState]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //5mb
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full ",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-input hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <Input placeholder="Thumbnail url" {...getInputProps()} />
        <FileEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
}

export default Uploader;
