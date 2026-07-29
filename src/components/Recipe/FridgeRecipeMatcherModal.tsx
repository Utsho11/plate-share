"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  Search,
  CheckCircle2,
  Utensils,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import type { IRecipe } from "@/src/types";
import Link from "next/link";

const COMMON_INGREDIENTS = [
  "Chicken",
  "Eggs",
  "Garlic",
  "Onion",
  "Tomato",
  "Potato",
  "Rice",
  "Milk",
  "Butter",
  "Cumin",
  "Chili",
  "Flour",
  "Lemon",
  "Coriander",
  "Cheese",
];

const SUBSTITUTION_TIPS: Record<string, string> = {
  Butter: "Use olive oil or coconut oil (1:1 ratio)",
  Milk: "Use almond milk, oat milk, or water with a splash of cream",
  Eggs: "Use 1 tbsp flaxseed + 3 tbsp water per egg",
  Lemon: "Use white vinegar or lime juice for acidity",
  Cheese: "Use nutritional yeast for a cheesy flavor",
};

interface FridgeRecipeMatcherModalProps {
  recipes: IRecipe[];
  onClose: () => void;
}

export default function FridgeRecipeMatcherModal({
  recipes = [],
  onClose,
}: FridgeRecipeMatcherModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "Chicken",
    "Onion",
    "Garlic",
  ]);
  const [customInput, setCustomInput] = useState("");

  const toggleIngredient = (item: string) => {
    if (selectedIngredients.includes(item)) {
      setSelectedIngredients((prev) => prev.filter((i) => i !== item));
    } else {
      setSelectedIngredients((prev) => [...prev, item]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim() && !selectedIngredients.includes(customInput.trim())) {
      setSelectedIngredients((prev) => [...prev, customInput.trim()]);
      setCustomInput("");
    }
  };

  // Match platform recipes against selected ingredients
  const matchedResults = recipes.map((recipe) => {
    const recipeIngNames = (recipe.ingredients || []).map((i) =>
      i.name?.toLowerCase()
    );
    const matchedCount = selectedIngredients.filter((sel) =>
      recipeIngNames.some((rName) => rName?.includes(sel.toLowerCase()))
    ).length;

    const totalCount = recipeIngNames.length || 1;
    const matchPercentage = Math.min(
      100,
      Math.round((matchedCount / (totalCount * 0.6)) * 100)
    );

    return {
      recipe,
      matchedCount,
      totalCount,
      matchPercentage,
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border">
        {/* Header */}
        <div className="p-5 border-b bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">"What's in Your Fridge?" AI Matcher</h2>
              <p className="text-xs text-orange-100">Select available ingredients to find matching recipes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Ingredient Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Select Your Ingredients ({selectedIngredients.length} selected)
              </span>
              {selectedIngredients.length > 0 && (
                <button
                  onClick={() => setSelectedIngredients([])}
                  className="text-xs text-orange-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {COMMON_INGREDIENTS.map((item) => {
                const isSelected = selectedIngredients.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleIngredient(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={13} />}
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Custom ingredient input */}
            <form onSubmit={handleAddCustom} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add custom ingredient (e.g. Mushrooms)..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border rounded-lg focus:outline-none focus:border-orange-500"
              />
              <Button type="submit" size="sm" variant="secondary" className="text-xs">
                Add
              </Button>
            </form>
          </div>

          {/* AI Substitutions Tip Box */}
          {selectedIngredients.some((i) => SUBSTITUTION_TIPS[i]) && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 space-y-1">
                <p className="font-semibold">AI Substitution Suggestions:</p>
                {selectedIngredients.map(
                  (i) =>
                    SUBSTITUTION_TIPS[i] && (
                      <p key={i}>
                        • <span className="font-medium">{i}:</span> {SUBSTITUTION_TIPS[i]}
                      </p>
                    )
                )}
              </div>
            </div>
          )}

          {/* Matched Recipes Results */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center justify-between">
              <span>Matched Recipes ({matchedResults.length})</span>
              <span className="text-xs font-normal text-gray-500">Sorted by best match</span>
            </h3>

            {matchedResults.length === 0 ? (
              <p className="text-xs text-center py-6 text-gray-500">
                No matching recipes found. Try selecting more ingredients.
              </p>
            ) : (
              <div className="space-y-2.5">
                {matchedResults.slice(0, 5).map(({ recipe, matchPercentage, matchedCount }) => (
                  <Card key={recipe._id} className="border shadow-xs hover:border-orange-300 transition">
                    <CardContent className="p-3.5 flex items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-gray-900 truncate">
                            {recipe.title}
                          </h4>
                          <Badge
                            className={`text-[10px] ${
                              matchPercentage >= 75
                                ? "bg-emerald-500 text-white"
                                : matchPercentage >= 50
                                ? "bg-amber-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            {matchPercentage}% Match
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 truncate max-w-md">
                          {recipe.description}
                        </p>
                      </div>

                      <Link href={`/recipe/${recipe._id}`} onClick={onClose}>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shrink-0">
                          View <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
