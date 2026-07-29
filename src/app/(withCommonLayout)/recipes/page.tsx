"use client";

import React from "react";
import RecipeFeed from "../home/components/RecipeFeed";
import { Sparkles } from "lucide-react";

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-6xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-200" />
            Culinary Collection
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Explore All Recipes</h1>
          <p className="text-sm text-orange-100 max-w-2xl">
            Discover thousands of hand-crafted recipes shared by food lovers, home chefs, and culinary professionals around the world.
          </p>
        </div>
      </div>

      {/* Main Interactive Recipe Feed */}
      <RecipeFeed />
    </div>
  );
}
