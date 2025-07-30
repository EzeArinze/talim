import { z } from "zod";

export const chapterSchema = z.object({
  name: z.string().min(3, { message: "Name requires at least 3 characters" }),
  courseId: z.string().nanoid({ message: "Invalid course id" }),
});

export type chapterZodType = z.infer<typeof chapterSchema>;
