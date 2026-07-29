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
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const AuthButton = dynamic(() => import("@/src/components/ui/AuthButton"), {
    ssr: false,
  });

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex justify-center items-center border-2 border-orange-500 rounded-full w-9 h-9 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition">
              <UtensilsCrossed size={18} />
            </div>
            <span
              className={`${lobster.className} text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
            >
              PlateShare
            </span>
          </Link>
        </div>

        {/* Middle: Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <AuthButton />
          </div>

          {/* Mobile Navigation Drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl border-gray-300 dark:border-slate-700">
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="overflow-y-auto w-80 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-800">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle>
                    <Link href={"/"} className="flex items-center gap-2">
                      <div className="flex justify-center items-center border-2 border-orange-500 rounded-full w-9 h-9 text-orange-500">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <span className={`${lobster.className} text-xl font-bold text-gray-900 dark:text-white`}>
                        PlateShare
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 pt-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-3"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="pt-4 border-t">
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
