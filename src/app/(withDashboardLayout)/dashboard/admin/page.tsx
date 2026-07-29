"use client";

import React, { useState } from "react";
import {
  Users,
  Utensils,
  Crown,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Ban,
  Shield,
  UserCheck,
  Trash2,
  DollarSign,
  Search,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusRoleMutation,
} from "@/src/redux/api/userApi";
import {
  useGetAllRecipeQuery,
  useDeleteRecipeMutation,
  useChangeRecipeStatusMutation,
} from "@/src/redux/api/recipeApi";
import { useGetPlatformStatsQuery } from "@/src/redux/api/statsApi";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  type: string;
  avatar: string;
}

interface AdminRecipe {
  id: string;
  title: string;
  author: string;
  category: string;
  recipeStatus: string;
  recipeType: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"users" | "recipes" | "analytics">(
    "users"
  );
  const [userSearch, setUserSearch] = useState("");

  // ── API Queries ──────────────────────────────────────────────
  const { data: statsData, isLoading: statsLoading } = useGetPlatformStatsQuery(undefined);
  const { data: apiUsersData, isLoading: usersLoading, refetch: refetchUsers } =
    useGetAllUsersQuery({});
  const { data: apiRecipesData, isLoading: recipesLoading, refetch: refetchRecipes } =
    useGetAllRecipeQuery({});

  // ── Mutations ────────────────────────────────────────────────
  const [updateUserStatusRole] = useUpdateUserStatusRoleMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [changeRecipeStatus] = useChangeRecipeStatusMutation();

