import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import React from "react";

type Params = Promise<{ courseId: string }>;

async function EditRoute({ params }: { params: Params }) {
  const { courseId: id } = await params;

  const course = await adminGetCourse(id);

  return <div>EditRoute for {course.id}</div>;
}

export default EditRoute;
