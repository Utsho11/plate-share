"use client";

import React, { useState } from "react";
import RecipePreviewCard from "@/src/components/Recipe/RecipePreviewCard";
import RecipeCardSkeleton from "@/src/components/Recipe/Skeleton/RecipeCardSkeleton";
import { useGetAllRecipeQuery } from "@/src/redux/api/recipeApi";
import type { IRecipe } from "@/src/types";
import { Search, Filter, RefreshCw, UtensilsCrossed, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import FridgeRecipeMatcherModal from "@/src/components/Recipe/FridgeRecipeMatcherModal";

const CATEGORIES = ["ALL", "BREAKFAST", "LUNCH", "DINNER", "SNACK", "DESSERT"];
const RECIPE_TYPES = ["ALL", "VEG", "NON_VEG"];

const RecipeFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [fridgeMatcherOpen, setFridgeMatcherOpen] = useState(false);

  // Query parameters build
  const queryParams: Record<string, string> = {};
  if (searchTerm.trim()) queryParams.searchTerm = searchTerm.trim();
  if (selectedCategory !== "ALL") queryParams.category = selectedCategory;
  if (selectedType !== "ALL") queryParams.recipeType = selectedType;

  const { data, isLoading } = useGetAllRecipeQuery(queryParams);

  const recipesList: IRecipe[] = data?.recipies || [];

  // Client-side fallback filter for instant responsiveness
  const filteredRecipes = recipesList.filter((recipe) => {
    const matchesSearch =
      !searchTerm.trim() ||
      recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || recipe.category === selectedCategory;

    const matchesType =
      selectedType === "ALL" || recipe.recipeType === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setSelectedType("ALL");
  };

  return (
    <div className="space-y-6 my-4">
      {/* AI Pantry Matcher Callout Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl p-4 text-white shadow-md flex items-center justify-between gap-3 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">"What's in Your Fridge?" AI Matcher</h3>
            <p className="text-xs text-orange-100">Select ingredients to get instant recipe matches!</p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setFridgeMatcherOpen(true)}
          className="bg-white text-orange-600 hover:bg-orange-50 font-bold shrink-0 shadow-sm"
        >
          Find Recipes
        </Button>
      </div>
      {/* Search & Filter Toolbar */}
      <Card className="border shadow-sm max-w-xl mx-auto rounded-xl">
        <CardContent className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-accent/50 rounded-lg border border-transparent focus:border-orange-500 focus:bg-white focus:outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Filter className="w-3.5 h-3.5 text-orange-500" />
              <span>Category</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#f77f00] text-white shadow-sm"
                      : "bg-accent hover:bg-muted text-gray-700"
                  }`}
                >
                  {cat === "ALL" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Type Filter */}
          <div className="flex items-center justify-between pt-2 border-t text-xs">
            <span className="font-semibold text-muted-foreground">Dietary Type:</span>
            <div className="flex items-center gap-1.5">
              {RECIPE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition ${
                    selectedType === type
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type === "ALL" ? "All Types" : type === "VEG" ? "🌱 Veg" : "🍖 Non-Veg"}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Cards List */}
      <div>
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </>
        )}

        {!isLoading && filteredRecipes.length > 0 && (
          filteredRecipes.map((recipe: IRecipe) => (
            <RecipePreviewCard key={recipe._id} data={recipe} />
          ))
        )}

        {!isLoading && filteredRecipes.length === 0 && (
          <Card className="w-full max-w-xl mx-auto rounded-xl border text-center p-8">
            <CardContent className="space-y-3">
              <UtensilsCrossed className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="font-semibold text-lg text-gray-800">No Recipes Found</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                We couldn&apos;t find any recipes matching your search criteria. Try adjusting your filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-2 text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Pantry Matcher Modal */}
      {fridgeMatcherOpen && (
        <FridgeRecipeMatcherModal
          recipes={recipesList}
          onClose={() => setFridgeMatcherOpen(false)}
        />
      )}
    </div>
  );
};

export default RecipeFeed;
