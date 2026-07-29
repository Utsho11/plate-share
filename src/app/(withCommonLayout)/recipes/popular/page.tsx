"use client";

import React from "react";
import { Flame, Trophy } from "lucide-react";
import RecipeFeed from "../../home/components/RecipeFeed";

export default function PopularRecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-6xl">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-200" />
            Trending This Week
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Most Popular Recipes</h1>
          <p className="text-sm text-orange-100 max-w-xl">
            Check out the highest-voted, most saved, and top-rated dishes in the PlateShare community.
          </p>
        </div>
        <div className="hidden sm:flex p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 items-center gap-3">
          <Trophy className="w-10 h-10 text-amber-300" />
        </div>
      </div>

      <RecipeFeed />
    </div>
  );
}
