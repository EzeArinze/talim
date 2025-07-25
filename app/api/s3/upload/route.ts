import { S3 } from "@/lib/S3-client";
import { env } from "@/types/env";
import { S3fileUploadSchema } from "@/utils/zod-shcemas/file-s3-upload-schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = request.json();

    const validation = S3fileUploadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.errors[0].message || "Invalid request body",
        },
        { status: 400 }
      );
    }

    const { contentType, fileName, size } = validation.data;

    const fileKey = `${nanoid(10)}-${fileName}`;

    // Create a new S3 PutObjectCommand
    // This command will be used to upload the file to S3
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: fileKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // URL valid for 6 minutes
    });

    const response = {
      presignedUrl,
      fileKey,
      message: "File upload URL generated successfully",
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to generate presigned URL",
      },
      { status: 500 }
    );
  }
}
