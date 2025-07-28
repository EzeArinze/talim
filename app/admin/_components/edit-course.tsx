"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  courseCategories,
  courseFormSchema,
  courseLevel,
  courseStatus,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "../../../components/custom/select-field";
import Editor from "@/components/rich-text-editor/Editor";
import Uploader from "@/components/file-uploader/uploader";
import { useTransition } from "react";
import { adminGetCourseType } from "@/app/data/admin/admin-get-course";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editCourse } from "../courses/[courseId]/edit/actions";

type iAppProps = {
  course: adminGetCourseType;
};

export function EditCourse({ course }: iAppProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<courseZodType>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
      small_description: course.small_description,
      category: course.category as courseZodType["category"],
      duration: course.duration,
      price: course.price,
      file_key: course.file_key,
      level: course.level,
      status: course.status,
      slug: course.slug,
    },
  });

  function handleGenerateSlug() {
    const slugValue = form.getValues("name") || "";
    if (!slugValue) return;
    const slug = slugValue
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // replace spaces with -

    form.setValue("slug", slug, { shouldValidate: true });
  }

  function onSubmit(values: courseZodType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, course.id)
      );
      if (error) {
        toast.error(
          error.message || "An error occurred while creating the course."
        );
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
        return;
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="w-fit"
              onClick={() => handleGenerateSlug()}
            >
              Generate Slug <SparkleIcon className="ml-1" size={16} />
            </Button>
          </div>

          <FormField
            control={form.control}
            name="small_description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Small Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Small_description"
                    {...field}
                    className="min-h-[110px]"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file_key"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Thumbnail image</FormLabel>
                <FormControl>
                  <Uploader value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              control={form.control}
              name="category"
              label="Categories"
              placeholder="Select Category"
              options={courseCategories}
            />

            <SelectField
              control={form.control}
              name="level"
              label="Level"
              placeholder="Select Level"
              options={courseLevel}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Duration (hours)</FormLabel>
                  <FormControl>
                    <Input placeholder="Duration" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SelectField
            control={form.control}
            name="status"
            label="Status"
            placeholder="Select Status"
            options={courseStatus}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                Updating...
                <Loader2 className="size-4 animate-spin ml-1" />
              </>
            ) : (
              <>
                Update Course <PlusIcon size={16} />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
