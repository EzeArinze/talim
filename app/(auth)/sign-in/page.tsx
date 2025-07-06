import React from "react";
import SignIn from "../_components/SignIn";
import { getServerSession } from "@/hooks/useServerSession";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

async function SignInPage() {
  const { isAuthenticated } = await getServerSession();

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <>
      <div className="absolute left-0 top-4 m-4">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <ArrowLeft /> Back
        </Link>
      </div>

      <div className="text-center font-bold text-md md:text-lg lg:text-xl mt-16">
        Welcome Back
      </div>
      <div className="text-center text-muted-foreground mb-4">
        Please sign in to continue
      </div>
      <SignIn />
    </>
  );
}

export default SignInPage;
