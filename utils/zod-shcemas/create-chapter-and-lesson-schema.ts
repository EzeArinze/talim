import { z } from "zod";

export const chapterSchema = z.object({
  name: z.string().min(3, { message: "Name requires at least 3 characters" }),
  courseId: z.string().nanoid({ message: "Invalid course id" }),
});

export const lessonSchema = z.object({
  name: z.string().min(3, { message: "Name requires at least 3 characters" }),
  courseId: z.string().nanoid({ message: "Invalid course id" }),
  chapterId: z.string().nanoid({ message: "Invalid chapter id" }),
  description: z
    .string()
    .min(3, { message: "Description requires at least 3 characters" })
    .optional(),
  thumbnail_key: z.string().optional(),
  video_key: z.string().optional(),
});

export type chapterZodType = z.infer<typeof chapterSchema>;
export type lessonZodType = z.infer<typeof lessonSchema>;
