"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  Calendar,
  Bookmark,
  ChefHat,
  BookOpen,
  Sparkles,
  Flame,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import FridgeRecipeMatcherModal from "@/src/components/Recipe/FridgeRecipeMatcherModal";

const LeftSidebar = () => {
  const pathname = usePathname();
  const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);

  const navItems = [
    { label: "Home Feed", icon: Home, href: "/home" },
    { label: "All Recipes", icon: UtensilsCrossed, href: "/recipes" },
    { label: "7-Day Meal Planner", icon: Calendar, href: "/meal-planner" },
    { label: "Saved Cookbook", icon: Bookmark, href: "/saved" },
    { label: "Top Community Chefs", icon: ChefHat, href: "/community/chefs" },
    { label: "Culinary Blog", icon: BookOpen, href: "/blog" },
  ];

  const trendingTags = [
    "#30MinDinner",
    "#HealthyBites",
    "#AirFryerMagic",
    "#KetoDelight",
    "#VeganFeast",
    "#BengaliFlavors",
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-20 h-[calc(100vh-100px)] overflow-y-auto space-y-4 pr-1 scrollbar-thin">
      {/* Quick Navigation Menu */}
      <Card className="rounded-2xl border shadow-xs bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-slate-800">
          <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Navigation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-orange-500"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      {/* AI & Creation Quick Action Buttons */}
      <Card className="rounded-2xl border shadow-xs bg-gradient-to-br from-orange-500 to-amber-600 text-white p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-200" />
          <h3 className="font-extrabold text-sm">Smart AI Kitchen</h3>
        </div>
        <p className="text-xs text-orange-100 leading-relaxed">
          Match ingredients in your fridge with instant AI recipes &amp; substitution tips.
        </p>

        <Button
          onClick={() => setIsFridgeModalOpen(true)}
          className="w-full rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5" /> What&apos;s in Your Fridge?
        </Button>

        <Link href="/recipes/create" className="block">
          <Button
            variant="outline"
            className="w-full rounded-xl border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Post New Recipe
          </Button>
        </Link>
      </Card>

      {/* My Cooking Stats Widget */}
      <Card className="rounded-2xl border shadow-xs bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-slate-800">
          <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>My Kitchen Stats</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Cooking Streak</span>
            <span className="font-extrabold text-orange-500 flex items-center gap-1">
              🔥 5 Days
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-gray-700 dark:text-gray-300">
              <span>Daily Calorie Goal</span>
              <span>1,850 / 2,200 kcal</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[84%]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 dark:border-slate-800">
            <span className="text-gray-500 dark:text-gray-400">Weekly Meal Plan</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">14 Recipes</span>
          </div>
        </CardContent>
      </Card>

      {/* Trending Food Tags */}
      <Card className="rounded-2xl border shadow-xs bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-slate-800">
          <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-orange-500" /> Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex flex-wrap gap-1.5">
          {trendingTags.map((tag) => (
            <Link key={tag} href={`/recipes?search=${encodeURIComponent(tag.replace('#', ''))}`}>
              <span className="text-[11px] font-medium px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-slate-700 transition cursor-pointer">
                {tag}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Fridge Matcher Modal Trigger */}
      <FridgeRecipeMatcherModal
        isOpen={isFridgeModalOpen}
        onClose={() => setIsFridgeModalOpen(false)}
      />
    </aside>
  );
};

export default LeftSidebar;
