import "server-only";

import { db } from "@/db/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetCourse(courseId: string) {
  await requireAdmin();

  const course = await db.query.courseTable.findFirst({
    where: (course, { eq }) => eq(course.id, courseId),
    columns: {
      id: true,
      name: true,
      small_description: true,
      slug: true,
      price: true,
      duration: true,
      file_key: true,
      level: true,
      status: true,
      category: true,
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
}

export type adminGetCourseType = Awaited<ReturnType<typeof adminGetCourse>>;
