"use client";

import React, { useState } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  ShoppingBag,
  Sparkles,
  Crown,
  ChefHat,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import GroceryListModal from "@/src/components/MealPlanner/GroceryListModal";
import SubscriptionModal from "@/src/components/Subscription/SubscriptionModal";
import { useGetAllRecipeQuery } from "@/src/redux/api/recipeApi";
import { toast } from "sonner";
import Image from "next/image";
import type { IRecipe } from "@/src/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

interface PlannedMeal {
  id: string;
  day: string;
  type: string;
  recipeTitle: string;
  calories: number;
  image?: string;
}

const INITIAL_PLAN: PlannedMeal[] = [
  {
    id: "1",
    day: "Monday",
    type: "Breakfast",
    recipeTitle: "Avocado Egg Toast & Berries",
    calories: 380,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
  },
  {
    id: "2",
    day: "Monday",
    type: "Lunch",
    recipeTitle: "Grilled Chicken Quinoa Bowl",
    calories: 620,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    id: "3",
    day: "Tuesday",
    type: "Dinner",
    recipeTitle: "Creamy Garlic Parmesan Pasta",
    calories: 710,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6288339?w=500",
  },
  {
    id: "4",
    day: "Wednesday",
    type: "Breakfast",
    recipeTitle: "Berry Protein Smoothie Bowl",
    calories: 310,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500",
  },
];

export default function MealPlannerPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [plan, setPlan] = useState<PlannedMeal[]>(INITIAL_PLAN);
  const [groceryOpen, setGroceryOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  const { data: recipesData } = useGetAllRecipeQuery({});
  const allRecipes: IRecipe[] = recipesData?.recipies || [];

  const handleAddMeal = (recipe: IRecipe, day: string, type: string) => {
    const newMeal: PlannedMeal = {
      id: Date.now().toString(),
      day,
      type,
      recipeTitle: recipe.title,
      calories: 550,
      image: recipe.images?.[0],
    };
    setPlan((prev) => [...prev, newMeal]);
    toast.success(`Added "${recipe.title}" to ${day} (${type})`);
  };

  const handleRemoveMeal = (id: string) => {
    setPlan((prev) => prev.filter((m) => m.id !== id));
    toast.info("Meal removed from schedule");
  };

  const dayMeals = plan.filter((m) => m.day === selectedDay);
  const totalDayCalories = dayMeals.reduce((acc, m) => acc + m.calories, 0);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-200" />
            7-Day Smart Meal Planner
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Plan Your Meals, Fuel Your Life
          </h1>
          <p className="text-sm text-orange-100 leading-relaxed">
            Organize your weekly breakfast, lunch, and dinner menus. Auto-generate your grocery list and track daily caloric intakes effortlessly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            onClick={() => setGroceryOpen(true)}
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-md rounded-2xl py-5"
          >
            <ShoppingBag className="w-5 h-5 mr-2" /> Grocery List
          </Button>
          <Button
            onClick={() => setSubscriptionOpen(true)}
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-gray-950 font-extrabold shadow-md rounded-2xl py-5"
          >
            <Crown className="w-5 h-5 mr-2 fill-gray-950" /> Pro Planner
          </Button>
        </div>
      </div>

      {/* Days Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DAYS.map((d) => {
          const count = plan.filter((m) => m.day === d).length;
          const isActive = selectedDay === d;
          return (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`flex-1 min-w-[120px] p-3.5 rounded-2xl border text-left transition ${
                isActive
                  ? "border-orange-500 bg-orange-50/70 ring-2 ring-orange-500/20 shadow-xs"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <p className={`text-xs font-bold ${isActive ? "text-orange-600" : "text-gray-500"}`}>
                {d}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">{count} meals</span>
                {count > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Day View vs Recipe Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scheduled Meals for Selected Day */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  {selectedDay}&apos;s Schedule
                </CardTitle>
                <CardDescription>
                  {dayMeals.length} items scheduled for today
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-700">
                  {totalDayCalories} kcal
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {MEAL_TYPES.map((type) => {
                const mealsOfType = dayMeals.filter((m) => m.type === type);
                return (
                  <div key={type} className="space-y-2 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {type}
                      </span>
                    </div>

                    {mealsOfType.length === 0 ? (
                      <div className="p-3 rounded-xl border border-dashed text-center text-xs text-gray-400 bg-gray-50/50">
                        No {type.toLowerCase()} planned yet. Select from the right column to add.
                      </div>
                    ) : (
                      mealsOfType.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl border bg-white shadow-2xs flex items-center justify-between gap-3 hover:border-orange-200 transition"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {m.image ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-gray-100 border">
                                <Image src={m.image} alt={m.recipeTitle} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                                <ChefHat className="w-6 h-6 text-orange-500" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 truncate">
                                {m.recipeTitle}
                              </h4>
                              <p className="text-xs text-gray-500">{m.calories} kcal</p>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMeal(m.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recipe Quick Selector */}
        <div className="space-y-6">
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-orange-500" />
                Add Recipes to Plan
              </CardTitle>
              <CardDescription className="text-xs">
                Pick a recipe and add it to {selectedDay}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {allRecipes.length === 0 ? (
                <div className="space-y-3 text-center py-6">
                  <ChefHat className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-xs text-gray-500">Loading recipe library...</p>
                </div>
              ) : (
                allRecipes.slice(0, 8).map((recipe) => (
                  <div
                    key={recipe._id}
                    className="p-3 border rounded-xl bg-white hover:border-orange-300 transition space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      {recipe.images?.[0] && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative border bg-gray-100">
                          <Image src={recipe.images[0]} alt={recipe.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-xs text-gray-900 truncate">
                          {recipe.title}
                        </p>
                        <p className="text-[10px] text-gray-400">{recipe.category || "General"}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-gray-100">
                      {MEAL_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleAddMeal(recipe, selectedDay, type)}
                          className="flex-1 py-1 rounded bg-orange-50 hover:bg-orange-100 text-orange-700 text-[10px] font-bold text-center transition"
                        >
                          + {type[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {groceryOpen && <GroceryListModal onClose={() => setGroceryOpen(false)} />}
      {subscriptionOpen && (
        <SubscriptionModal onClose={() => setSubscriptionOpen(false)} />
      )}
    </div>
  );
}
