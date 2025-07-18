import { z } from "zod";

// Assuming these are your enums
// const courseLevel = z.enum(["beginner", "intermediate", "advanced"], {
//   message: "Please select a valid course level.",
// });

export const courseLevel = ["beginner", "intermediate", "advanced"] as const;

// const courseStatus = z.enum(["draft", "published", "archived"], {
//   message: "Please select a valid course status.",
// });

export const courseStatus = ["draft", "published", "archived"] as const;

export const courseCategories = [
  "health & fitness",
  "developer",
  "designer",
  "business",
  "finance",
  "IT & software",
  "office productivity",
  "personal development",
  "marketing",
  "music",
  "teaching & academics",
] as const;

export const courseFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Course name must be at least 2 characters long." })
    .max(100, { message: "Course name must not exceed 100 characters." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." }),
  small_description: z
    .string()
    .min(3, {
      message: "Short description must be at least 3 characters long.",
    })
    .max(200, { message: "Short description must not exceed 200 characters." }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour." })
    .max(500, { message: "Duration must not exceed 500 hours." }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number and at least 1." }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  file_key: z.string().min(1, { message: "File key is required." }),
  category: z.enum(courseCategories, { message: "Please select a category." }),
  level: z.enum(courseLevel, {
    message: "Please select a valid course level.",
  }),
  status: z.enum(courseStatus, {
    message: "Please select a valid course status.",
  }),
});

export type courseZodType = z.infer<typeof courseFormSchema>;

export type courseStatusType = typeof courseStatus;
export type courseLevelType = typeof courseLevel;
export type courseCategories = typeof courseCategories;
