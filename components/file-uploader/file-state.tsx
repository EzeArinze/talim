import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function FileEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex mx-auto items-center justify-center rounded-full bg-muted size-12 mb-6">
        <CloudUploadIcon
          className={cn(
            "",
            isDragActive ? "size-6 text-primary" : "text-muted-foreground "
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop Your Files Here or{" "}
        <span className="font-bold cursor-pointer text-primary">
          Click to Select
        </span>
      </p>
      <Button type="button" className="mt-4">
        Select File
      </Button>
    </div>
  );
}

export function FileErrorState() {
  return (
    <div className="text-center">
      <div className="flex mx-auto items-center justify-center rounded-full bg-destructive/30 size-12 mb-6">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Faild</p>
      <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
      <Button type="button" className="mt-3">
        Retry File Upload
      </Button>
    </div>
  );
}

export function UploadedFileState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting?: boolean;
  handleRemoveFile?: () => void;
}) {
  return (
    <div className="">
      <Image
        src={previewUrl}
        alt="Uploaded file image"
        fill
        className="object-contain p-2"
      />
      <Button
        type="button"
        variant={"destructive"}
        size={"icon"}
        className={cn("absolute top-4 right-4")}
        disabled={isDeleting}
        onClick={handleRemoveFile}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin " />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function ProgressFileState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex items-center justify-center flex-col">
      {progress}%
      <p className="mt-2 text-sm font-medium text-foreground">uploading...</p>
      <p className="mt-1 text-sm text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
