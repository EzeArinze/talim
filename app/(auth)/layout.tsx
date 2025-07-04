import type { Metadata } from "next";
import { ReactNode } from "react";
// import "../globals.css";

export const metadata: Metadata = {
  title: "Talim",
  description: "Sign-in",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-[90dvh] justify-center">
      <div className="text-center font-bold text-md md:text-lg lg:text-xl">
        Welcome Back
      </div>
      <div className="text-center text-muted-foreground mb-4">
        Please sign in to continue
      </div>
      <div>{children}</div>
    </div>
  );
}
