import Link from "next/link";
import React from "react";
import Logo from "../custom/Logo";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Licensing", href: "#" },
  { label: "Contact", href: "#" },
];

function Footer() {
  return (
    <footer className="m-4 max-w-[90%] mx-auto border border-b border-border rounded-xl shadow-md p-2">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-primary sm:mb-0">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="mr-4 hover:underline md:mr-6 text-primary-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-muted-foreground lg:my-8" />
        <span className="block text-sm text-muted-foreground text-center ">
          {new Date().getFullYear()}{" "}
          <Link href="#" className="hover:underline">
            Talim™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
