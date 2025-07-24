import { FileRejection } from "react-dropzone";
import { toast } from "sonner";

export function rejectedFiles(fileRejection: FileRejection[]) {
  if (fileRejection.length) {
    const tooManyFiles = fileRejection[0].errors[0].code === "too-many-files";
    const inValidFile = fileRejection[0].errors[0].code === "file-invalid-type";
    const fileTooLarge = fileRejection[0].errors[0].code === "file-too-large";

    if (tooManyFiles) toast.error("Too many files selected, max is 1");
    else if (inValidFile)
      toast.error("Invalid file type, only images are allowed");
    else if (fileTooLarge)
      toast.error("File size is too large, maximum size is 5MB");
    else
      toast.error(`File upload failed: ${fileRejection[0].errors[0].message}`);
  }
}
