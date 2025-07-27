import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { constructUrl } from "@/helpers/construct-url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AdminCourseCard({ course }: { course: AdminCourseType }) {
  const imageUrl = constructUrl(course.file_key);
  return (
    <Card className=" group relative p-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"secondary"} className="rounded-lg">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Pencil className="size-5 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}`}>
                <Eye className="size-5 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-primary/10" />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/delete`}>
                <Trash2 className="size-5 mr-2 text-destructive" />
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={imageUrl}
        alt="Thumbnail Url"
        width={600}
        height={400}
        priority
        className="w-full h-full object-cover rounded-t-lg aspect-video"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${course.id}`}
          className="font-medium text-lg hover:underline group-hover:text-primary transition-colors line-clamp-2"
        >
          {course.name}
        </Link>

        <p className="mt-2 leading-tight line-clamp-2 text-sm text-muted-foreground">
          {course.small_description}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-1">
            <TimerIcon className="size-6 text-primary bg-primary/10 rounded-md p-1" />
            <span className="text-sm text-muted-foreground">
              {course.duration}h
            </span>
          </div>

          <div className="flex items-center gap-x-1">
            <School className="size-6 text-primary bg-primary/10 rounded-md p-1" />
            <span className="text-sm text-muted-foreground">
              {course.level}
            </span>
          </div>
        </div>

        <Link
          href={`/admin/courses/${course.id}/edit`}
          className={buttonVariants({
            className:
              "w-full mt-4 inline-flex items-center gap-x-2 text-sm font-medium text-primary rounded-md",
            variant: "outline",
          })}
        >
          Edit Course{" "}
          <Edit className="size-6 text-primary bg-primary/10 rounded-md p-1" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default AdminCourseCard;
