import { getServerSession } from "@/hooks/use-server-session";
import { aj } from "@/lib/aj-rule";
import { S3 } from "@/lib/S3-client";
import { env } from "@/types/env";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { session } = await getServerSession();

  try {
    const decison = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decison.isDenied()) {
      return NextResponse.json(
        { error: "Request blocked by security rules" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("file_key");

    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is required or invalid file object" },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: fileKey,
    });

    await S3.send(command);

    return NextResponse.json("File deleted successfully", { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Server Failed to delete file" },
      { status: 500 }
    );
  }
}
