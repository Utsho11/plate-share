"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Utensils,
  Crown,
  BookOpen,
  PlusCircle,
  ScrollText,
  UserCircle,
  ShieldAlert,
  Loader2,
  TrendingUp,
  ThumbsUp,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { getUserInfo } from "@/src/services/auth.services";
import { useGetPlatformStatsQuery } from "@/src/redux/api/statsApi";
import { useGetAllUsersQuery } from "@/src/redux/api/userApi";
import { useGetAllRecipeQuery, useGetMyRecipesQuery } from "@/src/redux/api/recipeApi";
import { useGetAllBlogsQuery } from "@/src/redux/api/blogApi";
import { useGetMeQuery } from "@/src/redux/api/userApi";

// ─────────────────────────────────────────────────────────────
// Admin Overview
// ─────────────────────────────────────────────────────────────
function AdminOverview() {
  const { data: statsData, isLoading: statsLoading } = useGetPlatformStatsQuery(undefined);
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({});
  const { data: recipesData, isLoading: recipesLoading } = useGetAllRecipeQuery({});
  const { data: blogsData, isLoading: blogsLoading } = useGetAllBlogsQuery({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats: any = statsData?.totalUsers !== undefined ? statsData : (statsData?.data || {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawUsers = Array.isArray(usersData) ? usersData : (Array.isArray(usersData?.data) ? usersData.data : []);
  const recentUsers = rawUsers.slice(0, 5) as Record<string, any>[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawRecipes = Array.isArray(recipesData?.recipies)
    ? recipesData.recipies
    : Array.isArray(recipesData)
    ? recipesData
    : [];
  const recentRecipes = rawRecipes.slice(0, 5) as Record<string, any>[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBlogs = Array.isArray(blogsData) ? blogsData : (Array.isArray(blogsData?.data) ? blogsData.data : []);
  const recentBlogs = rawBlogs.slice(0, 5) as Record<string, any>[];

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      sub: `${stats?.premiumUsers ?? 0} premium`,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Recipes",
      value: stats?.totalRecipes ?? 0,
      sub: "published",
      icon: Utensils,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Blog Posts",
      value: stats?.totalBlogs ?? 0,
      sub: "published",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Pro Members",
      value: stats?.premiumUsers ?? 0,
      sub: stats?.totalUsers
        ? `${Math.round(((stats.premiumUsers ?? 0) / stats.totalUsers) * 100)}% conversion`
        : "—",
      icon: Crown,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={18} className="text-red-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-100">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-extrabold">Platform Overview</h1>
          <p className="text-sm text-orange-100 mt-1">
            Monitor all platform activity, users, recipes and blog posts.
          </p>
        </div>
        <div className="hidden md:flex flex-col gap-2">
          <Link href="/dashboard/admin">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs">
              <Users size={13} className="mr-1.5" /> Manage Users
            </Button>
          </Link>
          <Link href="/dashboard/admin/blogs">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs">
              <BookOpen size={13} className="mr-1.5" /> Manage Blogs
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{s.label}</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {statsLoading ? (
                      <Loader2 size={18} className="animate-spin text-gray-300" />
                    ) : (
                      s.value
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.sub}</p>
                </div>
                <div className={`p-3 rounded-xl ${s.color}`}>
                  <Icon size={20} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3-column recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Users size={16} className="text-blue-500" /> Recent Users
            </CardTitle>
            <Link href="/dashboard/admin">
              <Button size="sm" variant="ghost" className="text-xs text-blue-600 dark:text-blue-400 h-7">
                View All <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y dark:divide-slate-800">
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-300" />
              </div>
            ) : recentUsers.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No users yet</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u._id || u.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={u.profilePhoto} />
                    <AvatarFallback className="text-xs bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                      {(u.firstName || "U")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : u.name || "User"}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{u.email}</p>
                  </div>
                  <Badge
                    variant={u.type === "PREMIUM" ? "default" : "outline"}
                    className="text-[9px] shrink-0"
                  >
                    {u.type || "REGULAR"}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Recipes */}
        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Utensils size={16} className="text-orange-500" /> Recent Recipes
            </CardTitle>
            <Link href="/dashboard/user/recipes">
              <Button size="sm" variant="ghost" className="text-xs text-orange-600 dark:text-orange-400 h-7">
                View All <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y dark:divide-slate-800">
            {recipesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-300" />
              </div>
            ) : recentRecipes.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No recipes yet</p>
            ) : (
              recentRecipes.map((r) => (
                <div key={r._id || r.id} className="px-4 py-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{r.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[9px]">{r.category}</Badge>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      by {r.author?.firstName || r.author?.name || "User"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Blogs */}
        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <BookOpen size={16} className="text-purple-500" /> Recent Blogs
            </CardTitle>
            <Link href="/dashboard/admin/blogs">
              <Button size="sm" variant="ghost" className="text-xs text-purple-600 dark:text-purple-400 h-7">
                View All <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y dark:divide-slate-800">
            {blogsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-300" />
              </div>
            ) : recentBlogs.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No blogs yet</p>
            ) : (
              recentBlogs.map((b) => (
                <div key={b._id || b.id} className="px-4 py-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{b.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[9px]">{b.category}</Badge>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      by {b.author?.firstName || "User"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Manage Users", href: "/dashboard/admin", icon: Users, color: "bg-blue-500" },
          { label: "Manage Recipes", href: "/dashboard/user/recipes", icon: Utensils, color: "bg-orange-500" },
          { label: "Manage Blogs", href: "/dashboard/admin/blogs", icon: BookOpen, color: "bg-purple-500" },
          { label: "Platform Stats", href: "/dashboard/admin", icon: TrendingUp, color: "bg-emerald-500" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href + action.label} href={action.href}>
              <div className={`${action.color} rounded-2xl p-4 text-white flex flex-col items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer shadow-sm`}>
                <Icon size={22} />
                <span className="text-xs font-bold text-center">{action.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// User Overview
// ─────────────────────────────────────────────────────────────
function UserOverview() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = meData?.firstName ? meData : (meData?.data || {});
  const userId = user?._id || user?.id;

  const { data: myRecipesData, isLoading: recipesLoading } = useGetMyRecipesQuery(undefined);
  const { data: myBlogsData, isLoading: blogsLoading } = useGetAllBlogsQuery(
    userId ? { author: userId } : {},
    { skip: !userId }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawRecipes = Array.isArray(myRecipesData?.recipies)
    ? myRecipesData.recipies
    : Array.isArray(myRecipesData)
    ? myRecipesData
    : [];
  const myRecipes = rawRecipes as Record<string, any>[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBlogs = Array.isArray(myBlogsData) ? myBlogsData : (Array.isArray(myBlogsData?.data) ? myBlogsData.data : []);
  const myBlogs = rawBlogs as Record<string, any>[];

  const totalUpvotes = myRecipes.reduce(
    (sum: number, r: Record<string, number>) => sum + (r.upvoteCount || 0),
    0
  );

  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.name || "Chef";

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-400 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          {meLoading ? (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Loader2 size={22} className="animate-spin" />
            </div>
          ) : (
            <Avatar className="w-16 h-16 border-4 border-white/80 shadow-md">
              <AvatarImage src={user?.profilePhoto || ""} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {fullName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                {meLoading ? "Loading..." : `Welcome, ${fullName}!`}
              </h1>
              {user?.type === "PREMIUM" && (
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown size={10} /> PRO
                </span>
              )}
            </div>
            <p className="text-orange-100 text-sm mt-1">
              {user?.email || "Your PlateShare workspace"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/user/recipes">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs">
              <Utensils size={13} className="mr-1.5" /> My Recipes
            </Button>
          </Link>
          <Link href="/dashboard/user/blogs">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs">
              <ScrollText size={13} className="mr-1.5" /> My Blogs
            </Button>
          </Link>
          <Link href="/dashboard/user/profile">
            <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50 text-xs font-bold">
              <UserCircle size={13} className="mr-1.5" /> Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">My Recipes</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {recipesLoading ? <Loader2 size={18} className="animate-spin text-gray-300" /> : myRecipes.length}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <Utensils size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">My Blogs</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {blogsLoading ? <Loader2 size={18} className="animate-spin text-gray-300" /> : myBlogs.length}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <ScrollText size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Total Upvotes</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {recipesLoading ? <Loader2 size={18} className="animate-spin text-gray-300" /> : totalUpvotes}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ThumbsUp size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "New Recipe", href: "/dashboard/user/recipes", icon: Utensils, color: "bg-orange-500 hover:bg-orange-600" },
          { label: "New Blog", href: "/dashboard/user/blogs", icon: ScrollText, color: "bg-purple-500 hover:bg-purple-600" },
          { label: "Edit Profile", href: "/dashboard/user/profile", icon: UserCircle, color: "bg-blue-500 hover:bg-blue-600" },
          { label: "Browse Feed", href: "/home", icon: ChefHat, color: "bg-emerald-500 hover:bg-emerald-600" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <div className={`${action.color} rounded-2xl p-4 text-white flex flex-col items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-sm`}>
                <Icon size={22} />
                <span className="text-xs font-bold text-center">{action.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* My recent recipes & blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Utensils size={16} className="text-orange-500" /> Recent Recipes
            </CardTitle>
            <Link href="/dashboard/user/recipes">
              <Button size="sm" variant="ghost" className="text-xs text-orange-600 dark:text-orange-400 h-7">
                Manage <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y dark:divide-slate-800">
            {recipesLoading ? (
              <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-gray-300" /></div>
            ) : myRecipes.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">No recipes published yet.</p>
                <Link href="/dashboard/user/recipes">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs">
                    <PlusCircle size={13} className="mr-1.5" /> Create First Recipe
                  </Button>
                </Link>
              </div>
            ) : (
              myRecipes.slice(0, 3).map((r) => (
                <div key={r._id || r.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate max-w-[180px]">{r.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[9px]">{r.category}</Badge>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        ↑ {r.upvoteCount || 0}
                      </span>
                    </div>
                  </div>
                  <Badge variant={r.recipeStatus === "PREMIUM" ? "default" : "secondary"} className="text-[9px]">
                    {r.recipeStatus || "REGULAR"}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <ScrollText size={16} className="text-purple-500" /> Recent Blog Posts
            </CardTitle>
            <Link href="/dashboard/user/blogs">
              <Button size="sm" variant="ghost" className="text-xs text-purple-600 dark:text-purple-400 h-7">
                Manage <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y dark:divide-slate-800">
            {blogsLoading ? (
              <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-gray-300" /></div>
            ) : myBlogs.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">No blog posts yet.</p>
                <Link href="/dashboard/user/blogs">
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs">
                    <PlusCircle size={13} className="mr-1.5" /> Write First Blog
                  </Button>
                </Link>
              </div>
            ) : (
              myBlogs.slice(0, 3).map((b) => (
                <div key={b._id || b.id} className="px-4 py-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{b.title}</p>
                  <Badge variant="outline" className="text-[9px] mt-1">{b.category}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Root Dashboard Page — detect role and render correct overview
// ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const info = getUserInfo();
    setUserRole(info?.role?.toUpperCase() ?? null);
  }, []);

  if (userRole === null) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-orange-500" />
      </div>
    );
  }

  return userRole === "ADMIN" ? <AdminOverview /> : <UserOverview />;
}
