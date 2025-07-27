"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { db } from "@/db/db";
import { courseTable } from "@/db/schema";
import { aj } from "@/lib/aj-rule";
import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";
import { request } from "@arcjet/next";

export async function createCourse(
  data: courseZodType
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
          message: "You have exceeded the rate limit for creating courses.",
        };
      } else {
        return {
          status: "error",
          message: "You are a bot, if mistaken contact support.",
        };
      }
    }

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
