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
      <div>{children}</div>
    </div>
  );
}
