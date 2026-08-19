"use client";

import React from "react";
import { Utensils, Coffee, Pizza, Cake, Leaf, Fish, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "Breakfast & Brunch",
    count: "420+ Recipes",
    icon: Coffee,
    color: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600",
    query: "BREAKFAST",
  },
  {
    name: "Lunch Delights",
    count: "680+ Recipes",
    icon: Utensils,
    color: "from-orange-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    query: "LUNCH",
  },
  {
    name: "Dinner Classics",
    count: "950+ Recipes",
    icon: Pizza,
    color: "from-red-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6288339?w=600",
    query: "DINNER",
  },
  {
    name: "Decadent Desserts",
    count: "310+ Recipes",
    icon: Cake,
    color: "from-pink-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600",
    query: "DESSERT",
  },
  {
    name: "Healthy & Vegan",
    count: "540+ Recipes",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    query: "VEGAN",
  },
  {
    name: "Seafood Specials",
    count: "290+ Recipes",
    icon: Fish,
    color: "from-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600",
    query: "SEAFOOD",
  },
];

export default function RecipeCategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight">Explore Recipe Categories</h1>
        <p className="text-sm text-gray-500">
          Find inspiration for any meal, dietary preference, or craving with our curated category collections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link key={idx} href={`/recipes?category=${cat.query}`}>
              <Card className="group overflow-hidden rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-lg transition cursor-pointer">
                <div className="h-44 relative bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-40 group-hover:opacity-30 transition`} />
                  <div className="absolute top-3 left-3 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-gray-900 dark:text-white shadow-md">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>

                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-orange-500 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.count}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/60 group-hover:bg-orange-500 text-orange-500 group-hover:text-white flex items-center justify-center transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
