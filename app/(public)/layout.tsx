import type { Metadata } from "next";

import { NavBar } from "./_components/nav-bar";
import Footer from "@/components/hero/footer";

export const metadata: Metadata = {
  title: "Talim",
  description: "Academic, trustworthy place to learn.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main className="max-w-[90%] mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
