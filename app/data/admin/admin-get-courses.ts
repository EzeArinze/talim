import { db } from "@/db/db";
import { requireAdmin } from "./require-admin";

export async function AdminGetCourses() {
  await requireAdmin();

  const courses = await db.query.courseTable.findMany({
    orderBy: (courses, { desc }) => [desc(courses.created_at)],
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
    },
  });

  return courses;
}

export type AdminCourseType = Awaited<ReturnType<typeof AdminGetCourses>>[0];
