import type { Metadata } from "next";

import Footer from "@/components/hero/Footer";
import { NavBar } from "./_components/NavBar";

export const metadata: Metadata = {
  title: "Talim| public",
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
