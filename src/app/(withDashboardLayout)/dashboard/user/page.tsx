

"use client";

import React from "react";
import Link from "next/link";
import {
  Utensils,
  ThumbsUp,
  Users,
  PlusCircle,
  Clock,
  Sparkles,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";

export default function UserDashboardPage() {
  const userStats = [
    { title: "Recipes Shared", value: "14", icon: Utensils, color: "text-orange-500 bg-orange-50" },
    { title: "Upvotes Received", value: "328", icon: ThumbsUp, color: "text-emerald-500 bg-emerald-50" },
    { title: "Followers", value: "86", icon: Users, color: "text-blue-500 bg-blue-50" },
  ];

  const myRecipes = [
    { id: "1", title: "Spicy Chicken Curry", category: "LUNCH", cookingTime: "45 mins", upvotes: 42, status: "REGULAR" },
    { id: "2", title: "Crispy Vegetable Singara", category: "SNACK", cookingTime: "30 mins", upvotes: 89, status: "PREMIUM" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white/80 shadow-sm">
            <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
              U
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Chef!</h1>
            <p className="text-orange-100 text-sm mt-0.5">
              Share your latest culinary creations with the PlateShare community.
            </p>
          </div>
        </div>

        <Link href="/home">
          <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-sm">
            <PlusCircle size={18} className="mr-2" /> Share New Recipe
          </Button>
        </Link>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {userStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border shadow-sm">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Published Recipes Section */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            My Recipes
          </CardTitle>
          <Link href="/home">
            <Button size="sm" variant="ghost" className="text-orange-600">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-gray-100">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{recipe.title}</span>
                  <Badge variant={recipe.status === "PREMIUM" ? "default" : "secondary"}>
                    {recipe.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {recipe.cookingTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={14} className="text-emerald-500" /> {recipe.upvotes} Upvotes
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}