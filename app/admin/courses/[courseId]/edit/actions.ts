"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { db } from "@/db/db";
import { courseTable } from "@/db/schema";
import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";
import { and, eq } from "drizzle-orm";

export async function editCourse(
  values: courseZodType,
  courseId: string
): Promise<ActionResponse> {
  const session = await requireAdmin();
  try {
    const validation = courseFormSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message:
          (validation.error.flatten().fieldErrors as string) ||
          "Invalid Form Data",
      };
    }

    await db
      .update(courseTable)
      .set({
        ...validation.data,
      })
      .where(
        and(
          eq(courseTable.id, courseId),
          eq(courseTable.userId, session.user.id)
        )
      );

    return {
      status: "success",
      message: "Course Updated Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred while creating the course.",
    };
  }
}
