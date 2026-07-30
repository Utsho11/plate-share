"use client";

import React from "react";
import { Bookmark, Heart, Utensils, ArrowLeft } from "lucide-react";
import { useGetMyBookmarksQuery } from "@/src/redux/api/bookmarkApi";
import RecipePreviewCard from "@/src/components/Recipe/RecipePreviewCard";
import RecipeCardSkeleton from "@/src/components/Recipe/Skeleton/RecipeCardSkeleton";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import type { IRecipe } from "@/src/types";

export default function SavedRecipesPage() {
  const { data: savedRecipes = [], isLoading } = useGetMyBookmarksQuery({});

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
            <Bookmark className="w-4 h-4 text-amber-200" />
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

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* List of Saved Recipes */}
      {!isLoading && savedRecipes.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Bookmarked Dishes ({savedRecipes.length})
          </p>
          {savedRecipes.map((recipe: IRecipe) => (
            <RecipePreviewCard key={recipe._id || (recipe as unknown as { id?: string }).id} data={recipe} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && savedRecipes.length === 0 && (
        <Card className="w-full rounded-2xl border shadow-xs text-center p-12 bg-gray-50/50">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <Utensils className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-gray-800">Your Cookbook is Empty</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                You haven&apos;t bookmarked any recipes yet. Browse recipes in your feed and click the &quot;Save&quot; button to keep them handy here!
              </p>
            </div>
            <Link href="/home">
              <Button className="mt-2 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl text-xs">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Explore Community Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
