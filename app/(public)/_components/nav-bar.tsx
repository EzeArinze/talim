"use client";

import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropDown from "./profile-drop-down";
import { useClientSession } from "@/hooks/use-session";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "Courses" },
  { href: "#", label: "Dashboard" },
];

export function NavBar() {
  const pathname = usePathname();
  const { initials, picture, name, email, session, isPending } =
    useClientSession();

  return (
    <section className="sticky top-1 z-50 flex h-16 items-center justify-between gap-4 max-w-[90%] mx-auto backdrop-blur-md border border-b border-border rounded-xl shadow-md p-2">
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="group size-8 md:hidden"
              variant="ghost"
              size="icon"
            >
              <svg
                className="pointer-events-none"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-36 p-1 md:hidden">
            <NavigationMenu className="max-w-none *:w-full">
              <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="w-full">
                    <NavigationMenuLink
                      href={link.href}
                      className={`${
                        pathname === link.href
                          ? "focus:bg-accent hover:bg-accent bg-accent/50 text-accent-foreground"
                          : ""
                      }  py-1.5`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
        </Popover>
        {/* Main nav */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          {/* Navigation menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    href={link.href}
                    className={`${
                      pathname === link.href
                        ? "focus:bg-accent hover:bg-accent bg-accent/50 text-accent-foreground"
                        : ""
                    } text-muted-foreground hover:text-primary py-1.5 font-medium text-sm p-1`}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        {isPending ? (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
          </div>
        ) : !session ? (
          <Button variant="link" size="sm" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        ) : (
          <ProfileDropDown
            initials={initials}
            name={name}
            email={email}
            picture={picture}
          />
        )}
      </div>
    </section>
  );
}
