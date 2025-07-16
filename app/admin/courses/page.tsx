import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create Courses
        </Link>
      </div>

      <div>
        <h2>Here you will see all your courses</h2>
      </div>
    </>
  );
}

export default CoursesPage;
