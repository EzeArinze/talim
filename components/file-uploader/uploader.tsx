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

  function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      console.log("Uploading file:", file.name);
    } catch (error) {
      toast.error("File upload failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
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
