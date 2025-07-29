"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { rejectedFiles } from "@/helpers/rejected-file-error";
import {
  FileEmptyState,
  FileErrorState,
  ProgressFileState,
  UploadedFileState,
} from "./file-state";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { S3Api } from "@/lib/axios-instance";
import axios from "axios";
import { constructUrl } from "@/helpers/construct-url";

function Uploader({ value, onChange }: FileUploaderProps) {
  const fileUrl = value ? constructUrl(value) : "";

  const [fileState, setFileState] = useState<UploaderProps>({
    id: null,
    file: null,
    error: false,
    isDeleting: false,
    progress: 0,
    uploading: false,
    fileType: "image",
    key: value,
    objectUrl: fileUrl,
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      // Step 1: Request a presigned URL from your backend
      const presignedResponse = await S3Api.post("/upload", {
        contentType: file.type,
        fileName: file.name,
        size: file.size,
        isImage: true,
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

      // Step 2: Upload directly to S3
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && progressEvent.lengthComputable) {
            const percentage =
              (progressEvent.loaded / progressEvent.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentage),
            }));
          }
        },
      });

      // After successful upload
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 100,
        key: fileKey,
      }));

      toast.success("File uploaded successfully");
      onChange?.(fileKey);
    } catch {
      toast.error("An error occurred during file upload");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  }

  async function handleDeleteFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;
    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));
      const response = await S3Api.delete("/delete", {
        params: { file_key: fileState.key },
      });

      if (response.status !== 200) {
        toast.error("Failed to delete file from storage");
        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
      onChange?.("");

      setFileState({
        id: null,
        file: null,
        error: false,
        isDeleting: false,
        progress: 0,
        uploading: false,
        fileType: "image",
      });

      toast.success("File deleted successfully");
    } catch {
      toast.error("An error occurred while deleting the file");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  function renderFileState() {
    if (fileState.uploading) {
      return (
        <ProgressFileState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }
    if (fileState.error) {
      return <FileErrorState />;
    }
    if (fileState.objectUrl) {
      return (
        <UploadedFileState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleDeleteFile}
        />
      );
    }
    return <FileEmptyState isDragActive={false} />;
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        //clean up previous object URL if it exists to prevent memory leaks
        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          progress: 0,
          uploading: false,
          error: false,
          isDeleting: false,
          fileType: "image",
          file,
          id: nanoid(),
          objectUrl: URL.createObjectURL(file),
        });

        uploadFile(file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileState.objectUrl]
  );

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //5mb
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out min-h-[250px] w-full ",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-input hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <Input placeholder="Thumbnail url" {...getInputProps()} />
        {renderFileState()}
      </CardContent>
    </Card>
  );
}

export default Uploader;
