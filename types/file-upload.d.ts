interface UploaderProps {
  id: string | null;
  file: File | null;
  uploading?: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface FileUploaderProps {
  value?: string;
  onChange?: (value: string) => void;
}
