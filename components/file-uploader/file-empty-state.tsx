import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

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

export function FileErrorState({}) {
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
