"use client";
import { Button } from "@/src/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

import { Lobster } from "next/font/google";
import { UtensilsCrossed, Menu } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { menu } from "./menu";
import { NavigationMenu, NavigationMenuList } from "../../ui/navigation-menu";
import { renderMenuItem, renderMobileMenuItem } from "./renderItem";
import { Accordion } from "../../ui/accordion";
import ThemeToggle from "../ThemeToggle";

const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});

const Navbar = () => {
  const AuthButton = dynamic(() => import("@/src/components/ui/AuthButton"), {
    ssr: false,
  });

  return (
    <section className="">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="bg-white border-b hidden md:block">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-12 items-center gap-4">
            {/* Left (3 columns) */}
            <div className="col-span-6 sm:col-span-3 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex justify-center items-center border-2 border-black rounded-full w-8 h-8">
                  <UtensilsCrossed size={16} />
                </div>
                <span
                  className={`${lobster.className} text-xl font-semibold tracking-tight`}
                >
                  PlateShare
                </span>
              </Link>
            </div>

            {/* Middle (6 columns) */}
            <div className="hidden sm:flex col-span-6 justify-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right (3 columns) */}
            <div className="col-span-6 sm:col-span-3 flex items-center justify-end gap-2">
              <ThemeToggle />
              <AuthButton />
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="bg-white dark:bg-slate-900 border px-2 block lg:hidden">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <Link href={"/"} className="flex items-center gap-2">
              <div className="flex justify-center items-center border-2 border-black dark:border-white rounded-full w-10 h-10">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={"/"} className="flex items-center gap-2">
                        <div className="flex justify-center items-center border-2 border-black dark:border-white rounded-full w-10 h-10">
                          <UtensilsCrossed className="w-5 h-5" />
                        </div>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <AuthButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
