"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { db } from "@/db/db";
import { chaptersTable, courseTable, lessonsTable } from "@/db/schema";
import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";
import { and, eq, sql } from "drizzle-orm";
import { request } from "@arcjet/next";
import { aj } from "@/lib/aj-rule";
import { revalidatePath } from "next/cache";
import {
  chapterSchema,
  chapterZodType,
} from "@/utils/zod-shcemas/create-chapter-schema";

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

export async function reorderLesson(
  lessons: { id: string; position: number }[],
  courseId: string,
  chapterId: string
): Promise<ActionResponse> {
  await requireAdmin();

  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "no lesson provided for reordering",
      };
    }

    await db.transaction(async (tx) => {
      await Promise.all(
        lessons.map((lesson) =>
          tx
            .update(lessonsTable)
            .set({ position: lesson.position })
            .where(
              and(
                eq(lessonsTable.id, lesson.id),
                eq(lessonsTable.chapterId, chapterId)
              )
            )
        )
      );
    });
    //in case of transaction issues

    //  for (const lesson of lessons) {
    //   await db
    //     .update(lessonsTable)
    //     .set({ position: lesson.position })
    //     .where(
    //       and(
    //         eq(lessonsTable.id, lesson.id),
    //         eq(lessonsTable.chapterId, chapterId)
    //       )
    //     );
    // }
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lesson Re-ordered Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unexpected error occurred while reordering lessons.",
    };
  }
}

export async function reorderChapter(
  chapters: { id: string; position: number }[],
  courseId: string
): Promise<ActionResponse> {
  await requireAdmin();

  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No chapter provided for reordering",
      };
    }

    await db.transaction(async (tx) => {
      await Promise.all(
        chapters.map((chapter) =>
          tx
            .update(chaptersTable)
            .set({ position: chapter.position })
            .where(
              and(
                eq(chaptersTable.id, chapter.id),
                eq(chaptersTable.courseId, courseId)
              )
            )
        )
      );
    });

    //in case of transaction issues

    //  for (const chapter of chapters) {
    //   await db
    //     .update(chaptersTable)
    //     .set({ position: chapter.position })
    //     .where(
    //       and(
    //         eq(chaptersTable.id, chapter.id),
    //         eq(chaptersTable.courseId, courseId)
    //       )
    //     );
    // }

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapter re-ordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder chapter",
    };
  }
}

export async function createChapter(
  values: chapterZodType
): Promise<ActionResponse> {
  await requireAdmin();

  try {
    const result = chapterSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid form values/data",
      };
    }

    await db.transaction(async (tx) => {
      // const maxPositionRow = await tx.query.chaptersTable.findFirst({
      //   where: eq(chaptersTable.courseId, result.data.courseId),
      //   orderBy: (chapter, { desc }) => [desc(chapter.position)],
      //   columns: { position: true },
      // });

      // const nextPosition = (maxPositionRow?.position ?? 0) + 1;

      await tx.insert(chaptersTable).values({
        title: result.data.name,
        courseId: result.data.courseId,
        position: sql`
         COALESCE(
            (SELECT MAX(position) FROM ${chaptersTable}
            WHERE ${chaptersTable.courseId} = ${result.data.courseId}),
            0
              ) + 1
              `,
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
}
