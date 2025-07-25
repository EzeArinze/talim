import z from "zod";

export const S3fileUploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  contentType: z.string().min(1, "Content type is required"),
  size: z.number().min(1, "File is required and size must be greater than 0"),
  isImage: z.boolean(),
});
