"use client";

import Link from "next/link";
import { Home, Compass, Bookmark, Users, TrendingUp, Hash } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const LeftSidebar = () => {
  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Explore", icon: Compass, href: "/explore" },
    { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
    { label: "Chefs", icon: Users, href: "/chefs" },
  ];

  const trendingTags = [
    "#bengali",
    "#breakfast",
    "#vegan",
    "#quickMeals",
    "#lowCal",
  ];

  const communities = [
    { name: "Healthy Cooking", members: "12k" },
    { name: "Budget Meals", members: "8.1k" },
    { name: "Dessert Lovers", members: "25k" },
  ];

  return (
    <aside className="hidden md:block md:col-span-3 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto space-y-4 pr-2">
      {/* Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition"
            >
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp size={16} /> Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-accent rounded-md cursor-pointer hover:bg-muted"
            >
              {tag}
            </span>
          ))}
        </CardContent>
      </Card>

      {/* Communities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Hash size={16} /> Communities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {communities.map((c) => (
            <div
              key={c.name}
              className="flex justify-between items-center text-sm"
            >
              <span>{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.members}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default LeftSidebar;