  // ── Data Mapping ─────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats: any = statsData?.totalUsers !== undefined ? statsData : (statsData?.data || {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawUsers = Array.isArray(apiUsersData) ? apiUsersData : (Array.isArray(apiUsersData?.data) ? apiUsersData.data : []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usersList: AdminUser[] = rawUsers.map((u: Record<string, any>) => ({
    id: (u._id || u.id) as string,
    name: u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : (u.name as string) || "User",
    email: (u.email as string) || "",
    role: (u.role as string) || "USER",
    status: (u.status as string) || "ACTIVE",
    type: (u.type as string) || "REGULAR",
    avatar:
      (u.profilePhoto as string) ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(u.firstName || "U")}&background=f77f00&color=fff`,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawRecipes = Array.isArray(apiRecipesData?.recipies)
    ? apiRecipesData.recipies
    : Array.isArray(apiRecipesData)
    ? apiRecipesData
    : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recipesList: AdminRecipe[] = rawRecipes.map((r: Record<string, any>) => ({
    id: (r._id || r.id) as string,
    title: (r.title as string) || "Untitled Recipe",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    author: (r.author as any)?.email || (r.author as any)?.firstName || (r.author as any)?.name || "Unknown",
    category: (r.category as string) || "—",
    recipeStatus: (r.recipeStatus as string) || "REGULAR",
    recipeType: (r.recipeType as string) || "REGULAR",
  }));

  // ── User Actions ──────────────────────────────────────────────
  const handleToggleUserStatus = async (
    id: string,
    name: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    try {
      await updateUserStatusRole({ id, data: { status: newStatus } }).unwrap();
      toast.success(`${name} has been ${newStatus === "BLOCKED" ? "blocked" : "unblocked"}.`);
      refetchUsers();
    } catch {
      toast.error("Failed to update user status. Please try again.");
    }
  };

  const handleToggleUserRole = async (
    id: string,
    name: string,
    currentRole: string
  ) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      await updateUserStatusRole({ id, data: { role: newRole } }).unwrap();
      toast.success(`${name}'s role changed to ${newRole}.`);
      refetchUsers();
    } catch {
      toast.error("Failed to update user role. Please try again.");
    }
  };

  // ── Recipe Actions ────────────────────────────────────────────
  const handleDeleteRecipe = async (id: string, title: string) => {
    try {
      await deleteRecipe(id).unwrap();
      toast.success(`"${title}" deleted from platform.`);
      refetchRecipes();
    } catch {
      toast.error("Failed to delete recipe. Please try again.");
    }
  };

  const handleToggleRecipeStatus = async (
    id: string,
    title: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "PREMIUM" ? "REGULAR" : "PREMIUM";
    try {
      await changeRecipeStatus({ id, recipeStatus: newStatus }).unwrap();
      toast.success(`"${title}" marked as ${newStatus}.`);
      refetchRecipes();
    } catch {
      toast.error("Failed to change recipe status. Please try again.");
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Admin Control &amp; Platform Manager
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage registered accounts, moderate submitted recipes, and view platform analytics.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl">
          <Button
            size="sm"
            variant={activeTab === "users" ? "default" : "ghost"}
            onClick={() => setActiveTab("users")}
            className="text-xs font-bold rounded-xl"
          >
            <Users className="w-3.5 h-3.5 mr-1" /> User Management
          </Button>
          <Button
            size="sm"
            variant={activeTab === "recipes" ? "default" : "ghost"}
            onClick={() => setActiveTab("recipes")}
            className="text-xs font-bold rounded-xl"
          >
            <Utensils className="w-3.5 h-3.5 mr-1" /> Content Moderation
          </Button>
          <Button
            size="sm"
            variant={activeTab === "analytics" ? "default" : "ghost"}
            onClick={() => setActiveTab("analytics")}
            className="text-xs font-bold rounded-xl"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Platform Stats
          </Button>
        </div>
      </div>

      {/* Stats Cards — from real API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Users</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {statsLoading ? (
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                ) : (
                  `${stats?.totalUsers ?? 0} Accounts`
                )}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                {stats?.regularUsers ?? 0} regular · {stats?.premiumUsers ?? 0} premium
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Published Recipes</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {statsLoading ? (
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                ) : (
                  `${stats?.totalRecipes ?? 0} Recipes`
                )}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                Live on platform
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
              <Utensils size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Pro Subscribers</p>
              <h3 className="text-2xl font-extrabold text-amber-500 mt-1">
                {statsLoading ? (
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                ) : (
                  `${stats?.premiumUsers ?? 0} Members`
                )}
              </h3>
              <p className="text-xs text-amber-600 font-semibold mt-1">
                {stats?.totalUsers
                  ? `${Math.round(((stats?.premiumUsers ?? 0) / stats.totalUsers) * 100)}% conversion rate`
                  : "—"}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Crown size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Admins</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
                {statsLoading ? (
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                ) : (
                  `${stats?.totalAdmins ?? 0} Admins`
                )}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                Platform moderators
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <DollarSign size={22} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Tab 1: User Management ─────────────────────────────── */}
      {activeTab === "users" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" /> User Account Management
              </CardTitle>
              <CardDescription>
                Manage user roles, grant admin permissions, or suspend accounts
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search user by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-9 text-xs rounded-xl"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetchUsers()}
                className="rounded-xl"
              >
                <RefreshCw size={14} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            {usersLoading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
                <Loader2 size={22} className="animate-spin" />
                <span className="text-sm">Loading users...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-16 text-sm text-gray-400">
                No users found.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold uppercase border-y">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Account Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user: AdminUser) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={user.role === "ADMIN" ? "default" : "outline"}
                          className="text-[10px]"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={user.type === "PREMIUM" ? "secondary" : "outline"}
                          className="text-[10px]"
                        >
                          {user.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                            user.status === "ACTIVE"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {user.status === "ACTIVE" ? (
                            <UserCheck size={14} />
                          ) : (
                            <Ban size={14} />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleToggleUserRole(user.id, user.name, user.role)
                          }
                          className="text-[11px] h-8"
                        >
                          <Shield size={12} className="mr-1" />
                          {user.role === "ADMIN" ? "Demote" : "Make Admin"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleToggleUserStatus(user.id, user.name, user.status)
                          }
                          className={`text-[11px] h-8 ${
                            user.status === "ACTIVE"
                              ? "text-red-600 border-red-200 hover:bg-red-50"
                              : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {user.status === "ACTIVE" ? "Block" : "Unblock"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Tab 2: Content Moderation ──────────────────────────── */}
      {activeTab === "recipes" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" /> Recipe Content
                Moderation
              </CardTitle>
              <CardDescription>
                Review, manage tiers, or remove community-submitted recipes
              </CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetchRecipes()}
              className="rounded-xl"
            >
              <RefreshCw size={14} className="mr-1" /> Refresh
            </Button>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            {recipesLoading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
                <Loader2 size={22} className="animate-spin" />
                <span className="text-sm">Loading recipes...</span>
              </div>
            ) : recipesList.length === 0 ? (
              <div className="text-center py-16 text-sm text-gray-400">
                No recipes found on platform.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold uppercase border-y">
                  <tr>
                    <th className="p-4">Recipe Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recipesList.map((recipe: AdminRecipe) => (
                    <tr
                      key={recipe.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition"
                    >
                      <td className="p-4 font-bold text-gray-900 dark:text-white">
                        {recipe.title}
                      </td>
                      <td className="p-4 text-gray-500">{recipe.author}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-[10px]">
                          {recipe.category}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleToggleRecipeStatus(
                              recipe.id,
                              recipe.title,
                              recipe.recipeStatus
                            )
                          }
                          className={`text-[10px] h-7 font-bold ${
                            recipe.recipeStatus === "PREMIUM"
                              ? "text-amber-600"
                              : "text-gray-500"
                          }`}
                        >
                          {recipe.recipeStatus}
                        </Button>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDeleteRecipe(recipe.id, recipe.title)
                          }
                          className="text-[11px] h-8 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={14} className="mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Tab 3: Platform Stats ─────────────────────────────── */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> User Breakdown
            </h3>
            {statsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-gray-400" size={24} />
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">
                    Total Registered Users
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {stats?.totalUsers ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">
                    Premium (Pro) Members
                  </span>
                  <span className="font-extrabold text-amber-600">
                    {stats?.premiumUsers ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">
                    Regular Members
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {stats?.regularUsers ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">
                    Platform Admins
                  </span>
                  <span className="font-extrabold text-orange-600">
                    {stats?.totalAdmins ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  <span>Total Recipes on Platform</span>
                  <span>{stats?.totalRecipes ?? 0} recipes</span>
                </div>
              </div>
            )}
          </Card>

          <Card className="rounded-2xl border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" /> Quick Actions
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-between">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Manage all user accounts
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[11px] h-7"
                  onClick={() => setActiveTab("users")}
                >
                  <Users size={12} className="mr-1" /> View Users
                </Button>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-between">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Moderate recipe content
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[11px] h-7"
                  onClick={() => setActiveTab("recipes")}
                >
                  <Utensils size={12} className="mr-1" /> View Recipes
                </Button>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-orange-800">Conversion Rate</p>
                  <p className="text-orange-600 text-[11px]">
                    {stats?.totalUsers
                      ? `${Math.round(
                          ((stats?.premiumUsers ?? 0) / stats.totalUsers) * 100
                        )}% of users are premium`
                      : "Loading..."}
                  </p>
                </div>
                <CheckCircle2 size={24} className="text-orange-500" />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
