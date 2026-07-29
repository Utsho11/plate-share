"use client";

import React from "react";
import { Flame, Activity, Zap, Apple, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

interface Ingredient {
  name: string;
  quantity: string;
}

interface NutritionCardProps {
  ingredients: Ingredient[];
  recipeType?: string;
  category?: string;
}

export default function NutritionCard({
  ingredients = [],
  recipeType = "NON_VEG",
}: NutritionCardProps) {
  // Calculate estimated nutritional metrics based on ingredients list length & types
  const count = ingredients.length || 5;
  const isVeg = recipeType === "VEG";

  const calories = count * 95 + (isVeg ? 120 : 260);
  const protein = (count * 4.5 + (isVeg ? 8 : 22)).toFixed(1);
  const carbs = (count * 7 + (isVeg ? 28 : 14)).toFixed(1);
  const fats = (count * 3 + (isVeg ? 6 : 16)).toFixed(1);

  // Generate dynamic dietary badges
  const badges = [];
  if (isVeg) badges.push({ label: "Vegetarian", color: "bg-emerald-500 text-white" });
  if (parseFloat(protein) > 20) badges.push({ label: "High Protein", color: "bg-blue-600 text-white" });
  if (calories < 450) badges.push({ label: "Low Calorie", color: "bg-amber-600 text-white" });
  if (parseFloat(carbs) < 20) badges.push({ label: "Keto Friendly", color: "bg-purple-600 text-white" });

  return (
    <Card className="rounded-xl border shadow-sm bg-gradient-to-br from-orange-50/40 via-white to-amber-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Activity className="w-5 h-5 text-orange-500" />
            Nutritional Breakdown
          </CardTitle>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Per Serving
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Macro Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-lg border border-orange-100 shadow-2xs text-center">
            <div className="flex items-center justify-center gap-1 text-orange-600 text-xs font-semibold mb-1">
              <Flame className="w-3.5 h-3.5" /> Calories
            </div>
            <p className="text-xl font-bold text-gray-900">{calories}</p>
            <span className="text-[10px] text-gray-500">kcal</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-blue-100 shadow-2xs text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" /> Protein
            </div>
            <p className="text-xl font-bold text-gray-900">{protein}g</p>
            <span className="text-[10px] text-gray-500">grams</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-amber-100 shadow-2xs text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 text-xs font-semibold mb-1">
              <Apple className="w-3.5 h-3.5" /> Carbs
            </div>
            <p className="text-xl font-bold text-gray-900">{carbs}g</p>
            <span className="text-[10px] text-gray-500">grams</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-purple-100 shadow-2xs text-center">
            <div className="flex items-center justify-center gap-1 text-purple-600 text-xs font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" /> Healthy Fats
            </div>
            <p className="text-xl font-bold text-gray-900">{fats}g</p>
            <span className="text-[10px] text-gray-500">grams</span>
          </div>
        </div>

        {/* Dietary Badges */}
        {badges.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium mr-1">Dietary Highlights:</span>
            {badges.map((b) => (
              <Badge key={b.label} className={`${b.color} text-xs px-2.5 py-0.5 font-medium`}>
                {b.label}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
