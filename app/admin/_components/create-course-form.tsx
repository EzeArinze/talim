"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  courseFormSchema,
  courseZodType,
} from "@/utils/zod-shcemas/create-course-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SparkleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CreateCourseForm() {
  const form = useForm<courseZodType>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      small_description: "",
      category: "",
      duration: 0,
      price: 0,
      file_key: "",
      level: "beginner",
      status: "draft",
      slug: "",
    },
  });

  function onSubmit(values: courseZodType) {
    console.log(values);
  }

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Provide basic information about the course
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                    <Textarea
                      placeholder="Description"
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
              name="file_key"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Thumbnail image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Thumbnail url"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
