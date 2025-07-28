"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { db } from "@/db/db";
import { courseTable } from "@/db/schema";
import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";
import { and, eq } from "drizzle-orm";
import { request } from "@arcjet/next";
import { aj } from "@/lib/aj-rule";

export async function editCourse(
  values: courseZodType,
  courseId: string
): Promise<ActionResponse> {
  const session = await requireAdmin();
  try {
    const req = await request();

    const decison = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decison.isDenied()) {
      if (decison.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have exceeded the rate limit for updating courses.",
        };
      } else {
        return {
          status: "error",
          message: "You are a bot, if mistaken contact support.",
        };
      }
    }

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
