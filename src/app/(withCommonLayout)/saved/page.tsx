"use client";

import React from "react";
import { Bookmark, Heart } from "lucide-react";
import RecipeFeed from "../home/components/RecipeFeed";

export default function SavedRecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-6xl">
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-pink-200" />
            Personal Cookbook
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Saved &amp; Favorite Recipes</h1>
          <p className="text-sm text-pink-100 max-w-xl">
            Your private collection of bookmarked dishes, quick weeknight ideas, and saved culinary favorites.
          </p>
        </div>
        <div className="hidden sm:flex p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 items-center gap-3">
          <Heart className="w-10 h-10 text-pink-200 fill-pink-200" />
        </div>
      </div>

      <RecipeFeed />
    </div>
  );
}
