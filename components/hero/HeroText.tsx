import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

function HeroText() {
  return (
    <>
      {" "}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight flex items-center gap-1">
        Welcome to Talim{" "}
        <span className="inline-block size-3 bg-primary rounded-full align-middle shadow-md" />
      </h1>
      <div>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Your academic companion for trustworthy learning. Discover a world of
          knowledge with Talim, where every resource is curated for accuracy and
          reliability.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link href={"#"} className={buttonVariants({ variant: "default" })}>
          Explore Courses
        </Link>
        <Link href={"#"} className={buttonVariants({ variant: "outline" })}>
          Sign in
        </Link>
      </div>
    </>
  );
}

export default HeroText;
