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
  lessonSchema,
  lessonZodType,
} from "@/utils/zod-shcemas/create-chapter-and-lesson-schema";

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

export async function createLesson(
  values: lessonZodType
): Promise<ActionResponse> {
  await requireAdmin();

  try {
    const result = lessonSchema.safeParse(values);

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

      await tx.insert(lessonsTable).values({
        title: result.data.name,
        chapterId: result.data.chapterId,
        description: result.data.description,
        thumbnail_key: result.data.thumbnail_key,
        video_key: result.data.video_key,
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
      message: "Lesson created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create lesson",
    };
  }
}

export async function deleteLesson({
  lessonId,
  courseId,
  chapterId,
}: {
  lessonId: string;
  courseId: string;
  chapterId: string;
}): Promise<ActionResponse> {
  await requireAdmin();
  try {
    const chapterWithLessons = await db.query.chaptersTable.findFirst({
      where: eq(chaptersTable.id, chapterId),
      columns: {},
      with: {
        lessons: {
          columns: {
            id: true,
            position: true,
          },
          orderBy: (lessons, { asc }) => [asc(lessons.position)],
        },
      },
    });

    if (!chapterWithLessons) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }

    const lessons = chapterWithLessons.lessons;
    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }

    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);

    await db.transaction(async (tx) => {
      await Promise.all(
        remainingLessons.map((lesson, index) =>
          tx
            .update(lessonsTable)
            .set({ position: index + 1 })
            .where(eq(lessonsTable.id, lesson.id))
        )
      );
      await tx
        .delete(lessonsTable)
        .where(
          and(
            eq(lessonsTable.id, lessonId),
            eq(lessonsTable.chapterId, chapterId)
          )
        );
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Lesson deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
}

export async function deleteChapter({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}): Promise<ActionResponse> {
  await requireAdmin();
  try {
    const courseWithChapters = await db.query.courseTable.findFirst({
      where: eq(chaptersTable.id, chapterId),
      columns: {},
      with: {
        chapters: {
          columns: {
            id: true,
            position: true,
          },
          orderBy: (chapters, { asc }) => [asc(chapters.position)],
        },
      },
    });

    if (!courseWithChapters) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    const chapters = courseWithChapters.chapters;
    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );

    if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found in the course",
      };
    }

    const remainingChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );

    await db.transaction(async (tx) => {
      await Promise.all(
        remainingChapters.map((chapter, index) =>
          tx
            .update(chaptersTable)
            .set({ position: index + 1 })
            .where(eq(chaptersTable.id, chapter.id))
        )
      );
      await tx.delete(chaptersTable).where(eq(chaptersTable.id, chapterId));
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete chapter",
    };
  }
}
