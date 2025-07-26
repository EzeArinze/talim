"use server";

import { db } from "@/db/db";
import { courseTable } from "@/db/schema";
import { getServerSession } from "@/hooks/use-server-session";
import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";

export async function createCourse(
  data: courseZodType
): Promise<ActionResponse> {
  try {
    const { session } = await getServerSession();

    const validation = courseFormSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message:
          (validation.error.flatten().fieldErrors as string) ||
          "Invalid Form Data",
      };
    }

    await db.insert(courseTable).values({
      ...validation.data,
      userId: session?.user.id as string,
    });

    return {
      status: "success",
      message: "Course Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred while creating the course.",
    };
  }
}
