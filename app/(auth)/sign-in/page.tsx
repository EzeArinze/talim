import React from "react";
import SignIn from "../_components/SignIn";
import { getServerSession } from "@/hooks/useServerSession";
import { redirect } from "next/navigation";

async function SignInPage() {
  const { isAuthenticated } = await getServerSession();

  if (isAuthenticated) {
    redirect("/");
  }

  return <SignIn />;
}

export default SignInPage;
