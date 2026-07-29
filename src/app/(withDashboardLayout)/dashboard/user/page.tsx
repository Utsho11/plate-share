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
  Loader2,
  Crown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useGetMeQuery } from "@/src/redux/api/userApi";
import { useGetMyRecipesQuery } from "@/src/redux/api/recipeApi";

export default function UserDashboardPage() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined);
  const user = meData?.data;

  const { data: myRecipesData, isLoading: recipesLoading } =
    useGetMyRecipesQuery(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRecipes = (myRecipesData?.recipies || []).map((r: Record<string, any>) => ({
    id: (r._id || r.id) as string,
    title: (r.title as string) || "Untitled",
    category: (r.category as string) || "—",
    cookingTime: (r.cookingTime as string) || "—",
    upvotes: (r.upvoteCount as number) || 0,
    recipeStatus: (r.recipeStatus as string) || "REGULAR",
  }));

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Chef"
    : "Chef";

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {meLoading ? (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-white" />
            </div>
          ) : (
            <Avatar className="w-16 h-16 border-2 border-white/80 shadow-sm">
              <AvatarImage src={user?.profilePhoto || ""} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {fullName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                Welcome back, {meLoading ? "..." : fullName}!
              </h1>
              {user?.type === "PREMIUM" && (
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown size={10} /> PRO
                </span>
              )}
            </div>
            <p className="text-orange-100 text-sm mt-0.5">
              {user?.email
                ? `${user.email} · ${user.location || "PlateShare Community"}`
                : "Share your latest culinary creations with the PlateShare community."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/user/profile">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-semibold shadow-sm text-xs"
            >
              <Edit size={16} className="mr-1.5" /> Edit Profile
            </Button>
          </Link>
          <Link href="/recipes/create">
            <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-sm text-xs">
              <PlusCircle size={16} className="mr-1.5" /> Share New Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Recipes Shared
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {recipesLoading ? (
                  <Loader2 size={18} className="animate-spin text-gray-400" />
                ) : (
                  myRecipes.length
                )}
              </h3>
            </div>
            <div className="p-3 rounded-xl text-orange-500 bg-orange-50">
              <Utensils size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Total Upvotes
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {recipesLoading ? (
                  <Loader2 size={18} className="animate-spin text-gray-400" />
                ) : (
                  myRecipes.reduce(
                    (sum: number, r: { upvotes: number }) => sum + r.upvotes,
                    0
                  )
                )}
              </h3>
            </div>
            <div className="p-3 rounded-xl text-emerald-500 bg-emerald-50">
              <ThumbsUp size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Membership
              </p>
              <h3
                className={`text-xl font-bold mt-1 ${
                  user?.type === "PREMIUM"
                    ? "text-amber-600"
                    : "text-gray-700"
                }`}
              >
                {meLoading ? (
                  <Loader2 size={18} className="animate-spin text-gray-400" />
                ) : (
                  user?.type || "REGULAR"
                )}
              </h3>
            </div>
            <div className="p-3 rounded-xl text-blue-500 bg-blue-50">
              <Users size={22} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Published Recipes */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            My Published Recipes
          </CardTitle>
          <Link href="/home">
            <Button size="sm" variant="ghost" className="text-orange-600">
              View All
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0 divide-y divide-gray-100">
          {recipesLoading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Loading your recipes...</span>
            </div>
          ) : myRecipes.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-gray-400">
                You haven&apos;t shared any recipes yet.
              </p>
              <Link href="/recipes/create">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                  <PlusCircle size={14} className="mr-1.5" /> Share Your First Recipe
                </Button>
              </Link>
            </div>
          ) : (
            myRecipes.map(
              (recipe: {
                id: string;
                title: string;
                category: string;
                cookingTime: string;
                upvotes: number;
                recipeStatus: string;
              }) => (
                <div
                  key={recipe.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">
                        {recipe.title}
                      </span>
                      <Badge
                        variant={
                          recipe.recipeStatus === "PREMIUM"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {recipe.recipeStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {recipe.cookingTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14} className="text-emerald-500" />{" "}
                        {recipe.upvotes} Upvotes
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {recipe.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/user/recipes?edit=${recipe.id}`}>
                      <Button size="sm" variant="outline">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}