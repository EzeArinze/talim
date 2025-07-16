import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CreateCourseForm } from "../../_components/create-course-form";

function CreateCoursePage() {
  return (
    <>
      <div className="flex items-center gap-6">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>

        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>

      <CreateCourseForm />
    </>
  );
}

export default CreateCoursePage;
